'use client';

import { useSession } from 'next-auth/react';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AdminHeader() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-dark-300 bg-dark-500/95 backdrop-blur-sm px-6">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 bg-dark-400 border-dark-300"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-gold-100" />
        </Button>

        {/* User Info */}
        <div className="flex items-center gap-3 pl-4 border-l border-dark-300">
          <div className="text-right">
            <div className="text-sm font-medium text-white">{session?.user?.name}</div>
            <div className="text-xs text-gray-400 capitalize">{session?.user?.role}</div>
          </div>
          <div className="h-10 w-10 rounded-full bg-gold-100/10 flex items-center justify-center text-gold-100 font-medium">
            {session?.user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
