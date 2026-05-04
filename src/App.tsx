import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Megaphone, 
  TrendingUp, 
  BarChart3, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  Plus, 
  Mic,
  Volume2,
  Code2,
  Table2,
  SearchCheck,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  MousePointer2,
  Target,
  DollarSign,
  Activity,
  Globe,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Filter,
  BarChart as BarChartLucide,
  Cpu,
  Terminal,
  ShieldCheck,
  Zap,
  RefreshCw,
  FileJson,
  HeartPulse,
  History,
  Share2,
  Mail,
  PieChart as PieChartLucide,
  Command,
  Key,
  ShieldAlert,
  ArrowRight,
  Layers,
  Sparkles,
  Info,
  Upload,
  Video,
  Music,
  UserCheck,
  Image as ImageIcon,
  Download,
  Users2,
  UserCircle,
  FileCheck,
  ClipboardCheck,
  AlertCircle,
  Clock,
  Database,
  Workflow,
  Shield,
  Infinity as MetaIcon,
  History as HistoryIcon,
  Eye,
  Link2,
  ExternalLink,
  MapPin,
  Bug,
  Network,
  FileSearch,
  CheckCircle2,
  XCircle,
  GanttChart,
  SearchCode,
  BadgeCheck,
  ArrowRightLeft,
  ShoppingCart,
  Boxes,
  Palette,
  Ear,
  Play,
  Brain,
  X,
  Copy,
  Check,
  Smile,
  Clapperboard,
  CreditCard,
  Building2,
  ShieldCheck as ShieldCheckIcon,
  Briefcase,
  Fingerprint,
  Thermometer,
  Edit3,
  Trash2,
  BarChart2,
  TestTube2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Tab, Campaign, Client, AgentCard, SystemLog, ValidationCycle, Pillar, ApprovalStatus, Persona, AgencyTemplate, MediaAsset, ContentCampaign, ActiveCampaign, VocalIdentity, MediaCenterAsset, SEOCrawlReport, Deliverable, EmailSegment, AutomationWorkflow, EmailTemplate, EmailVariant } from './types';
import { 
  DATA_ANALYTICS, 
  CAMPAIGNS, 
  CLIENTS, 
  AGENTS, 
  SYSTEM_LOGS, 
  VALIDATION_CYCLES,
  VIBE_SPECS,
  MEDIA_ASSETS,
  SECRETS,
  PERSONAS,
  COLLAB_SESSIONS,
  DELIVERABLES,
  EMAIL_SEGMENTS,
  AUTOMATION_WORKFLOWS,
  EMAIL_TEMPLATES,
  META_CAMPAIGNS,
  META_AUDIENCES,
  META_CREATIVES,
  META_PIXEL,
  SEO_CRAWL_DATA,
  KEYWORD_RANKS,
  BACKLINK_STATS,
  LOCAL_SEO,
  GOOGLE_ADS_CAMPAIGNS,
  GOOGLE_ADS_KEYWORDS,
  AUCTION_INSIGHTS,
  MERCHANT_CENTER,
  CONTENT_CAMPAIGNS,
  TRAINING_JOBS,
  AGENCY_TEMPLATES,
  SUBSCRIPTION_TIERS,
  DEFAULT_BRANDING
} from './constants';

// --- Utilities ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
};

