import { defineStore } from "pinia";
export const useWorkspaceStore = defineStore("workspace", {
  state: () => ({
    visits: 0,
    agreementName: "",
    agreementStatus: "all",
    agreementPage: 1,
  }),
  actions: {
    recordVisit() {
      this.visits += 1;
    },
  },
});
