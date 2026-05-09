import React, { useState, useRef } from 'react';
import { Upload, Shield, Image as ImageIcon, AlertTriangle, CheckCircle2, RefreshCw, Sparkles, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { MediaComplianceReport } from '../types';

export const MediaComplianceScanner = ({ onAction }: { onAction: (msg: string, type?: string) => void }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [report, setReport] = useState<MediaComplianceReport | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      onAction('Only image assets are supported for compliance scanning.', 'error');
      return;
    }

    setPreview(URL.createObjectURL(file));
    setIsScanning(true);
    setReport(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/v1/media/scan-compliance', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.report) {
        setReport(data.report);
        onAction('Media asset analysis complete.', data.report.isCompliant ? 'success' : 'warning');
      } else {
        throw new Error(data.error || 'Scan failed');
      }
    } catch (error) {
      onAction('Vision analysis failed. Protocol fallback initiated.', 'error');
    } finally {
      setIsScanning(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="panel-card bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-xl">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-3 text-left">
          <div className="p-2 bg-amber-500 rounded-xl shadow-lg shadow-amber-200">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 tracking-tight uppercase">Media Compliance Scanner</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">Gemini Vision AI Protocol</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <div className="flex -space-x-2">
             {[1, 2, 3].map(i => (
               <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100" />
             ))}
           </div>
           <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest pl-2">Brand v4.0</span>
        </div>
      </div>

      <div className="p-8 space-y-8">
        <div 
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "relative group cursor-pointer aspect-video rounded-[2rem] border-2 border-dashed transition-all flex flex-col items-center justify-center p-8 overflow-hidden",
            isDragging ? "border-amber-500 bg-amber-50" : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
          )}
        >
          <input 
            type="file" 
            className="hidden" 
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            accept="image/*"
          />

          {preview ? (
            <div className="absolute inset-0">
               <img src={preview} alt="Asset preview" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/90 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-xl">
                    Replace Asset
                  </div>
               </div>
               {isScanning && (
                 <div className="absolute inset-0 bg-amber-500/20 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                    <RefreshCw className="w-10 h-10 text-white animate-spin" />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white animate-pulse">Deep Scan in Progress...</span>
                 </div>
               )}
            </div>
          ) : (
            <>
              <div className="p-5 bg-white rounded-3xl shadow-lg shadow-slate-200 mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-900">Drop Media Asset or Browse</p>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mt-2">Maximum file size: 10MB</p>
            </>
          )}
        </div>

        <AnimatePresence>
          {report && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4 p-6 rounded-3xl border bg-slate-50 border-slate-200">
                <div className={cn(
                  "p-3 rounded-2xl shadow-lg",
                  report.isCompliant ? "bg-emerald-500 shadow-emerald-200" : "bg-red-500 shadow-red-200"
                )}>
                  {report.isCompliant ? <CheckCircle2 className="w-6 h-6 text-white" /> : <AlertTriangle className="w-6 h-6 text-white" />}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900">
                      Compliance Verdict: {report.isCompliant ? 'Passed' : 'Corrective Action Required'}
                    </h4>
                    <span className={cn(
                      "text-[14px] font-black tracking-tighter",
                      report.score > 80 ? "text-emerald-500" : report.score > 50 ? "text-amber-500" : "text-red-500"
                    )}>
                      {report.score}% Match
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-600 leading-relaxed italic">
                    "{report.brandAlignment}"
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Brand Suggestions</h5>
                  </div>
                  <ul className="space-y-2">
                    {report.suggestions.map((s, i) => (
                      <li key={i} className="text-[10px] font-bold text-slate-700 bg-white border border-slate-100 p-3 rounded-xl flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                         {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-blue-500" />
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Chromatic Analysis</h5>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {report.detectedColors.map((color, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-full">
                         <div className="w-3 h-3 rounded-full shadow-inner border border-slate-200" style={{ backgroundColor: color.toLowerCase() }} />
                         <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">{color}</span>
                      </div>
                    ))}
                  </div>
                  {report.violations.length > 0 && (
                    <div className="mt-4 p-4 rounded-2xl bg-red-50/50 border border-red-100">
                       <h6 className="text-[9px] font-black uppercase tracking-widest text-red-500 mb-2">Policy Violations</h6>
                       <ul className="space-y-1.5">
                         {report.violations.map((v, i) => (
                           <li key={i} className="text-[10px] font-bold text-red-700 flex items-center gap-2 uppercase tracking-tight">
                              <span className="text-red-400">•</span> {v}
                           </li>
                         ))}
                       </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 bg-slate-950 border-t border-slate-900 flex items-center justify-between font-mono">
         <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Protocol: Vision-Engine-Alpha-2026</span>
         <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Sensitive Filter: ON</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Brand Hash: SYNCED</span>
            </div>
         </div>
      </div>
    </div>
  );
};
