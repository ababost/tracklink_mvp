import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Header } from '@/components/header';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const urbanist = Urbanist({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-urbanist',
});

export const metadata: Metadata = {
  title: 'TrackLink',
  description: 'AI-powered DJ booking and management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${urbanist.variable} font-sans antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
