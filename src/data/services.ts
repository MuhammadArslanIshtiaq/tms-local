import type { LucideIcon } from "lucide-react";
import {
  Cloud,
  Shield,
  Code2,
  Smartphone,
  BarChart3,
  Workflow,
  LineChart,
  ScanLine,
  Search,
  Share2,
  Palette,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  icon: LucideIcon;
  overview: string;
  features: string[];
  benefits: string[];
  useCases: string[];
};

export const services: Service[] = [
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    shortDescription:
      "Applications tailored to your business needs, built with modern technologies and best practices for scalability and maintainability.",
    icon: Code2,
    overview:
      "We build bespoke software solutions designed to solve your unique business challenges. From enterprise applications to internal tools and automation platforms, our team delivers scalable, maintainable code using modern frameworks and proven architectures. Every project is crafted with your goals, users, and growth in mind.",
    features: [
      "Requirements gathering and technical discovery",
      "Architecture design and technology selection",
      "Agile development with iterative deliveries",
      "Full-stack web and desktop applications",
      "API design and third-party integrations",
      "Code reviews, testing, and documentation",
      "Deployment, CI/CD, and DevOps support",
    ],
    benefits: [
      "Solutions built exactly for your workflows",
      "Scalable architecture that grows with you",
      "Reduced long-term maintenance costs",
      "Faster time-to-market than off-the-shelf",
      "Full ownership of your intellectual property",
    ],
    useCases: [
      "Enterprise resource planning (ERP) systems",
      "Customer relationship management (CRM)",
      "Internal dashboards and reporting tools",
      "Automation and workflow platforms",
      "B2B and B2C web applications",
    ],
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    shortDescription:
      "Scalable cloud infrastructure and migration services to modernize your IT environment. AWS, Azure, and GCP expertise.",
    icon: Cloud,
    overview:
      "Leverage the power of cloud computing to scale, innovate, and reduce costs. We design, migrate, and manage cloud infrastructure on AWS, Microsoft Azure, and Google Cloud Platform. Whether you're moving legacy systems or building cloud-native solutions, we ensure security, performance, and reliability.",
    features: [
      "Cloud readiness assessment and strategy",
      "Lift-and-shift and re-architecture migrations",
      "Container orchestration (Docker, Kubernetes)",
      "Serverless and managed services setup",
      "Multi-cloud and hybrid cloud design",
      "Cost optimization and right-sizing",
      "24/7 monitoring and support",
    ],
    benefits: [
      "Elastic scalability on demand",
      "Reduced infrastructure overhead",
      "Improved disaster recovery and uptime",
      "Pay-as-you-go cost efficiency",
      "Enhanced security and compliance",
    ],
    useCases: [
      "Legacy application migration to cloud",
      "Microservices and container deployment",
      "Data lakes and analytics in the cloud",
      "SaaS product infrastructure",
      "Government and enterprise cloud adoption",
    ],
  },
  {
    slug: "data-analytics",
    title: "Data Analytics",
    shortDescription:
      "Transform your data into actionable insights with advanced analytics, BI dashboards, and machine learning pipelines.",
    icon: BarChart3,
    overview:
      "Turn raw data into strategic decisions. We build analytics pipelines, BI dashboards, and data warehouses that help you understand performance, customer behavior, and market trends. From data modeling to visualization and machine learning, we enable data-driven organizations.",
    features: [
      "Data warehouse design and implementation",
      "ETL/ELT pipelines and data integration",
      "Interactive BI dashboards (Tableau, Power BI, custom)",
      "Predictive analytics and ML models",
      "Real-time and batch analytics",
      "Data governance and quality frameworks",
      "Self-service analytics enablement",
    ],
    benefits: [
      "Single source of truth for all data",
      "Faster, more accurate decision-making",
      "Identification of growth and cost opportunities",
      "Automated reporting and alerts",
      "Scalable data architecture",
    ],
    useCases: [
      "Sales and marketing analytics",
      "Operational and supply chain insights",
      "Customer segmentation and churn prediction",
      "Financial reporting and forecasting",
      "Regulatory and compliance reporting",
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortDescription:
      "Native and cross-platform mobile applications for iOS and Android. React Native and Flutter for unified experiences.",
    icon: Smartphone,
    overview:
      "Reach your users wherever they are. We build native and cross-platform mobile applications for iOS and Android using React Native and Flutter. Our apps deliver smooth performance, intuitive UX, and seamless integration with your backend systems and APIs.",
    features: [
      "Native iOS (Swift) and Android (Kotlin) development",
      "Cross-platform with React Native and Flutter",
      "UI/UX design and prototyping",
      "Backend and API integration",
      "Push notifications and offline support",
      "App Store and Play Store deployment",
      "Post-launch maintenance and updates",
    ],
    benefits: [
      "One codebase for iOS and Android when using cross-platform",
      "Faster development and lower costs",
      "Consistent experience across devices",
      "Easy updates without full redeployment",
      "Access to device-native features",
    ],
    useCases: [
      "Customer-facing B2C applications",
      "Field service and workforce apps",
      "Internal enterprise mobile tools",
      "E-commerce and marketplace apps",
      "Health, logistics, and productivity apps",
    ],
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    shortDescription:
      "Comprehensive security solutions to protect your digital assets. Compliance, penetration testing, and zero-trust architecture.",
    icon: Shield,
    overview:
      "Protect your business from evolving threats. We offer end-to-end cybersecurity services including risk assessments, penetration testing, compliance frameworks (SOC 2, GDPR, HIPAA), and zero-trust architecture design. Security is built into every layer of your technology stack.",
    features: [
      "Security audits and risk assessments",
      "Penetration testing and vulnerability scanning",
      "Zero-trust and identity access management",
      "Compliance consulting (SOC 2, GDPR, HIPAA)",
      "Incident response and recovery planning",
      "Security training and awareness",
      "Ongoing monitoring and threat detection",
    ],
    benefits: [
      "Reduced risk of breaches and data loss",
      "Compliance with industry standards",
      "Confidence for customers and partners",
      "Proactive threat detection",
      "Clear security roadmap",
    ],
    useCases: [
      "Pre-launch security assessment",
      "Government and regulated industry compliance",
      "Cloud and application security hardening",
      "Third-party vendor security review",
      "Breach response and remediation",
    ],
  },
  {
    slug: "digital-transformation",
    title: "Digital Transformation",
    shortDescription:
      "End-to-end digital transformation services to modernize business processes, automate workflows, and drive innovation.",
    icon: Workflow,
    overview:
      "Lead your industry through digital innovation. We partner with organizations to modernize processes, automate workflows, and adopt new technologies that increase efficiency and competitive advantage. From strategy to execution, we guide your digital journey.",
    features: [
      "Digital maturity assessment",
      "Strategy and roadmap development",
      "Process automation (RPA, workflows)",
      "Legacy system modernization",
      "Change management and training",
      "Integration of new platforms and tools",
      "Continuous improvement programs",
    ],
    benefits: [
      "Streamlined operations and reduced manual work",
      "Improved customer and employee experience",
      "Data-driven decision making",
      "Faster time-to-market for new offerings",
      "Foundation for future innovation",
    ],
    useCases: [
      "Manual process automation",
      "Legacy system replacement",
      "Customer experience transformation",
      "Supply chain and operations digitization",
      "Workforce enablement with new tools",
    ],
  },
  {
    slug: "analytics-tracking",
    title: "Analytics & Tracking",
    shortDescription:
      "Comprehensive analytics setup including GTM, GA4, and conversion tracking to measure performance and inform decisions.",
    icon: LineChart,
    overview:
      "Measure what matters. We implement Google Tag Manager, Google Analytics 4, and conversion tracking across your websites and apps. From basic page views to complex e-commerce and event tracking, we help you understand user behavior and optimize performance.",
    features: [
      "Google Tag Manager (GTM) setup and configuration",
      "Google Analytics 4 (GA4) implementation",
      "Custom event and conversion tracking",
      "E-commerce and funnel analytics",
      "Cross-domain and app tracking",
      "DataLayer design and documentation",
      "Reporting dashboards and training",
    ],
    benefits: [
      "Accurate, consistent data collection",
      "Better understanding of user journeys",
      "Data-driven marketing optimization",
      "Simplified tag management",
      "Audit-ready tracking documentation",
    ],
    useCases: [
      "Website and app analytics setup",
      "E-commerce conversion tracking",
      "Marketing campaign attribution",
      "User behavior and UX analysis",
      "Compliance with privacy regulations",
    ],
  },
  {
    slug: "tracking-pixel-implementation",
    title: "Tracking Pixel Implementation",
    shortDescription:
      "Advanced tracking pixel setup for Facebook, Google, and other advertising platforms to optimize your campaigns.",
    icon: ScanLine,
    overview:
      "Maximize your ad ROI with precise tracking. We implement conversion and remarketing pixels for Facebook Meta, Google Ads, TikTok, LinkedIn, and more. Proper pixel configuration ensures accurate attribution, better audiences, and smarter bidding.",
    features: [
      "Meta (Facebook) Pixel and Conversions API",
      "Google Ads conversion and remarketing tags",
      "TikTok, LinkedIn, and other platform pixels",
      "Server-side tracking (CAPI, gtag server)",
      "Event deduplication and consent mode",
      "Audience sync and custom conversions",
      "Testing, validation, and troubleshooting",
    ],
    benefits: [
      "Improved campaign attribution",
      "Better lookalike and remarketing audiences",
      "Lower cost per acquisition",
      "Privacy-compliant tracking setups",
      "Single source of truth for conversions",
    ],
    useCases: [
      "Facebook and Instagram ad optimization",
      "Google Ads conversion tracking",
      "Multi-touch attribution modeling",
      "Retargeting and remarketing campaigns",
      "Upsell and cross-sell tracking",
    ],
  },
  {
    slug: "seo-services",
    title: "SEO Services",
    shortDescription:
      "Search engine optimization to improve your website visibility, organic traffic, and rankings on major search engines.",
    icon: Search,
    overview:
      "Get found by the right audiences. We provide technical SEO, on-page optimization, content strategy, and link building to improve your visibility on Google, Bing, and other search engines. Sustainable growth through ethical, white-hat practices.",
    features: [
      "Technical SEO audits and fixes",
      "On-page optimization (keywords, meta, structure)",
      "Content strategy and creation support",
      "Schema markup and structured data",
      "Local SEO and Google Business Profile",
      "Link building and outreach",
      "Ranking and traffic reporting",
    ],
    benefits: [
      "Increased organic traffic over time",
      "Higher rankings for target keywords",
      "Better user experience and crawlability",
      "Long-term, compounding returns",
      "Reduced dependency on paid ads",
    ],
    useCases: [
      "New website SEO launch",
      "Recovery from algorithm updates",
      "Local business visibility",
      "E-commerce product page optimization",
      "B2B and enterprise content strategy",
    ],
  },
  {
    slug: "social-media-management",
    title: "Social Media Management",
    shortDescription:
      "Complete social media strategy and management across all major platforms to grow your brand and engage audiences.",
    icon: Share2,
    overview:
      "Build and engage your community. We develop social media strategies, create content calendars, manage posting across platforms, and run paid social campaigns. From organic growth to influencer partnerships, we help your brand stand out and connect.",
    features: [
      "Strategy and audience research",
      "Content calendar and creation",
      "Platform management (Meta, LinkedIn, X, etc.)",
      "Community management and engagement",
      "Paid social advertising",
      "Analytics and performance reporting",
      "Crisis and reputation management",
    ],
    benefits: [
      "Consistent brand voice across channels",
      "Increased reach and engagement",
      "Data-driven content optimization",
      "More time for you to focus on business",
      "Scalable, repeatable processes",
    ],
    useCases: [
      "Brand awareness campaigns",
      "Lead generation and nurturing",
      "Customer support and community building",
      "Product launches and events",
      "Employer branding and recruitment",
    ],
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    shortDescription:
      "Professional graphic design services for branding, marketing materials, and digital assets that stand out.",
    icon: Palette,
    overview:
      "Make a lasting impression. Our designers create logos, brand guidelines, marketing collateral, presentations, and digital assets that align with your vision and resonate with your audience. From concept to final delivery, we deliver polished, professional work.",
    features: [
      "Brand identity and logo design",
      "Brand guidelines and style guides",
      "Marketing materials (brochures, flyers, ads)",
      "Social media graphics and templates",
      "Presentation design (PowerPoint, Keynote)",
      "Infographics and data visualization",
      "Web and app UI assets",
    ],
    benefits: [
      "Cohesive, recognizable brand identity",
      "Professional quality that builds trust",
      "Assets ready for any channel",
      "Faster turnaround with templates",
      "Consistent visual language",
    ],
    useCases: [
      "Startup branding and logo",
      "Rebrand and identity refresh",
      "Product packaging and labels",
      "Event and campaign materials",
      "Internal and external presentations",
    ],
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);

export const getServiceSlugs = (): string[] => services.map((s) => s.slug);
