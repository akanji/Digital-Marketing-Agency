import { 
  Campaign, 
  AnalyticsData, 
  Client, 
  SEOMetric, 
  AgentCard, 
  SystemLog, 
  ValidationCycle, 
  VibeSpec, 
  Secret, 
  MediaAsset, 
  Persona, 
  CollabSession, 
  Deliverable, 
  EmailSegment, 
  AutomationWorkflow,
  EmailTemplate,
  MetaCampaign,
  MetaAudience,
  MetaCreativeAsset,
  MetaPixelHealth,
  SEOCrawlReport,
  KeywordRank,
  BacklinkAudit,
  LocalSEOMetrics,
  GoogleAdsCampaign,
  GoogleAdsKeyword,
  AuctionInsight,
  MerchantCenterHealth,
  ContentCampaign,
  TrainingJob,
  AgencyTemplate,
  SubscriptionTier,
  PricingPlan,
  TenantBranding,
  PPCManagerResponse
} from './types';

export const PPC_MANAGER_DATA: PPCManagerResponse = {
  manager_account: {
    name: "Digital Marketing Agency",
    customer_id: "123-456-7890",
    currency: "USD",
    timezone: "America/New_York",
    status: "ACTIVE"
  },
  linked_clients: [
    {
      customer_id: "421",
      name: "Core Retail",
      status: "ACTIVE",
      status_indicator: "green",
      monthly_budget: 50000,
      ytd_spend: 187500
    },
    {
      customer_id: "981",
      name: "SaaS Cluster",
      status: "ACTIVE",
      status_indicator: "green",
      monthly_budget: 75000,
      ytd_spend: 312000
    },
    {
      customer_id: "104",
      name: "Legal Services",
      status: "WARNING",
      status_indicator: "red",
      monthly_budget: 25000,
      ytd_spend: 28750,
      alert: "OVERSPEND_RISK"
    }
  ],
  total_linked_accounts: 3,
  total_monthly_budget: 150000
};

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'solopreneur',
    name: 'Solopreneur',
    price: '$49/mo',
    features: ['1 User', '3 Clients', 'Standard Branding'],
    limits: { users: 1, clients: 3 }
  },
  {
    id: 'starter',
    name: 'Agency Starter',
    price: '$149/mo',
    features: ['5 Users', '15 Clients', 'Custom Domain', 'API Access'],
    limits: { users: 5, clients: 15 }
  },
  {
    id: 'pro',
    name: 'Agency Pro',
    price: '$399/mo',
    features: ['20 Users', '50 Clients', 'White-Label Everything', 'Model Tuning'],
    limits: { users: 20, clients: 50 }
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$999/mo',
    features: ['Unlimited Users', 'SLA Guarantees', 'Dedicated Infrastructure'],
    limits: { users: 1000, clients: 1000 }
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    plan: 'Trial',
    price: '$0.00',
    logicGate: '7-Day Access',
    action: 'POST /api/v1/checkout/create-session?price=trial',
    features: ['Standard CRM Sync', 'Reputation Monitoring', 'Self-Healing Protocol (L1)']
  },
  {
    plan: 'Monthly',
    price: '$19.99',
    logicGate: 'Recurring',
    action: 'POST /api/v1/checkout/create-session?price=monthly',
    features: ['All Trial Features', 'Advanced Deliverability', 'Gemini 2.0 Auto-Fix (L2)', 'Custom Webhooks'],
    isPopular: true
  },
  {
    plan: 'Yearly',
    price: '$199.99',
    logicGate: 'Recurring (Save 16%)',
    action: 'POST /api/v1/checkout/create-session?price=yearly',
    features: ['All Pro Features', 'Dedicated Shard Management', 'White-Label Dashboards', 'Priority Support']
  }
];

