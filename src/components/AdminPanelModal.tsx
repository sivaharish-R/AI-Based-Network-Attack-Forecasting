import React, { useState } from 'react';
import { 
  X, 
  Sliders, 
  BookOpen, 
  Users, 
  Settings, 
  Database, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  RotateCcw, 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  EyeOff,
  Crown,
  Lock,
  Key,
  LogOut
} from 'lucide-react';
import { BlogPost, TeamMember, ProjectSettings } from '../types';
import { CATEGORIES } from '../data/defaultData';
import { exportBackupData, importBackupData, resetAllDataToDefault } from '../utils/storage';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  blogs: BlogPost[];
  onSaveBlogs: (blogs: BlogPost[]) => void;
  team: TeamMember[];
  onSaveTeam: (team: TeamMember[]) => void;
  settings: ProjectSettings;
  onSaveSettings: (settings: ProjectSettings) => void;
  onRefreshAll: () => void;
  onLogout?: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  blogs,
  onSaveBlogs,
  team,
  onSaveTeam,
  settings,
  onSaveSettings,
  onRefreshAll,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'blogs' | 'team' | 'settings' | 'backup'>('blogs');
  const [notification, setNotification] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  // Blog Editor State
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isCreatingBlog, setIsCreatingBlog] = useState(false);

  // Team Editor State
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isCreatingMember, setIsCreatingMember] = useState(false);

  // Settings Form State
  const [tempSettings, setTempSettings] = useState<ProjectSettings>(settings);
  const [showPasskeyInSettings, setShowPasskeyInSettings] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  if (!isOpen) return null;

  const showNotify = (msg: string, type: 'success' | 'error' = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Blog Handlers
  const handleTogglePublish = (blogId: string) => {
    const updated = blogs.map(b => b.id === blogId ? { ...b, published: !b.published } : b);
    onSaveBlogs(updated);
    showNotify("Blog publish status toggled.");
  };

  const handleDeleteBlog = (blogId: string) => {
    if (confirm("Are you sure you want to delete this research article?")) {
      const updated = blogs.filter(b => b.id !== blogId);
      onSaveBlogs(updated);
      showNotify("Article deleted successfully.");
    }
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    if (!editingBlog.title.trim()) {
      showNotify("Article title is required", "error");
      return;
    }

    if (isCreatingBlog) {
      const newPost: BlogPost = {
        ...editingBlog,
        id: `blog-custom-${Date.now()}`,
        slug: editingBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      onSaveBlogs([newPost, ...blogs]);
      showNotify("New research article published!");
    } else {
      const updated = blogs.map(b => b.id === editingBlog.id ? editingBlog : b);
      onSaveBlogs(updated);
      showNotify("Article updated successfully!");
    }

    setEditingBlog(null);
    setIsCreatingBlog(false);
  };

  // Team Handlers
  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    if (!editingMember.name.trim()) {
      showNotify("Member name is required", "error");
      return;
    }

    let cleanLinkedin = (editingMember.linkedin || '').trim();
    if (cleanLinkedin && !cleanLinkedin.startsWith('http://') && !cleanLinkedin.startsWith('https://')) {
      cleanLinkedin = `https://${cleanLinkedin}`;
    }

    const memberToSave: TeamMember = {
      ...editingMember,
      linkedin: cleanLinkedin || 'https://www.linkedin.com',
    };

    if (isCreatingMember) {
      const newMem: TeamMember = {
        ...memberToSave,
        id: `tm-${Date.now()}`,
        order: team.length + 1
      };
      onSaveTeam([...team, newMem]);
      showNotify("Team member added!");
    } else {
      const updated = team.map(m => m.id === memberToSave.id ? memberToSave : m);
      onSaveTeam(updated);
      showNotify("Team member updated!");
    }

    setEditingMember(null);
    setIsCreatingMember(false);
  };

  const handleDeleteMember = (memberId: string) => {
    if (confirm("Are you sure you want to remove this team member?")) {
      const updated = team.filter(m => m.id !== memberId);
      onSaveTeam(updated);
      showNotify("Member removed.");
    }
  };

  // Settings Handlers
  const handleSaveProjectSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(tempSettings);
    showNotify("Project metadata and system settings saved!");
  };

  // Backup & Reset Handlers
  const handleExport = () => {
    const json = exportBackupData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CyberForecast_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotify("System backup exported to JSON.");
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importBackupData(content);
      if (success) {
        onRefreshAll();
        showNotify("Backup restored successfully!");
      } else {
        showNotify("Invalid backup file format", "error");
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = () => {
    if (confirm("Reset all articles, team members, and settings to original hackathon defaults? Any custom edits will be lost.")) {
      resetAllDataToDefault();
      onRefreshAll();
      showNotify("System restored to factory defaults.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-5xl bg-[#111827] border border-cyan-500/50 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1F293D] bg-[#0D1525] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>CyberForecast Administration Panel</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-900/60 text-cyan-300 border border-cyan-700">
                  LocalStorage CRUD
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Manage technical blog articles, team directory, and global system metadata in real-time.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onLogout && (
              <button
                type="button"
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800/60 text-red-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Lock and exit admin mode"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Exit Admin</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#0B0F19] hover:bg-red-950/60 border border-[#1F293D] hover:border-red-500/40 text-slate-400 hover:text-red-300 transition-colors cursor-pointer"
              title="Close panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className={`px-6 py-2.5 text-xs font-mono flex items-center gap-2 ${
            notification.type === 'success' 
              ? 'bg-emerald-950/90 text-emerald-300 border-b border-emerald-800' 
              : 'bg-red-950/90 text-red-300 border-b border-red-800'
          }`}>
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{notification.msg}</span>
          </div>
        )}

        {/* Tab Navigation Ribbon */}
        <div className="flex items-center px-6 border-b border-[#1F293D] bg-[#0B0F19] flex-shrink-0 overflow-x-auto gap-2">
          <button
            onClick={() => {
              setActiveTab('blogs');
              setEditingBlog(null);
            }}
            className={`py-3 px-4 text-xs font-mono font-medium border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'blogs'
                ? 'border-cyan-400 text-cyan-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Articles ({blogs.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('team');
              setEditingMember(null);
            }}
            className={`py-3 px-4 text-xs font-mono font-medium border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'team'
                ? 'border-cyan-400 text-cyan-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Team Members ({team.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-4 text-xs font-mono font-medium border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'settings'
                ? 'border-cyan-400 text-cyan-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Project Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`py-3 px-4 text-xs font-mono font-medium border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'backup'
                ? 'border-cyan-400 text-cyan-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Backup & Reset</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="overflow-y-auto p-6 flex-grow space-y-6">
          {/* TAB 1: BLOGS */}
          {activeTab === 'blogs' && (
            <div>
              {editingBlog ? (
                /* Blog Form */
                <form onSubmit={handleSaveBlog} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1F293D]">
                    <h3 className="text-sm font-bold text-white">
                      {isCreatingBlog ? "Draft New Research Paper" : `Edit Paper: ${editingBlog.title}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingBlog(null);
                        setIsCreatingBlog(false);
                      }}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Title *</label>
                      <input
                        type="text"
                        required
                        value={editingBlog.title}
                        onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] focus:border-cyan-400 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Category</label>
                      <select
                        value={editingBlog.category}
                        onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] focus:border-cyan-400 text-white text-xs"
                      >
                        {CATEGORIES.filter(c => c !== 'All').map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Author Name</label>
                      <input
                        type="text"
                        value={editingBlog.author}
                        onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Author Role</label>
                      <input
                        type="text"
                        value={editingBlog.authorRole}
                        onChange={(e) => setEditingBlog({ ...editingBlog, authorRole: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">Abstract / Executive Summary *</label>
                    <textarea
                      rows={2}
                      required
                      value={editingBlog.summary}
                      onChange={(e) => setEditingBlog({ ...editingBlog, summary: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">Full Content (Supports Markdown paragraphs & ### headers) *</label>
                    <textarea
                      rows={6}
                      required
                      value={editingBlog.content}
                      onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-white text-xs font-mono"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#1F293D]">
                    <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingBlog.published}
                        onChange={(e) => setEditingBlog({ ...editingBlog, published: e.target.checked })}
                        className="rounded accent-cyan-400"
                      />
                      <span>Publish Immediately</span>
                    </label>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingBlog(null)}
                        className="px-4 py-2 rounded-lg bg-[#0B0F19] hover:bg-slate-800 border border-[#1F293D] text-slate-300 text-xs font-mono"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0B0F19] font-bold text-xs font-mono transition-colors"
                      >
                        Save Article
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                /* Blog List */
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-slate-400">
                      Total Articles Indexed: {blogs.length}
                    </span>
                    <button
                      onClick={() => {
                        setIsCreatingBlog(true);
                        setEditingBlog({
                          id: '',
                          title: '',
                          slug: '',
                          summary: '',
                          content: '',
                          category: 'Cybersecurity',
                          author: 'Yashmini N. P & Sivaharish R',
                          authorRole: 'Security Researchers',
                          readTime: '6 min read',
                          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                          tags: ['Forecasting', 'SIH2026'],
                          published: true,
                          keyTakeaways: ['New research paper key finding'],
                          tableOfContents: [{ id: 'intro', title: 'Introduction' }]
                        });
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0B0F19] font-bold text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Write New Article</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {blogs.map((b) => (
                      <div
                        key={b.id}
                        className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#1F293D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                              {b.category}
                            </span>
                            <span className={`text-[10px] font-mono px-2 py-0.2 rounded border ${
                              b.published ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}>
                              {b.published ? 'Published' : 'Draft'}
                            </span>
                            <span className="text-[11px] text-slate-500 font-mono">{b.readTime}</span>
                          </div>
                          <h4 className="text-xs font-bold text-white truncate">
                            {b.title}
                          </h4>
                          <span className="text-[11px] text-slate-400 truncate block">
                            By {b.author} • {b.date}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleTogglePublish(b.id)}
                            className={`px-2.5 py-1 rounded text-xs font-mono border ${
                              b.published ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                            }`}
                          >
                            {b.published ? 'Unpublish' : 'Publish'}
                          </button>
                          <button
                            onClick={() => {
                              setIsCreatingBlog(false);
                              setEditingBlog(b);
                            }}
                            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700"
                            title="Edit Article"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(b.id)}
                            className="p-1.5 rounded bg-red-950/60 hover:bg-red-900 border border-red-800/40 text-red-300"
                            title="Delete Article"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TEAM MEMBERS */}
          {activeTab === 'team' && (
            <div>
              {editingMember ? (
                /* Member Edit Form */
                <form onSubmit={handleSaveMember} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1F293D]">
                    <h3 className="text-sm font-bold text-white">
                      {isCreatingMember ? "Add Team Member" : `Edit Member: ${editingMember.name}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingMember(null)}
                      className="text-xs text-slate-400 hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  {/* Photo / Avatar Section */}
                  <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#1F293D] flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-900 border border-cyan-500/40 flex-shrink-0 flex items-center justify-center">
                      {editingMember.avatar ? (
                        <img 
                          src={editingMember.avatar} 
                          alt="Avatar preview" 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="text-[10px] font-mono font-bold text-slate-500 text-center px-1">No Photo</span>
                      )}
                    </div>
                    <div className="flex-1 w-full space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono text-slate-300 block">
                          Profile Photo (Image URL or Upload from Computer)
                        </label>
                        {editingMember.avatar && (
                          <button
                            type="button"
                            onClick={() => setEditingMember({ ...editingMember, avatar: '' })}
                            className="text-[11px] text-red-400 hover:text-red-300 font-mono cursor-pointer"
                          >
                            Remove Photo
                          </button>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          placeholder="https://example.com/photo.jpg or data:image/..."
                          value={editingMember.avatar || ''}
                          onChange={(e) => setEditingMember({ ...editingMember, avatar: e.target.value })}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-[#111827] border border-[#1F293D] text-white text-xs font-mono"
                        />
                        <label className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-xs font-mono flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  if (event.target?.result) {
                                    setEditingMember({
                                      ...editingMember,
                                      avatar: event.target.result as string
                                    });
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={editingMember.name}
                        onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Role / Specialization *</label>
                      <input
                        type="text"
                        required
                        value={editingMember.role}
                        onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Email</label>
                      <input
                        type="email"
                        value={editingMember.email || ''}
                        onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">LinkedIn Profile URL</label>
                      <input
                        type="text"
                        placeholder="https://www.linkedin.com/in/username or username"
                        value={editingMember.linkedin || ''}
                        onChange={(e) => setEditingMember({ ...editingMember, linkedin: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">Professional Biography</label>
                    <textarea
                      rows={3}
                      value={editingMember.bio}
                      onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">
                      Skills (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={editingMember.skills.join(', ')}
                      onChange={(e) => setEditingMember({
                        ...editingMember,
                        skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                      })}
                      className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-white text-xs"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#1F293D]">
                    <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingMember.isLeader}
                        onChange={(e) => setEditingMember({ ...editingMember, isLeader: e.target.checked })}
                        className="rounded accent-amber-400"
                      />
                      <span className="flex items-center gap-1 text-amber-300 font-bold">
                        <Crown className="w-3.5 h-3.5" /> Set as Team Leader
                      </span>
                    </label>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingMember(null)}
                        className="px-4 py-2 rounded-lg bg-[#0B0F19] hover:bg-slate-800 border border-[#1F293D] text-slate-300 text-xs font-mono"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0B0F19] font-bold text-xs font-mono transition-colors"
                      >
                        Save Member
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                /* Team Member List */
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-slate-400">
                      Team Roster: {team.length} Members
                    </span>
                    <button
                      onClick={() => {
                        setIsCreatingMember(true);
                        setEditingMember({
                          id: '',
                          name: '',
                          role: 'Security Researcher',
                          isLeader: false,
                          bio: 'Contributes to network attack forecasting research.',
                          skills: ['Python', 'Network Security'],
                          contributions: ['Contributed to system validation'],
                          linkedin: 'https://www.linkedin.com',
                          order: team.length + 1
                        });
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0B0F19] font-bold text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Member</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {team.map((m) => (
                      <div
                        key={m.id}
                        className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#1F293D] flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3.5">
                          {m.avatar ? (
                            <div className="w-14 h-14 rounded-xl overflow-hidden border border-cyan-500/50 bg-slate-800 flex-shrink-0 shadow-sm">
                              <img 
                                src={m.avatar} 
                                alt={m.name} 
                                className="w-full h-full object-cover object-top" 
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          ) : (
                            <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-cyan-300 text-sm font-mono border border-slate-700 flex-shrink-0">
                              {m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-white">{m.name}</h4>
                              {m.isLeader && (
                                <span className="px-2 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-mono flex items-center gap-1">
                                  <Crown className="w-3 h-3" /> Leader
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-cyan-400 font-mono">{m.role}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setIsCreatingMember(false);
                              setEditingMember(m);
                            }}
                            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteMember(m.id)}
                            className="p-1.5 rounded bg-red-950/60 hover:bg-red-900 border border-red-800/40 text-red-300"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROJECT SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveProjectSettings} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Project Name</label>
                  <input
                    type="text"
                    value={tempSettings.projectName}
                    onChange={(e) => setTempSettings({ ...tempSettings, projectName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-white text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Team Name (Banner Display)</label>
                  <input
                    type="text"
                    value={tempSettings.teamName}
                    onChange={(e) => setTempSettings({ ...tempSettings, teamName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-white text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Primary Brand Tagline</label>
                  <input
                    type="text"
                    value={tempSettings.primaryTagline}
                    onChange={(e) => setTempSettings({ ...tempSettings, primaryTagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-white text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Secondary Tagline (5 Pillars)</label>
                  <input
                    type="text"
                    value={tempSettings.secondaryTagline}
                    onChange={(e) => setTempSettings({ ...tempSettings, secondaryTagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-white text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={tempSettings.contactEmail}
                    onChange={(e) => setTempSettings({ ...tempSettings, contactEmail: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-white text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Governance Lead Name</label>
                  <input
                    type="text"
                    value={tempSettings.governanceLead ?? 'Sivaharish R'}
                    onChange={(e) => setTempSettings({ ...tempSettings, governanceLead: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-white text-xs"
                    placeholder="e.g. Sivaharish R"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Storage Retention Days (Level 2)</label>
                  <input
                    type="number"
                    value={tempSettings.storageRetentionDays}
                    onChange={(e) => setTempSettings({ ...tempSettings, storageRetentionDays: parseInt(e.target.value) || 30 })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">Project Subtitle</label>
                <textarea
                  rows={2}
                  value={tempSettings.projectSubtitle}
                  onChange={(e) => setTempSettings({ ...tempSettings, projectSubtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-white text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">Demonstration Data Disclaimer</label>
                <input
                  type="text"
                  value={tempSettings.demoDisclaimer}
                  onChange={(e) => setTempSettings({ ...tempSettings, demoDisclaimer: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-white text-xs"
                />
              </div>

              {/* Publication Security & Admin Privacy */}
              <div className="p-4 rounded-xl bg-[#0B0F19] border border-cyan-500/30 space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <Lock className="w-4 h-4" />
                  <span>Publication Security & Access Control</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Protect this admin console from public viewers when your website is published.
                </p>

                <div className="flex items-start justify-between p-3 rounded-lg bg-[#111827] border border-[#1F293D] gap-4">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Hide Admin Entry Points in Public Mode
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Hides the visible Admin button from regular visitors. You can still access it anytime using shortcut (<kbd className="text-cyan-400 font-mono">Ctrl + Shift + A</kbd>), the URL hash (<code className="text-cyan-400 font-mono">#admin</code>), or the discreet footer lock.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={tempSettings.hideAdminFromPublic ?? true}
                    onChange={(e) => setTempSettings({ ...tempSettings, hideAdminFromPublic: e.target.checked })}
                    className="w-4 h-4 accent-cyan-500 rounded mt-1 cursor-pointer"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-cyan-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-cyan-300 font-semibold flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-cyan-400" />
                      Master Admin Passkey (Private to Admin Only)
                    </label>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                      CONFIDENTIAL
                    </span>
                  </div>

                  <div className="relative flex items-center gap-2">
                    <input
                      type={showPasskeyInSettings ? "text" : "password"}
                      value={tempSettings.adminPasskey || 'cyberforecast2025'}
                      onChange={(e) => setTempSettings({ ...tempSettings, adminPasskey: e.target.value })}
                      className="w-full px-3 py-2 pr-20 rounded-lg bg-[#111827] border border-[#1F293D] text-cyan-300 font-mono text-xs focus:border-cyan-400 focus:outline-none"
                      placeholder="Set custom admin passkey..."
                    />
                    <div className="absolute right-2 flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setShowPasskeyInSettings(!showPasskeyInSettings)}
                        className="p-1 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                        title={showPasskeyInSettings ? "Hide passkey" : "Show passkey"}
                      >
                        {showPasskeyInSettings ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(tempSettings.adminPasskey || 'cyberforecast2025');
                          setCopiedKey(true);
                          setTimeout(() => setCopiedKey(false), 2000);
                        }}
                        className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Copy key to clipboard"
                      >
                        {copiedKey ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
                    This security key is strictly confidential and is <strong>never displayed to public visitors</strong> or on the public login prompt. Use it to authenticate via <kbd className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded border border-slate-700">Ctrl + Shift + A</kbd> or <code className="text-cyan-300">#admin</code>.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1F293D] flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0B0F19] font-bold text-xs font-mono transition-colors"
                >
                  Save Project Settings
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: BACKUP & RESTORE */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#0B0F19] border border-[#1F293D]">
                <h4 className="text-sm font-bold text-white mb-1">Export Configuration & Articles</h4>
                <p className="text-xs text-slate-400 mb-3">
                  Downloads a complete JSON snapshot containing all research articles, custom team edits, and project settings.
                </p>
                <button
                  onClick={handleExport}
                  className="px-4 py-2 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-mono text-xs flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download JSON Backup</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#0B0F19] border border-[#1F293D]">
                <h4 className="text-sm font-bold text-white mb-1">Restore from Backup</h4>
                <p className="text-xs text-slate-400 mb-3">
                  Select a valid previously downloaded CyberForecast JSON snapshot to restore state.
                </p>
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-mono text-xs cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>Choose JSON File</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportFile}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="p-4 rounded-xl bg-red-950/30 border border-red-900/50">
                <h4 className="text-sm font-bold text-red-300 mb-1">Factory Reset System</h4>
                <p className="text-xs text-slate-400 mb-3">
                  Revert all 15 articles, team profiles, and settings to original SIH 2026 dataset.
                </p>
                <button
                  onClick={handleResetDefaults}
                  className="px-4 py-2 rounded-lg bg-red-950 hover:bg-red-900 border border-red-500/50 text-red-300 font-mono text-xs flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset to Factory Defaults</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
