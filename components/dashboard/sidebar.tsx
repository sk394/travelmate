'use client';
import { DashboardNav } from './dashboard-nav';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';
import { ChevronLeft, LayoutDashboard, MessageSquareDot, Plane, UserRound } from 'lucide-react';
import Link from 'next/link';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();

  const handleToggle = () => {
    toggle();
  };
 const navItems = [
    {
      title: 'Posts',
      href: '/dashboard',
      icon: <LayoutDashboard className='ml-3 size-5 flex-none' />,
      label: 'My Posts'
    },
    {
      title: 'Messages',
      href: '/dashboard/messages',
      icon: <MessageSquareDot className='ml-3 size-5 flex-none' />,
      label: 'messages'
    },
    {
      title: 'Places',
      href: '/dashboard/places',
      icon: <Plane className='ml-3 size-5 flex-none' />,
      label: 'places'
    },
    {
      title: 'Profile',
      href: '/dashboard/profile',
      icon: <UserRound className='ml-3 size-5 flex-none' />,
      label: 'profile'
    },
  ];

  return (
    <aside
      className={cn(
        `relative  hidden h-screen flex-none border-r bg-card transition-[width] duration-500 md:block`,
        !isMinimized ? 'w-72' : 'w-[72px]',
        className
      )}
    >
      <div className="hidden p-5 pt-10 lg:block">
        <Link
          href="/"
         className="z-20 flex items-center text-lg font-medium"
        >
          {isMinimized? "TM":"TRAVELMATE"}
        </Link>
      </div>
      <ChevronLeft
        className={cn(
          'absolute -right-3 top-10 z-50  cursor-pointer rounded-full border bg-background text-3xl text-foreground',
          isMinimized && 'rotate-180'
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </aside>
  );
}