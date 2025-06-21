
import { TranslationKey } from "./translation";


export interface Project {
    id: string
    name: string
    description?: string;
    translationKey?:TranslationKey[]

}
  
export interface ProjectActions { 
    addProject: (project: Project) => void;
}


export interface ProjectStore {
    projects: Project[];
    actions: ProjectActions;
}
