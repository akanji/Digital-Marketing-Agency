import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Configure Multer for multimodal ingestion
  const storage = multer.memoryStorage();
  const upload = multer({ 
    storage,
    limits: {
      fileSize: 2 * 1024 * 1024 * 1024, // 2GB total limit
    }
  });

  app.use(express.json());

  // Multi-modal Audio Ingest Endpoint
  app.post('/api/v1/multimodal/audio-ingest', upload.single('audio'), (req, res) => {
    const tenantId = req.header('X-Tenant-ID');
    const apiKey = req.header('X-API-Key');
    const agent = req.header('X-A2A-Agent');

    if (!tenantId || !apiKey || agent !== 'media-ingest-agent') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!req.file) return res.status(400).json({ error: 'No audio file' });

    res.json({
      status: 'processing_complete',
      fileId: `aud-${Date.now()}`,
      analysis: {
        sentiment: 'positive',
        brandVoiceScore: 88,
        transcriptionPreview: "Welcome to our brand voice session...",
        topics: ['Brand Strategy', 'Market Positioning']
      }
    });
  });

  // Multi-modal Video Scene Scan Endpoint
  app.post('/api/v1/multimodal/scene-scan', upload.single('video'), (req, res) => {
    const tenantId = req.header('X-Tenant-ID');
    const apiKey = req.header('X-API-Key');
    const agent = req.header('X-A2A-Agent');

    if (!tenantId || !apiKey || agent !== 'media-ingest-agent') {
      return res.status(401).json({ error: 'Unauthorized or missing required headers' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No video file provided' });
    }

    // Processing: Frame extraction → Object/brand detection → Color palette analysis → Scene segmentation → Contextual metadata tagging
    console.log(`Scanning video for tenant: ${tenantId}, file: ${req.file.originalname}`);
    
    setTimeout(() => {
      res.json({
        status: 'scan_complete',
        fileId: `vid-${Date.now()}`,
        metadata: {
          duration: 120, // 120 seconds
          resolution: '3840x2160',
          fps: 60
        },
        inference: {
          objectsDetected: ['MacBook Pro', 'Coffee Cup', 'Modern Office', 'Brand Logo'],
          brands: ['Apple', 'Agency Logo'],
          palette: ['#0A0A0B', '#F5F5F7', '#3B82F6'],
          scenes: 12,
          tags: ['tech-lifestyle', 'clean-aesthetic', 'high-tempo-cut']
        }
      });
    }, 3000); // Simulate heavy video processing
  });

  // Multimodal Webhook Stream Endpoint
  app.post('/webhooks/multimodal/stream', (req, res) => {
    const { 
      tenant_id, 
      session_id, 
      media_type, 
      processing_stage, 
      confidence_score, 
      extracted_context, 
      brand_alignment_score,
      timestamp 
    } = req.body;

    console.log(`[Webhook] Received stream event: ${processing_stage} for session: ${session_id}`);

    // In a real scenario, this might push to a WebSocket or update a database
    // For now, we acknowledge reception
    res.status(202).json({
      received: true,
      processed_at: new Date().toISOString()
    });
  });

  // Tone Training / Brain Head Training Endpoint
  app.post('/api/v1/tone-training/train-head', (req, res) => {
    const { 
      tenant_id, 
      voice_profile_name, 
      training_samples, 
      target_characteristics 
    } = req.body;

    if (!tenant_id || !voice_profile_name || !training_samples?.length) {
      return res.status(400).json({ error: 'Missing required training parameters' });
    }

    console.log(`[Tone Training] Queuing head training for profile: ${voice_profile_name} (Tenant: ${tenant_id})`);

    // Simulate training queue and validation
    res.status(202).json({
      head_id: `head-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      training_status: 'queued',
      estimated_completion: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 mins from now
      validation_score: 0.92,
      sample_output_url: "https://tenant-cdn.com/preview/head-sample-preview.mp3"
    });
  });

  // Tone Training Dimensions Management
  app.get('/api/v1/tone-training/dimensions', (req, res) => {
    res.json({
      dimensions: {
        technical_expert: 0.92,
        friendly_approachable: 0.42,
        high_efficiency: 0.68
      },
      last_updated: new Date().toISOString()
    });
  });

  app.patch('/api/v1/tone-training/dimensions', (req, res) => {
    const { head_id, dimension_adjustments, apply_to_agents } = req.body;
    
    if (!head_id || !dimension_adjustments) {
      return res.status(400).json({ error: 'Missing head_id or adjustments' });
    }

    console.log(`[Tone Dimensions] Adjusting head ${head_id} for agents: ${apply_to_agents?.join(', ')}`);
    
    res.json({
      status: 'applied',
      new_profile: dimension_adjustments,
      affected_agents: apply_to_agents || [],
      sync_timestamp: new Date().toISOString()
    });
  });

  // Active Campaigns API
  app.get('/api/v1/campaigns/active', (req, res) => {
    const { tenant_id, status, media_type } = req.query;
    
    console.log(`[Campaigns] Fetching active campaigns for tenant: ${tenant_id}, status: ${status}, type: ${media_type}`);

    // Mock data based on requested structure
    const campaigns = [
      {
        campaign_id: 'camp-123',
        campaign_name: 'Spring Reveal: Multimodal',
        status: 'READY',
        asset_count: 24,
        quality_score: 98,
        media_mix: {
          video: 8,
          audio: 6,
          image: 10,
          structured: 4
        },
        brand_alignment: {
          tone_match: 0.96,
          visual_match: 0.94,
          voice_match: 0.98
        },
        production_version: 'v2.4',
        deep_link: '/campaigns/camp-123/studio'
      },
      {
        campaign_id: 'camp-124',
        campaign_name: 'Cyber Monday Efficiency',
        status: 'GENERATING',
        asset_count: 12,
        quality_score: 92,
        media_mix: {
          video: 2,
          audio: 4,
          image: 4,
          structured: 2
        },
        brand_alignment: {
          tone_match: 0.88,
          visual_match: 0.90,
          voice_match: 0.85
        },
        production_version: 'v1.1',
        deep_link: '/campaigns/camp-124/studio'
      }
    ];

    res.json(campaigns);
  });

  // Video Generation Endpoint
  app.post('/api/v1/video/generate', (req, res) => {
    const { 
      tenant_id, 
      campaign_id, 
      prompt, 
      source_context, 
      output_specs, 
      voiceover 
    } = req.body;

    if (!tenant_id || !prompt || !campaign_id) {
      return res.status(400).json({ error: 'Missing required generation parameters' });
    }

    console.log(`[Video Gen] Initializing synthesis for campaign: ${campaign_id} (Tenant: ${tenant_id})`);
    console.log(`[Video Gen] Prompt: ${prompt}`);

    // Mock response for video generation tracking
    res.status(202).json({
      generation_id: `gen-vid-${Date.now()}`,
      status: 'synthesizing',
      progress_percent: 12,
      preview_url: "https://tenant-cdn.com/previews/gen-preview-01.mp4",
      download_url: "https://tenant-cdn.com/export/gen-highres-01.mp4",
      validity_score: 0.98,
      production_version: 'v2.4'
    });
  });

  // Video Validation & Quality Assurance Endpoint
  app.post('/api/v1/video/validate', (req, res) => {
    const { video_id, campaign_id, target_platform } = req.body;

    console.log(`[Validation] Running compliance suite for video: ${video_id} (${target_platform})`);

    // Simulate deep multimodal analysis
    res.json({
      validity_score: 0.98,
      checks_passed: [
        "color_match", 
        "logo_visible", 
        "tone_aligned", 
        "sync_ok", 
        "platform_compliant"
      ],
      checks_failed: [],
      recommendations: [],
      metadata: {
        brand_color_density: 0.89,
        logo_dwell_time: "4.2s",
        spectral_sync_error: "< 0.05ms"
      }
    });
  });

  // Audio Synthesis & Voice-Over Mastery Endpoint
  app.post('/api/v1/audio/synthesize', (req, res) => {
    const { 
      tenant_id, 
      head_id, 
      script, 
      language, 
      emotion_profile 
    } = req.body;

    if (!tenant_id || !head_id || !script) {
      return res.status(400).json({ error: 'Missing required synthesis parameters' });
    }

    console.log(`[Audio Synth] Generating master for head: ${head_id} (Tenant: ${tenant_id})`);
    console.log(`[Audio Synth] Script: "${script.substring(0, 50)}..."`);

    // Mock high-fidelity synthesis response
    res.json({
      audio_id: `aud-synth-${Date.now()}`,
      status: 'completed',
      duration_seconds: 12.4,
      validity_score: 0.95,
      download_url: "https://tenant-cdn.com/audio/master-export-01.wav",
      streaming_url: "https://tenant-cdn.com/audio/master-stream-01.m3u8",
      production_version: 'v2.4'
    });
  });

  // Vocal Identity Management Endpoint
  app.get('/api/v1/audio/identity', (req, res) => {
    res.json([
      {
        identity_id: 'vid-001',
        name: "Vocal Identity - Male/Smooth",
        characteristics: {
          clarity_score: 0.95,
          warmth_score: 0.72,
          authority_score: 0.68,
          pace_wpm: 145,
          pitch: 'mid-range'
        },
        status: 'active',
        tags: ['professional', 'friendly', 'clone']
      },
      {
        identity_id: 'vid-002',
        name: "Vocal Identity - Female/Authoritative",
        characteristics: {
          clarity_score: 0.98,
          warmth_score: 0.45,
          authority_score: 0.92,
          pace_wpm: 138,
          pitch: 'alto'
        },
        status: 'standby',
        tags: ['corporate', 'news', 'crisp']
      }
    ]);
  });

  app.post('/api/v1/audio/identity/:identity_id/activate', (req, res) => {
    const { identity_id } = req.params;
    const { campaign_id, auto_apply } = req.query;

    console.log(`[Vocal Identity] Activating ${identity_id} for campaign ${campaign_id} (Auto-apply: ${auto_apply})`);
    
    res.json({
      status: 'activated',
      identity_id,
      campaign_id,
      auto_apply: auto_apply === 'true',
      activation_timestamp: new Date().toISOString()
    });
  });

  // Media Center Assets API
  app.get('/api/v1/media-center/assets', (req, res) => {
    console.log(`[Media Center] Fetching global asset library`);

    const assets = [
      {
        asset_id: 'asset-vid-001',
        asset_name: 'Spring_Reveal_Main.mp4',
        asset_type: 'video',
        status: '98% VALID',
        production_version: 'v2.4',
        brand_alignment: {
          confidence: 0.98,
          detected_tone: 'modern-energetic',
          visual_match: 0.96
        },
        usage_rights: {
          campaigns: ['camp-123'],
          platforms_approved: ['meta', 'google', 'tiktok']
        },
        download_url: 'https://tenant-cdn.com/assets/vid-001/download',
        cdn_url: 'https://tenant-cdn.com/assets/vid-001/stream'
      },
      {
        asset_id: 'asset-aud-001',
        asset_name: 'Vocal_Master_Spring_V1.wav',
        asset_type: 'audio',
        status: '95% VALID',
        production_version: 'v2.4',
        brand_alignment: {
          confidence: 0.95,
          detected_tone: 'professional-warm',
          visual_match: 1.0 // N/A for audio but kept for schema
        },
        usage_rights: {
          campaigns: ['camp-123'],
          platforms_approved: ['meta', 'google', 'linkedin']
        },
        download_url: 'https://tenant-cdn.com/assets/aud-001/download',
        cdn_url: 'https://tenant-cdn.com/assets/aud-001/stream'
      },
      {
        asset_id: 'asset-img-001',
        asset_name: 'Hero_Lifestyle_Bench.jpg',
        asset_type: 'image',
        status: '100% VALID',
        production_version: 'v2.1',
        brand_alignment: {
          confidence: 0.99,
          detected_tone: 'lifestyle-authentic',
          visual_match: 0.98
        },
        usage_rights: {
          campaigns: ['camp-123', 'camp-124'],
          platforms_approved: ['meta', 'google', 'tiktok', 'linkedin']
        },
        download_url: 'https://tenant-cdn.com/assets/img-001/download',
        cdn_url: 'https://tenant-cdn.com/assets/img-001/stream'
      }
    ];

    res.json(assets);
  });

  app.delete('/api/v1/media-center/assets/:asset_id', (req, res) => {
    const { asset_id } = req.params;
    console.log(`[Media Center] Deleting asset: ${asset_id}`);
    res.json({ success: true, message: `Asset ${asset_id} removed from multimodal library.` });
  });

  // Media Center Assets API
  app.get('/api/v1/media-center/assets', (req, res) => {
    res.json([
      {
        asset_id: 'ast-001',
        asset_name: 'Campaign_Vibe_Check.mp4',
        asset_type: 'video',
        status: '95% VALID',
        production_version: 'v2.4',
        brand_alignment: {
          confidence: 0.95,
          detected_tone: 'technical-expert',
          visual_match: 0.94
        },
        usage_rights: {
          campaigns: ['camp-multimodal-01'],
          platforms_approved: ['meta', 'google', 'tiktok']
        },
        download_url: "https://tenant-cdn.com/assets/ast-001/download",
        cdn_url: "https://tenant-cdn.com/assets/ast-001/stream"
      },
      {
        asset_id: 'ast-002',
        asset_name: 'Brand_Aura_Synth.wav',
        asset_type: 'audio',
        status: '92% VALID',
        production_version: 'v2.4',
        brand_alignment: {
          confidence: 0.92,
          detected_tone: 'friendly-supportive',
          visual_match: 1.0
        },
        usage_rights: {
          campaigns: ['camp-multimodal-02'],
          platforms_approved: ['spotify', 'youtube']
        },
        download_url: "https://tenant-cdn.com/assets/ast-002/download",
        cdn_url: "https://tenant-cdn.com/assets/ast-002/stream"
      }
    ]);
  });

  app.post('/api/v1/media-center/assets', (req, res) => {
    const asset = req.body;
    console.log(`[Media Center] Ingesting asset: ${asset.asset_name}`);
    res.status(201).json({ ...asset, asset_id: `ast-${Date.now()}`, status: '80% ANALYZING' });
  });

  app.delete('/api/v1/media-center/assets/:id', (req, res) => {
    console.log(`[Media Center] Purging asset: ${req.params.id}`);
    res.status(204).send();
  });

  // --- ONLINE OPERATIONS ENDPOINTS ---

  // OAuth Status
  app.get('/api/v1/auth/oauth-status', (req, res) => {
    res.json({
      authenticated: true,
      provider: 'Klaviyo',
      expires_at: new Date(Date.now() + 3600000).toISOString(),
      scopes: ['lists:read', 'segments:read', 'campaigns:write'],
      tenant_id: 'tenant-a2a-marketing'
    });
  });

  // Audience Segments
  app.get('/api/v1/online-ops/audience/segments', (req, res) => {
    res.json({
      segments: [
        {
          segment_id: 'seg-high-value-saas',
          name: 'High-Value SaaS Leads',
          identifier: 'HV',
          subscriber_count: 12400,
          health_score: 98,
          health_status: 'EXCELLENT',
          open_rate: 34.2,
          bounce_rate: 0.8,
          spam_rate: 0.02,
          sync_status: 'SYNCED',
          last_sync: new Date().toISOString(),
          source: 'CRM_DIRECT',
          criteria: { MRR: '>500' },
          deliverability: {
            inbox_placement: 99.2,
            domain_reputation: 'EXCELLENT',
            ip_warming_status: 'COMPLETE',
            provider_breakdown: { gmail: 45, outlook: 30, yahoo: 10, corporate: 15 }
          }
        },
        {
          segment_id: 'seg-abandoned-cart',
          name: 'Abandoned Cart (Premium)',
          identifier: 'AC',
          subscriber_count: 4560,
          health_score: 85,
          health_status: 'GOOD',
          open_rate: 42.1,
          bounce_rate: 1.2,
          spam_rate: 0.05,
          sync_status: 'SYNCED',
          last_sync: new Date().toISOString(),
          source: 'KLAVIYO_SYNC',
          criteria: { cart_value: '>200' },
          deliverability: {
            inbox_placement: 96.5,
            domain_reputation: 'GOOD',
            ip_warming_status: 'COMPLETE',
            provider_breakdown: { gmail: 50, outlook: 25, yahoo: 15, corporate: 10 }
          }
        },
        {
          segment_id: 'seg-cold-leads-reengagement',
          name: 'Cold Leads (Re-engagement)',
          identifier: 'CL',
          subscriber_count: 28000,
          health_score: 42,
          health_status: 'CRITICAL',
          open_rate: 5.2,
          bounce_rate: 5.2,
          spam_rate: 0.8,
          sync_status: 'SYNCED',
          last_sync: new Date().toISOString(),
          source: 'LEGACY_UPLOAD',
          criteria: { last_active: '>180d' },
          deliverability: {
            inbox_placement: 68.0,
            domain_reputation: 'POOR',
            ip_warming_status: 'PENDING',
            provider_breakdown: { gmail: 40, outlook: 20, yahoo: 30, corporate: 10 }
          }
        }
      ],
      total_subscribers: 44960,
      aggregate_health: 75,
      last_updated: new Date().toISOString()
    });
  });

  // Reputation Monitoring
  app.get('/api/v1/online-ops/reputation/monitor', (req, res) => {
    res.json({
      domain_status: 'EXCELLENT',
      domain_reputation_score: 95,
      ip_warming_status: {
        current_phase: 'Phase 4: High Volume',
        days_in_phase: 12,
        daily_send_limit: 100000,
        recommended_daily_volume: 85000,
        warming_progress: 100
      },
      provider_side_throttling: {
        gmail: { status: 'OPTIMAL', inbox_rate: 99.8, throttle_detected: false },
        outlook: { status: 'OPTIMAL', inbox_rate: 98.5, throttle_detected: false },
        yahoo: { status: 'MINIMAL_THROTTLE', inbox_rate: 94.2, throttle_detected: true, note: 'Rate limit hit on 10:00 UTC burst' }
      },
      ip_warming_latency_grid: {
        grid_size: '30x30',
        cells: [],
        trend: 'IMPROVING'
      },
      alert_history: [
        { timestamp: new Date().toISOString(), severity: 'INFO', message: 'Domain warmup sequence finalized.', action_taken: 'None', resolution_time_minutes: 0 }
      ],
      recommendations: ['Maintain current sending cadence', 'Monitor Yahoo feedback loops']
    });
  });

  // Active Flows
  app.get('/api/v1/online-ops/flows/active', (req, res) => {
    res.json({
      flows: [
        {
          flow_id: 'flow-ai-nurture',
          name: 'AI Smart Nurture',
          trigger_type: 'DYNAMIC_BEHAVIOR',
          status: 'RUNNING',
          steps: 12,
          conversion_rate: 0,
          conversion_status: 'WARMING_UP',
          enrolled_contacts: 1250,
          completed_contacts: 0,
          active_contacts: 1250,
          last_triggered: new Date().toISOString(),
          performance: { click_rate: 2.1, unsubscribe_rate: 0.1 },
          ai_optimization: { enabled: true, last_optimized: new Date().toISOString(), optimization_type: 'AB_TESTING', projected_improvement: '15%' }
        },
        {
          flow_id: 'flow-saas-trial',
          name: 'SaaS Trial Onboarding',
          trigger_type: 'WEB_HOOK_SIGNUP',
          status: 'RUNNING',
          steps: 8,
          conversion_rate: 14.5,
          conversion_status: 'PERFORMING',
          enrolled_contacts: 5400,
          completed_contacts: 1200,
          active_contacts: 4200,
          last_triggered: new Date().toISOString(),
          performance: { click_rate: 8.5, unsubscribe_rate: 0.5, trial_to_paid_conversion: 18.2 },
          ai_optimization: { enabled: true, last_optimized: new Date().toISOString(), optimization_type: 'TIMING', projected_improvement: '5%' }
        },
        {
          flow_id: 'flow-cart-abandon',
          name: 'Cart Abandon Mastery',
          trigger_type: 'EVENT_ABANDONED_CHECKOUT',
          status: 'RUNNING',
          steps: 3,
          conversion_rate: 22.0,
          conversion_status: 'EXCEPTIONAL',
          enrolled_contacts: 8900,
          completed_contacts: 7500,
          active_contacts: 1400,
          last_triggered: new Date().toISOString(),
          performance: { click_rate: 12.4, unsubscribe_rate: 0.2, cart_recovery_rate: 24.5 },
          ai_optimization: { enabled: true, last_optimized: new Date().toISOString(), optimization_type: 'SUBJECT_LINE', projected_improvement: '12%' }
        }
      ],
      total_active_flows: 8,
      aggregate_conversion_rate: 18.5,
      total_enrolled: 25400,
      total_revenue_impact: 145000
    });
  });

  // Templates
  app.get('/api/v1/online-ops/templates', (req, res) => {
    res.json({
      templates: [
        {
          template_id: 'tpl-welcome',
          name: 'Welcome Series (Main)',
          type: 'MARKETING',
          status: 'ACTIVE',
          ab_test_status: 'ACTIVE',
          preview_url: 'https://placehold.co/400x600',
          modified_date: new Date().toISOString(),
          performance: { open_rate: 45.2, click_rate: 12.1 },
          content: { subject_line: 'Welcome to the Future!', preview_text: 'Your journey starts here...', personalization_tokens: ['first_name'], dynamic_blocks: ['header', 'footer'] },
          brand_compliance: { logo_present: true, colors_match: true, tone_score: 98, spam_score: 0.1 }
        },
        {
          template_id: 'tpl-order-conf',
          name: 'Order Confirmation (Transactional)',
          type: 'TRANSACTIONAL',
          status: 'ACTIVE',
          ab_test_status: 'NOT_APPLICABLE',
          preview_url: 'https://placehold.co/400x600',
          modified_date: new Date().toISOString(),
          performance: { open_rate: 88.5, click_rate: 4.2 },
          content: { subject_line: 'Your Order #{{order_id}} is Confirmed', preview_text: 'Thank you for your purchase!', personalization_tokens: ['order_id', 'items'], dynamic_blocks: ['receipt'] },
          brand_compliance: { logo_present: true, colors_match: true, tone_score: 100, spam_score: 0.0 }
        }
      ],
      total_templates: 12,
      total_active_ab_tests: 4
    });
  });

  // Platform Sync Status
  app.get('/api/v1/online-ops/platform-sync/status', (req, res) => {
    res.json({
      connected_platforms: [
        {
          platform: 'Klaviyo',
          connection_type: 'API_KEY',
          api_version: '2024-02-15',
          status: 'CONNECTED',
          latency_ms: 45,
          latency_status: 'GOOD',
          last_sync: new Date().toISOString(),
          sync_frequency: 'REAL_TIME',
          synced_data: { profiles: 45000, lists: 12, segments: 24, flows: 8, templates: 12, campaigns: 4 },
          bidirectional_sync: true,
          conflict_resolution: 'AGENCY_PRIME',
          webhook_endpoints: ['https://a2a.agency/hooks/klaviyo'],
          health_checks: { api_connectivity: 'OK', rate_limit_status: 'OK', auth_token_validity: 'VALID', data_consistency: 'STABLE' }
        }
      ],
      available_integrations: [
        { platform: 'Mailchimp', status: 'AVAILABLE', setup_url: '/settings/integrations/mailchimp' },
        { platform: 'HubSpot', status: 'AVAILABLE', setup_url: '/settings/integrations/hubspot' }
      ],
      sync_logs: [
        { timestamp: new Date().toISOString(), platform: 'Klaviyo', action: 'SYNC_PROFILES', records_processed: 450, errors: 0, duration_ms: 1200 }
      ]
    });
  });

  // Workflow Audit
  app.post('/api/v1/online-ops/workflows/audit', (req, res) => {
    res.json({
      audit_id: `aud-${Date.now()}`,
      status: 'COMPLETED',
      overall_score: 88,
      findings: [
        { severity: 'WARNING', category: 'DELIVERABILITY', message: 'Cold Leads segment has 5.2% bounce rate, exceeding 2% threshold.', recommendation: 'Execute List Hygiene Protocol.' },
        { severity: 'INFO', category: 'PERFORMANCE', message: 'Cart Abandon Mastery is performing 40% above industry benchmark.', recommendation: 'Iterate winning variant for top-of-funnel flows.' },
        { severity: 'PASS', category: 'COMPLIANCE', message: 'All templates contain required unsubscribe footers.', recommendation: 'N/A' }
      ],
      audit_timestamp: new Date().toISOString(),
      next_scheduled_audit: new Date(Date.now() + 86400000).toISOString()
    });
  });

  // Deploy Sequence
  app.post('/api/v1/online-ops/workflows/deploy-sequence', (req, res) => {
    res.json({
      deployment_sequence_id: `ds-${Date.now()}`,
      status: 'EXECUTING',
      total_expected_volume: 45000,
      timeline: [
        { date: new Date().toISOString(), flows: 3, volume: 15000 },
        { date: new Date(Date.now() + 86400000).toISOString(), flows: 2, volume: 30000 }
      ],
      approval_links: { strategist: '/approvals/ds-123/strat' }
    });
  });

  // Online Ops Logs
  app.get('/api/v1/online-ops/logs', (req, res) => {
    res.json({
      logs: [
        { timestamp: new Date().toISOString(), level: 'INFO', agent: 'SyncManager', action: 'LIST_SYNC', platform: 'Klaviyo', message: 'Successfully synced 450 new profiles from main marketing list.' },
        { timestamp: new Date(Date.now() - 60000).toISOString(), level: 'WARN', agent: 'ReputationGuard', action: 'THROTTLE_DETECTED', platform: 'Yahoo', message: 'Minimal throttling detected on Yahoo domains. Adjusting throughput.' },
        { timestamp: new Date(Date.now() - 300000).toISOString(), level: 'ERROR', agent: 'AuthService', action: 'OAUTH_REFRESH', platform: 'Meta', message: 'Failed to refresh OAuth token for tenant agency-meta-1.' }
      ],
      total_logs: 150
    });
  });

  // Quick Actions
  app.post('/api/v1/online-ops/actions/quick', (req, res) => {
    const { action_type, target_segment } = req.body;
    res.json({
      action_id: `act-${Date.now()}`,
      status: 'COMPLETED',
      message: `${action_type.replace(/_/g, ' ')} executed successfully for ${target_segment || 'all segments'}.`,
      affected_count: Math.floor(Math.random() * 1000)
    });
  });

  // Template Create
  app.post('/api/v1/online-ops/templates/create', (req, res) => {
    res.status(201).json({
      template_id: `tpl-${Date.now()}`,
      status: 'CREATED',
      preview_url: 'https://placehold.co/400x600',
      spam_score_prediction: 0.05,
      deliverability_forecast: 'EXCELLENT',
      ab_test_ready: true
    });
  });

  // Flow Create
  app.post('/api/v1/online-ops/flows/create', (req, res) => {
    res.status(201).json({
      flow_id: `flow-${Date.now()}`,
      status: 'CREATED',
      estimated_enrollment: 1200,
      projected_conversion_rate: 15.5,
      projected_revenue_impact: 25000,
      deployment_ready: true
    });
  });

  // Template AB Test winner
  app.patch('/api/v1/online-ops/templates/:id/ab-test', (req, res) => {
    res.json({
      test_id: `test-${req.params.id}`,
      status: 'WINNER_DECLARED',
      winner: 'Variant B',
      winning_metrics: { open_rate: 48.2, click_rate: 14.5, conversion_lift: '+12%' },
      rollout_status: 'IN_PROGRESS',
      estimated_completion: new Date(Date.now() + 3600000).toISOString()
    });
  });

  // Segment Health
  app.get('/api/v1/online-ops/audience/segments/:id/health', (req, res) => {
    res.json({
      segment_id: req.params.id,
      health_score: 92,
      health_breakdown: { list_quality: 95, engagement_velocity: 88, deliverability_reputation: 96, content_relevance: 90 },
      recommendations: [
        { priority: 'MEDIUM', action: 'Rotate Creatives', description: 'Engagement velocity is stabilizing.', projected_health_improvement: 5 }
      ]
    });
  });

  // --- CIRCUIT BREAKER & SCHEMA UTILS ---
  const retryRegistry = new Map<string, number>();
  const MAX_RETRY_THRESHOLD = 3;

  const sanitizeSchema = (data: any) => {
    // Normalizes marketing API oddities (e.g., Klaviyo's inconsistent date formats)
    const sanitized = { ...data };
    if (sanitized.timestamp && !isNaN(Date.parse(sanitized.timestamp))) {
      sanitized.timestamp = new Date(sanitized.timestamp).toISOString();
    }
    // Remove internal noise fields to save tokens
    delete sanitized.__v;
    delete sanitized._internal_meta;
    return sanitized;
  };

  const minifyLog = (log: string) => {
    // Strips stack trace noise, keeps relevant error paths
    return log
      .split('\n')
      .filter(line => line.includes('/src/') || line.includes('Error:'))
      .join('\n')
      .substring(0, 500); // Token limit protection
  };

  // --- MAINTENANCE & VALIDATION AGENT ENDPOINTS ---

  // Trigger Audit
  app.post('/api/v1/maintenance/trigger-audit', (req, res) => {
    const timestamp = new Date().toISOString();
    const auditData = sanitizeSchema({
      audit_id: `maint-aud-${Date.now()}`,
      timestamp: timestamp,
      summary: {
        verified: 124,
        updates_applied: 3,
        integrity_score: 98
      },
      logs: [
        {
          status: 'update_needed',
          target_field: 'klaviyo_api_token',
          new_value: '************K93B',
          timestamp: timestamp,
          message: 'Token near expiration. Rotated via Gemini 2.0 security protocol.'
        },
        {
          status: 'verified',
          target_field: 'abandoned_cart_redirect_uri',
          new_value: 'https://a2a.agency/cart/recovery',
          timestamp: timestamp,
          message: 'Integrity check passed. URI is reachable and SSL valid.'
        }
      ]
    });
    res.json(auditData);
  });

  // Audit Logs
  app.get('/api/v1/maintenance/audit-logs', (req, res) => {
    res.json({
      logs: [
        {
          status: 'verified',
          target_field: 'campaign_tokens',
          new_value: 'VALID',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          message: 'Routine validation check.'
        }
      ]
    });
  });

  // --- LEAD A2A DEVELOPER AGENT ENDPOINTS ---

  // Get Developer Logs
  app.get('/api/v1/developer/logs', (req, res) => {
    res.json({
      logs: [
        {
          id: `dev-err-1`,
          timestamp: new Date().toISOString(),
          level: 'error',
          error_code: 500,
          message: 'Internal Error Occurred: Klaviyo API timeout on Campaign Sync.',
          target_api: 'Klaviyo',
          status: 'active',
          stack_trace: 'Error: Request timed out after 30000ms\n    at KlaviyoClient.syncCampaigns (/src/services/klaviyo.ts:145:23)...'
        }
      ]
    });
  });

  // Trigger Auto-Fix
  app.post('/api/v1/developer/auto-fix', (req, res) => {
    const { error_id, raw_log } = req.body;
    
    if (!error_id) return res.status(400).json({ error: 'Missing error_id' });

    // Infinite Loop Protection
    const currentRetries = retryRegistry.get(error_id) || 0;
    if (currentRetries >= MAX_RETRY_THRESHOLD) {
      return res.status(429).json({
        error: 'Infinite Helpfulness Loop Detected',
        message: `Escalating to human Developer Agent. Fix failed ${currentRetries} times.`,
        status: 'escalated'
      });
    }

    retryRegistry.set(error_id, currentRetries + 1);

    const minified = raw_log ? minifyLog(raw_log) : 'No raw log provided';

    res.json({
      fix_id: `fix-${Date.now()}`,
      status: 'applied',
      diff: `--- a/src/services/klaviyo.ts\n+++ b/src/services/klaviyo.ts\n@@ -145,1 +145,1 @@\n-    timeout: 30000,\n+    timeout: 60000, // Normalized for execution limits`,
      error_log: minified,
      validation_message: 'Protocol fix verified in Gemini 2.0 sandbox (30s execution limit respected).',
      retry_count: currentRetries + 1
    });
  });

  // --- QUERY AGENT ENDPOINTS ---

  app.post('/api/v1/query/process', (req, res) => {
    const { query, context } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    console.log(`[Query Agent] Processing: "${query}" for tenant: ${context?.tenant_id}`);

    // Mock intelligent responses based on prompt examples
    let response: any = {
      answer: "I've analyzed your agency metadata and connected platforms. Your overall performance is stable, but there are opportunities for optimization in your high-value segments.",
      supporting_data: {
        metrics: { roas: '4.2x', spend: '$12,450', conversion: '5.2%' },
        charts: [
          { type: 'bar', title: 'Spend by Pillar', data: [{ name: 'PPC', value: 4500 }, { name: 'Social', value: 3000 }, { name: 'SEO', value: 2000 }] }
        ],
        sources: ['Google Ads API', 'Meta Insights', 'Klaviyo Segment Data']
      },
      confidence_score: 0.94,
      recommended_actions: ["Increase budget for PMax campaign", "Execute re-engagement flow for cold leads"],
      related_questions: ["What is my churn risk for this month?", "Show me detailed attribution for the SaaS client"]
    };

    if (query.toLowerCase().includes('spend')) {
      response.answer = "Your current monthly ad spend across all clients is $145,000, which is pacing 12% below budget thresholds.";
      response.supporting_data.metrics = { total_spend: '$145,000', pacing: '-12%', budget_utilization: '88%' };
    } else if (query.toLowerCase().includes('roas')) {
      response.answer = "The campaign with the highest ROAS this week is the 'PMax E-commerce Global' campaign at 8.4x.";
      response.supporting_data.metrics = { highest_roas: '8.4x', second_best: '6.2x', account_avg: '4.2x' };
    } else if (query.toLowerCase().includes('subject line')) {
      response.answer = "Here are 5 high-performing subject lines for your welcome series, optimized for B2B SaaS curiosity coefficients.";
      response.supporting_data.sources = ['GPT-4 Content Engine', 'Engagement History'];
      response.recommended_actions = [
        "Welcome to the Architecture of Growth",
        "Inside the $100M Marketing OS",
        "Your first 30 days of transformation",
        "Why standard agencies are failing (and you won't)",
        "The Protocol has been updated: Welcome."
      ];
    } else if (query.toLowerCase().includes('pixel')) {
       response.answer = "Your Meta Pixel is currently reporting a mismatch error for conversion events on the 'Checkout' page. This is likely due to a recent change in your GTM container.";
       response.supporting_data.metrics = { firing_status: 'ERROR', match_quality: '42%', events_dropped: '1.2k' };
       response.recommended_actions = ["Verify GTM triggers", "Check CAPI connection"];
    }

    res.json(response);
  });

  // --- EMAIL DISPATCH AGENT ENDPOINTS ---
  
  let emailApprovals: any[] = [
    {
      id: 'appr-101',
      requester: 'phidephefem@gmail.com',
      recipient_count: 14250,
      subject: 'Global Spring reveal - Legacy List',
      status: 'COMPLIANCE_CHECK',
      priority: 'high',
      risk_score: 0.82,
      compliance_flags: ['High Volume Bounce Risk', 'Legacy List Detection'],
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      body_preview: 'Secure communication regarding our spring reveal strategy...'
    }
  ];

  let emailAuditTrail: any[] = [
    { id: 'aud-1', event: 'VAULT_ACCESS', actor: 'phidephefem@gmail.com', ip_address: '192.168.1.45', details: 'Access to encrypted email logs', timestamp: new Date(Date.now() - 7200000).toISOString(), severity: 'low' },
    { id: 'aud-2', event: 'DISPATCH_QUEUED', actor: 'SYSTEM', ip_address: 'INTERNAL', details: 'Financial communication appr-101 queued for MFA', timestamp: new Date(Date.now() - 3600000).toISOString(), severity: 'medium' },
    { id: 'aud-3', event: 'CERT_ROTATION', actor: 'ADMIN', ip_address: '10.0.0.8', details: 'TLS 1.3 certificates rotated successfully', timestamp: new Date(Date.now() - 300000).toISOString(), severity: 'high' }
  ];

  app.post('/api/v1/email/dispatch', (req, res) => {
    const { to, subject, encryption, compliance, body, type } = req.body;

    if (!to || !subject) {
      return res.status(400).json({ error: 'Recipient and subject required' });
    }

    console.log(`[Email Agent] Dispatching secure ${type} email to: ${to} via ${encryption}`);

    // Rule: Large sends or specific types require manual approval
    const sensitiveTypes = ['reporting', 'financial', 'legal'];
    const needsApproval = to.length > 100 || !body?.includes('unsubscribe') || !body?.includes('address') || sensitiveTypes.includes(type);

    if (needsApproval) {
      const newApproval = {
        id: `appr-${Date.now()}`,
        requester: 'phidephefem@gmail.com',
        recipient_count: to.length,
        subject: subject,
        status: sensitiveTypes.includes(type) ? 'LEGAL_REVIEW' : 'LEGAL_REVIEW',
        priority: to.length > 500 || type === 'financial' ? 'critical' : 'medium',
        risk_score: sensitiveTypes.includes(type) ? 0.95 : (to.length > 500 ? 0.9 : 0.5),
        compliance_flags: sensitiveTypes.includes(type) ? [`Sensitive Type: ${type}`] : (!body?.includes('unsubscribe') ? ['Missing Opt-out'] : ['High Volume']),
        timestamp: new Date().toISOString(),
        body_preview: body ? body.substring(0, 100) + '...' : 'No preview'
      };
      emailApprovals.push(newApproval);
      
      emailAuditTrail.push({
        id: `aud-${Date.now()}`,
        event: 'DISPATCH_BLOCKED',
        actor: 'phidephefem@gmail.com',
        ip_address: req.ip || 'UNKNOWN',
        details: `Dispatch of ${type} email blocked for manual approval (ID: ${newApproval.id})`,
        timestamp: new Date().toISOString(),
        severity: 'medium'
      });

      return res.json({
        dispatch_id: newApproval.id,
        status: 'queued',
        message: `Email type '${type}' requires manual approval before dispatch.`,
        security_audit_link: `https://a2a.agency/audit/${newApproval.id}`,
        encryption_hash: Buffer.from(`${Date.now()}-pending`).toString('hex'),
        timestamp: new Date().toISOString()
      });
    }

    emailAuditTrail.push({
      id: `aud-${Date.now()}`,
      event: 'DISPATCH_SUCCESS',
      actor: 'phidephefem@gmail.com',
      ip_address: req.ip || 'UNKNOWN',
      details: `Dispatched ${type} email to ${to.length} recipients`,
      timestamp: new Date().toISOString(),
      severity: 'low'
    });

    res.json({
      dispatch_id: `eml-${Date.now()}`,
      status: 'dispatched',
      security_audit_link: `https://a2a.agency/audit/eml-${Date.now()}`,
      encryption_hash: Buffer.from(`${Date.now()}-secure`).toString('hex'),
      timestamp: new Date().toISOString()
    });
  });

  app.get('/api/v1/email/approvals', (req, res) => {
    res.json({ approvals: emailApprovals });
  });

  app.get('/api/v1/email/audit', (req, res) => {
    res.json({ audit: emailAuditTrail });
  });

  app.post('/api/v1/email/approvals/:id/action', (req, res) => {
    const { id } = req.params;
    const { action } = req.body; // 'approve' or 'reject'

    const index = emailApprovals.findIndex(a => a.id === id);
    if (index === -1) return res.status(404).json({ error: 'Approval not found' });

    if (action === 'approve') {
      emailApprovals[index].status = 'APPROVED';
      emailAuditTrail.push({
        id: `aud-${Date.now()}`,
        event: 'APPROVAL_GRANTED',
        actor: 'ADMIN',
        ip_address: 'INTERNAL',
        details: `Manual approval granted for dispatch ${id}`,
        timestamp: new Date().toISOString(),
        severity: 'medium'
      });
      res.json({ message: 'Email approved for dispatch.', status: 'APPROVED' });
    } else {
      emailApprovals[index].status = 'REVISION_REQUESTED';
      emailAuditTrail.push({
        id: `aud-${Date.now()}`,
        event: 'APPROVAL_REJECTED',
        actor: 'ADMIN',
        ip_address: 'INTERNAL',
        details: `Manual approval rejected for dispatch ${id}`,
        timestamp: new Date().toISOString(),
        severity: 'medium'
      });
      res.json({ message: 'Email rejected. Revision requested.', status: 'REVISION_REQUESTED' });
    }
  });

  app.post('/api/v1/email/validate', (req, res) => {
    const { body } = req.body;
    
    // Simulate natural language compliance check
    const issues = [];
    if (!body?.includes('unsubscribe')) issues.push('Missing unsubscribe link (CAN-SPAM risk)');
    if (!body?.includes('address')) issues.push('Missing physical office address (CAN-SPAM required)');

    res.json({
      valid: issues.length === 0,
      issues,
      score: issues.length === 0 ? 1.0 : 0.6
    });
  });

  app.get('/api/v1/email/dispatches', (req, res) => {
    res.json({
      dispatches: [
        { id: 'eml-101', to: 'client@enterprise.com', subject: 'Quarterly Audit Report', type: 'reporting', status: 'delivered', security_level: 'TLS 1.3', timestamp: new Date(Date.now() - 86400000).toISOString(), open_count: 3, click_count: 1 },
        { id: 'eml-102', to: 'leaks@competitor.net', subject: 'Strategic Roadmap', type: 'reporting', status: 'bounced', security_level: 'PGP', timestamp: new Date(Date.now() - 43200000).toISOString(), open_count: 0, click_count: 0 },
        { id: 'eml-103', to: 'lead@target.com', subject: 'Introduction to Agency OS', type: 'marketing', status: 'processing', security_level: 'TLS 1.3', timestamp: new Date().toISOString(), open_count: 0, click_count: 0 }
      ]
    });
  });

  app.get('/api/v1/email/metrics', (req, res) => {
    res.json({
      total_sent: 15420,
      delivered: 15200,
      bounced: 180,
      opens: 8450,
      clicks: 3120,
      spam_reports: 5,
      delivery_rate: 98.6,
      open_rate: 54.8,
      click_rate: 20.2,
      timeline: Array.from({ length: 7 }, (_, i) => ({
        timestamp: new Date(Date.now() - (6 - i) * 86400000).toISOString().split('T')[0],
        sent: Math.floor(2000 + Math.random() * 500),
        delivered: Math.floor(1900 + Math.random() * 500)
      }))
    });
  });

  // --- BILLING & CHECKOUT ENDPOINTS ---

  app.post('/api/v1/checkout/create-session', (req, res) => {
    const { plan, price } = req.body;
    
    if (!plan || !price) {
      return res.status(400).json({ error: 'Missing plan or price' });
    }

    console.log(`[Billing] Creating checkout session for plan: ${plan}, price: ${price}`);

    res.json({
      sessionId: `sess_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      url: `https://checkout.stripe.com/pay/${plan}?price=${price.replace('$', '')}`
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
