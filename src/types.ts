import { Timestamp } from 'firebase/firestore';

export type ApprovalStatus = 'DRAFT' | 'INTERNAL_QA' | 'LEGAL_REVIEW' | 'COMPLIANCE_CHECK' | 'PENDING_CLIENT' | 'REVISION_REQUESTED' | 'APPROVED' | 'DEPLOYED' | 'ARCHIVED';

export interface Deliverable {
  id: string;
  name: string;
  type: 'Creative' | 'Strategy' | 'Audit' | 'Copy' | 'Ad' | 'Email';
  status: ApprovalStatus;
  version: string;
  assignedAgent: string;
  lastUpdated: string;
  clientId: string;
  budget?: number;
  budgetThreshold?: number;
  complianceScore?: number;
  flags?: string[];
}

export interface MetaCampaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'archived' | 'processing';
  objective: 'Awareness' | 'Traffic' | 'Leads' | 'Sales';
  budget: {
    amount: number;
    type: 'Daily' | 'Lifetime';
  };
  performance: {
    spend: number;
    impressions: number;
    ctr: number;
    roas: number;
  };
}

export interface MetaAudience {
  id: string;
  name: string;
  type: 'Custom' | 'Lookalike' | 'Interest';
  size: string;
  matchRate?: number;
  lastSynced: string;
}

export interface MetaCreativeAsset {
  id: string;
  name: string;
  type: 'Video' | 'Image' | 'Carousel';
  fatigueScore: number; // 0-100
  frequency: number;
  ctrShift: number; // percentage change
  status: 'optimal' | 'warning' | 'refresh_required';
}

export interface MetaPixelHealth {
  id: string;
  status: 'active' | 'error' | 'warning';
  matchQuality: number;
  capiStatus: 'connected' | 'disconnected';
  eventsLast24h: number;
}

export interface SEOCrawlReport {
  id: string;
  url: string;
  status: 200 | 404 | 500;
  loadTime: number;
  coreWebVitals: {
    lcp: number;
    cls: number;
    inp: number;
  };
  schemaValid: boolean;
  indexed: boolean;
}

export interface KeywordRank {
  id: string;
  keyword: string;
  rank: number;
  change: number;
  volume: number;
  serpFeatures: string[];
}

export interface BacklinkAudit {
  totalLinks: number;
  toxicLinks: number;
  authorityScore: number;
  topCompetitorGap: number;
}

export interface LocalSEOMetrics {
  gbpStatus: 'optimized' | 'pending' | 'action_required';
  mapsRank: number;
  reviewSentiment: number;
}

export interface GoogleAdsCampaign {
  id: string;
  name: string;
  status: 'enabled' | 'paused' | 'removed';
  type: 'Search' | 'PMax' | 'Display' | 'Video';
  budget: {
    amount: number;
    pacing: number; // 0-100
  };
  metrics: {
    impressions: number;
    clicks: number;
    cost: number;
    conversions: number;
    roas: number;
  };
  adStrength?: 'Poor' | 'Average' | 'Good' | 'Excellent';
}

export interface GoogleAdsKeyword {
  id: string;
  text: string;
  matchType: 'Exact' | 'Phrase' | 'Broad';
  qualityScore: number;
  avgCpc: number;
  status: 'active' | 'low_volume' | 'paused';
}

export interface AuctionInsight {
  competitor: string;
  overlapRate: number;
  outrankingShare: number;
  positionAboveRate: number;
}

export interface MerchantCenterHealth {
  id: string;
  disapprovedProducts: number;
  syncStatus: 'synced' | 'pending' | 'error';
  lastSync: string;
}

export interface ActiveCampaign {
  campaign_id: string;
  campaign_name: string;
  status: 'READY' | 'GENERATING' | 'DEPLOYED' | 'ARCHIVED';
  asset_count: number;
  quality_score: number;
  media_mix: {
    video: number;
    audio: number;
    image: number;
    structured: number;
  };
  brand_alignment: {
    tone_match: number;
    visual_match: number;
    voice_match: number;
  };
  production_version: string;
  deep_link: string;
}

export interface MediaCenterAsset {
  asset_id: string;
  asset_name: string;
  asset_type: 'video' | 'audio' | 'image' | 'structured-data' | 'tone-head' | 'voice-identity';
  status: string;
  production_version: string;
  brand_alignment: {
    confidence: number;
    detected_tone: string;
    visual_match: number;
  };
  usage_rights: {
    campaigns: string[];
    platforms_approved: string[];
  };
  download_url: string;
  cdn_url: string;
}

export interface VocalIdentity {
  identity_id: string;
  name: string;
  characteristics: {
    clarity_score: number;
    warmth_score: number;
    authority_score: number;
    pace_wpm: number;
    pitch: string;
  };
  status: 'active' | 'standby' | 'archived';
  tags: string[];
}

