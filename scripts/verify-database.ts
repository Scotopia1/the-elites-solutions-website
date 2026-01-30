import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables
config({ path: resolve(__dirname, '../.env.local') });

import { db } from '../src/lib/database/postgres';
import { services } from '../src/db/schema/postgres/services';
import { projects } from '../src/db/schema/postgres/projects';
import { newsletterSubscribers } from '../src/db/schema/postgres/newsletter';
import { sql } from 'drizzle-orm';

async function verifyDatabase() {
  console.log('🔍 Verifying database contents...\n');

  try {
    // Check services
    console.log('📊 SERVICES:');
    const allServices = await db.select().from(services);
    console.log(`   Total services: ${allServices.length}`);

    if (allServices.length > 0) {
      console.log('   Services found:');
      allServices.forEach((service, index) => {
        console.log(`   ${index + 1}. ${service.slug}`);
        console.log(`      - Has methodology: ${!!service.methodology}`);
        console.log(`      - Has metrics: ${!!service.metrics}`);
        console.log(`      - Has process: ${!!service.process}`);
        console.log(`      - Show pricing: ${service.showPricing}`);
      });
    }

    console.log('\n📊 PROJECTS:');
    const allProjects = await db.select().from(projects);
    console.log(`   Total projects: ${allProjects.length}`);

    if (allProjects.length > 0) {
      console.log('   Projects found:');
      allProjects.forEach((project, index) => {
        console.log(`   ${index + 1}. ${project.slug}`);
        console.log(`      - Category: ${project.category}`);
        console.log(`      - Industry: ${project.industry}`);
        console.log(`      - Project Scale: ${project.projectScale}`);
        console.log(`      - Has short description: ${!!project.shortDescription}`);
        console.log(`      - Technologies: ${project.technologies?.length || 0}`);
      });
    }

    console.log('\n📊 NEWSLETTER SUBSCRIBERS:');
    const subscribers = await db.select().from(newsletterSubscribers);
    console.log(`   Total subscribers: ${subscribers.length}`);

    // Check database statistics
    console.log('\n📈 DATABASE STATISTICS:');
    const servicesCount = await db.select({ count: sql<number>`count(*)::int` }).from(services);
    const projectsCount = await db.select({ count: sql<number>`count(*)::int` }).from(projects);
    const subscribersCount = await db.select({ count: sql<number>`count(*)::int` }).from(newsletterSubscribers);

    console.log(`   Services: ${servicesCount[0].count}`);
    console.log(`   Projects: ${projectsCount[0].count}`);
    console.log(`   Newsletter Subscribers: ${subscribersCount[0].count}`);

    // Check for new fields
    console.log('\n✅ SCHEMA VERIFICATION:');
    const sampleService = allServices[0];
    if (sampleService) {
      console.log('   Services table has new fields:');
      console.log(`   - methodology: ${sampleService.methodology ? '✓' : '✗'}`);
      console.log(`   - metrics: ${sampleService.metrics ? '✓' : '✗'}`);
      console.log(`   - process: ${sampleService.process ? '✓' : '✗'}`);
      console.log(`   - ctaType: ${sampleService.ctaType ? '✓' : '✗'}`);
      console.log(`   - showPricing: ${typeof sampleService.showPricing === 'boolean' ? '✓' : '✗'}`);
    }

    const sampleProject = allProjects[0];
    if (sampleProject) {
      console.log('\n   Projects table has new fields:');
      console.log(`   - category: ${sampleProject.category ? '✓' : '✗'}`);
      console.log(`   - industry: ${sampleProject.industry ? '✓' : '✗'}`);
      console.log(`   - projectScale: ${sampleProject.projectScale ? '✓' : '✗'}`);
      console.log(`   - shortDescription: ${sampleProject.shortDescription ? '✓' : '✗'}`);
      console.log(`   - overview: ${sampleProject.overview ? '✓' : '✗'}`);
      console.log(`   - timeline: ${sampleProject.timeline ? '✓' : '✗'}`);
    }

    console.log('\n✨ Database verification completed successfully!\n');

    // Sample data check
    console.log('📋 SAMPLE SERVICE DATA:');
    if (allServices.length > 0) {
      const sample = allServices[0];
      console.log(`   Slug: ${sample.slug}`);
      console.log(`   Title: ${JSON.stringify(sample.title)}`);
      console.log(`   CTA Type: ${sample.ctaType}`);
      if (sample.methodology) {
        const methodology = sample.methodology as any;
        console.log(`   Methodology principles: ${methodology?.approach?.principles?.length || 0}`);
      }
      if (sample.metrics) {
        const metrics = sample.metrics as any;
        console.log(`   Social proof metrics: ${Array.isArray(metrics) ? metrics.length : 0}`);
      }
    }

    console.log('\n📋 SAMPLE PROJECT DATA:');
    if (allProjects.length > 0) {
      const sample = allProjects[0];
      console.log(`   Slug: ${sample.slug}`);
      console.log(`   Title: ${JSON.stringify(sample.title)}`);
      console.log(`   Category: ${sample.category}`);
      console.log(`   Industry: ${sample.industry}`);
      console.log(`   Scale: ${sample.projectScale}`);
      console.log(`   Technologies: ${sample.technologies?.join(', ')}`);
    }

  } catch (error) {
    console.error('❌ Error verifying database:', error);
    process.exit(1);
  }

  process.exit(0);
}

verifyDatabase();
