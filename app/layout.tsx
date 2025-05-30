import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/theme-provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

export const metadata: Metadata = {
  title: "TravelMate",
  description: "A modern way of traveling",
};

const PLACES_API_KEY = process.env.PLACES_API_KEY;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          async
          type="text/javascript"
          src={`https://maps.googleapis.com/maps/api/js?key=${PLACES_API_KEY}&libraries=places`}
        />
      </head>
      <body suppressHydrationWarning={true}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div> {children}</div>
        </ThemeProvider>
        <Toaster />
      </body>

    </html>
  );
}
