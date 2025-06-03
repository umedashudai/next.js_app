'use client';

import React, { useCallback, useEffect, useState } from 'react';
import List from './List';
import { Job } from '@/types/job';

export default function JobListSection({ jobs }: { jobs: Job[] }) {
    const [searchResults, setSearchResults] = useState<Job[]>(jobs);
  
    const handleSearch = useCallback(
      (filters: { category: string[]; salary: string }) => {
        const filtered = jobs.filter((job) => {
          const categoryMatch =
            filters.category.length > 0 ? filters.category.includes(job.category) : true;
          const salaryMatch = filters.salary
            ? parseInt(job.salary.toString()) >= parseInt(filters.salary)
            : true;
          return categoryMatch && salaryMatch;
        });
        setSearchResults(filtered);
      },
      [jobs]
    );
  
    useEffect(() => {
      setSearchResults(jobs);
    }, [jobs]);
    return (
        <div className="flex flex-col items-center p-4">
          <div className="flex w-full max-w-6xl space-x-8">
            <div className="w-1/3">
              <List onSearch={handleSearch} />
            </div>
    
            <div className="w-2/3 space-y-4">
              <h2 className="text-xl font-bold mb-2">検索一覧</h2>
              <p>該当件数：{searchResults.length}件</p>
              {searchResults.map((job) => (
                <div
                  key={job.id}
                  className="border border-gray-300 rounded-lg p-4 bg-white-50 shadow-sm"
                >
                  <p className="font-bold text-lg mb-2">{job.title}</p>
                  <p className="text-gray-700">カテゴリ: {job.category}</p>
                  <p className="text-gray-700">年収: {job.salary} 万円</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
