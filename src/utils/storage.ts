import { BlogPost, TeamMember, ProjectSettings } from '../types';
import { BLOG_POSTS, TEAM_MEMBERS, DEFAULT_PROJECT_SETTINGS } from '../data/defaultData';

const STORAGE_KEYS = {
  BLOGS: 'cyberforecast_blogs_v1',
  TEAM: 'cyberforecast_team_v1',
  SETTINGS: 'cyberforecast_settings_v1',
  BOOKMARKS: 'cyberforecast_bookmarks_v1',
  THEME: 'cyberforecast_theme_v1'
};

export function getStoredBlogs(): BlogPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BLOGS);
    if (!raw) {
      saveStoredBlogs(BLOG_POSTS);
      return BLOG_POSTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load blogs from localStorage:", e);
    return BLOG_POSTS;
  }
}

export function saveStoredBlogs(blogs: BlogPost[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
  } catch (e) {
    console.error("Failed to save blogs:", e);
  }
}

const DEFAULT_AVATARS: Record<string, string> = {
  'tm-1': '/team/yashmini.jpg',
  'tm-2': '/team/sivaharish.jpg',
  'tm-3': '/team/dharanish.jpg',
  'tm-4': '/team/vishnu.jpg',
  'tm-5': '/team/naviyasri.jpg',
  'tm-6': '/team/yawanthika.jpg',
};

export function getStoredTeam(): TeamMember[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TEAM);
    if (!raw) {
      saveStoredTeam(TEAM_MEMBERS);
      return TEAM_MEMBERS;
    }
    const parsed: TeamMember[] = JSON.parse(raw);
    const sanitized = parsed.map((m: any) => {
      const member = { ...m };
      delete member.github;
      
      // Ensure LinkedIn is an absolute external URL
      if (!member.linkedin || member.linkedin.trim() === '') {
        member.linkedin = 'https://www.linkedin.com';
      } else {
        const trimmed = member.linkedin.trim();
        if (!/^https?:\/\//i.test(trimmed)) {
          member.linkedin = `https://${trimmed}`;
        } else {
          member.linkedin = trimmed;
        }
      }

      // Automatically migrate and heal dev paths, blob URLs, or missing avatars
      const isBrokenOrDevAvatar = 
        !member.avatar || 
        member.avatar.includes('/src/assets/') || 
        member.avatar.includes('@fs/') || 
        member.avatar.startsWith('blob:') ||
        member.avatar.includes('localhost:');

      if (isBrokenOrDevAvatar) {
        member.avatar = DEFAULT_AVATARS[member.id] || `/team/${member.id}.jpg`;
      }

      return member as TeamMember;
    });

    // Save back healed team data to localStorage
    saveStoredTeam(sanitized);
    return sanitized;
  } catch (e) {
    console.error("Failed to load team from localStorage:", e);
    return TEAM_MEMBERS;
  }
}

export function saveStoredTeam(team: TeamMember[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(team));
  } catch (e) {
    console.error("Failed to save team:", e);
  }
}

export function getStoredSettings(): ProjectSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) {
      saveStoredSettings(DEFAULT_PROJECT_SETTINGS);
      return DEFAULT_PROJECT_SETTINGS;
    }
    const parsed = JSON.parse(raw);
    return { 
      ...DEFAULT_PROJECT_SETTINGS, 
      ...parsed,
      governanceLead: parsed.governanceLead || DEFAULT_PROJECT_SETTINGS.governanceLead || 'Sivaharish R'
    };
  } catch (e) {
    console.error("Failed to load settings:", e);
    return DEFAULT_PROJECT_SETTINGS;
  }
}

export function saveStoredSettings(settings: ProjectSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error("Failed to save settings:", e);
  }
}

export function getBookmarks(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleBookmark(blogId: string): string[] {
  const current = getBookmarks();
  let updated: string[];
  if (current.includes(blogId)) {
    updated = current.filter(id => id !== blogId);
  } else {
    updated = [...current, blogId];
  }
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
  return updated;
}

export function resetAllDataToDefault(): void {
  localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(BLOG_POSTS));
  localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(TEAM_MEMBERS));
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_PROJECT_SETTINGS));
  localStorage.removeItem(STORAGE_KEYS.BOOKMARKS);
}