export const DEFAULT_BRANDING: TenantBranding = {
  agencyName: 'Digital Marketing Agency',
  tagline: 'Digital you demand.',
  logo: 'https://ais-dev-s3mbkuit5jexstnpi4q5vn-535361250845.us-east1.run.app/logo.png',
  primaryColor: '#2563eb',
  secondaryColor: '#1e40af',
  domain: 'agencyname.marketing.com',
  emailSender: {
    name: 'Marketing Bot',
    email: 'ops@agencyname.com'
  }
};

export const AGENCY_TEMPLATES: AgencyTemplate[] = [
  {
    id: 'tpl-a',
    name: 'Campaign Automation Dashboard',
    category: 'Dashboard',
    description: 'Real-time spend vs. budget pacing with auto-pause logic.',
    prompt: 'Build a campaign automation dashboard that connects to Google Ads and Meta APIs, shows real-time spend vs. budget pacing, ROAS by channel, and auto-pauses underperforming ads when CPA exceeds $50.'
  },
  {
    id: 'tpl-b',
    name: 'Lead Generation Calculator',
    category: 'Calculator',
    description: 'Industry-specific lead projection tool for prospects.',
    prompt: 'Create a lead generation calculator where prospects input their industry, company size, and current ad spend; output projected leads, cost per lead, and recommended budget using industry benchmarks.'
  },
  {
    id: 'tpl-c',
    name: 'Content Calendar & Approval',
    category: 'Workflow',
    description: 'Draft-to-Deploy workflow with cross-platform scheduling.',
    prompt: 'Build a content calendar app with drag-and-drop scheduling, client approval stages (draft → review → approved → scheduled), and auto-publish to Buffer/Hootsuite when approved.'
  },
  {
    id: 'tpl-d',
    name: 'SEO Audit & Reporting Tool',
    category: 'Tool',
    description: 'Comprehensive technical crawl and PDF generation.',
    prompt: 'Create an SEO audit tool that crawls a website, checks Core Web Vitals, identifies broken links, analyzes keyword rankings, and generates a client-ready PDF report with prioritized recommendations.'
  },
  {
    id: 'tpl-e',
    name: 'Email Automation Builder',
    category: 'Workflow',
    description: 'Visual drip campaign designer with conditional triggers.',
    prompt: 'Build a visual email automation builder where users can create drip campaigns with drag-and-drop triggers, conditions, and actions, then preview the subscriber journey timeline.'
  }
];

export const CONTENT_CAMPAIGNS: ContentCampaign[] = [
  { id: 'cc1', name: 'Spring Reveal: Multimodal', type: 'Multimodal', status: 'ready', aiScore: 98, assets: 24 },
  { id: 'cc2', name: 'Urban Gear: Product Promo (Veo)', type: 'Video', status: 'generating', aiScore: 92, assets: 4 },
  { id: 'cc3', name: 'Weekly Newsletter: Structured', type: 'Structured', status: 'deployed', aiScore: 95, assets: 1 }
];

export const TRAINING_JOBS: TrainingJob[] = [
  { id: 'tj1', model: 'Gemini-1.5-Pro: TechFlow-Voice', client: 'TechFlow Systems', progress: 85, status: 'running', loss: 0.12 },
  { id: 'tj2', model: 'Fine-Tune: GreenLife-Tone', client: 'GreenLife Foods', progress: 100, status: 'completed', loss: 0.08 },
  { id: 'tj3', model: 'Extraction: Retail-Gen', client: 'Urban Gear', progress: 0, status: 'queued', loss: 0 }
];

export const GOOGLE_ADS_CAMPAIGNS: GoogleAdsCampaign[] = [
  {
    id: 'gac-1',
    name: 'PMax: E-commerce Global',
    status: 'enabled',
    type: 'PMax',
    budget: { amount: 2500, pacing: 82 },
    metrics: { impressions: 1200000, clicks: 45000, cost: 42000, conversions: 1200, roas: 5.4 },
    adStrength: 'Excellent'
  },
  {
    id: 'gac-2',
    name: 'Search: Brand Terms',
    status: 'enabled',
    type: 'Search',
    budget: { amount: 800, pacing: 95 },
    metrics: { impressions: 45000, clicks: 12000, cost: 24000, conversions: 850, roas: 12.2 },
    adStrength: 'Good'
  }
];

