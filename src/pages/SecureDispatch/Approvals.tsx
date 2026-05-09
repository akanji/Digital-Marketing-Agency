import React from 'react';
import { ShieldCheck, Users2, UserCircle, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { EmailApproval } from '../../types';

export default function EmailApprovalView({ 
  approvals, 
  onAction, 
  onHandle 
}: { 
  approvals: EmailApproval[], 
  onAction: (name: string, type?: string) => void,
  onHandle: (id: string, action: 'approve' | 'reject') => void
}) {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 max-w-7xl mx-auto p-8">
      <div className="flex justify-between items-center bg-white p-6 border border-slate-200 rounded-[2rem] shadow-sm">
        <div className="text-left">
          <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">Email Security Approvals</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Pending Human-in-the-Loop Decisions</p>
        </div>
        <div className="flex gap-2">
          <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-black uppercase text-slate-500">Pending: {approvals.filter(a => a.status !== 'APPROVED' && a.status !== 'REVISION_REQUESTED').length}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {approvals.length === 0 ? (
          <div className="panel-card p-12 text-center text-slate-400 bg-white rounded-[2rem] border border-slate-200 shadow-sm">
            <ShieldCheck className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="font-bold uppercase tracking-widest text-xs">All email dispatch sequences are currently green-lit.</p>
          </div>
        ) : (
          approvals.map((appr) => (
            <div key={appr.id} className="panel-card overflow-hidden group bg-white rounded-[2rem] border border-slate-200 shadow-sm text-left">
              <div className="p-8 flex flex-col lg:flex-row gap-8">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest",
                      appr.priority === 'critical' ? "bg-red-500 text-white" : 
                      appr.priority === 'high' ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-500"
                    )}>
                      {appr.priority} Priority
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">{appr.id}</span>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{appr.subject}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1.5">
                        <Users2 className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[11px] font-bold text-slate-600">{appr.recipient_count.toLocaleString()} Recipients</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-slate-200" />
                      <div className="flex items-center gap-1.5">
                        <UserCircle className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[11px] font-bold text-slate-600">{appr.requester}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 italic text-[11px] text-slate-500">
                    "{appr.body_preview}"
                  </div>
                </div>

                <div className="lg:w-72 space-y-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center">
                    <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Risk Quotient</div>
                    <div className={cn(
                      "text-3xl font-black tracking-tighter",
                      appr.risk_score > 0.7 ? "text-red-500" : "text-amber-500"
                    )}>{(appr.risk_score * 100).toFixed(0)}%</div>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {appr.compliance_flags.map(f => (
                      <span key={f} className="px-2 py-0.5 bg-red-50 text-red-600 border border-red-100 rounded-[4px] text-[8px] font-black uppercase tracking-tight">{f}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-8 py-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Status:</span>
                  <div className={cn(
                    "px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest",
                    appr.status === 'APPROVED' ? "bg-emerald-500 text-white" :
                    appr.status === 'REVISION_REQUESTED' ? "bg-red-500 text-white" :
                    "bg-blue-500 text-white"
                  )}>
                    {appr.status.replace(/_/g, ' ')}
                  </div>
                </div>

                {appr.status !== 'APPROVED' && appr.status !== 'REVISION_REQUESTED' && (
                  <div className="flex gap-3">
                    <button 
                      onClick={() => onHandle(appr.id, 'reject')}
                      className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-red-500 hover:text-red-500 transition-all flex items-center gap-2"
                    >
                      <X className="w-3.5 h-3.5" /> Reject
                    </button>
                    <button 
                      onClick={() => onHandle(appr.id, 'approve')}
                      className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/10"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" /> Approve Dispatch
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
