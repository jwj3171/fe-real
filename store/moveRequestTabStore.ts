import { create } from "zustand";
import { persist } from "zustand/middleware";

export type RequestsTab = "normal" | "direct";

type State = {
  tab: RequestsTab;
  setTab: (t: RequestsTab) => void;
  reset: () => void;
};

export const useRequestsTabStore = create<State>()(
  persist(
    (set) => ({
      tab: "normal",
      setTab: (tab) => set({ tab }),
      reset: () => set({ tab: "normal" }),
    }),
    {
      name: "requests-tab",
      getStorage: () =>
        typeof window !== "undefined" ? sessionStorage : undefined,
    },
  ),
);
