import { createPinia, setActivePinia } from "pinia";
import { describe, expect, it } from "vitest";
import { useWorkspaceStore } from "@/stores/workspace";
import { i18n } from "@/locales";
describe("existing product conventions", () => {
  it("retains shared Pinia state across consumers", () => {
    setActivePinia(createPinia());
    const a = useWorkspaceStore();
    a.recordVisit();
    expect(useWorkspaceStore().visits).toBe(1);
  });
  it("retains the Chinese host locale", () => {
    expect(i18n.global.t("app.title")).toBe("经营工作台");
  });
});
