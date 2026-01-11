import { create } from 'zustand';

export type Project = {
  _id: string;
  title: string;
  description: string;
  techStack: string;
  github: string;
  liveLink?: string;
  thumbnail?: string;
  user: {
    name: string;
  };
};

interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  searchQuery: string;
  setProjects: (projects: Project[]) => void;
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  isLoading: false,
  searchQuery: '',
  setProjects: (projects) => set({ projects }),
  setLoading: (loading) => set({ isLoading: loading }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));