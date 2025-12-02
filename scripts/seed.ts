import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as bcrypt from 'bcryptjs';
import { users, services, projects } from '../src/db/schema/postgres';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const DATABASE_URL = process.env.DATABASE_URL!;

if (!DATABASE_URL) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

async function main() {
  console.log('🌱 Starting database seeding...');

  const client = postgres(DATABASE_URL);
  const db = drizzle(client);

  try {
    // 1. Create admin user
    console.log('👤 Creating admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const [admin] = await db
      .insert(users)
      .values({
        email: 'admin@theelites.com',
        passwordHash: hashedPassword,
        name: 'Admin User',
        role: 'admin',
      })
      .returning();

    console.log('✅ Admin user created:', admin.email);

    // 2. Create sample services
    console.log('\n📦 Creating sample services...');

    const sampleServices = [
      {
        title: {
          en: 'Custom Web Development',
          fr: 'Développement Web Personnalisé',
          ar: 'تطوير الويب المخصص',
        },
        slug: 'custom-web-development',
        description: {
          en: 'Full-stack web applications built with modern technologies. We create scalable, secure, and high-performance solutions tailored to your business needs.',
          fr: 'Applications web full-stack construites avec des technologies modernes. Nous créons des solutions évolutives, sécurisées et performantes adaptées à vos besoins.',
          ar: 'تطبيقات ويب متكاملة مبنية بتقنيات حديثة. نقوم بإنشاء حلول قابلة للتوسع وآمنة وعالية الأداء مصممة خصيصًا لاحتياجات عملك.',
        },
        shortDescription: {
          en: 'Modern, scalable web applications',
          fr: 'Applications web modernes et évolutives',
          ar: 'تطبيقات ويب حديثة وقابلة للتوسع',
        },
        icon: 'Code',
        features: {
          en: ['React & Next.js', 'Node.js Backend', 'PostgreSQL Database', 'RESTful APIs', 'Responsive Design', 'SEO Optimized'],
          fr: ['React & Next.js', 'Backend Node.js', 'Base de données PostgreSQL', 'API RESTful', 'Design Responsive', 'Optimisé SEO'],
          ar: ['React و Next.js', 'خادم Node.js', 'قاعدة بيانات PostgreSQL', 'واجهات RESTful', 'تصميم متجاوب', 'محسّن لمحركات البحث'],
        },
        pricingType: 'project',
        pricingInfo: {
          en: 'Starting from $5,000',
          fr: 'À partir de 5 000 $',
          ar: 'ابتداءً من 5000 دولار',
        },
        orderIndex: 1,
        isActive: true,
        isFeatured: true,
      },
      {
        title: {
          en: 'Mobile App Development',
          fr: 'Développement d\'Applications Mobiles',
          ar: 'تطوير تطبيقات الجوال',
        },
        slug: 'mobile-app-development',
        description: {
          en: 'Native and cross-platform mobile applications for iOS and Android. Beautiful, intuitive interfaces with robust backend systems.',
          fr: 'Applications mobiles natives et multiplateformes pour iOS et Android. Interfaces belles et intuitives avec des systèmes backend robustes.',
          ar: 'تطبيقات جوال أصلية ومتعددة المنصات لنظامي iOS و Android. واجهات جميلة وبديهية مع أنظمة خادم قوية.',
        },
        shortDescription: {
          en: 'iOS & Android native apps',
          fr: 'Applications natives iOS et Android',
          ar: 'تطبيقات أصلية لنظامي iOS و Android',
        },
        icon: 'Smartphone',
        features: {
          en: ['React Native', 'iOS & Android', 'Push Notifications', 'Offline Support', 'App Store Deployment', 'Analytics Integration'],
          fr: ['React Native', 'iOS et Android', 'Notifications Push', 'Support Hors Ligne', 'Déploiement App Store', 'Intégration Analytics'],
          ar: ['React Native', 'iOS و Android', 'إشعارات فورية', 'دعم غير متصل', 'نشر على متاجر التطبيقات', 'تكامل التحليلات'],
        },
        pricingType: 'project',
        pricingInfo: {
          en: 'Starting from $8,000',
          fr: 'À partir de 8 000 $',
          ar: 'ابتداءً من 8000 دولار',
        },
        orderIndex: 2,
        isActive: true,
        isFeatured: true,
      },
      {
        title: {
          en: 'Business Automation',
          fr: 'Automatisation des Processus',
          ar: 'أتمتة الأعمال',
        },
        slug: 'business-automation',
        description: {
          en: 'Streamline your business operations with custom automation solutions. From workflow automation to data integration and reporting.',
          fr: 'Rationalisez vos opérations commerciales avec des solutions d\'automatisation personnalisées. De l\'automatisation des flux de travail à l\'intégration et au reporting des données.',
          ar: 'قم بتبسيط عمليات عملك من خلال حلول الأتمتة المخصصة. من أتمتة سير العمل إلى تكامل البيانات وإعداد التقارير.',
        },
        shortDescription: {
          en: 'Workflow & process automation',
          fr: 'Automatisation des workflows',
          ar: 'أتمتة سير العمل والعمليات',
        },
        icon: 'Zap',
        features: {
          en: ['Custom Workflows', 'API Integration', 'Data Synchronization', 'Email Automation', 'Report Generation', 'Third-party Integrations'],
          fr: ['Flux de Travail Personnalisés', 'Intégration API', 'Synchronisation des Données', 'Automatisation Email', 'Génération de Rapports', 'Intégrations Tierces'],
          ar: ['سير عمل مخصص', 'تكامل API', 'مزامنة البيانات', 'أتمتة البريد الإلكتروني', 'توليد التقارير', 'تكاملات الطرف الثالث'],
        },
        pricingType: 'project',
        pricingInfo: {
          en: 'Starting from $3,000',
          fr: 'À partir de 3 000 $',
          ar: 'ابتداءً من 3000 دولار',
        },
        orderIndex: 3,
        isActive: true,
        isFeatured: false,
      },
      {
        title: {
          en: 'Custom Software Solutions',
          fr: 'Solutions Logicielles Personnalisées',
          ar: 'حلول برمجية مخصصة',
        },
        slug: 'custom-software-solutions',
        description: {
          en: 'Bespoke software development for unique business challenges. Enterprise-grade solutions designed to scale with your business.',
          fr: 'Développement de logiciels sur mesure pour des défis commerciaux uniques. Solutions de niveau entreprise conçues pour évoluer avec votre entreprise.',
          ar: 'تطوير برمجيات مخصصة لتحديات الأعمال الفريدة. حلول على مستوى المؤسسات مصممة للنمو مع عملك.',
        },
        shortDescription: {
          en: 'Enterprise-grade solutions',
          fr: 'Solutions de niveau entreprise',
          ar: 'حلول على مستوى المؤسسات',
        },
        icon: 'Settings',
        features: {
          en: ['Requirements Analysis', 'Custom Architecture', 'Cloud Deployment', 'Security Audits', 'Maintenance & Support', 'Training & Documentation'],
          fr: ['Analyse des Besoins', 'Architecture Personnalisée', 'Déploiement Cloud', 'Audits de Sécurité', 'Maintenance et Support', 'Formation et Documentation'],
          ar: ['تحليل المتطلبات', 'هندسة معمارية مخصصة', 'نشر سحابي', 'مراجعات أمنية', 'الصيانة والدعم', 'التدريب والتوثيق'],
        },
        pricingType: 'custom',
        pricingInfo: {
          en: 'Custom quote based on requirements',
          fr: 'Devis personnalisé selon les besoins',
          ar: 'عرض سعر مخصص حسب المتطلبات',
        },
        orderIndex: 4,
        isActive: true,
        isFeatured: false,
      },
    ];

    const insertedServices = await db.insert(services).values(sampleServices).returning();
    console.log(`✅ Created ${insertedServices.length} services`);

    // 3. Create sample projects
    console.log('\n🎨 Creating sample projects...');

    const sampleProjects = [
      {
        title: {
          en: 'E-Commerce Platform Redesign',
          fr: 'Refonte de Plateforme E-Commerce',
          ar: 'إعادة تصميم منصة التجارة الإلكترونية',
        },
        slug: 'ecommerce-platform-redesign',
        clientName: 'TechMart Inc.',
        challenge: {
          en: 'TechMart needed a modern, fast, and scalable e-commerce platform to handle 10,000+ daily visitors and improve conversion rates.',
          fr: 'TechMart avait besoin d\'une plateforme e-commerce moderne, rapide et évolutive pour gérer plus de 10 000 visiteurs quotidiens et améliorer les taux de conversion.',
          ar: 'احتاجت TechMart إلى منصة تجارة إلكترونية حديثة وسريعة وقابلة للتوسع للتعامل مع أكثر من 10000 زائر يوميًا وتحسين معدلات التحويل.',
        },
        solution: {
          en: 'We built a headless e-commerce solution using Next.js, Shopify, and PostgreSQL. Implemented advanced search, personalized recommendations, and a streamlined checkout process.',
          fr: 'Nous avons construit une solution e-commerce headless utilisant Next.js, Shopify et PostgreSQL. Implémentation de recherche avancée, recommandations personnalisées et processus de paiement optimisé.',
          ar: 'قمنا ببناء حل تجارة إلكترونية headless باستخدام Next.js و Shopify و PostgreSQL. تطبيق بحث متقدم وتوصيات مخصصة وعملية دفع مبسطة.',
        },
        results: {
          en: '• 45% increase in conversion rate\n• 60% faster page load times\n• 200% increase in mobile sales\n• $2M+ additional annual revenue',
          fr: '• Augmentation de 45% du taux de conversion\n• Temps de chargement 60% plus rapides\n• Augmentation de 200% des ventes mobiles\n• Plus de 2M$ de revenus annuels supplémentaires',
          ar: '• زيادة 45% في معدل التحويل\n• أوقات تحميل أسرع بنسبة 60%\n• زيادة 200% في مبيعات الجوال\n• أكثر من 2 مليون دولار إيرادات سنوية إضافية',
        },
        technologies: ['Next.js', 'React', 'TypeScript', 'Shopify', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
        servicesUsed: [insertedServices[0].id],
        images: {
          gallery: ['/projects/techmart-1.jpg', '/projects/techmart-2.jpg', '/projects/techmart-3.jpg'],
        },
        featuredImageUrl: '/projects/techmart-featured.jpg',
        projectUrl: 'https://techmart-demo.theelites.com',
        duration: '3 months',
        isFeatured: true,
        isPublished: true,
        publishedAt: new Date('2024-10-15'),
        orderIndex: 1,
      },
      {
        title: {
          en: 'Healthcare Management System',
          fr: 'Système de Gestion de Santé',
          ar: 'نظام إدارة الرعاية الصحية',
        },
        slug: 'healthcare-management-system',
        clientName: 'MediCare Clinic',
        challenge: {
          en: 'MediCare needed a comprehensive system to manage patient records, appointments, billing, and staff scheduling across multiple locations.',
          fr: 'MediCare avait besoin d\'un système complet pour gérer les dossiers patients, rendez-vous, facturation et planification du personnel dans plusieurs emplacements.',
          ar: 'احتاجت MediCare إلى نظام شامل لإدارة سجلات المرضى والمواعيد والفواتير وجدولة الموظفين عبر مواقع متعددة.',
        },
        solution: {
          en: 'Developed a HIPAA-compliant web application with real-time scheduling, electronic health records (EHR), automated billing, and analytics dashboard.',
          fr: 'Développement d\'une application web conforme HIPAA avec planification en temps réel, dossiers médicaux électroniques (DME), facturation automatisée et tableau de bord analytique.',
          ar: 'تطوير تطبيق ويب متوافق مع HIPAA مع جدولة في الوقت الفعلي وسجلات صحية إلكترونية وفواتير آلية ولوحة معلومات تحليلية.',
        },
        results: {
          en: '• 70% reduction in administrative time\n• 95% patient satisfaction score\n• 40% increase in appointment capacity\n• Seamless multi-location coordination',
          fr: '• Réduction de 70% du temps administratif\n• Score de satisfaction patient de 95%\n• Augmentation de 40% de la capacité de rendez-vous\n• Coordination multi-sites fluide',
          ar: '• تقليل 70% في الوقت الإداري\n• درجة رضا المرضى 95%\n• زيادة 40% في سعة المواعيد\n• تنسيق سلس متعدد المواقع',
        },
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Tailwind CSS'],
        servicesUsed: [insertedServices[0].id, insertedServices[3].id],
        images: {
          gallery: ['/projects/medicare-1.jpg', '/projects/medicare-2.jpg'],
        },
        featuredImageUrl: '/projects/medicare-featured.jpg',
        duration: '6 months',
        isFeatured: true,
        isPublished: true,
        publishedAt: new Date('2024-09-01'),
        orderIndex: 2,
      },
      {
        title: {
          en: 'Real Estate Mobile App',
          fr: 'Application Mobile Immobilière',
          ar: 'تطبيق جوال للعقارات',
        },
        slug: 'real-estate-mobile-app',
        clientName: 'PropFinder',
        challenge: {
          en: 'PropFinder wanted a mobile-first platform for property search with AR visualization, virtual tours, and instant agent communication.',
          fr: 'PropFinder voulait une plateforme mobile-first pour la recherche immobilière avec visualisation AR, visites virtuelles et communication instantanée avec les agents.',
          ar: 'أرادت PropFinder منصة جوال أولاً للبحث عن العقارات مع تصور الواقع المعزز وجولات افتراضية واتصال فوري مع الوكلاء.',
        },
        solution: {
          en: 'Built a cross-platform mobile app using React Native with AR integration, real-time chat, advanced filters, and seamless map integration.',
          fr: 'Construction d\'une application mobile multiplateforme avec React Native intégrant AR, chat en temps réel, filtres avancés et intégration cartographique fluide.',
          ar: 'بناء تطبيق جوال متعدد المنصات باستخدام React Native مع تكامل الواقع المعزز ومحادثة في الوقت الفعلي وفلاتر متقدمة وتكامل خرائط سلس.',
        },
        results: {
          en: '• 100,000+ downloads in 6 months\n• 4.8/5 App Store rating\n• 30% faster property discovery\n• 50% increase in agent inquiries',
          fr: '• Plus de 100 000 téléchargements en 6 mois\n• Note App Store de 4,8/5\n• Découverte de propriétés 30% plus rapide\n• Augmentation de 50% des demandes d\'agents',
          ar: '• أكثر من 100000 تنزيل في 6 أشهر\n• تقييم App Store 4.8/5\n• اكتشاف عقارات أسرع بنسبة 30%\n• زيادة 50% في استفسارات الوكلاء',
        },
        technologies: ['React Native', 'TypeScript', 'Node.js', 'MongoDB', 'ARKit', 'Google Maps API'],
        servicesUsed: [insertedServices[1].id],
        images: {
          gallery: ['/projects/propfinder-1.jpg', '/projects/propfinder-2.jpg', '/projects/propfinder-3.jpg'],
        },
        featuredImageUrl: '/projects/propfinder-featured.jpg',
        projectUrl: 'https://apps.apple.com/propfinder',
        duration: '4 months',
        isFeatured: true,
        isPublished: true,
        publishedAt: new Date('2024-11-01'),
        orderIndex: 3,
      },
    ];

    const insertedProjects = await db.insert(projects).values(sampleProjects).returning();
    console.log(`✅ Created ${insertedProjects.length} projects`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📝 Admin Credentials:');
    console.log('   Email: admin@theelites.com');
    console.log('   Password: admin123');
    console.log('\n⚠️  IMPORTANT: Change the admin password after first login!');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
