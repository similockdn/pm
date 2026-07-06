import { create } from 'zustand';
import type { Evaluation, StaffMember } from '../types';
import { evaluationSeed, staffSeed } from '../data/seed';

type AppState = {
  staff: StaffMember[];
  evaluations: Evaluation[];
  keyword: string;
  setKeyword: (keyword: string) => void;
  upsertEvaluation: (evaluation: Evaluation) => void;
};

export const useAppStore = create<AppState>((set) => ({
  staff: staffSeed,
  evaluations: evaluationSeed,
  keyword: '',
  setKeyword: (keyword) => set({ keyword }),
  upsertEvaluation: (evaluation) => set((state) => ({
    evaluations: state.evaluations.some((e) => e.id === evaluation.id)
      ? state.evaluations.map((e) => (e.id === evaluation.id ? evaluation : e))
      : [evaluation, ...state.evaluations]
  }))
}));
