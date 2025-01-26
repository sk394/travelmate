'use client';
import { DashboardNav } from './dashboard-nav';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';
import { ChevronLeft, LayoutDashboard, MessageSquareDot, Plane, UserRound } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const pathname = usePathname();

  const handleToggle = () => {
    toggle();
  };
  const travelerItems = [
    {
      title: 'Posts',
      href: '/traveler/',
      icon: <LayoutDashboard className='ml-3 size-5 flex-none' />,
      label: 'My Posts'
    },
    {
      title: 'Messages',
      href: '/traveler/messages',
      icon: <MessageSquareDot className='ml-3 size-5 flex-none' />,
      label: 'messages'
    },
    {
      title: 'Places',
      href: '/traveler/places',
      icon: <Plane className='ml-3 size-5 flex-none' />,
      label: 'places'
    },
    {
      title: 'Profile',
      href: '/traveler/profile',
      icon: <UserRound className='ml-3 size-5 flex-none' />,
      label: 'profile'
    },
  ];

  const guideItems = [
    {
      title: 'Posts',
      href: '/guide',
      icon: <LayoutDashboard className='ml-3 size-5 flex-none' />,
      label: 'My Posts'
    },
    {
      title: 'Messages',
      href: '/guide/messages',
      icon: <MessageSquareDot className='ml-3 size-5 flex-none' />,
      label: 'messages'
    },
    {
      title: 'Profile',
      href: '/guide/profile',
      icon: <UserRound className='ml-3 size-5 flex-none' />,
      label: 'profile'
    },
  ];

  return (
    <aside
      className={cn(
        `relative hidden h-screen flex-none border-r bg-card transition-[width] duration-500 md:block`,
        !isMinimized ? 'w-72' : 'w-[72px]',
        className
      )}
    >
      <div className="hidden p-5 pt-10 lg:block">
        <Link
          href="/"
          className="z-20 flex items-center text-lg font-medium"
        >
          {isMinimized ? "TM" : "TRAVELMATE"} {`>`} {pathname === '/traveler' ? 'Traveler' : 'Guide'}
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
            <DashboardNav items={pathname === '/traveler' ? travelerItems : guideItems} />
          </div>
        </div>
      </div>
    </aside>
  );
}