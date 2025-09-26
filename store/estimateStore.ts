import { create } from "zustand";

interface EstimateState {
  date: string | null;
  departure: string | null;
  destination: string | null;
  moveType: string | null;
  hasActiveEstimate: boolean;
  setDate: (date: string) => void;
  setDeparture: (departure: string) => void;
  setDestination: (destination: string) => void;
  setMoveType: (type: string) => void;
  setHasActiveEstimate: (value: boolean) => void;
}

export const useEstimateStore = create<EstimateState>((set) => ({
  date: null,
  departure: null,
  destination: null,
  moveType: null,
  hasActiveEstimate: false,
  setDate: (date) => set({ date }),
  setDeparture: (departure) => set({ departure }),
  setDestination: (destination) => set({ destination }),
  setMoveType: (type) => set({ moveType: type }),
  setHasActiveEstimate: (value) => set({ hasActiveEstimate: value }),
}));
