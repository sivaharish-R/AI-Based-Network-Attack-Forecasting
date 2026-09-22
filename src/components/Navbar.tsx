import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Cpu, 
  Sliders, 
  Terminal, 
  BookOpen, 
  Users, 
  Activity, 
  Lock,
  Key,
  ChevronRight,
  ExternalLink,
  Sparkles,
  LogOut
} from 'lucide-react';
import { ProjectSettings, BlogPost } from '../types';

interface NavbarProps {
  settings: ProjectSettings;
  darkMode: boolean;
  onToggleTheme: () => void;
  onOpenAdmin: () => void;
  onSelectBlog: (blog: BlogPost) => void;
  allBlogs: BlogPost[];
  isAdminAuthenticated?: boolean;
  onLogoutAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  darkMode,
  onToggleTheme,
  onOpenAdmin,
  onSelectBlog,
  allBlogs,
  isAdminAuthenticated = false,
  onLogoutAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : allBlogs.filter(b => 
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Workflow', href: '#workflow' },
    { label: 'Forecast Engine', href: '#forecasting' },
    { label: 'XAI & MITRE', href: '#xai' },
    { label: 'Smart Storage', href: '#storage' },
    { label: 'Live Dashboard', href: '#dashboard-preview' },
    { label: 'Blogs (15)', href: '#blogs' },
    { label: 'Team', href: '#team' },
    { label: 'Tech Stack', href: '#tech' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#0B0F19]/90 backdrop-blur-md border-b border-[#1F293D] shadow-lg shadow-black/30 py-2.5' 
            : 'bg-[#0B0F19]/70 backdrop-blur-sm border-b border-[#1F293D]/60 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Tagline */}
            <a href="#hero" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                <ShieldAlert className="w-5 h-5 text-cyan-400" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[#0B0F19]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5 group-hover:text-cyan-300 transition-colors">
                  AI Attack Forecast
                  <span 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onOpenAdmin();
                    }}
                    className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950/80 hover:bg-cyan-900 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 font-mono font-medium cursor-pointer transition-colors"
                    title="Open Administrator Portal"
                  >
                    SIH 2026
                  </span>
                </span>
                <span className="text-[11px] text-slate-400 font-medium tracking-wide hidden sm:block">
                  {settings.primaryTagline}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Action Buttons: Search, Theme, Admin, Status */}
            <div className="flex items-center gap-2">
              {/* Quick Search Trigger */}
              <button
                id="btn-search-trigger"
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111827] hover:bg-[#1A2333] border border-[#1F293D] text-slate-400 hover:text-cyan-300 text-xs transition-colors"
                title="Search research and articles"
              >
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden md:inline">Search...</span>
                <kbd className="hidden lg:inline text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                  ⌘K
                </kbd>
              </button>

              {/* Theme Toggle Button */}
              <button
                id="btn-theme-toggle"
                onClick={onToggleTheme}
                aria-label="Toggle theme"
                className="p-2 rounded-lg bg-[#111827] hover:bg-[#1A2333] border border-[#1F293D] text-slate-300 hover:text-cyan-400 transition-colors"
                title={darkMode ? "Switch to Light Cyber Mode" : "Switch to Dark Cyber Mode"}
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
              </button>

              {/* Admin Panel Button / Authenticated Status (Only Shown For Admin When Protected) */}
              {isAdminAuthenticated ? (
                <div className="flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/50 rounded-lg px-2.5 py-1 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <button
                    id="btn-open-admin-unlocked"
                    onClick={onOpenAdmin}
                    className="flex items-center gap-1.5 text-emerald-300 hover:text-emerald-100 text-xs font-mono font-medium transition-colors cursor-pointer"
                    title="Open Admin Management Panel"
                  >
                    <Key className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden sm:inline">Admin Mode</span>
                  </button>
                  {onLogoutAdmin && (
                    <button
                      onClick={onLogoutAdmin}
                      className="p-1 hover:bg-emerald-900/60 rounded text-emerald-400 hover:text-white transition-colors cursor-pointer"
                      title="Lock & Exit Admin Mode"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ) : settings.hideAdminFromPublic ? (
                /* Completely hidden from public visitors */
                null
              ) : (
                <button
                  id="btn-open-admin"
                  onClick={onOpenAdmin}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 hover:text-cyan-200 text-xs font-medium transition-all shadow-[0_0_10px_rgba(0,240,255,0.15)] cursor-pointer"
                  title="Open Admin Management Panel"
                >
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">Admin</span>
                </button>
              )}

              {/* System Status Pill */}
              <div 
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#111827] border border-[#1F293D] text-[11px] font-mono text-slate-300"
                title={`Status: ${settings.systemStatus}`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-semibold">{settings.systemStatus}</span>
              </div>

              {/* Mobile Hamburger Toggle */}
              <button
                id="btn-mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-lg bg-[#111827] border border-[#1F293D] text-slate-300 hover:text-white"
                aria-label="Open mobile menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#0B0F19]/95 backdrop-blur-xl border-b border-[#1F293D] px-4 pt-3 pb-6 mt-2">
            <div className="flex flex-col gap-1.5">
              <div className="py-1 px-3 mb-2 rounded bg-slate-900/80 border border-slate-800 text-[11px] text-cyan-400 font-mono">
                {settings.secondaryTagline}
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-800/70 transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </a>
              ))}
              <div className="pt-2 border-t border-slate-800/80">
                {isAdminAuthenticated ? (
                  <div className="w-full flex items-center justify-between p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/50">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAdmin();
                      }}
                      className="flex items-center gap-2 text-emerald-300 font-mono text-xs font-bold cursor-pointer"
                    >
                      <Sliders className="w-4 h-4 text-emerald-400" />
                      <span>Admin Active</span>
                    </button>
                    {onLogoutAdmin && (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onLogoutAdmin();
                        }}
                        className="px-2.5 py-1 rounded bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800/60 text-xs font-mono cursor-pointer"
                      >
                        Exit Admin
                      </button>
                    )}
                  </div>
                ) : settings.hideAdminFromPublic ? (
                  /* Completely hidden from public visitors */
                  null
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdmin();
                    }}
                    className="w-full py-2.5 rounded-lg bg-cyan-900/40 border border-cyan-500/40 text-cyan-300 font-medium text-sm text-center flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sliders className="w-4 h-4" />
                    Admin Panel
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-[#111827] border border-cyan-500/40 rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center px-4 py-3 border-b border-[#1F293D] bg-[#0B0F19]">
              <Search className="w-5 h-5 text-cyan-400 mr-3" />
              <input
                type="text"
                autoFocus
                placeholder="Search articles, techniques (e.g. LSTM, PCAP, SHAP, MITRE)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-4 space-y-2">
              {searchQuery.trim() === '' ? (
                <div className="py-6 text-center text-slate-400 text-xs">
                  <p className="font-mono text-cyan-400/90 mb-1">PROMPT: TYPE TO SEARCH CYBERSECURITY ARCHIVES</p>
                  <p>Search across 15 research papers, technical models, and network features.</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs">
                  <p>No matching research papers or technical blogs found for "{searchQuery}".</p>
                </div>
              ) : (
                searchResults.map((blog) => (
                  <div
                    key={blog.id}
                    onClick={() => {
                      onSelectBlog(blog);
                      setSearchOpen(false);
                    }}
                    className="p-3 rounded-lg bg-[#0B0F19] hover:bg-[#162032] border border-[#1F293D] hover:border-cyan-500/50 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40 font-mono">
                        {blog.category}
                      </span>
                      <span className="text-slate-400">{blog.readTime}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {blog.title}
                    </h4>
                    <p className="text-xs text-slate-300 line-clamp-1 mt-1">
                      {blog.summary}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="px-4 py-2 bg-[#0B0F19] border-t border-[#1F293D] flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Press ESC to close</span>
              <span>15 Articles Indexed</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