export const GOOGLE_ADS_KEYWORDS: GoogleAdsKeyword[] = [
  { id: 'gw-1', text: 'autonomous marketing agency', matchType: 'Exact', qualityScore: 10, avgCpc: 2.45, status: 'active' },
  { id: 'gw-2', text: 'AI marketing tools', matchType: 'Phrase', qualityScore: 8, avgCpc: 4.12, status: 'active' },
  { id: 'gw-3', text: 'automated lead gen', matchType: 'Broad', qualityScore: 7, avgCpc: 3.85, status: 'low_volume' }
];

export const AUCTION_INSIGHTS: AuctionInsight[] = [
  { competitor: 'MarketAI Inc.', overlapRate: 42, outrankingShare: 15, positionAboveRate: 28 },
  { competitor: 'GrowthNode', overlapRate: 24, outrankingShare: 65, positionAboveRate: 12 },
  { competitor: 'Legacy Ads Ltd.', overlapRate: 12, outrankingShare: 88, positionAboveRate: 5 }
];

export const MERCHANT_CENTER: MerchantCenterHealth = {
  id: 'mc-882190',
  disapprovedProducts: 3,
  syncStatus: 'synced',
  lastSync: '2024-05-04T05:00:00Z'
};

export const META_CAMPAIGNS: MetaCampaign[] = [
  {
    id: 'mc1',
    name: 'Top Funnel: Awareness 2024',
    status: 'active',
    objective: 'Awareness',
    budget: { amount: 500, type: 'Daily' },
    performance: { spend: 12400, impressions: 850000, ctr: 1.2, roas: 0 }
  },
  {
    id: 'mc2',
    name: 'Retargeting: High Intent',
    status: 'active',
    objective: 'Sales',
    budget: { amount: 1200, type: 'Daily' },
    performance: { spend: 45000, impressions: 120000, ctr: 4.5, roas: 6.2 }
  }
];

export const META_AUDIENCES: MetaAudience[] = [
  { id: 'ma1', name: 'Purchase Lookalike 1%', type: 'Lookalike', size: '2.4M', matchRate: 98, lastSynced: '2024-05-04T05:00:00Z' },
  { id: 'ma2', name: 'Website Visitors (30d)', type: 'Custom', size: '45K', lastSynced: '2024-05-04T05:15:00Z' }
];

export const META_CREATIVES: MetaCreativeAsset[] = [
  { id: 'mcr1', name: 'Hero Video - Spring', type: 'Video', fatigueScore: 42, frequency: 1.8, ctrShift: -5, status: 'optimal' },
  { id: 'mcr2', name: 'Lifestyle Static A', type: 'Image', fatigueScore: 88, frequency: 4.2, ctrShift: -25, status: 'refresh_required' }
];

export const META_PIXEL: MetaPixelHealth = {
  id: 'px-99201',
  status: 'active',
  matchQuality: 8.4,
  capiStatus: 'connected',
  eventsLast24h: 124500
};

export const SEO_CRAWL_DATA: SEOCrawlReport[] = [
  { id: 'cr-1', url: '/home', status: 200, loadTime: 0.8, coreWebVitals: { lcp: 1.2, cls: 0.05, inp: 120 }, schemaValid: true, indexed: true },
  { id: 'cr-2', url: '/products/premium-gear', status: 200, loadTime: 1.4, coreWebVitals: { lcp: 2.6, cls: 0.12, inp: 240 }, schemaValid: true, indexed: true },
  { id: 'cr-3', url: '/old-campaign-2023', status: 404, loadTime: 0.0, coreWebVitals: { lcp: 0, cls: 0, inp: 0 }, schemaValid: false, indexed: false }
];

