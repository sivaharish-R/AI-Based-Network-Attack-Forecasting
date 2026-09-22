import React from 'react';
import { 
  Cpu, 
  Layers, 
  ShieldAlert, 
  AlertTriangle, 
  Check, 
  X, 
  HelpCircle, 
  Info,
  Zap,
  Terminal,
  Code
} from 'lucide-react';
import { TECH_STACK, COMPARISON_METRICS, SYSTEM_LIMITATIONS } from '../data/defaultData';

export const TechComparisonSection: React.FC = () => {
  return (
    <section id="tech" className="py-20 bg-[#0B0F19] relative border-b border-[#1F293D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>SPECIFICATIONS & BENCHMARKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technology Stack & Comparative Analysis
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            Built using modern open-source scientific computing and deep learning frameworks, evaluated honestly against legacy detection paradigms.
          </p>
        </div>

        {/* 11 Tech Stack Cards */}
        <div className="mb-16">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
            Underlying Frameworks & Libraries (11 Core Modules):
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {TECH_STACK.map((tech) => (
              <div 
                key={tech.name}
                className="p-4 rounded-xl bg-[#111827] border border-[#1F293D] hover:border-cyan-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                      {tech.badge}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {tech.category}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1">
                    {tech.name}
                  </h4>
                  <div className="text-xs font-mono text-cyan-400 mb-2">
                    {tech.role}
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {tech.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traditional IDS vs Proposed System Detailed Matrix Table */}
        <div className="mb-16">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
            Comprehensive Architectural Comparison Matrix:
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#1F293D] bg-[#111827] shadow-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#1F293D] bg-[#0D1525] text-slate-300 font-mono">
                  <th className="py-3 px-4 w-1/4">Evaluation Criterion</th>
                  <th className="py-3 px-4 w-1/3 text-red-400">Traditional IDS / IPS (Snort / Suricata)</th>
                  <th className="py-3 px-4 w-1/3 text-cyan-300">Our AI Attack Forecasting System</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F293D]">
                {COMPARISON_METRICS.map((row) => (
                  <tr key={row.feature} className="hover:bg-[#162032] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white font-mono">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      <div className="flex items-start gap-2">
                        <X className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>{row.traditionalIds}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-200">
                      <div className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span>{row.proposedSystem}</span>
                          <span className="block mt-1 text-[11px] text-cyan-300/80 font-mono">
                            ↳ Benefit: {row.advantage}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Honest System Limitations & Engineering Realities */}
        <div>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <AlertTriangle className="w-4 h-4" />
              HONEST SYSTEM LIMITATIONS & MITIGATIONS
            </span>
            <span className="text-[11px] text-slate-500 font-normal">
              Scientific Rigor & Transparency
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SYSTEM_LIMITATIONS.map((lim) => (
              <div 
                key={lim.title}
                className="p-5 rounded-2xl bg-[#111827] border border-amber-900/30 hover:border-amber-500/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{lim.title}</span>
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                    Impact: {lim.impact}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  <strong className="text-slate-300">Challenge: </strong>
                  {lim.description}
                </p>

                <div className="p-3 rounded-xl bg-[#0B0F19] border border-[#1F293D] text-xs">
                  <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase block mb-1">
                    Our Defensive Mitigation:
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {lim.ourMitigation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
