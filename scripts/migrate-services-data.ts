import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import { services } from '../src/db/schema/postgres';
import { eq } from 'drizzle-orm';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const DATABASE_URL = process.env.DATABASE_URL!;

if (!DATABASE_URL) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

interface ServiceJSON {
  slug: string;
  title: string;
  tagline?: string;
  icon?: string;
  description: string;
  benefits?: Array<{ title: string; description: string }>;
  techStack?: Array<{ name: string; icon?: string }>;
  process?: Array<{ step: number; title: string; description: string }>;
  pricing?: any[];
  caseStudies?: string[];
}

async function migrateServices() {
  console.log('🚀 Starting services data migration...');

  const client = postgres(DATABASE_URL, { max: 1 });
  const db = drizzle(client);

  try {
    const servicesDir = path.resolve(__dirname, '../src/data/services');
    const files = fs.readdirSync(servicesDir).filter(f => f.endsWith('.json'));

    console.log(`📦 Found ${files.length} service files to migrate`);

    for (const file of files) {
      const filePath = path.join(servicesDir, file);
      const rawData = fs.readFileSync(filePath, 'utf-8');
      const serviceData: ServiceJSON = JSON.parse(rawData);

      console.log(`\n📝 Processing: ${serviceData.slug}`);

      // Transform data to match database schema
      const dbData = {
        slug: serviceData.slug,
        // Multilingual title (currently only English in JSON)
        title: {
          en: serviceData.title,
          fr: serviceData.title, // TODO: Add French translation
          ar: serviceData.title  // TODO: Add Arabic translation
        },
        // Multilingual description
        description: {
          en: serviceData.description,
          fr: serviceData.description,
          ar: serviceData.description
        },
        // Short description from tagline
        shortDescription: serviceData.tagline ? {
          en: serviceData.tagline,
          fr: serviceData.tagline,
          ar: serviceData.tagline
        } : null,
        icon: serviceData.icon || null,
        // Features from benefits
        features: serviceData.benefits?.map(b => ({
          en: `${b.title}: ${b.description}`,
          fr: `${b.title}: ${b.description}`,
          ar: `${b.title}: ${b.description}`
        })) || [],

        // Hide pricing per requirements
        showPricing: false,
        pricingType: 'custom' as const,
        pricingInfo: serviceData.pricing || null,

        // Process with enhanced deliverables
        process: serviceData.process?.map(p => ({
          step: p.step,
          title: p.title,
          description: p.description,
          duration: p.step === 1 ? '1-2 weeks' : p.step === 2 ? '2-3 weeks' : p.step === 3 ? '4-6 weeks' : '1-2 weeks',
          deliverables: getDeliverablesForPhase(p.step)
        })) || [],

        // Methodology (example data - should be customized per service)
        methodology: {
          approach: {
            principles: [
              { name: 'Agile Development', icon: '🔄', description: 'Iterative development with continuous feedback' },
              { name: 'Code Quality', icon: '✨', description: 'Clean code with comprehensive testing' },
              { name: 'Collaboration', icon: '🤝', description: 'Regular communication and transparency' },
              { name: 'Best Practices', icon: '🎯', description: 'Industry standards and modern patterns' }
            ]
          },
          quality: {
            testingLevels: ['Unit Testing', 'Integration Testing', 'E2E Testing', 'Performance Testing'],
            checkpoints: ['Code Review', 'Security Audit', 'Performance Optimization', 'Accessibility Compliance']
          },
          support: {
            sla: [
              { level: 'Critical', responseTime: '2 hours' },
              { level: 'High', responseTime: '8 hours' },
              { level: 'Medium', responseTime: '24 hours' },
              { level: 'Low', responseTime: '48 hours' }
            ],
            guarantees: [
              '99.9% Uptime SLA',
              '30-day Bug Fix Guarantee',
              'Free Security Updates for 6 months',
              'Performance Monitoring'
            ]
          }
        },

        teamSize: '3-5 developers',
        expertiseAreas: ['Frontend Development', 'Backend Development', 'DevOps', 'UI/UX Design'],
        techStack: serviceData.techStack?.map(t => ({
          name: t.name,
          logo: t.icon,
          category: categorizeTech(t.name)
        })) || [],

        // Social proof metrics
        metrics: [
          { value: '50+', label: 'Projects Delivered', icon: '🚀' },
          { value: '98%', label: 'Client Satisfaction', icon: '⭐' },
          { value: '45%', label: 'Avg. Performance Boost', icon: '📈' },
          { value: '24/7', label: 'Support Available', icon: '💬' }
        ],

        // Featured testimonials (example - should be real data)
        featuredTestimonials: [
          {
            quote: 'The Elites delivered an exceptional solution that exceeded our expectations. Their attention to detail and technical expertise is unmatched.',
            author: 'John Doe',
            company: 'Tech Corp',
            logo: '/logos/techcorp.svg'
          }
        ],

        // CTA configuration
        ctaType: 'both' as const,
        ctaButtonText: {
          quote: {
            en: 'Request Quote',
            fr: 'Demander un Devis',
            ar: 'طلب عرض أسعار'
          },
          consultation: {
            en: 'Schedule Consultation',
            fr: 'Planifier une Consultation',
            ar: 'جدولة استشارة'
          }
        },

        isActive: true,
        isFeatured: serviceData.slug === 'web-development',
        orderIndex: files.indexOf(file)
      };

      // Check if service already exists
      const existing = await db.select().from(services).where(eq(services.slug, serviceData.slug));

      if (existing.length > 0) {
        console.log(`   ✏️  Updating existing service: ${serviceData.slug}`);
        await db.update(services)
          .set(dbData)
          .where(eq(services.slug, serviceData.slug));
      } else {
        console.log(`   ➕ Creating new service: ${serviceData.slug}`);
        await db.insert(services).values(dbData);
      }

      console.log(`   ✅ Migrated: ${serviceData.slug}`);
    }

    console.log('\n✨ Services migration completed successfully!');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Helper functions
function getDeliverablesForPhase(step: number): string[] {
  const deliverables: Record<number, string[]> = {
    1: ['Project Requirements Document', 'Technical Architecture Plan', 'Timeline & Milestones', 'Resource Allocation'],
    2: ['Design Mockups', 'Interactive Prototypes', 'Style Guide', 'Component Library'],
    3: ['Production-Ready Code', 'API Documentation', 'Test Reports', 'Performance Audit'],
    4: ['Deployment Guide', 'Monitoring Setup', 'Support Documentation', 'Handover Session']
  };
  return deliverables[step] || [];
}

function categorizeTech(name: string): string {
  const categories: Record<string, string> = {
    'React': 'Frontend',
    'Next.js': 'Frontend',
    'TypeScript': 'Language',
    'Node.js': 'Backend',
    'Tailwind CSS': 'Styling',
    'PostgreSQL': 'Database',
    'MongoDB': 'Database',
    'Express': 'Backend',
    'Vue': 'Frontend',
    'Angular': 'Frontend'
  };
  return categories[name] || 'Tool';
}

// Run migration
migrateServices()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