export function exportBackupData(): string {
  const data = {
    exportDate: new Date().toISOString(),
    version: "2.0.0",
    settings: getStoredSettings(),
    team: getStoredTeam(),
    blogs: getStoredBlogs()
  };
  return JSON.stringify(data, null, 2);
}

export function importBackupData(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.blogs && Array.isArray(parsed.blogs)) {
      saveStoredBlogs(parsed.blogs);
    }
    if (parsed.team && Array.isArray(parsed.team)) {
      saveStoredTeam(parsed.team);
    }
    if (parsed.settings) {
      saveStoredSettings(parsed.settings);
    }
    return true;
  } catch (e) {
    console.error("Failed to import JSON data:", e);
    return false;
  }
}

// Convenient aliases for clean App.tsx imports
export const loadBlogs = getStoredBlogs;
export const saveBlogs = saveStoredBlogs;
export const loadTeam = getStoredTeam;
export const saveTeam = saveStoredTeam;
export const loadSettings = getStoredSettings;
export const saveSettings = saveStoredSettings;
export const loadBookmarks = getBookmarks;
export const saveBookmarks = (b: string[]) => {
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(b));
};
export const toggleBookmarkItem = toggleBookmark;

export function generateDailySecurityReport(settings: ProjectSettings): string {
  const now = new Date();
  const report = {
    reportTitle: "24-HOUR FORENSIC ATTACK FORECAST & OBSERVABILITY AUDIT",
    generatedAt: now.toISOString(),
    systemName: settings.projectName,
    teamSignature: settings.teamName,
    systemStatus: settings.systemStatus,
    cryptographicVerification: {
      algorithm: "SHA-256 (Air-Gapped Local Signature)",
      hash: "8f7e2c91b4a09e8d3c12f45aa6781290bb345ef01a98234cde7890abcdef1234",
      chainOfCustodyStandard: "ISO/IEC 27037:2012 Certified"
    },
    summaryTelemetry: {
      packetsMonitoredLast24Hr: 4892014,
      flowsReassembled: 298412,
      forecastedIncidents: 14,
      preventedEscalations: 12,
      mitreTacticsObserved: [
        { tactic: "TA0043 Reconnaissance", count: 8, avgConfidence: "93.4%" },
        { tactic: "TA0001 Initial Access", count: 4, avgConfidence: "89.1%" },
        { tactic: "TA0008 Lateral Movement", count: 2, avgConfidence: "84.7%" }
      ],
      storageSavings: {
        rawPcapTotalSizeEstimate: "24.6 GB",
        compactFeatureDbSize: "184 MB",
        percentageSaved: "92.5%",
        storageTierAllocation: "Level 1 Ring Buffer (Auto-purged) + Level 2 Parquet"
      }
    },
    topObservedThreatIndicators: [
      { feature: "SYN Flag Ratio > 0.80", triggerCount: 194, correlation: "Port Scanning / DoS" },
      { feature: "Mean IAT Jitter Anomaly", triggerCount: 43, correlation: "Malleable C2 Beacon" },
      { feature: "Down/Up Ratio Inversion", triggerCount: 18, correlation: "Suspected Staging / Exfiltration" }
    ],
    humanInTheLoopActions: [
      { time: "04:12:00 UTC", action: "Dynamic CIDR Rate-Limit applied on 192.168.1.0/24", status: "CONFIRMED" },
      { time: "11:45:22 UTC", action: "Risk-Adaptive Level 1 PCAP Buffer Locked", status: "EXECUTED" },
      { time: "18:30:15 UTC", action: "MFA challenge triggered on PAM SSH cluster", status: "RESOLVED" }
    ],
    disclaimer: settings.demoDisclaimer
  };

  return JSON.stringify(report, null, 2);
}
