import { describe, expect, it, vi } from "vitest";
import { http } from "@/services/http";
import { loadAgreements } from "@/services/agreements";
describe("assumed agreement transport", () => {
  it("uses host axios and passes filters and cancellation", async () => {
    const get = vi.spyOn(http, "get").mockResolvedValue({
      data: {
        items: [
          {
            id: "1",
            name: "合同",
            partner: "伙伴",
            status: "生效中",
            endDate: "2027-01-01",
          },
        ],
        total: 1,
      },
    });
    const signal = new AbortController().signal;
    expect(
      (
        await loadAgreements(
          { name: "合同", status: "生效中", page: 2, pageSize: 5 },
          signal,
        )
      ).total,
    ).toBe(1);
    expect(get).toHaveBeenCalledWith(expect.stringContaining("page=2"), {
      signal,
    });
    expect(decodeURIComponent(String(get.mock.calls[0]?.[0]))).toContain(
      "name=合同",
    );
  });
  it("rejects malformed responses", async () => {
    vi.spyOn(http, "get").mockResolvedValue({
      data: { items: [{ id: 1 }], total: 1 },
    });
    await expect(
      loadAgreements(
        { name: "", status: "all", page: 1, pageSize: 5 },
        new AbortController().signal,
      ),
    ).rejects.toThrow("INVALID_RESPONSE");
  });
});
