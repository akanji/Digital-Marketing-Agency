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

export interface AttributionModel {
  model: string;
  description: string;
  recommended?: boolean;
  eligibility?: string;
}

export interface AttributionModelsResponse {
  current_model: string;
  available_models: AttributionModel[];
}

export interface PacingDetailsResponse {
  shard_id: string;
  pacing_percentage: number;
  daily_target: number;
  actual_spend_today: number;
  projected_month_spend: number;
  projected_underspend: number;
  recommendation: 'INCREASE_BUDGET_OR_REALLOCATE' | 'STABLE' | 'DECREASE_BUDGET';
  reallocation_targets?: string[];
}

export interface PPCCampaignShard {
  shard_id: string;
  campaign_name: string;
  campaign_type: 'SEARCH' | 'PERFORMANCE_MAX' | 'DISPLAY' | 'VIDEO' | 'PERFORMANCE_MAX';
  status: 'ENABLED' | 'PAUSED' | 'REMOVED';
  budget: {
    daily_amount: number;
    monthly_pacing: number;
    pacing_percentage: number;
    pacing_status: 'UNDER_BUDGET' | 'ON_TRACK' | 'OVER_BUDGET';
  };
  performance: {
    conversions: number;
    conversion_value: number;
    roas: number;
    cost_per_conversion: number;
    impressions: number;
    clicks: number;
    ctr: number;
  };
  bid_strategy: string;
  target_roas?: number;
  target_cpa?: number;
  attribution_model: string;
  asset_groups?: number;
  keywords?: number;
  ad_groups?: number;
  quality_score_avg?: number;
  last_optimized: string;
  adStrength?: 'Poor' | 'Average' | 'Good' | 'Excellent';
}

export interface ActiveShardsResponse {
  shards: PPCCampaignShard[];
  total_active_shards: number;
  total_monthly_spend: number;
  portfolio_roas: number;
}

export interface BidSimulationResponse {
  simulation_id: string;
  status: string;
  simulation_date: string;
  results: {
    current_performance: {
      conversions: number;
      conversion_value: number;
      cost: number;
      roas: number;
      cpa: number;
    };
    projected_performance: {
      conversions: number;
      conversion_value: number;
      cost: number;
      roas: number;
      cpa: number;
    };
    delta: {
      conversions: string;
      conversion_value: string;
      cost: string;
      roas: string;
      cpa: string;
    };
    confidence_interval: {
      lower_bound_roas: number;
      upper_bound_roas: number;
      confidence_level: number;
    };
  };
  recommendation: string;
  risk_assessment: string;
}

export interface PPCQuickActionRequest {
  manager_customer_id: string;
  action_type: 'PAUSE_UNDERPERFORMING' | 'INCREASE_BUDGET_HIGH_ROAS' | 'REFRESH_CREATIVES' | 'SYNC_CONVERSIONS' | 'GENERATE_REPORT' | 'RUN_BID_SIMULATION' | 'EXPORT_DATA' | 'NOTIFY_CLIENT';
  scope: string;
  threshold?: {
    metric: string;
    operator: string;
    value: number;
    lookback_days: number;
  };
  approval_required: boolean;
}

export interface PPCQuickActionResponse {
  action_id: string;
  status: 'PENDING_APPROVAL' | 'EXECUTING' | 'COMPLETED' | 'FAILED';
  message: string;
  affected_entities_count?: number;
}

export interface BidSimulationHistoryItem {
  simulation_id: string;
  type: string;
  date: string;
  result: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  applied: boolean;
  projected_roas: number;
}

export interface BidSimulationHistoryResponse {
  simulations: BidSimulationHistoryItem[];
}

export interface SmartBiddingStatus {
  shard_id: string;
  strategy: string;
  learning_status: 'LEARNING' | 'STABLE' | 'LIMITED';
  learning_days_remaining: number;
  data_sufficiency: 'OPTIMAL' | 'LOW' | 'INSUFFICIENT';
  conversion_volume_30d: number;
  recommendation: string;
}

