import Header from '@/components/dashboard/header';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'TravelMate',
    description: 'Explore with a Local Guide',
};

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="flex h-screen ">
                <Link href="/traveler" className="flex p-5 justify-start">
                    <h4 className="text-2xl font-semibold text-zinc-900 dark:text-white">
                        TravelMate
                    </h4>
                </Link>
                <main className="flex-1 px-4 py-4">
                    <Header />
                    {children}
                </main>
            </div>
        </>
    );
}