import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  ArrowUpRight, 
  RefreshCw, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle,
  ArrowRight,
  Clock
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from '../../lib/utils';
import { EmailDeliveryMetrics, EmailDispatchLog } from '../../types';

export default function EmailTrackingView({ onAction }: { onAction: (name: string, type?: string) => void }) {
  const [metrics, setMetrics] = useState<EmailDeliveryMetrics | null>(null);
  const [dispatches, setDispatches] = useState<EmailDispatchLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [mRes, dRes] = await Promise.all([
        fetch('/api/v1/email/metrics'),
        fetch('/api/v1/email/dispatches')
      ]);
      const mData = await mRes.json();
      const dData = await dRes.json();
      setMetrics(mData);
      setDispatches(dData.dispatches);
    } catch (error) {
      onAction('Failed to fetch tracking data.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCancel = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onAction('Secured Dispatch Agent: Aborting transmission...', 'info');
    try {
      const res = await fetch(`/api/v1/email/dispatch/${id}/cancel`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        onAction('Dispatch neutralized successfully.', 'success');
        fetchData();
      } else {
        onAction(data.error || 'Neutralization failed.', 'error');
      }
    } catch (error) {
      onAction('Cancellation engine fault.', 'error');
    }
  };

  if (isLoading || !metrics) {
    return (
      <div className="flex items-center justify-center h-64 p-12">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto p-8">
      <div className="flex items-center justify-between p-6 bg-white border border-slate-200 rounded-[2rem] shadow-sm">
        <div className="text-left">
          <h2 className="text-xl font-black uppercase tracking-tight">Delivery Intelligence</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Real-Time Dispatch Tracking & Latency Attribution</p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <div className="text-[10px] font-black uppercase text-emerald-500 tracking-tighter">System Health</div>
            <div className="text-xl font-black text-slate-900">OPTIMAL</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <Activity className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="panel-card p-6 bg-white rounded-[2rem] border border-slate-200 shadow-sm text-left">
          <div className="text-[10px] font-black uppercase text-slate-500 mb-2">Total Dispatched</div>
          <div className="text-2xl font-black text-slate-900">{metrics.total_sent.toLocaleString()}</div>
          <div className="mt-2 text-[10px] font-bold text-emerald-600 flex items-center gap-1">
             <ArrowUpRight className="w-3 h-3" /> 8.4% vs last period
          </div>
        </div>
        <div className="panel-card p-6 bg-white rounded-[2rem] border border-slate-200 shadow-sm text-left">
          <div className="text-[10px] font-black uppercase text-slate-500 mb-2">Delivery Rate</div>
          <div className="text-2xl font-black text-slate-900">{metrics.delivery_rate}%</div>
          <div className="mt-2 text-[10px] font-bold text-emerald-600 font-mono uppercase tracking-tight">Enterprise Standard: 98%</div>
        </div>
        <div className="panel-card p-6 bg-white rounded-[2rem] border border-slate-200 shadow-sm text-left">
          <div className="text-[10px] font-black uppercase text-slate-500 mb-2">Omni-Channel Opens</div>
          <div className="text-2xl font-black text-slate-900">{metrics.open_rate}%</div>
          <div className="mt-2 text-[10px] font-bold text-blue-600 uppercase tracking-tight">Impact: +12% Efficiency</div>
        </div>
        <div className="panel-card p-6 bg-white rounded-[2rem] border border-slate-200 shadow-sm text-left">
          <div className="text-[10px] font-black uppercase text-slate-500 mb-2">Engagement CTR</div>
          <div className="text-2xl font-black text-slate-900">{metrics.click_rate}%</div>
          <div className="mt-2 text-[10px] font-bold text-slate-400 italic tracking-tight">Tracking active via 256-bit GCM</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 panel-card p-8 bg-white rounded-[2rem] border border-slate-200 shadow-sm text-left">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-8">Propagation Timeline</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics.timeline}>
                <defs>
                  <linearGradient id="colorDelivery" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="timestamp" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#94a3b8'}} />
                <Tooltip />
                <Area type="monotone" dataKey="sent" stroke="#2563EB" strokeWidth={2} fill="transparent" />
                <Area type="monotone" dataKey="delivered" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorDelivery)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel-card p-6 bg-white rounded-[2rem] border border-slate-200 shadow-sm text-left">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6">Security Breakdown</h3>
          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">TLS 1.3 Encryption</span>
                <span className="text-xs font-black">92%</span>
             </div>
             <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-[92%]" />
             </div>
             <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">Human Approval Wait</span>
                <span className="text-xs font-black">4.2m</span>
             </div>
             <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-[65%]" />
             </div>
             <div className="p-4 bg-slate-900 border border-white/5 rounded-2xl flex items-center gap-4 mt-8">
                <ShieldCheck className="w-8 h-8 text-emerald-500" />
                <div className="text-left">
                   <div className="text-[10px] font-black uppercase text-white/40 tracking-widest leading-none mb-1">Vault Status</div>
                   <div className="text-xs font-black text-white uppercase">Secure & Rotated</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-4 text-left">Live Tracking Feed</h3>
        <div className="grid grid-cols-1 gap-4">
          {dispatches.map((disp) => (
            <div key={disp.id} className="panel-card p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-blue-600 transition-all group cursor-pointer text-left">
              <div className="flex items-center gap-6">
                 <div className={cn(
                   "p-2 rounded-lg",
                   disp.status === 'delivered' ? "bg-emerald-50 text-emerald-500" :
                   disp.status === 'bounced' ? "bg-red-50 text-red-500" : 
                   disp.status === 'cancelled' ? "bg-slate-100 text-slate-400" :
                   disp.status === 'scheduled' ? "bg-blue-50 text-blue-500" : "bg-blue-50 text-blue-500"
                 )}>
                   {disp.status === 'delivered' ? <CheckCircle2 className="w-5 h-5" /> : 
                    disp.status === 'bounced' ? <XCircle className="w-5 h-5" /> : 
                    disp.status === 'cancelled' ? <XCircle className="w-5 h-5 opacity-50" /> :
                    disp.status === 'scheduled' ? <Clock className="w-5 h-5" /> :
                    <RefreshCw className="w-5 h-5 animate-spin" />}
                 </div>
                 <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black text-slate-900 truncate">{disp.subject}</span>
                      <span className="text-[9px] font-mono text-slate-500 bg-slate-50 px-1 rounded uppercase">{disp.type}</span>
                      <span className="text-[9px] font-mono text-slate-500 bg-slate-50 px-1 rounded uppercase">{disp.security_level}</span>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400">
                       <span>To: {disp.to}</span>
                       <div className="w-1 h-1 rounded-full bg-slate-200" />
                       <span>{new Date(disp.timestamp).toLocaleString()}</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-6 text-right hidden sm:flex">
                    {(disp.status === 'scheduled' || disp.status === 'processing') && (
                      <button 
                        onClick={(e) => handleCancel(e, disp.id)}
                        className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-100 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-red-100 transition-all"
                      >
                        Abort
                      </button>
                    )}
                    <div>
                       <div className="text-[9px] font-black uppercase text-slate-400">Opens</div>
                       <div className="text-sm font-black text-slate-900">{disp.open_count || 0}</div>
                    </div>
                    <div>
                       <div className="text-[9px] font-black uppercase text-slate-400">Clicks</div>
                       <div className="text-sm font-black text-slate-900">{disp.click_count || 0}</div>
                    </div>
                 </div>
                 <div className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
