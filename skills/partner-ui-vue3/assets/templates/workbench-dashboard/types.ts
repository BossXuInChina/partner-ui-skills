import type { IntelligenceItem } from 'huawei-partner-ai-ui';
export type Metric = { id: string; label: string; value: string | number; icon: string };
export type QuickApp = { id: string; label: string; icon?: string; disabled?: boolean };
export type Todo = {
  id: number;
  kind: 'approve' | 'renew';
  type: string;
  tone: 'info' | 'warning';
  title: string;
  date: string;
};
export type Notice = { id: string; time: string; title: string; description?: string };
export type DashboardData = {
  expiringAgreements: number;
  expiryWindowDays: number;
  greeting: string;
  organization: string;
  partnerLevel: string;
  updatedAt: string;
  metrics: Metric[];
  apps: QuickApp[];
  insights: IntelligenceItem[];
  series: number[];
  rates: number[];
  todos: Todo[];
  notices: Notice[];
};
export type DashboardAction =
  | { type: 'report' | 'all-todos' | 'assistant' }
  | { type: 'process-todo'; id: number }
  | { type: 'app'; id: string }
  | { type: 'navigate'; target: string; params?: Record<string, string> };
export type OperationContext = { signal: AbortSignal; idempotencyKey: string };
