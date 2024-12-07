'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { 
  BookOpen, 
  LayoutDashboard, 
  Users, 
  FileText, 
  MessageSquare, 
  Settings,
  GraduationCap,
  Calendar
} from 'lucide-react';

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const roleLinks: Record<string, SidebarLink[]> = {
    admin: [
      { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
      { href: '/admin/users', label: 'Users', icon: <Users className="h-5 w-5" /> },
      { href: '/admin/courses', label: 'Courses', icon: <BookOpen className="h-5 w-5" /> },
      { href: '/admin/reports', label: 'Reports', icon: <FileText className="h-5 w-5" /> },
      { href: '/admin/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
    ],
    instructor: [
      { href: '/instructor', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
      { href: '/instructor/courses', label: 'My Courses', icon: <BookOpen className="h-5 w-5" /> },
      { href: '/instructor/students', label: 'Students', icon: <Users className="h-5 w-5" /> },
      { href: '/instructor/schedule', label: 'Schedule', icon: <Calendar className="h-5 w-5" /> },
      { href: '/instructor/messages', label: 'Messages', icon: <MessageSquare className="h-5 w-5" /> },
    ],
    student: [
      { href: '/student', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
      { href: '/student/courses', label: 'My Courses', icon: <BookOpen className="h-5 w-5" /> },
      { href: '/student/progress', label: 'Progress', icon: <GraduationCap className="h-5 w-5" /> },
      { href: '/student/schedule', label: 'Schedule', icon: <Calendar className="h-5 w-5" /> },
      { href: '/student/messages', label: 'Messages', icon: <MessageSquare className="h-5 w-5" /> },
    ],
  };

  const links = user ? roleLinks[user.role] : [];

  return (
    <aside className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40 h-full">
      <div className="flex flex-col gap-2 p-6">
        <div className="flex h-12 items-center border-b px-4 font-semibold">
          LMS Platform
        </div>
        <nav className="grid gap-2 px-2">
          {links.map((link) => (
            <Button
              key={link.href}
              variant={pathname === link.href ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start gap-2',
                pathname === link.href && 'bg-gray-100 dark:bg-gray-800'
              )}
              asChild
            >
              <Link href={link.href}>
                {link.icon}
                {link.label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </aside>
  );
}