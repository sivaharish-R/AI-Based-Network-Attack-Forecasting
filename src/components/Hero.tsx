import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp, 
  Cpu, 
  Clock, 
  Database, 
  Activity, 
  AlertTriangle, 
  Layers, 
  CheckCircle2, 
  XCircle,
  Sparkles,
  Zap
} from 'lucide-react';
import { ProjectSettings } from '../types';

interface HeroProps {
  settings: ProjectSettings;
  onExploreProject: () => void;
  onReadBlogs: () => void;
}

export const Hero: React.FC<HeroProps> = ({ settings, onExploreProject, onReadBlogs }) => {
  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden border-b border-[#1F293D]/80">
      {/* Cyber Grid & Ambient Gradient Background */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Research & Hackathon Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-6 shadow-[0_0_15px_rgba(0,240,255,0.15)] animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>SMART INDIA HACKATHON 2026 RESEARCH SHOWCASE</span>
            <span className="text-slate-400">|</span>
            <span className="text-emerald-400 font-semibold">{settings.teamName}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            AI-Based Network Attack <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Forecasting
            </span>{" "}
            from Traffic Data
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            {settings.projectSubtitle}
          </p>

          {/* 5-Pillar Research Tagline Badge */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 text-xs font-mono text-slate-300">
            {["Observe", "Learn", "Predict", "Explain", "Protect"].map((pillar, idx) => (
              <React.Fragment key={pillar}>
                <span className="px-2.5 py-1 rounded-md bg-[#111827] border border-[#1F293D] text-cyan-300 font-medium">
                  {pillar}
                </span>
                {idx < 4 && <span className="text-cyan-500 font-bold">→</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              id="cta-explore-project"
              onClick={onExploreProject}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-[#0B0F19] font-bold text-sm tracking-wide transition-all shadow-[0_0_25px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Explore Project System</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              id="cta-read-blogs"
              onClick={onReadBlogs}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#111827] hover:bg-[#1A2333] border border-cyan-500/30 hover:border-cyan-400 text-slate-200 hover:text-white font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Read Research Blogs (15)</span>
              <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 text-[11px] font-mono">
                Docs
              </span>
            </button>
          </div>
        </div>

        {/* Traditional IDS vs Our System Comparison Showcase */}
        <div className="mt-4 mb-12">
          <div className="text-center mb-6">
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
              Core Architectural Paradigm Shift
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              Reactive Intrusion Detection vs. Predictive Attack Forecasting
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Traditional IDS Card */}
            <div className="relative p-6 rounded-2xl bg-[#111827]/80 border border-red-900/40 shadow-lg backdrop-blur-sm overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl" />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-red-950/60 border border-red-800/40 text-red-400">
                    <XCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Traditional IDS / IPS</h4>
                    <span className="text-[11px] font-mono text-red-400">Reactive Detection</span>
                  </div>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-red-950 text-red-300 font-mono border border-red-900">
                  Late Intervention
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#1F293D] mb-4 text-xs font-mono text-slate-300">
                <span className="text-slate-500">// Fundamental Question</span>
                <p className="text-red-300 font-semibold mt-1">"Is an attack happening right now?"</p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">✕</span>
                  <span>Alerts generated only <strong>after</strong> perimeter breach or payload execution</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">✕</span>
                  <span>Overwhelms analysts with thousands of isolated, context-free false alarms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">✕</span>
                  <span>Zero foresight into attacker's next planned tactical movement</span>
                </li>
              </ul>
            </div>

            {/* Our Proposed System Card */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-b from-[#111827] to-[#0D1525] border border-cyan-500/50 shadow-[0_0_30px_rgba(0,240,255,0.15)] backdrop-blur-sm overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.3)]">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      Our Proposed System
                      <span className="px-1.5 py-0.2 rounded bg-cyan-900/60 text-cyan-300 text-[10px] font-mono">
                        Active
                      </span>
                    </h4>
                    <span className="text-[11px] font-mono text-cyan-400">Predictive Forecasting</span>
                  </div>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono border border-cyan-500/40">
                  Pre-Emptive (T+1..T+5)
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-cyan-500/30 mb-4 text-xs font-mono text-slate-300">
                <span className="text-slate-500">// Fundamental Question</span>
                <p className="text-cyan-300 font-semibold mt-1">"What is likely to happen next, and when?"</p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5 font-bold">✓</span>
                  <span><strong>30s to 5-minute pre-emptive response window</strong> prior to lateral pivoting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5 font-bold">✓</span>
                  <span>Learns state dynamics P(S<sub>t+1</sub> | S<sub>t</sub>) via recurrent sequence World Models</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5 font-bold">✓</span>
                  <span>Explainable AI (SHAP) + direct MITRE ATT&CK tactical mapping</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Live System Benchmarks Ticker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-xl bg-[#111827]/70 border border-[#1F293D] flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-mono mb-1">
              <Activity className="w-3.5 h-3.5" />
              <span>HORIZON STEPS</span>
            </div>
            <span className="text-2xl font-bold text-white">T+1 to T+5</span>
            <span className="text-[11px] text-slate-400 mt-0.5">10s → 300s Projection</span>
          </div>

          <div className="p-4 rounded-xl bg-[#111827]/70 border border-[#1F293D] flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 text-blue-400 text-xs font-mono mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>LOCAL INFERENCE</span>
            </div>
            <span className="text-2xl font-bold text-white">&lt; 9.4 ms</span>
            <span className="text-[11px] text-slate-400 mt-0.5">ONNX INT8 Quantized</span>
          </div>

          <div className="p-4 rounded-xl bg-[#111827]/70 border border-[#1F293D] flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono mb-1">
              <Database className="w-3.5 h-3.5" />
              <span>STORAGE SAVINGS</span>
            </div>
            <span className="text-2xl font-bold text-white">92.5%</span>
            <span className="text-[11px] text-slate-400 mt-0.5">Risk-Adaptive Capture</span>
          </div>

          <div className="p-4 rounded-xl bg-[#111827]/70 border border-[#1F293D] flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-mono mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DEPLOYMENT</span>
            </div>
            <span className="text-2xl font-bold text-white">100% Offline</span>
            <span className="text-[11px] text-slate-400 mt-0.5">Zero Cloud API Leaks</span>
          </div>
        </div>
      </div>
    </section>
  );
};