export const KEYWORD_RANKS: KeywordRank[] = [
  { id: 'kw-1', keyword: 'autonomous marketing agency', rank: 2, change: 1, volume: 1500, serpFeatures: ['Snippet', 'People Also Ask'] },
  { id: 'kw-2', keyword: 'AI ad automation', rank: 4, change: -1, volume: 4200, serpFeatures: ['Video', 'Ads'] },
  { id: 'kw-3', keyword: 'Vibe Coding Services', rank: 1, change: 0, volume: 800, serpFeatures: ['Snippet'] }
];

export const BACKLINK_STATS: BacklinkAudit = {
  totalLinks: 12450,
  toxicLinks: 12,
  authorityScore: 78,
  topCompetitorGap: 1500
};

export const LOCAL_SEO: LocalSEOMetrics = {
  gbpStatus: 'optimized',
  mapsRank: 1,
  reviewSentiment: 0.94
};

export const EMAIL_SEGMENTS: EmailSegment[] = [
  { id: 'seg-1', name: 'High-Value SaaS Buyers', count: 12400, engagementScore: 91, status: 'synced', deliverability: { bounceRate: 0.8, openRate: 42.5, spamReport: 0.02 } },
  { id: 'seg-2', name: 'Abandoned Cart Retail', count: 4560, engagementScore: 67, status: 'synced', deliverability: { bounceRate: 2.4, openRate: 12.1, spamReport: 0.83 } },
  { id: 'seg-3', name: 'Cold Leads Re-engagement', count: 28000, engagementScore: 14, status: 'indexing', deliverability: { bounceRate: 5.2, openRate: 2.1, spamReport: 0.45 } }
];

export const AUTOMATION_WORKFLOWS: AutomationWorkflow[] = [
  { id: 'flow-0', name: 'AI Nurture', trigger: 'Generic Interest', steps: 3, activeSubscribers: 0, conversionRate: 0, status: 'active' },
  { id: 'flow-1', name: 'SaaS Trial', trigger: 'Sign-up', steps: 5, activeSubscribers: 1250, conversionRate: 14.5, status: 'active' },
  { id: 'flow-2', name: 'Cart Abandon', trigger: 'Cart Event', steps: 3, activeSubscribers: 840, conversionRate: 22.0, status: 'active' },
  { id: 'flow-3', name: 'High-Touch Onboarding', trigger: 'Purchase > $500', steps: 8, activeSubscribers: 120, conversionRate: 45.0, status: 'active' }
];

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'et1',
    name: 'Welcome Series: Day 1',
    category: 'Marketing',
    variants: [
      {
        id: 'v1',
        subject: 'Welcome to {{brand_name}}! Let\'s get started',
        body: 'Hi {{first_name}},\n\nThanks for joining us. We\'re excited to have you on board.',
        isControl: true,
        metrics: { opens: 1420, clicks: 320, conversions: 45 }
      },
      {
        id: 'v2',
        subject: 'Quick start guide for {{brand_name}}',
        body: 'Hi {{first_name}},\n\nWe noticed you just joined! Here is how to get started.',
        isControl: false,
        metrics: { opens: 1510, clicks: 280, conversions: 38 }
      }
    ],
    placeholders: ['brand_name', 'first_name'],
    lastModified: '2024-05-01T10:00:00Z',
    abTestingActive: true
  },
  {
    id: 'et2',
    name: 'Order Confirmation',
    category: 'Transactional',
    variants: [
      {
        id: 'v3',
        subject: 'Your order {{order_id}} has been received',
        body: 'Hello {{first_name}},\n\nGreat news! We\'ve received your order {{order_id}}.',
        isControl: true,
        metrics: { opens: 2500, clicks: 1200, conversions: 1100 }
      }
    ],
    placeholders: ['first_name', 'order_id'],
    lastModified: '2024-05-03T15:30:00Z',
    abTestingActive: false
  }
];

