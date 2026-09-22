import React, { useState } from 'react';
import { 
  Shield, 
  Mail, 
  Send, 
  CheckCircle2, 
  Linkedin, 
  ExternalLink, 
  Heart, 
  Globe, 
  Award, 
  ArrowUp,
  FileText,
  Lock
} from 'lucide-react';
import { ProjectSettings, TeamMember } from '../types';

interface AboutContactFooterProps {
  settings: ProjectSettings;
  team: TeamMember[];
  onOpenAdmin: () => void;
  isAdminAuthenticated?: boolean;
}

export const AboutContactFooter: React.FC<AboutContactFooterProps> = ({
  settings,
  team,
  onOpenAdmin,
  isAdminAuthenticated = false
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryType: 'Research Collaboration',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        organization: '',
        inquiryType: 'Research Collaboration',
        message: ''
      });
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const leader = team.find(t => t.isLeader);

  return (
    <>
      {/* About & Problem Statement Section */}
      <section id="about" className="py-20 bg-[#0B0F19] relative border-b border-[#1F293D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 7 Cols: The Problem & Our Innovation */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-4">
                <Award className="w-3.5 h-3.5" />
                <span>SIH 2026 CYBERSECURITY CHALLENGE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Engineering the Transition from Reactive Defense to Predictive Forecasting
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
                Conventional Intrusion Detection Systems (IDS) are inherently post-hoc. They alert after anomalous traffic has breached a boundary or matched a known signature. By then, adversary lateral movement or ransomware encryption is already underway.
              </p>
              <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                Our project redefines network defense through <span className="text-cyan-300 font-semibold">Sequence World Models</span>. By framing multi-horizon network traffic as autoregressive latent transitions, we project adversary intent across T+1 to T+5 windows—enabling automated rate-limiting, risk-adaptive evidence freezing, and preemptive containment before critical assets are compromised.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
                <div className="p-4 rounded-xl bg-[#111827] border border-[#1F293D]">
                  <span className="text-2xl font-bold font-mono text-cyan-400">92.5%</span>
                  <span className="text-xs text-slate-400 block mt-1">Storage Reduction</span>
                </div>
                <div className="p-4 rounded-xl bg-[#111827] border border-[#1F293D]">
                  <span className="text-2xl font-bold font-mono text-emerald-400">&lt;9.4ms</span>
                  <span className="text-xs text-slate-400 block mt-1">Inference Latency</span>
                </div>
                <div className="p-4 rounded-xl bg-[#111827] border border-[#1F293D]">
                  <span className="text-2xl font-bold font-mono text-amber-400">100%</span>
                  <span className="text-xs text-slate-400 block mt-1">Air-Gapped Offline</span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Contact Form */}
            <div id="contact" className="lg:col-span-5 bg-[#111827] p-6 sm:p-8 rounded-2xl border border-cyan-500/30 shadow-2xl">
              <div className="flex items-center gap-2 mb-2 text-cyan-400 font-mono text-xs">
                <Mail className="w-4 h-4" />
                <span>CONNECT WITH THE RESEARCHERS</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Inquiries & Academic Collaboration
              </h3>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Interested in evaluating our PCAP feature pipeline or deploying the offline forecasting model? Send us a message below.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-center animate-in fade-in">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-white">Message Transmitted!</h4>
                  <p className="text-xs text-emerald-300 mt-1">
                    Thank you. Team CyberForecast will review your inquiry shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Dr. Alex Vance"
                      className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] focus:border-cyan-400 text-white text-xs placeholder-slate-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="researcher@univ.edu"
                        className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] focus:border-cyan-400 text-white text-xs placeholder-slate-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Organization</label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Security Lab / SOC"
                        className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-white text-xs placeholder-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">Inquiry Type</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-white text-xs"
                    >
                      <option value="Research Collaboration">Academic / Research Collaboration</option>
                      <option value="Model Evaluation">Model Evaluation / Dataset Inquiries</option>
                      <option value="Code Access">Implementation Code / PCAP Access</option>
                      <option value="General Question">General Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">Message *</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your inquiry or testing dataset..."
                      className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] focus:border-cyan-400 text-white text-xs placeholder-slate-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0B0F19] font-bold text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Team</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080C14] border-t border-[#1F293D] py-14 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Col 1: Brand & Tagline (2 cols wide) */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-950 flex items-center justify-center border border-cyan-500/50 text-cyan-400">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    {settings.projectName}
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-400">
                    Smart India Hackathon (SIH) 2026
                  </span>
                </div>
              </div>

              <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
                {settings.primaryTagline}. Formulating predictive autoregressive world models from raw network packet flows.
              </p>

              <div className="pt-2 text-[11px] font-mono text-slate-400">
                <span className="text-cyan-300">Methodology: </span>
                {settings.secondaryTagline}
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div>
              <span className="text-xs font-mono text-white font-bold uppercase tracking-wider block mb-3">
                Platform
              </span>
              <ul className="space-y-2">
                <li><a href="#pipeline" className="hover:text-cyan-300 transition-colors">10-Step Pipeline</a></li>
                <li><a href="#forecasting" className="hover:text-cyan-300 transition-colors">World Model Forecasting</a></li>
                <li><a href="#xai" className="hover:text-cyan-300 transition-colors">MITRE ATT&CK & SHAP</a></li>
                <li><a href="#storage" className="hover:text-cyan-300 transition-colors">3-Level Smart Storage</a></li>
                <li><a href="#dashboard-preview" className="hover:text-cyan-300 transition-colors">Operational Dashboard</a></li>
              </ul>
            </div>

            {/* Col 3: Research Papers & Standards */}
            <div>
              <span className="text-xs font-mono text-white font-bold uppercase tracking-wider block mb-3">
                Research & Standards
              </span>
              <ul className="space-y-2">
                <li><a href="#blogs" className="hover:text-cyan-300 transition-colors">Technical Papers (15)</a></li>
                <li><a href="#tech" className="hover:text-cyan-300 transition-colors">Comparison Matrix</a></li>
                <li><a href="#tech" className="hover:text-cyan-300 transition-colors">System Limitations</a></li>
                <li>
                  <a 
                    href="https://attack.mitre.org/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-cyan-300 transition-colors flex items-center gap-1"
                  >
                    <span>MITRE Enterprise</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.nist.gov/cyberframework" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-cyan-300 transition-colors flex items-center gap-1"
                  >
                    <span>NIST CSF 2.0</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Project Management & Administration */}
            <div>
              <span className="text-xs font-mono text-white font-bold uppercase tracking-wider block mb-3">
                Governance
              </span>
              <ul className="space-y-2">
                <li><a href="#team" className="hover:text-cyan-300 transition-colors">Team Members</a></li>
                <li className="text-[11px] text-amber-300 font-mono flex items-center gap-1">
                  <span className="text-slate-400">Governance Lead:</span>
                  <span className="font-semibold text-amber-300">{settings.governanceLead || 'Sivaharish R'}</span>
                </li>
                {leader && leader.name !== (settings.governanceLead || 'Sivaharish R') && (
                  <li className="text-[11px] text-slate-400 font-mono">
                    Team Coordinator: {leader.name}
                  </li>
                )}
                <li>
                  <a 
                    href="https://www.linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
                    <span>Research LinkedIn</span>
                  </a>
                </li>
                {isAdminAuthenticated ? (
                  <li>
                    <button
                      onClick={onOpenAdmin}
                      className="text-emerald-400 hover:text-emerald-300 font-mono text-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Shield className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Admin Console (Active)</span>
                    </button>
                  </li>
                ) : !settings.hideAdminFromPublic ? (
                  <li>
                    <button
                      onClick={onOpenAdmin}
                      className="text-slate-500 hover:text-cyan-300 font-mono text-xs cursor-pointer flex items-center gap-1.5 transition-colors"
                      title="Restricted Researcher Portal"
                    >
                      <Lock className="w-3 h-3 text-slate-500" />
                      <span>Researcher Portal</span>
                    </button>
                  </li>
                ) : null}
                <li><a href="#contact" className="hover:text-cyan-300 transition-colors">Contact Researchers</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Legal & Credits */}
          <div className="pt-8 border-t border-[#1F293D] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-2 flex-wrap">
              <span>© 2026 {settings.teamName}. Built for Smart India Hackathon (SIH 2026).</span>
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#111827] hover:bg-[#1A2333] border border-[#1F293D] text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                title="Administrator Portal (Passkey Protected)"
              >
                <Lock className="w-3 h-3 text-cyan-500" />
                <span className="text-[10px]">Admin Portal</span>
              </button>
            </div>

            <div className="flex items-center gap-4">
              <span>{settings.demoDisclaimer}</span>
              <button
                onClick={scrollToTop}
                className="p-1.5 rounded-lg bg-[#111827] hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1"
                title="Scroll back to top"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
