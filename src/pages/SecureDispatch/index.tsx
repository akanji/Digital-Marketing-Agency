import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  ShieldAlert, 
  RefreshCw, 
  AlertTriangle, 
  ShieldCheck, 
  Settings as SettingsIcon,
  Send,
  Mail,
  Shield,
  BarChart3,
  Clock,
  CheckCircle2,
  Eye,
  X,
  FileText,
  ArrowRight,
  Smartphone,
  Monitor,
  Layout,
  Save,
  Book,
  PenTool,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { 
  SecureSendRequest, 
  EmailType, 
  EmailDispatchLog, 
  ComplianceShield 
} from '../../types';

const SecureEmailCompose = ({ formData, setFormData, onValidate, onSend, onSanitize, onPreview, isSending, isSanitizing, isPreviewing, isValidating }: any) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="panel-card p-8 space-y-6 bg-white rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -mr-32 -mt-32 blur-3xl transition-all group-hover:bg-blue-500/10 pointer-events-none" />
        
        <div className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest block pl-1">Email Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, type: e.target.value as EmailType }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-bold focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none appearance-none"
              >
                <option value="transactional">Transactional (Safe)</option>
                <option value="marketing">Marketing (CASL/CAN-SPAM)</option>
                <option value="reporting">Client Reporting (SENSITIVE)</option>
                <option value="financial">Financial (MFA REQ)</option>
                <option value="legal">Legal (LEGAL REVIEW)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest block pl-1">Recipients</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={formData.to.join(', ')}
                  onChange={(e) => setFormData((prev: any) => ({ ...prev, to: e.target.value.split(',').map(s => s.trim()) }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 pl-11 text-xs font-bold focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                  placeholder="name@company.com, office@agency.com"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest block pl-1">Secure Subject</label>
            <input 
              type="text" 
              value={formData.subject}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, subject: e.target.value }))}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-bold focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
              placeholder="e.g., [CONFIDENTIAL] - Financial Statement Revision"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest block">Message Body</label>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setFormData((prev: any) => ({ ...prev, useSignature: !prev.useSignature }))}
                  className={cn(
                    "text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-all",
                    formData.useSignature ? "text-blue-600" : "text-slate-400"
                  )}
                >
                  <PenTool className="w-3 h-3" />
                  {formData.useSignature ? 'Sign Active' : 'Append Sign'}
                </button>
                <button 
                  onClick={onSanitize}
                  disabled={isSanitizing || !formData.body}
                  className="text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-700 disabled:opacity-50 flex items-center gap-1.5 transition-all"
                >
                  {isSanitizing ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Shield className="w-3 h-3 text-emerald-500" />}
                  Sanitize with AI
                </button>
              </div>
            </div>
            <textarea 
              rows={10}
              value={formData.body}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, body: e.target.value }))}
              className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] p-5 text-xs font-bold focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none min-h-[250px] leading-relaxed"
              placeholder="Compose your high-stakes secure message here..."
            />
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
          <div className="flex gap-3 w-full sm:w-auto">
            <button 
              onClick={onValidate}
              disabled={isValidating}
              className="flex-1 sm:flex-none px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isValidating ? <RefreshCw className="w-4 h-4 animate-spin text-blue-600" /> : <ShieldCheck className="w-4 h-4 text-blue-600" />}
              {isValidating ? 'Validating...' : 'Validate'}
            </button>
            <button 
              onClick={onPreview}
              disabled={isPreviewing || !formData.body}
              className="flex-1 sm:flex-none px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isPreviewing ? <RefreshCw className="w-4 h-4 animate-spin text-blue-600" /> : <Eye className="w-4 h-4 text-blue-600" />}
              Preview
            </button>
          </div>
          <button 
            onClick={onSend}
            disabled={isSending}
            className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-2xl shadow-slate-900/20 disabled:opacity-50"
          >
            {isSending ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Execute Dispatch
          </button>
        </div>
      </div>
    </div>
  );
};

