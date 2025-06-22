import { create } from 'zustand';
import { ProjectStore,  } from "../types/projects";

// Sample projects
// const sampleProjects: Project[] = [
//     {
//       id: '1',
//       name: 'Web App',
//       description: 'Web application translations',
//     },
//     {
//       id: '2',
//       name: 'Mobile App',
//       description: 'Mobile application translations',
//     },
//     {
//       id: '3',
//       name: 'Marketing Site',
//       description: 'Marketing website translations',
//     },
//   ];


export const useProjectStore = create<ProjectStore>((set) => ({
  // projects: sampleProjects,
  selectedProject: null,
  actions: {
    // addProject: (project) =>
    //   set((state) => ({
    //     projects: [...state.projects, project],
    //   })),
    setSelectedProject: (project) =>
      set(() => ({
        selectedProject: project,
      })),
    clearSelectedProject: () =>
      set(() => ({
        selectedProject: null,
      })),
  },
}));