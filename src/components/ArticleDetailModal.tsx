import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  Calendar, 
  User, 
  Bookmark, 
  Share2, 
  Copy, 
  Check, 
  CheckCircle2, 
  BookOpen, 
  Tag, 
  ArrowLeft,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { BlogPost } from '../types';

interface ArticleDetailModalProps {
  blog: BlogPost | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  blog,
  onClose,
  isBookmarked,
  onToggleBookmark
}) => {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!blog) return null;

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(idx);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#111827] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F293D] bg-[#0D1525] flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#0B0F19] hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Close paper"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              {blog.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(blog.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isBookmarked 
                  ? 'bg-cyan-950 border-cyan-500/50 text-cyan-300' 
                  : 'bg-[#0B0F19] border-[#1F293D] text-slate-400 hover:text-white'
              }`}
              title={isBookmarked ? "Remove Bookmark" : "Bookmark Article"}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-[#0B0F19] border border-[#1F293D] text-slate-400 hover:text-white transition-colors"
              title="Copy share link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#0B0F19] hover:bg-red-950/60 border border-[#1F293D] hover:border-red-500/50 text-slate-400 hover:text-red-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto px-6 py-8 space-y-8 flex-grow">
          {/* Title & Metadata */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-4 pb-6 border-b border-[#1F293D]">
              <div className="flex items-center gap-1.5 text-cyan-300 font-medium">
                <User className="w-3.5 h-3.5" />
                <span>{blog.author}</span>
                <span className="text-slate-500">({blog.authorRole})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>

          {/* Executive Summary Callout */}
          <div className="p-4 rounded-xl bg-[#0B0F19] border-l-4 border-cyan-400 border border-[#1F293D]">
            <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
              Executive Abstract
            </span>
            <p className="text-sm text-slate-200 leading-relaxed italic">
              "{blog.summary}"
            </p>
          </div>

          {/* Key Takeaways Box */}
          {blog.keyTakeaways && blog.keyTakeaways.length > 0 && (
            <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-950/30 to-[#0B0F19] border border-cyan-500/40">
              <h3 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Core Research Findings & Key Takeaways</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {blog.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-cyan-400 font-bold mt-0.5">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Table of Contents */}
          {blog.tableOfContents && blog.tableOfContents.length > 0 && (
            <div className="p-4 rounded-xl bg-[#0B0F19] border border-[#1F293D]">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                Table of Contents:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {blog.tableOfContents.map((toc, idx) => (
                  <a
                    key={toc.id}
                    href={`#${toc.id}`}
                    className="text-cyan-400/90 hover:text-cyan-300 hover:underline truncate"
                  >
                    0{idx + 1}. {toc.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Main Article Text */}
          <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4">
            {blog.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-lg font-bold text-white pt-3 pb-1 border-b border-[#1F293D]">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('* ')) {
                const items = paragraph.split('\n');
                return (
                  <ul key={idx} className="space-y-1.5 pl-4 list-disc text-slate-300">
                    {items.map((it, i) => (
                      <li key={i}>{it.replace('* ', '')}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Code Snippets */}
          {blog.codeSnippets && blog.codeSnippets.length > 0 && (
            <div className="space-y-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Source Implementation Snippets:
              </span>
              {blog.codeSnippets.map((snippet, idx) => (
                <div key={idx} className="rounded-xl border border-[#1F293D] bg-[#0B0F19] overflow-hidden">
                  <div className="px-4 py-2 border-b border-[#1F293D] bg-[#162032] flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-300 flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5" />
                      {snippet.title}
                    </span>
                    <button
                      onClick={() => handleCopyCode(snippet.code, idx)}
                      className="px-2.5 py-1 rounded bg-[#0B0F19] hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-[11px] font-mono flex items-center gap-1.5 transition-colors"
                    >
                      {copiedCodeIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed bg-[#0B0F19]">
                    <code>{snippet.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="pt-4 border-t border-[#1F293D] flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1">
              <Tag className="w-3 h-3" /> Tags:
            </span>
            {blog.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-2.5 py-1 rounded-md bg-[#0B0F19] border border-[#1F293D] text-xs font-mono text-slate-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer Bar */}
        <div className="px-6 py-3.5 border-t border-[#1F293D] bg-[#0D1525] flex items-center justify-between text-xs font-mono text-slate-400 flex-shrink-0">
          <span>AI-Based Network Attack Forecasting • SIH 2026</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0B0F19] font-bold transition-colors cursor-pointer"
          >
            Close Paper
          </button>
        </div>
      </div>
    </div>
  );
};
