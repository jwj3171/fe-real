import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TabValue = "active" | "confirmed" | "expired";

type State = {
  tab: TabValue;
  setTab: (t: TabValue) => void;
  reset: () => void;
};

export const useEstimatesTabStore = create<State>()(
  persist(
    (set) => ({
      tab: "active",
      setTab: (tab) => set({ tab }),
      reset: () => set({ tab: "active" }),
    }),
    {
      name: "estimates-tab",
      getStorage: () =>
        typeof window !== "undefined" ? sessionStorage : undefined,
    },
  ),
);
