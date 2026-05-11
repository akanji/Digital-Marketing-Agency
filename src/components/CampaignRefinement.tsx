import React, { useState, useEffect } from 'react';
import { 
  Target, 
  MapPin, 
  Users, 
  Globe, 
  MessageSquare, 
  TrendingUp, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Smile,
  BarChart3,
  Search,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { 
  Campaign, 
  CampaignTargeting, 
  SentimentResult, 
  CampaignPerformanceMetrics 
} from '../types';

interface CampaignRefinementProps {
  campaign: Campaign;
  onUpdate: (updatedCampaign: Partial<Campaign>) => void;
  onAction: (msg: string, type?: string) => void;
}

export const CampaignRefinement: React.FC<CampaignRefinementProps> = ({ 
  campaign, 
  onUpdate,
  onAction 
}) => {
  const [activeTab, setActiveTab] = useState<'targeting' | 'metrics' | 'sentiment' | 'sync'>('targeting');
  const [targetingOptions, setTargetingOptions] = useState<any>(null);
  const [performance, setPerformance] = useState<CampaignPerformanceMetrics | null>(null);
  const [sentiment, setSentiment] = useState<SentimentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisText, setAnalysisText] = useState(campaign.name);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'complete'>('idle');

  useEffect(() => {
    fetchTargetingOptions();
    fetchPerformance();
  }, [campaign.id]);

  const fetchTargetingOptions = async () => {
    try {
      const res = await fetch('/api/v1/campaigns/targeting-options');
      const data = await res.json();
      setTargetingOptions(data);
    } catch (error) {
      console.error('Failed to fetch targeting options');
    }
  };

  const fetchPerformance = async () => {
    try {
      const res = await fetch(`/api/v1/campaigns/performance/${campaign.id}`);
      const data = await res.json();
      setPerformance(data.metrics);
    } catch (error) {
      console.error('Failed to fetch performance metrics');
    }
  };

  const analyzeSentiment = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/v1/campaigns/sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: analysisText })
      });
      const data = await res.json();
      setSentiment(data);
      onAction('Sentiment analysis complete.');
    } catch (error) {
      onAction('Sentiment analysis failed.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSync = async () => {
    if (selectedPlatforms.length === 0) {
      onAction('Select at least one platform to sync.', 'warning');
      return;
    }
    setSyncStatus('syncing');
    try {
      const res = await fetch('/api/v1/campaigns/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignId: campaign.id, platforms: selectedPlatforms })
      });
      const data = await res.json();
      onAction(data.message);
      
      // Wait for socket or timeout simulation
      setTimeout(() => {
        setSyncStatus('complete');
        onAction(`Cross-platform sync successful for ${selectedPlatforms.join(', ')}.`);
      }, 3000);
    } catch (error) {
      onAction('Sync protocol failure.', 'error');
      setSyncStatus('idle');
    }
  };

  return (
    <div className="bg-white border border-agency-border rounded-3xl overflow-hidden shadow-sm">
      {/* Header Nav */}
      <div className="flex border-b border-agency-border bg-agency-bg/30">
        {[
          { id: 'targeting', label: 'Targeting', icon: Target },
          { id: 'metrics', label: 'Performance', icon: BarChart3 },
          { id: 'sentiment', label: 'Sentiment', icon: Smile },
          { id: 'sync', label: 'Platform Sync', icon: RefreshCw },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-4 text-[10px] font-black uppercase tracking-widest transition-all border-b-2",
              activeTab === tab.id 
                ? "border-agency-accent text-agency-accent bg-white" 
                : "border-transparent text-agency-muted hover:text-agency-ink"
            )}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'targeting' && (
            <motion.div 
              key="targeting"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-4 h-4 text-agency-accent" />
                <h3 className="font-bold text-sm">Campaign Targeting Refinement</h3>
              </div>

              {!targetingOptions ? (
                <div className="flex items-center justify-center py-12">
                  <RefreshCw className="w-6 h-6 text-agency-accent animate-spin" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="text-[9px] font-black uppercase text-agency-muted tracking-widest">Geographic Locations</label>
                    <div className="flex flex-wrap gap-2">
                      {targetingOptions.locations.map((loc: string) => (
                        <button
                          key={loc}
                          onClick={() => {
                            const newLocs = campaign.targeting?.locations?.includes(loc)
                              ? campaign.targeting.locations.filter(l => l !== loc)
                              : [...(campaign.targeting?.locations || []), loc];
                            onUpdate({ targeting: { ...campaign.targeting, locations: newLocs } });
                          }}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all",
                            campaign.targeting?.locations?.includes(loc)
                              ? "bg-agency-accent text-white border-agency-accent"
                              : "bg-agency-bg text-agency-muted border-agency-border"
                          )}
                        >
                          <MapPin className="w-3 h-3 inline mr-1" /> {loc}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[9px] font-black uppercase text-agency-muted tracking-widest">Age Ranges</label>
                    <div className="grid grid-cols-2 gap-2">
                        {targetingOptions.ageRanges.map((range: any) => (
                          <button
                            key={range.label}
                            onClick={() => onUpdate({ targeting: { ...campaign.targeting, ageRange: { min: range.min, max: range.max } } })}
                            className={cn(
                              "px-3 py-2 rounded-xl text-[10px] font-bold border text-center transition-all",
                              campaign.targeting?.ageRange?.min === range.min
                                ? "bg-agency-accent/5 text-agency-accent border-agency-accent shadow-sm"
                                : "bg-agency-bg text-agency-muted border-agency-border"
                            )}
                          >
                            {range.label}
                          </button>
                        ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[9px] font-black uppercase text-agency-muted tracking-widest">Interests & Topics</label>
                    <div className="flex flex-wrap gap-2">
                       {targetingOptions.interests.map((interest: string) => (
                        <button
                          key={interest}
                          onClick={() => {
                            const newInterests = campaign.targeting?.interests?.includes(interest)
                              ? campaign.targeting.interests.filter(i => i !== interest)
                              : [...(campaign.targeting?.interests || []), interest];
                            onUpdate({ targeting: { ...campaign.targeting, interests: newInterests } });
                          }}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all",
                            campaign.targeting?.interests?.includes(interest)
                              ? "bg-agency-ink text-white border-agency-ink"
                              : "bg-agency-bg text-agency-muted border-agency-border"
                          )}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[9px] font-black uppercase text-agency-muted tracking-widest">Selected Platforms</label>
                    <div className="grid grid-cols-2 gap-2">
                        {targetingOptions.platforms.map((plat: string) => (
                          <button
                            key={plat}
                            onClick={() => {
                              const newPlats = campaign.targeting?.platforms?.includes(plat as any)
                                ? campaign.targeting.platforms.filter(p => p !== plat)
                                : [...(campaign.targeting?.platforms || []), plat];
                              onUpdate({ targeting: { ...campaign.targeting, platforms: newPlats as any } });
                            }}
                            className={cn(
                              "px-3 py-2 rounded-xl text-[10px] font-bold border flex items-center justify-between transition-all",
                              campaign.targeting?.platforms?.includes(plat as any)
                                ? "bg-emerald-50 text-emerald-700 border-emerald-500/30"
                                : "bg-agency-bg text-agency-muted border-agency-border"
                            )}
                          >
                            <span>{plat}</span>
                            {campaign.targeting?.platforms?.includes(plat as any) && <CheckCircle2 className="w-3 h-3" />}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'metrics' && (
            <motion.div 
              key="metrics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
               <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-4 h-4 text-agency-accent" />
                <h3 className="font-bold text-sm">Real-time Performance Metrics</h3>
              </div>

              {!performance ? (
                <div className="flex items-center justify-center py-12">
                   <RefreshCw className="w-6 h-6 text-agency-accent animate-spin" />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Spend', value: `$${performance.spend.toLocaleString()}`, color: 'text-agency-ink' },
                      { label: 'ROAS', value: `${performance.roas.toFixed(2)}x`, color: 'text-emerald-600' },
                      { label: 'Conversions', value: performance.conversions.toLocaleString(), color: 'text-agency-accent' },
                      { label: 'CTR', value: `${(performance.ctr * 100).toFixed(2)}%`, color: 'text-agency-ink' },
                    ].map((m) => (
                      <div key={m.label} className="p-4 bg-agency-bg rounded-2xl border border-agency-border">
                        <div className="text-[8px] font-black uppercase text-agency-muted mb-1">{m.label}</div>
                        <div className={cn("text-lg font-black", m.color)}>{m.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 bg-slate-900 rounded-3xl text-white">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pacing & Conversion History</h4>
                      <BarChart3 className="w-4 h-4 text-agency-accent" />
                    </div>
                    <div className="h-40 flex items-end gap-1">
                      {performance.history.slice(-20).map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end gap-1 group relative">
                          <div 
                            className="bg-agency-accent/60 group-hover:bg-agency-accent transition-all rounded-t-sm" 
                            style={{ height: `${(h.spend / 600) * 100}%` }} 
                          />
                          <div 
                            className="bg-emerald-500/60 group-hover:bg-emerald-500 transition-all rounded-t-sm" 
                            style={{ height: `${(h.conversions / 25) * 100}%` }} 
                          />
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                            <div className="bg-white text-agency-ink text-[10px] font-bold p-2 rounded-lg shadow-xl whitespace-nowrap">
                              <div>{h.date}</div>
                              <div className="text-agency-accent">Spend: ${h.spend}</div>
                              <div className="text-emerald-600">Conv: {h.conversions}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'sentiment' && (
            <motion.div 
              key="sentiment"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Smile className="w-4 h-4 text-agency-accent" />
                <h3 className="font-bold text-sm">Creative Sentiment Analysis</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-agency-muted tracking-widest ml-1">Analysis Input (Campaign Copy / Feedback)</label>
                  <textarea 
                    value={analysisText}
                    onChange={(e) => setAnalysisText(e.target.value)}
                    className="w-full h-32 bg-agency-bg border border-agency-border rounded-2xl p-4 text-sm font-medium outline-none focus:border-agency-accent transition-all resize-none"
                    placeholder="Enter text to analyze sentiment..."
                  />
                </div>

                <button
                  onClick={analyzeSentiment}
                  disabled={isLoading}
                  className="w-full py-4 bg-agency-accent text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-agency-accent/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <TrendingUp className="w-4 h-4" />}
                  Generate Sentiment Report
                </button>
              </div>

              {sentiment && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-5 duration-500">
                  <div className="p-6 bg-agency-bg rounded-3xl border border-agency-border space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-[10px] font-bold text-agency-muted uppercase">Global Sentiment</div>
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-black uppercase",
                        sentiment.label === 'Positive' ? "bg-emerald-100 text-emerald-700" :
                        sentiment.label === 'Negative' ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                      )}>{sentiment.label}</span>
                    </div>

                    <div className="flex items-center gap-4">
                       <div className="text-4xl font-black text-agency-ink">{(sentiment.score * 100).toFixed(0)}</div>
                       <div className="flex-1 h-3 bg-white border border-agency-border rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full transition-all duration-1000",
                              sentiment.score > 0 ? "bg-emerald-500" : "bg-red-500"
                            )} 
                            style={{ width: `${Math.abs(sentiment.score) * 100}%` }}
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <div className="text-[8px] font-black text-agency-muted uppercase">Emotion Breakdown</div>
                       {sentiment.topEmotions.map((e, i) => (
                         <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-agency-ink">
                            <span className="w-16 uppercase">{e.emotion}</span>
                            <div className="flex-1 h-1 bg-white rounded-full overflow-hidden">
                               <div className="h-full bg-agency-accent" style={{ width: `${e.score * 100}%` }} />
                            </div>
                            <span className="w-8 text-right">{(e.score * 100).toFixed(0)}%</span>
                         </div>
                       ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-[10px] font-bold text-agency-muted uppercase px-1">AI Suggestions</div>
                    <div className="space-y-3">
                       {sentiment.suggestions.map((s, i) => (
                         <div key={i} className="p-4 bg-white border border-agency-border rounded-2xl text-[11px] font-medium text-agency-ink flex gap-3 italic">
                            <div className="p-1 bg-agency-accent/10 rounded-lg h-fit">
                               <MessageSquare className="w-3.5 h-3.5 text-agency-accent" />
                            </div>
                            {s}
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'sync' && (
            <motion.div 
              key="sync"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <RefreshCw className="w-4 h-4 text-agency-accent" />
                <h3 className="font-bold text-sm">Cross-Platform Asset Sync</h3>
              </div>

              <div className="p-8 bg-agency-bg rounded-3xl border border-agency-border flex flex-col items-center text-center space-y-6">
                <div className="p-6 bg-white rounded-full border border-agency-border shadow-sm">
                  <Globe className="w-12 h-12 text-agency-accent" />
                </div>
                <div>
                  <h4 className="text-xl font-bold font-display">Multi-Platform Deployment</h4>
                  <p className="text-sm text-agency-muted mt-2 max-w-sm">Synchronize your finalized campaign creative and targeting parameters across all selected advertising nodes simultaneously.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                   {['Meta', 'Google', 'TikTok', 'LinkedIn'].map(p => (
                     <button
                      key={p}
                      onClick={() => {
                        setSelectedPlatforms(prev => 
                          prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
                        );
                      }}
                      className={cn(
                        "px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all",
                        selectedPlatforms.includes(p)
                          ? "bg-agency-ink text-white border-agency-ink shadow-lg"
                          : "bg-white text-agency-muted border-agency-border hover:border-agency-muted"
                      )}
                     >
                       {p}
                     </button>
                   ))}
                </div>

                <button
                  onClick={handleSync}
                  disabled={syncStatus === 'syncing' || selectedPlatforms.length === 0}
                  className="w-full max-w-xs py-4 bg-agency-accent text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-agency-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {syncStatus === 'syncing' ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                  {syncStatus === 'syncing' ? 'Syncing Shards...' : 'Initialize Sync Protocol'}
                </button>

                {syncStatus === 'complete' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-widest px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-xl"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    All nodes synchronized
                  </motion.div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Latency', value: '42ms', icon: Globe },
                  { label: 'Integrity', value: '100%', icon: ShieldCheck },
                  { label: 'Revision', value: 'v4.2.1', icon: BarChart3 },
                ].map((stat, i) => (
                  <div key={i} className="p-4 bg-white border border-agency-border rounded-2xl flex items-center gap-3">
                    <div className="p-2 bg-agency-bg rounded-lg">
                      <stat.icon className="w-3.5 h-3.5 text-agency-muted" />
                    </div>
                    <div>
                      <div className="text-[8px] font-black text-agency-muted uppercase">{stat.label}</div>
                      <div className="text-xs font-black text-agency-ink">{stat.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 bg-agency-bg/50 border-t border-agency-border flex justify-between items-center px-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-bold text-agency-muted uppercase tracking-widest tracking-tighter">A2A Synchronization Engine: Standby</span>
        </div>
        <div className="text-[9px] font-mono text-agency-muted">CAMPAIGNHASH_{campaign.id.toUpperCase()}</div>
      </div>
    </div>
  );
};

const ShieldCheck = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
);