export const DELIVERABLES: Deliverable[] = [
  { 
    id: 'd1', 
    name: 'Spring Collection Hero Ad', 
    type: 'Ad', 
    status: 'PENDING_CLIENT', 
    version: 'v1.4', 
    assignedAgent: 'Flux-Visual', 
    lastUpdated: '2026-05-04T05:00:00Z', 
    clientId: 'c1',
    budget: 12000,
    budgetThreshold: 15000,
    complianceScore: 98,
    flags: ['Brand Safe', 'Regulatory Pass']
  },
  { 
    id: 'd2', 
    name: 'Q3 Search Strategy - TechCorp', 
    type: 'Strategy', 
    status: 'INTERNAL_QA', 
    version: 'v1.0', 
    assignedAgent: 'Alpha-9', 
    lastUpdated: '2026-05-04T04:30:00Z', 
    clientId: 'c2',
    budgetThreshold: 5000,
    complianceScore: 92
  },
  { 
    id: 'd3', 
    name: 'Instagram Reel: Urban Gear', 
    type: 'Creative', 
    status: 'REVISION_REQUESTED', 
    version: 'v2.1', 
    assignedAgent: 'Flux-Visual', 
    lastUpdated: '2026-05-04T03:15:00Z', 
    clientId: 'c1',
    complianceScore: 84,
    flags: ['Urgent SLA']
  }
];

export const PERSONAS: Persona[] = [
  { id: 'p1', role: 'Strategist', name: 'Alpha-9', tone: 'Analytical, High-ROAS focus', temperature: 0.2, status: 'locked' },
  { id: 'p2', role: 'Creative', name: 'Flux-Visual', tone: 'Bold, trend-aware, visual-first', temperature: 0.9, status: 'active' },
  { id: 'p3', role: 'Technical', name: 'Root-Core', tone: 'Precise, implementation-focused', temperature: 0.1, status: 'locked' },
  { id: 'p4', role: 'Account Manager', name: 'Nexus-Client', tone: 'Diplomatic, deadline-conscious', temperature: 0.5, status: 'active' }
];

export const COLLAB_SESSIONS: CollabSession[] = [
  { id: 's1', user: 'phidephefem@gmail.com', action: 'Modified SEO Strategy', timestamp: '2026-05-04T05:30:00Z', version: 'v1.4.2' },
  { id: 's2', user: 'Client Stakeholder', action: 'Pinned comment on Hero Banner', timestamp: '2026-05-04T05:35:00Z', version: 'v1.4.2' },
  { id: 's3', user: 'Agency Bot', action: 'Auto-resolved drift in campaign_v1', timestamp: '2026-05-04T05:40:00Z', version: 'v1.4.3' }
];

export const DATA_ANALYTICS: AnalyticsData[] = [
  { name: 'Mon', value: 4000, conv: 240 },
  { name: 'Tue', value: 3000, conv: 198 },
  { name: 'Wed', value: 2000, conv: 180 },
  { name: 'Thu', value: 2780, conv: 390 },
  { name: 'Fri', value: 1890, conv: 480 },
  { name: 'Sat', value: 2390, conv: 380 },
  { name: 'Sun', value: 3490, conv: 430 },
];

