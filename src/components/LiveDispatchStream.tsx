import React, { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, Activity, Wifi, WifiOff, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

interface DispatchEvent {
  type: string;
  timestamp: string;
  details: any;
}

export const LiveDispatchStream = () => {
  const [events, setEvents] = useState<DispatchEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socket: Socket = io();

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('event', (event: DispatchEvent) => {
      setEvents((prev) => [event, ...prev].slice(0, 50));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const getEventStyles = (type: string) => {
    switch (type) {
      case 'DISPATCH_INITIATED': return 'text-blue-500 border-blue-100 bg-blue-50/30';
      case 'SANITIZATION_START': 
      case 'SECURITY_SANITIZATION': return 'text-emerald-400 border-emerald-900/50 bg-emerald-500/5';
      case 'SANITIZATION_COMPLETE': return 'text-emerald-400 border-emerald-800 bg-emerald-900/20';
      case 'ENCRYPTION_APPLIED': return 'text-purple-400 border-purple-900/50 bg-purple-500/5';
      case 'TRANSMISSION_COMPLETE': 
      case 'TRANSMISSION_SCHEDULED': return 'text-blue-400 border-blue-900/50 bg-blue-500/5';
      case 'APPROVAL_REQUIRED': return 'text-amber-400 border-amber-900/50 bg-amber-500/5 border-l-2 border-l-amber-500';
      case 'APPROVAL_GRANTED': return 'text-emerald-400 border-emerald-900/50 bg-emerald-500/5';
      case 'APPROVAL_REJECTED': return 'text-red-400 border-red-900/50 bg-red-500/5';
      case 'DISPATCH_NEUTRALIZED': return 'text-slate-400 border-slate-700 bg-slate-800/50';
      case 'COMPLIANCE_SCAN': return 'text-cyan-400 border-cyan-900/50 bg-cyan-500/5';
      case 'COMPLIANCE_RESULT': return 'text-cyan-400 border-cyan-800 bg-cyan-900/20';
      case 'MEDIA_SCAN_INITIATED': return 'text-amber-300 border-amber-900/50 bg-amber-500/5';
      case 'MEDIA_SCAN_COMPLETE': return 'text-amber-400 border-amber-800 bg-amber-900/20';
      case 'PROTOCOL_UPDATED': return 'text-blue-300 border-blue-800 bg-blue-900/20';
      case 'SYSTEM_HANDSHAKE': return 'text-slate-500 border-slate-800 bg-slate-900/50';
      default: return 'text-slate-400 border-slate-800 bg-slate-900/50';
    }
  };

  return (
    <div className="panel-card bg-slate-900 border-slate-800 rounded-[2rem] overflow-hidden flex flex-col h-[400px] shadow-2xl">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-600/20 rounded-lg">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-100">Live Dispatch Terminal</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", isConnected ? "bg-emerald-500" : "bg-red-500")} />
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                {isConnected ? 'Stream Active' : 'Connecting to Node...'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
           <Activity className="w-3.5 h-3.5 text-slate-600" />
           {isConnected ? <Wifi className="w-3.5 h-3.5 text-emerald-600" /> : <WifiOff className="w-3.5 h-3.5 text-red-600" />}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar font-mono">
        <AnimatePresence mode="popLayout">
          {events.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-30">
               <div className="w-8 h-8 border-2 border-slate-700 border-t-slate-500 rounded-full animate-spin mb-4" />
               <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Awaiting stream packets...</span>
            </div>
          )}
          {events.map((event, idx) => (
            <motion.div
              key={event.timestamp + idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "p-3 rounded-xl border flex flex-col gap-1.5",
                getEventStyles(event.type)
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5">
                  <Shield className="w-3 h-3" />
                  {event.type.replace(/_/g, ' ')}
                </span>
                <span className="text-[8px] opacity-60 font-bold">
                  {new Date(event.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
              <div className="text-[10px] font-medium leading-relaxed opacity-90 break-words">
                {typeof event.details === 'string' ? event.details : JSON.stringify(event.details)}
              </div>
              {event.type === 'APPROVAL_REQUIRED' && (
                <div className="mt-2 text-right">
                  <a 
                    href="/email-approvals" 
                    className="text-[8px] font-black uppercase text-amber-400 hover:text-amber-300 transition-colors flex items-center justify-end gap-1"
                  >
                    Manage Approval <Clock className="w-2.5 h-2.5" />
                  </a>
                </div>
              )}
              {(event.type === 'TRANSMISSION_COMPLETE' || event.type === 'TRANSMISSION_SCHEDULED') && (
                <div className="mt-2 text-right">
                  <a 
                    href="/email-tracking" 
                    className="text-[8px] font-black uppercase text-blue-400 hover:text-blue-300 transition-colors flex items-center justify-end gap-1"
                  >
                    Track Dispatch <Activity className="w-2.5 h-2.5" />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-3 bg-slate-950/50 border-t border-slate-800 flex items-center justify-between">
         <span className="text-[8px] font-black uppercase tracking-widest text-slate-600">Encrypted-at-Rest • Node 0.4.1</span>
         <div className="flex gap-1">
            {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 bg-slate-700 rounded-full" />)}
         </div>
      </div>
    </div>
  );
};
