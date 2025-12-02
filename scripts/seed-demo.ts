import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { projects } from '../src/db/schema/postgres';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const DATABASE_URL = process.env.DATABASE_URL!;

if (!DATABASE_URL) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

async function main() {
  console.log('🌱 Adding demo projects for showcase...');

  const client = postgres(DATABASE_URL);
  const db = drizzle(client);

  try {
    // Add 7 more demo projects to showcase
    const demoProjects = [
      {
        title: {
          en: 'FinTech Banking Platform',
          fr: 'Plateforme Bancaire FinTech',
          ar: 'منصة بنكية للتكنولوجيا المالية',
        },
        slug: 'fintech-banking-platform',
        clientName: 'FinFlow Bank',
        challenge: {
          en: 'FinFlow needed a modern digital banking platform to serve 100,000+ customers with real-time transactions, fraud detection, and seamless mobile banking experience.',
          fr: 'FinFlow avait besoin d\'une plateforme bancaire numérique moderne pour servir plus de 100 000 clients avec des transactions en temps réel, détection de fraude et expérience bancaire mobile fluide.',
          ar: 'احتاجت FinFlow إلى منصة بنكية رقمية حديثة لخدمة أكثر من 100,000 عميل مع معاملات في الوقت الفعلي واكتشاف الاحتيال وتجربة مصرفية محمولة سلسة.',
        },
        solution: {
          en: 'We built a secure, scalable platform using Next.js, Node.js microservices, PostgreSQL, Redis for caching, Stripe for payments, and AWS infrastructure with advanced security.',
          fr: 'Nous avons construit une plateforme sécurisée et évolutive utilisant Next.js, microservices Node.js, PostgreSQL, Redis pour la mise en cache, Stripe pour les paiements et infrastructure AWS avec sécurité avancée.',
          ar: 'قمنا ببناء منصة آمنة وقابلة للتوسع باستخدام Next.js وخدمات Node.js المصغرة و PostgreSQL و Redis للتخزين المؤقت و Stripe للمدفوعات وبنية AWS التحتية مع أمان متقدم.',
        },
        results: {
          en: '• 100K+ active users\n• $10M+ monthly transactions\n• 99.99% uptime\n• Real-time fraud detection',
          fr: '• Plus de 100K utilisateurs actifs\n• Plus de 10M$ de transactions mensuelles\n• 99,99% de disponibilité\n• Détection de fraude en temps réel',
          ar: '• أكثر من 100 ألف مستخدم نشط\n• أكثر من 10 مليون دولار معاملات شهرية\n• 99.99% وقت التشغيل\n• كشف الاحتيال في الوقت الفعلي',
        },
        technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe', 'AWS'],
        featuredImageUrl: '/projects/finflow-featured.jpg',
        projectUrl: 'https://example.com/finflow',
        duration: '5 months',
        publishedAt: new Date('2024-11-15'),
        isPublished: true,
        isFeatured: true,
        orderIndex: 4,
      },
      {
        title: {
          en: 'Food Delivery Super App',
          fr: 'Super App de Livraison de Nourriture',
          ar: 'تطبيق توصيل الطعام الشامل',
        },
        slug: 'food-delivery-app',
        clientName: 'QuickBite',
        challenge: {
          en: 'QuickBite wanted to create a comprehensive food delivery ecosystem serving 50+ cities with restaurant management, real-time tracking, and personalized recommendations.',
          fr: 'QuickBite voulait créer un écosystème complet de livraison de nourriture desservant plus de 50 villes avec gestion de restaurants, suivi en temps réel et recommandations personnalisées.',
          ar: 'أرادت QuickBite إنشاء نظام بيئي شامل لتوصيل الطعام يخدم أكثر من 50 مدينة مع إدارة المطاعم والتتبع في الوقت الفعلي والتوصيات المخصصة.',
        },
        solution: {
          en: 'Built a cross-platform mobile app using React Native with AI-powered recommendations, real-time GPS tracking, Firebase for real-time updates, and integrated payment systems.',
          fr: 'Construction d\'une application mobile multiplateforme avec React Native incluant recommandations IA, suivi GPS en temps réel, Firebase pour mises à jour temps réel et systèmes de paiement intégrés.',
          ar: 'بناء تطبيق جوال متعدد المنصات باستخدام React Native مع توصيات مدعومة بالذكاء الاصطناعي وتتبع GPS في الوقت الفعلي و Firebase للتحديثات الفورية وأنظمة دفع متكاملة.',
        },
        results: {
          en: '• 500K+ downloads\n• 4.8★ app rating\n• 1M+ orders processed\n• Serving 50+ cities',
          fr: '• Plus de 500K téléchargements\n• Note de 4,8★\n• Plus d\'1M de commandes traitées\n• Dessert plus de 50 villes',
          ar: '• أكثر من 500 ألف تنزيل\n• تقييم 4.8 نجوم\n• أكثر من مليون طلب معالج\n• خدمة أكثر من 50 مدينة',
        },
        technologies: ['React Native', 'Node.js', 'MongoDB', 'Firebase', 'Google Maps API'],
        featuredImageUrl: '/projects/quickbite-featured.jpg',
        duration: '4 months',
        publishedAt: new Date('2024-10-20'),
        isPublished: true,
        isFeatured: true,
        orderIndex: 5,
      },
      {
        title: {
          en: 'Enterprise HR Management System',
          fr: 'Système de Gestion RH d\'Entreprise',
          ar: 'نظام إدارة الموارد البشرية للمؤسسات',
        },
        slug: 'enterprise-hr-system',
        clientName: 'GlobalCorp',
        challenge: {
          en: 'GlobalCorp needed a comprehensive HR platform to handle recruitment, payroll, performance reviews, and employee engagement across multiple departments with 1000+ employees.',
          fr: 'GlobalCorp avait besoin d\'une plateforme RH complète pour gérer recrutement, paie, évaluations de performance et engagement employés dans plusieurs départements avec plus de 1000 employés.',
          ar: 'احتاجت GlobalCorp إلى منصة موارد بشرية شاملة للتعامل مع التوظيف وكشوف المرتبات ومراجعات الأداء ومشاركة الموظفين عبر أقسام متعددة مع أكثر من 1000 موظف.',
        },
        solution: {
          en: 'Developed a full-stack HR platform using React frontend, Python backend, PostgreSQL database, containerized with Docker, and deployed on Azure cloud infrastructure.',
          fr: 'Développement d\'une plateforme RH full-stack utilisant interface React, backend Python, base de données PostgreSQL, conteneurisée avec Docker et déployée sur infrastructure cloud Azure.',
          ar: 'تطوير منصة موارد بشرية متكاملة باستخدام واجهة React وخادم Python وقاعدة بيانات PostgreSQL ومحتواة مع Docker ومنشورة على بنية Azure السحابية.',
        },
        results: {
          en: '• Managing 5,000+ employees\n• 40% efficiency improvement\n• 92% employee satisfaction\n• Streamlined multi-department ops',
          fr: '• Gestion de plus de 5 000 employés\n• Amélioration de 40% de l\'efficacité\n• 92% de satisfaction employés\n• Opérations multi-départements rationalisées',
          ar: '• إدارة أكثر من 5000 موظف\n• تحسين 40% في الكفاءة\n• رضا 92% من الموظفين\n• عمليات متعددة الأقسام مبسطة',
        },
        technologies: ['React', 'Python', 'PostgreSQL', 'Docker', 'Azure'],
        featuredImageUrl: '/projects/globalcorp-featured.jpg',
        duration: '6 months',
        publishedAt: new Date('2024-09-10'),
        isPublished: true,
        isFeatured: false,
        orderIndex: 6,
      },
      {
        title: {
          en: 'Smart Inventory Management',
          fr: 'Gestion Intelligente des Stocks',
          ar: 'إدارة المخزون الذكية',
        },
        slug: 'smart-inventory-management',
        clientName: 'LogiTech Solutions',
        challenge: {
          en: 'LogiTech needed an intelligent inventory system with predictive analytics, automated reordering, and real-time tracking across 20+ warehouse locations to reduce wastage.',
          fr: 'LogiTech avait besoin d\'un système de stock intelligent avec analyses prédictives, réapprovisionnement automatisé et suivi temps réel dans plus de 20 entrepôts pour réduire le gaspillage.',
          ar: 'احتاجت LogiTech إلى نظام مخزون ذكي مع تحليلات تنبؤية وإعادة طلب تلقائي وتتبع في الوقت الفعلي عبر أكثر من 20 موقع مستودع لتقليل الهدر.',
        },
        solution: {
          en: 'Built an AI-powered inventory system using Python, TensorFlow for predictive analytics, FastAPI for backend, PostgreSQL for data storage, and Redis for real-time caching and tracking.',
          fr: 'Construction d\'un système de stock basé sur l\'IA utilisant Python, TensorFlow pour analyses prédictives, FastAPI pour backend, PostgreSQL pour stockage données et Redis pour cache et suivi temps réel.',
          ar: 'بناء نظام مخزون مدعوم بالذكاء الاصطناعي باستخدام Python و TensorFlow للتحليلات التنبؤية و FastAPI للخادم و PostgreSQL لتخزين البيانات و Redis للتخزين المؤقت والتتبع في الوقت الفعلي.',
        },
        results: {
          en: '• 35% reduction in wastage\n• 99.2% inventory accuracy\n• $2M+ annual cost savings\n• 20+ warehouses synchronized',
          fr: '• Réduction de 35% du gaspillage\n• 99,2% de précision d\'inventaire\n• Plus de 2M$ d\'économies annuelles\n• 20+ entrepôts synchronisés',
          ar: '• تقليل 35% في الهدر\n• دقة مخزون 99.2%\n• أكثر من 2 مليون دولار وفورات سنوية\n• 20+ مستودعًا متزامنًا',
        },
        technologies: ['Python', 'TensorFlow', 'FastAPI', 'PostgreSQL', 'Redis'],
        featuredImageUrl: '/projects/logitech-featured.jpg',
        duration: '5 months',
        publishedAt: new Date('2024-08-15'),
        isPublished: true,
        isFeatured: false,
        orderIndex: 7,
      },
      {
        title: {
          en: 'Virtual Event Platform',
          fr: 'Plateforme d\'Événements Virtuels',
          ar: 'منصة الفعاليات الافتراضية',
        },
        slug: 'virtual-event-platform',
        clientName: 'EventFlow',
        challenge: {
          en: 'EventFlow needed an immersive virtual events platform supporting 10,000+ concurrent attendees with HD streaming, networking rooms, interactive exhibits, and reliable global delivery.',
          fr: 'EventFlow avait besoin d\'une plateforme d\'événements virtuels immersive supportant plus de 10 000 participants simultanés avec diffusion HD, salles réseautage, expositions interactives et livraison mondiale fiable.',
          ar: 'احتاجت EventFlow إلى منصة فعاليات افتراضية غامرة تدعم أكثر من 10,000 حضور متزامن مع بث عالي الدقة وغرف تواصل ومعارض تفاعلية وتسليم عالمي موثوق.',
        },
        solution: {
          en: 'Created a scalable platform using Next.js, WebRTC for real-time video streaming, Socket.io for live interactions, AWS infrastructure, and global CDN for reliable content delivery.',
          fr: 'Création d\'une plateforme évolutive utilisant Next.js, WebRTC pour streaming vidéo temps réel, Socket.io pour interactions en direct, infrastructure AWS et CDN mondial pour livraison contenu fiable.',
          ar: 'إنشاء منصة قابلة للتوسع باستخدام Next.js و WebRTC لبث الفيديو في الوقت الفعلي و Socket.io للتفاعلات المباشرة وبنية AWS التحتية و CDN عالمي لتوصيل المحتوى الموثوق.',
        },
        results: {
          en: '• 500+ events hosted\n• 100K+ total attendees\n• 85% engagement rate\n• 10K+ concurrent capacity',
          fr: '• Plus de 500 événements hébergés\n• Plus de 100K participants au total\n• Taux d\'engagement de 85%\n• Capacité de 10K+ simultanés',
          ar: '• أكثر من 500 حدث مستضاف\n• أكثر من 100 ألف حضور إجمالي\n• معدل مشاركة 85%\n• سعة أكثر من 10 آلاف متزامن',
        },
        technologies: ['Next.js', 'WebRTC', 'Socket.io', 'AWS', 'CDN'],
        featuredImageUrl: '/projects/eventflow-featured.jpg',
        duration: '4 months',
        publishedAt: new Date('2024-07-01'),
        isPublished: true,
        isFeatured: false,
        orderIndex: 8,
      },
      {
        title: {
          en: 'Fitness Coaching Platform',
          fr: 'Plateforme de Coaching Fitness',
          ar: 'منصة تدريب اللياقة البدنية',
        },
        slug: 'fitness-coaching-platform',
        clientName: 'FitLife Pro',
        challenge: {
          en: 'FitLife Pro wanted a comprehensive fitness app with personalized workout plans, nutrition tracking, video coaching, community features, and subscription payments to engage 200K+ users.',
          fr: 'FitLife Pro voulait une application fitness complète avec plans d\'entraînement personnalisés, suivi nutritionnel, coaching vidéo, fonctionnalités communautaires et paiements d\'abonnement pour engager plus de 200K utilisateurs.',
          ar: 'أرادت FitLife Pro تطبيق لياقة بدنية شامل مع خطط تمرين مخصصة وتتبع التغذية وتدريب بالفيديو وميزات المجتمع ومدفوعات الاشتراك لإشراك أكثر من 200 ألف مستخدم.',
        },
        solution: {
          en: 'Built a cross-platform mobile app using Flutter, Firebase for real-time sync and authentication, Node.js backend, MongoDB for data storage, and Stripe for subscription payments.',
          fr: 'Construction d\'une application mobile multiplateforme utilisant Flutter, Firebase pour sync temps réel et authentification, backend Node.js, MongoDB pour stockage données et Stripe pour paiements d\'abonnement.',
          ar: 'بناء تطبيق جوال متعدد المنصات باستخدام Flutter و Firebase للمزامنة والمصادقة في الوقت الفعلي وخادم Node.js و MongoDB لتخزين البيانات و Stripe لمدفوعات الاشتراك.',
        },
        results: {
          en: '• 200K+ active users\n• 2M+ workouts completed\n• 78% user retention\n• Subscription-based revenue',
          fr: '• Plus de 200K utilisateurs actifs\n• Plus de 2M d\'entraînements complétés\n• 78% de rétention d\'utilisateurs\n• Revenus basés sur abonnement',
          ar: '• أكثر من 200 ألف مستخدم نشط\n• أكثر من 2 مليون تمرين مكتمل\n• احتفاظ 78% بالمستخدمين\n• إيرادات قائمة على الاشتراك',
        },
        technologies: ['Flutter', 'Firebase', 'Node.js', 'MongoDB', 'Stripe'],
        featuredImageUrl: '/projects/fitlife-featured.jpg',
        duration: '5 months',
        publishedAt: new Date('2024-06-15'),
        isPublished: true,
        isFeatured: false,
        orderIndex: 9,
      },
      {
        title: {
          en: 'Legal Document Automation',
          fr: 'Automatisation de Documents Juridiques',
          ar: 'أتمتة الوثائق القانونية',
        },
        slug: 'legal-document-automation',
        clientName: 'LegalTech Associates',
        challenge: {
          en: 'LegalTech needed an AI-powered legal document generation system to reduce contract creation time by 90% while ensuring compliance across 50+ jurisdictions with high accuracy.',
          fr: 'LegalTech avait besoin d\'un système de génération de documents juridiques basé sur l\'IA pour réduire le temps de création de contrats de 90% tout en assurant la conformité dans plus de 50 juridictions avec haute précision.',
          ar: 'احتاجت LegalTech إلى نظام توليد وثائق قانونية مدعوم بالذكاء الاصطناعي لتقليل وقت إنشاء العقود بنسبة 90٪ مع ضمان الامتثال عبر أكثر من 50 سلطة قضائية بدقة عالية.',
        },
        solution: {
          en: 'Built an intelligent document generation system using Python, GPT-4 for natural language processing, FastAPI for backend services, PostgreSQL for data management, and Docker for containerization.',
          fr: 'Construction d\'un système de génération de documents intelligent utilisant Python, GPT-4 pour traitement du langage naturel, FastAPI pour services backend, PostgreSQL pour gestion données et Docker pour conteneurisation.',
          ar: 'بناء نظام توليد وثائق ذكي باستخدام Python و GPT-4 لمعالجة اللغة الطبيعية و FastAPI لخدمات الخادم و PostgreSQL لإدارة البيانات و Docker للحاويات.',
        },
        results: {
          en: '• 90% time reduction\n• 50K+ documents generated\n• 99.8% accuracy rate\n• 50+ jurisdictions covered',
          fr: '• Réduction de 90% du temps\n• Plus de 50K documents générés\n• Taux de précision de 99,8%\n• Plus de 50 juridictions couvertes',
          ar: '• تقليل 90% في الوقت\n• أكثر من 50 ألف وثيقة منشأة\n• معدل دقة 99.8%\n• أكثر من 50 سلطة قضائية مغطاة',
        },
        technologies: ['Python', 'GPT-4', 'FastAPI', 'PostgreSQL', 'Docker'],
        featuredImageUrl: '/projects/legaltech-featured.jpg',
        duration: '4 months',
        publishedAt: new Date('2024-05-20'),
        isPublished: true,
        isFeatured: false,
        orderIndex: 10,
      },
    ];

    // Insert all demo projects
    for (const project of demoProjects) {
      await db.insert(projects).values(project);
      console.log(`✅ Added: ${project.title.en}`);
    }

    console.log('\n🎉 Successfully added 7 demo projects!');
    console.log('📊 Total projects in database: 10 (3 original + 7 new)');
    console.log('\n✨ Your website is now showcase-ready with rich demo content!');

    await client.end();
  } catch (error) {
    console.error('Error seeding demo data:', error);
    process.exit(1);
  }
}

main();
