export type AgreementStatus = '生效中' | '待续签' | '审批中' | '已到期';
export type AgreementType = 'dist' | 'service' | 'solution';
export type AgreementDetail = {
  updatedAt: string;
  renewalNotice: string;
  id: string;
  name: string;
  type: AgreementType;
  endDate: string;
  amount: string | number;
  partner: string;
  owner: string;
  autoRenew: boolean;
  status: AgreementStatus;
};
export type DetailFile = {
  id: string;
  name: string;
  size: number;
  status: 'ready' | 'uploading' | 'paused' | 'success' | 'error' | 'cancelled';
};
export type HistoryItem = { id: string; time: string; title: string; description?: string };
export type DetailPayload = {
  agreement: AgreementDetail;
  files: DetailFile[];
  history: HistoryItem[];
};
export type OperationContext = { signal: AbortSignal; idempotencyKey: string };
