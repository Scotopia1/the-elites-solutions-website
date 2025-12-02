'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Briefcase, Mail, Calendar, TrendingUp, Clock, Loader2, ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface DashboardStats {
  totalInquiries: number;
  inquiriesThisMonth: number;
  inquiriesChange: number;
  activeProjects: number;
  totalProjects: number;
  bookingsThisMonth: number;
  bookingsChange: number;
  totalUsers: number;
}

interface RecentInquiry {
  id: string;
  name: string;
  email: string;
  type: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentInquiries, setRecentInquiries] = useState<RecentInquiry[]>([]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/admin/stats');
        const data = await response.json();

        if (data.success) {
          setStats(data.data.stats);
          setRecentInquiries(data.data.recentInquiries);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-gold-100" />
      </div>
    );
  }

  const statsCards = stats
    ? [
        {
          name: 'Total Inquiries',
          value: stats.totalInquiries.toString(),
          change: `${stats.inquiriesChange > 0 ? '+' : ''}${stats.inquiriesChange}%`,
          icon: Mail,
          trend: stats.inquiriesChange > 0 ? 'up' : stats.inquiriesChange < 0 ? 'down' : 'neutral',
        },
        {
          name: 'Active Projects',
          value: stats.activeProjects.toString(),
          change: `${stats.totalProjects} total`,
          icon: Briefcase,
          trend: 'neutral',
        },
        {
          name: 'Bookings This Month',
          value: stats.bookingsThisMonth.toString(),
          change: `${stats.bookingsChange > 0 ? '+' : ''}${stats.bookingsChange}%`,
          icon: Calendar,
          trend: stats.bookingsChange > 0 ? 'up' : stats.bookingsChange < 0 ? 'down' : 'neutral',
        },
        {
          name: 'Total Users',
          value: stats.totalUsers.toString(),
          change: 'Admin accounts',
          icon: Users,
          trend: 'neutral',
        },
      ]
    : [];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat) => (
          <Card key={stat.name} className="bg-dark-400 border-dark-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-gold-100" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p
                className={`text-xs flex items-center gap-1 mt-1 ${
                  stat.trend === 'up'
                    ? 'text-green-400'
                    : stat.trend === 'down'
                    ? 'text-red-400'
                    : 'text-gray-400'
                }`}
              >
                {stat.trend === 'up' && <ArrowUpIcon className="h-3 w-3" />}
                {stat.trend === 'down' && <ArrowDownIcon className="h-3 w-3" />}
                {stat.change}
                {stat.trend !== 'neutral' && ' from last month'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <Card className="bg-dark-400 border-dark-300">
          <CardHeader>
            <CardTitle className="text-white">Recent Inquiries</CardTitle>
            <CardDescription>Latest contact form submissions</CardDescription>
          </CardHeader>
          <CardContent>
            {recentInquiries.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">No inquiries yet</p>
            ) : (
              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="flex items-start gap-4 pb-4 border-b border-dark-300 last:border-0 last:pb-0"
                  >
                    <div className="h-10 w-10 rounded-full bg-gold-100/10 flex items-center justify-center text-gold-100 font-medium flex-shrink-0">
                      {inquiry.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{inquiry.name}</p>
                      <p className="text-xs text-gray-400 truncate">{inquiry.email}</p>
                      <p className="text-xs text-gray-500 mt-1 capitalize">{inquiry.type}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(inquiry.createdAt), { addSuffix: true })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-dark-400 border-dark-300">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <a
                href="/admin/projects"
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-dark-300 hover:bg-dark-200 transition-colors group"
              >
                <Briefcase className="h-5 w-5 text-gold-100" />
                <div>
                  <div className="text-sm font-medium text-white group-hover:text-gold-100">
                    Manage Projects
                  </div>
                  <div className="text-xs text-gray-400">Create and edit portfolio items</div>
                </div>
              </a>
              <a
                href="/admin/inquiries"
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-dark-300 hover:bg-dark-200 transition-colors group"
              >
                <Mail className="h-5 w-5 text-gold-100" />
                <div>
                  <div className="text-sm font-medium text-white group-hover:text-gold-100">
                    View All Inquiries
                  </div>
                  <div className="text-xs text-gray-400">Manage contact submissions</div>
                </div>
              </a>
              <a
                href="/admin/services"
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-dark-300 hover:bg-dark-200 transition-colors group"
              >
                <TrendingUp className="h-5 w-5 text-gold-100" />
                <div>
                  <div className="text-sm font-medium text-white group-hover:text-gold-100">
                    Manage Services
                  </div>
                  <div className="text-xs text-gray-400">Edit service offerings</div>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
