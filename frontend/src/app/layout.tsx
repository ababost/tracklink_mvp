import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
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
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      </head>
      <body className={`${urbanist.variable} font-sans`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
