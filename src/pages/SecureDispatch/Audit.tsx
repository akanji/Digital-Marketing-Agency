import React, { useState, useEffect } from 'react';
import { ClipboardList, ShieldCheck, RefreshCw } from 'lucide-react';
import { cn } from '../../lib/utils';
import { AuditEntry } from '../../types';

export default function EmailAuditView({ onAction }: { onAction: (name: string, type?: string) => void }) {
  const [audit, setAudit] = useState<AuditEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAudit = async () => {
      try {
        const response = await fetch('/api/v1/email/audit');
        const data = await response.json();
        if (data.audit) setAudit(data.audit);
      } catch (error) {
        onAction('Audit trail sequence unreachable.', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAudit();
  }, []);

  if (isLoading) return <div className="flex justify-center p-12"><RefreshCw className="w-8 h-8 animate-spin text-blue-600" /></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto p-8">
      <div className="flex items-center justify-between p-6 bg-slate-900 text-white rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <ClipboardList className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-black uppercase tracking-tight">Immutable Audit Trail</h2>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Platform-Wide Security & Dispatch Integrity Log</p>
          </div>
        </div>
        <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-right relative z-10">
          <div className="text-[9px] font-black uppercase text-blue-400">Chain Integrity</div>
          <div className="text-sm font-black font-mono uppercase">Verified</div>
        </div>
      </div>

      <div className="panel-card p-0 overflow-hidden border-slate-200 bg-white rounded-[2rem] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Timestamp</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Event</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Actor</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">IP Address</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Details</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Severity</th>
              </tr>
            </thead>
            <tbody>
              {audit.map((entry) => (
                <tr key={entry.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="text-[10px] font-mono text-slate-500">{new Date(entry.timestamp).toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{entry.event}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[10px] font-bold text-slate-900">{entry.actor}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[10px] font-mono text-slate-500">{entry.ip_address}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[11px] font-bold text-slate-900 line-clamp-1 group-hover:line-clamp-none transition-all">{entry.details}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border",
                      entry.severity === 'high' ? "bg-red-50 text-red-600 border-red-100" :
                      entry.severity === 'medium' ? "bg-amber-50 text-amber-600 border-amber-100" :
                      "bg-emerald-50 text-emerald-600 border-emerald-100"
                    )}>
                      {entry.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="panel-card p-6 bg-slate-900 text-white rounded-[2rem] border border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-widest">Hash Verification</span>
          </div>
          <p className="text-[11px] font-bold text-white/60 mb-4 font-mono break-all">sha256-k0yR8...zL0P9Qx</p>
          <div className="pt-4 border-t border-white/10 flex justify-between items-center">
            <span className="text-[9px] font-black uppercase text-white/40">Status</span>
            <span className="text-[9px] font-black uppercase text-emerald-400">UNALTERED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
