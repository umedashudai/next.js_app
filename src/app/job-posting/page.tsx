
'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { useJobContext } from '@/context/JobContext';

export default function JobPostingPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [salary, setSalary] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!title || !salary || !category) {
      alert('全ての項目を入力してください。');
      setIsSubmitting(false);
      return;
    }
    if (isNaN(Number(salary))) {
      alert('年収は半角数字を入力してください。');
      setIsSubmitting(false);
      return;
    }
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
      const res = await fetch(`${baseUrl}/api/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // axios.defaults.withCredentials と同じ効果
        body: JSON.stringify({
            job: { title, salary: Number(salary), category },
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        // throw new Error(JSON.stringify(errorData.errors || errorData));
        throw new Error(errorData.error || '求人投稿に失敗しました');
      }
    //   await fetchJobs();
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof Error)
        alert(error.message);
      else
        alert('予期しないエラーが発生しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">求人投稿</h2>

      <div>
        <p className="text-lg mb-1">求人カテゴリ選択</p>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="py-2 px-4 border-2 border-gray-300 text-lg w-full"
        >
          <option value="">カテゴリを選択</option>
          <option value="事務">事務</option>
          <option value="エンジニア">エンジニア</option>
          <option value="営業">営業</option>
          <option value="デザイン">デザイン</option>
          <option value="マーケティング">マーケティング</option>
          <option value="財務・経理">財務・経理</option>
          <option value="人事">人事</option>
          <option value="カスタマーサポート">カスタマーサポート</option>
          <option value="製造">製造</option>
          <option value="医療・介護">医療・介護</option>
        </select>
      </div>

      <div>
        <p className="text-lg mb-1">年収（万円）</p>
        <input
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="py-2 px-4 border-2 border-gray-300 text-lg w-full"
        />
      </div>

      <div>
        <p className="text-lg mb-1">求人タイトル</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="py-2 px-4 border-2 border-gray-300 text-lg w-full"
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-6 rounded hover:bg-blue-600 transition"
        >
          投稿
        </button>
      </div>
    </form>
  );
}