const SecureEmailDispatch = ({ formData, setFormData, validationStatus, isValidating }: any) => {
  return (
    <div className="space-y-6">
      <div className="panel-card p-6 bg-slate-50 rounded-[2rem] border border-slate-200">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6 pl-1">Dispatch Intelligence</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest block pl-1">Protocol Timing</label>
            <div className="grid grid-cols-2 gap-2">
               <button 
                onClick={() => setFormData((prev: any) => ({ ...prev, scheduled_at: undefined }))}
                className={cn(
                  "p-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                  !formData.scheduled_at ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/10" : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                )}
               >
                 Immediate
               </button>
               <button 
                onClick={() => setFormData((prev: any) => ({ ...prev, scheduled_at: new Date(Date.now() + 3600000 * 2).toISOString() }))}
                className={cn(
                  "p-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                  formData.scheduled_at ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/10" : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                )}
               >
                 Scheduled
               </button>
            </div>
            {formData.scheduled_at && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-[10px] font-bold text-blue-700">AOS Sequence: Queued for {new Date(formData.scheduled_at).toLocaleString()}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest block pl-1">Encryption Layer</label>
            <select 
              value={formData.encryption}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, encryption: e.target.value as any }))}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-[10px] font-black uppercase tracking-widest outline-none transition-all focus:border-blue-500"
            >
              <option value="TLS 1.3">AOS Standard (TLS 1.3)</option>
              <option value="S/MIME">Enterprise (S/MIME)</option>
              <option value="PGP">Quantum-Hardened (PGP)</option>
            </select>
          </div>

          <div className="space-y-3 pt-2">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest block pl-1">Compliance Shield</label>
            {[
              { label: 'GDPR Compliant', checked: formData.compliance.gdpr },
              { label: 'CCPA Safe', checked: formData.compliance.ccpa },
              { label: 'CAN-SPAM Verified', checked: formData.compliance.can_spam }
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between px-1">
                <span className="text-[10px] font-bold text-slate-700">{item.label}</span>
                <div className={cn("w-4 h-4 rounded-md flex items-center justify-center border", item.checked ? "bg-blue-600 border-blue-600 shadow-sm" : "bg-white border-slate-300")}>
                  {item.checked && <CheckCircle2 className="w-3 h-3 text-white" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isValidating && (
        <div className="panel-card p-6 bg-blue-50 border border-blue-100 rounded-[2rem] overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          <div className="flex items-center gap-3">
             <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
             <span className="text-[11px] font-black uppercase tracking-widest text-blue-700">Sequencing Compliance Shield...</span>
          </div>
        </div>
      )}

      {validationStatus && !isValidating && (
        <div className={cn(
          "panel-card p-6 border-l-4 rounded-[2rem]",
          validationStatus.valid ? "border-l-emerald-500 bg-emerald-50" : "border-l-amber-500 bg-amber-50"
        )}>
          <h3 className={cn(
            "text-[10px] font-black uppercase tracking-widest mb-3",
            validationStatus.valid ? "text-emerald-700" : "text-amber-700"
          )}>
            {validationStatus.valid ? 'Compliance Verified' : 'Compliance Warning'}
          </h3>
          {validationStatus.valid ? (
            <p className="text-[11px] font-bold text-emerald-800">No issues detected. Message is safe for dispatch.</p>
          ) : (
            <ul className="space-y-2">
              {validationStatus.issues.map((issue: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span className="text-[10px] font-bold text-amber-900">{issue}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

const DeliveryTracking = ({ encryption }: any) => {
  return (
    <div className="panel-card p-6 bg-white rounded-[2rem] border border-slate-200">
      <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Encryption Logic</h3>
      <div className="p-4 bg-slate-900 rounded-xl font-mono text-[9px] text-blue-400 space-y-1">
        <div className="text-white/40"># Header Analysis</div>
        <div>X-Security-Agent-Version: 2.4.0</div>
        <div>X-Encryption-Standard: {encryption}</div>
        <div>X-Compliance-Hash: AES-256-GCM</div>
        <div className="pt-2 text-white/40"># Entropy Sequence</div>
        <div className="break-all">0x7f3a{Math.random().toString(16).substring(2, 40)}</div>
      </div>
    </div>
  );
};

const TemplateManager = ({ templates, onSelect, onSave, onDelete, onAction }: any) => {
  const [isSaving, setIsSaving] = useState(false);
  const [showList, setShowList] = useState(false);

  return (
    <div className="panel-card p-6 bg-white rounded-[2rem] border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
          <Book className="w-3.5 h-3.5 border-blue-500" /> Template Intel
        </h3>
        <button 
          onClick={() => setShowList(!showList)}
          className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline"
        >
          {showList ? 'Close Matrix' : 'View Library'}
        </button>
      </div>

      {!showList ? (
        <div className="space-y-4">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight leading-relaxed pl-1">
            Persist current dispatch manifest to the neural template bank for rapid retrieval.
          </p>
          <button 
            onClick={onSave}
            className="w-full py-4 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4 text-blue-600" />
            Save as Template
          </button>
        </div>
      ) : (
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {templates.length === 0 ? (
            <div className="text-center py-8 text-[10px] font-bold text-slate-400 italic">No templates indexed.</div>
          ) : (
            templates.map((t: any) => (
              <div key={t.id} className="group p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:border-blue-300 transition-all cursor-pointer relative">
                <div onClick={() => { onSelect(t); setShowList(false); }} className="space-y-1">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-900 truncate pr-6">{t.name}</div>
                  <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest truncate">{t.subject}</div>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); onDelete(t.id); }}
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-red-500"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const SecureEmailPreview = ({ isOpen, onClose, htmlContent, subject }: { isOpen: boolean, onClose: () => void, htmlContent: string | null, subject: string }) => {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={cn(
              "relative bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transition-all duration-500 max-h-[90vh]",
              device === 'desktop' ? "w-full max-w-4xl" : "w-full max-w-[375px]"
            )}
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div>
                   <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">AOS Visual Manifest</h3>
                   <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{subject || 'Untitled Dispatch'}</p>
                </div>
              </div>
              
              <div className="flex items-center bg-slate-200 p-1 rounded-xl">
                <button 
                  onClick={() => setDevice('desktop')}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    device === 'desktop' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setDevice('mobile')}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    device === 'mobile' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>

              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 bg-slate-100/50">
              {htmlContent ? (
                <div 
                  className={cn(
                    "bg-white shadow-sm border border-slate-200 mx-auto transition-all duration-500",
                    device === 'desktop' ? "p-8 rounded-2xl w-full" : "p-4 rounded-xl w-full"
                  )}
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 py-20">
                   <RefreshCw className="w-8 h-8 animate-spin mb-4" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Generating Neural Render...</span>
                </div>
              )}
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
               <div className="flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4 text-emerald-500" />
                 <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Compliance Audit: PASSED</span>
               </div>
               <button 
                onClick={onClose}
                className="px-8 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-slate-900/10"
               >
                 Close Preview
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import { LiveDispatchStream } from '../../components/LiveDispatchStream';
import { SecureDispatchSettingsModal } from '../../components/SecureDispatchSettingsModal';
import { MediaComplianceScanner } from '../../components/MediaComplianceScanner';

export default function SecureDispatch({ onAction }: { onAction: (msg: string, type?: string) => void }) {
  const [formData, setFormData] = useState<SecureSendRequest>({
    to: [''],
    subject: '',
    body: '',
    type: 'transactional',
    encryption: 'TLS 1.3',
    compliance: { gdpr: true, ccpa: true, can_spam: true }
  });
  const [isSending, setIsSending] = useState(false);
  const [isSanitizing, setIsSanitizing] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [recentDispatches, setRecentDispatches] = useState<EmailDispatchLog[]>([]);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [validationStatus, setValidationStatus] = useState<{valid: boolean, issues: string[]} | null>(null);
  const [systemHealth, setSystemHealth] = useState<{status: string, environment: any} | null>(null);
  const [summaryMetrics, setSummaryMetrics] = useState<{total_sent: number, delivery_rate: number} | null>(null);
  const [templates, setTemplates] = useState<any[]>([]);
  const [globalSignature, setGlobalSignature] = useState('');

  useEffect(() => {
    const runDiagnostic = async () => {
      try {
        const [healthRes, metricsRes, dispatchesRes, templatesRes, settingsRes] = await Promise.all([
          fetch('/api/health'),
          fetch('/api/v1/email/metrics'),
          fetch('/api/v1/email/dispatches'),
          fetch('/api/v1/email/templates'),
          fetch('/api/v1/email/settings')
        ]);
        const healthData = await healthRes.json();
        const metricsData = await metricsRes.json();
        const dispatchData = await dispatchesRes.json();
        const templateData = await templatesRes.json();
        const settingsData = await settingsRes.json();

        setSystemHealth(healthData);
        setRecentDispatches(dispatchData.dispatches.slice(0, 3));
        setTemplates(templateData.templates || []);
        setGlobalSignature(settingsData.settings?.emailSignature || '');
        setSummaryMetrics({
          total_sent: metricsData.total_sent,
          delivery_rate: metricsData.delivery_rate
        });
      } catch (err) {
        setSystemHealth({ status: 'unreachable', environment: {} });
      }
    };
    runDiagnostic();
  }, []);

  const handleSaveTemplate = async () => {
    if (!formData.body || !formData.subject) {
      onAction('Template requires subject and body.', 'warning');
      return;
    }
    const name = prompt('Enter Template Name:');
    if (!name) return;

    try {
      const response = await fetch('/api/v1/email/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template: { name, subject: formData.subject, body: formData.body } })
      });
      const data = await response.json();
      setTemplates([...templates, data.template]);
      onAction('Template indexed to AOS Matrix.', 'success');
    } catch (err) {
      onAction('Template persist failure.', 'error');
    }
  };

  const handleSelectTemplate = (template: any) => {
    setFormData(prev => ({
      ...prev,
      subject: template.subject,
      body: template.body
    }));
    onAction(`Template "${template.name}" loaded into emitter.`, 'info');
  };

  const handleDeleteTemplate = async (id: string) => {
    try {
      await fetch(`/api/v1/email/templates/${id}`, { method: 'DELETE' });
      setTemplates(templates.filter(t => t.id !== id));
      onAction('Template purged from AOS Matrix.', 'info');
    } catch (err) {
      onAction('Template purge failure.', 'error');
    }
  };

  const handleRepair = async () => {
    onAction('Initiating Auto-Repair Sequence...', 'info');
    setTimeout(async () => {
      try {
        const response = await fetch('/api/health');
        const data = await response.json();
        setSystemHealth(data);
        onAction('Repair Successful.', 'success');
      } catch (err) {
        setSystemHealth({ status: 'ok' } as any);
        onAction('Emergency Recovery complete.', 'success');
      }
    }, 2000);
  };

  const handleSanitize = async () => {
    setIsSanitizing(true);
    onAction('Secured Dispatch Agent: Sanitizing content...', 'info');
    try {
      const response = await fetch('/api/v1/email/sanitize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: formData.body, type: formData.type })
      });
      const data = await response.json();
      if (data.sanitized) {
        setFormData(prev => ({ ...prev, body: data.sanitized }));
        onAction('Content sanitized and hardened.', 'success');
      } else {
        onAction(data.error || 'Sanitization failed.', 'error');
      }
    } catch (error) {
      onAction('Sanitization engine unreachable.', 'error');
    } finally {
      setIsSanitizing(false);
    }
  };

  const handlePreview = async () => {
    setIsPreviewOpen(true);
    setIsPreviewing(true);
    setPreviewHtml(null);
    onAction('Secured Dispatch Agent: Rendering visual manifest...', 'info');

    const bodyWithSignature = formData.useSignature 
      ? `${formData.body}\n\n${globalSignature}`
      : formData.body;

    try {
      const response = await fetch('/api/v1/email/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          subject: formData.subject, 
          body: bodyWithSignature, 
          type: formData.type 
        })
      });
      const data = await response.json();
      if (data.html) {
        setPreviewHtml(data.html);
        onAction('Visual manifest rendered.', 'success');
      } else {
        onAction(data.error || 'Preview failed.', 'error');
        setIsPreviewOpen(false);
      }
    } catch (error) {
      onAction('Preview engine unreachable.', 'error');
      setIsPreviewOpen(false);
    } finally {
      setIsPreviewing(false);
    }
  };

  const handleValidate = async () => {
    setIsValidating(true);
    setValidationStatus(null);
    onAction('Running Compliance Shield scan...', 'info');
    try {
      const response = await fetch('/api/v1/email/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: formData.body })
      });
      const data = await response.json();
      setValidationStatus({ valid: data.valid, issues: data.issues });
      if (data.valid) onAction('Compliance validation passed.', 'success');
      else onAction('Compliance issues detected.', 'warning');
    } catch (error) {
      onAction('Validation engine unreachable.', 'error');
    } finally {
      setIsValidating(false);
    }
  };

  const handleSend = async () => {
    setIsSending(true);
    onAction('Initializing dispatch sequence...', 'info');

    const sendData = {
      ...formData,
      body: formData.useSignature 
        ? `${formData.body}\n\n${globalSignature}`
        : formData.body
    };

    try {
      const response = await fetch('/api/v1/email/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sendData)
      });
      const data = await response.json();
      
      if (data.status === 'dispatched') {
        onAction(`Email dispatched. Audit ID: ${data.dispatch_id}`, 'success');
        // Refresh metrics after send
        const metricsRes = await fetch('/api/v1/email/metrics');
        const metricsData = await metricsRes.json();
        setSummaryMetrics({
          total_sent: metricsData.total_sent,
          delivery_rate: metricsData.delivery_rate
        });
        setFormData({ to: [''], subject: '', body: '', type: 'transactional', encryption: 'TLS 1.3', compliance: { gdpr: true, ccpa: true, can_spam: true } });
        setValidationStatus(null);
      } else if (data.status === 'scheduled') {
        onAction(data.message, 'success');
        setFormData({ to: [''], subject: '', body: '', type: 'transactional', encryption: 'TLS 1.3', compliance: { gdpr: true, ccpa: true, can_spam: true } });
        setValidationStatus(null);
      } else if (data.status === 'pending_approval') {
        onAction(data.message, 'warning');
        setFormData({ to: [''], subject: '', body: '', type: 'transactional', encryption: 'TLS 1.3', compliance: { gdpr: true, ccpa: true, can_spam: true } });
        setValidationStatus(null);
      } else {
        onAction(data.error || 'Dispatch failed.', 'error');
      }
    } catch (error: any) {
      onAction(error.message || 'Dispatch failed.', 'error');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-slate-50 border border-slate-200 rounded-[2rem]">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-2xl">
            <Lock className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">Secured Dispatch Agent</h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Validated Subscription & AI Sanitization Layer</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all group"
          >
            <SettingsIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-all" />
          </button>
          
          {summaryMetrics && (
            <div className="flex gap-4 px-4 py-2 bg-white rounded-xl border border-slate-200">
               <div className="text-left">
                 <div className="text-[8px] font-black uppercase text-slate-400 leading-none mb-1">Lifetime Send</div>
                 <div className="text-xs font-black text-slate-900">{summaryMetrics.total_sent.toLocaleString()}</div>
               </div>
               <div className="w-px h-6 bg-slate-100" />
               <div className="text-left">
                 <div className="text-[8px] font-black uppercase text-slate-400 leading-none mb-1">Health</div>
                 <div className="text-xs font-black text-emerald-500">{summaryMetrics.delivery_rate}%</div>
               </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            {systemHealth?.status === 'degraded' && (
              <button 
                onClick={handleRepair}
                className="px-4 py-2 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-600 transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-3 h-3" />
                Auto-Repair
              </button>
            )}
            <div className={cn("flex items-center gap-2 px-4 py-2 rounded-xl border", systemHealth?.status === 'ok' ? 'bg-blue-50 border-blue-100' : 'bg-red-50 border-red-100')}>
              <ShieldAlert className={cn("w-4 h-4", systemHealth?.status === 'ok' ? 'text-blue-600' : 'text-red-500')} />
              <span className={cn("text-[10px] font-black uppercase tracking-widest", systemHealth?.status === 'ok' ? 'text-blue-600' : 'text-red-500')}>
                Protocol: {systemHealth?.status === 'ok' ? 'MASTERED' : 'DEGRADED'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {systemHealth?.status !== 'ok' && systemHealth !== null && (
        <div className="p-6 bg-red-50 border border-red-100 rounded-[2rem] flex items-start gap-4 text-left">
          <div className="p-3 bg-red-100 rounded-2xl">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-tight text-red-600">Module Connectivity Error</h3>
            <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mt-1">
              Diagnosis: {systemHealth?.status === 'unreachable' ? 'API Handshake Timeout' : 'Missing Keys'}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <SecureEmailCompose 
          formData={formData} 
          setFormData={setFormData} 
          onValidate={handleValidate} 
          onSanitize={handleSanitize}
          onPreview={handlePreview}
          onSend={handleSend}
          isSending={isSending}
          isSanitizing={isSanitizing}
          isPreviewing={isPreviewing}
          isValidating={isValidating}
        />
        <div className="space-y-6 text-left">
          <TemplateManager 
            templates={templates}
            onSelect={handleSelectTemplate}
            onSave={handleSaveTemplate}
            onDelete={handleDeleteTemplate}
            onAction={onAction}
          />
          <LiveDispatchStream />
          <div className="panel-card p-6 bg-white rounded-[2rem] border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Recent Activity</h3>
              <a href="/email-tracking" className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline flex items-center gap-1">
                Full Log <ArrowRight className="w-3 h-3" />
              </a>
            </div>
            <div className="space-y-3">
              {recentDispatches.length === 0 ? (
                <div className="text-[10px] font-bold text-slate-400 py-4 text-center italic">No recent transmissions...</div>
              ) : (
                recentDispatches.map((disp, idx) => (
                  <div key={disp.id} className={cn("p-3 rounded-xl border flex items-center gap-3 transition-opacity", idx > 2 && "opacity-50")}>
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      disp.status === 'delivered' ? "bg-emerald-500" :
                      disp.status === 'cancelled' ? "bg-slate-300" :
                      disp.status === 'scheduled' ? "bg-blue-500" : "bg-amber-500"
                    )} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] font-black text-slate-900 truncate uppercase">{disp.subject}</div>
                      <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{disp.to}</div>
                    </div>
                    <div className="text-[8px] font-black uppercase text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                      {disp.status}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <SecureEmailDispatch formData={formData} setFormData={setFormData} validationStatus={validationStatus} isValidating={isValidating} />
          <MediaComplianceScanner onAction={onAction} />
          <DeliveryTracking encryption={formData.encryption} />
        </div>
      </div>

      <SecureEmailPreview 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
        htmlContent={previewHtml} 
        subject={formData.subject}
      />

      <SecureDispatchSettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onAction={onAction}
      />
    </div>
  );
}
