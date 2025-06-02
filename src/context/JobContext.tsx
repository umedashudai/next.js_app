
'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export type Job = {
  id: number;
  title: string;
  salary: number;
  category: string;
};

type JobContextType = {
  jobs: Job[];
  fetchJobs: () => Promise<void>;
};

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const fetchJobs = useCallback(async () => {
    try {
      const res = await fetch('/api/jobs', {
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error('求人取得に失敗しました');
      }
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error('Job fetch failed:', err);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return <JobContext.Provider value={{ jobs, fetchJobs }}>{children}</JobContext.Provider>;
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobContext must be used within a JobProvider');
  }
  return context;
};
