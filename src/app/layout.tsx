import { JobProvider } from "@/context/JobContext";
import './globals.css';
import Layout from '@/components/Layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Job App',
    description: 'Job listing and posting application'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="ja">
        <body>
            <JobProvider>
                <Layout>{children}</Layout>
            </JobProvider>
        </body>
      </html>
    );
  }
  