import { requireAuth } from '@/lib/auth/utils';
import { Sidebar } from '@/components/admin/Sidebar';
import { AdminHeader } from '@/components/admin/Header';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();

  return (
    <div className="flex h-screen bg-dark-500">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
