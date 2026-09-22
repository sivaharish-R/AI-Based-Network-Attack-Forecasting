import React, { useState } from 'react';
import { 
  Network, 
  Binary, 
  Cpu, 
  GitBranch, 
  BrainCircuit, 
  ShieldCheck, 
  FileText, 
  Activity, 
  Radio, 
  FileCode, 
  Sliders, 
  Check, 
  Upload, 
  Play, 
  RefreshCw,
  Info
} from 'lucide-react';
import { FLOW_FEATURES } from '../data/defaultData';

export const WorkflowSection: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'live' | 'pcap'>('live');
  const [selectedPcap, setSelectedPcap] = useState('mirai_botnet_scan.pcap');
  const [pcapProcessing, setPcapProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState(3);

  const pipelineSteps = [
    {
      num: 1,
      title: "Traffic Ingestion",
      tech: "Scapy / libpcap",
      icon: Network,
      desc: "Captures raw packets via AF_PACKET ring buffer with microsecond timestamps."
    },
    {
      num: 2,
      title: "Flow Parsing",
      tech: "Bidirectional 5-Tuple",
      icon: Binary,
      desc: "Reassembles packets into bidirectional flows tracking source/destination IPs & ports."
    },
    {
      num: 3,
      title: "Feature Fusion",
      tech: "15+ Flow Metrics",
      icon: Sliders,
      desc: "Calculates statistical moments: IAT, SYN ratios, byte skew, and packet entropy."
    },
    {
      num: 4,
      title: "World Model",
      tech: "LSTM / Transformer",
      icon: BrainCircuit,
      desc: "Autoregressively projects state probability distribution: P(S_{t+1} | S_t)."
    },
    {
      num: 5,
      title: "K-Step Forecast",
      tech: "T+1..T+5 Horizons",
      icon: GitBranch,
      desc: "Outputs risk curve across 10s to 300s lookahead windows with confidence bounds."
    },
    {
      num: 6,
      title: "MITRE ATT&CK",
      tech: "TA0043 → TA0010",
      icon: ShieldCheck,
      desc: "Translates abstract latent embeddings into standardized adversary tactic sequences."
    },
    {
      num: 7,
      title: "Explainable AI",
      tech: "SHAP Attribution",
      icon: Activity,
      desc: "Pinpoints exactly which network flags and volume spikes triggered the prediction."
    },
    {
      num: 8,
      title: "SOC Playbooks",
      tech: "Human-in-the-Loop",
      icon: FileCode,
      desc: "Provides actionable remediation guidance (e.g. rate limit, isolate host, block C2)."
    },
    {
      num: 9,
      title: "Real-Time UI",
      tech: "React & Chart.js",
      icon: Radio,
      desc: "Visualizes live state metrics, radar gauges, and interactive timeline controls."
    },
    {
      num: 10,
      title: "24-Hr Audit",
      tech: "Signed JSON / PDF",
      icon: FileText,
      desc: "Synthesizes daily forensic audit logs adhering to ISO/IEC 27037 chain-of-custody."
    }
  ];

  const pcapSamples = [
    {
      filename: "mirai_botnet_scan.pcap",
      size: "14.2 MB",
      flows: 1840,
      packets: 42100,
      detectedTactic: "TA0043 Reconnaissance → DoS",
      riskScore: 0.94
    },
    {
      filename: "lateral_movement_wmi.pcap",
      size: "8.6 MB",
      flows: 890,
      packets: 19400,
      detectedTactic: "TA0008 Lateral Movement",
      riskScore: 0.88
    },
    {
      filename: "exfiltration_dns_tunnel.pcap",
      size: "4.1 MB",
      flows: 412,
      packets: 9800,
      detectedTactic: "TA0010 Exfiltration",
      riskScore: 0.96
    },
    {
      filename: "benign_corporate_baseline.pcap",
      size: "28.4 MB",
      flows: 3410,
      packets: 84300,
      detectedTactic: "Normal Corporate Operations",
      riskScore: 0.08
    }
  ];

  const handleSimulatePcap = () => {
    setPcapProcessing(true);
    setTimeout(() => {
      setPcapProcessing(false);
    }, 900);
  };

  return (
    <section id="workflow" className="py-20 bg-[#0B0F19] relative border-b border-[#1F293D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>END-TO-END PIPELINE ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            System Workflow & Operational Pipeline
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            From raw packet capture to deep World Model state forecasting, Explainable AI (SHAP), and human-in-the-loop incident response.
          </p>
        </div>

        {/* 10-Step Interactive Visual Pipeline Ribbon */}
        <div className="mb-14">
          <div className="flex items-center justify-between overflow-x-auto pb-4 gap-2 scrollbar-thin">
            {pipelineSteps.map((step) => {
              const Icon = step.icon;
              const isSelected = activeStep === step.num;
              return (
                <button
                  key={step.num}
                  onClick={() => setActiveStep(step.num)}
                  className={`flex-shrink-0 flex flex-col items-center p-3 rounded-xl border text-center transition-all cursor-pointer w-28 ${
                    isSelected
                      ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                      : 'bg-[#111827] border-[#1F293D] text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1.5 ${
                    isSelected ? 'bg-cyan-500 text-[#0B0F19]' : 'bg-slate-800 text-slate-300'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">STEP 0{step.num}</span>
                  <span className="text-xs font-semibold truncate w-full text-slate-200">{step.title}</span>
                  <span className="text-[9px] text-slate-500 truncate w-full mt-0.5">{step.tech}</span>
                </button>
              );
            })}
          </div>

          {/* Active Step Details Banner */}
          <div className="p-4 rounded-xl bg-[#111827] border border-cyan-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-950 flex items-center justify-center border border-cyan-500/50 text-cyan-400">
                {React.createElement(pipelineSteps[activeStep - 1].icon, { className: "w-5 h-5" })}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Step {activeStep}: {pipelineSteps[activeStep - 1].title}</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-900/60 text-cyan-300 border border-cyan-700/50">
                    {pipelineSteps[activeStep - 1].tech}
                  </span>
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  {pipelineSteps[activeStep - 1].desc}
                </p>
              </div>
            </div>
            <div className="text-xs font-mono text-slate-400">
              Pipeline Stage {activeStep} / 10 Active
            </div>
          </div>
        </div>

        {/* Dual Mode Switcher: Live Network Monitoring vs PCAP Analysis */}
        <div className="bg-[#111827] rounded-2xl border border-[#1F293D] overflow-hidden shadow-xl">
          {/* Switcher Header */}
          <div className="p-4 sm:p-5 border-b border-[#1F293D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0D1525]">
            <div className="flex items-center gap-3">
              <div className="flex p-1 rounded-xl bg-[#0B0F19] border border-[#1F293D]">
                <button
                  id="tab-mode-live"
                  onClick={() => setActiveMode('live')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                    activeMode === 'live'
                      ? 'bg-cyan-500 text-[#0B0F19] shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>Live Network Monitoring (15+ Features)</span>
                </button>
                <button
                  id="tab-mode-pcap"
                  onClick={() => setActiveMode('pcap')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                    activeMode === 'pcap'
                      ? 'bg-cyan-500 text-[#0B0F19] shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Offline PCAP Capture Analysis</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{activeMode === 'live' ? 'Ingestion: eth0 (AF_PACKET Promiscuous)' : 'Parser: Scapy Offline Batch'}</span>
            </div>
          </div>

          {/* Mode 1: Live Network Monitoring with 15+ Features Table */}
          {activeMode === 'live' && (
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Extracted Flow Statistics (Sliding 5-Second Window)</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
                      Sub-50ms Real-Time
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    The World Model ingests these 15 engineered statistical features to project risk curves P(S<sub>t+1</sub> | S<sub>t</sub>).
                  </p>
                </div>
                <div className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1.5 rounded-lg border border-cyan-500/30">
                  Total Active Flows: 1,248
                </div>
              </div>

              {/* Features Grid Table */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {FLOW_FEATURES.map((feat) => (
                  <div
                    key={feat.key}
                    className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#1F293D] hover:border-cyan-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-200">{feat.name}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                        feat.category === 'Flag' ? 'bg-amber-950 text-amber-300 border-amber-800/40' :
                        feat.category === 'Temporal' ? 'bg-blue-950 text-blue-300 border-blue-800/40' :
                        feat.category === 'Volumetric' ? 'bg-purple-950 text-purple-300 border-purple-800/40' :
                        'bg-emerald-950 text-emerald-300 border-emerald-800/40'
                      }`}>
                        {feat.category}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-lg font-mono font-bold text-cyan-300">
                        {feat.sampleValue}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {feat.unit}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-tight">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mode 2: PCAP Analysis with Sample Chooser */}
          {activeMode === 'pcap' && (
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-base font-bold text-white">
                    Offline PCAP Dataset Inspector & Forensic Replay
                  </h3>
                  <p className="text-xs text-slate-400">
                    Select a curated intrusion capture to verify feature parsing, state transitions, and attack forecasting.
                  </p>
                </div>

                <button
                  onClick={handleSimulatePcap}
                  disabled={pcapProcessing}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#0B0F19] text-xs font-bold font-mono transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {pcapProcessing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Re-Parsing Flows...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Replay Selected PCAP</span>
                    </>
                  )}
                </button>
              </div>

              {/* PCAP Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {pcapSamples.map((pcap) => {
                  const isSelected = selectedPcap === pcap.filename;
                  return (
                    <div
                      key={pcap.filename}
                      onClick={() => setSelectedPcap(pcap.filename)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-cyan-950/70 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                          : 'bg-[#0B0F19] border-[#1F293D] hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <FileCode className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                        <span className="text-[10px] font-mono text-slate-400">{pcap.size}</span>
                      </div>
                      <h4 className="text-xs font-mono font-bold text-white truncate mb-1">
                        {pcap.filename}
                      </h4>
                      <p className="text-[11px] text-cyan-300 font-medium truncate mb-3">
                        {pcap.detectedTactic}
                      </p>

                      <div className="pt-2 border-t border-slate-800 text-[11px] font-mono flex items-center justify-between text-slate-400">
                        <span>{pcap.flows.toLocaleString()} flows</span>
                        <span className={`font-bold ${pcap.riskScore > 0.6 ? 'text-red-400' : 'text-emerald-400'}`}>
                          Risk: {(pcap.riskScore * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Upload Dropzone Simulation */}
              <div className="p-6 rounded-xl bg-[#0B0F19] border-2 border-dashed border-[#1F293D] hover:border-cyan-500/50 transition-colors text-center">
                <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2 opacity-80" />
                <h4 className="text-xs font-semibold text-slate-200">
                  Drag and Drop Custom PCAP / PCAPNG Trace Here
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 max-w-md mx-auto">
                  Processes .pcap files entirely in local browser WebAssembly/workers. No packets are uploaded to external cloud servers.
                </p>
                <div className="mt-3 inline-block px-3 py-1 rounded bg-[#111827] border border-[#1F293D] text-[10px] font-mono text-slate-400">
                  Accepted formats: .pcap, .pcapng, .cap (Max 250MB)
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
