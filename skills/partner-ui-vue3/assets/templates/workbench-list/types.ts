export const agreementStatuses = ['生效中', '待续签', '审批中', '已到期'] as const;
export type AgreementStatus = (typeof agreementStatuses)[number];
export type Agreement = {
  id: string;
  name: string;
  partner: string;
  endDate: string;
  amount: number;
  status: AgreementStatus;
};
export type CreateAgreementInput = { name: string; partner: string; endDate: string };
export type Filter = { keyword: string; status: AgreementStatus | 'all' };
export type Sort = { key: 'endDate' | 'amount'; direction: 'asc' | 'desc' } | null;
export type OperationContext = { signal: AbortSignal; idempotencyKey: string };
