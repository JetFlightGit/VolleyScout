import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./mmkv-storage";

export interface Game {
  id: string;
  name: string;
}

export interface GameState {}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      games: [],
    }),
    {
      name: "game",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
