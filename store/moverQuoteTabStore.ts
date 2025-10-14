import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MoverTab = "normal" | "direct";

type State = { tab: MoverTab; setTab: (t: MoverTab) => void };

export const useMoverQuoteTabStore = create<State>()(
  persist((set) => ({ tab: "normal", setTab: (tab) => set({ tab }) }), {
    name: "mover-quote-tab",
    getStorage: () =>
      typeof window !== "undefined" ? sessionStorage : undefined,
  }),
);
