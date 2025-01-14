import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';

export default function ArtistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background dark:bg-gray-900">
      <div className="flex-none border-r dark:border-gray-800">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto border-t dark:border-gray-800">
          <div className="h-full p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
