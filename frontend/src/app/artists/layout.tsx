import { UserButton } from "@clerk/nextjs";
import { Sidebar } from '@/components/sidebar';

export default function ArtistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 flex justify-end">
          <UserButton afterSignOutUrl="/" />
        </div>
        {children}
      </main>
    </div>
  );
}
