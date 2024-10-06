"use client";

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';
import {
    HiOutlineMoon,
    HiOutlineSun,
    HiOutlineArrowRightOnRectangle
} from 'react-icons/hi2';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function Header() {
    const supabase = createClientComponentClient<Database>();
    const { theme, setTheme } = useTheme();
    const router = useRouter();

    const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        supabase.auth.signOut();
        router.push('/');
    };

    return (
        <header className="flex flex-col-reverse  top-0 w-full">
            <nav className="flex items-center justify-between px-4 py-2 md:justify-end">
                <div className={cn('block lg:!hidden')}>
                    {/* <MobileSidebar /> */}
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={(e) => handleSignOut(e)}
                        variant="outline"
                        className="flex h-9 min-w-9 cursor-pointer rounded-full border-zinc-200 p-0 text-xl text-zinc-950 dark:border-zinc-800 dark:text-white md:min-h-10 md:min-w-10"
                    >
                        <HiOutlineArrowRightOnRectangle className="h-4 w-4 stroke-2 text-zinc-950 dark:text-white" />
                    </Button>
                    <Button
                        variant="outline"
                        className="flex h-9 min-w-9 cursor-pointer rounded-full border-zinc-200 p-0 text-xl text-zinc-950 dark:border-zinc-800 dark:text-white md:min-h-10 md:min-w-10"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    >
                        {theme === 'light' ? (
                            <HiOutlineMoon className="h-4 w-4 stroke-2" />
                        ) : (
                            <HiOutlineSun className="h-5 w-5 stroke-2" />
                        )}
                    </Button>
                </div>
            </nav>
        </header>
    );
}