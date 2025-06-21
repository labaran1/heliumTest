
import { TranslationKey } from "./translation";


export interface Project {
    id: string
    name: string
    description?: string;
    translationKey?:TranslationKey[]

}
  
export interface ProjectActions { 
    addProject: (project: Project) => void;
    setSelectedProject: (project: Project) => void;
    clearSelectedProject: () => void;
}


export interface ProjectStore {
    projects: Project[];
    selectedProject?: Project | null;
    actions: ProjectActions;
}
