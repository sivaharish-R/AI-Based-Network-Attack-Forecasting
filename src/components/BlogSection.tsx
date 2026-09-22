import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Tag, 
  Clock, 
  Calendar, 
  User, 
  Bookmark, 
  ArrowRight, 
  SlidersHorizontal,
  Sparkles,
  CheckCircle2,
  FileCode
} from 'lucide-react';
import { BlogPost } from '../types';
import { CATEGORIES } from '../data/defaultData';

interface BlogSectionProps {
  blogs: BlogPost[];
  onSelectBlog: (blog: BlogPost) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  blogs,
  onSelectBlog,
  bookmarks,
  onToggleBookmark
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<'latest' | 'readTime' | 'title'>('latest');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  // Filter and Sort Logic
  const filteredBlogs = useMemo(() => {
    return blogs
      .filter((b) => {
        // Published check
        if (!b.published) return false;

        // Bookmark filter
        if (showBookmarksOnly && !bookmarks.includes(b.id)) return false;

        // Category filter
        if (selectedCategory !== "All" && b.category !== selectedCategory) {
          return false;
        }

        // Search query
        if (searchQuery.trim() !== "") {
          const q = searchQuery.toLowerCase();
          const matchTitle = b.title.toLowerCase().includes(q);
          const matchSummary = b.summary.toLowerCase().includes(q);
          const matchAuthor = b.author.toLowerCase().includes(q);
          const matchTags = b.tags.some(t => t.toLowerCase().includes(q));
          return matchTitle || matchSummary || matchAuthor || matchTags;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'readTime') {
          const aMin = parseInt(a.readTime) || 0;
          const bMin = parseInt(b.readTime) || 0;
          return aMin - bMin;
        }
        // Default latest (by array index / date)
        return 0;
      });
  }, [blogs, selectedCategory, searchQuery, sortBy, showBookmarksOnly, bookmarks]);

  return (
    <section id="blogs" className="py-20 bg-[#0B0F19] relative border-b border-[#1F293D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>CYBERSECURITY RESEARCH ARCHIVE (15 PAPERS)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Cybersecurity Blog & Research Portal
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            In-depth technical treatises covering sequence World Models, PCAP feature extraction, SHAP explainability, and Zero Trust engineering.
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#111827] border border-[#1F293D] shadow-xl mb-8 space-y-4">
          {/* Top Bar: Search + Sort + Bookmark Toggle */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-grow max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search across 15 papers by title, topic, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0B0F19] border border-[#1F293D] focus:border-cyan-400 text-white placeholder-slate-400 text-xs focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Bookmark Toggle */}
              <button
                onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                className={`px-3 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 border transition-all cursor-pointer ${
                  showBookmarksOnly
                    ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                    : 'bg-[#0B0F19] border-[#1F293D] text-slate-400 hover:text-white'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 fill-current" />
                <span>Saved ({bookmarks.length})</span>
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B0F19] border border-[#1F293D] text-xs font-mono text-slate-400">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-cyan-300 focus:outline-none cursor-pointer"
                >
                  <option value="latest">Latest First</option>
                  <option value="readTime">Read Time</option>
                  <option value="title">Alphabetical</option>
                </select>
              </div>

              <span className="text-xs font-mono text-slate-400 px-2">
                Showing {filteredBlogs.length} of {blogs.length}
              </span>
            </div>
          </div>

          {/* 10 Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500 text-[#0B0F19] font-bold shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                      : 'bg-[#0B0F19] text-slate-400 hover:text-white border border-[#1F293D] hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-16 bg-[#111827] rounded-2xl border border-[#1F293D]">
            <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No Research Papers Found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              No articles matched your active search query or selected category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setShowBookmarksOnly(false);
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0B0F19] font-bold text-xs font-mono transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => {
            const isBookmarked = bookmarks.includes(blog.id);
            return (
              <div
                key={blog.id}
                className="p-5 rounded-2xl bg-[#111827] border border-[#1F293D] hover:border-cyan-500/50 shadow-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Category & Bookmark Bar */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                      {blog.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(blog.id);
                      }}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isBookmarked 
                          ? 'bg-cyan-950 border-cyan-500/40 text-cyan-400' 
                          : 'bg-[#0B0F19] border-[#1F293D] text-slate-500 hover:text-slate-300'
                      }`}
                      title={isBookmarked ? "Remove Bookmark" : "Save Article"}
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => onSelectBlog(blog)}
                    className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer line-clamp-2 leading-snug mb-2"
                  >
                    {blog.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                    {blog.summary}
                  </p>

                  {/* Key Takeaway snippet pill */}
                  {blog.keyTakeaways && blog.keyTakeaways.length > 0 && (
                    <div className="p-2.5 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-[11px] text-slate-300 mb-4 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2 italic">
                        "{blog.keyTakeaways[0]}"
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {blog.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0B0F19] text-slate-400 border border-[#1F293D]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer Bar: Author & Read Paper Button */}
                  <div className="pt-3 border-t border-[#1F293D] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span className="font-mono">{blog.readTime}</span>
                    </div>

                    <button
                      onClick={() => onSelectBlog(blog)}
                      className="px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all group-hover:border-cyan-400"
                    >
                      <span>Read Paper</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
