import React from 'react';
import JobListSection from '@/components/JobListSection';

type Job = {
  id: number;
  title: string;
  salary: number;
  category: string;
};

async function fetchJobs(): Promise<Job[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    // 'http://localhost:3000';
    // process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}` ||
    const res = await fetch(`${baseUrl}/api/jobs`, {
      cache: 'no-store',
    });
    console.log(res);
    if (!res.ok) {
      throw new Error('求人データの取得に失敗しました');
    }
    return res.json();
  }
  
  export default async function HomePage() {
    const jobs = await fetchJobs();

    return (
        <JobListSection jobs={jobs} />
    );
  }  