export const CAMPAIGNS: Campaign[] = [
  { 
    id: '1', 
    name: 'Summer Collection Launch', 
    platform: 'Meta', 
    status: 'active', 
    spend: 4500, 
    conversion: 120, 
    roas: 4.2, 
    progress: 65, 
    startDate: '2026-05-01', 
    budget: 8000,
    pillar: 'social'
  },
  { 
    id: '2', 
    name: 'B2B Software Leads', 
    platform: 'LinkedIn', 
    status: 'active', 
    spend: 8200, 
    conversion: 45, 
    roas: 3.1, 
    progress: 82, 
    startDate: '2026-04-15', 
    budget: 10000,
    pillar: 'social'
  },
  { 
    id: '3', 
    name: 'Project 50: Search Growth', 
    platform: 'Google', 
    status: 'active', 
    spend: 12500, 
    conversion: 450, 
    roas: 3.8, 
    progress: 88, 
    startDate: '2026-03-10', 
    budget: 15000,
    pillar: 'ppc'
  },
  { 
    id: '4', 
    name: 'Youth Engagement Funnel', 
    platform: 'TikTok', 
    status: 'active', 
    spend: 3400, 
    conversion: 340, 
    roas: 5.6, 
    progress: 45, 
    startDate: '2026-05-02', 
    budget: 7500,
    pillar: 'social'
  },
  { 
    id: '5', 
    name: 'Retaining Loyalists (Q2)', 
    platform: 'Email', 
    status: 'active', 
    spend: 850, 
    conversion: 85, 
    roas: 12.4, 
    progress: 92, 
    startDate: '2026-04-01', 
    budget: 1000,
    pillar: 'online'
  }
];

export const VIBE_SPECS: VibeSpec[] = [
  { id: 'v1', query: 'Build a lead scoring dashboard for real estate', status: 'active', timestamp: '2026-05-03T12:00:00Z', type: 'app' },
  { id: 'v2', query: 'Social media rollout for Spring collection', status: 'deploying', timestamp: '2026-05-04T01:00:00Z', type: 'campaign' }
];

export const SECRETS: Secret[] = [
  { id: 's1', name: 'GOOGLE_ADS_API_MASTER', key: '•••••••••••••••••••••', status: 'secure', lastUsed: '2026-05-04T05:00:00Z' },
  { id: 's2', name: 'META_BUSINESS_SECRET', key: '•••••••••••••••••••••', status: 'rotating', lastUsed: '2026-05-04T04:30:00Z' }
];

export const MEDIA_ASSETS: MediaAsset[] = [
  { id: 'm1', name: 'Brand Story 2024', type: 'video', url: '#', aiDescription: 'Veo 3.1 Generated: Urban lifestyle aesthetic with warm lighting.', brandConsistency: 98 },
  { id: 'm2', name: 'Vocal Identity - Male/Smooth', type: 'audio', url: '#', aiDescription: 'TTS Clone: Professional but friendly, mid-range pitch.', brandConsistency: 95 },
  { id: 'm3', name: 'Product Hero - Studio Red', type: 'image', url: '#', aiDescription: 'Studio photography style, high contrast.', brandConsistency: 100 }
];

export const CLIENTS: Client[] = [
  { 
    id: 'c1', 
    name: 'TechFlow Systems', 
    industry: 'SaaS', 
    contractValue: 12000, 
    status: 'active', 
    lastActivity: '2026-05-03',
    paidMedia: {
      ppc: { spend: 5000, clicks: 1200, conversions: 45, avgCpc: 4.16 },
      social: { spend: 3000, impressions: 450000, engagement: 12000, roas: 3.8 }
    }
  },
  { 
    id: 'c2', 
    name: 'GreenLife Foods', 
    industry: 'E-commerce', 
    contractValue: 8500, 
    status: 'active', 
    lastActivity: '2026-05-04',
    paidMedia: {
      ppc: { spend: 2000, clicks: 800, conversions: 120, avgCpc: 2.50 },
      social: { spend: 4500, impressions: 850000, engagement: 35000, roas: 5.2 }
    }
  },
  { 
    id: 'c3', 
    name: 'Urban Gear', 
    industry: 'Retail', 
    contractValue: 5000, 
    status: 'onboarding', 
    lastActivity: '2026-05-01' 
  },
];

export const SEO_METRICS: SEOMetric[] = [
  { keyword: 'digital marketing agency', rank: 3, change: 1, volume: '45k' },
  { keyword: 'best ads platform', rank: 12, change: -2, volume: '12k' },
  { keyword: 'performance marketing', rank: 5, change: 2, volume: '28k' },
  { keyword: 'growth hacking tools', rank: 8, change: 0, volume: '8k' },
];