// --- Sub-components ---

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  active: boolean, 
  onClick: () => void 
}) => (
  <button
    onClick={onClick}
    className={cn(
      "sidebar-item w-full group",
      active && "sidebar-item-active"
    )}
  >
    <Icon className={cn(
      "w-5 h-5 transition-colors",
      active ? "text-agency-accent" : "text-agency-muted group-hover:text-white"
    )} />
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const StatCard = ({ 
  label, 
  value, 
  increase, 
  icon: Icon, 
  trend 
}: { 
  label: string, 
  value: string, 
  increase: string, 
  icon: any, 
  trend: 'up' | 'down' 
}) => (
  <div className="stat-card">
    <div className="flex justify-between items-start mb-2">
      <div className="p-2 rounded-lg bg-agency-bg">
        <Icon className="w-5 h-5 text-agency-accent" />
      </div>
      <div className={cn(
        "flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full",
        trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
      )}>
        {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {increase}
      </div>
    </div>
    <span className="text-agency-muted text-xs font-medium uppercase tracking-wider">{label}</span>
    <span className="text-2xl font-bold tracking-tight font-display">{value}</span>
  </div>
);

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: number;
}

const Toast = ({ message, type, onClose }: { message: string, type: string, onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, x: 20, scale: 0.95 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    exit={{ opacity: 0, x: 20, scale: 0.95 }}
    className={cn(
      "fixed bottom-8 right-8 z-[100] px-6 py-4 rounded-2xl shadow-2xl border flex items-center gap-4 min-w-[300px]",
      type === 'success' ? "bg-emerald-600 border-emerald-500 text-white" :
      type === 'error' ? "bg-red-600 border-red-500 text-white" :
      "bg-agency-accent border-blue-400 text-white"
    )}
  >
    <div className="p-2 bg-white/20 rounded-lg">
      {type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : 
       type === 'error' ? <XCircle className="w-5 h-5" /> : 
       <Sparkles className="w-5 h-5" />}
    </div>
    <div className="flex-1">
      <div className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-0.5">System Notification</div>
      <div className="text-sm font-bold tracking-tight">{message}</div>
    </div>
    <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
      <ArrowRight className="w-4 h-4 rotate-45" />
    </button>
  </motion.div>
);

// --- Section Views ---

const Overview = ({ onAction }: { onAction: (name: string, type?: string) => void }) => (
  <div className="space-y-8 animate-in fade-in duration-700">
    <VibeCodingBar onAction={onAction} />
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard label="Agency Revenue (Net)" value="$294.5k" increase="12.4%" trend="up" icon={DollarSign} />
      <StatCard label="Clients Managed" value="42" increase="+3" trend="up" icon={Users} />
      <StatCard label="P&L Margin" value="68.2%" increase="4.2%" trend="up" icon={Activity} />
      <StatCard label="AOS Uptime" value="100%" increase="99.9%" trend="up" icon={ShieldCheck} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 panel-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-lg font-display">Performance Velocity</h3>
            <p className="text-xs text-agency-muted">Normalized throughput across all nodes.</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-agency-muted">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-agency-accent" /> Spend</div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-400" /> Conversion</div>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DATA_ANALYTICS}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              <Area type="monotone" dataKey="conv" stroke="#10B981" strokeWidth={3} fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="panel-card p-6">
        <h3 className="font-bold text-lg font-display mb-6">Pillar Distribution</h3>
        <div className="h-[250px] w-full mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: 'PPC', value: 45, color: '#2563EB' },
                  { name: 'Social', value: 30, color: '#8B5CF6' },
                  { name: 'SEO', value: 15, color: '#10B981' },
                  { name: 'Online', value: 10, color: '#F59E0B' },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {[
                  { name: 'PPC', value: 45, color: '#2563EB' },
                  { name: 'Social', value: 30, color: '#8B5CF6' },
                  { name: 'SEO', value: 15, color: '#10B981' },
                  { name: 'Online', value: 10, color: '#F59E0B' },
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Paid Search (MCC)', code: 'PPC', val: '45%', color: 'bg-[var(--agency-accent)]' },
            { label: 'SEO Engine', code: 'SEO', val: '30%', color: 'bg-purple-600' },
            { label: 'Generative Creative', code: 'GEN', val: '15%', color: 'bg-emerald-500' },
            { label: 'Automated Ops', code: 'OPS', val: '10%', color: 'bg-amber-500' },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("w-2 h-2 rounded-full", item.color)} />
                <span className="text-xs font-bold text-agency-ink">{item.label}</span>
              </div>
              <span className="text-xs font-mono text-agency-muted">{item.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Business Intelligence: Agency Health */}
      <div className="panel-card p-6 border-l-4 border-l-emerald-500">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-bold text-lg font-display">Client Health Monitor</h3>
            <p className="text-xs text-agency-muted">Retention risk and white-label engagement scores.</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-agency-ink">94.2%</div>
            <div className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">Satisfaction High</div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-agency-bg rounded-xl border border-agency-border">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black uppercase text-agency-muted">Churn Risk Alert</span>
              <span className="text-[10px] font-bold text-amber-500">2 Clients At Risk</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[9px] font-bold">
                <span>Client: Delta Retail</span>
                <span className="text-red-500">Engagement -15%</span>
              </div>
              <div className="h-1 bg-white rounded-full overflow-hidden">
                <div className="h-full bg-red-500 w-[15%]" />
              </div>
            </div>
          </div>
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white border border-emerald-200 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-900 leading-tight">Reseller Margin Optimization</div>
                <div className="text-[10px] font-bold text-emerald-600 tracking-tight">Markup set to +40% across SaaS cluster</div>
              </div>
            </div>
            <button 
              onClick={() => onAction('Opening Profit Dashboard for Pricing analysis...', 'info')}
              className="px-3 py-1 bg-white border border-emerald-200 rounded-lg text-[10px] font-black uppercase text-emerald-600 shadow-sm"
            >
              Adjust
            </button>
          </div>
        </div>
      </div>

      <div className="panel-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg font-display">Spec Convergence</h3>
          <button 
            onClick={() => onAction('Syncing all specifications...', 'info')}
            className="text-[10px] font-bold text-agency-accent uppercase tracking-widest hover:underline"
          >
            View All Specs
          </button>
        </div>
        <div className="space-y-4">
          {VIBE_SPECS.map((spec) => (
            <div key={spec.id} className="p-4 bg-agency-bg rounded-xl border border-agency-border flex items-center justify-between">
              <div className="flex items-center gap-4 min-w-0">
                <div className="p-2 rounded-lg bg-white border border-agency-border shrink-0">
                  <Command className="w-4 h-4 text-agency-accent" />
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-agency-ink truncate">{spec.query}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-mono text-agency-muted bg-white px-1 rounded border border-agency-border uppercase">{spec.type}</span>
                    <span className="text-[9px] text-agency-muted font-bold uppercase tracking-widest">{new Date(spec.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className={cn(
                  "text-[9px] px-2 py-0.5 rounded font-bold uppercase",
                  spec.status === 'active' ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600 animate-pulse"
                )}>{spec.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel-card p-6 bg-slate-900 border-slate-800 text-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-agency-accent/20">
            <Key className="w-5 h-5 text-agency-accent" />
          </div>
          <div>
            <h3 className="font-bold font-display">Secrets Vault</h3>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Credential Infrastructure</p>
          </div>
        </div>
        <div className="space-y-3">
          {SECRETS.map((secret) => (
            <div key={secret.id} className="p-3 bg-black/40 rounded-lg border border-white/5 flex items-center justify-between group hover:bg-black/60 transition-colors">
              <div>
                <div className="text-xs font-bold text-slate-300">{secret.name}</div>
                <div className="text-[10px] font-mono text-slate-600">{secret.key}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className={cn(
                  "text-[8px] font-bold uppercase px-1.5 py-0.5 rounded",
                  secret.status === 'secure' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                )}>{secret.status}</span>
                <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={() => onAction('Rotating security keys and updating vault...', 'warning')}
          className="w-full mt-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:bg-white/10 transition-colors"
        >
          Reveal Scoped Key Log
        </button>
      </div>
    </div>
  </div>
);

const OnlineOpsView = ({ 
  onAction,
  segments,
  setSegments,
  workflows,
  setWorkflows,
  templates,
  setTemplates
}: { 
  onAction: (name: string, type?: string) => void,
  segments: EmailSegment[],
  setSegments: React.Dispatch<React.SetStateAction<EmailSegment[]>>,
  workflows: AutomationWorkflow[],
  setWorkflows: React.Dispatch<React.SetStateAction<AutomationWorkflow[]>>,
  templates: EmailTemplate[],
  setTemplates: React.Dispatch<React.SetStateAction<EmailTemplate[]>>
}) => {
  const [isAuditing, setIsAuditing] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);

  // Template Management State
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [templateForm, setTemplateForm] = useState<Partial<EmailTemplate>>({
    name: '',
    category: 'Marketing',
    variants: [{ id: 'v-1', subject: '', body: '', isControl: true }],
    abTestingActive: false,
    placeholders: []
  });

  const [activeVariantTab, setActiveVariantTab] = useState<'A' | 'B'>('A');

  const handleAudit = async () => {
    if (isAuditing) return;
    setIsAuditing(true);
    setAuditProgress(0);
    onAction('Running deep workflow audit across all active nodes...', 'info');

    for (let i = 0; i <= 100; i += 25) {
      setAuditProgress(i);
      await new Promise(r => setTimeout(r, 500));
      if (i === 25) onAction('Verifying SMTP relay health...', 'info');
      if (i === 50) onAction('Analyzing engagement decay on high-value segments...', 'info');
      if (i === 75) onAction('Cross-referencing CRM sync latencies...', 'info');
    }

    setSegments(prev => prev.map(seg => ({
      ...seg,
      engagementScore: Math.min(100, seg.engagementScore + (Math.random() > 0.5 ? 2 : -1))
    })));

    onAction('Workflow audit complete. Engagement data synchronized and healthy.', 'success');
    setIsAuditing(false);
  };

  const handleDeploySequence = async () => {
    if (isDeploying) return;
    setIsDeploying(true);
    onAction('Analyzing grounding requirements for new sequence...', 'info');
    
    await new Promise(r => setTimeout(r, 2000));
    
    const newWorkflow: AutomationWorkflow = {
      id: `flow-${Date.now()}`,
      name: `AI-Nurture: ${new Date().toLocaleDateString()}`,
      trigger: 'Onboarding Event',
      steps: 4,
      activeSubscribers: 0,
      conversionRate: 0,
      status: 'active'
    };

    setWorkflows(prev => [newWorkflow, ...prev]);
    onAction('Generative automation sequence deployed and grounded to active nodes.', 'success');
    setIsDeploying(false);
  };

  const openTemplateModal = (template?: EmailTemplate) => {
    if (template) {
      setEditingTemplate(template);
      setTemplateForm({ ...template });
      setActiveVariantTab('A');
    } else {
      setEditingTemplate(null);
      setTemplateForm({
        name: '',
        category: 'Marketing',
        variants: [{ id: `v-${Date.now()}-1`, subject: '', body: '', isControl: true }],
        abTestingActive: false,
        placeholders: []
      });
      setActiveVariantTab('A');
    }
    setIsTemplateModalOpen(true);
  };

  const saveTemplate = () => {
    if (!templateForm.name || !templateForm.variants?.[0]?.subject) {
      onAction('Template name and primary subject are required.', 'error');
      return;
    }

    // Extract placeholders from all variants
    let combinedText = '';
    templateForm.variants?.forEach(v => {
      combinedText += (v.subject || '') + ' ' + (v.body || '') + ' ';
    });
    
    const foundPlaceholders = Array.from(combinedText.matchAll(/\{\{(.*?)\}\}/g)).map(m => m[1].trim());
    const uniquePlaceholders = Array.from(new Set(foundPlaceholders));

    const finalTemplate: EmailTemplate = {
      id: editingTemplate?.id || `et-${Date.now()}`,
      name: templateForm.name || 'Untitled Template',
      category: templateForm.category || 'Marketing',
      variants: templateForm.variants as EmailVariant[],
      abTestingActive: templateForm.abTestingActive || templateForm.variants!.length > 1,
      placeholders: uniquePlaceholders,
      lastModified: new Date().toISOString()
    };

    if (editingTemplate) {
      setTemplates(prev => prev.map(t => t.id === editingTemplate.id ? finalTemplate : t));
      onAction(`Template "${finalTemplate.name}" updated successfully.`, 'success');
    } else {
      setTemplates(prev => [finalTemplate, ...prev]);
      onAction(`New template "${finalTemplate.name}" created.`, 'success');
    }

    setIsTemplateModalOpen(false);
  };

  const deleteTemplate = (id: string, name: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
    onAction(`Template "${name}" removed.`, 'warning');
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center text-agency-ink">
        <div>
          <h2 className="text-2xl font-bold font-display uppercase tracking-tight">Email & CRM Engine</h2>
          <p className="text-xs text-agency-muted font-bold uppercase tracking-widest mt-1">Omnichannel Automation & Delivery Optimization</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleAudit}
            disabled={isAuditing}
            className={cn(
              "px-4 py-2 bg-white border border-agency-border rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-agency-bg transition-all",
              isAuditing && "opacity-50 cursor-not-allowed"
            )}
          >
            {isAuditing ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-agency-accent" /> : null}
            {isAuditing ? `Auditing ${auditProgress}%` : 'Workflow Audit'}
          </button>
          <button 
            onClick={handleDeploySequence}
            disabled={isDeploying}
            className={cn(
              "px-4 py-2 bg-agency-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-agency-accent/20 transition-all hover:scale-105 active:scale-95",
              isDeploying && "opacity-50 cursor-not-allowed"
            )}
          >
            {isDeploying ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />} 
            {isDeploying ? 'Deploying...' : 'Deploy Sequence'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isAuditing && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-agency-accent/5 border border-agency-accent/20 rounded-xl mb-4">
              <div className="h-1.5 w-full bg-agency-border rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-agency-accent"
                  animate={{ width: `${auditProgress}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Audience Segmentation */}
          <div className="panel-card p-6">
            <h3 className="font-bold text-lg font-display mb-6 flex items-center gap-2">
              <Users2 className="w-5 h-5 text-agency-accent" /> Audience Segmentation & Deliverability
            </h3>
            <div className="space-y-4">
              {segments.map((seg) => (
                <div key={seg.id} className="p-4 bg-agency-bg border border-agency-border rounded-2xl group hover:border-agency-accent transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-xl border border-agency-border flex items-center justify-center font-bold text-agency-muted">
                        {seg.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-agency-ink">{seg.name}</div>
                        <div className="text-[10px] font-bold text-agency-muted uppercase tracking-widest">{seg.count.toLocaleString()} Subscribers</div>
                      </div>
                    </div>
                    <div className="flex gap-4 text-right">
                      <div className="space-y-0.5">
                        <div className="text-[8px] font-black text-agency-muted uppercase">Health</div>
                        <div className="text-xs font-bold text-agency-ink">{seg.engagementScore}%</div>
                      </div>
                      {seg.deliverability && (
                        <div className="space-y-0.5">
                          <div className="text-[8px] font-black text-agency-muted uppercase">Open Rate</div>
                          <div className="text-xs font-bold text-emerald-600">{seg.deliverability.openRate}%</div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {seg.deliverability && (
                    <div className="grid grid-cols-3 gap-3 pt-3 border-t border-agency-border">
                      <div className="p-2 bg-white/50 rounded-lg text-center">
                        <div className="text-[8px] font-black text-agency-muted uppercase">Bounce</div>
                        <div className="text-[10px] font-bold text-red-500">{seg.deliverability.bounceRate}%</div>
                      </div>
                      <div className="p-2 bg-white/50 rounded-lg text-center">
                        <div className="text-[8px] font-black text-agency-muted uppercase">Spam</div>
                        <div className="text-[10px] font-bold text-amber-500">{seg.deliverability.spamReport}%</div>
                      </div>
                      <div className="p-2 bg-blue-50/50 rounded-lg text-center">
                        <div className="text-[8px] font-black text-blue-600 uppercase">Status</div>
                        <div className="text-[10px] font-black text-blue-700 uppercase">{seg.status}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Email Template Manager */}
          <div className="panel-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg font-display flex items-center gap-2">
                <Mail className="w-5 h-5 text-agency-accent" /> Asset Library: Email Templates
              </h3>
              <button 
                onClick={() => openTemplateModal()}
                className="px-3 py-1.5 bg-agency-bg border border-agency-border rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:border-agency-accent transition-colors text-agency-ink"
              >
                <Plus className="w-3.5 h-3.5" /> New Template
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((tpl) => (
                <div key={tpl.id} className="p-4 bg-agency-bg border border-agency-border rounded-2xl group hover:border-agency-accent transition-all relative overflow-hidden flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-2">
                      <div className={cn(
                        "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter",
                        tpl.category === 'Transactional' ? "bg-blue-100 text-blue-700" : 
                        tpl.category === 'Marketing' ? "bg-purple-100 text-purple-700" :
                        "bg-emerald-100 text-emerald-700"
                      )}>
                        {tpl.category}
                      </div>
                      {tpl.abTestingActive && (
                        <div className="px-2 py-0.5 rounded bg-agency-accent/10 text-agency-accent text-[8px] font-black uppercase tracking-tighter flex items-center gap-1 border border-agency-accent/20">
                          <Activity className="w-2.5 h-2.5" /> A/B ACTIVE
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openTemplateModal(tpl)} className="p-1.5 hover:bg-white rounded-lg text-agency-muted hover:text-agency-accent transition-colors">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => deleteTemplate(tpl.id, tpl.name)} className="p-1.5 hover:bg-white rounded-lg text-agency-muted hover:text-red-500 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-agency-ink truncate">{tpl.name}</div>
                  <div className="text-[10px] text-agency-muted mt-1 font-medium truncate italic">{tpl.variants[0].subject}</div>
                  
                  {tpl.abTestingActive && tpl.variants.length > 1 && (
                    <div className="mt-4 p-3 bg-white/50 rounded-xl border border-agency-border/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[9px] font-black text-agency-muted uppercase">Split Performance</span>
                        <BarChart2 className="w-3 h-3 text-agency-accent" />
                      </div>
                      <div className="space-y-2">
                        {tpl.variants.map((v, idx) => {
                          const totalOpens = tpl.variants.reduce((acc, curr) => acc + (curr.metrics?.opens || 0), 0);
                          const reachPercent = totalOpens > 0 ? ((v.metrics?.opens || 0) / totalOpens) * 100 : 0;
                          return (
                            <div key={v.id} className="space-y-1">
                              <div className="flex justify-between text-[8px] font-bold">
                                <span className={idx === 0 ? "text-agency-accent" : "text-purple-600"}>Variant {idx === 0 ? 'A' : 'B'} {v.isControl && '(Control)'}</span>
                                <span className="text-agency-ink">{v.metrics?.conversions} Conv.</span>
                              </div>
                              <div className="h-1 w-full bg-agency-border rounded-full overflow-hidden">
                                <div 
                                  className={cn("h-full transition-all duration-1000", idx === 0 ? "bg-agency-accent" : "bg-purple-500")}
                                  style={{ width: `${reachPercent}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {tpl.placeholders.slice(0, 3).map((p, i) => (
                        <div key={i} title={p} className="w-6 h-6 rounded-full bg-white border border-agency-border flex items-center justify-center text-[8px] font-bold text-agency-accent uppercase">
                          {p.charAt(0)}
                        </div>
                      ))}
                      {tpl.placeholders.length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-agency-accent border border-white flex items-center justify-center text-[8px] font-bold text-white">
                          +{tpl.placeholders.length - 3}
                        </div>
                      )}
                    </div>
                    <div className="text-[8px] font-black text-agency-muted uppercase">Modified {new Date(tpl.lastModified).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Deliverability Heatmap */}
          <div className="panel-card p-6 border-slate-900 bg-slate-900 text-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" /> Reputation Monitor
              </h3>
              <span className="text-[9px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">DOMAIN: EXCELLENT</span>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {[...Array(28)].map((_, i) => (
                <div key={i} className={cn(
                  "h-6 rounded-[4px] transition-all hover:scale-110 cursor-help",
                  i % 7 === 0 ? "bg-red-500/20" : i % 5 === 0 ? "bg-amber-500/40" : "bg-emerald-500/30"
                )} />
              ))}
            </div>
            <p className="text-[10px] text-slate-400 mt-4 leading-relaxed italic">
              Visualizing IP warming latency and provider-side throttling detections (Outlook, Gmail, Yahoo).
            </p>
          </div>

          {/* Workflow Node Manager */}
          <div className="panel-card p-6">
            <h3 className="font-bold font-display uppercase text-sm mb-6 flex items-center gap-2">
              <Workflow className="w-4 h-4 text-agency-accent" /> Active Flows
            </h3>
            <div className="space-y-4">
              {workflows.map((flow) => (
                <div key={flow.id} className="space-y-3 p-4 bg-agency-bg rounded-xl border border-agency-border">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-[11px] font-bold text-agency-ink">{flow.name}</div>
                      <div className="text-[9px] font-bold text-agency-muted uppercase mt-0.5">{flow.trigger}</div>
                    </div>
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      flow.status === 'active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-300'
                    )} />
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-agency-muted font-bold uppercase">{flow.steps} Steps</span>
                    <span className="text-agency-accent font-black tracking-tighter">{flow.conversionRate}% CONV</span>
                  </div>
                  <div className="h-1 w-full bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-agency-accent" style={{ width: `${flow.conversionRate * 3}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => onAction('Compiling new LLM-driven automation sequence...', 'info')}
              className="w-full mt-6 py-3 bg-agency-bg border-2 border-dashed border-agency-border rounded-xl text-[10px] font-bold uppercase tracking-widest text-agency-muted hover:text-agency-accent hover:border-agency-accent transition-all"
            >
              + New Automation Sequence
            </button>
          </div>

          {/* Integration Sync Health */}
          <div className="panel-card p-6 bg-blue-50 border-blue-100">
            <h3 className="text-xs font-black uppercase text-blue-900 mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4" /> Platform Sync
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Klaviyo-API', latency: '42ms', status: 'optimal' },
                { name: 'HubSpot-Webhooks', latency: '128ms', status: 'optimal' },
                { name: 'Mailchimp-Relay', latency: '85ms', status: 'warning' }
              ].map(sync => (
                <div key={sync.name} className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border border-blue-100/50">
                  <div>
                    <div className="text-[10px] font-bold text-blue-900">{sync.name}</div>
                    <div className="text-[8px] font-black text-blue-400 uppercase">{sync.latency} Latency</div>
                  </div>
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    sync.status === 'optimal' ? "bg-emerald-400" : "bg-amber-400"
                  )} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Template Modal */}
      <AnimatePresence>
        {isTemplateModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTemplateModalOpen(false)}
              className="absolute inset-0 bg-agency-ink/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-agency-border flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-agency-border flex justify-between items-center bg-agency-bg/50">
                <div>
                  <h3 className="text-xl font-bold font-display uppercase tracking-tight text-agency-ink">
                    {editingTemplate ? 'Edit Email Template' : 'Design New Template'}
                  </h3>
                  <p className="text-[10px] text-agency-muted font-bold uppercase tracking-widest mt-1">Grounding logic & dynamic placeholder mapping</p>
                </div>
                <button 
                  onClick={() => setIsTemplateModalOpen(false)}
                  className="p-2 hover:bg-white rounded-full text-agency-muted transition-colors border border-transparent hover:border-agency-border"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto text-agency-ink">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-agency-muted">Template Name</label>
                    <input 
                      type="text" 
                      value={templateForm.name}
                      onChange={(e) => setTemplateForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-agency-bg border border-agency-border rounded-xl text-sm font-medium focus:ring-2 focus:ring-agency-accent/20 outline-none transition-all"
                      placeholder="e.g. Welcome Series: Day 1"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-agency-muted">Category</label>
                    <select 
                      value={templateForm.category}
                      onChange={(e) => setTemplateForm(prev => ({ ...prev, category: e.target.value as any }))}
                      className="w-full px-4 py-2.5 bg-agency-bg border border-agency-border rounded-xl text-sm font-medium focus:ring-2 focus:ring-agency-accent/20 outline-none transition-all"
                    >
                      <option value="Marketing">Marketing</option>
                      <option value="Transactional">Transactional</option>
                      <option value="Personalized">Personalized</option>
                    </select>
                  </div>
                </div>

                {/* A/B Test Toggle */}
                <div className="flex items-center justify-between p-4 bg-agency-bg rounded-2xl border border-agency-border">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-lg",
                      templateForm.abTestingActive ? "bg-agency-accent/10 text-agency-accent" : "bg-agency-muted/10 text-agency-muted"
                    )}>
                      <TestTube2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-agency-ink uppercase">Subject Line A/B Test</div>
                      <div className="text-[9px] font-medium text-agency-muted">Simultaneously test two variations of subject or body</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const isActive = !templateForm.abTestingActive;
                      let newVariants = [...(templateForm.variants || [])];
                      if (isActive && newVariants.length === 1) {
                        newVariants.push({
                          id: `v-${Date.now()}-2`,
                          subject: newVariants[0].subject,
                          body: newVariants[0].body,
                          isControl: false,
                          metrics: { opens: 0, clicks: 0, conversions: 0 }
                        });
                      }
                      setTemplateForm(prev => ({ ...prev, abTestingActive: isActive, variants: newVariants }));
                      if (isActive) setActiveVariantTab('B');
                      else setActiveVariantTab('A');
                    }}
                    className={cn(
                      "w-10 h-5 rounded-full relative transition-all duration-300",
                      templateForm.abTestingActive ? "bg-agency-accent" : "bg-agency-border"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300",
                      templateForm.abTestingActive ? "right-1" : "left-1"
                    )} />
                  </button>
                </div>

                {/* Variant Tabs */}
                {templateForm.abTestingActive && (
                  <div className="flex gap-1 p-1 bg-agency-bg border border-agency-border rounded-xl">
                    <button 
                      onClick={() => setActiveVariantTab('A')}
                      className={cn(
                        "flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all",
                        activeVariantTab === 'A' ? "bg-white text-agency-ink shadow-sm" : "text-agency-muted hover:text-agency-ink"
                      )}
                    >
                      Variant A (Control)
                    </button>
                    <button 
                      onClick={() => setActiveVariantTab('B')}
                      className={cn(
                        "flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all",
                        activeVariantTab === 'B' ? "bg-white text-agency-ink shadow-sm" : "text-agency-muted hover:text-agency-ink"
                      )}
                    >
                      Variant B (Test)
                    </button>
                  </div>
                )}

                <div className="space-y-4">
                  {templateForm.variants?.map((variant, vIdx) => {
                    const isVisible = (!templateForm.abTestingActive && vIdx === 0) || 
                                     (templateForm.abTestingActive && ((activeVariantTab === 'A' && vIdx === 0) || (activeVariantTab === 'B' && vIdx === 1)));
                    
                    if (!isVisible) return null;

                    return (
                      <motion.div 
                        key={variant.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-agency-muted">Subject Line</label>
                          <input 
                            type="text" 
                            value={variant.subject}
                            onChange={(e) => {
                              const newVariants = [...templateForm.variants!];
                              newVariants[vIdx].subject = e.target.value;
                              setTemplateForm(prev => ({ ...prev, variants: newVariants }));
                            }}
                            className="w-full px-4 py-2.5 bg-agency-bg border border-agency-border rounded-xl text-sm font-medium focus:ring-2 focus:ring-agency-accent/20 outline-none transition-all font-display"
                            placeholder="Subject line with {{placeholders}}..."
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <label className="text-[10px] font-black uppercase text-agency-muted">Email Body (Markdown supported)</label>
                            <span className="text-[9px] font-bold text-agency-accent uppercase">Placeholders detected automatically</span>
                          </div>
                          <textarea 
                            value={variant.body}
                            onChange={(e) => {
                              const newVariants = [...templateForm.variants!];
                              newVariants[vIdx].body = e.target.value;
                              setTemplateForm(prev => ({ ...prev, variants: newVariants }));
                            }}
                            rows={8}
                            className="w-full px-4 py-3 bg-agency-bg border border-agency-border rounded-xl text-sm font-medium focus:ring-2 focus:ring-agency-accent/20 outline-none transition-all resize-none font-mono"
                            placeholder="Hi {{first_name}}, Welcome to {{brand_name}}..."
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div className="text-[10px] font-bold text-blue-900 leading-tight">
                      Placeholders: {templateForm.placeholders?.length || 0} detected. Automated grounding and persona mapping will be applied.
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-agency-border bg-agency-bg/50 flex gap-3">
                <button 
                  onClick={() => setIsTemplateModalOpen(false)}
                  className="flex-1 py-3 bg-white border border-agency-border rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/80 transition-all text-agency-ink"
                >
                  Cancel
                </button>
                <button 
                  onClick={saveTemplate}
                  className="flex-[2] py-3 bg-agency-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-agency-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  {editingTemplate ? 'Update Asset' : 'Deploy Template Asset'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SEOEngineView = ({ 
  onAction,
  crawlData,
  setCrawlData,
  setDeliverables
}: { 
  onAction: (name: string, type?: string) => void,
  crawlData: SEOCrawlReport[],
  setCrawlData: React.Dispatch<React.SetStateAction<SEOCrawlReport[]>>,
  setDeliverables: React.Dispatch<React.SetStateAction<Deliverable[]>>
}) => {
  const [isAuditing, setIsAuditing] = useState(false);
  const [isCrawling, setIsCrawling] = useState(false);
  const [crawlProgress, setCrawlProgress] = useState(0);

  const handleCrawl = async () => {
    if (isCrawling) return;
    setIsCrawling(true);
    setCrawlProgress(0);
    onAction('Initializing headless crawler on root domain...', 'info');

    // Simulate crawl progress
    for (let i = 0; i <= 100; i += 20) {
      setCrawlProgress(i);
      await new Promise(r => setTimeout(r, 600));
      if (i === 40) onAction('Parsing DOM and extracting metadata...', 'info');
      if (i === 80) onAction('Evaluating Core Web Vitals and Schema integrity...', 'info');
    }

    const newPages = [
      { id: `cr-new-${Date.now()}-1`, url: '/blog/ai-future', status: 200, loadTime: 0.9, coreWebVitals: { lcp: 1.1, cls: 0.02, inp: 95 }, schemaValid: true, indexed: true },
      { id: `cr-new-${Date.now()}-2`, url: '/services/automation', status: 200, loadTime: 1.2, coreWebVitals: { lcp: 1.8, cls: 0.08, inp: 150 }, schemaValid: true, indexed: true }
    ] as SEOCrawlReport[];

    setCrawlData(prev => [...newPages, ...prev]);
    onAction('Domain crawl complete. Index updated with new technical insights.', 'success');
    setIsCrawling(false);
  };

  const handleGenerateAudit = async () => {
    if (isAuditing) return;
    setIsAuditing(true);
    onAction('Compiling multidimensional SEO audit data...', 'info');
    
    await new Promise(r => setTimeout(r, 2500));
    
    const newAudit: Deliverable = {
      id: `d-audit-${Date.now()}`,
      name: `AOS-Technical-Audit-${new Date().toLocaleDateString()}`,
      type: 'Audit',
      status: 'INTERNAL_QA',
      version: 'v1.0',
      assignedAgent: 'SEO Specialist Agent',
      lastUpdated: new Date().toISOString(),
      clientId: 'c1',
      complianceScore: 94,
      flags: ['Detailed Insights', 'Actionable Roadmap']
    };

    setDeliverables(prev => [newAudit, ...prev]);
    onAction('Branded SEO Audit successfully generated and pushed to Approvals queue.', 'success');
    setIsAuditing(false);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold font-display uppercase tracking-tight text-agency-ink">SEO Orchestrator</h2>
          <p className="text-xs text-agency-muted font-bold uppercase tracking-widest mt-1">Autonomous Crawling & Authority Mapping (v4.2)</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleCrawl}
            disabled={isCrawling}
            className={cn(
              "px-4 py-2 bg-white border border-agency-border rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-agency-bg transition-all",
              isCrawling && "opacity-50 cursor-not-allowed"
            )}
          >
            {isCrawling ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Bug className="w-3.5 h-3.5" />} 
            {isCrawling ? `Crawling ${crawlProgress}%` : 'Crawl Domain'}
          </button>
          <button 
            onClick={handleGenerateAudit}
            disabled={isAuditing}
            className={cn(
              "px-4 py-2 bg-agency-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-agency-accent/20 transition-all hover:scale-105 active:scale-95",
              isAuditing && "opacity-50 cursor-not-allowed"
            )}
          >
            {isAuditing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />} 
            {isAuditing ? 'Generating Audit...' : 'Generate Branded Audit'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isCrawling && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-agency-accent/5 border border-agency-accent/20 rounded-xl mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black uppercase text-agency-accent">Live Crawl Progress</span>
                <span className="text-[10px] font-mono font-bold text-agency-accent">{crawlProgress}%</span>
              </div>
              <div className="h-1.5 w-full bg-agency-border rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-agency-accent"
                  animate={{ width: `${crawlProgress}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    {/* Section 1: Technical Pulse & Crawl Stats */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="panel-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg font-display">Proprietary Scoring Algorithm</h3>
            <button className="text-[10px] font-black uppercase text-agency-accent tracking-tighter hover:underline">Edit Logic (v2.1)</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Technical Health', weight: 40, color: 'bg-blue-500' },
              { label: 'Semantic Authority', weight: 35, color: 'bg-emerald-500' },
              { label: 'Link Equity', weight: 25, color: 'bg-amber-500' }
            ].map(w => (
              <div key={w.label} className="p-4 bg-agency-bg rounded-xl border border-agency-border">
                <div className="text-[9px] font-black uppercase text-agency-muted mb-2">{w.label}</div>
                <div className="text-xl font-bold mb-2">{w.weight}%</div>
                <div className="h-1.5 w-full bg-white rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
                  <div className={cn("h-full", w.color)} style={{ width: `${w.weight}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg font-display">Technical Crawl Log</h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold uppercase">
              <CheckCircle2 className="w-3 h-3" /> Core Web Vitals Pass
            </div>
          </div>
          <div className="space-y-4">
            {crawlData.map((crawl) => (
              <div key={crawl.id} className="p-4 bg-agency-bg rounded-xl border border-agency-border flex items-center justify-between group hover:border-agency-accent transition-all">
                <div className="flex items-center gap-4 min-w-0">
                  <div className={cn(
                    "p-2 rounded-lg border",
                    crawl.status === 200 ? "bg-white border-agency-border" : "bg-red-50 border-red-100"
                  )}>
                    {crawl.status === 200 ? <Globe className="w-4 h-4 text-agency-accent" /> : <XCircle className="w-4 h-4 text-red-500" />}
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-bold text-agency-ink truncate">{crawl.url}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-mono text-agency-muted">{crawl.status} OK</span>
                      <div className="h-2 w-px bg-agency-border" />
                      <span className="text-[9px] font-bold text-agency-muted uppercase">{crawl.loadTime}s Render</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <div className="text-[9px] font-bold text-agency-muted uppercase">LCP</div>
                    <div className={cn("text-xs font-bold", crawl.coreWebVitals.lcp > 2.5 ? "text-amber-500" : "text-emerald-500")}>
                      {crawl.coreWebVitals.lcp}s
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={cn("w-1.5 h-1.5 rounded-full", crawl.schemaValid ? "bg-emerald-500" : "bg-red-500")} title="Schema Status" />
                    <div className={cn("w-1.5 h-1.5 rounded-full", crawl.indexed ? "bg-blue-500" : "bg-red-500")} title="Index Status" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="panel-card p-6 border-agency-accent/20 bg-agency-panel">
          <h3 className="font-bold font-display mb-4">Authority Score</h3>
          <div className="flex flex-col items-center py-4">
            <div className="relative flex items-center justify-center">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="58" className="stroke-white fill-none" strokeWidth="8" />
                <circle cx="64" cy="64" r="58" className="stroke-agency-accent fill-none transition-all duration-1000" strokeWidth="8" strokeDasharray={364} strokeDashoffset={364 - (364 * BACKLINK_STATS.authorityScore) / 100} strokeLinecap="round" />
              </svg>
              <div className="absolute text-3xl font-black font-display text-agency-ink">{BACKLINK_STATS.authorityScore}</div>
            </div>
            <p className="text-[10px] font-bold text-agency-muted uppercase tracking-widest mt-4">Domain Rating (AOS)</p>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-agency-border">
            <div className="text-center">
              <div className="text-xs font-bold">{BACKLINK_STATS.totalLinks.toLocaleString()}</div>
              <div className="text-[8px] font-bold text-agency-muted uppercase mt-0.5">Backlinks</div>
            </div>
            <div className="text-center border-l border-agency-border">
              <div className="text-xs font-bold text-red-500">{BACKLINK_STATS.toxicLinks}</div>
              <div className="text-[8px] font-bold text-agency-muted uppercase mt-0.5">Toxic</div>
            </div>
          </div>
        </div>

        <div className="panel-card p-6">
          <h3 className="font-bold font-display mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-agency-accent" /> Local Presence
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs text-agency-muted font-bold uppercase tracking-widest">GBP Status</span>
              <span className="text-[10px] font-bold text-emerald-600 uppercase bg-emerald-50 px-1.5 py-0.5 rounded">{LOCAL_SEO.gbpStatus}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-agency-muted font-bold uppercase tracking-widest">Maps Rank</span>
              <span className="text-sm font-bold text-agency-ink">#{LOCAL_SEO.mapsRank} in City Core</span>
            </div>
            <div className="pt-2">
              <div className="flex justify-between text-[10px] font-bold text-agency-muted uppercase mb-1.5">
                <span>Sentiment</span>
                <span>{(LOCAL_SEO.reviewSentiment * 100).toFixed(0)}% Positive</span>
              </div>
              <div className="h-1.5 w-full bg-agency-bg rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${LOCAL_SEO.reviewSentiment * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Section 2: Rank Intelligence */}
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 panel-card p-6">
        <h3 className="font-bold text-lg font-display mb-6">SERP Rank Intelligence</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {KEYWORD_RANKS.map((kw) => (
            <div key={kw.id} className="p-4 bg-agency-bg rounded-xl border border-agency-border space-y-4 hover:border-agency-accent transition-colors">
              <div className="flex justify-between items-start">
                <div className="text-sm font-bold text-agency-ink line-clamp-1">{kw.keyword}</div>
                <div className={cn(
                  "text-[10px] font-bold flex items-center gap-0.5",
                  kw.change > 0 ? "text-emerald-500" : kw.change < 0 ? "text-red-500" : "text-agency-muted"
                )}>
                  {kw.change > 0 ? <ChevronUp className="w-3 h-3" /> : kw.change < 0 ? <ChevronDown className="w-3 h-3" /> : null}
                  {Math.abs(kw.change)}
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-black font-display">#{kw.rank}</div>
                  <div className="text-[9px] font-bold text-agency-muted uppercase tracking-widest">Global Rank</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono font-bold text-agency-accent mb-1">{kw.volume.toLocaleString()} VOL/mo</div>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {kw.serpFeatures.map(f => (
                      <span key={f} className="text-[7px] font-bold px-1 py-0.5 bg-white border border-agency-border rounded uppercase">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel-card p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Network className="w-4 h-4 text-agency-accent" />
            <h3 className="font-bold text-sm font-display uppercase tracking-tight">Competitor Gap</h3>
          </div>
          <p className="text-[10px] text-agency-muted leading-relaxed mb-6 font-bold uppercase tracking-widest">
            AOS detected 1.5k unlinked high-authority leads owned by competitors.
          </p>
        </div>
        <div className="space-y-3">
          <button 
            onClick={() => onAction('Identifying high-authority reclamation leads...', 'info')}
            className="w-full py-2 bg-agency-ink text-white rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-agency-ink/90 transition-colors"
          >
            Start Reclamation
          </button>
          <button 
            onClick={() => onAction('Injecting toxic link disavow protocol...', 'warning')}
            className="w-full py-2 border border-agency-border rounded-lg text-[9px] font-bold uppercase tracking-widest text-agency-muted hover:bg-agency-bg transition-colors"
          >
            Disavow Toxic (12)
          </button>
        </div>
      </div>
    </div>

    {/* Section 3: Traffic Forecasting */}
    <div className="panel-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg font-display uppercase tracking-tight">Traffic Impact Forecast</h3>
        <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-agency-accent" /> Current
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500" /> Optimized
          </div>
        </div>
      </div>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={DATA_ANALYTICS.slice(0, 7).map((d, i) => ({ 
            ...d, 
            projected: Math.floor(d.value * (1.2 + i * 0.05)) 
          }))}>
            <defs>
              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              labelStyle={{ fontWeight: 'bold', fontSize: '10px', color: '#64748b' }}
            />
            <Area type="monotone" dataKey="value" stroke="#4F46E5" fillOpacity={1} fill="url(#colorVisits)" strokeWidth={2} />
            <Area type="monotone" dataKey="projected" stroke="#10B981" fillOpacity={1} fill="url(#colorProjected)" strokeWidth={2} strokeDasharray="5 5" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between items-center mt-6 p-4 bg-agency-bg rounded-xl border border-agency-border">
        <div>
          <div className="text-[9px] font-bold text-agency-muted uppercase tracking-widest">Est. Revenue Lift</div>
          <div className="text-xl font-bold text-emerald-600">+$24,500 <span className="text-xs">/mo</span></div>
        </div>
        <div className="text-right">
          <div className="text-[9px] font-bold text-agency-muted uppercase tracking-widest">Confidence Interval</div>
          <div className="text-xs font-bold text-agency-ink">88% (ML-Verified)</div>
        </div>
      </div>
    </div>
  </div>
  );
};

const GoogleAdsView = ({ onAction }: { onAction: (name: string, type?: string) => void }) => (
  <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold font-display uppercase tracking-tight text-agency-ink">Google Ads Engine</h2>
        <p className="text-xs text-agency-muted font-bold uppercase tracking-widest mt-1">MCC HIERARCHY SUPPORT • SMART BIDDING V2</p>
      </div>
      <div className="flex gap-2">
        <select className="bg-white border border-agency-border rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest outline-none focus:border-agency-accent">
          <option>Data-Driven Attribution</option>
          <option>Last Click (Legacy)</option>
          <option>Linear Distribution</option>
        </select>
        <button 
          onClick={() => onAction('Pushing cross-account bid adjustments...', 'success')}
          className="px-4 py-2 bg-agency-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-agency-accent/20 transition-all active:scale-95"
        >
          <ShieldCheckIcon className="w-3.5 h-3.5" /> Optimize Portfolio
        </button>
      </div>
    </div>

    {/* Section 1: MCC Structure & Portfolio Performance */}
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1 panel-card p-6">
        <h3 className="font-bold text-[10px] uppercase text-agency-muted tracking-widest mb-6">MCC Account Structure</h3>
        <div className="space-y-3">
          <div className="p-3 bg-agency-accent text-white rounded-xl text-[11px] font-bold shadow-lg shadow-agency-accent/20">
            Manager: {DEFAULT_BRANDING.agencyName}
          </div>
          <div className="ml-4 space-y-3 border-l-2 border-agency-border pl-4">
            {[
              { name: 'Core Retail (CID: 421)', status: 'Active' },
              { name: 'SaaS Cluster (CID: 981)', status: 'Active' },
              { name: 'Legal Services (CID: 104)', status: 'Paused' }
            ].map(acc => (
              <div key={acc.name} className="flex items-center justify-between p-2 bg-agency-bg rounded-lg border border-agency-border group hover:border-agency-accent transition-colors cursor-pointer">
                <span className="text-[10px] font-bold text-agency-ink">{acc.name}</span>
                <div className={cn("w-1.5 h-1.5 rounded-full", acc.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500')} />
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 bg-white border border-agency-border rounded-lg text-[9px] font-black uppercase tracking-widest text-agency-muted hover:bg-agency-bg">Attach Client CID</button>
        </div>
      </div>

      <div className="lg:col-span-3 panel-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg font-display">Active Search & PMax Shards</h3>
          <div className="flex gap-4">
            <div className="text-right">
              <div className="text-[9px] font-bold uppercase text-agency-muted">Bid Simulation</div>
              <div className="text-xs font-bold text-agency-accent">Ready</div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {GOOGLE_ADS_CAMPAIGNS.map((c) => (
            <div key={c.id} className="p-4 bg-agency-bg rounded-xl border border-agency-border flex items-center justify-between group hover:border-agency-accent transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-white rounded-xl border border-agency-border">
                  <Target className="w-5 h-5 text-agency-accent" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-agency-ink">{c.name}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-bold uppercase tracking-widest">{c.type}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1 bg-white rounded-full overflow-hidden">
                        <div className="h-full bg-agency-accent" style={{ width: `${c.budget.pacing}%` }} />
                      </div>
                      <span className="text-[9px] font-bold text-agency-muted uppercase">{c.budget.pacing}% PACING</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right hidden sm:block">
                  <div className="text-[9px] font-bold text-agency-muted uppercase">Conversions</div>
                  <div className="text-sm font-bold text-agency-ink">{c.metrics.conversions.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-bold text-agency-muted uppercase">ROAS</div>
                  <div className="text-sm font-bold text-emerald-600">{c.metrics.roas}x</div>
                </div>
                <div className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-4 h-4 text-agency-muted" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SocialMediaView = ({ onAction }: { onAction: (name: string, type?: string) => void }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const handleSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncProgress(0);
    onAction('Initializing product catalog sync with Meta Commerce...', 'info');

    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          onAction('Catalog sync completed. 1,284 products verified.', 'success');
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 300);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold font-display uppercase tracking-tight text-agency-ink">Social Ops</h2>
          <p className="text-xs text-agency-muted font-bold uppercase tracking-widest mt-1">META MARKETING API INTEGRATION (v19.0)</p>
        </div>
        <div className="flex gap-2">
          <div className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-bold uppercase border",
            META_PIXEL.status === 'active' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-red-50 border-red-100 text-red-600'
          )}>
            <Activity className="w-3.5 h-3.5" /> Pixel: {META_PIXEL.status}
          </div>
          <button 
            disabled={isSyncing}
            onClick={handleSync}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg transition-all relative overflow-hidden",
              isSyncing ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-agency-accent text-white hover:scale-105 active:scale-95 shadow-agency-accent/20"
            )}
          >
            {isSyncing && (
              <motion.div 
                className="absolute left-0 top-0 h-full bg-white/20 transition-all duration-300"
                style={{ width: `${syncProgress}%` }}
              />
            )}
            <RefreshCw className={cn("w-3.5 h-3.5", isSyncing && "animate-spin")} /> 
            {isSyncing ? `Syncing ${syncProgress}%` : 'Sync Catalog'}
          </button>
        </div>
      </div>

    {/* Section 1: Campaign Pulse & Tracking Health */}
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 panel-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg font-display">Meta Campaign Manager</h3>
          <div className="flex gap-4">
            <div className="text-right">
              <div className="text-[9px] font-bold uppercase text-agency-muted">Match Quality</div>
              <div className="text-sm font-bold text-agency-accent">{META_PIXEL.matchQuality}/10</div>
            </div>
            <div className="text-right">
              <div className="text-[9px] font-bold uppercase text-agency-muted">CAPI Status</div>
              <div className="text-sm font-bold text-emerald-600 uppercase">{META_PIXEL.capiStatus}</div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {META_CAMPAIGNS.map((c) => (
            <div key={c.id} className="p-4 bg-agency-bg rounded-xl border border-agency-border flex items-center justify-between group hover:border-agency-accent transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-white rounded-xl border border-agency-border group-hover:bg-agency-accent/10 transition-colors">
                  <MetaIcon className="w-5 h-5 text-agency-accent" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-agency-ink">{c.name}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-bold uppercase tracking-widest">{c.objective}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-agency-muted uppercase">
                      <span className="px-1 py-0.5 bg-white rounded border border-agency-border">{c.budget.type}</span>
                      <span>${c.budget.amount.toLocaleString()}</span>
                    </div>
                    <div className="h-2 w-px bg-agency-border" />
                    <span className="text-[10px] font-bold text-agency-ink">${c.performance.spend.toLocaleString()} SPENT</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right hidden sm:block">
                  <div className="text-[9px] font-bold text-agency-muted uppercase">CTR</div>
                  <div className="text-sm font-bold text-agency-ink">{c.performance.ctr}%</div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-bold text-agency-muted uppercase">ROAS</div>
                  <div className="text-sm font-bold text-emerald-600">{c.performance.roas || '--'}x</div>
                </div>
                <div className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-4 h-4 text-agency-muted" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="panel-card p-6 border-agency-accent/20 bg-agency-panel">
          <h3 className="font-bold font-display mb-4">Audience Engine</h3>
          <div className="space-y-4">
            {META_AUDIENCES.map((aud) => (
              <div key={aud.id} className="p-3 bg-white rounded-lg border border-agency-border space-y-2">
                <div className="flex justify-between items-start">
                  <div className="text-[10px] font-bold text-agency-ink uppercase truncate pr-2">{aud.name}</div>
                  <span className="text-[8px] font-bold px-1 py-0.5 bg-blue-50 text-blue-600 rounded">{aud.type}</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold font-display">{aud.size}</span>
                  <div className="text-right">
                    <div className="text-[8px] font-bold text-emerald-600">{aud.matchRate}% MATCH</div>
                    <div className="text-[7px] text-agency-muted uppercase">Synced {new Date(aud.lastSynced).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => onAction('Modeling high-intent lookalike audiences...', 'success')}
            className="w-full mt-4 py-2 bg-agency-ink text-white rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-agency-ink/90 transition-colors"
          >
            Generate Lookalike
          </button>

          <div className="mt-6 pt-6 border-t border-agency-border">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-3.5 h-3.5 text-agency-accent" />
              <span className="text-[10px] font-black uppercase text-agency-ink tracking-tight">Autonomous Expansion</span>
            </div>
            <div className="p-3 bg-agency-bg rounded-lg border border-dashed border-agency-border">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-agency-ink">Purchase Lookalike 3%</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div className={cn("w-1 h-1 rounded-full", autoRefresh ? "bg-emerald-500 animate-pulse" : "bg-agency-muted")} />
                    <span className={cn("text-[8px] font-black uppercase tracking-tight", autoRefresh ? "text-emerald-500" : "text-agency-muted")}>
                      {autoRefresh ? "Auto-Refresh Active" : "Refresh Paused"}
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      setAutoRefresh(!autoRefresh);
                      onAction(`${autoRefresh ? 'Disabling' : 'Enabling'} automatic refresh for Purchase Lookalike 3%...`, 'info');
                    }}
                    className={cn(
                      "w-6 h-3 rounded-full relative transition-colors duration-200",
                      autoRefresh ? "bg-emerald-500" : "bg-agency-muted"
                    )}
                  >
                    <div className={cn(
                      "absolute top-0.5 w-2 h-2 rounded-full bg-white transition-all duration-200",
                      autoRefresh ? "left-[15px]" : "left-[3px]"
                    )} />
                  </button>
                </div>
              </div>
              <p className="text-[9px] text-agency-muted mb-3 italic">Derived from: Purchase Lookalike 1%</p>
              <div className="flex items-center justify-between">
                <div className="px-2 py-0.5 bg-white rounded border border-agency-border text-[8px] font-bold text-agency-muted uppercase">
                  Similarity: 3%
                </div>
                <button 
                  onClick={() => onAction('Recalibrating 3% lookalike audience from latest 1% seed population...', 'info')}
                  className="text-[8px] font-black uppercase text-agency-accent hover:opacity-70 transition-opacity"
                >
                  Force Sync
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="panel-card p-6">
          <h3 className="font-bold font-display mb-4">Event Velocity</h3>
          <div className="space-y-4">
            <div className="flex items-end justify-between gap-1 h-12">
              {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                <div key={i} className="flex-1 bg-agency-accent/20 rounded-t-sm relative group">
                  <div className="absolute bottom-0 w-full bg-agency-accent rounded-t-sm group-hover:bg-agency-ink transition-colors" style={{ height: `${h}%` }} />
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-[10px] font-bold uppercase">
              <span className="text-agency-muted">Last 24h</span>
              <span className="text-agency-ink">{(META_PIXEL.eventsLast24h / 1000).toFixed(1)}k Segments</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Section 2: Creative Fatigue & Asset Library */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="panel-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <Eye className="w-4 h-4 text-agency-accent" />
          <h3 className="font-bold text-md font-display uppercase tracking-tight">Fatigue Monitor</h3>
        </div>
        <div className="space-y-4">
          {META_CREATIVES.map((creative) => (
            <div key={creative.id} className="p-4 bg-agency-bg rounded-xl border border-agency-border">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-xs font-bold text-agency-ink">{creative.name}</div>
                  <div className="text-[9px] text-agency-muted font-medium uppercase">{creative.type} • Freq: {creative.frequency}x</div>
                </div>
                <span className={cn(
                  "text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest",
                  creative.status === 'optimal' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600 animate-pulse'
                )}>{creative.status.replace('_', ' ')}</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest">
                  <span className="text-agency-muted">Fatigue Score</span>
                  <span className={cn(creative.fatigueScore > 70 ? 'text-red-500' : 'text-agency-ink')}>{creative.fatigueScore}%</span>
                </div>
                <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
                  <div className={cn(
                    "h-full transition-all duration-500",
                    creative.fatigueScore > 70 ? 'bg-red-500' : 'bg-agency-accent'
                  )} style={{ width: `${creative.fatigueScore}%` }} />
                </div>
                <div className={cn(
                  "text-[9px] font-bold uppercase text-right",
                  creative.ctrShift < 0 ? 'text-red-500' : 'text-emerald-500'
                )}>
                  CTR Shift: {creative.ctrShift}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 panel-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg font-display">A2A Auto-Rules Engine</h3>
          <button 
            onClick={() => onAction('Opening rule logic editor...', 'info')}
            className="text-[10px] font-bold text-agency-accent uppercase tracking-widest hover:underline"
          >
            Edit logic
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { 
              name: 'Creative Refresh Prot.', 
              desc: 'If freq > 3.5 and CTR < 0.8% for 48h, pause and alert creative agent.', 
              icon: HistoryIcon, 
              status: 'Active',
              color: 'text-emerald-500'
            },
            { 
              name: 'Budget Surge Guard', 
              desc: 'Scale daily budget by 15% if ROAS > 4.5x with consistent volume.', 
              icon: Zap, 
              status: 'Active',
              color: 'text-emerald-500'
            },
            { 
              name: 'Daypart Optimization', 
              desc: 'Pause awareness flights between 02:00-06:00 to optimize CPM.', 
              icon: Clock, 
              status: 'Pending',
              color: 'text-agency-muted'
            },
            { 
              name: 'Conversion Anomaly', 
              desc: 'Pause campaigns if conversion velocity drops > 80% vs 7d average.', 
              icon: Shield, 
              status: 'Active',
              color: 'text-red-500'
            }
          ].map((rule) => (
            <div key={rule.name} className="p-4 bg-agency-bg rounded-xl border border-agency-border flex items-start gap-4 h-full">
              <div className="p-2 bg-white rounded-lg border border-agency-border mt-1">
                <rule.icon className="w-4 h-4 text-agency-accent" />
              </div>
              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  <h4 className="text-xs font-bold text-agency-ink mb-1">{rule.name}</h4>
                  <p className="text-[10px] text-agency-muted leading-relaxed line-clamp-2">{rule.desc}</p>
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-agency-border/50">
                  <span className={cn("text-[9px] font-bold uppercase", rule.color)}>{rule.status}</span>
                  <button className="text-agency-muted hover:text-agency-accent">
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
};

const PillarView = ({ pillar, onAction }: { pillar: Pillar, onAction: (name: string, type?: string) => void }) => {
  const filteredCampaigns = CAMPAIGNS.filter(c => c.pillar === pillar);
  
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold font-display uppercase tracking-tight">{pillar.replace('-', ' ')} Pillar</h2>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-[10px] text-agency-muted font-bold uppercase tracking-widest">Autonomous Strategy Coordination</p>
            <div className="h-3 w-px bg-agency-border mx-1" />
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 border border-blue-100 rounded text-[9px] font-bold text-blue-600 uppercase">
              <Globe className="w-2.5 h-2.5" /> Search Grounded
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onAction('Filtering operation nodes...', 'info')}
            className="px-4 py-2 bg-white border border-agency-border rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-agency-bg transition-colors"
          >
            <Filter className="w-3.5 h-3.5" /> Filter Ops
          </button>
          <button 
            onClick={() => onAction('Launching new strategy shard...', 'success')}
            className="px-4 py-2 bg-agency-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:shadow-lg hover:shadow-agency-accent/20 transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> New Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map((c) => (
          <div key={c.id} className="panel-card p-6 flex flex-col gap-4 group cursor-pointer hover:border-agency-accent hover:translate-y-[-4px] transition-all">
            <div className="flex justify-between items-start">
              <div className="px-2 py-1 rounded bg-agency-bg text-[9px] font-bold uppercase tracking-widest text-agency-muted">{c.platform}</div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-emerald-600 uppercase">Live</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg group-hover:text-agency-accent transition-colors leading-tight mb-1">{c.name}</h4>
              <p className="text-[10px] text-agency-muted uppercase font-bold tracking-widest">A2A Controlled Strategy</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="space-y-1">
                <div className="text-[9px] uppercase font-bold text-agency-muted tracking-widest">Spend Velocity</div>
                <div className="text-lg font-bold font-display">{formatCurrency(c.spend)}</div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-[9px] uppercase font-bold text-agency-muted tracking-widest">Target ROAS</div>
                <div className="text-lg font-bold font-display text-agency-accent">{c.roas}x</div>
              </div>
            </div>

            <div className="space-y-2 mt-2">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                <span className="text-agency-muted">Node Convergence</span>
                <span className="text-agency-ink">{c.progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-agency-bg rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${c.progress}%` }}
                  className="h-full bg-agency-accent" 
                />
              </div>
            </div>

            <div className="pt-4 border-t border-agency-border mt-auto flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-agency-bg flex items-center justify-center overflow-hidden text-[6px] font-black uppercase text-agency-muted">
                    {/* Placeholder for avatars */}
                  </div>
                ))}
              </div>
              <button 
                onClick={() => onAction(`Initiating trace for ${c.name}...`, 'info')}
                className="text-[10px] font-bold text-agency-muted hover:text-agency-accent uppercase tracking-widest flex items-center gap-1"
              >
                View Trace <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const VibeCodingBar = ({ onAction }: { onAction: (name: string, type?: string) => void }) => {
  const [query, setQuery] = useState('');
  
  return (
    <div className="bg-agency-panel border border-agency-accent/30 rounded-2xl p-1 shadow-lg shadow-agency-accent/10 flex items-center gap-2 group transition-all hover:border-agency-accent">
      <div className="p-3">
        <Sparkles className="w-5 h-5 text-agency-accent animate-pulse" />
      </div>
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Build a lead scoring dashboard... or Generate a multi-platform campaign for 'Urban Gear'" 
        className="flex-1 bg-transparent border-none text-sm placeholder:text-agency-muted focus:ring-0"
      />
      <button 
        onClick={() => {
          if (!query.trim()) return;
          onAction(`Executing specification: "${query}"`, 'success');
          setQuery('');
        }}
        className="px-5 py-2.5 bg-agency-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-transform active:scale-95"
      >
        <Command className="w-3 h-3" />
        Execute Spec
      </button>
    </div>
  );
};

const DebugConsole = ({ logs }: { logs: SystemLog[] }) => (
  <div className="bg-black rounded-xl border border-white/10 overflow-hidden flex flex-col h-[400px]">
    <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/10">
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">A2A_DEBUG_TRACE_v1.0</span>
      </div>
      <div className="text-[10px] font-mono text-emerald-500">SESSION_ACTIVE: {logs.length} EVENTS</div>
    </div>
    <div className="flex-1 overflow-y-auto p-4 font-mono text-[11px] space-y-2 selection:bg-agency-accent/30">
      {logs.map((log) => (
        <div key={log.id} className="hover:bg-white/5 p-1 rounded transition-colors group">
          <div className="flex items-start gap-4">
            <span className="text-slate-600 shrink-0">{new Date(log.timestamp).toLocaleTimeString()}</span>
            <span className={cn(
              "uppercase font-bold w-14 shrink-0",
              log.level === 'error' ? 'text-red-400' : 
              log.level === 'warn' ? 'text-amber-400' : 
              log.level === 'info' ? 'text-blue-400' : 'text-slate-500'
            )}>{log.level}</span>
            <span className="text-agency-accent shrink-0">{log.module}:</span>
            <span className="text-slate-300">{log.message}</span>
            {log.traceId && <span className="text-[9px] text-slate-700 italic">[{log.traceId}]</span>}
          </div>
          {log.payload && (
            <div className="ml-24 mt-1 text-slate-500 bg-white/5 p-2 rounded border border-white/5 overflow-x-auto">
              <pre>{JSON.stringify(log.payload, null, 2)}</pre>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const ProtocolView = ({ onAction, logs }: { onAction: (name: string, type?: string) => void, logs: SystemLog[] }) => {
  const [debugMode, setDebugMode] = useState(false);

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      {/* Top Controls: Scaling Engine Overview */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg shadow-inner">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Scaling Engine Active</span>
          </div>
          <div className="h-4 w-px bg-agency-border" />
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-agency-bg border border-agency-border rounded-lg text-[10px] font-bold uppercase text-agency-muted">
            <Layers className="w-3.5 h-3.5" /> 2M Context Shard
          </div>
        </div>
        <button 
          onClick={() => setDebugMode(!debugMode)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-sm",
            debugMode ? "bg-agency-accent text-white shadow-agency-accent/20" : "bg-white border border-agency-border text-agency-muted hover:border-agency-accent"
          )}
        >
          <Terminal className="w-3.5 h-3.5" />
          A2A Trace: {debugMode ? 'VERBOSE' : 'STANDARD'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Section 8.2: Google Search Grounding & Real-Time Validation */}
          <div className="panel-card p-6 border-blue-100 bg-blue-50/30">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20">
                  <SearchCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold font-display uppercase text-blue-900">Search Grounding Hub</h3>
                  <p className="text-[10px] font-bold text-blue-600/80 uppercase tracking-widest mt-0.5">Real-time claim verification & trend check</p>
                </div>
              </div>
              <div className="px-3 py-1.5 bg-white border border-blue-100 rounded-lg flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                <span className="text-[10px] font-black text-blue-700">LIVE SYNC</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-blue-100 rounded-2xl shadow-sm">
                <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1.5">Market Claim Status</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-900">"ROAS Lift {'>'} 40%"</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 font-bold uppercase">Verified</span>
                </div>
                <div className="mt-3 text-[9px] text-blue-600/70 italic leading-relaxed">
                  Grounded in recent case studies & search benchmarks (May 2026).
                </div>
              </div>
              <div className="p-4 bg-white border border-blue-100 rounded-2xl shadow-sm">
                <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1.5">Competitor News</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-900 truncate mr-2">TechCorp Q3 Pricing...</span>
                  <button className="p-1 hover:bg-blue-50 rounded-lg text-blue-600"><ArrowRight className="w-3.5 h-3.5" /></button>
                </div>
                <div className="mt-3 flex gap-2">
                  <span className="text-[8px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">NEW DATA</span>
                  <span className="text-[8px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">AUTO-UPDATE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 8.3: Model Tuning & Brand Voice Training */}
          <div className="panel-card p-6">
            <h3 className="font-bold text-lg font-display mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-agency-accent" /> Brand Fine-Tuning Pipeline
            </h3>
            <div className="space-y-4">
              {TRAINING_JOBS.map((job) => (
                <div key={job.id} className="p-5 bg-agency-bg border border-agency-border rounded-2xl group hover:border-agency-accent transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-sm text-agency-ink group-hover:text-agency-accent transition-colors">{job.model}</h4>
                      <p className="text-[10px] font-bold text-agency-muted uppercase tracking-widest mt-0.5">Target: {job.client}</p>
                    </div>
                    <div className={cn(
                      "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest shadow-sm",
                      job.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 
                      job.status === 'running' ? 'bg-blue-50 text-blue-600 animate-pulse' : 'bg-slate-100 text-slate-400'
                    )}>{job.status}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                      <span className="text-agency-muted">Loss Convergence</span>
                      <span className="text-agency-ink">{job.progress}% Complete</span>
                    </div>
                    <div className="h-2 w-full bg-white rounded-full overflow-hidden border border-agency-border">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${job.progress}%` }}
                        className={cn(
                          "h-full transition-all duration-1000",
                          job.status === 'completed' ? 'bg-emerald-500' : 'bg-agency-accent'
                        )}
                      />
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-agency-muted pt-1">
                      <span>Epoch 120/200</span>
                      <span>Metric Loss: {job.loss.toFixed(4)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-agency-bg border-2 border-dashed border-agency-border rounded-2xl text-[10px] font-bold uppercase tracking-widest text-agency-muted hover:text-agency-accent hover:border-agency-accent transition-all flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Start New Fine-Tune Cluster
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Section 8.4: Code Export & IaC */}
          <div className="panel-card p-6 bg-slate-900 border-slate-800 text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-agency-accent/20 border border-agency-accent/30 rounded-xl">
                  <Code2 className="w-5 h-5 text-agency-accent" />
                </div>
                <div>
                  <h3 className="font-bold font-display uppercase">Infrastructure Engine</h3>
                  <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">IaC Protocol v3.1</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-1 bg-black/40 rounded-xl border border-white/5 font-mono text-[10px] text-emerald-400/90 leading-relaxed group">
                  <div className="p-3">
                    <span className="text-slate-600 block mb-1"># Exporting FastAPI Backend (c1-core)</span>
                    <span className="text-white">class</span> <span className="text-blue-400">MarketingAPI</span>(BaseModel):<br/>
                    &nbsp;&nbsp;campaign_id: <span className="text-amber-400">UUID4</span><br/>
                    &nbsp;&nbsp;budget_pacing: <span className="text-amber-400">float</span> = <span className="text-emerald-400">0.0</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-8 space-y-3">
              <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest text-center mb-2">Target Environments</div>
              <div className="flex gap-2">
                <button className="flex-1 p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-center">
                  <div className="text-[10px] font-black">GCP / TERRA</div>
                </button>
                <button className="flex-1 p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-center">
                  <div className="text-[10px] font-black">NODE / NEST</div>
                </button>
              </div>
              <button className="w-full py-3 bg-agency-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-xl shadow-agency-accent/20 mt-2 hover:scale-[1.02] transition-transform">
                Download Code Package
              </button>
            </div>
          </div>

          {/* Section 10 & 11: Agent Inventory & Self-Healing */}
          <div className="panel-card p-6 border-agency-accent/10">
            <h3 className="font-bold font-display text-sm uppercase mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-agency-accent" /> Active Agent Network
            </h3>
            <div className="space-y-3">
              {AGENTS.map((agent) => (
                <div key={agent.id} className="p-3 bg-agency-bg border border-agency-border rounded-xl flex items-center justify-between group hover:border-agency-accent transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-agency-border flex items-center justify-center overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${agent.id}`} alt="agent" className="w-full h-full opacity-60" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-agency-ink">{agent.name}</div>
                      <div className="text-[9px] font-mono text-agency-muted">{agent.endpoint}</div>
                    </div>
                  </div>
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    agent.status === 'available' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                  )} />
                </div>
              ))}
            </div>
          </div>

          <div className="panel-card p-6 bg-agency-panel border-agency-accent/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-agency-accent text-white rounded-xl shadow-lg shadow-agency-accent/20">
                <HeartPulse className="w-4 h-4" />
              </div>
              <h3 className="font-bold font-display text-sm uppercase tracking-tight text-agency-ink">Self-Healing Engine</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-white border border-agency-border rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-agency-ink">A2A_AUTH_401</span>
                </div>
                <div className="text-[10px] text-agency-muted leading-relaxed">
                  Refresh OAuth token, retry with exponential backoff. Status: <span className="text-emerald-500 font-bold">READY</span>
                </div>
              </div>
              <div className="p-4 bg-white border border-agency-border rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-agency-ink">STRUCTURE_INVALID</span>
                </div>
                <div className="text-[10px] text-agency-muted leading-relaxed">
                  Repair attempt with schema validator; escalate to human if threshold P50 fails.
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between p-4 bg-slate-900 rounded-2xl">
              <div className="text-center">
                <div className="text-[8px] text-slate-500 font-bold uppercase mb-1">Uptime</div>
                <div className="text-sm font-bold font-display text-white">99.998%</div>
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div className="text-center">
                <div className="text-[8px] text-slate-500 font-bold uppercase mb-1">Healing</div>
                <div className="text-sm font-bold font-display text-emerald-400">12.2s MTTR</div>
              </div>
              <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors">
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* A2A Trace Console (Conditional) */}
      {debugMode && (
        <div className="mt-8 animate-in slide-in-from-bottom-4 duration-500">
          <DebugConsole logs={logs} />
        </div>
      )}
    </div>
  );
};

const VibeLibraryView = ({ 
  onAction,
  templates,
  setTemplates
}: { 
  onAction: (name: string, type?: string) => void,
  templates: AgencyTemplate[],
  setTemplates: React.Dispatch<React.SetStateAction<AgencyTemplate[]>>
}) => {
  const [isImporting, setIsImporting] = useState(false);
  const [newTemplate, setNewTemplate] = useState<Partial<AgencyTemplate>>({
    category: 'Dashboard'
  });

  const handleImport = () => {
    if (!newTemplate.name || !newTemplate.description || !newTemplate.prompt) {
      onAction('All template fields (Name, Description, Spec) are required for import.', 'error');
      return;
    }

    const template: AgencyTemplate = {
      id: `tpl-${Date.now()}`,
      name: newTemplate.name!,
      description: newTemplate.description!,
      prompt: newTemplate.prompt!,
      category: newTemplate.category as any
    };

    setTemplates(prev => [template, ...prev]);
    onAction(`Custom template "${template.name}" has been successfully indexed in the Vibe Library.`, 'success');
    setIsImporting(false);
    setNewTemplate({ category: 'Dashboard' });
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center text-agency-ink">
        <div>
          <h2 className="text-2xl font-bold font-display uppercase tracking-tight">Vibe Coding Library</h2>
          <p className="text-xs text-agency-muted font-bold uppercase tracking-widest mt-1">Pre-Built Agency App Templates for Rapid Deployment</p>
        </div>
        <button 
          onClick={() => setIsImporting(true)}
          className="px-4 py-2 bg-agency-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-transform hover:scale-105"
        >
          <Upload className="w-3.5 h-3.5" /> Import Template
        </button>
      </div>

      <AnimatePresence>
        {isImporting && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="panel-card p-8 border-2 border-agency-accent shadow-2xl relative z-50 mb-8"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-agency-accent text-white rounded-xl">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg font-display uppercase tracking-tight text-agency-ink">Import Custom Spec</h3>
                  <p className="text-[10px] text-agency-muted font-bold uppercase tracking-widest">Registering proprietary automation template</p>
                </div>
              </div>
              <button onClick={() => setIsImporting(false)} className="p-2 hover:bg-agency-bg rounded-lg transition-colors">
                <X className="w-5 h-5 text-agency-muted" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-agency-muted tracking-widest">Template Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. ROAS-Optimizer-V2"
                    value={newTemplate.name || ''}
                    onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                    className="w-full bg-white border border-agency-border rounded-xl px-4 py-3 text-sm font-bold text-agency-ink focus:border-agency-accent outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-agency-muted tracking-widest">Template Category</label>
                  <div className="flex gap-2">
                    {['Dashboard', 'Calculator', 'Workflow', 'Tool'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setNewTemplate({ ...newTemplate, category: cat as any })}
                        className={cn(
                          "flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-tight transition-all border",
                          newTemplate.category === cat 
                            ? "bg-agency-accent text-white border-agency-accent" 
                            : "bg-white text-agency-muted border-agency-border hover:border-agency-accent"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-agency-muted tracking-widest">Short Description</label>
                  <textarea 
                    placeholder="Briefly explain what this template enables..."
                    value={newTemplate.description || ''}
                    onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                    className="w-full bg-white border border-agency-border rounded-xl px-4 py-3 text-sm font-medium text-agency-ink focus:border-agency-accent outline-none min-h-[80px] resize-none"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-agency-muted tracking-widest text-agency-accent">Technical Prompt Specification (Vibe Spec)</label>
                  <textarea 
                    placeholder="Input the system-level prompt or JSON spec..."
                    value={newTemplate.prompt || ''}
                    onChange={(e) => setNewTemplate({ ...newTemplate, prompt: e.target.value })}
                    className="w-full bg-agency-ink text-white/90 font-mono border border-agency-border rounded-xl px-4 py-4 text-[11px] focus:border-agency-accent outline-none min-h-[200px] resize-none"
                  />
                  <p className="text-[8px] text-agency-muted italic uppercase tracking-tighter">This spec will be used as the backbone during autonomous deployment.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-agency-border flex justify-end gap-3">
              <button 
                onClick={() => setIsImporting(false)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest text-agency-muted hover:bg-agency-bg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleImport}
                className="px-8 py-2.5 bg-agency-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-agency-accent/20 hover:scale-105 active:scale-95 transition-all"
              >
                Commit to Library
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((tpl) => (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            key={tpl.id} 
            className="panel-card flex flex-col group hover:border-agency-accent transition-all cursor-pointer overflow-hidden"
          >
            <div className="p-6 flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <div className={cn(
                  "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest shadow-sm border",
                  tpl.category === 'Dashboard' ? "bg-blue-50 text-blue-600 border-blue-100" :
                  tpl.category === 'Calculator' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                  tpl.category === 'Workflow' ? "bg-amber-50 text-amber-600 border-amber-100" :
                  "bg-slate-50 text-slate-600 border-slate-100"
                )}>
                  {tpl.category}
                </div>
                <ChevronRight className="w-4 h-4 text-agency-muted group-hover:text-agency-accent transition-all group-hover:translate-x-1" />
              </div>
              <div>
                <h3 className="font-bold text-lg font-display mb-1 text-agency-ink group-hover:text-agency-accent transition-colors">{tpl.name}</h3>
                <p className="text-xs text-agency-muted leading-relaxed line-clamp-2">{tpl.description}</p>
              </div>
              <div className="bg-agency-bg p-3 rounded-xl border border-agency-border font-mono text-[10px] text-agency-muted relative overflow-hidden h-20">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-agency-bg z-10" />
                <span className="text-agency-accent opacity-50 block mb-1 uppercase font-black">Spec:</span>
                {tpl.prompt}
              </div>
            </div>
            <div className="p-6 pt-0 mt-auto">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onAction(`Deploying template: ${tpl.name}...`, 'success');
                }}
                className="w-full py-2.5 bg-white border border-agency-border rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-agency-ink hover:text-white hover:border-agency-ink transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" /> Deploy Template
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ApprovalsView = ({ 
  onAction,
  deliverables,
  setDeliverables
}: { 
  onAction: (name: string, type?: string) => void,
  deliverables: Deliverable[],
  setDeliverables: React.Dispatch<React.SetStateAction<Deliverable[]>>
}) => {
  const STAGES: ApprovalStatus[] = ['DRAFT', 'INTERNAL_QA', 'LEGAL_REVIEW', 'COMPLIANCE_CHECK', 'PENDING_CLIENT', 'REVISION_REQUESTED', 'APPROVED', 'DEPLOYED'];
  
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center text-agency-ink">
        <div>
          <h2 className="text-2xl font-bold font-display uppercase tracking-tight">Approval Engine</h2>
          <p className="text-xs text-agency-muted font-bold uppercase tracking-widest mt-1">8-Stage Compliance & Quality Pipeline</p>
        </div>
        <div className="flex gap-2 text-[10px] font-bold uppercase">
          <div className="flex items-center gap-2 px-3 py-2 bg-agency-bg border border-agency-border rounded-xl text-agency-muted">
            <Clock className="w-3.5 h-3.5" /> Avg Cycle: 18.4h
          </div>
          <button 
            onClick={() => onAction('Batch sending 5 deliverables to client portal...', 'success')}
            className="px-4 py-2 bg-agency-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2"
          >
            <FileCheck className="w-3.5 h-3.5" /> Batch Send
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {deliverables.map((del) => {
          const currentStageIdx = STAGES.indexOf(del.status);
          const progress = ((currentStageIdx + 1) / STAGES.length) * 100;
          
          return (
            <div key={del.id} className="panel-card p-6 group hover:border-agency-accent transition-all">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-agency-bg rounded-2xl flex items-center justify-center border border-agency-border group-hover:bg-agency-accent/5 transition-colors">
                    {del.type === 'Creative' || del.type === 'Ad' ? <ImageIcon className="w-6 h-6 text-agency-muted group-hover:text-agency-accent" /> : <ClipboardCheck className="w-6 h-6 text-agency-muted group-hover:text-agency-accent" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg font-display text-agency-ink group-hover:text-agency-accent transition-colors">{del.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-bold text-agency-muted uppercase tracking-widest">{del.type} • {del.version}</span>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[9px] font-black uppercase tracking-tight">
                        <UserCheck className="w-3 h-3" /> {del.assignedAgent}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8 text-[10px] font-bold uppercase">
                  <div className="text-center">
                    <div className="text-agency-muted mb-1 text-[8px] font-black">Audit Compliance</div>
                    <div className={cn(
                      "text-sm font-display",
                      (del.complianceScore || 0) > 90 ? "text-emerald-500" : "text-amber-500"
                    )}>{del.complianceScore}%</div>
                  </div>
                  <div className="text-center border-l border-agency-border pl-8">
                    <div className="text-agency-muted mb-1 text-[8px] font-black">Budget Guard</div>
                    <div className="text-sm font-display text-agency-ink">
                      ${del.budgetThreshold?.toLocaleString() || 'N/A'}
                    </div>
                  </div>
                  <div className="text-center border-l border-agency-border pl-8">
                    <div className="text-agency-muted mb-1 text-[8px] font-black">Velocity</div>
                    <div className="text-sm font-display text-agency-ink">4.2h</div>
                  </div>
                </div>
              </div>

              {/* 7-Stage Pipeline Visual */}
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-agency-accent">Pipeline Status: {del.status.replace('_', ' ')}</span>
                  <span className="text-[10px] font-bold text-agency-muted uppercase tracking-widest">{Math.round(progress)}% Complete</span>
                </div>
                <div className="relative h-1.5 w-full bg-agency-bg rounded-full overflow-hidden">
                  <div className="absolute inset-0 flex">
                    {STAGES.map((_, i) => (
                      <div key={i} className="flex-1 border-r border-white/50 last:border-0 z-10" />
                    ))}
                  </div>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-agency-accent shadow-[0_0_12px_rgba(255,51,0,0.3)]"
                  />
                </div>
                <div className="flex justify-between">
                  {STAGES.map((stage, i) => (
                    <div key={stage} className={cn(
                      "text-[8px] font-bold tracking-tighter uppercase px-1 transition-colors",
                      i <= currentStageIdx ? "text-agency-accent" : "text-agency-muted"
                    )}>
                      {stage.split('_')[0]}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-agency-border flex justify-between items-center">
                <div className="flex gap-2">
                  {del.flags?.map(f => (
                    <span key={f} className="px-2 py-0.5 bg-agency-bg border border-agency-border rounded text-[8px] font-bold text-agency-muted uppercase">{f}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => onAction(`Analyzing revision history for ${del.name}...`, 'info')}
                    className="px-4 py-2 bg-agency-bg border border-agency-border rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors"
                  >
                    Revision Trace
                  </button>
                  <button 
                    onClick={() => onAction(`Opening Decision Portal for ${del.name}...`, 'success')}
                    className="px-4 py-2 bg-agency-accent text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-agency-accent/20"
                  >
                    Decision Portal
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PersonasView = ({ 
  onAction, 
  personas, 
  setPersonas 
}: { 
  onAction: (name: string, type?: string) => void,
  personas: Persona[],
  setPersonas: React.Dispatch<React.SetStateAction<Persona[]>>
}) => {
  const [isDefining, setIsDefining] = useState(false);
  const [newPersona, setNewPersona] = useState<Partial<Persona>>({
    role: 'Strategist',
    temperature: 0.5,
    status: 'active'
  });

  const handleDefine = () => {
    if (!newPersona.name || !newPersona.tone) {
      onAction('Incomplete persona parameters detected. Please provide a name and tone signature.', 'error');
      return;
    }

    const persona: Persona = {
      id: `p-${Date.now()}`,
      name: newPersona.name!,
      role: newPersona.role as any,
      tone: newPersona.tone!,
      temperature: newPersona.temperature!,
      status: 'active'
    };

    setPersonas(prev => [...prev, persona]);
    onAction(`New AI Persona "${persona.name}" successfully locked into agency system with TEMP:${persona.temperature}.`, 'success');
    setIsDefining(false);
    setNewPersona({
      role: 'Strategist',
      temperature: 0.5,
      status: 'active'
    });
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold font-display uppercase tracking-tight">System Personas</h2>
          <p className="text-xs text-agency-muted font-bold uppercase tracking-widest mt-1">Permanent Persona Lock with temperature auto-adjustment</p>
        </div>
        <button 
          onClick={() => setIsDefining(true)}
          className="px-4 py-2 bg-agency-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-agency-accent/20"
        >
          <Plus className="w-3.5 h-3.5" /> Define Persona
        </button>
      </div>

      <AnimatePresence>
        {isDefining && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="panel-card p-8 border-2 border-agency-accent bg-agency-accent/5">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-agency-accent text-white rounded-xl">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg font-display uppercase tracking-tight">Define Neural Persona</h3>
                    <p className="text-[10px] text-agency-muted font-bold uppercase tracking-widest">Constructing new linguistic fingerprint</p>
                  </div>
                </div>
                <button onClick={() => setIsDefining(false)} className="p-2 hover:bg-agency-bg rounded-lg transition-colors">
                  <X className="w-5 h-5 text-agency-muted" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-agency-muted tracking-widest">Persona Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Echo-Ops, Flux-Admin"
                      value={newPersona.name || ''}
                      onChange={(e) => setNewPersona({ ...newPersona, name: e.target.value })}
                      className="w-full bg-white border border-agency-border rounded-xl px-4 py-3 text-sm font-bold text-agency-ink focus:border-agency-accent outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-agency-muted tracking-widest">Primary Role</label>
                    <select 
                      value={newPersona.role}
                      onChange={(e) => setNewPersona({ ...newPersona, role: e.target.value as any })}
                      className="w-full bg-white border border-agency-border rounded-xl px-4 py-3 text-sm font-bold text-agency-ink focus:border-agency-accent outline-none appearance-none"
                    >
                      <option value="Strategist">Strategist (ROAS Focused)</option>
                      <option value="Creative">Creative (Growth Centric)</option>
                      <option value="Technical">Technical (Infrastructure)</option>
                      <option value="Account Manager">Account Manager (Retention)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase text-agency-muted tracking-widest">Temperature</label>
                      <span className="text-[10px] font-mono font-bold text-agency-accent">{newPersona.temperature}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Thermometer className="w-4 h-4 text-agency-muted" />
                      <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.1" 
                        value={newPersona.temperature}
                        onChange={(e) => setNewPersona({ ...newPersona, temperature: parseFloat(e.target.value) })}
                        className="flex-1 h-1.5 bg-agency-border rounded-full appearance-none cursor-pointer accent-agency-accent"
                      />
                    </div>
                    <p className="text-[8px] text-agency-muted italic uppercase tracking-tighter">Lower = Predictable, Higher = Innovative</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-agency-muted tracking-widest">Tone Signature</label>
                    <textarea 
                      placeholder="Describe the linguistic style and methodology..."
                      value={newPersona.tone || ''}
                      onChange={(e) => setNewPersona({ ...newPersona, tone: e.target.value })}
                      className="w-full bg-white border border-agency-border rounded-xl px-4 py-3 text-sm font-medium text-agency-ink focus:border-agency-accent outline-none min-h-[100px] resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-agency-border flex justify-end gap-3">
                <button 
                  onClick={() => setIsDefining(false)}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest text-agency-muted hover:bg-agency-bg transition-colors"
                >
                  Discard
                </button>
                <button 
                  onClick={handleDefine}
                  className="px-8 py-2.5 bg-agency-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-agency-accent/20 hover:scale-105 active:scale-95 transition-all"
                >
                  Finalize Neural Lock
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {personas.map((p) => (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            key={p.id} 
            className="panel-card p-6 flex flex-col gap-4 group hover:border-agency-accent transition-all relative"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-agency-bg rounded-xl border border-agency-border">
                  <UserCircle className="w-6 h-6 text-agency-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-lg leading-tight">{p.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase text-agency-muted tracking-widest">{p.role}</span>
                    <div className="h-2 w-px bg-agency-border" />
                    <span className="text-[10px] font-mono text-agency-accent">TEMP: {p.temperature}</span>
                  </div>
                </div>
              </div>
              {p.status === 'locked' && <Key className="w-4 h-4 text-agency-muted" />}
            </div>
            
            <div className="bg-agency-bg p-4 rounded-xl border border-agency-border space-y-2">
              <div className="text-[9px] font-bold uppercase text-agency-muted tracking-widest flex items-center gap-1.5">
                <Command className="w-3 h-3" /> Tone Signature
              </div>
              <p className="text-xs text-agency-ink font-medium italic">"{p.tone}"</p>
            </div>

            <div className="pt-4 border-t border-agency-border flex justify-between items-center mt-auto">
              <span className={cn(
                "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest",
                p.status === 'locked' ? 'bg-slate-100 text-slate-500' : 'bg-emerald-50 text-emerald-600'
              )}>{p.status}</span>
              <button 
                onClick={() => onAction(`Fine-tuning ${p.name} based on recent campaign vibes...`, 'info')}
                className="text-[10px] font-bold uppercase text-agency-muted hover:text-agency-accent"
              >
                Fine-Tune Agent
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const CollaborationView = ({ onAction }: { onAction: (name: string, type?: string) => void }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareUrl = "https://ais-pre-s3mbkuit5jexstnpi4q5vn-535361250845.us-east1.run.app";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    onAction('Instance link copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold font-display uppercase tracking-tight">AOS Collaboration</h2>
          <p className="text-xs text-agency-muted font-bold uppercase tracking-widest mt-1">Live Preview Links & Real-time Multiplayer Sync</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsShareModalOpen(true)}
            className="px-4 py-2 bg-white border border-agency-border rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-agency-bg transition-all active:scale-95 shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" /> Share Instance
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="panel-card p-6">
            <h3 className="font-bold text-lg font-display mb-6">Live Session Log</h3>
            <div className="space-y-4">
              {COLLAB_SESSIONS.map((s) => (
                <div key={s.id} className="p-4 bg-agency-bg rounded-xl border border-agency-border flex items-center justify-between group hover:border-agency-accent transition-all text-agency-ink">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-agency-accent flex items-center justify-center text-[10px] font-bold text-white uppercase">
                      {s.user.substring(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold">{s.user}</span>
                        <span className="text-[10px] font-mono text-agency-muted">@{s.version}</span>
                      </div>
                      <p className="text-xs text-agency-muted mt-0.5">{s.action}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-agency-muted uppercase">{new Date(s.timestamp).toLocaleTimeString()}</div>
                    <div className="text-[10px] text-emerald-600 font-bold uppercase tracking-tighter">Connected</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-card p-6 bg-slate-900 border-slate-800 text-white">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-agency-accent/20">
                  <Layers className="w-5 h-5 text-agency-accent" />
                </div>
                <h3 className="font-bold font-display">Version Branches</h3>
              </div>
              <button 
                onClick={() => onAction('Creating persistent instance snapshot...', 'info')}
                className="text-[10px] font-bold text-agency-accent uppercase tracking-widest hover:underline"
              >
                Commit Snapshot
              </button>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((v) => (
                <div key={v} className="p-3 bg-black/40 rounded-lg border border-white/5 flex items-center justify-between group hover:bg-black/60 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-2 h-2 rounded-full", v === 1 ? 'bg-emerald-500' : 'bg-slate-700')} />
                    <div>
                      <div className="text-xs font-bold">Branch: optimization_v1.4.{v}</div>
                      <div className="text-[10px] text-slate-500">Merged 3 mins ago by A2A Engine</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-slate-300 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="panel-card p-6 text-agency-ink">
            <h3 className="font-bold font-display mb-4">Instance Status</h3>
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase">Live Preview</span>
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                  Instance streaming active. Agency team and client currently in multiplayer mode.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase text-agency-muted">
                  <span>Cursor Tracking</span>
                  <span className="text-agency-accent">Enabled</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase text-agency-muted">
                  <span>Comment Pins</span>
                  <span className="text-agency-accent">12 Open</span>
                </div>
              </div>
            </div>
          </div>

          <div className="panel-card p-6 bg-agency-panel border-agency-accent/20 text-agency-ink">
            <h3 className="font-bold font-display mb-4">Quick Deploy</h3>
            <div className="space-y-3">
              <button 
                onClick={() => onAction('Initializing production build for Cloud Run deployment...', 'success')}
                className="w-full py-2 bg-agency-ink text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-agency-ink/90 transition-colors"
              >
                Deploy to Cloud Run
              </button>
              <button 
                onClick={() => onAction('Packaging repository for GitHub export...', 'info')}
                className="w-full py-2 border border-agency-border rounded-lg text-[10px] font-bold uppercase tracking-widest text-agency-muted hover:bg-agency-bg transition-colors"
              >
                Export to GitHub
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Share Instance Modal */}
      <AnimatePresence>
        {isShareModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShareModalOpen(false)}
              className="absolute inset-0 bg-agency-ink/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-agency-border"
            >
              <div className="p-6 border-b border-agency-border flex justify-between items-center bg-agency-bg/50">
                <div>
                  <h3 className="text-xl font-bold font-display uppercase tracking-tight text-agency-ink">Share Project Instance</h3>
                  <p className="text-[10px] text-agency-muted font-bold uppercase tracking-widest mt-1">Grounding logic & multi-user preview access</p>
                </div>
                <button 
                  onClick={() => setIsShareModalOpen(false)}
                  className="p-2 hover:bg-white rounded-full text-agency-muted transition-colors border border-transparent hover:border-agency-border"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase text-agency-muted">Public Preview Link</label>
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">ACTIVE SESSION</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 px-4 py-3 bg-agency-bg border border-agency-border rounded-xl text-xs font-mono text-agency-ink truncate flex items-center gap-2">
                       <Globe className="w-3.5 h-3.5 text-agency-muted" />
                       <span className="truncate">{shareUrl}</span>
                    </div>
                    <button 
                      onClick={handleCopy}
                      className="px-4 py-3 bg-agency-ink text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-agency-ink/90 transition-all flex items-center gap-2 active:scale-95 whitespace-nowrap"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-agency-muted">Active Collaborators</label>
                  <div className="space-y-2">
                    {[
                      { name: 'Sarah Chen', role: 'Agency Admin', status: 'Viewing App.tsx' },
                      { name: 'Marcus Miller', role: 'Client Stakeholder', status: 'Reviewing Dashboard' }
                    ].map((user, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-agency-bg rounded-xl border border-agency-border text-agency-ink">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-agency-accent/10 border border-agency-accent/20 flex items-center justify-center text-agency-accent font-bold text-[10px]">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-xs font-bold">{user.name}</div>
                            <div className="text-[9px] font-bold text-agency-muted uppercase tracking-tighter">{user.role}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[9px] font-medium text-agency-muted italic">{user.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-3 bg-agency-bg border-2 border-dashed border-agency-border rounded-xl text-[10px] font-bold uppercase tracking-widest text-agency-muted hover:text-agency-accent hover:border-agency-accent transition-all flex items-center justify-center gap-2">
                    <Plus className="w-3.5 h-3.5" /> Invite Team Member
                  </button>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
                  <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-[10px] font-bold text-amber-900 leading-relaxed">
                    By sharing this instance, you are granting live read/write access to the current project state. Revision history will be logged for security audits.
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-agency-border bg-agency-bg/50 flex gap-3">
                <button 
                  onClick={() => setIsShareModalOpen(false)}
                  className="flex-1 py-4 bg-white border border-agency-border rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/80 transition-all text-agency-ink"
                >
                  Close Manager
                </button>
                <button 
                  onClick={() => onAction('Broadcasting instance sync signal...', 'info')}
                  className="flex-1 py-4 bg-agency-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-agency-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Force Sync
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MediaCenterView = ({ 
  onAction, 
  assets, 
  setAssets, 
  campaigns, 
  setCampaigns 
}: { 
  onAction: (name: string, type?: string) => void,
  assets: MediaAsset[],
  setAssets: React.Dispatch<React.SetStateAction<MediaAsset[]>>,
  campaigns: ContentCampaign[],
  setCampaigns: React.Dispatch<React.SetStateAction<ContentCampaign[]>>
}) => {
  const [isIngesting, setIsIngesting] = useState(false);
  const [ingestionStage, setIngestionStage] = useState<'initial' | 'analyzing' | 'complete'>('initial');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);
  const [selectedAudioFile, setSelectedAudioFile] = useState<File | null>(null);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);
  const [audioInferenceResult, setAudioInferenceResult] = useState<any>(null);

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null);
  const [isProcessingVideo, setIsProcessingVideo] = useState(false);
  const [videoInferenceResult, setVideoInferenceResult] = useState<any>(null);

  const [isVideoGenModalOpen, setIsVideoGenModalOpen] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoGenResult, setVideoGenResult] = useState<any>(null);
  const [videoGenPrompt, setVideoGenPrompt] = useState('Urban lifestyle aesthetic with warm lighting, product hero shot, cinematic depth of field');
  const [isVideoValidating, setIsVideoValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<any>(null);

  const [isAudioSynthModalOpen, setIsAudioSynthModalOpen] = useState(false);
  const [isSynthesizingAudio, setIsSynthesizingAudio] = useState(false);
  const [audioSynthResult, setAudioSynthResult] = useState<any>(null);
  const [audioSynthScript, setAudioSynthScript] = useState('Welcome to our Spring collection. Discover urban gear designed for the modern explorer.');

  const [vocalIdentities, setVocalIdentities] = useState<VocalIdentity[]>([]);
  const [isIdentityModalOpen, setIsIdentityModalOpen] = useState(false);
  const [isActivatingIdentity, setIsActivatingIdentity] = useState(false);

  const [mediaCenterAssets, setMediaCenterAssets] = useState<MediaCenterAsset[]>([]);
  const [isMediaCenterLoading, setIsMediaCenterLoading] = useState(false);

  useEffect(() => {
    setIsMediaCenterLoading(true);
    fetch('/api/v1/media-center/assets')
      .then(res => res.json())
      .then(data => {
        setMediaCenterAssets(data);
        setIsMediaCenterLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsMediaCenterLoading(false);
      });
  }, []);

  const deleteMediaAsset = async (assetId: string) => {
    onAction(`Removing asset ${assetId} from global CDN cluster...`, 'info');
    try {
      const response = await fetch(`/api/v1/media-center/assets/${assetId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Deletion rejected.');
      
      setMediaCenterAssets(prev => prev.filter(a => a.asset_id !== assetId));
      onAction('Asset successfully purged from multimodal storage.', 'success');
    } catch (error) {
      console.error(error);
      onAction('Failed to remove asset.', 'error');
    }
  };

  useEffect(() => {
    fetch('/api/v1/audio/identity')
      .then(res => res.json())
      .then(data => setVocalIdentities(data))
      .catch(console.error);
  }, []);

  // Simulated Multimodal Orchestration Sync (WS)
  useEffect(() => {
    const wsEvents = [
      { event: 'MEDIA_INGEST_COMPLETE', msg: 'Core brand footage ingested. Triggering tone analysis cluster...' },
      { event: 'TONE_ANALYSIS_COMPLETE', msg: 'Acoustic fingerprint locked. Updating production tone heads.' },
      { event: 'CAMPAIGN_ASSET_READY', msg: 'New video synth asset compiled. Production v2.4 initialized.' },
      { event: 'VALIDATION_PASSED', msg: 'Multimodal compliance verified. Ready for deployment queue.' }
    ];

    let eventIdx = 0;
    const interval = setInterval(() => {
      const e = wsEvents[eventIdx % wsEvents.length];
      onAction(`[Real-time Sync: ${e.event}] ${e.msg}`, 'info');
      eventIdx++;
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  const activateVocalIdentity = async (identityId: string) => {
    setIsActivatingIdentity(true);
    onAction(`Activating neural vocal identity ${identityId} for campaign cluster...`, 'info');

    try {
      const response = await fetch(`/api/v1/audio/identity/${identityId}/activate?campaign_id=camp-multimodal-01&auto_apply=true`, {
        method: 'POST'
      });

      if (!response.ok) throw new Error('Activation sequence rejected.');
      
      onAction('Vocal identity locked and loaded across production nodes.', 'success');
      // Update local state status
      setVocalIdentities(prev => prev.map(vi => ({
        ...vi,
        status: vi.identity_id === identityId ? 'active' : 'standby'
      })));
    } catch (error) {
      console.error(error);
      onAction('Identity activation failed.', 'error');
    } finally {
      setIsActivatingIdentity(false);
    }
  };

  const [isToneModalOpen, setIsToneModalOpen] = useState(false);
  const [isTrainingTone, setIsTrainingTone] = useState(false);
  const [trainingResult, setTrainingResult] = useState<any>(null);
  const [voiceProfileName, setVoiceProfileName] = useState('Executive_Voice_01');
  const [toneDimensions, setToneDimensions] = useState<{
    technical_expert: number;
    friendly_approachable: number;
    high_efficiency: number;
  }>({
    technical_expert: 0.92,
    friendly_approachable: 0.42,
    high_efficiency: 0.68
  });
  const [selectedAgents, setSelectedAgents] = useState<string[]>(['email-automation-agent', 'client-approval-agent', 'business-intelligence-agent']);
  const [isAdjustingDimensions, setIsAdjustingDimensions] = useState(false);

  const [activeCampaigns, setActiveCampaigns] = useState<ActiveCampaign[]>([]);

  useEffect(() => {
    fetch('/api/v1/campaigns/active?tenant_id=tenant-aos-prod-01')
      .then(res => res.json())
      .then(data => setActiveCampaigns(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (isToneModalOpen) {
      fetch('/api/v1/tone-training/dimensions')
        .then(res => res.json())
        .then(data => {
          if (data.dimensions) setToneDimensions(data.dimensions);
        })
        .catch(console.error);
    }
  }, [isToneModalOpen]);

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedAudioFile(e.target.files[0]);
    }
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedVideoFile(e.target.files[0]);
    }
  };

  const executeVideoScan = async () => {
    if (!selectedVideoFile) return;
    
    setIsProcessingVideo(true);
    onAction('Connecting to multimodal video scene-scan gateway...', 'info');

    const formData = new FormData();
    formData.append('video', selectedVideoFile);

    try {
      const response = await fetch('/api/v1/multimodal/scene-scan', {
        method: 'POST',
        headers: {
          'X-Tenant-ID': 'tenant-aos-prod-01',
          'X-API-Key': 'ak-a2a-multimodal-video-scan-v1-key-secret',
          'X-A2A-Agent': 'media-ingest-agent'
        },
        body: formData
      });

      if (!response.ok) throw new Error('Video scan failed.');

      const result = await response.json();
      setVideoInferenceResult(result);
      
      const newAsset: MediaAsset = {
        id: result.fileId,
        name: selectedVideoFile.name,
        type: 'video',
        url: '#',
        aiDescription: `Objects: ${result.inference.objectsDetected.join(', ')}. Scenes: ${result.inference.scenes}. Brand alignment palette detected.`,
        brandConsistency: 92 // High score for curated scan
      };

      setAssets(prev => [newAsset, ...prev]);
      onAction('Video scene segmentation and brand detection complete.', 'success');
    } catch (error) {
      console.error(error);
      onAction('Video scan failed connectivity check or processing error.', 'error');
    } finally {
      setIsProcessingVideo(false);
    }
  };

  const executeToneTraining = async () => {
    setIsTrainingTone(true);
    onAction('Initializing Brand Tone Calibration engine...', 'info');

    try {
      const response = await fetch('/api/v1/tone-training/train-head', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenant_id: 'tenant-aos-prod-01',
          voice_profile_name: voiceProfileName,
          training_samples: [
            { audio_url: 'internal://samples/raw-vocal-01.wav', emotion_label: 'authoritative' }
          ],
          target_characteristics: {
            pitch_range: 'mid',
            speaking_rate: 'normal',
            warmth_score: 0.85,
            clarity_score: 0.98
          }
        })
      });

      if (!response.ok) throw new Error('Training request rejected.');
      
      const result = await response.json();
      setTrainingResult(result);
      onAction('Tone training head queued successfully.', 'success');
    } catch (error) {
      console.error(error);
      onAction('Tone training sequence failed.', 'error');
    } finally {
      setIsTrainingTone(false);
    }
  };

  const applyToneAdjustments = async () => {
    if (!trainingResult?.head_id) return;
    
    setIsAdjustingDimensions(true);
    onAction('Synchronizing tone dimensional shifts across selected agents...', 'info');

    try {
      const response = await fetch('/api/v1/tone-training/dimensions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          head_id: trainingResult.head_id,
          dimension_adjustments: toneDimensions,
          apply_to_agents: selectedAgents
        })
      });

      if (!response.ok) throw new Error('Adjustment application failed.');
      
      onAction('Global tone profile updated and synced.', 'success');
      setIsToneModalOpen(false);
      setTrainingResult(null);
    } catch (error) {
      console.error(error);
      onAction('Dimensional sync failed.', 'error');
    } finally {
      setIsAdjustingDimensions(false);
    }
  };

  const executeVideoGen = async () => {
    setIsGeneratingVideo(true);
    onAction('Requesting cinematic video synthesis from multimodal cluster...', 'info');

    try {
      const response = await fetch('/api/v1/video/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenant_id: 'tenant-aos-prod-01',
          campaign_id: 'camp-123',
          prompt: videoGenPrompt,
          source_context: {
            brand_footage_urls: ['https://tenant-storage.com/raw/brand-hq-01.mov'],
            audio_mood_reference: 'head-alpha-v1',
            color_palette_extracted: ['#2A2A2A', '#F5F5F5', '#E8A87C']
          },
          output_specs: {
            duration_seconds: 15,
            aspect_ratio: '16:9',
            resolution: '1080p',
            style_tags: ['cinematic', 'product-focused']
          },
          voiceover: {
            head_id: 'head-alpha-v1',
            script: "The intersection of design and performance. Experience the new standard.",
            language: 'en-US',
            emotion: 'professional-enthusiastic'
          }
        })
      });

      if (!response.ok) throw new Error('Generation queue failed.');
      
      const result = await response.json();
      setVideoGenResult(result);
      
      const newAsset: MediaAsset = {
        id: result.generation_id,
        name: `Synth_Video_${Date.now()}.mp4`,
        type: 'video',
        url: result.preview_url,
        aiDescription: `AI Generated: ${videoGenPrompt}. Validity Score: ${result.validity_score}`,
        brandConsistency: 98
      };

      setAssets(prev => [newAsset, ...prev]);
      onAction('Video generation initialized at the rendering cluster.', 'success');
    } catch (error) {
      console.error(error);
      onAction('Multimodal synthesis request failed.', 'error');
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  const executeValidation = async (videoId: string) => {
    setIsVideoValidating(true);
    onAction('Running brand-safety and technical compliance sweep...', 'info');

    try {
      const response = await fetch('/api/v1/video/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          video_id: videoId,
          campaign_id: 'camp-123',
          target_platform: 'instagram-reels'
        })
      });

      if (!response.ok) throw new Error('Validation request failed.');
      
      const result = await response.json();
      setValidationResult(result);
      onAction('Content validation complete. All brand anchors verified.', 'success');
    } catch (error) {
      console.error(error);
      onAction('Validation sequence interrupted.', 'error');
    } finally {
      setIsVideoValidating(false);
    }
  };
  
  const executeAudioSynthesis = async () => {
    setIsSynthesizingAudio(true);
    onAction('Mastering high-fidelity vocal synthesis with emotional resonance...', 'info');

    try {
      const response = await fetch('/api/v1/audio/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenant_id: 'tenant-aos-prod-01',
          head_id: 'head-alpha-v1',
          script: audioSynthScript,
          language: 'en-US',
          emotion_profile: {
            warmth: 0.65,
            authority: 0.80,
            energy: 0.55
          },
          audio_specs: {
            sample_rate: 48000,
            format: 'wav',
            loudness_lufs: -16
          }
        })
      });

      if (!response.ok) throw new Error('Synthesis rejected by neural engine.');
      
      const result = await response.json();
      setAudioSynthResult(result);
      
      const newAsset: MediaAsset = {
        id: result.audio_id,
        name: `VoiceMaster_${Date.now()}.wav`,
        type: 'audio',
        url: result.download_url,
        aiDescription: `Neural Synthesis: "${audioSynthScript.substring(0, 30)}...". Validity: ${result.validity_score}`,
        brandConsistency: 95
      };

      setAssets(prev => [newAsset, ...prev]);
      onAction('Vocal master generated and synced to asset library.', 'success');
    } catch (error) {
      console.error(error);
      onAction('Vocal synthesis sequence failed.', 'error');
    } finally {
      setIsSynthesizingAudio(false);
    }
  };

  const executeAudioIngest = async () => {
    if (!selectedAudioFile) return;
    
    setIsProcessingAudio(true);
    onAction('Connecting to multimodal audio ingestion gateway...', 'info');

    const formData = new FormData();
    formData.append('audio', selectedAudioFile);

    try {
      const response = await fetch('/api/v1/multimodal/audio-ingest', {
        method: 'POST',
        headers: {
          'X-Tenant-ID': 'tenant-aos-prod-01',
          'X-API-Key': 'ak-a2a-multimodal-audio-ingest-v1-key-secret',
          'X-A2A-Agent': 'media-ingest-agent'
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Ingestion failed at the gateway level.');
      }

      const result = await response.json();
      setAudioInferenceResult(result);
      
      const newAsset: MediaAsset = {
        id: result.fileId,
        name: selectedAudioFile.name,
        type: 'audio',
        url: '#',
        aiDescription: `${result.analysis.transcriptionPreview}. Sentiment: ${result.analysis.sentiment}. Topics: ${result.analysis.topics.join(', ')}.`,
        brandConsistency: result.analysis.brandVoiceScore
      };

      setAssets(prev => [newAsset, ...prev]);
      onAction('Audio ingestion and brand alignment scoring complete.', 'success');
      setIngestionStage('complete');
      setTimeout(() => setIngestionStage('initial'), 2000);
    } catch (error) {
      console.error(error);
      onAction('Audio ingestion failed connectivity check or processing error.', 'error');
    } finally {
      setIsProcessingAudio(false);
    }
  };

  const handleIngest = async () => {
    if (isIngesting) return;
    setIsIngesting(true);
    setIngestionStage('analyzing');
    onAction('Initiating multimodal ingestion sequence...', 'info');
    
    // Simulate deep context extraction
    await new Promise(r => setTimeout(r, 2500));
    
    const names = ['Campaign_Vibe_Check.mp4', 'Q4_Market_Pulse.audio', 'Growth_Strategy_Doc.pdf'];
    const types: ('video' | 'audio' | 'doc')[] = ['video', 'audio', 'doc'];
    const idx = Math.floor(Math.random() * names.length);

    const newAsset: MediaAsset = {
      id: `m-${Date.now()}`,
      name: names[idx],
      type: types[idx],
      url: '#',
      aiDescription: `Automated extraction from source context. Brand alignment detected at high confidence level. Found ${Math.floor(Math.random() * 10) + 5} key thematic hooks.`,
      brandConsistency: Math.floor(Math.random() * 10) + 90
    };
    
    setAssets(prev => [newAsset, ...prev]);
    setIngestionStage('complete');
    onAction('Multimodal source metadata successfully extracted and indexed.', 'success');
    
    setTimeout(() => {
      setIsIngesting(false);
      setIngestionStage('initial');
    }, 1500);
  };

  const handleStartCampaignGen = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    onAction('Launching coordinated campaign generation engine...', 'info');
    
    const newId = `c-${Date.now()}`;
    const newCampaign: ContentCampaign = {
      id: newId,
      name: `Growth_Blast_${new Date().toLocaleDateString()}`,
      type: 'Multimodal',
      status: 'generating',
      aiScore: 88,
      assets: 0
    };
    
    setCampaigns(prev => [newCampaign, ...prev]);
    
    // Simulate generation stages
    await new Promise(r => setTimeout(r, 2000));
    setCampaigns(prev => prev.map(c => c.id === newId ? { ...c, assets: 8, aiScore: 92 } : c));
    onAction('Drafting high-conversion multimodal variants using Gemini 1.5 Pro...', 'info');
    
    await new Promise(r => setTimeout(r, 3000));
    setCampaigns(prev => prev.map(c => c.id === newId ? { ...c, status: 'ready', assets: 24, aiScore: 97 } : c));
    onAction('Campaign generation sequence complete. All assets cached and ready for approval.', 'success');
    
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center text-agency-ink">
        <div>
          <h2 className="text-2xl font-bold font-display uppercase tracking-tight">Media & Content Engine</h2>
          <p className="text-xs text-agency-muted font-bold uppercase tracking-widest mt-1">Autonomous Multimodal Generation (Veo 3.1 & Gemini 1.5 Pro)</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleIngest}
            disabled={isIngesting}
            className={cn(
              "px-4 py-2 bg-white border border-agency-border rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-agency-bg transition-all",
              isIngesting && "opacity-50 cursor-not-allowed"
            )}
          >
            {isIngesting ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Upload className="w-3.5 h-3.5" />
            )}
            {isIngesting ? "Analyzing..." : "Ingest Multimodal"}
          </button>
          <button 
            onClick={handleStartCampaignGen}
            disabled={isGenerating}
            className={cn(
              "px-4 py-2 bg-agency-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-agency-accent/20 transition-all",
              isGenerating && "opacity-50 cursor-not-allowed"
            )}
          >
            {isGenerating ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            {isGenerating ? "Synthesizing..." : "Start Campaign Gen"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isIngesting && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="panel-card p-6 border-2 border-agency-accent bg-agency-accent/5 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-agency-accent text-white rounded-xl">
                <Cpu className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold font-display uppercase tracking-tight">
                  {ingestionStage === 'analyzing' ? 'Processing Multimodal Blobs' : 'Analysis Finalized'}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="h-1 w-32 bg-agency-border rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-agency-accent"
                      initial={{ width: 0 }}
                      animate={{ width: ingestionStage === 'analyzing' ? '70%' : '100%' }}
                      transition={{ duration: 2 }}
                    />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-agency-accent">
                    {ingestionStage === 'analyzing' ? 'READING_RGB_VECTORS' : 'LOCKING_INDEX'}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[9px] font-black uppercase text-agency-muted tracking-widest">Confidence Score</div>
              <div className="text-lg font-bold text-agency-ink">0.9928</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="panel-card p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileJson className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold font-display uppercase tracking-tighter">Multimodal Input</h3>
            </div>
            <p className="text-[11px] text-agency-muted leading-relaxed">System accepts raw briefs, meeting audio, and brand footage for deep context extraction.</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-agency-bg border border-agency-border rounded-xl text-center group hover:border-agency-accent transition-colors cursor-pointer" onClick={() => setIsAudioModalOpen(true)}>
                <Mic className="w-4 h-4 mx-auto text-agency-accent mb-1 group-hover:scale-110 transition-transform" />
                <div className="text-[8px] font-black uppercase text-agency-muted">Audio Ingest</div>
              </div>
              <div className="p-3 bg-agency-bg border border-agency-border rounded-xl text-center group hover:border-agency-accent transition-colors cursor-pointer" onClick={() => setIsVideoModalOpen(true)}>
                <Video className="w-4 h-4 mx-auto text-agency-accent mb-1 group-hover:scale-110 transition-transform" />
                <div className="text-[8px] font-black uppercase text-agency-muted">Scene Scan</div>
              </div>
              <div className="p-3 bg-agency-bg border border-agency-border rounded-xl text-center group hover:border-agency-accent transition-colors cursor-pointer" onClick={() => setIsToneModalOpen(true)}>
                <Ear className="w-4 h-4 mx-auto text-agency-accent mb-1 group-hover:scale-110 transition-transform" />
                <div className="text-[8px] font-black uppercase text-agency-muted">Tone Training</div>
              </div>
              <div className="p-3 bg-agency-bg border border-agency-border rounded-xl text-center group hover:border-agency-accent transition-colors cursor-pointer" onClick={() => setIsVideoGenModalOpen(true)}>
                <Clapperboard className="w-4 h-4 mx-auto text-agency-accent mb-1 group-hover:scale-110 transition-transform" />
                <div className="text-[8px] font-black uppercase text-agency-muted">Video Synth</div>
              </div>
              <div className="p-3 bg-agency-bg border border-agency-border rounded-xl text-center group hover:border-agency-accent transition-colors cursor-pointer" onClick={() => setIsAudioSynthModalOpen(true)}>
                <Volume2 className="w-4 h-4 mx-auto text-agency-accent mb-1 group-hover:scale-110 transition-transform" />
                <div className="text-[8px] font-black uppercase text-agency-muted">Audio Master</div>
              </div>
              <div className="p-3 bg-agency-bg border border-agency-border rounded-xl text-center group hover:border-agency-accent transition-colors cursor-pointer" onClick={() => setIsIdentityModalOpen(true)}>
                <Fingerprint className="w-4 h-4 mx-auto text-agency-accent mb-1 group-hover:scale-110 transition-transform" />
                <div className="text-[8px] font-black uppercase text-agency-muted">Neural Identity</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 panel-card p-6">
          <h3 className="font-bold font-display uppercase tracking-tighter mb-4 flex items-center gap-2">
            <Workflow className="w-4 h-4 text-agency-accent" /> Active Multimodal Campaigns
          </h3>
          <div className="space-y-4">
            {activeCampaigns.map(ac => (
              <div key={ac.campaign_id} className="p-4 bg-agency-bg border border-agency-border rounded-xl group hover:border-agency-accent transition-all overflow-hidden relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white rounded-lg border border-agency-border shadow-sm">
                      <Layers className="w-5 h-5 text-agency-accent" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-agency-ink">{ac.campaign_name}</h4>
                        <span className={cn(
                          "text-[8px] px-1.5 py-0.5 rounded font-black uppercase tracking-widest",
                          ac.status === 'READY' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : 
                          ac.status === 'GENERATING' ? "bg-blue-50 text-blue-600 border border-blue-100 animate-pulse" : 
                          "bg-agency-bg text-agency-muted border border-agency-border"
                        )}>
                          {ac.status}
                        </span>
                      </div>
                      <div className="text-[10px] text-agency-muted font-bold uppercase tracking-wider mt-0.5">
                        Build {ac.production_version} • {ac.asset_count} Atomic Assets
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] font-black uppercase text-agency-muted">Quality Score</div>
                    <div className="text-xl font-black text-agency-accent tracking-tighter">{ac.quality_score}%</div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 py-3 border-y border-agency-border mb-4">
                  {[
                    { label: 'Video', val: ac.media_mix.video, icon: Video },
                    { label: 'Audio', val: ac.media_mix.audio, icon: Mic },
                    { label: 'Image', val: ac.media_mix.image, icon: Palette },
                    { label: 'Data', val: ac.media_mix.structured, icon: Boxes }
                  ].map(mix => (
                    <div key={mix.label} className="text-center">
                      <mix.icon className="w-3 h-3 mx-auto text-agency-muted mb-1" />
                      <div className="text-[9px] font-black text-agency-ink leading-tight">{mix.val}</div>
                      <div className="text-[7px] font-bold text-agency-muted uppercase tracking-tighter">{mix.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    {[
                      { label: 'Tone', score: ac.brand_alignment.tone_match },
                      { label: 'Visual', score: ac.brand_alignment.visual_match },
                      { label: 'Voice', score: ac.brand_alignment.voice_match }
                    ].map(align => (
                      <div key={align.label} className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-agency-accent" />
                        <span className="text-[8px] font-bold text-agency-muted uppercase">{align.label} {Math.round(align.score * 100)}%</span>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => onAction(`Launching Campaign Studio for ${ac.campaign_id}...`, 'info')}
                    className="px-3 py-1.5 bg-agency-ink text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-agency-accent transition-all flex items-center gap-2"
                  >
                    Open Studio <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}

            {activeCampaigns.length === 0 && (
              <div className="p-8 text-center border-2 border-dashed border-agency-border rounded-xl">
                <RefreshCw className="w-6 h-6 text-agency-muted mx-auto mb-2 animate-spin-slow" />
                <p className="text-[10px] font-bold text-agency-muted uppercase tracking-widest">Synchronizing Local Campaigns with Agency Network...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="panel-card p-6 border-l-4 border-l-agency-accent">
          <h3 className="font-bold text-sm font-display uppercase tracking-tight mb-4 flex items-center gap-2">
            <Fingerprint className="w-4 h-4 text-agency-accent" /> Tone Training
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Technical/Expert', score: 92 },
              { label: 'Friendly/Approachable', score: 45 },
              { label: 'High-Efficiency', score: 88 }
            ].map(tone => (
              <div key={tone.label} className="space-y-1.5">
                <div className="flex justify-between text-[8px] font-black uppercase text-agency-ink tracking-widest">
                  <span>{tone.label}</span>
                  <span className="text-agency-accent">{tone.score}%</span>
                </div>
                <div className="h-1 w-full bg-agency-bg rounded-full overflow-hidden">
                  <div className="h-full bg-agency-accent" style={{ width: `${tone.score}%` }} />
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => onAction('Opening AI Voice training portal...', 'info')}
            className="w-full mt-8 py-2 bg-agency-bg border border-agency-border rounded-xl text-[9px] font-black uppercase tracking-widest text-agency-ink hover:bg-white transition-colors"
          >
            Train Custom Head
          </button>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          {mediaCenterAssets.map((asset) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              key={asset.asset_id} 
              className="panel-card overflow-hidden group cursor-pointer border-transparent hover:border-agency-accent transition-all relative"
            >
              <div className="aspect-video bg-agency-bg relative overflow-hidden flex items-center justify-center">
                {asset.asset_type === 'video' && <Video className="w-8 h-8 text-agency-muted group-hover:text-agency-accent transition-colors" />}
                {asset.asset_type === 'audio' && <Volume2 className="w-8 h-8 text-agency-muted group-hover:text-agency-accent transition-colors" />}
                {asset.asset_type === 'image' && <ImageIcon className="w-8 h-8 text-agency-muted group-hover:text-agency-accent transition-colors" />}
                {!['video', 'audio', 'image'].includes(asset.asset_type) && <FileJson className="w-8 h-8 text-agency-muted group-hover:text-agency-accent transition-colors" />}
                
                <div className="absolute top-3 right-3 flex gap-2">
                   <button 
                     onClick={(e) => {
                       e.stopPropagation();
                       deleteMediaAsset(asset.asset_id);
                     }}
                     className="p-1.5 bg-white/80 hover:bg-red-50 text-agency-muted hover:text-red-500 rounded-lg border border-transparent hover:border-red-100 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                   >
                     <Trash2 className="w-3.5 h-3.5" />
                   </button>
                </div>

                <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-md rounded text-[9px] font-bold text-white uppercase tracking-widest">
                  {asset.asset_type}
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-sm text-agency-ink group-hover:text-agency-accent transition-colors line-clamp-1 truncate">{asset.asset_name}</h4>
                  <div className="text-[10px] font-bold text-emerald-600 whitespace-nowrap">{asset.status}</div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                   {asset.usage_rights.platforms_approved.map(p => (
                     <span key={p} className="text-[7px] px-1 py-0.5 bg-agency-bg border border-agency-border rounded font-black uppercase text-agency-muted">{p}</span>
                   ))}
                </div>

                <div className="pt-4 border-t border-agency-border flex justify-between items-center mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-agency-ink">{asset.production_version} BUILD</span>
                    <span className="text-[7px] text-agency-muted font-bold uppercase tracking-tighter">Tone: {asset.brand_alignment.detected_tone}</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(asset.cdn_url, '_blank');
                        onAction(`Opening CDN stream for ${asset.asset_id}`, 'info');
                      }}
                      className="text-agency-muted p-1 hover:bg-agency-bg rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAction(`Downloading asset: ${asset.asset_name}...`, 'success');
                      }}
                      className="text-agency-accent p-1 hover:bg-agency-accent/10 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {mediaCenterAssets.length === 0 && !isMediaCenterLoading && (
            <div className="col-span-full p-20 text-center bg-agency-bg border-4 border-dashed border-agency-border rounded-3xl">
               <Layers className="w-12 h-12 text-agency-muted mx-auto mb-4 opacity-20" />
               <p className="text-sm font-bold text-agency-muted uppercase tracking-[0.2em]">Asset Cluster Empty</p>
               <button 
                onClick={() => setIsIngesting(true)}
                className="mt-4 px-6 py-3 bg-agency-ink text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-agency-accent transition-all"
               >
                 Bootstrap Library
               </button>
            </div>
          )}

          {isMediaCenterLoading && (
             <div className="col-span-full p-20 text-center">
                <RefreshCw className="w-8 h-8 text-agency-accent mx-auto mb-4 animate-spin" />
                <p className="text-xs font-bold text-agency-muted uppercase tracking-widest">Synchronizing Multimodal Storage...</p>
             </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="panel-card p-6 bg-slate-900 border-slate-800 text-white">
          <h3 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400" /> Multi-Voice
          </h3>
          <div className="space-y-4">
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400">Neutral Neural</span>
                <span className="text-[8px] font-black bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded">Active</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full">
                <div className="h-full bg-blue-500" style={{ width: '100%' }} />
              </div>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2 opacity-60">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400">Clone: TechFlow-CEO</span>
                <span className="text-[8px] font-black bg-slate-500/20 text-slate-400 px-1.5 py-0.5 rounded">In-Training</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-agency-accent" style={{ width: '85%' }} />
              </div>
            </div>
          </div>
          <button className="w-full mt-6 py-2 bg-white/10 border border-white/10 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-white/20 transition-all">Generate Voiceover</button>
        </div>

        <div className="panel-card p-6 border-agency-accent/20">
          <h3 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <Table2 className="w-4 h-4 text-agency-accent" /> Data Export
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 bg-agency-bg border border-agency-border rounded-xl hover:border-agency-accent transition-all group">
              <Code2 className="w-4 h-4 mx-auto text-agency-muted group-hover:text-agency-accent mb-1" />
              <div className="text-[8px] font-black uppercase text-agency-muted">JSON / SQL</div>
            </button>
            <button className="p-3 bg-agency-bg border border-agency-border rounded-xl hover:border-agency-accent transition-all group">
              <Table2 className="w-4 h-4 mx-auto text-agency-muted group-hover:text-agency-accent mb-1" />
              <div className="text-[8px] font-black uppercase text-agency-muted">CSV / XL</div>
            </button>
          </div>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
            <p className="text-[9px] text-blue-700 leading-tight">Structured Content Calendar ready for CRM / Webhook push.</p>
          </div>
        </div>
      </div>

      {/* Audio Ingest Modal */}
      <AnimatePresence>
        {isAudioModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isProcessingAudio && setIsAudioModalOpen(false)}
              className="absolute inset-0 bg-agency-ink/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-agency-border flex flex-col"
            >
              <div className="p-6 border-b border-agency-border flex justify-between items-center bg-agency-bg/50">
                <div>
                  <h3 className="text-xl font-bold font-display uppercase tracking-tight text-agency-ink">Multimodal Audio Ingest</h3>
                  <p className="text-[10px] text-agency-muted font-bold uppercase tracking-widest mt-1">Deep Context Extraction & Sentiment scoring</p>
                </div>
                <button 
                  onClick={() => setIsAudioModalOpen(false)}
                  disabled={isProcessingAudio}
                  className="p-2 hover:bg-white rounded-full text-agency-muted transition-colors border border-transparent hover:border-agency-border"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 space-y-6">
                {!audioInferenceResult ? (
                  <div className={cn(
                    "border-2 border-dashed border-agency-border rounded-2xl p-10 text-center transition-all",
                    selectedAudioFile ? "bg-agency-accent/5 border-agency-accent/30" : "hover:border-agency-accent/20"
                  )}>
                    <input 
                      type="file" 
                      id="audio-upload"
                      className="hidden"
                      accept=".mp3,.wav,.aac,.flac,.ogg,.m4a"
                      onChange={handleAudioFileChange}
                    />
                    <label htmlFor="audio-upload" className="cursor-pointer block space-y-4">
                      <div className="w-16 h-16 bg-agency-bg rounded-2xl flex items-center justify-center mx-auto border border-agency-border shadow-sm group-hover:scale-110 transition-transform">
                        <Mic className={cn("w-8 h-8", selectedAudioFile ? "text-agency-accent" : "text-agency-muted")} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-agency-ink">
                          {selectedAudioFile ? selectedAudioFile.name : "Select Audio Asset"}
                        </div>
                        <p className="text-[10px] text-agency-muted font-bold uppercase tracking-widest mt-1">
                          MP3, WAV, AAC, FLAC (Max 500MB)
                        </p>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500 text-white rounded-xl">
                          <Check className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-emerald-900 uppercase">Analysis Complete</div>
                          <div className="text-[10px] text-emerald-700 font-medium">Sentiment: {audioInferenceResult.analysis.sentiment}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] font-black uppercase text-emerald-600">Alignment Score</div>
                        <div className="text-lg font-bold text-emerald-900">{audioInferenceResult.analysis.brandVoiceScore}%</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-agency-muted">Transcription Preview</label>
                      <div className="p-4 bg-agency-bg rounded-xl border border-agency-border text-xs leading-relaxed italic text-agency-ink font-serif">
                        "{audioInferenceResult.analysis.transcriptionPreview}"
                      </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-agency-muted">Entity Graph Topics</label>
                       <div className="flex flex-wrap gap-2">
                         {audioInferenceResult.analysis.topics.map((t: string) => (
                           <span key={t} className="px-2 py-1 bg-white border border-agency-border rounded-lg text-[9px] font-bold text-agency-ink uppercase">
                             {t}
                           </span>
                         ))}
                       </div>
                    </div>
                  </div>
                )}

                {isProcessingAudio && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-agency-accent">
                      <span>Analyzing Audio Vectors...</span>
                      <span>{Math.floor(Math.random() * 20) + 70}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-agency-bg rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-agency-accent"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                      />
                    </div>
                    <div className="flex justify-center gap-4">
                      <div className="flex flex-col items-center">
                         <div className="w-1.5 h-1.5 bg-agency-accent rounded-full animate-ping" />
                         <span className="text-[7px] font-black uppercase mt-1">Transcribing</span>
                      </div>
                      <div className="flex flex-col items-center opacity-40">
                         <div className="w-1.5 h-1.5 bg-agency-muted rounded-full" />
                         <span className="text-[7px] font-black uppercase mt-1">Scoring</span>
                      </div>
                      <div className="flex flex-col items-center opacity-40">
                         <div className="w-1.5 h-1.5 bg-agency-muted rounded-full" />
                         <span className="text-[7px] font-black uppercase mt-1">Aligning</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-agency-border bg-agency-bg/50 flex gap-3">
                <button 
                  onClick={() => setIsAudioModalOpen(false)}
                  disabled={isProcessingAudio}
                  className="flex-1 py-4 bg-white border border-agency-border rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/80 transition-all text-agency-ink"
                >
                  {audioInferenceResult ? "Dismiss" : "Cancel"}
                </button>
                {!audioInferenceResult && (
                  <button 
                    onClick={executeAudioIngest}
                    disabled={isProcessingAudio || !selectedAudioFile}
                    className="flex-[2] py-4 bg-agency-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-agency-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale"
                  >
                    {isProcessingAudio ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Mic className="w-4 h-4" />}
                    {isProcessingAudio ? "Ingesting..." : "Execute Ingest"}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Video Scene Scan Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isProcessingVideo && setIsVideoModalOpen(false)}
              className="absolute inset-0 bg-agency-ink/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-agency-border flex flex-col"
            >
              <div className="p-6 border-b border-agency-border flex justify-between items-center bg-agency-bg/50">
                <div>
                  <h3 className="text-xl font-bold font-display uppercase tracking-tight text-agency-ink">Video Scene Scan</h3>
                  <p className="text-[10px] text-agency-muted font-bold uppercase tracking-widest mt-1">Object detection & Brand-safety segmentation</p>
                </div>
                <button 
                  onClick={() => setIsVideoModalOpen(false)}
                  disabled={isProcessingVideo}
                  className="p-2 hover:bg-white rounded-full text-agency-muted transition-colors border border-transparent hover:border-agency-border"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 space-y-6">
                {!videoInferenceResult ? (
                  <div className={cn(
                    "border-2 border-dashed border-agency-border rounded-2xl p-10 text-center transition-all",
                    selectedVideoFile ? "bg-agency-accent/5 border-agency-accent/30" : "hover:border-agency-accent/20"
                  )}>
                    <input 
                      type="file" 
                      id="video-upload"
                      className="hidden"
                      accept=".mp4,.mov,.avi,.webm,.mkv"
                      onChange={handleVideoFileChange}
                    />
                    <label htmlFor="video-upload" className="cursor-pointer block space-y-4">
                      <div className="w-16 h-16 bg-agency-bg rounded-2xl flex items-center justify-center mx-auto border border-agency-border shadow-sm group-hover:scale-110 transition-transform">
                        <Video className={cn("w-8 h-8", selectedVideoFile ? "text-agency-accent" : "text-agency-muted")} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-agency-ink">
                          {selectedVideoFile ? selectedVideoFile.name : "Select Video Source"}
                        </div>
                        <p className="text-[10px] text-agency-muted font-bold uppercase tracking-widest mt-1">
                          MP4, MOV, AVI (Max 2GB)
                        </p>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500 text-white rounded-xl">
                          <Check className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-blue-900 uppercase">Scan Complete</div>
                          <div className="text-[10px] text-blue-700 font-medium">{videoInferenceResult.inference.scenes} Scenes segmented</div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {videoInferenceResult.inference.palette.map((color: string) => (
                          <div key={color} className="w-4 h-4 rounded-full border border-white" style={{ backgroundColor: color }} />
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-agency-muted">Detected Objects & Brands</label>
                       <div className="flex flex-wrap gap-2">
                         {videoInferenceResult.inference.objectsDetected.map((o: string) => (
                           <span key={o} className="px-2 py-1 bg-agency-bg border border-agency-border rounded-lg text-[9px] font-bold text-agency-ink uppercase">
                             {o}
                           </span>
                         ))}
                         {videoInferenceResult.inference.brands.map((b: string) => (
                           <span key={b} className="px-2 py-1 bg-agency-accent/10 border border-agency-accent/20 rounded-lg text-[9px] font-bold text-agency-accent uppercase">
                             {b}
                           </span>
                         ))}
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-agency-muted">Contextual Metadata</label>
                       <div className="flex flex-wrap gap-2">
                         {videoInferenceResult.inference.tags.map((t: string) => (
                           <span key={t} className="px-2 py-1 bg-white border border-agency-border rounded-lg text-[9px] font-bold text-agency-muted uppercase italic">
                             #{t}
                           </span>
                         ))}
                       </div>
                    </div>
                  </div>
                )}

                {isProcessingVideo && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-agency-accent">
                      <span>Extracting Keyframes...</span>
                      <span>Processing Buffer</span>
                    </div>
                    <div className="h-1.5 w-full bg-agency-bg rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-agency-accent"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 4, ease: "linear" }}
                      />
                    </div>
                    <div className="flex justify-center gap-6">
                       <div className="animate-pulse flex flex-col items-center">
                          <Eye className="w-4 h-4 text-agency-accent mb-1" />
                          <span className="text-[7px] font-black uppercase">OCR/Vision</span>
                       </div>
                       <div className="animate-pulse flex flex-col items-center [animation-delay:0.2s]">
                          <Palette className="w-4 h-4 text-agency-accent mb-1" />
                          <span className="text-[7px] font-black uppercase">Color Trace</span>
                       </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-agency-border bg-agency-bg/50 flex gap-3">
                <button 
                  onClick={() => setIsVideoModalOpen(false)}
                  disabled={isProcessingVideo}
                  className="flex-1 py-4 bg-white border border-agency-border rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/80 transition-all text-agency-ink"
                >
                  {videoInferenceResult ? "Scan Finished" : "Cancel"}
                </button>
                {!videoInferenceResult && (
                  <button 
                    onClick={executeVideoScan}
                    disabled={isProcessingVideo || !selectedVideoFile}
                    className="flex-[2] py-4 bg-agency-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-agency-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale"
                  >
                    {isProcessingVideo ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Video className="w-4 h-4" />}
                    {isProcessingVideo ? "Scanning..." : "Execute Scan"}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Tone Training Modal */}
      <AnimatePresence>
        {isToneModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isTrainingTone && setIsToneModalOpen(false)}
              className="absolute inset-0 bg-agency-ink/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-agency-border flex flex-col"
            >
              <div className="p-6 border-b border-agency-border flex justify-between items-center bg-agency-bg/50">
                <div>
                  <h3 className="text-xl font-bold font-display uppercase tracking-tight text-agency-ink">AI Tone Training</h3>
                  <p className="text-[10px] text-agency-muted font-bold uppercase tracking-widest mt-1">Vocal Profile Calibration & Brain-Head Synthesis</p>
                </div>
                <button 
                  onClick={() => setIsToneModalOpen(false)}
                  disabled={isTrainingTone}
                  className="p-2 hover:bg-white rounded-full text-agency-muted transition-colors border border-transparent hover:border-agency-border"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 space-y-6">
                {!trainingResult ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-agency-muted">Voice Profile Identifier</label>
                       <input 
                         type="text" 
                         value={voiceProfileName}
                         onChange={(e) => setVoiceProfileName(e.target.value)}
                         className="w-full px-4 py-3 bg-agency-bg border border-agency-border rounded-xl text-xs font-bold text-agency-ink focus:outline-none focus:border-agency-accent transition-colors"
                         placeholder="profile_v1_executive"
                       />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-agency-muted">Target Pitch</label>
                          <select className="w-full px-4 py-3 bg-agency-bg border border-agency-border rounded-xl text-xs font-bold text-agency-ink focus:outline-none">
                             <option>Low (Authoritative)</option>
                             <option selected>Mid (Neutral)</option>
                             <option>High (Energetic)</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-agency-muted">Pacing Rate</label>
                          <select className="w-full px-4 py-3 bg-agency-bg border border-agency-border rounded-xl text-xs font-bold text-agency-ink focus:outline-none">
                             <option>Slow (Narrative)</option>
                             <option selected>Normal</option>
                             <option>Fast (Promotional)</option>
                          </select>
                       </div>
                    </div>

                    <div className="p-6 border-2 border-dashed border-agency-border rounded-2xl text-center space-y-4">
                       <Ear className="w-8 h-8 text-agency-muted mx-auto" />
                       <div>
                         <div className="text-xs font-bold text-agency-ink">Reference Samples Loaded</div>
                         <p className="text-[9px] text-agency-muted font-bold uppercase tracking-tighter mt-1">4 High-fidelity WAV files detected in session</p>
                       </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-500 text-white rounded-xl">
                          <Check className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-amber-900 uppercase">Head ID: {trainingResult.head_id.substring(0, 8)}...</div>
                          <div className="text-[10px] text-amber-700 font-medium tracking-tight">Vocal architecture synthesized</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] font-black uppercase text-amber-600">Model Rank</div>
                        <div className="text-xs font-bold text-amber-900">Alpha-9</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase text-agency-muted">Dimensional Fine-Tuning</label>
                      <div className="space-y-5">
                        {[
                          { key: 'technical_expert', label: 'Technical / Expert', icon: ShieldCheckIcon },
                          { key: 'friendly_approachable', label: 'Friendly / Approachable', icon: Smile },
                          { key: 'high_efficiency', label: 'High Efficiency (Pace)', icon: Zap }
                        ].map((dim) => (
                          <div key={dim.key} className="space-y-2">
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase text-agency-ink">
                              <div className="flex items-center gap-2">
                                <dim.icon className="w-3 h-3 text-agency-muted" />
                                {dim.label}
                              </div>
                              <span className="text-agency-accent">{Math.round(toneDimensions[dim.key as keyof typeof toneDimensions] * 100)}%</span>
                            </div>
                            <input 
                              type="range"
                              min="0"
                              max="1"
                              step="0.01"
                              value={toneDimensions[dim.key as keyof typeof toneDimensions]}
                              onChange={(e) => setToneDimensions(prev => ({ ...prev, [dim.key]: parseFloat(e.target.value) }))}
                              className="w-full h-1 bg-agency-bg rounded-lg appearance-none cursor-pointer accent-agency-accent accent-agency-accent block"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-agency-muted">Apply To Neural Agents</label>
                      <div className="grid grid-cols-1 gap-2">
                        {['email-automation-agent', 'client-approval-agent', 'business-intelligence-agent'].map((agent) => (
                          <button 
                            key={agent}
                            onClick={() => setSelectedAgents(prev => prev.includes(agent) ? prev.filter(a => a !== agent) : [...prev, agent])}
                            className={cn(
                              "flex items-center justify-between p-3 rounded-xl border transition-all text-left",
                              selectedAgents.includes(agent) 
                                ? "bg-agency-accent/5 border-agency-accent/30 text-agency-ink" 
                                : "bg-white border-agency-border text-agency-muted hover:border-agency-accent/20"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <div className={cn("w-2 h-2 rounded-full", selectedAgents.includes(agent) ? "bg-agency-accent" : "bg-agency-border")} />
                              <span className="text-[10px] font-bold uppercase tracking-tight">{agent.replace(/-/g, ' ')}</span>
                            </div>
                            {selectedAgents.includes(agent) && <Check className="w-3 h-3 text-agency-accent" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {isTrainingTone && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-agency-accent">
                      <span>Generating Neural Head...</span>
                      <RefreshCw className="w-3 h-3 animate-spin" />
                    </div>
                    <div className="h-1.5 w-full bg-agency-bg rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-agency-accent"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 5, ease: "easeInOut" }}
                      />
                    </div>
                    <p className="text-[8px] text-agency-muted font-bold uppercase text-center">Calibrating spectral density and emotional resonance vectors</p>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-agency-border bg-agency-bg/50 flex gap-3">
                <button 
                  onClick={() => setIsToneModalOpen(false)}
                  disabled={isTrainingTone}
                  className="flex-1 py-4 bg-white border border-agency-border rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/80 transition-all text-agency-ink"
                >
                  {trainingResult ? "Close" : "Cancel"}
                </button>
                {trainingResult && (
                  <button 
                    onClick={applyToneAdjustments}
                    disabled={isAdjustingDimensions}
                    className="flex-[2] py-4 bg-agency-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-agency-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    {isAdjustingDimensions ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                    {isAdjustingDimensions ? "Syncing..." : "Sync Dimensional Profile"}
                  </button>
                )}
                {!trainingResult && (
                  <button 
                    onClick={executeToneTraining}
                    disabled={isTrainingTone}
                    className="flex-[2] py-4 bg-agency-ink text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-agency-ink/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    {isTrainingTone ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
                    {isTrainingTone ? "Processing..." : "Train Neural Head"}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Video Generation Modal */}
      <AnimatePresence>
        {isVideoGenModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isGeneratingVideo && setIsVideoGenModalOpen(false)}
              className="absolute inset-0 bg-agency-ink/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-agency-border flex flex-col"
            >
              <div className="p-6 border-b border-agency-border flex justify-between items-center bg-agency-bg/50">
                <div>
                  <h3 className="text-xl font-bold font-display uppercase tracking-tight text-agency-ink">Multimodal Video Gen</h3>
                  <p className="text-[10px] text-agency-muted font-bold uppercase tracking-widest mt-1">Cinematic Synthesis & Voice-Over Integration</p>
                </div>
                <button 
                  onClick={() => {
                    setIsVideoGenModalOpen(false);
                    setVideoGenResult(null);
                    setValidationResult(null);
                  }}
                  disabled={isGeneratingVideo}
                  className="p-2 hover:bg-white rounded-full text-agency-muted transition-colors border border-transparent hover:border-agency-border"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 space-y-6">
                {!videoGenResult ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-agency-muted">Creative Prompt / Narrative</label>
                       <textarea 
                         rows={3}
                         value={videoGenPrompt}
                         onChange={(e) => setVideoGenPrompt(e.target.value)}
                         className="w-full px-4 py-3 bg-agency-bg border border-agency-border rounded-xl text-xs font-bold text-agency-ink focus:outline-none focus:border-agency-accent transition-colors resize-none"
                         placeholder="Describe the cinematic output..."
                       />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-agency-muted">Output Specs</label>
                          <select className="w-full px-4 py-3 bg-agency-bg border border-agency-border rounded-xl text-xs font-bold text-agency-ink focus:outline-none">
                             <option>16:9 Cinematic (1080p)</option>
                             <option>9:16 Social (4K)</option>
                             <option>1:1 Square (1080p)</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-agency-muted">Voice Profile</label>
                          <select className="w-full px-4 py-3 bg-agency-bg border border-agency-border rounded-xl text-xs font-bold text-agency-ink focus:outline-none">
                             <option>Alpha-9 (Executive)</option>
                             <option>Beta-2 (Friendly)</option>
                             <option>Gamma-4 (Authentic)</option>
                          </select>
                       </div>
                    </div>

                    <div className="p-4 bg-agency-bg border border-agency-border rounded-2xl">
                       <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-white border border-agency-border rounded-lg">
                             <Palette className="w-4 h-4 text-agency-accent" />
                          </div>
                          <div>
                             <div className="text-[10px] font-black uppercase text-agency-ink">Context Anchors</div>
                             <div className="text-[8px] text-agency-muted font-bold">Extraction from Brand Brief 2.4</div>
                          </div>
                       </div>
                       <div className="flex gap-2">
                          {['#2A2A2A', '#F5F5F5', '#E8A87C'].map(c => (
                            <div key={c} className="h-6 flex-1 rounded-md border border-agency-border shadow-sm" style={{ backgroundColor: c }} />
                          ))}
                       </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 text-center">
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2 border-2 border-emerald-100 shadow-xl shadow-emerald-500/10">
                       <Check className="w-10 h-10" />
                    </div>
                    <div>
                       <h4 className="text-sm font-bold text-agency-ink uppercase">Synthesis Queue Initialized</h4>
                       <p className="text-[10px] text-agency-muted font-bold uppercase mt-1 tracking-widest">Generation ID: {videoGenResult.generation_id}</p>
                    </div>

                    <div className="p-4 bg-agency-bg border border-agency-border rounded-xl text-left space-y-4">
                       <div className="flex justify-between items-center">
                          <div className="text-[10px] font-black uppercase text-agency-muted">Multimodal Integrity</div>
                          <div className="text-xs font-bold text-agency-accent">{Math.round(videoGenResult.validity_score * 100)}%</div>
                       </div>
                       <div className="h-2 w-full bg-white border border-agency-border rounded-full overflow-hidden">
                          <div className="h-full bg-agency-accent" style={{ width: `${videoGenResult.validity_score * 100}%` }} />
                       </div>
                       
                       <div className="flex items-center gap-3 p-3 bg-white border border-agency-border rounded-xl group cursor-pointer hover:border-agency-accent transition-all">
                          <div className="p-2 bg-agency-bg rounded-lg">
                             <Play className="w-4 h-4 text-agency-accent" />
                          </div>
                          <div className="flex-1">
                             <div className="text-[10px] font-bold text-agency-ink uppercase">Preview (Low-Res)</div>
                             <div className="text-[8px] text-agency-muted">Rendering first 5 seconds...</div>
                          </div>
                       </div>
                    </div>

                    {!validationResult && !isVideoValidating && (
                      <button 
                        onClick={() => executeValidation(videoGenResult.generation_id)}
                        className="w-full py-3 bg-white border border-agency-border rounded-xl text-[10px] font-black uppercase tracking-widest text-agency-ink hover:bg-agency-bg transition-all flex items-center justify-center gap-2"
                      >
                         <ShieldCheckIcon className="w-4 h-4 text-agency-accent" /> Run Brand Accuracy Sweep
                      </button>
                    )}

                    {isVideoValidating && (
                       <div className="p-4 bg-agency-bg border border-agency-border rounded-xl flex items-center justify-center gap-3">
                          <RefreshCw className="w-4 h-4 animate-spin text-agency-accent" />
                          <span className="text-[10px] font-bold text-agency-muted uppercase animate-pulse">Running Multimodal Compliance...</span>
                       </div>
                    )}

                    {validationResult && (
                       <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl space-y-3 animate-in zoom-in-95 duration-300">
                          <div className="flex justify-between items-center">
                             <div className="flex items-center gap-2">
                                <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />
                                <span className="text-[10px] font-black uppercase text-emerald-900">Compliance Passed</span>
                             </div>
                             <span className="text-xs font-bold text-emerald-600">Score: {Math.round(validationResult.validity_score * 100)}%</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                             {validationResult.checks_passed.map((check: string) => (
                               <span key={check} className="px-2 py-0.5 bg-white border border-emerald-200 text-emerald-700 text-[8px] font-black uppercase rounded-md">
                                 {check.replace(/_/g, ' ')}
                               </span>
                             ))}
                          </div>
                       </div>
                    )}
                  </div>
                )}

                {isGeneratingVideo && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-agency-accent">
                      <span>Neural Rendering in progress...</span>
                      <RefreshCw className="w-3 h-3 animate-spin" />
                    </div>
                    <div className="h-1.5 w-full bg-agency-bg rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-agency-accent"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 8, ease: "easeInOut" }}
                      />
                    </div>
                    <p className="text-[8px] text-agency-muted font-bold uppercase text-center">Assembling latent space vectors & spectral audio sync</p>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-agency-border bg-agency-bg/50 flex gap-3">
                <button 
                  onClick={() => {
                    setIsVideoGenModalOpen(false);
                    setVideoGenResult(null);
                    setValidationResult(null);
                  }}
                  disabled={isGeneratingVideo}
                  className="flex-1 py-4 bg-white border border-agency-border rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/80 transition-all text-agency-ink"
                >
                  {videoGenResult ? "Close" : "Cancel"}
                </button>
                {!videoGenResult && (
                  <button 
                    onClick={executeVideoGen}
                    disabled={isGeneratingVideo}
                    className="flex-[2] py-4 bg-agency-ink text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-agency-ink/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    {isGeneratingVideo ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Clapperboard className="w-4 h-4" />}
                    {isGeneratingVideo ? "Synthesizing..." : "Generate Cinematic"}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Audio Synthesis Modal */}
      <AnimatePresence>
        {isAudioSynthModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSynthesizingAudio && setIsAudioSynthModalOpen(false)}
              className="absolute inset-0 bg-agency-ink/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-agency-border flex flex-col"
            >
              <div className="p-6 border-b border-agency-border flex justify-between items-center bg-agency-bg/50">
                <div>
                  <h3 className="text-xl font-bold font-display uppercase tracking-tight text-agency-ink">Audio Vox Master</h3>
                  <p className="text-[10px] text-agency-muted font-bold uppercase tracking-widest mt-1">Spectral Synthesis & Emotional Calibration</p>
                </div>
                <button 
                  onClick={() => setIsAudioSynthModalOpen(false)}
                  disabled={isSynthesizingAudio}
                  className="p-2 hover:bg-white rounded-full text-agency-muted transition-colors border border-transparent hover:border-agency-border"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 space-y-6">
                {!audioSynthResult ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-agency-muted">Narration Script</label>
                       <textarea 
                         rows={4}
                         value={audioSynthScript}
                         onChange={(e) => setAudioSynthScript(e.target.value)}
                         className="w-full px-4 py-3 bg-agency-bg border border-agency-border rounded-xl text-xs font-bold text-agency-ink focus:outline-none focus:border-agency-accent transition-colors resize-none"
                         placeholder="Lead script for synthesis..."
                       />
                    </div>
                    
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase text-agency-muted">Vocal Profile: Alpha-9</label>
                       <div className="grid grid-cols-3 gap-3">
                          {[
                            { label: 'Warmth', val: '65%' },
                            { label: 'Authority', val: '80%' },
                            { label: 'Energy', val: '55%' }
                          ].map(trait => (
                            <div key={trait.label} className="p-3 bg-agency-bg border border-agency-border rounded-xl text-center">
                               <div className="text-[8px] font-black uppercase text-agency-muted mb-1">{trait.label}</div>
                               <div className="text-xs font-bold text-agency-ink">{trait.val}</div>
                            </div>
                          ))}
                       </div>
                    </div>

                    <div className="p-4 bg-agency-bg border border-agency-border rounded-2xl flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <Music className="w-5 h-5 text-agency-accent" />
                          <div>
                             <div className="text-[10px] font-black uppercase text-agency-ink">BGM Integration</div>
                             <div className="text-[8px] text-agency-muted font-bold">Upbeat Minimal (Ducked -12dB)</div>
                          </div>
                       </div>
                       <div className="w-10 h-5 bg-agency-accent rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                       </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500 text-white rounded-xl">
                          <Volume2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-emerald-900 uppercase">Master Export Ready</div>
                          <div className="text-[10px] text-emerald-700 font-medium">Duration: {audioSynthResult.duration_seconds}s</div>
                        </div>
                      </div>
                      <Check className="w-5 h-5 text-emerald-500" />
                    </div>

                    <div className="p-6 bg-agency-bg rounded-2xl border border-agency-border relative overflow-hidden group">
                       <div className="flex items-center justify-between mb-4">
                          <div className="text-[10px] font-black uppercase text-agency-ink">Spectral Waveform</div>
                          <div className="text-[9px] font-bold text-agency-muted uppercase">48kHz / 24-bit</div>
                       </div>
                       <div className="flex items-end gap-1 h-12 mb-4">
                          {[40, 70, 45, 90, 65, 30, 85, 55, 75, 40, 60, 95, 50, 80].map((h, i) => (
                            <motion.div 
                              key={i}
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{ delay: i * 0.05, duration: 0.5 }}
                              className="flex-1 bg-agency-accent rounded-full opacity-40 group-hover:opacity-100 transition-opacity"
                            />
                          ))}
                       </div>
                       <button className="w-full py-3 bg-white border border-agency-border rounded-xl flex items-center justify-center gap-2 group/btn">
                          <Play className="w-4 h-4 text-agency-ink fill-current group-hover/btn:text-agency-accent transition-colors" />
                          <span className="text-[10px] font-black uppercase text-agency-ink">Preview Master</span>
                       </button>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-bold uppercase text-agency-muted">
                       <span>Production Ver: {audioSynthResult.production_version}</span>
                       <span>Validity: {Math.round(audioSynthResult.validity_score * 100)}%</span>
                    </div>
                  </div>
                )}

                {isSynthesizingAudio && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-agency-accent">
                      <span>Synthesizing Vocal Master...</span>
                      <RefreshCw className="w-3 h-3 animate-spin" />
                    </div>
                    <div className="h-1.5 w-full bg-agency-bg rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-agency-accent"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 5, ease: "easeInOut" }}
                      />
                    </div>
                    <p className="text-[8px] text-agency-muted font-bold uppercase text-center">Calibrating emotional tonal peaks and spectral clarity</p>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-agency-border bg-agency-bg/50 flex gap-3">
                <button 
                  onClick={() => {
                    setIsAudioSynthModalOpen(false);
                    setAudioSynthResult(null);
                  }}
                  disabled={isSynthesizingAudio}
                  className="flex-1 py-4 bg-white border border-agency-border rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/80 transition-all text-agency-ink"
                >
                  {audioSynthResult ? "Close" : "Cancel"}
                </button>
                {!audioSynthResult && (
                  <button 
                    onClick={executeAudioSynthesis}
                    disabled={isSynthesizingAudio}
                    className="flex-[2] py-4 bg-agency-ink text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-agency-ink/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    {isSynthesizingAudio ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Mic className="w-4 h-4" />}
                    {isSynthesizingAudio ? "Synthesizing..." : "Generate Master"}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Vocal Identity Modal */}
      <AnimatePresence>
        {isIdentityModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isActivatingIdentity && setIsIdentityModalOpen(false)}
              className="absolute inset-0 bg-agency-ink/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-agency-border flex flex-col"
            >
              <div className="p-6 border-b border-agency-border flex justify-between items-center bg-agency-bg/50">
                <div>
                  <h3 className="text-xl font-bold font-display uppercase tracking-tight text-agency-ink">Vocal Identity Library</h3>
                  <p className="text-[10px] text-agency-muted font-bold uppercase tracking-widest mt-1">Manage Neural Cloning & Acoustic Thumbprints</p>
                </div>
                <button 
                  onClick={() => setIsIdentityModalOpen(false)}
                  disabled={isActivatingIdentity}
                  className="p-2 hover:bg-white rounded-full text-agency-muted transition-colors border border-transparent hover:border-agency-border"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-1 gap-4">
                  {vocalIdentities.map(vi => (
                    <div key={vi.identity_id} className={cn(
                      "p-5 rounded-2xl border transition-all relative overflow-hidden",
                      vi.status === 'active' ? "bg-agency-accent/5 border-agency-accent" : "bg-agency-bg border-agency-border hover:border-agency-accent/30"
                    )}>
                      {vi.status === 'active' && (
                        <div className="absolute top-0 right-0 px-3 py-1 bg-agency-accent text-white text-[8px] font-black uppercase tracking-tighter rounded-bl-xl">
                          Active Profiling
                        </div>
                      )}
                      
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center shadow-lg",
                            vi.status === 'active' ? "bg-agency-accent text-white" : "bg-white border border-agency-border text-agency-muted"
                          )}>
                             <Fingerprint className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-agency-ink uppercase tracking-tight">{vi.name}</h4>
                            <div className="flex gap-2 mt-1">
                               {vi.tags.map(tag => (
                                 <span key={tag} className="text-[8px] px-1.5 py-0.5 bg-white border border-agency-border rounded font-bold uppercase text-agency-muted">{tag}</span>
                               ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[9px] font-black uppercase text-agency-muted">Clarity</div>
                          <div className="text-lg font-black text-agency-ink tracking-tighter">{Math.round(vi.characteristics.clarity_score * 100)}%</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-5">
                         {[
                           { label: 'Warmth', val: `${Math.round(vi.characteristics.warmth_score * 100)}%` },
                           { label: 'Authority', val: `${Math.round(vi.characteristics.authority_score * 100)}%` },
                           { label: 'Pace', val: `${vi.characteristics.pace_wpm} WPM` }
                         ].map(stat => (
                           <div key={stat.label} className="text-center p-2 bg-white border border-agency-border/50 rounded-xl">
                              <div className="text-[7px] font-black uppercase text-agency-muted mb-1">{stat.label}</div>
                              <div className="text-[10px] font-bold text-agency-ink tracking-tight">{stat.val}</div>
                           </div>
                         ))}
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => activateVocalIdentity(vi.identity_id)}
                          disabled={isActivatingIdentity || vi.status === 'active'}
                          className={cn(
                            "flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                            vi.status === 'active' 
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-default" 
                              : "bg-agency-ink text-white hover:bg-agency-accent"
                          )}
                        >
                          {vi.status === 'active' ? 'Deployment Active' : 'Activate Identity'}
                        </button>
                        <button className="px-4 py-2 bg-white border border-agency-border rounded-lg text-[9px] font-black uppercase text-agency-muted hover:border-agency-accent transition-all">
                           Profile Calibration
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-agency-border bg-agency-bg/50 flex justify-between items-center">
                <div className="text-[9px] font-bold text-agency-muted uppercase tracking-widest flex items-center gap-2">
                   <ShieldCheckIcon className="w-3 h-3 text-agency-accent" /> Encrypted Neural Vector Storage
                </div>
                <button className="px-4 py-2 bg-agency-accent text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-[1.02] transition-transform flex items-center gap-2">
                   Create New Clone <Mic className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ClientsView = ({ onAction }: { onAction: (name: string, type?: string) => void }) => (
  <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
    <div className="flex justify-between items-center text-agency-ink">
      <div>
        <h2 className="text-2xl font-bold font-display uppercase tracking-tight">Accounts & Partners</h2>
        <p className="text-xs text-agency-muted font-bold uppercase tracking-widest mt-1">Multi-Tenant Client Portal Access Control</p>
      </div>
      <button 
        onClick={() => onAction('Initializing new client onboarding flow...', 'info')}
        className="px-4 py-2 bg-agency-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2"
      >
        <Plus className="w-3.5 h-3.5" /> Add Account
      </button>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 panel-card p-6 border-l-4 border-l-agency-accent">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-bold text-lg font-display uppercase tracking-tight">Prospect Intelligence Engine</h3>
            <p className="text-xs text-agency-muted">Autonomous lead identification & automated proposal generation.</p>
          </div>
          <button 
            onClick={() => onAction('Scanning high-intent industries for lead candidates...', 'info')}
            className="px-3 py-1.5 bg-agency-bg border border-agency-border rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors"
          >
            Mine New Prospects
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-agency-border">
                <th className="pb-3 text-[9px] font-black uppercase tracking-widest text-agency-muted px-2">Potential Client</th>
                <th className="pb-3 text-[9px] font-black uppercase tracking-widest text-agency-muted px-2">Growth Score</th>
                <th className="pb-3 text-[9px] font-black uppercase tracking-widest text-agency-muted px-2">Est. Ad Spend</th>
                <th className="pb-3 text-[9px] font-black uppercase tracking-widest text-agency-muted px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-agency-border">
              {[
                { name: 'Aurora Health Tech', score: 94, spend: '$25,000/mo', intent: 'High' },
                { name: 'Nebula Logistics', score: 82, spend: '$12,500/mo', intent: 'Rising' },
                { name: 'Zenith Retail Group', score: 78, spend: '$45,000/mo', intent: 'High' },
              ].map((prospect) => (
                <tr key={prospect.name} className="group hover:bg-agency-bg transition-colors">
                  <td className="py-4 px-2">
                    <div className="text-xs font-bold text-agency-ink">{prospect.name}</div>
                    <div className="text-[9px] text-agency-muted font-bold uppercase tracking-tighter">{prospect.intent} Intent</div>
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1 bg-white border border-agency-border rounded-full overflow-hidden">
                        <div className="h-full bg-agency-accent" style={{ width: `${prospect.score}%` }} />
                      </div>
                      <span className="text-[10px] font-bold">{prospect.score}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-xs font-mono font-bold text-agency-ink">{prospect.spend}</td>
                  <td className="py-4 px-2 text-right">
                    <button 
                      onClick={() => onAction(`Generating autonomous marketing proposal for ${prospect.name}...`, 'success')}
                      className="px-2 py-1 bg-agency-accent/10 border border-agency-accent/20 rounded text-[9px] font-black uppercase text-agency-accent hover:bg-agency-accent hover:text-white transition-all"
                    >
                      Draft Proposal
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel-card p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-50 border border-blue-100">
              <BadgeCheck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold font-display uppercase tracking-tight">Onboarding Bot</h3>
              <p className="text-[10px] uppercase tracking-widest text-agency-muted font-bold">24/7 Automated Agent</p>
            </div>
          </div>
          <div className="p-4 bg-agency-bg rounded-xl border border-agency-border space-y-4">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-lg bg-agency-accent flex items-center justify-center text-white shrink-0">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <div className="text-[11px] font-medium leading-relaxed bg-white p-2 rounded-lg border border-agency-border">
                I've detected a new lead from Zenith Retail. Should I initiate the autonomous discovery sequence?
              </div>
            </div>
            <div className="flex justify-end">
              <div className="text-[11px] font-bold uppercase tracking-widest text-agency-accent border-b border-agency-accent cursor-pointer">Yes, begin sequence</div>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-agency-border">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-black uppercase text-agency-muted">Conversion Efficiency</span>
            <span className="text-xs font-bold text-emerald-600">88%</span>
          </div>
          <div className="h-1.5 w-full bg-agency-bg rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: '88%' }} />
          </div>
          <p className="text-[9px] text-agency-muted mt-2">White-label agents have successfully qualified 8 out of the last 10 prospects autonomously.</p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-6">
      {CLIENTS.map((client) => (
        <div key={client.id} className="panel-card overflow-hidden">
          <div className="p-6 border-b border-agency-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-agency-bg flex items-center justify-center border border-agency-border">
                <Users className="w-6 h-6 text-agency-accent" />
              </div>
              <div>
                <h3 className="font-bold text-lg font-display">{client.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-agency-muted">{client.industry}</span>
                  <div className="w-1 h-1 rounded-full bg-agency-border" />
                  <span className={cn(
                    "text-[10px] font-bold uppercase px-1.5 py-0.5 rounded",
                    client.status === 'active' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                  )}>{client.status}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-agency-muted">Contract Value</div>
                <div className="text-sm font-bold text-agency-ink">{formatCurrency(client.contractValue)}/mo</div>
              </div>
              <button 
                onClick={() => onAction(`Opening profile for ${client.name}...`, 'info')}
                className="px-4 py-2 bg-agency-bg border border-agency-border rounded-lg text-xs font-bold hover:bg-white transition-colors"
              >
                View Profile
              </button>
            </div>
          </div>
          
          {client.paidMedia ? (
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* PPC Panel */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-agency-accent" />
                  <h4 className="text-xs font-bold uppercase tracking-widest text-agency-ink">Paid Search (PPC)</h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-3 bg-agency-bg rounded-lg">
                    <div className="text-[10px] text-agency-muted font-bold uppercase mb-1">Spend</div>
                    <div className="text-sm font-bold">{formatCurrency(client.paidMedia.ppc.spend)}</div>
                  </div>
                  <div className="p-3 bg-agency-bg rounded-lg">
                    <div className="text-[10px] text-agency-muted font-bold uppercase mb-1">Clicks</div>
                    <div className="text-sm font-bold">{client.paidMedia.ppc.clicks.toLocaleString()}</div>
                  </div>
                  <div className="p-3 bg-agency-bg rounded-lg">
                    <div className="text-[10px] text-agency-muted font-bold uppercase mb-1">Conv.</div>
                    <div className="text-sm font-bold">{client.paidMedia.ppc.conversions}</div>
                  </div>
                  <div className="p-3 bg-agency-bg rounded-lg">
                    <div className="text-[10px] text-agency-muted font-bold uppercase mb-1">Avg. CPC</div>
                    <div className="text-sm font-bold">${client.paidMedia.ppc.avgCpc}</div>
                  </div>
                </div>
              </div>

              {/* Social Ads Panel */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-agency-accent" />
                  <h4 className="text-xs font-bold uppercase tracking-widest text-agency-ink">Paid Social Ads</h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-3 bg-agency-bg rounded-lg">
                    <div className="text-[10px] text-agency-muted font-bold uppercase mb-1">Spend</div>
                    <div className="text-sm font-bold">{formatCurrency(client.paidMedia.social.spend)}</div>
                  </div>
                  <div className="p-3 bg-agency-bg rounded-lg">
                    <div className="text-[10px] text-agency-muted font-bold uppercase mb-1">Impressions</div>
                    <div className="text-sm font-bold">{(client.paidMedia.social.impressions / 1000).toFixed(1)}k</div>
                  </div>
                  <div className="p-3 bg-agency-bg rounded-lg">
                    <div className="text-[10px] text-agency-muted font-bold uppercase mb-1">Engagement</div>
                    <div className="text-sm font-bold">{(client.paidMedia.social.engagement / 1000).toFixed(1)}k</div>
                  </div>
                  <div className="p-3 bg-agency-bg rounded-lg">
                    <div className="text-[10px] text-agency-muted font-bold uppercase mb-1">ROAS</div>
                    <div className="text-sm font-bold text-agency-accent">{client.paidMedia.social.roas}x</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-agency-bg/50 flex items-center justify-center border-t border-agency-border">
              <div className="text-center py-4">
                <div className="text-xs font-bold text-agency-muted uppercase tracking-widest mb-1">Paid Media Core Inactive</div>
                <p className="text-[10px] text-agency-muted">Awaiting campaign initialization from Growth Department.</p>
                <button 
                  onClick={() => onAction(`Initializing paid media strategy for ${client.name}...`, 'success')}
                  className="mt-4 px-3 py-1.5 bg-agency-accent text-white rounded text-[10px] font-bold uppercase tracking-widest shadow-sm"
                >
                  Initialize Paid Strategy
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

// --- App Layout ---

const AgencyConfigView = ({ 
  branding, 
  setBranding, 
  subscription, 
  setSubscription, 
  onAction 
}: { 
  branding: any, 
  setBranding: (b: any) => void, 
  subscription: any, 
  setSubscription: (s: any) => void,
  onAction: (name: string, type?: string) => void 
}) => (
  <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
    <div className="flex justify-between items-center text-agency-ink">
      <div>
        <h2 className="text-2xl font-bold font-display uppercase tracking-tight">Agency Configuration</h2>
        <p className="text-xs text-agency-muted font-bold uppercase tracking-widest mt-1">Tenant Settings & White-Label Management</p>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={() => onAction('Syncing branding to all client portals...', 'success')}
          className="px-4 py-2 bg-agency-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest"
        >
          Push Global Branding
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Branding & White-Label */}
      <div className="lg:col-span-2 space-y-6">
        <div className="panel-card p-6">
          <h3 className="font-bold text-lg font-display mb-6 flex items-center gap-2">
            <Palette className="w-5 h-5 text-agency-accent" /> Brand Identity
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-agency-muted tracking-widest">Agency Name</label>
              <input 
                type="text" 
                value={branding.agencyName} 
                onChange={(e) => setBranding({ ...branding, agencyName: e.target.value })}
                className="w-full bg-agency-bg border border-agency-border rounded-xl px-4 py-3 text-sm font-bold text-agency-ink focus:border-agency-accent outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-agency-muted tracking-widest">Tagline</label>
              <input 
                type="text" 
                value={branding.tagline} 
                onChange={(e) => setBranding({ ...branding, tagline: e.target.value })}
                className="w-full bg-agency-bg border border-agency-border rounded-xl px-4 py-3 text-sm font-bold text-agency-ink focus:border-agency-accent outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-agency-muted tracking-widest">Custom Domain</label>
              <input 
                type="text" 
                value={branding.domain} 
                onChange={(e) => setBranding({ ...branding, domain: e.target.value })}
                className="w-full bg-agency-bg border border-agency-border rounded-xl px-4 py-3 text-sm font-bold text-agency-ink focus:border-agency-accent outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-agency-muted tracking-widest">Primary Color</label>
              <div className="flex gap-3">
                <input 
                  type="color" 
                  value={branding.primaryColor} 
                  onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                  className="w-12 h-12 rounded-xl border border-agency-border p-1 bg-white cursor-pointer"
                />
                <input 
                  type="text" 
                  value={branding.primaryColor} 
                  readOnly
                  className="flex-1 bg-agency-bg border border-agency-border rounded-xl px-4 py-3 text-sm font-mono font-bold text-agency-ink"
                />
              </div>
            </div>
          </div>
          <div className="mt-8 p-6 bg-agency-bg rounded-2xl border-2 border-dashed border-agency-border text-center">
            <Upload className="w-8 h-8 text-agency-muted mx-auto mb-3" />
            <div className="text-xs font-bold text-agency-ink">Upload Brand Logo</div>
            <p className="text-[10px] text-agency-muted mt-1">Recommended size: 512x512px. SVG or PNG.</p>
          </div>
        </div>

        <div className="panel-card p-6">
          <h3 className="font-bold text-lg font-display mb-6 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-agency-accent" /> Subscription Tiers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SUBSCRIPTION_TIERS.map((tier) => (
              <button 
                key={tier.id}
                onClick={() => {
                  setSubscription(tier);
                  onAction(`Upgraded to ${tier.name} tier.`, 'success');
                }}
                className={cn(
                  "p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden group",
                  subscription.id === tier.id 
                    ? "bg-agency-accent border-agency-accent text-white" 
                    : "bg-white border-agency-border hover:border-agency-accent"
                )}
              >
                {subscription.id === tier.id && (
                  <div className="absolute top-0 right-0 p-2">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                )}
                <div className={cn("text-[10px] font-black uppercase tracking-widest mb-1", subscription.id === tier.id ? "text-white/70" : "text-agency-muted")}>Plan Tier</div>
                <div className="text-xl font-bold font-display">{tier.name}</div>
                <div className={cn("text-2xl font-black mt-2", subscription.id === tier.id ? "text-white" : "text-agency-accent")}>{tier.price}</div>
                <ul className="mt-4 space-y-2">
                  {tier.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-[10px] font-bold">
                      <div className={cn("w-1 h-1 rounded-full", subscription.id === tier.id ? "bg-white" : "bg-agency-accent")} />
                      {f}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="panel-card p-6">
          <h3 className="font-bold text-sm font-display uppercase tracking-tight mb-6 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-agency-accent" /> Tenant Health
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-agency-bg rounded-xl border border-agency-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black uppercase text-agency-muted">User Seats</span>
                <span className="text-xs font-bold text-agency-ink">3 / {subscription.limits.users}</span>
              </div>
              <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
                <div 
                  className="h-full bg-agency-accent" 
                  style={{ width: `${(3 / subscription.limits.users) * 100}%` }} 
                />
              </div>
            </div>
            <div className="p-4 bg-agency-bg rounded-xl border border-agency-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black uppercase text-agency-muted">Client Accounts</span>
                <span className="text-xs font-bold text-agency-ink">12 / {subscription.limits.clients}</span>
              </div>
              <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500" 
                  style={{ width: `${(12 / subscription.limits.clients) * 100}%` }} 
                />
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-agency-border">
            <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
              <ShieldCheckIcon className="w-5 h-5 flex-shrink-0" />
              <div className="text-[10px] font-bold leading-tight">System isolated. Database-level sandboxing active for tenant.</div>
            </div>
          </div>
        </div>

        <div className="panel-card p-6 bg-slate-900 text-white">
          <h3 className="font-bold text-sm font-display uppercase tracking-tight mb-6 flex items-center gap-2">
            <Zap className="w-4 h-4 text-agency-accent" /> Reseller Markup
          </h3>
          <div className="space-y-4">
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Define the global margin to be applied to all white-label services delivered via the AOS infrastructure.
            </p>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Current Margin %</span>
                <span className="text-sm font-black text-agency-accent">40.0%</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-agency-accent w-[40%]" />
              </div>
            </div>
            <div className="pt-2">
              <button 
                onClick={() => onAction('Entering markup adjustment mode...', 'info')}
                className="w-full py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:bg-white/10 transition-colors"
              >
                Fine-Tune Markup Matrix
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [logs, setLogs] = useState<SystemLog[]>(SYSTEM_LOGS);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [personas, setPersonas] = useState<Persona[]>(PERSONAS);
  const [branding, setBranding] = useState(DEFAULT_BRANDING);
  const [subscription, setSubscription] = useState(SUBSCRIPTION_TIERS[2]); // Default to Pro
  const [agencyTemplates, setAgencyTemplates] = useState<AgencyTemplate[]>(AGENCY_TEMPLATES);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(MEDIA_ASSETS);
  const [contentCampaigns, setContentCampaigns] = useState<ContentCampaign[]>(CONTENT_CAMPAIGNS);
  const [seoCrawlData, setSeoCrawlData] = useState<SEOCrawlReport[]>(SEO_CRAWL_DATA);
  const [deliverablesData, setDeliverablesData] = useState<Deliverable[]>(DELIVERABLES);
  const [emailSegments, setEmailSegments] = useState<EmailSegment[]>(EMAIL_SEGMENTS);
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>(AUTOMATION_WORKFLOWS);
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>(EMAIL_TEMPLATES);

  const addNotification = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(7);
    const notification: Notification = { id, message, type, timestamp: Date.now() };
    setNotifications(prev => [notification, ...prev]);
    
    // Auto-remove notification
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);

    // Add to system logs
    const newLog: SystemLog = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      level: type === 'success' ? 'info' : type === 'warning' ? 'warn' : type,
      module: 'UI_EVENT',
      message
    };
    setLogs(prev => [newLog, ...prev.slice(0, 49)]);
  };

  const handleGlobalAction = (action: string, category: string) => {
    addNotification(`Global Action Initiated: ${action}`, 'success');
    setIsActionModalOpen(false);
    
    // Inject agentic telemetry
    const newLog: SystemLog = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      level: 'info',
      module: 'ORCHESTRATOR',
      message: `Global Command: [${category}] -> ${action} dispatched to A2A mesh.`,
      payload: { action, category, status: 'dispatched' }
    };
    setLogs(prev => [newLog, ...prev.slice(0, 49)]);
  };

  const renderView = () => {
    switch (activeTab) {
      case 'overview': return <Overview onAction={addNotification} />;
      case 'online': return <OnlineOpsView onAction={addNotification} segments={emailSegments} setSegments={setEmailSegments} workflows={workflows} setWorkflows={setWorkflows} templates={emailTemplates} setTemplates={setEmailTemplates} />;
      case 'seo': return <SEOEngineView onAction={addNotification} crawlData={seoCrawlData} setCrawlData={setSeoCrawlData} setDeliverables={setDeliverablesData} />;
      case 'ppc': return <GoogleAdsView onAction={addNotification} />;
      case 'social': return <SocialMediaView onAction={addNotification} />;
      case 'protocol': return <ProtocolView onAction={addNotification} logs={logs} />;
      case 'vibe-library': return <VibeLibraryView onAction={addNotification} templates={agencyTemplates} setTemplates={setAgencyTemplates} />;
      case 'approvals': return <ApprovalsView onAction={addNotification} deliverables={deliverablesData} setDeliverables={setDeliverablesData} />;
      case 'personas': return <PersonasView onAction={addNotification} personas={personas} setPersonas={setPersonas} />;
      case 'collaboration': return <CollaborationView onAction={addNotification} />;
      case 'media': return <MediaCenterView onAction={addNotification} assets={mediaAssets} setAssets={setMediaAssets} campaigns={contentCampaigns} setCampaigns={setContentCampaigns} />;
      case 'clients': return <ClientsView onAction={addNotification} />;
      case 'agency-config': return (
        <AgencyConfigView 
          onAction={addNotification} 
          branding={branding} 
          setBranding={setBranding}
          subscription={subscription}
          setSubscription={setSubscription}
        />
      );
      default: return <Overview onAction={addNotification} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-agency-bg" style={{ '--agency-accent': branding.primaryColor } as any}>
      {/* Global Action Modal */}
      <AnimatePresence>
        {isActionModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsActionModalOpen(false)}
              className="absolute inset-0 bg-agency-ink/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-agency-border"
            >
              <div className="p-8 border-b border-agency-border flex justify-between items-center bg-agency-bg/50">
                <div>
                  <h2 className="text-xl font-bold font-display uppercase tracking-tight text-agency-ink">Global Action Interface</h2>
                  <p className="text-[10px] font-bold text-agency-muted uppercase tracking-widest mt-1 text-agency-muted">Multi-Pillar Command Execution</p>
                </div>
                <button 
                  onClick={() => setIsActionModalOpen(false)}
                  className="p-2 hover:bg-agency-bg rounded-xl transition-colors"
                >
                  <ArrowRight className="w-5 h-5 rotate-45 text-agency-muted" />
                </button>
              </div>
              <div className="p-8 grid grid-cols-2 gap-6">
                {[
                  { title: 'Core Strategy', color: 'text-agency-accent', actions: [
                    { name: 'Launch New Spec', icon: Sparkles },
                    { name: 'Bridge All Pillars', icon: Layers },
                    { name: 'Global Audit', icon: ShieldCheck }
                  ]},
                  { title: 'SEO & Performance', color: 'text-emerald-500', actions: [
                    { name: 'Headless Crawl', icon: Bug },
                    { name: 'Link Reclamation', icon: Link2 },
                    { name: 'Schema Injection', icon: FileJson }
                  ]},
                  { title: 'Paid & Media', color: 'text-blue-500', actions: [
                    { name: 'Batch Creatives', icon: ImageIcon },
                    { name: 'Budget Shift', icon: DollarSign },
                    { name: 'Marketplace Sync', icon: ShoppingCart }
                  ]},
                  { title: 'Collaboration', color: 'text-amber-500', actions: [
                    { name: 'Share Snapshot', icon: Share2 },
                    { name: 'Agent Handoff', icon: Users2 },
                    { name: 'System Export', icon: Download }
                  ]}
                ].map((group) => (
                  <div key={group.title} className="space-y-4">
                    <h3 className={cn("text-[9px] font-black uppercase tracking-widest flex items-center gap-2", group.color)}>
                      <div className="w-1.5 h-1.5 rounded-full bg-current" />
                      {group.title}
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {group.actions.map(action => (
                        <button 
                          key={action.name}
                          onClick={() => handleGlobalAction(action.name, group.title)}
                          className="flex items-center gap-3 p-3 bg-agency-bg hover:bg-white border border-transparent hover:border-agency-border rounded-xl transition-all group text-left"
                        >
                          <div className="p-2 bg-white rounded-lg border border-agency-border group-hover:text-agency-accent transition-colors">
                            <action.icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[11px] font-bold text-agency-ink">{action.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-agency-bg border-t border-agency-border flex justify-center">
                <button 
                  onClick={() => setIsActionModalOpen(false)}
                  className="text-[10px] font-black uppercase tracking-widest text-agency-muted hover:text-agency-accent transition-colors"
                >
                  Cancel Escape Sequence
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3">
        <AnimatePresence>
          {notifications.map(n => (
            <Toast 
              key={n.id} 
              message={n.message} 
              type={n.type} 
              onClose={() => setNotifications(prev => prev.filter(notif => notif.id !== n.id))} 
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Sidebar Panel */}
      <aside className={cn(
        "bg-agency-sidebar text-white transition-all duration-300 flex flex-col z-50",
        isSidebarOpen ? "w-64" : "w-20"
      )}>
        <div className="p-6 flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden group border border-white/20"
            style={{ backgroundColor: branding.primaryColor }}
          >
            <Activity className="w-6 h-6 text-white" />
          </div>
          {isSidebarOpen && (
            <div className="overflow-hidden">
              <div className="font-display font-black text-sm tracking-tight truncate leading-tight">{branding.agencyName}</div>
              <div className="text-[8px] font-black uppercase tracking-widest text-white/50 truncate mt-0.5">{branding.tagline}</div>
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 mt-6 space-y-1">
          <SidebarItem icon={LayoutDashboard} label="AOS Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <div className="pt-4 pb-2 px-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Core Pillars</div>
          <SidebarItem icon={Mail} label="Online Ops" active={activeTab === 'online'} onClick={() => setActiveTab('online')} />
          <div className="relative group">
            <SidebarItem icon={Megaphone} label="Social Media" active={activeTab === 'social'} onClick={() => setActiveTab('social')} />
            {isSidebarOpen && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-agency-accent animate-pulse" />
            )}
          </div>
          <SidebarItem icon={TrendingUp} label="SEO Engine" active={activeTab === 'seo'} onClick={() => setActiveTab('seo')} />
          <SidebarItem icon={Target} label="Paid Search" active={activeTab === 'ppc'} onClick={() => setActiveTab('ppc')} />
          
          <div className="pt-4 pb-2 px-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Assets & Core</div>
          <SidebarItem icon={FileJson} label="Media Center" active={activeTab === 'media'} onClick={() => setActiveTab('media')} />
          <SidebarItem icon={Zap} label="Vibe Library" active={activeTab === 'vibe-library'} onClick={() => setActiveTab('vibe-library')} />
          <SidebarItem icon={UserCircle} label="System Personas" active={activeTab === 'personas'} onClick={() => setActiveTab('personas')} />
          <SidebarItem icon={Users2} label="Collaboration" active={activeTab === 'collaboration'} onClick={() => setActiveTab('collaboration')} />
          
          <div className="pt-4 pb-2 px-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Tenant Ops</div>
          <SidebarItem icon={Building2} label="Agency Config" active={activeTab === 'agency-config'} onClick={() => setActiveTab('agency-config')} />
          <SidebarItem icon={Settings} label="System Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>

        <div className="p-4 border-t border-white/5 space-y-1">
          <SidebarItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="sidebar-item w-full">
            <ChevronRight className={cn("w-5 h-5 transition-transform", isSidebarOpen && "rotate-180")} />
            {isSidebarOpen && <span className="text-sm">Collapse Sidebar</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-auto">
        <header className="h-16 bg-white border-b border-agency-border flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-6 flex-1">
            <div className="flex items-center gap-4">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: branding.primaryColor }}
              >
                {branding.agencyName.charAt(0)}
              </div>
              <div className="h-4 w-px bg-agency-border" />
              <h2 className="text-sm font-bold text-agency-ink font-display capitalize tracking-tight whitespace-nowrap">{activeTab.replace('-', ' ')}</h2>
            </div>
            <div className="flex items-center gap-3 flex-1 max-w-md ml-4 px-3 py-1.5 bg-agency-bg rounded-lg">
              <Search className="w-3.5 h-3.5 text-agency-muted" />
              <input type="text" placeholder="Search system nodes..." className="bg-transparent border-none text-xs w-full focus:ring-0" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider">A2A Sync Active</span>
            </div>
            <button 
              onClick={() => addNotification('Checking system notifications...', 'info')}
              className="p-2 text-agency-muted hover:text-agency-accent relative focus:outline-none"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-8 rounded-xl bg-agency-accent flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-agency-accent/20">
              AD
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold font-display tracking-tight text-agency-ink capitalize">
                {activeTab === 'protocol' ? 'System Core' : activeTab}
              </h1>
              <p className="text-agency-muted text-sm mt-1">
                {activeTab === 'protocol' 
                  ? 'Agent-to-Agent spec monitoring and high-resilience protocol management.' 
                  : 'Global marketing orchestration layer.'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setActiveTab('protocol')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-agency-border rounded-lg text-sm font-semibold hover:bg-agency-bg transition-colors"
              >
                <History className="w-4 h-4" /> Logs
              </button>
              <button 
                onClick={() => setIsActionModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-agency-accent text-white rounded-lg text-sm font-semibold shadow-md shadow-agency-accent/20 transition-transform active:scale-95"
              >
                <Plus className="w-4 h-4" /> Action
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>

        <footer className="mt-auto p-8 border-t border-agency-border bg-white flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-agency-muted">
          <div className="flex items-center gap-4">
            <span>&copy; 2026 {branding.agencyName}</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">{subscription.name} Plane</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="flex items-center gap-1"><FileJson className="w-3 h-3" /> A2A Spec</a>
            <a href="#" className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> OAuth 2.0</a>
            <a href="#">Cloud API</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
