import { Project } from '../../types/projects';

export async function fetchProjects(): Promise<Project[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/projects`, {
      next: { revalidate: 60 },
    });
  
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  }