export const AGENTS: AgentCard[] = [
  { 
    id: 'online-marketing-agent', 
    name: 'Online Marketing Agent', 
    version: 'v4.1.0', 
    capabilities: ['Audience Segmentation', 'Deliverability Optimization', 'Reputation Monitoring', 'Active Flow Management', 'A/B Test Asset Library', 'Klaviyo/CRM Sync'], 
    status: 'available', 
    endpoint: '/.well-known/agent.json', 
    pillar: 'online' 
  },
  { 
    id: 'social-media-agent', 
    name: 'Social Media Agent', 
    version: 'v2.1.0', 
    capabilities: ['Meta Ads', 'Social Listening', 'Influencer Outreach'], 
    status: 'busy', 
    endpoint: '/.well-known/agent.json', 
    pillar: 'social' 
  },
  { 
    id: 'seo-agent', 
    name: 'SEO Specialist Agent', 
    version: 'v1.4.2', 
    capabilities: ['Technical Audit', 'Keyword Research', 'Local SEO'], 
    status: 'available', 
    endpoint: '/.well-known/agent.json', 
    pillar: 'seo' 
  },
  { 
    id: 'ppc-agent', 
    name: 'PPC Performance Agent', 
    version: 'v3.0.1', 
    capabilities: ['Google Ads API', 'Bid Management', 'PMax Mgmt'], 
    status: 'available', 
    endpoint: '/.well-known/agent.json', 
    pillar: 'ppc' 
  },
  { 
    id: 'client-approval-agent', 
    name: 'Client Approval Agent', 
    version: 'v1.0.0', 
    capabilities: ['Approval Routing', 'Revision Mgmt', 'Compliance'], 
    status: 'available', 
    endpoint: '/.well-known/agent.json', 
    pillar: 'core' 
  },
  { 
    id: 'email-automation-agent', 
    name: 'Email Automation Agent', 
    version: 'v1.2.5', 
    capabilities: ['Template Builder', 'Deliverability', 'Workflow Design'], 
    status: 'available', 
    endpoint: '/.well-known/agent.json', 
    pillar: 'online' 
  }
];

export const SYSTEM_LOGS: SystemLog[] = [
  { id: 'l1', timestamp: '2026-05-04T04:55:12Z', level: 'info', module: 'A2A-RPC', message: 'Handshake complete with agt-2', payload: { method: 'JSON-RPC 2.0', status: 'SYN-ACK' }, traceId: 'tr-8821' },
  { id: 'l2', timestamp: '2026-05-04T04:56:01Z', level: 'debug', module: 'SSE-STREAM', message: 'Pushing campaign_delta to client_shard_01', traceId: 'tr-8821' },
  { id: 'l3', timestamp: '2026-05-04T05:10:45Z', level: 'warn', module: 'SELF-HEAL', message: 'agt-3 failover triggered: latency spike > 500ms', payload: { attempt: 1, backoff: '1000ms' }, traceId: 'tr-9912' },
  { id: 'l4', timestamp: '2026-05-04T05:15:22Z', level: 'info', module: 'VALIDATE', message: 'Hourly benchmark cycle completed successfully', traceId: 'tr-1002' },
  { id: 'l5', timestamp: '2026-05-04T05:22:01Z', level: 'error', module: 'ADS-API', message: 'Meta OAuth token expired for c2', payload: { errorCode: 190, subcode: 463 }, traceId: 'tr-1105' },
];

export const VALIDATION_CYCLES: ValidationCycle[] = [
  { period: 'hourly', lastRun: '2026-05-04T04:00:00Z', status: 'passed', benchmarkScore: 98.4 },
  { period: 'daily', lastRun: '2026-05-04T00:00:00Z', status: 'passed', benchmarkScore: 97.2 },
  { period: 'weekly', lastRun: '2026-04-27T00:00:00Z', status: 'warning', benchmarkScore: 91.5 },
];
