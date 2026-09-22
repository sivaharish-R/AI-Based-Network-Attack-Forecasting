import React, { useState } from 'react';
import { 
  Users, 
  Crown, 
  Linkedin, 
  Mail, 
  Award, 
  CheckCircle2, 
  Sparkles,
  ExternalLink,
  Code2,
  Shield,
  Briefcase,
  ZoomIn,
  X
} from 'lucide-react';
import { TeamMember, ProjectSettings } from '../types';

interface TeamSectionProps {
  team: TeamMember[];
  settings: ProjectSettings;
  onOpenAdmin: () => void;
  isAdminAuthenticated?: boolean;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ 
  team, 
  settings, 
  onOpenAdmin,
  isAdminAuthenticated = false
}) => {
  const [selectedPhotoMember, setSelectedPhotoMember] = useState<TeamMember | null>(null);
  const leader = team.find(m => m.isLeader) || team[0];
  const members = team.filter(m => !m.isLeader).sort((a, b) => a.order - b.order);

  const formatLinkedin = (url?: string) => {
    if (!url) return 'https://www.linkedin.com';
    const trimmed = url.trim();
    if (!trimmed) return 'https://www.linkedin.com';
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
  };

  const pillars = [
    { title: "Observe", desc: "Real-time packet & flow ingestion via Scapy ring buffers" },
    { title: "Learn", desc: "LSTM & Transformer representations of network state sequences" },
    { title: "Predict", desc: "Autoregressive multi-horizon forecasting from T+1 to T+5" },
    { title: "Explain", desc: "SHAP feature attribution & direct MITRE ATT&CK technique mapping" },
    { title: "Protect", desc: "Human-in-the-Loop decision playbooks & 92.5% smart storage capture" }
  ];

  return (
    <section id="team" className="py-20 bg-[#0B0F19] relative border-b border-[#1F293D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>RESEARCH RESEARCH TEAM & CONTRIBUTORS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Meet {settings.teamName}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            A multidisciplinary engineering team bridging deep learning, network protocol forensics, explainable AI, and cybersecurity operations.
          </p>
        </div>

        {/* 5-Pillar Innovation Banner */}
        <div className="mb-14 p-6 rounded-2xl bg-[#111827] border border-[#1F293D] shadow-xl">
          <div className="text-center mb-6">
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
              Core Architectural Methodology
            </span>
            <h3 className="text-lg font-bold text-white mt-1">
              Observe → Learn → Predict → Explain → Protect
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {pillars.map((pil, idx) => (
              <div 
                key={pil.title} 
                className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#1F293D] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-cyan-300">{pil.title}</span>
                    <span className="text-[10px] font-mono text-slate-500">0{idx + 1}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    {pil.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Leader Showcase Card */}
        {leader && (
          <div className="mb-12">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-400" />
                TEAM LEADER
              </span>
              {isAdminAuthenticated && (
                <button
                  onClick={onOpenAdmin}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 underline font-normal flex items-center gap-1 cursor-pointer"
                >
                  Edit in Admin Panel
                </button>
              )}
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#111827] via-[#0E1626] to-[#111827] border-2 border-amber-500/50 shadow-[0_0_35px_rgba(245,158,11,0.2)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                  {/* Team Leader Large Portrait Photo Frame */}
                  <div 
                    className="relative flex-shrink-0 cursor-pointer group/leader"
                    onClick={() => leader.avatar && setSelectedPhotoMember(leader)}
                    title="Click to view full leader photo"
                  >
                    {leader.avatar ? (
                      <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-3xl overflow-hidden border-2 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.4)] ring-4 ring-amber-500/25 bg-slate-900 transition-all duration-300 group-hover/leader:scale-105 group-hover/leader:border-amber-300 group-hover/leader:shadow-[0_0_40px_rgba(245,158,11,0.5)]">
                        <img 
                          src={leader.avatar} 
                          alt={leader.name}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/leader:scale-105"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (target.src !== window.location.origin + '/team/yashmini.jpg') {
                              target.src = '/team/yashmini.jpg';
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-amber-950/20 opacity-0 group-hover/leader:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="p-2 rounded-full bg-amber-500 text-slate-950 shadow-lg font-bold text-xs flex items-center gap-1.5">
                            <ZoomIn className="w-4 h-4 stroke-[2.5]" />
                            <span className="font-mono hidden sm:inline">View Large</span>
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-amber-500 text-slate-950 shadow-md">
                          <Crown className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-3xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-3xl font-bold text-[#0B0F19] shadow-lg flex-shrink-0 border-2 border-amber-300/40">
                        YN
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-center sm:justify-start gap-3 flex-wrap">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {leader.name}
                      </h3>
                      <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-500/60 text-xs font-mono font-bold flex items-center gap-1 shadow-sm">
                        <Crown className="w-3.5 h-3.5 text-amber-400" />
                        Team Leader & Coordinator
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 mt-3 max-w-2xl leading-relaxed">
                      {leader.bio}
                    </p>

                    {/* Skills pills */}
                    <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 mt-4">
                      {leader.skills.map((skill) => (
                        <span 
                          key={skill}
                          className="px-2.5 py-1 rounded-md bg-[#0B0F19] border border-amber-900/50 text-amber-200 text-xs font-mono shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Social & Contact Links */}
                <div className="flex sm:flex-col items-center sm:items-end gap-2 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    {leader.linkedin && (
                      <a 
                        href={formatLinkedin(leader.linkedin)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-[#0077B5]/25 hover:bg-[#0077B5]/40 border border-[#0077B5]/60 text-sky-200 hover:text-white transition-all flex items-center gap-2 text-xs font-mono font-bold shadow-[0_0_15px_rgba(0,119,181,0.25)]"
                        title="LinkedIn Profile"
                      >
                        <Linkedin className="w-4 h-4 text-[#0077B5]" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                    {leader.email && (
                      <a 
                        href={`mailto:${leader.email}`}
                        className="p-2.5 rounded-xl bg-[#0B0F19] hover:bg-slate-800 border border-[#1F293D] text-slate-300 hover:text-white transition-colors"
                        title="Direct Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    Presentation & Planning Lead
                  </span>
                </div>
              </div>

              {/* Leader Contributions */}
              <div className="mt-6 pt-5 border-t border-[#1F293D]/80">
                <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider block mb-2">
                  Leadership Key Contributions:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {leader.contributions.map((con, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>{con}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Team Members Grid (5 Members) */}
        <div>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>Research & Engineering Specialists (5 Members):</span>
            <span className="text-[11px] text-cyan-400 font-normal hidden sm:inline">Click any photo for high-res view</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => {
              const initials = member.name.split(' ').map(n => n[0]).join('').slice(0, 2);
              return (
                <div
                  key={member.id}
                  className="p-6 rounded-2xl bg-[#111827] border border-[#1F293D] hover:border-cyan-500/50 shadow-lg hover:shadow-[0_0_25px_rgba(0,240,255,0.15)] transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Header with Prominent Large Photo Frame */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4 pb-4 border-b border-[#1F293D]">
                      <div 
                        className="relative flex-shrink-0 cursor-pointer"
                        onClick={() => member.avatar && setSelectedPhotoMember(member)}
                        title="Click to view enlarged photo"
                      >
                        {member.avatar ? (
                          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-cyan-500/60 shadow-[0_0_20px_rgba(0,240,255,0.25)] ring-4 ring-cyan-500/15 bg-slate-900 group/img transition-all duration-300 hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]">
                            <img 
                              src={member.avatar} 
                              alt={member.name}
                              className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/img:scale-105"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                const target = e.currentTarget;
                                const fallback = `/team/${member.id === 'tm-2' ? 'sivaharish' : member.id === 'tm-3' ? 'dharanish' : member.id === 'tm-4' ? 'vishnu' : member.id === 'tm-5' ? 'naviyasri' : 'yawanthika'}.jpg`;
                                if (!target.src.includes(fallback)) {
                                  target.src = fallback;
                                }
                              }}
                            />
                            <div className="absolute inset-0 bg-cyan-950/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                              <div className="p-1.5 rounded-full bg-cyan-500 text-slate-950 shadow-md">
                                <ZoomIn className="w-4 h-4 stroke-[2.5]" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-cyan-600/30 to-blue-700/30 border-2 border-cyan-500/40 flex items-center justify-center text-2xl font-bold text-cyan-300">
                            {initials}
                          </div>
                        )}
                      </div>

                      {/* Member Identity & Socials */}
                      <div className="flex-1 min-w-0 text-center sm:text-left">
                        <h4 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                          {member.name}
                        </h4>
                        <span className="text-xs font-mono text-cyan-400 font-semibold block mt-1">
                          {member.role}
                        </span>

                        <div className="flex items-center justify-center sm:justify-start gap-2 mt-3">
                          {member.linkedin && (
                            <a 
                              href={formatLinkedin(member.linkedin)} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="px-2.5 py-1.5 rounded-lg bg-[#0077B5]/20 hover:bg-[#0077B5]/35 border border-[#0077B5]/50 text-sky-200 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono"
                              title={`${member.name} LinkedIn Profile`}
                            >
                              <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
                              <span className="text-[11px] font-medium">LinkedIn</span>
                            </a>
                          )}
                          {member.email && (
                            <a 
                              href={`mailto:${member.email}`}
                              className="p-1.5 rounded-lg bg-[#0B0F19] hover:bg-slate-800 border border-[#1F293D] text-slate-400 hover:text-white transition-colors"
                              title="Direct Email"
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {member.bio}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {member.skills.map((skill) => (
                        <span 
                          key={skill}
                          className="px-2 py-0.5 rounded bg-[#0B0F19] border border-[#1F293D] text-[11px] font-mono text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contributions List */}
                  <div className="pt-3 border-t border-[#1F293D]">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1.5">
                      Core Contributions:
                    </span>
                    <ul className="space-y-1 text-[11px] text-slate-400">
                      {member.contributions.slice(0, 2).map((c, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-cyan-400 mt-0.5">•</span>
                          <span className="line-clamp-2">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive High-Resolution Photo Lightbox Modal */}
      {selectedPhotoMember && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedPhotoMember(null)}
        >
          <div 
            className="relative max-w-md w-full bg-[#0E1626] border border-cyan-500/50 rounded-3xl p-6 shadow-[0_0_50px_rgba(0,240,255,0.25)] text-center animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhotoMember(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-[#111827] hover:bg-slate-800 text-slate-400 hover:text-white border border-[#1F293D] transition-colors cursor-pointer"
              title="Close preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* High Definition Expanded Portrait Frame */}
            <div className="w-64 h-64 sm:w-72 sm:h-72 mx-auto rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.3)] bg-slate-950 mb-5 relative">
              <img
                src={selectedPhotoMember.avatar}
                alt={selectedPhotoMember.name}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  const fallback = selectedPhotoMember.isLeader 
                    ? '/team/yashmini.jpg' 
                    : `/team/${selectedPhotoMember.id === 'tm-2' ? 'sivaharish' : selectedPhotoMember.id === 'tm-3' ? 'dharanish' : selectedPhotoMember.id === 'tm-4' ? 'vishnu' : selectedPhotoMember.id === 'tm-5' ? 'naviyasri' : 'yawanthika'}.jpg`;
                  if (!target.src.includes(fallback)) {
                    target.src = fallback;
                  }
                }}
              />
              {selectedPhotoMember.isLeader && (
                <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-mono text-xs font-bold flex items-center gap-1 shadow-lg">
                  <Crown className="w-3.5 h-3.5" />
                  Team Leader
                </div>
              )}
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight">
              {selectedPhotoMember.name}
            </h3>
            <p className="text-xs font-mono text-cyan-400 font-semibold mt-1">
              {selectedPhotoMember.role}
            </p>
            <p className="text-xs text-slate-300 mt-3 leading-relaxed max-w-sm mx-auto">
              {selectedPhotoMember.bio}
            </p>

            {selectedPhotoMember.linkedin && (
              <div className="mt-5 pt-4 border-t border-[#1F293D] flex items-center justify-center">
                <a
                  href={formatLinkedin(selectedPhotoMember.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#0077B5] hover:bg-[#0077B5]/85 text-white text-xs font-mono font-semibold flex items-center gap-2 transition-colors shadow-lg cursor-pointer"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>View LinkedIn Profile</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