export interface PPCStreamEvent {
  event: 'SHARD_PERFORMANCE_UPDATE' | 'BUDGET_PACING_ALERT' | 'BID_SIMULATION_COMPLETE' | 'OPTIMIZATION_PROPOSED' | 'OPTIMIZATION_APPLIED' | 'QUALITY_SCORE_CHANGE' | 'CONVERSION_LAG_UPDATE';
  timestamp: string;
  shard_id: string;
  metrics?: {
    conversions?: number;
    roas?: number;
    pacing?: number;
    cost_today?: number;
  };
  status?: 'HEALTHY' | 'WARNING' | 'CRITICAL';
  agent_action?: string;
  message?: string;
  payload?: any;
}

export interface PPCPlanStatusResponse {
  plan: string;
  features_enabled: string[];
  usage: {
    clients_active: number;
    clients_limit: number;
    monthly_spend_managed: number;
    spend_limit: number;
  };
  upgrade_available: string;
}

export interface A2ASystemStatusResponse {
  a2a_sync: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  protocol_version: string;
  connected_agents: string[];
  last_sync: string;
  sync_health: 'OPTIMAL' | 'DEGRADED' | 'CRITICAL';
}

export interface CloudStatusResponse {
  provider: string;
  region: string;
  status: 'OPERATIONAL' | 'DEGRADED' | 'OUTAGE';
  latency_ms: number;
  uptime_30d: number;
}

export interface PPCLog {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  agent: string;
  action: string;
  shard_id?: string;
  message: string;
  data?: any;
}

export interface PPCLogsResponse {
  logs: PPCLog[];
  total_logs: number;
  next_page_token?: string;
}

export interface SmartBiddingAdjustmentResponse {
  adjustment_id: string;
  status: string;
  step_schedule: {
    day: number;
    target: number;
  }[];
  monitoring_alerts: string[];
}

export interface SmartBiddingStatusResponse {
  version: string;
  active_strategies: SmartBiddingStatus[];
  portfolio_learning_status: string;
  smart_bidding_health_score: number;
}

export interface OptimizationProposal {
  approval_id: string;
  confidence_score: number;
  proposed_changes: {
    campaign_id: string;
    field: string;
    current_value: number;
    proposed_value: number;
    impact_forecast: string;
  }[];
  justification: string;
}

export interface OptimizationApprovalResponse {
  status: string;
  changes_applied: number;
  affected_shards: string[];
  implementation_log: {
    shard_id: string;
    action: string;
    old_value: number;
    new_value: number;
    timestamp: string;
    google_ads_api_response: string;
  }[];
  post_optimization_monitoring: {
    monitor_duration_hours: number;
    alert_thresholds: {
      roas_drop: number;
      cpa_spike: number;
      pacing_acceleration: number;
    };
  };
}

export interface MCCManager {
  name: string;
  customer_id: string;
  currency: string;
  timezone: string;
  status: string;
}

export interface LinkedClient {
  customer_id: string;
  name: string;
  status: 'ACTIVE' | 'WARNING' | 'PAUSED' | 'REMOVED';
  status_indicator: 'green' | 'red' | 'yellow';
  monthly_budget: number;
  ytd_spend: number;
  alert?: string;
}

export interface PPCManagerResponse {
  manager_account: MCCManager;
  linked_clients: LinkedClient[];
  total_linked_accounts: number;
  total_monthly_budget: number;
}

export type Pillar = 'online' | 'social' | 'seo' | 'ppc';
export type Tab = 'overview' | 'online' | 'social' | 'seo' | 'ppc' | 'approvals' | 'clients' | 'protocol' | 'media' | 'personas' | 'collaboration' | 'settings' | 'vibe-library' | 'agency-config' | 'pricing' | 'query-agent' | 'email-dispatch' | 'email-approvals' | 'email-tracking' | 'email-audit';

