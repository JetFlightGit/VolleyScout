import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./mmkv-storage";

export interface Gamedata {
  id: string;
  name: string;
}

export interface GamedataState {}

export const useGamedataStore = create<GamedataState>()(
  persist(
    (set, get) => ({
      gamedatas: [],
    }),
    {
      name: "gamedata",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
