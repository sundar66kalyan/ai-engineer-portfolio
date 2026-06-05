'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAdminStore } from '@/store/admin';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout } = useAdminStore();

  const menuItems = [
    { label: 'Dashboard', href: '/admin', icon: '📊' },
    { label: 'Profile', href: '/admin/profile', icon: '👤' },
    { label: 'Skills', href: '/admin/skills', icon: '⚡' },
    { label: 'Projects', href: '/admin/projects', icon: '🚀' },
    { label: 'Experience', href: '/admin/experience', icon: '💼' },
    { label: 'Certifications', href: '/admin/certifications', icon: '🎓' },
    { label: 'Analytics', href: '/admin/analytics', icon: '📈' },
  ];

  return (
    <div className="flex h-screen bg-dark">
      {/* Sidebar */}
      <motion.div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-dark-secondary border-r border-accent/10 transition-all duration-300 flex flex-col`}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <div className="p-6 border-b border-accent/10">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-white font-bold">
              AI
            </div>
            {sidebarOpen && <span className="font-bold text-accent">Admin</span>}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-dark-tertiary hover:text-accent transition-all"
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-accent/10">
          <button
            onClick={() => {
              logout();
              window.location.href = '/';
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <span className="text-xl">🚪</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-dark-secondary border-b border-accent/10 px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-dark-tertiary rounded-lg transition-all"
          >
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Welcome back!</span>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-secondary" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <motion.div
            className="p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
