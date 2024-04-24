import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./mmkv-storage";

export interface Player {
  id: string;
  name: string;
  gender: string;
  team: string;
  created: Date;
  amount: number;
}

export interface PlayerState {
  players: Array<Player>;
  createPlayer: (player: Player) => void;
  deletePlayer(): void;
  editPlayer(id: string): void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      players: [],
      createPlayer: (player: Player) => {
        set((state) => ({ players: [...state.players, player] }));
      },
      deletePlayer: () => {
        set({
          players: [],
        });
      },
      editPlayer: (id: string) => {},
    }),
    {
      name: "player",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
