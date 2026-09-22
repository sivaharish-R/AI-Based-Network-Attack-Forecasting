import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorkflowSection } from './components/WorkflowSection';
import { ForecastingSection } from './components/ForecastingSection';
import { XAISection } from './components/XAISection';
import { StorageArchitectureSection } from './components/StorageArchitectureSection';
import { DashboardPreview } from './components/DashboardPreview';
import { BlogSection } from './components/BlogSection';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { TeamSection } from './components/TeamSection';
import { TechComparisonSection } from './components/TechComparisonSection';
import { AboutContactFooter } from './components/AboutContactFooter';
import { AdminPanelModal } from './components/AdminPanelModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { BlogPost, TeamMember, ProjectSettings } from './types';
import { 
  loadBlogs, 
  saveBlogs, 
  loadTeam, 
  saveTeam, 
  loadSettings, 
  saveSettings, 
  loadBookmarks, 
  saveBookmarks,
  toggleBookmarkItem
} from './utils/storage';

export default function App() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [settings, setSettings] = useState<ProjectSettings>(loadSettings());
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isDark, setIsDark] = useState<boolean>(true);
  const [activeBlogModal, setActiveBlogModal] = useState<BlogPost | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('cyberforecast_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  // Initial load
  useEffect(() => {
    setBlogs(loadBlogs());
    setTeam(loadTeam());
    setSettings(loadSettings());
    setBookmarks(loadBookmarks());
  }, []);

  // Update theme class on HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [isDark]);

  // Handlers
  const handleToggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const handleToggleBookmark = (id: string) => {
    const updated = toggleBookmarkItem(id);
    setBookmarks(updated);
  };

  const handleSaveBlogs = (newBlogs: BlogPost[]) => {
    setBlogs(newBlogs);
    saveBlogs(newBlogs);
  };

  const handleSaveTeam = (newTeam: TeamMember[]) => {
    setTeam(newTeam);
    saveTeam(newTeam);
  };

  const handleSaveSettings = (newSettings: ProjectSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleRefreshAll = () => {
    setBlogs(loadBlogs());
    setTeam(loadTeam());
    setSettings(loadSettings());
    setBookmarks(loadBookmarks());
  };

  const handleRequestOpenAdmin = () => {
    if (isAdminAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setIsAdminAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAdminAuthenticated(true);
    try {
      sessionStorage.setItem('cyberforecast_admin_auth', 'true');
    } catch {}
    setIsAdminAuthModalOpen(false);
    setIsAdminOpen(true);
  };

  const handleLogoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('cyberforecast_admin_auth');
    } catch {}
    setIsAdminOpen(false);
  };

  // Keyboard shortcut listener (Ctrl + Shift + A) & #admin URL hash support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        handleRequestOpenAdmin();
      }
    };

    const handleHashCheck = () => {
      if (window.location.hash === '#admin') {
        handleRequestOpenAdmin();
        try {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        } catch {}
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHashCheck);
    handleHashCheck();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHashCheck);
    };
  }, [isAdminAuthenticated]);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0B0F19] text-slate-100' : 'bg-slate-50 text-slate-900'} font-sans selection:bg-cyan-500 selection:text-black transition-colors duration-200`}>
      {/* Top Fixed Cyber Navigation Bar */}
      <Navbar
        settings={settings}
        darkMode={isDark}
        onToggleTheme={handleToggleTheme}
        onOpenAdmin={handleRequestOpenAdmin}
        onSelectBlog={(blog) => setActiveBlogModal(blog)}
        allBlogs={blogs}
        isAdminAuthenticated={isAdminAuthenticated}
        onLogoutAdmin={handleLogoutAdmin}
      />

      <main>
        {/* Section 1 & 2: Hero & Traditional vs Proposed Paradigm */}
        <Hero
          settings={settings}
          onExploreProject={() => {
            document.getElementById('pipeline')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onReadBlogs={() => {
            document.getElementById('blogs')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Section 3: 10-Step Interactive Pipeline Architecture Visualizer */}
        <WorkflowSection />

        {/* Section 4: World Model & K-Step Attack Forecasting */}
        <ForecastingSection
          demoDisclaimer={settings.demoDisclaimer}
        />

        {/* Section 5: MITRE ATT&CK Progression & Explainable AI (SHAP) */}
        <XAISection />

        {/* Section 6: Offline AI, Smart Storage & Risk-Adaptive Capture */}
        <StorageArchitectureSection />

        {/* Section 7: Live Project Dashboard Preview with packet stream & JSON report download */}
        <DashboardPreview
          settings={settings}
        />

        {/* Section 8: Cybersecurity Blog Platform & Research Archive (15 Papers) */}
        <BlogSection
          blogs={blogs}
          onSelectBlog={(blog) => setActiveBlogModal(blog)}
          bookmarks={bookmarks}
          onToggleBookmark={handleToggleBookmark}
        />

        {/* Section 9: Meet Our Team (Yashmini N. P & Specialists) & 5 Pillars */}
        <TeamSection
          team={team}
          settings={settings}
          onOpenAdmin={handleRequestOpenAdmin}
          isAdminAuthenticated={isAdminAuthenticated}
        />

        {/* Section 10: Technology Stack (11 Techs) & Comparison Matrix & Honest Limitations */}
        <TechComparisonSection />

        {/* Section 12: About Problem Statement, Contact Form & Cybersecurity Footer */}
        <AboutContactFooter
          settings={settings}
          team={team}
          onOpenAdmin={handleRequestOpenAdmin}
          isAdminAuthenticated={isAdminAuthenticated}
        />
      </main>

      {/* Article Detail Modal Reader with TOC & Code Snippet Copy */}
      <ArticleDetailModal
        blog={activeBlogModal}
        onClose={() => setActiveBlogModal(null)}
        isBookmarked={activeBlogModal ? bookmarks.includes(activeBlogModal.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* Admin Passcode Security Gate Modal */}
      <AdminAuthModal
        isOpen={isAdminAuthModalOpen}
        onClose={() => setIsAdminAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        settings={settings}
      />

      {/* Admin Panel Modal (LocalStorage Powered CRUD for Blogs, Team, Settings, Backup) */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        blogs={blogs}
        onSaveBlogs={handleSaveBlogs}
        team={team}
        onSaveTeam={handleSaveTeam}
        settings={settings}
        onSaveSettings={handleSaveSettings}
        onRefreshAll={handleRefreshAll}
        onLogout={handleLogoutAdmin}
      />
    </div>
  );
}
