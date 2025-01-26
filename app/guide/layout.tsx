import FooterAll from '@/components/footer/footer-all';
import Header from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';
import type { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
    title: 'TravelMate',
    description: 'Explore with a Local Guide',
};

export default function GuideLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <main className="w-full flex-1 overflow-hidden px-4 py-4">
                    <Header />
                    {children}
                </main>
            </div>
            <div className="flex flex-col">
                <Separator />
                <FooterAll />
            </div>
        </>
    );
}