export type EmailType = 'transactional' | 'marketing' | 'reporting' | 'financial' | 'legal';

export interface ComplianceShield {
  gdpr: boolean;
  ccpa: boolean;
  can_spam: boolean;
  hipaa?: boolean;
}

export interface SecureSendRequest {
  to: string[];
  subject: string;
  body: string;
  type: EmailType;
  template_id?: string;
  encryption: 'TLS 1.3' | 'S/MIME' | 'PGP';
  compliance: ComplianceShield;
  mfa_token?: string;
  scheduled_at?: string;
}

export interface SecureSendResponse {
  dispatch_id: string;
  status: 'dispatched' | 'queued' | 'blocked';
  message?: string;
  security_audit_link: string;
  encryption_hash: string;
  timestamp: string;
}

export interface EmailDispatchLog {
  id: string;
  to: string;
  subject: string;
  type: EmailType;
  status: 'sent' | 'failed' | 'processing' | 'delivered' | 'bounced' | 'cancelled' | 'scheduled';
  security_level: string;
  timestamp: string;
  open_count?: number;
  click_count?: number;
}

export interface AuditEntry {
  id: string;
  event: string;
  actor: string;
  ip_address: string;
  details: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
}

export interface EmailDeliveryMetrics {
  total_sent: number;
  delivered: number;
  bounced: number;
  opens: number;
  clicks: number;
  spam_reports: number;
  delivery_rate: number;
  open_rate: number;
  click_rate: number;
  timeline: {
    timestamp: string;
    sent: number;
    delivered: number;
  }[];
}

export interface EmailApproval {
  id: string;
  requester: string;
  recipient_count: number;
  subject: string;
  status: ApprovalStatus;
  priority: 'low' | 'medium' | 'high' | 'critical';
  risk_score: number;
  compliance_flags: string[];
  timestamp: string;
  body_preview: string;
}

export interface SecureDispatchSettings {
  approvalThreshold: number;
  encryptionRequired: boolean;
  autoSanitize: boolean;
  highRiskTypes: EmailType[];
  dailyLimit: number;
  mfaEnabled: boolean;
  defaultCompliance: ComplianceShield;
}

export interface MediaComplianceReport {
  isCompliant: boolean;
  score: number;
  violations: string[];
  suggestions: string[];
  brandAlignment: string;
  detectedColors: string[];
  safeForWork: boolean;
}

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

export interface AudienceSegmentDeliverability {
  inbox_placement: number;
  domain_reputation: 'EXCELLENT' | 'GOOD' | 'POOR';
  ip_warming_status: 'COMPLETE' | 'IN_PROGRESS' | 'PENDING';
  provider_breakdown: {
    gmail: number;
    outlook: number;
    yahoo: number;
    corporate: number;
  };
  warnings?: string[];
}

export interface AudienceSegmentDetail {
  segment_id: string;
  name: string;
  identifier: string;
  subscriber_count: number;
  health_score: number;
  health_status: 'EXCELLENT' | 'GOOD' | 'CRITICAL';
  open_rate: number;
  bounce_rate: number;
  spam_rate: number;
  sync_status: 'SYNCED' | 'INDEXING' | 'ERROR';
  last_sync: string;
  source: string;
  criteria: Record<string, any>;
  deliverability: AudienceSegmentDeliverability;
}

export interface AudienceSegmentsResponse {
  segments: AudienceSegmentDetail[];
  total_subscribers: number;
  aggregate_health: number;
  last_updated: string;
}

export interface CreateAudienceSegmentRequest {
  name: string;
  identifier: string;
  criteria: Record<string, any>;
  source: string;
  auto_sync: boolean;
  sync_frequency: 'REAL_TIME' | 'HOURLY' | 'DAILY';
}

