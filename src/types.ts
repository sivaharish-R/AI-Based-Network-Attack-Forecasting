/**
 * AI-Based Network Attack Forecasting System
 * TypeScript Types & Data Models
 */

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  readTime: string;
  date: string;
  tags: string[];
  published: boolean;
  featured?: boolean;
  keyTakeaways: string[];
  tableOfContents: { id: string; title: string }[];
  codeSnippets?: { language: string; title: string; code: string }[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  isLeader: boolean;
  avatar?: string;
  bio: string;
  skills: string[];
  contributions: string[];
  linkedin?: string;
  email?: string;
  order: number;
}

export interface ProjectSettings {
  projectName: string;
  projectSubtitle: string;
  teamName: string;
  primaryTagline: string;
  secondaryTagline: string;
  demoDisclaimer: string;
  storageRetentionDays: number;
  systemStatus: 'ONLINE' | 'STANDBY' | 'ANALYZING' | 'ALERT';
  contactEmail: string;
  governanceLead?: string;
  adminPasskey?: string;
  hideAdminFromPublic?: boolean;
}

export interface ForecastTimeStep {
  step: string; // e.g., "T+1 (10s)", "T+2 (30s)", "T+3 (60s)", "T+4 (120s)", "T+5 (300s)"
  stepIndex: number;
  horizonSeconds: number;
  riskScore: number; // 0.0 to 1.0
  predictedStage: string;
  mitreTactic: string;
  techniqueId: string;
  confidence: number;
  topFeatures: {
    feature: string;
    impact: 'positive' | 'negative';
    shapValue: number;
  }[];
  recommendedAction: string;
}

export interface ForecastScenario {
  id: string;
  name: string;
  threatType: string;
  description: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  attackVector: string;
  steps: ForecastTimeStep[];
}

export interface FlowFeature {
  name: string;
  key: string;
  sampleValue: string;
  unit: string;
  category: 'Temporal' | 'Volumetric' | 'Flag' | 'Statistical';
  description: string;
  importanceRank: number;
}

export interface LivePacket {
  id: string;
  timestamp: string;
  srcIp: string;
  srcPort: number;
  dstIp: string;
  dstPort: number;
  protocol: 'TCP' | 'UDP' | 'ICMP' | 'DNS' | 'TLS';
  length: number;
  flags: string;
  riskScore: number;
  anomalyStatus: 'Normal' | 'Suspicious' | 'Threat';
  payloadSummary: string;
}

export interface MitreStageInfo {
  id: string;
  stageName: string;
  mitreTactic: string;
  tacticId: string;
  techniqueId: string;
  techniqueName: string;
  description: string;
  detectionIndicators: string[];
  recommendedPlaybook: string;
  urgency: 'Low' | 'Moderate' | 'High' | 'Immediate';
}

export interface StorageTier {
  level: number;
  name: string;
  technology: string;
  latency: string;
  retention: string;
  capacityImpact: string;
  description: string;
  features: string[];
}

export interface TechItem {
  name: string;
  category: 'Capture & Ingestion' | 'ML & AI Core' | 'Forecasting & XAI' | 'Storage & Viz';
  role: string;
  description: string;
  badge: string;
}

export interface ComparisonMetric {
  feature: string;
  traditionalIds: string;
  proposedSystem: string;
  advantage: string;
}
