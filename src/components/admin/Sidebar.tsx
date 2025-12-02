'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Mail,
  Calendar,
  Users,
  Settings,
  BarChart3,
  LogOut,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Services', href: '/admin/services', icon: Briefcase },
  { name: 'Projects', href: '/admin/projects', icon: FileText },
  { name: 'Inquiries', href: '/admin/inquiries', icon: Mail },
  { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <div className="flex h-full w-64 flex-col bg-dark-400 border-r border-dark-300">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-dark-300 px-6">
        <Link href="/admin" className="text-lg font-heading font-bold text-gold-gradient">
          The Elites
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-gold-100/10 text-gold-100'
                  : 'text-gray-400 hover:bg-dark-300 hover:text-white'
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className="border-t border-dark-300 p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-400 hover:text-white hover:bg-dark-300"
          onClick={handleSignOut}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
