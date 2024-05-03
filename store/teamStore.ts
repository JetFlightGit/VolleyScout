import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./mmkv-storage";

export interface Team {
  teamId: string;
  name: string;
}

export interface TeamState {
  teams: Array<Team>;
  createTeam: (team: Team) => void;
  editTeam(team: Team): void;
  deleteTeam(teamId: string): void;
}

export const useTeamStore = create<TeamState>()(
  persist(
    (set, get) => ({
      teams: [],

      createTeam: (team: Team) => {
        set((state) => ({ teams: [...state.teams, team] }));
      },
      deleteTeam: (teamId: string) => {
        set((state) => ({
          teams: state.teams.filter((team) => team.teamId !== teamId),
        }));
      },
      editTeam: (updatedTeam: Team) => {
        set((state) => ({
          teams: state.teams.map((team) =>
            team.teamId === updatedTeam.teamId ? updatedTeam : team,
          ),
        }));
      },
    }),
    {
      name: "team",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
