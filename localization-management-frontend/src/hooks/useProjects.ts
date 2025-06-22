import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '../lib/api/projects';
import { Project } from '../types/projects';

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 5 * 60 * 1000,  
  });
}