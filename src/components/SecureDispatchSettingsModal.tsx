import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Shield, Lock, Bell, Save, X, RefreshCw, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { SecureDispatchSettings, EmailType, ComplianceShield } from '../types';

export const SecureDispatchSettingsModal = ({ isOpen, onClose, onAction }: { isOpen: boolean, onClose: () => void, onAction: (msg: string, type?: string) => void }) => {
  const [settings, setSettings] = useState<SecureDispatchSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/v1/email/settings')
        .then(res => res.json())
        .then(data => setSettings(data.settings))
        .catch(() => onAction('Failed to load settings.', 'error'));
    }
  }, [isOpen]);

  const handleSave = async () => {
    if (!settings) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/v1/email/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings })
      });
      const data = await res.json();
      if (data.success) {
        onAction('Protocol updated successfully.', 'success');
        onClose();
      }
    } catch (error) {
      onAction('Failed to save settings.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const highRiskOptions: EmailType[] = ['marketing', 'reporting', 'financial', 'legal', 'transactional'];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200"
        >
          <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
                <SettingsIcon className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Security Protocol</h2>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Tenant-Level Dispatch Configuration</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-xl transition-all"
            >
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>

          <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar space-y-8 text-left">
            {settings ? (
              <>
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Governance Parameters</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest block pl-1">Approval Threshold (Bytes)</label>
                       <input 
                        type="number"
                        value={settings.approvalThreshold}
                        onChange={(e) => setSettings({ ...settings, approvalThreshold: parseInt(e.target.value) })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-bold focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                       />
                       <p className="text-[9px] font-bold text-slate-400 pl-1 uppercase tracking-tighter">Trigger manual review above this size.</p>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest block pl-1">Daily Transmission Limit</label>
                       <input 
                        type="number"
                        value={settings.dailyLimit}
                        onChange={(e) => setSettings({ ...settings, dailyLimit: parseInt(e.target.value) })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-bold focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                       />
                       <p className="text-[9px] font-bold text-slate-400 pl-1 uppercase tracking-tighter">Hard cap for automated outbound flows.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Lock className="w-4 h-4 text-blue-600" />
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Encryption & Sanitization</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { key: 'encryptionRequired', label: 'Mandate AES-256 for all Outbound', description: 'Blocks any dispatch without active encryption headers.' },
                      { key: 'autoSanitize', label: 'AI Deep-Sanitization (Gemini)', description: 'Automatically scrub PII and sensitive tokens via Agent scan.' },
                      { key: 'mfaEnabled', label: 'Multifactor Dispatch Auth', description: 'Require secure token verification for high-risk types.' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200 group hover:border-blue-200 transition-all">
                        <div className="text-left">
                          <div className="text-xs font-black text-slate-800 uppercase tracking-tight">{item.label}</div>
                          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{item.description}</div>
                        </div>
                        <button 
                          onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof SecureDispatchSettings] })}
                          className={cn(
                            "w-12 h-6 rounded-full relative transition-all",
                            (settings as any)[item.key] ? "bg-blue-600" : "bg-slate-300"
                          )}
                        >
                          <div className={cn(
                            "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                            (settings as any)[item.key] ? "left-7" : "left-1"
                          )} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                   <div className="flex items-center gap-2 mb-4">
                    <Bell className="w-4 h-4 text-blue-600" />
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900">High-Risk Dispatch Classes</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {highRiskOptions.map((type) => (
                      <button 
                        key={type}
                        onClick={() => {
                          const newTypes = settings.highRiskTypes.includes(type)
                            ? settings.highRiskTypes.filter(t => t !== type)
                            : [...settings.highRiskTypes, type];
                          setSettings({ ...settings, highRiskTypes: newTypes });
                        }}
                        className={cn(
                          "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                          settings.highRiskTypes.includes(type) 
                            ? "bg-slate-900 text-white border-slate-900 shadow-md" 
                            : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                   <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Default Compliance Shield</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { key: 'gdpr', label: 'GDPR' },
                      { key: 'ccpa', label: 'CCPA' },
                      { key: 'can_spam', label: 'CAN-SPAM' }
                    ].map((item) => (
                      <button 
                        key={item.key}
                        onClick={() => setSettings({ 
                          ...settings, 
                          defaultCompliance: { 
                            ...settings.defaultCompliance, 
                            [item.key]: !settings.defaultCompliance[item.key as keyof ComplianceShield] 
                          } 
                        })}
                        className={cn(
                          "flex items-center justify-between p-4 bg-slate-50 border rounded-2xl transition-all",
                          settings.defaultCompliance[item.key as keyof ComplianceShield] ? "border-blue-200 bg-blue-50/50" : "border-slate-200"
                        )}
                      >
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">{item.label}</span>
                        <div className={cn(
                          "w-4 h-4 rounded-md flex items-center justify-center border",
                          settings.defaultCompliance[item.key as keyof ComplianceShield] ? "bg-blue-600 border-blue-600 shadow-sm" : "bg-white border-slate-300"
                        )}>
                          {settings.defaultCompliance[item.key as keyof ComplianceShield] && <CheckCircle2 className="w-3 h-3 text-white" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="py-20 flex flex-col items-center gap-4 opacity-30">
                 <RefreshCw className="w-8 h-8 animate-spin" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Sequencing Node Settings...</span>
              </div>
            )}
          </div>

          <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-3">
             <button 
              onClick={onClose}
              className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-all font-mono"
             >
               Cancel
             </button>
             <button 
              onClick={handleSave}
              disabled={isSaving || !settings}
              className="px-8 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-blue-700 active:scale-95 transition-all shadow-xl shadow-blue-200 disabled:opacity-50"
             >
               {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
               Commit Protocol
             </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
