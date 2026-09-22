import React, { useState } from 'react';
import { 
  Shield, 
  Activity, 
  Terminal, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Zap, 
  AlertCircle,
  HelpCircle,
  Eye,
  Sliders
} from 'lucide-react';
import { MITRE_STAGES } from '../data/defaultData';
import { MitreStageInfo } from '../types';

export const XAISection: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<string>(MITRE_STAGES[0].id);

  const selectedStage: MitreStageInfo = MITRE_STAGES.find(s => s.id === selectedStageId) || MITRE_STAGES[0];

  // SHAP Feature Importance Interactive Dataset
  const shapFeatures = [
    { name: "SYN Flag Ratio Spike", value: +0.48, category: "Flag Ratio", baseline: "0.08 normal vs 0.84 measured" },
    { name: "Unique Target Ports / Sec", value: +0.39, category: "Volumetric", baseline: "2 ports/s normal vs 148 measured" },
    { name: "Inter-Arrival Time (IAT) Entropy", value: +0.31, category: "Temporal", baseline: "Random browse vs periodic tool pulse" },
    { name: "RST Flag Ratio", value: +0.22, category: "Flag Ratio", baseline: "Closed port rejection frequency" },
    { name: "TTL Variance Fluctuation", value: +0.18, category: "Statistical", baseline: "Multi-path packet routing discrepancy" },
    { name: "Down/Up Byte Asymmetry", value: +0.14, category: "Volumetric", baseline: "Heavy outbound payload flow" },
    { name: "Known Trusted Internal CIDR", value: -0.28, category: "Reputation", baseline: "Source originates from verified subnet" },
    { name: "Graceful TCP FIN Closures", value: -0.21, category: "Flag Ratio", baseline: "Normal handshake termination observed" }
  ];

  return (
    <section id="xai" className="py-20 bg-[#0B0F19] relative border-b border-[#1F293D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3">
            <Activity className="w-3.5 h-3.5" />
            <span>EXPLAINABLE AI & ATT&CK TAXONOMY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            MITRE ATT&CK Progression & Explainable AI (XAI)
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            Demystifying neural forecasting with SHAP feature attribution and mapping forecasted state transitions directly to the MITRE Enterprise matrix.
          </p>
        </div>

        {/* 6-Stage MITRE ATT&CK Progression Timeline */}
        <div className="mb-14">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
            Adversary Lifecycle Progression Path (Select stage to inspect):
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {MITRE_STAGES.map((st, idx) => {
              const isSelected = st.id === selectedStageId;
              return (
                <button
                  key={st.id}
                  onClick={() => setSelectedStageId(st.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-cyan-950/80 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                      : 'bg-[#111827] border-[#1F293D] hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 text-[10px] font-mono">
                    <span className="text-slate-500">STAGE 0{idx + 1}</span>
                    <span className={`px-1.5 py-0.2 rounded font-bold ${
                      st.urgency === 'Immediate' ? 'bg-red-950 text-red-300 border border-red-800' :
                      st.urgency === 'High' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      st.urgency === 'Moderate' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                      'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      {st.urgency}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white truncate mb-1">
                    {st.stageName}
                  </h4>
                  <div className="text-[10px] font-mono text-cyan-400 truncate">
                    {st.techniqueId}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Stage Detail Card */}
          <div className="mt-4 p-5 rounded-xl bg-[#111827] border border-cyan-500/40">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-[#1F293D]">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <span>{selectedStage.mitreTactic}</span>
                  <span>•</span>
                  <span>{selectedStage.techniqueId}: {selectedStage.techniqueName}</span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  {selectedStage.stageName} Analysis & Forensics
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Response Urgency:</span>
                <span className="px-2.5 py-1 rounded-lg bg-red-950/70 border border-red-500/40 text-red-300 text-xs font-mono font-bold">
                  {selectedStage.urgency} Action
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <h5 className="text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                  Detection Indicators in Flow:
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedStage.detectionIndicators.map((ind, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">•</span>
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                  Recommended Incident Playbook:
                </h5>
                <div className="p-3 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-xs text-slate-200">
                  {selectedStage.recommendedPlaybook}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SHAP Feature Attribution Interactive Plot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: SHAP Waterfall / Bar Chart (7 Cols) */}
          <div className="lg:col-span-7 bg-[#111827] rounded-2xl border border-[#1F293D] p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>SHAP Feature Attribution Breakdown</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Shows how specific packet features push the forecasted risk probability higher (+) or lower (-).
                </p>
              </div>

              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="flex items-center gap-1 text-red-400">
                  <span className="w-2.5 h-2.5 rounded-sm bg-red-500" /> +Risk Driver
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> -Benign Driver
                </span>
              </div>
            </div>

            {/* Feature Bars */}
            <div className="space-y-3 mt-4">
              {shapFeatures.map((feat) => {
                const isPositive = feat.value > 0;
                const absPct = Math.min(Math.abs(feat.value) * 160, 100);
                return (
                  <div key={feat.name} className="p-3 rounded-xl bg-[#0B0F19] border border-[#1F293D]">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-white">{feat.name}</span>
                      <span className={`font-mono font-bold ${isPositive ? 'text-red-400' : 'text-emerald-400'}`}>
                        {isPositive ? `+${feat.value.toFixed(2)}` : feat.value.toFixed(2)}
                      </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-1.5 flex">
                      {isPositive ? (
                        <div 
                          className="h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full" 
                          style={{ width: `${absPct}%` }}
                        />
                      ) : (
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" 
                          style={{ width: `${absPct}%` }}
                        />
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>Category: {feat.category}</span>
                      <span>{feat.baseline}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Human-in-the-Loop Decision Framework (5 Cols) */}
          <div className="lg:col-span-5 bg-[#111827] rounded-2xl border border-[#1F293D] p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Human-in-the-Loop (HITL) Framework</h4>
                <span className="text-[11px] font-mono text-cyan-400">Actionable Security Decision Matrix</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Autonomous security AI that terminates connections without human verification risks bringing down critical production workloads. Our system pairs AI speed in telemetry calculation with human operational context.
            </p>

            <div className="space-y-3">
              {/* Level 1 Action */}
              <div className="p-3 rounded-xl bg-[#0B0F19] border border-emerald-900/40">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-emerald-400">Level 1: Passive Containment</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Automated by AI
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Automatically freezes Level 1 PCAP circular buffer when forecast risk breaches 0.65. Applies dynamic rate-limiting to source CIDR.
                </p>
              </div>

              {/* Level 2 Action */}
              <div className="p-3 rounded-xl bg-[#0B0F19] border border-amber-900/40">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-400">Level 2: Analyst Confirmation</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-800">
                    Human-in-the-Loop
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Presents 1-click execution for host quarantine, WAF virtual patch injection, or Kerberos ticket revocation with full SHAP transparency.
                </p>
              </div>

              {/* Level 3 Action */}
              <div className="p-3 rounded-xl bg-[#0B0F19] border border-red-900/40">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-red-400">Level 3: Incident Escalation</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-red-950 text-red-300 border border-red-800">
                    SOC Tier-3 / CISO
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Activates emergency enterprise breach protocol, isolates core DMZ routing, and compiles signed 24-hour forensic evidence artifact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
