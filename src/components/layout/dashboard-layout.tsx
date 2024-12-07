'use client';

import { useAuth } from '@/hooks/useAuth';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { redirect } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'instructor' | 'student';
}

export function DashboardLayout({ children, requiredRole }: DashboardLayoutProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    redirect('/auth/login');
  }

  if (requiredRole && user.role !== requiredRole) {
    redirect(`/dashboard/${user.role}`);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 items-start md:grid md:grid-cols-[220px_1fr]">
        <Sidebar />
        <main className="flex flex-col flex-1 gap-4 p-4 md:gap-8 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}