export interface CreateAudienceSegmentResponse {
  segment_id: string;
  status: 'CREATED';
  estimated_subscriber_count: number;
  sync_status: 'INDEXING';
  health_projection: 'EXCELLENT' | 'GOOD' | 'CRITICAL';
  deliverability_forecast: {
    inbox_placement: number;
    recommended_send_volume: number;
    ip_warming_required: boolean;
  };
}

export interface SegmentHealthRecommendation {
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  action: string;
  description: string;
  projected_health_improvement: number;
}

export interface SegmentHealthResponse {
  segment_id: string;
  health_score: number;
  health_breakdown: {
    list_quality: number;
    engagement_velocity: number;
    deliverability_reputation: number;
    content_relevance: number;
  };
  recommendations: SegmentHealthRecommendation[];
}

export interface ReputationAlert {
  timestamp: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  message: string;
  action_taken: string;
  resolution_time_minutes: number;
}

export interface ReputationMonitorResponse {
  domain_status: 'EXCELLENT' | 'GOOD' | 'POOR';
  domain_reputation_score: number;
  ip_warming_status: {
    current_phase: string;
    days_in_phase: number;
    daily_send_limit: number;
    recommended_daily_volume: number;
    warming_progress: number;
  };
  provider_side_throttling: {
    [key: string]: {
      status: string;
      inbox_rate: number;
      throttle_detected: boolean;
      note?: string;
    };
  };
  ip_warming_latency_grid: {
    grid_size: string;
    cells: {
      day: number;
      volume: number;
      latency_ms: number;
      status: string;
    }[];
    visualization: string;
    trend: 'IMPROVING' | 'STABLE' | 'DECLINING';
  };
  alert_history: ReputationAlert[];
  recommendations: string[];
}

export interface IPWarmingControlRequest {
  action: 'ADJUST_VOLUME' | 'PAUSE' | 'RESUME';
  new_daily_limit: number;
  ramp_schedule: {
    type: 'GRADUAL' | 'FIXED';
    increment_percentage: number;
    increment_interval_days: number;
  };
  target_providers: string[];
}