export interface MediaCenterAsset {
  asset_id: string;
  asset_name: string;
  asset_type: 'video' | 'audio' | 'image' | 'structured-data' | 'tone-head' | 'voice-identity';
  status: string;
  production_version: string;
  brand_alignment: {
    confidence: number;
    detected_tone: string;
    visual_match: number;
  };
  usage_rights: {
    campaigns: string[];
    platforms_approved: string[];
  };
  download_url: string;
  cdn_url: string;
}

export interface ContentCampaign {
  id: string;
  name: string;
  type: 'Multimodal' | 'Video' | 'Audio' | 'Structured';
  status: 'generating' | 'ready' | 'deployed';
  aiScore: number;
  assets: number;
}

export interface TrainingJob {
  id: string;
  model: string;
  client: string;
  progress: number;
  status: 'running' | 'completed' | 'queued';
  loss: number;
}

export interface AgencyTemplate {
  id: string;
  name: string;
  description: string;
  prompt: string;
  category: 'Dashboard' | 'Calculator' | 'Workflow' | 'Tool';
}

export interface SubscriptionTier {
  id: 'solopreneur' | 'starter' | 'pro' | 'enterprise';
  name: string;
  price: string;
  features: string[];
  limits: {
    users: number;
    clients: number;
  };
}

export interface TenantBranding {
  agencyName: string;
  tagline: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  domain: string;
  emailSender: {
    name: string;
    email: string;
  };
}

export type Pillar = 'online' | 'social' | 'seo' | 'ppc';
export type Tab = 'overview' | 'online' | 'social' | 'seo' | 'ppc' | 'approvals' | 'clients' | 'protocol' | 'media' | 'personas' | 'collaboration' | 'settings' | 'vibe-library' | 'agency-config';

export interface Persona {
  id: string;
  role: 'Strategist' | 'Creative' | 'Technical' | 'Account Manager';
  name: string;
  tone: string;
  temperature: number;
  status: 'locked' | 'active';
}

export interface CollabSession {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  version: string;
}

export interface VibeSpec {
  id: string;
  query: string;
  status: 'parsing' | 'generating' | 'deploying' | 'active';
  timestamp: string;
  type: 'app' | 'campaign' | 'audit';
}

export interface Secret {
  id: string;
  name: string;
  key: string;
  status: 'secure' | 'expired' | 'rotating';
  lastUsed: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'image' | 'doc';
  url: string;
  aiDescription: string;
  brandConsistency: number;
}

export interface AgentCard {
  id: string;
  name: string;
  version: string;
  capabilities: string[];
  status: 'available' | 'busy' | 'offline';
  endpoint: string;
  pillar: 'online' | 'social' | 'seo' | 'ppc' | 'core';
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  module: string;
  message: string;
  payload?: any;
  traceId?: string;
}

export interface ValidationCycle {
  period: 'hourly' | 'daily' | 'weekly' | 'monthly';
  lastRun: string;
  status: 'passed' | 'warning' | 'failed';
  benchmarkScore: number;
}

export interface Campaign {
  id: string;
  name: string;
  platform: 'Google' | 'Meta' | 'TikTok' | 'LinkedIn' | 'Email' | 'Content';
  status: 'active' | 'paused' | 'completed';
  spend: number;
  conversion: number;
  roas: number;
  progress: number;
  startDate: Timestamp | string;
  budget: number;
  pillar: 'online' | 'social' | 'seo' | 'ppc';
}

export interface AnalyticsData {
  name: string;
  value: number;
  conv: number;
}

export interface PaidMediaReport {
  ppc: {
    spend: number;
    clicks: number;
    conversions: number;
    avgCpc: number;
  };
  social: {
    spend: number;
    impressions: number;
    engagement: number;
    roas: number;
  };
}

export interface Client {
  id: string;
  name: string;
  industry: string;
  contractValue: number;
  status: 'active' | 'onboarding' | 'churned';
  lastActivity: Timestamp | string;
  paidMedia?: PaidMediaReport;
}

export interface EmailSegment {
  id: string;
  name: string;
  count: number;
  engagementScore: number;
  status: 'synced' | 'indexing' | 'error';
  deliverability?: {
    bounceRate: number;
    openRate: number;
    spamReport: number;
  };
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  trigger: string;
  steps: number;
  activeSubscribers: number;
  conversionRate: number;
  status: 'active' | 'paused';
}

export interface EmailVariant {
  id: string;
  subject: string;
  body: string;
  isControl: boolean;
  metrics?: {
    opens: number;
    clicks: number;
    conversions: number;
  };
}

export interface EmailTemplate {
  id: string;
  name: string;
  category: 'Transactional' | 'Marketing' | 'Personalized';
  variants: EmailVariant[];
  lastModified: string;
  placeholders: string[];
  abTestingActive: boolean;
}

export interface SEOMetric {
  keyword: string;
  rank: number;
  change: number;
  volume: string;
}
