import React, { useState } from 'react';
import { 
  Database, 
  HardDrive, 
  Layers, 
  ShieldCheck, 
  Clock, 
  Lock, 
  FileCheck2, 
  AlertOctagon, 
  Sliders, 
  Zap,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { STORAGE_TIERS } from '../data/defaultData';
import { StorageTier } from '../types';

export const StorageArchitectureSection: React.FC = () => {
  const [simulatedRisk, setSimulatedRisk] = useState<number>(0.42);

  const isTriggered = simulatedRisk >= 0.65;

  return (
    <section id="storage" className="py-20 bg-[#0B0F19] relative border-b border-[#1F293D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3">
            <Database className="w-3.5 h-3.5" />
            <span>OFFLINE AI & MULTI-TIER RETENTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Offline AI, Smart Storage & Risk-Adaptive Capture
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            Air-gapped local inference guaranteeing zero telemetry leaks, coupled with a 3-level storage hierarchy that reduces raw disk footprint by 92.5%.
          </p>
        </div>

        {/* Air-Gapped Offline AI Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="p-6 rounded-2xl bg-[#111827] border border-[#1F293D] hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 flex items-center justify-center border border-cyan-500/50 text-cyan-400 mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Zero Cloud Data Egress</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Proprietary payload contents, employee PII, and internal network maps never leave the local security perimeter. Fully complies with defense and classified banking standards.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111827] border border-[#1F293D] hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-950 flex items-center justify-center border border-blue-500/50 text-blue-400 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Deterministic Millisecond Latency</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              No cloud network round-trip overhead. INT8 quantized ONNX inference finishes in under 9.4 milliseconds, delivering forecasts before the attacker can initiate lateral movement.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111827] border border-[#1F293D] hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 flex items-center justify-center border border-emerald-500/50 text-emerald-400 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Complete Outage Resilience</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Operates flawlessly even during total internet blackouts, external DNS tampering, or WAN link severance. The internal protection engine continues observing and forecasting locally.
            </p>
          </div>
        </div>

        {/* 3-Level Storage Architecture Breakdown */}
        <div className="mb-14">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
            3-Level Storage Hierarchy Architecture:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STORAGE_TIERS.map((tier) => (
              <div 
                key={tier.level}
                className="p-6 rounded-2xl bg-[#111827] border border-[#1F293D] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                      LEVEL 0{tier.level}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Latency: {tier.latency}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-1">
                    {tier.name}
                  </h4>
                  <div className="text-xs font-mono text-cyan-400 mb-3">
                    {tier.technology}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {tier.description}
                  </p>

                  <ul className="space-y-1.5 text-xs text-slate-400 mb-6">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#1F293D] flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Retention: {tier.retention}</span>
                  <span className="text-cyan-300">{tier.capacityImpact.split(' ')[0]} {tier.capacityImpact.split(' ')[1]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk-Adaptive Evidence Capture Innovation Demo */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#111827] via-[#0E1626] to-[#111827] border border-cyan-500/40 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 text-xs font-mono mb-2 border border-cyan-500/30">
                <Sliders className="w-3 h-3" />
                <span>INNOVATION HIGHLIGHT</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Interactive Risk-Adaptive Evidence Capture
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Adjust the forecasted risk slider below. Notice how the system runs in lightweight circular buffer mode below threshold <code className="text-cyan-300 font-mono">R &lt; 0.65</code>, and automatically triggers an unalterable evidence freeze the moment projected risk spikes!
              </p>

              {/* Slider Control */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400">Simulate Forecasted Risk Score:</span>
                  <span className={`font-bold ${isTriggered ? 'text-red-400' : 'text-cyan-400'}`}>
                    {(simulatedRisk * 100).toFixed(0)}% Risk
                  </span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.01"
                  value={simulatedRisk}
                  onChange={(e) => setSimulatedRisk(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>0% (Benign Baseline)</span>
                  <span className="text-red-400 font-bold">Threshold: 65%</span>
                  <span>100% (Imminent Attack)</span>
                </div>
              </div>
            </div>

            {/* Dynamic Status Indicator Card */}
            <div className={`w-full lg:w-80 p-5 rounded-xl border transition-all ${
              isTriggered 
                ? 'bg-red-950/80 border-red-500/70 shadow-[0_0_25px_rgba(239,68,68,0.3)]' 
                : 'bg-[#0B0F19] border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400">
                  CAPTURE ENGINE STATUS
                </span>
                <span className={`w-2.5 h-2.5 rounded-full ${isTriggered ? 'bg-red-500 animate-ping' : 'bg-emerald-400'}`} />
              </div>

              <div className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                {isTriggered ? (
                  <>
                    <AlertOctagon className="w-5 h-5 text-red-400" />
                    <span>LEVEL 1 BUFFER LOCKED</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>CIRCULAR ROLLING BUFFER</span>
                  </>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {isTriggered 
                  ? "Forecasted risk exceeded 0.65! Raw PCAP frames are frozen to NVMe persistent storage. Forensic evidence locked for Level 3 audit."
                  : "Traffic risk is normal. In-memory circular buffer rotates every 15 minutes, saving 92.5% disk bandwidth without logging overhead."}
              </p>

              <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] font-mono flex items-center justify-between text-slate-400">
                <span>Storage Ingestion:</span>
                <span className={isTriggered ? 'text-red-300 font-bold' : 'text-emerald-300'}>
                  {isTriggered ? 'Full PCAP (14.2 MB/s)' : 'Compact Vector (15 KB/s)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