export interface IPWarmingControlResponse {
  warming_id: string;
  status: 'SCHEDULED' | 'ACTIVE' | 'PAUSED';
  current_volume: number;
  target_volume: number;
  ramp_schedule: {
    day: number;
    volume: number;
  }[];
  monitoring_alerts: string[];
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

export interface AutomationFlowDetail {
  flow_id: string;
  name: string;
  trigger_type: string;
  trigger_threshold?: number;
  status: 'RUNNING' | 'PAUSED' | 'DRAFT';
  steps: number;
  conversion_rate: number;
  conversion_status: 'WARMING_UP' | 'PERFORMING' | 'HIGH_PERFORMING' | 'EXCEPTIONAL';
  enrolled_contacts: number;
  completed_contacts: number;
  active_contacts: number;
  last_triggered: string;
  next_scheduled: string;
  performance: {
    email_1_open_rate?: number | null;
    email_2_open_rate?: number | null;
    email_3_open_rate?: number | null;
    email_4_open_rate?: number | null;
    email_5_open_rate?: number | null;
    click_rate: number;
    unsubscribe_rate: number;
    trial_to_paid_conversion?: number;
    cart_recovery_rate?: number;
    revenue_recovered?: number;
    nps_score?: number;
    expansion_revenue?: number;
  };
  ai_optimization: {
    enabled: boolean;
    last_optimized: string;
    optimization_type: string;
    projected_improvement: string;
  };
}

export interface ActiveFlowsResponse {
  flows: AutomationFlowDetail[];
  total_active_flows: number;
  aggregate_conversion_rate: number;
  total_enrolled: number;
  total_revenue_impact: number;
}

export interface CreateAutomationFlowRequest {
  name: string;
  trigger_type: string;
  trigger_criteria: {
    days_since_last_open: number;
    days_since_last_click: number;
    days_since_last_purchase: number;
  };
  steps: {
    step_number: number;
    delay_hours: number;
    channel: 'EMAIL' | 'SMS' | 'WHATSAPP';
    template_id: string;
    subject: string;
    personalization: boolean;
    ab_test?: {
      enabled: boolean;
      variants: string[];
      split: number;
    };
    conditional_logic?: any;
    exit_condition?: any;
  }[];
  conversion_goal: string;
  success_metrics: string[];
}

export interface CreateAutomationFlowResponse {
  flow_id: string;
  status: 'CREATED' | 'ACTIVE';
  estimated_enrollment: number;
  projected_conversion_rate: number;
  projected_revenue_impact: number;
  deployment_ready: boolean;
}

export interface FlowDeploymentRequest {
  deployment_mode: 'GRADUAL' | 'IMMEDIATE';
  rollout_percentage: number;
  monitoring_window_hours: number;
  auto_scale_threshold: {
    metric: string;
    operator: string;
    value: number;
  };
  approval_required: boolean;
}

export interface FlowDeploymentResponse {
  deployment_id: string;
  status: 'DEPLOYING';
  rollout_progress: number;
  monitoring_dashboard: string;
  estimated_full_deployment: string;
}

export interface EmailTemplateDetail {
  template_id: string;
  name: string;
  type: 'MARKETING' | 'TRANSACTIONAL';
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
  ab_test_status: 'ACTIVE' | 'NOT_APPLICABLE' | 'ARCHIVED';
  preview_url: string;
  modified_date: string;
  performance: {
    open_rate?: number;
    click_rate?: number;
    conversions?: number | string;
    variant_a?: {
      name: string;
      open_rate: number;
      click_rate: number;
      conversions: number;
    };
    variant_b?: {
      name: string;
      open_rate: number;
      click_rate: number;
      conversions: number;
      lift_vs_control: string;
    };
    winner?: string;
    confidence?: number;
    recommended_action?: string;
  };
  content: {
    subject_line: string;
    preview_text: string;
    personalization_tokens: string[];
    dynamic_blocks: string[];
  };
  brand_compliance: {
    logo_present: boolean;
    colors_match: boolean;
    tone_score: number;
    spam_score: number;
  };
}

export interface TemplatesResponse {
  templates: EmailTemplateDetail[];
  total_templates: number;
  total_active_ab_tests: number;
}

export interface CreateTemplateRequest {
  name: string;
  type: 'MARKETING' | 'TRANSACTIONAL';
  subject_line: string;
  preview_text: string;
  content_blocks: {
    type: string;
    content: string;
    personalization: boolean;
    url?: string;
  }[];
  ab_test?: {
    enabled: boolean;
    variants: {
      name: string;
      subject_line: string;
      hero_image: string;
    }[];
    split: number;
    winner_criteria: string;
    test_duration_days: number;
  };
  brand_guidelines: {
    primary_color: string;
    font_family: string;
    logo_position: string;
    footer_required: boolean;
  };
}

export interface CreateTemplateResponse {
  template_id: string;
  status: 'CREATED';
  preview_url: string;
  spam_score_prediction: number;
  deliverability_forecast: 'EXCELLENT' | 'GOOD' | 'POOR';
  ab_test_ready: boolean;
}

export interface ABTestWinnerRequest {
  action: 'DECLARE_WINNER';
  winner_variant: string;
  rollout_percentage: number;
  archive_loser: boolean;
}

export interface ABTestWinnerResponse {
  test_id: string;
  status: 'WINNER_DECLARED';
  winner: string;
  winning_metrics: {
    open_rate: number;
    click_rate: number;
    conversion_lift: string;
  };
  rollout_status: 'IN_PROGRESS';
  estimated_completion: string;
}

export interface PlatformSyncStatus {
  platform: string;
  connection_type: string;
  api_version: string;
  status: 'CONNECTED' | 'DISCONNECTED' | 'ERROR' | 'PENDING' | 'AVAILABLE';
  latency_ms: number;
  latency_status: 'GOOD' | 'FAIR' | 'POOR';
  last_sync: string;
  sync_frequency: string;
  synced_data: {
    profiles: number;
    lists: number;
    segments: number;
    flows: number;
    templates: number;
    campaigns: number;
  };
  bidirectional_sync: boolean;
  conflict_resolution: string;
  webhook_endpoints: string[];
  health_checks: {
    api_connectivity: string;
    rate_limit_status: string;
    auth_token_validity: string;
    data_consistency: string;
  };
}

export interface AvailableIntegration {
  platform: string;
  status: 'AVAILABLE' | 'CONNECTED';
  setup_url: string;
}

export interface SyncLog {
  timestamp: string;
  platform: string;
  action: string;
  records_processed: number;
  errors: number;
  duration_ms: number;
}

export interface PlatformSyncResponse {
  connected_platforms: PlatformSyncStatus[];
  available_integrations: AvailableIntegration[];
  sync_logs: SyncLog[];
}

export interface ConnectPlatformRequest {
  platform: string;
  auth_method: 'OAUTH2' | 'API_KEY';
  scopes: string[];
  sync_config: {
    direction: 'BIDIRECTIONAL' | 'UNIDIRECTIONAL';
    sync_frequency: string;
    conflict_resolution: string;
    field_mapping: Record<string, string>;
  };
}

export interface ConnectPlatformResponse {
  connection_id: string;
  status: 'PENDING_AUTH' | 'CONNECTED' | 'ERROR';
  oauth_url?: string;
  setup_instructions: string;
  estimated_setup_time: string;
}

export interface WorkflowAuditRequest {
  audit_scope: 'ALL_FLOWS';
  audit_type: 'COMPLIANCE_PERFORMANCE_DELIVERABILITY';
  check_items: string[];
}

export interface WorkflowAuditFinding {
  severity: 'INFO' | 'WARNING' | 'PASS' | 'CRITICAL';
  category: 'PERFORMANCE' | 'DELIVERABILITY' | 'COMPLIANCE';
  message: string;
  recommendation: string;
}

export interface WorkflowAuditResponse {
  audit_id: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'FAILED';
  overall_score: number;
  findings: WorkflowAuditFinding[];
  audit_timestamp: string;
  next_scheduled_audit: string;
}

export interface DeploymentSequenceItem {
  flow_id: string;
  deploy_date: string;
  target_segment: string;
  expected_volume: number;
  throttle?: {
    enabled: boolean;
    daily_limit: number;
    ramp_days: number;
  };
}

export interface DeploymentSequenceRequest {
  sequence_name: string;
  deployments: DeploymentSequenceItem[];
  approval_workflow: {
    requires_approval: boolean;
    approvers: string[];
    approval_deadline: string;
  };
}

export interface DeploymentSequenceResponse {
  deployment_sequence_id: string;
  status: 'PENDING_APPROVAL' | 'SCHEDULED' | 'EXECUTING' | 'COMPLETED';
  total_expected_volume: number;
  timeline: {
    date: string;
    flows: number;
    volume: number;
  }[];
  approval_links: Record<string, string>;
}

export type WSEventType = 
  | 'SEGMENT_SYNC_COMPLETE'
  | 'REPUTATION_ALERT'
  | 'FLOW_CONVERSION_UPDATE'
  | 'TEMPLATE_AB_TEST_MILESTONE'
  | 'PLATFORM_SYNC_STATUS_CHANGE'
  | 'DEPLOYMENT_STATUS_UPDATE'
  | 'AUDIT_FINDING';

export interface BaseWSPayload {
  event: WSEventType;
  timestamp: string;
}

export interface FlowConversionPayload extends BaseWSPayload {
  event: 'FLOW_CONVERSION_UPDATE';
  flow_id: string;
  conversion_rate: number;
  delta: string;
  enrolled_today: number;
  converted_today: number;
  revenue_today: number;
  ai_recommendation: string;
}

export interface ReputationAlertPayload extends BaseWSPayload {
  event: 'REPUTATION_ALERT';
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  message: string;
  metric: string;
  current_value: number;
  threshold: number;
}

export interface PlatformSyncStatusPayload extends BaseWSPayload {
  event: 'PLATFORM_SYNC_STATUS_CHANGE';
  platform: string;
  new_status: string;
  message: string;
}

export interface AuditFindingPayload extends BaseWSPayload {
  event: 'AUDIT_FINDING';
  audit_id: string;
  finding: WorkflowAuditFinding;
}

export type WSPayload = 
  | FlowConversionPayload 
  | ReputationAlertPayload 
  | PlatformSyncStatusPayload 
  | AuditFindingPayload
  | BaseWSPayload;

export interface OAuthStatusResponse {
  authenticated: boolean;
  provider?: string;
  expires_at?: string;
  scopes?: string[];
  tenant_id: string;
}

export interface OnlineOpsLog {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  agent: string;
  action: string;
  platform?: string;
  segment_id?: string;
  message: string;
  data?: any;
}

export interface OnlineOpsLogsResponse {
  logs: OnlineOpsLog[];
  total_logs: number;
  next_page_token?: string;
}

export interface OnlineOpsQuickActionRequest {
  action_type: 'RUN_LIST_HYGIENE' | 'PAUSE_UNDERPERFORMING_FLOWS' | 'DEPLOY_WINNING_VARIANT' | 'SYNC_PLATFORM_NOW' | 'GENERATE_DELIVERABILITY_REPORT' | 'EXPORT_SEGMENT_DATA' | 'TRIGGER_RE_ENGAGEMENT' | 'NOTIFY_CLIENT_STATUS';
  target_segment?: string;
  hygiene_rules?: string[];
  approval_required: boolean;
}

export interface OnlineOpsQuickActionResponse {
  action_id: string;
  status: 'COMPLETED' | 'PENDING' | 'EXECUTING' | 'FAILED';
  message: string;
  affected_count?: number;
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

export interface MaintenanceAgentLog {
  status: 'verified' | 'update_needed';
  target_field: string;
  new_value: string;
  timestamp: string;
  message?: string;
}

export interface MaintenanceAuditResponse {
  audit_id: string;
  timestamp: string;
  summary: {
    verified: number;
    updates_applied: number;
    integrity_score: number;
  };
  logs: MaintenanceAgentLog[];
}

export interface DeveloperAgentLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'fatal';
  error_code: number;
  message: string;
  stack_trace?: string;
  target_api?: string;
  status: 'active' | 'fixing' | 'resolved' | 'escalated';
}

export interface DeveloperFixResponse {
  fix_id: string;
  status: 'testing' | 'applied' | 'failed';
  diff: string;
  error_log: string;
  validation_message: string;
  retry_count: number;
}

export interface SEOMetric {
  keyword: string;
  rank: number;
  change: number;
  volume: string;
}

export interface PricingPlan {
  plan: string;
  price: string;
  logicGate: string;
  action: string;
  features?: string[];
  isPopular?: boolean;
}

export interface CheckoutSessionRequest {
  plan_type: 'trial' | 'monthly' | 'yearly';
  customer_email?: string;
}

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export interface QueryRequest {
  query: string;
  context?: {
    tenant_id: string;
    recent_events?: string[];
    pillar?: string;
  };
}

export interface QueryResponse {
  answer: string;
  supporting_data: {
    metrics: Record<string, any>;
    charts: {
      type: 'bar' | 'line' | 'pie';
      data: any[];
      title: string;
    }[];
    sources: string[];
  };
  confidence_score: number;
  recommended_actions: string[];
  related_questions: string[];
}

export interface QueryLogEntry {
  id: string;
  timestamp: string;
  query: string;
  response: QueryResponse;
  type: 'operational' | 'strategic' | 'technical' | 'creative';
}
