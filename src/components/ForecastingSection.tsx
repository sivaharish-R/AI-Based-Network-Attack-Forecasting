import React, { useState } from 'react';
import { 
  GitBranch, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle, 
  Sliders, 
  ArrowRight, 
  Zap, 
  Info,
  HelpCircle
} from 'lucide-react';
import { FORECAST_SCENARIOS } from '../data/defaultData';
import { ForecastScenario, ForecastTimeStep } from '../types';

interface ForecastingSectionProps {
  demoDisclaimer: string;
}

export const ForecastingSection: React.FC<ForecastingSectionProps> = ({ demoDisclaimer }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(FORECAST_SCENARIOS[0].id);
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(2); // Default T+3

  const currentScenario = FORECAST_SCENARIOS.find(s => s.id === selectedScenarioId) || FORECAST_SCENARIOS[0];
  const activeStep: ForecastTimeStep = currentScenario.steps[selectedStepIndex] || currentScenario.steps[0];

  // SVG Chart Dimensions
  const width = 640;
  const height = 240;
  const padding = { top: 30, right: 30, bottom: 40, left: 50 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Compute points
  const points = currentScenario.steps.map((step, idx) => {
    const x = padding.left + (idx / (currentScenario.steps.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - step.riskScore * chartHeight;
    return { x, y, step };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    if (idx === 0) return `M ${pt.x},${pt.y}`;
    const prev = points[idx - 1];
    const cx1 = prev.x + (pt.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (pt.x - prev.x) / 2;
    const cy2 = pt.y;
    return `${acc} C ${cx1},${cy1} ${cx2},${cy2} ${pt.x},${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x},${padding.top + chartHeight} L ${points[0].x},${padding.top + chartHeight} Z`;

  // Risk Threshold Line Y
  const thresholdRisk = 0.65;
  const thresholdY = padding.top + chartHeight - thresholdRisk * chartHeight;

  return (
    <section id="forecasting" className="py-20 bg-[#0B0F19] relative border-b border-[#1F293D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3">
            <GitBranch className="w-3.5 h-3.5" />
            <span>K-STEP PREDICTIVE HORIZONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            World Model & K-Step Attack Forecasting
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            Formulating network attack dynamics as autoregressive state transitions: 
            <span className="font-mono text-cyan-300 ml-1.5 font-bold">P(S_{'{t+1}'} | S_{'{t}'})</span> across T+1 to T+5 horizons.
          </p>
        </div>

        {/* Mathematical Foundation Callout Card */}
        <div className="mb-10 p-5 rounded-2xl bg-gradient-to-r from-[#111827] via-[#0E1726] to-[#111827] border border-cyan-500/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold mb-1">
                <TrendingUp className="w-4 h-4" />
                <span>WORLD MODEL STATE PROJECTION THEORY</span>
              </div>
              <h3 className="text-sm font-bold text-white">
                Sequence Transition: S<sub>t</sub> → S<sub>t+1</sub> → S<sub>t+2</sub> → S<sub>t+3</sub> → S<sub>t+4</sub> → S<sub>t+5</sub>
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-3xl">
                Unlike point anomaly detectors, our recurrent neural world model acts as an internal network physics engine. Given current flow vector <code className="text-cyan-300 font-mono">S_t</code>, it projects conditional trajectories over future risk probability <code className="text-cyan-300 font-mono">R(t+k)</code> and tactical MITRE progressions.
              </p>
            </div>

            {/* Disclaimer Pill */}
            <div className="flex-shrink-0 px-3 py-2 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300 text-[11px] font-mono flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{demoDisclaimer}</span>
            </div>
          </div>
        </div>

        {/* Scenario Selector Tabs */}
        <div className="mb-8">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
            Select Attack Scenario to Forecast:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {FORECAST_SCENARIOS.map((sc) => {
              const isSelected = sc.id === selectedScenarioId;
              return (
                <button
                  key={sc.id}
                  onClick={() => {
                    setSelectedScenarioId(sc.id);
                    setSelectedStepIndex(2); // reset to T+3 for inspection
                  }}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950/70 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                      : 'bg-[#111827] border-[#1F293D] hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {sc.threatType}
                    </span>
                    <span className={`text-[10px] font-mono font-bold ${
                      sc.severity === 'CRITICAL' ? 'text-red-400' :
                      sc.severity === 'HIGH' ? 'text-amber-400' :
                      sc.severity === 'MEDIUM' ? 'text-blue-400' : 'text-emerald-400'
                    }`}>
                      {sc.severity}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1 mb-1">
                    {sc.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {sc.attackVector}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Forecasting Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Forecasting Chart (7 Cols) */}
          <div className="lg:col-span-7 bg-[#111827] rounded-2xl border border-[#1F293D] p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Forecasted Risk Trajectory</span>
                  <span className="text-[11px] font-mono text-cyan-400 font-normal">
                    (T+1 to T+5 Horizons)
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Click any time horizon point to inspect predicted state & recommendations.
                </p>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="flex items-center gap-1 text-cyan-400">
                  <span className="w-2.5 h-0.5 bg-cyan-400 rounded" /> Risk Curve
                </span>
                <span className="flex items-center gap-1 text-red-400">
                  <span className="w-2.5 h-0.5 bg-red-500 border-dashed border-t border-red-500" /> Threshold (0.65)
                </span>
              </div>
            </div>

            {/* Responsive SVG Chart */}
            <div className="relative w-full aspect-[16/7] bg-[#0B0F19] rounded-xl border border-[#1F293D] overflow-hidden p-2">
              <svg 
                viewBox={`0 0 ${width} ${height}`} 
                className="w-full h-full select-none"
              >
                {/* Horizontal Grid lines */}
                {[0.0, 0.25, 0.5, 0.75, 1.0].map((val) => {
                  const y = padding.top + chartHeight - val * chartHeight;
                  return (
                    <g key={val}>
                      <line 
                        x1={padding.left} 
                        y1={y} 
                        x2={width - padding.right} 
                        y2={y} 
                        stroke="#1F293D" 
                        strokeWidth="1" 
                      />
                      <text 
                        x={padding.left - 8} 
                        y={y + 4} 
                        fill="#64748B" 
                        fontSize="10" 
                        fontFamily="monospace" 
                        textAnchor="end"
                      >
                        {(val * 100).toFixed(0)}%
                      </text>
                    </g>
                  );
                })}

                {/* Threshold Reference Line */}
                <line 
                  x1={padding.left} 
                  y1={thresholdY} 
                  x2={width - padding.right} 
                  y2={thresholdY} 
                  stroke="#EF4444" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 4" 
                />
                <text 
                  x={width - padding.right} 
                  y={thresholdY - 5} 
                  fill="#EF4444" 
                  fontSize="9" 
                  fontFamily="monospace" 
                  textAnchor="end"
                >
                  CRITICAL EVIDENCE FREEZE (0.65)
                </text>

                {/* Gradient Fill under Path */}
                <defs>
                  <linearGradient id="riskAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <path d={areaD} fill="url(#riskAreaGrad)" />
                <path d={pathD} fill="none" stroke="#00F0FF" strokeWidth="3" strokeLinecap="round" />

                {/* Interactive Points on Line */}
                {points.map((pt, idx) => {
                  const isSelected = idx === selectedStepIndex;
                  return (
                    <g 
                      key={idx} 
                      className="cursor-pointer group"
                      onClick={() => setSelectedStepIndex(idx)}
                    >
                      {/* Click Target Radius */}
                      <circle 
                        cx={pt.x} 
                        cy={pt.y} 
                        r="16" 
                        fill="transparent" 
                      />
                      {/* Outer Pulse if active */}
                      {isSelected && (
                        <circle 
                          cx={pt.x} 
                          cy={pt.y} 
                          r="10" 
                          fill="#00F0FF" 
                          opacity="0.3" 
                          className="animate-ping" 
                        />
                      )}
                      {/* Core Dot */}
                      <circle 
                        cx={pt.x} 
                        cy={pt.y} 
                        r={isSelected ? "6" : "4.5"} 
                        fill={isSelected ? "#00F0FF" : "#111827"} 
                        stroke="#00F0FF" 
                        strokeWidth={isSelected ? "3" : "2"} 
                      />
                      {/* X-Axis Step Label */}
                      <text 
                        x={pt.x} 
                        y={height - 12} 
                        fill={isSelected ? "#00F0FF" : "#94A3B8"} 
                        fontSize="11" 
                        fontFamily="monospace" 
                        fontWeight={isSelected ? "bold" : "normal"}
                        textAnchor="middle"
                      >
                        {pt.step.step.split(' ')[0]}
                      </text>
                      {/* Tooltip on active point */}
                      {isSelected && (
                        <g>
                          <rect 
                            x={pt.x - 30} 
                            y={pt.y - 28} 
                            width="60" 
                            height="20" 
                            rx="4" 
                            fill="#0B0F19" 
                            stroke="#00F0FF" 
                            strokeWidth="1" 
                          />
                          <text 
                            x={pt.x} 
                            y={pt.y - 15} 
                            fill="#FFFFFF" 
                            fontSize="10" 
                            fontFamily="monospace" 
                            fontWeight="bold" 
                            textAnchor="middle"
                          >
                            {(pt.step.riskScore * 100).toFixed(0)}% Risk
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Step Horizon Selector Buttons */}
            <div className="flex items-center justify-between gap-1.5 mt-4">
              {currentScenario.steps.map((st, idx) => (
                <button
                  key={st.step}
                  onClick={() => setSelectedStepIndex(idx)}
                  className={`flex-1 py-2 px-1 rounded-lg text-center transition-all cursor-pointer ${
                    selectedStepIndex === idx
                      ? 'bg-cyan-500 text-[#0B0F19] font-bold shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                      : 'bg-[#0B0F19] text-slate-400 hover:text-white border border-[#1F293D]'
                  }`}
                >
                  <div className="text-[10px] font-mono">{st.step}</div>
                  <div className="text-xs font-semibold">{(st.riskScore * 100).toFixed(0)}%</div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Step Telemetry & Playbook Card (5 Cols) */}
          <div className="lg:col-span-5 bg-[#111827] rounded-2xl border border-[#1F293D] p-5 shadow-xl flex flex-col justify-between">
            <div>
              {/* Header with Risk Level */}
              <div className="flex items-center justify-between pb-3 border-b border-[#1F293D] mb-4">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                    Horizon Snapshot: {activeStep.step}
                  </span>
                  <h4 className="text-base font-bold text-white mt-0.5">
                    {activeStep.predictedStage}
                  </h4>
                </div>

                <div className={`px-3 py-1.5 rounded-xl border text-center font-mono ${
                  activeStep.riskScore > 0.7 
                    ? 'bg-red-950/80 border-red-500/60 text-red-300' 
                    : activeStep.riskScore > 0.4 
                    ? 'bg-amber-950/80 border-amber-500/60 text-amber-300'
                    : 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300'
                }`}>
                  <div className="text-[9px] uppercase font-semibold">Predicted Risk</div>
                  <div className="text-base font-extrabold">{(activeStep.riskScore * 100).toFixed(0)}%</div>
                </div>
              </div>

              {/* MITRE Mapping & Confidence Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-[#0B0F19] border border-[#1F293D]">
                  <span className="text-[10px] font-mono text-slate-400">MITRE TACTIC</span>
                  <div className="text-xs font-bold text-cyan-300 mt-0.5 truncate">
                    {activeStep.mitreTactic}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    ID: {activeStep.techniqueId}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#0B0F19] border border-[#1F293D]">
                  <span className="text-[10px] font-mono text-slate-400">MODEL CONFIDENCE</span>
                  <div className="text-xs font-bold text-white mt-0.5">
                    {(activeStep.confidence * 100).toFixed(1)}%
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">
                    Calibrated Entropy
                  </span>
                </div>
              </div>

              {/* Top Driving Flow Features (SHAP Values) */}
              <div className="mb-4">
                <div className="text-xs font-mono text-slate-300 mb-2 flex items-center justify-between">
                  <span>TOP PREDICTIVE FEATURES (SHAP):</span>
                  <span className="text-[10px] text-cyan-400 font-mono">Attribution</span>
                </div>
                <div className="space-y-2">
                  {activeStep.topFeatures.map((feat) => {
                    const isPositive = feat.impact === 'positive';
                    return (
                      <div 
                        key={feat.feature}
                        className="p-2.5 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-xs flex items-center justify-between"
                      >
                        <span className="text-slate-300 font-medium">{feat.feature}</span>
                        <div className="flex items-center gap-2 font-mono text-xs">
                          <span className={`font-bold ${isPositive ? 'text-red-400' : 'text-emerald-400'}`}>
                            {feat.shapValue > 0 ? `+${feat.shapValue.toFixed(2)}` : feat.shapValue.toFixed(2)}
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded border ${
                            isPositive ? 'bg-red-950 text-red-300 border-red-800' : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          }`}>
                            {isPositive ? 'Raises Risk' : 'Lowers Risk'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Recommended SOC Analyst Action Playbook */}
            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-xs">
              <div className="flex items-center gap-1.5 text-cyan-400 font-mono font-bold mb-1">
                <Zap className="w-3.5 h-3.5" />
                <span>RECOMMENDED HUMAN-IN-THE-LOOP ACTION</span>
              </div>
              <p className="text-slate-200 font-normal leading-relaxed">
                {activeStep.recommendedAction}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
