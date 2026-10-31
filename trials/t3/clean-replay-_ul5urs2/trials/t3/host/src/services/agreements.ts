import { getJson } from "@/services/http";
export const statuses = ["生效中", "待续签", "审批中", "已到期"] as const;
export type Agreement = {
  id: string;
  name: string;
  partner: string;
  status: (typeof statuses)[number];
  endDate: string;
};
export type Query = {
  name: string;
  status: string;
  page: number;
  pageSize: number;
};
export type Result = { items: Agreement[]; total: number };
/** Assumed read-only contract. Authentication remains with the host. */
export async function loadAgreements(
  query: Query,
  signal: AbortSignal,
): Promise<Result> {
  const params = new URLSearchParams(
    Object.entries(query).map(([key, value]) => [key, String(value)]),
  );
  const data = await getJson<unknown>(`/agreements?${params}`, { signal });
  if (!data || typeof data !== "object") throw new Error("INVALID_RESPONSE");
  const value = data as Record<string, unknown>;
  if (
    !Array.isArray(value.items) ||
    !Number.isSafeInteger(value.total) ||
    (value.total as number) < 0 ||
    !value.items.every((item: unknown) => {
      if (!item || typeof item !== "object") return false;
      const row = item as Record<string, unknown>;
      return (
        ["id", "name", "partner", "endDate"].every(
          (key) => typeof row[key] === "string",
        ) && statuses.some((status) => status === row.status)
      );
    })
  )
    throw new Error("INVALID_RESPONSE");
  return value as Result;
}
