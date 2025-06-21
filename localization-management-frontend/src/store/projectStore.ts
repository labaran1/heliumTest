import { create } from 'zustand';
import { ProjectStore } from "../types/projects";


export const useProjectStore = create<ProjectStore>((set) => ({
    projects: [],
    actions: {
        addProject: (project) => set((state) => ({
            projects: [...state.projects, project],
        }))
    }
}));