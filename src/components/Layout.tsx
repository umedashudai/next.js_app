import Link from 'next/link';

import React, { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="bg-indigo-900 text-white flex items-center justify-between p-4">
        <div className="font-bold">求人検索アプリ</div>
        <div className="flex space-x-4 ml-auto">
          <div>求人検索</div>
          <div>
            <Link href="/job-posting" className="text-white">
                求人投稿
            </Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}

