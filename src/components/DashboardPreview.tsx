import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Download, 
  Play, 
  Pause, 
  ShieldAlert, 
  Terminal, 
  TrendingUp, 
  Layers, 
  AlertTriangle, 
  Radio, 
  CheckCircle, 
  FileText,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { ProjectSettings, LivePacket } from '../types';
import { INITIAL_PACKETS } from '../data/defaultData';
import { generateDailySecurityReport } from '../utils/storage';

interface DashboardPreviewProps {
  settings: ProjectSettings;
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({ settings }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [packets, setPackets] = useState<LivePacket[]>(INITIAL_PACKETS);
  const [packetCount, setPacketCount] = useState(12456);
  const [flowCount, setFlowCount] = useState(1248);
  const [activeHosts, setActiveHosts] = useState(87);
  const [currentRiskGauge, setCurrentRiskGauge] = useState(0.42);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Live packet simulator tick
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setPacketCount(prev => prev + Math.floor(Math.random() * 18) + 5);
      
      // Randomly adjust risk score slightly to mimic live monitoring
      setCurrentRiskGauge(prev => {
        const delta = (Math.random() - 0.5) * 0.04;
        return Math.min(Math.max(0.1, prev + delta), 0.95);
      });

      // Occasionally add a new simulated packet
      if (Math.random() > 0.4) {
        const now = new Date();
        const timeStr = `${now.toTimeString().split(' ')[0]}.${now.getMilliseconds().toString().padStart(3, '0')}`;
        const isMal = Math.random() > 0.7;
        const newPkt: LivePacket = {
          id: `pkt-${Date.now().toString().slice(-4)}`,
          timestamp: timeStr,
          srcIp: isMal ? "192.168.1.105" : `10.0.0.${Math.floor(Math.random() * 50) + 2}`,
          srcPort: Math.floor(Math.random() * 20000) + 40000,
          dstIp: isMal ? "10.0.0.12" : "172.217.16.206",
          dstPort: isMal ? [22, 445, 3389, 8080][Math.floor(Math.random() * 4)] : 443,
          protocol: isMal ? "TCP" : "TLS",
          length: isMal ? 64 : Math.floor(Math.random() * 1200) + 120,
          flags: isMal ? "SYN" : "ACK, PSH",
          riskScore: isMal ? Math.random() * 0.4 + 0.6 : Math.random() * 0.15,
          anomalyStatus: isMal ? "Suspicious" : "Normal",
          payloadSummary: isMal ? "High-entropy port probe sequence" : "Encrypted application payload"
        };

        setPackets(prev => [newPkt, ...prev.slice(0, 5)]);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleInjectAttack = () => {
    setCurrentRiskGauge(0.89);
    const now = new Date();
    const timeStr = `${now.toTimeString().split(' ')[0]}.${now.getMilliseconds().toString().padStart(3, '0')}`;
    const attackPkt: LivePacket = {
      id: `pkt-BURST-${Date.now().toString().slice(-4)}`,
      timestamp: timeStr,
      srcIp: "192.168.1.105",
      srcPort: 58210,
      dstIp: "10.0.0.12",
      dstPort: 445,
      protocol: "TCP",
      length: 64,
      flags: "SYN",
      riskScore: 0.94,
      anomalyStatus: "Threat",
      payloadSummary: "CRITICAL: SYN Flood / Lateral Traverse Triggered via WMI"
    };
    setPackets(prev => [attackPkt, ...prev.slice(0, 5)]);
  };

  const handleDownloadReport = () => {
    const reportData = generateDailySecurityReport(settings);
    const blob = new Blob([reportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CyberForecast_Daily_Report_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <section id="dashboard-preview" className="py-20 bg-[#0B0F19] relative border-b border-[#1F293D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3">
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            <span>INTERACTIVE SOC OPERATIONAL CONSOLE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Live Project Dashboard Preview
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            Real-time packet ingestion stream, dynamic risk forecasting gauge, sliding flow counters, and one-click forensic audit export.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="bg-[#111827] rounded-2xl border border-cyan-500/30 overflow-hidden shadow-2xl">
          {/* Dashboard Header Bar */}
          <div className="p-4 sm:p-5 border-b border-[#1F293D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0D1525]">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  <span>SENSOR: PROD-EDGE-GATEWAY-01</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                    AIR-GAPPED
                  </span>
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  Interface: eth0 | Promiscuous Mode Active
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                id="btn-toggle-play"
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3 py-1.5 rounded-lg bg-[#0B0F19] hover:bg-slate-800 border border-[#1F293D] text-slate-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{isPlaying ? 'Pause Feed' : 'Resume Feed'}</span>
              </button>

              <button
                id="btn-inject-attack"
                onClick={handleInjectAttack}
                className="px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-red-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-all shadow-[0_0_10px_rgba(239,68,68,0.2)]"
              >
                <Zap className="w-3.5 h-3.5 text-red-400" />
                <span>Simulate Attack Burst</span>
              </button>

              <button
                id="btn-download-report"
                onClick={handleDownloadReport}
                className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0B0F19] text-xs font-bold font-mono flex items-center gap-1.5 cursor-pointer transition-all shadow-[0_0_12px_rgba(0,240,255,0.3)]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{downloadSuccess ? 'Downloaded!' : '24-hr Report'}</span>
              </button>
            </div>
          </div>

          {/* Metric KPI Widgets */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#1F293D] divide-y sm:divide-y-0 sm:divide-x divide-[#1F293D] bg-[#0B0F19]/50">
            <div className="p-4 sm:p-5">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Packets Ingested</span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                {packetCount.toLocaleString()}
              </div>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> +380 pkts/s live
              </span>
            </div>

            <div className="p-4 sm:p-5">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Tracked Flows</span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-300 mt-1">
                {flowCount.toLocaleString()}
              </div>
              <span className="text-[10px] font-mono text-slate-500 mt-0.5">
                Sliding 5s Reassembly
              </span>
            </div>

            <div className="p-4 sm:p-5">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Active Endpoints</span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                {activeHosts} Hosts
              </div>
              <span className="text-[10px] font-mono text-slate-500 mt-0.5">
                Subnet: 192.168.1.0/24
              </span>
            </div>

            <div className="p-4 sm:p-5">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Current Risk Forecast</span>
              <div className={`text-xl sm:text-2xl font-bold font-mono mt-1 ${
                currentRiskGauge > 0.65 ? 'text-red-400' : 'text-emerald-400'
              }`}>
                {(currentRiskGauge * 100).toFixed(0)}% Risk
              </div>
              <span className="text-[10px] font-mono text-cyan-400 mt-0.5">
                Horizon: T+1 to T+5
              </span>
            </div>
          </div>

          {/* Interactive Live Stream Table */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Live Packet Dissection Stream (Last 6 Inspected Frames)
                </h4>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Auto-scrolling stream
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#1F293D] bg-[#0B0F19]">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-[#1F293D] text-[11px] text-slate-400 bg-[#111827]">
                    <th className="py-2.5 px-3">Time</th>
                    <th className="py-2.5 px-3">Source</th>
                    <th className="py-2.5 px-3">Destination</th>
                    <th className="py-2.5 px-3">Proto</th>
                    <th className="py-2.5 px-3">Flags</th>
                    <th className="py-2.5 px-3">Bytes</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Payload Summary</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1F293D]/60">
                  {packets.map((pkt) => (
                    <tr 
                      key={pkt.id} 
                      className={`hover:bg-[#162032] transition-colors ${
                        pkt.anomalyStatus === 'Threat' ? 'bg-red-950/20 text-red-200' :
                        pkt.anomalyStatus === 'Suspicious' ? 'bg-amber-950/20 text-amber-200' :
                        'text-slate-300'
                      }`}
                    >
                      <td className="py-2 px-3 text-slate-400">{pkt.timestamp}</td>
                      <td className="py-2 px-3 text-cyan-300">{pkt.srcIp}:{pkt.srcPort}</td>
                      <td className="py-2 px-3 text-slate-200">{pkt.dstIp}:{pkt.dstPort}</td>
                      <td className="py-2 px-3 font-bold">{pkt.protocol}</td>
                      <td className="py-2 px-3 font-semibold">{pkt.flags}</td>
                      <td className="py-2 px-3 text-slate-400">{pkt.length} B</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] border ${
                          pkt.anomalyStatus === 'Threat' ? 'bg-red-950 text-red-300 border-red-800' :
                          pkt.anomalyStatus === 'Suspicious' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                          'bg-emerald-950 text-emerald-300 border-emerald-800'
                        }`}>
                          {pkt.anomalyStatus}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-[11px] text-slate-400 truncate max-w-xs">
                        {pkt.payloadSummary}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Note */}
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Live circular buffer active: 92.5% bandwidth compression
              </span>
              <span className="text-slate-500">
                Click "24-hr Report" above to export complete JSON forensic telemetry
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
