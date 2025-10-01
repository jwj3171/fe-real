import { create } from "zustand";

export type TabValue = "active" | "confirmed" | "expired";
type State = { tab: TabValue; setTab: (t: TabValue) => void };

export const useEstimatesTabStore = create<State>((set) => ({
  tab: "active",
  setTab: (tab) => set({ tab }),
}));
