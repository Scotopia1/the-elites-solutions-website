import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import { projects } from '../src/db/schema/postgres';
import { eq } from 'drizzle-orm';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const DATABASE_URL = process.env.DATABASE_URL!;

if (!DATABASE_URL) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

interface ProjectJSON {
  slug: string;
  title: string;
  category?: string;
  heroImage?: string;
  quickFacts?: {
    client?: string;
    year?: string;
    duration?: string;
    status?: string;
    liveUrl?: string;
  };
  overview?: {
    description?: string;
    highlights?: string[];
  };
  gallery?: Array<{ url: string; alt: string }>;
  techStack?: Array<{ name: string; logo?: string; reason?: string }>;
  timeline?: Array<{ phase: string; date?: string; description: string; duration?: string }>;
  results?: Array<{ metric: string; description: string }>;
  testimonial?: {
    quote: string;
    author: string;
    title?: string;
    company?: string;
    avatar?: string;
  };
}

async function migrateProjects() {
  console.log('🚀 Starting projects data migration...');

  const client = postgres(DATABASE_URL, { max: 1 });
  const db = drizzle(client);

  try {
    const projectsDir = path.resolve(__dirname, '../src/data/projects');
    const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.json'));

    console.log(`📦 Found ${files.length} project files to migrate`);

    for (const file of files) {
      const filePath = path.join(projectsDir, file);
      const rawData = fs.readFileSync(filePath, 'utf-8');
      const projectData: ProjectJSON = JSON.parse(rawData);

      console.log(`\n📝 Processing: ${projectData.slug}`);

      // Determine project scale based on complexity indicators
      const projectScale = determineProjectScale(projectData);

      // Transform data to match database schema
      const dbData = {
        slug: projectData.slug,
        // Multilingual title
        title: {
          en: projectData.title,
          fr: projectData.title,
          ar: projectData.title
        },

        // Classification & Filtering
        category: projectData.category || 'Web Development',
        industry: projectData.quickFacts?.client ? determineIndustry(projectData.quickFacts.client) : 'Technology',
        projectScale,

        // Client Information
        clientName: projectData.quickFacts?.client || 'Confidential',
        clientLogoUrl: null,

        // Descriptions
        shortDescription: projectData.overview?.description ? {
          en: projectData.overview.description.substring(0, 200) + '...',
          fr: projectData.overview.description.substring(0, 200) + '...',
          ar: projectData.overview.description.substring(0, 200) + '...'
        } : null,
        challenge: {
          en: projectData.overview?.description || 'No challenge description available',
          fr: projectData.overview?.description || 'No challenge description available',
          ar: projectData.overview?.description || 'No challenge description available'
        },
        solution: {
          en: 'We delivered a comprehensive solution using modern technologies and best practices.',
          fr: 'We delivered a comprehensive solution using modern technologies and best practices.',
          ar: 'We delivered a comprehensive solution using modern technologies and best practices.'
        },
        results: {
          en: projectData.overview?.highlights?.join('. ') || 'Successful project delivery',
          fr: projectData.overview?.highlights?.join('. ') || 'Successful project delivery',
          ar: projectData.overview?.highlights?.join('. ') || 'Successful project delivery'
        },

        // Detailed Overview
        overview: projectData.overview || null,
        quickFacts: projectData.quickFacts || null,

        // Technologies
        technologies: projectData.techStack?.map(t => t.name) || [],
        techStack: projectData.techStack || [],
        servicesUsed: null,

        // Timeline
        timeline: projectData.timeline || [],
        duration: projectData.quickFacts?.duration || projectData.timeline ?
          `${projectData.timeline.length || 3} months` : '3 months',

        // Results & Metrics
        resultsMetrics: projectData.results || [],

        // Social Proof
        testimonial: projectData.testimonial || null,

        // Media
        heroImage: projectData.heroImage || null,
        featuredImageUrl: projectData.heroImage || projectData.gallery?.[0]?.url || '/images/placeholder-project.jpg',
        images: null,
        gallery: projectData.gallery || [],

        // External Links
        projectUrl: projectData.quickFacts?.liveUrl || null,

        // Meta
        isFeatured: false,
        isPublished: true,
        publishedAt: new Date(),
        orderIndex: files.indexOf(file)
      };

      // Check if project already exists
      const existing = await db.select().from(projects).where(eq(projects.slug, projectData.slug));

      if (existing.length > 0) {
        console.log(`   ✏️  Updating existing project: ${projectData.slug}`);
        await db.update(projects)
          .set(dbData)
          .where(eq(projects.slug, projectData.slug));
      } else {
        console.log(`   ➕ Creating new project: ${projectData.slug}`);
        await db.insert(projects).values(dbData);
      }

      console.log(`   ✅ Migrated: ${projectData.slug}`);
    }

    console.log('\n✨ Projects migration completed successfully!');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Helper functions
function determineProjectScale(project: ProjectJSON): 'small' | 'medium' | 'large' | 'enterprise' {
  const techCount = project.techStack?.length || 0;
  const timelineLength = project.timeline?.length || 0;
  const hasComplexFeatures = project.overview?.highlights && project.overview.highlights.length > 5;

  if (techCount > 8 || timelineLength > 8 || hasComplexFeatures) {
    return 'enterprise';
  } else if (techCount > 5 || timelineLength > 5) {
    return 'large';
  } else if (techCount > 3 || timelineLength > 3) {
    return 'medium';
  }
  return 'small';
}

function determineIndustry(clientName: string): string {
  const industries: Record<string, string> = {
    'health': 'Healthcare',
    'medical': 'Healthcare',
    'finance': 'Finance',
    'bank': 'Finance',
    'tech': 'Technology',
    'mart': 'E-commerce',
    'shop': 'E-commerce',
    'store': 'E-commerce',
    'edu': 'Education',
    'school': 'Education'
  };

  const lowerClient = clientName.toLowerCase();
  for (const [keyword, industry] of Object.entries(industries)) {
    if (lowerClient.includes(keyword)) {
      return industry;
    }
  }

  return 'Technology';
}

// Run migration
migrateProjects()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
