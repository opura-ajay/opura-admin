// app/(admin)/layout.tsx or wherever your AdminLayout is
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/api';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { SidebarProvider, useSidebar } from '@/components/layout/SidebarContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchConfig } from '@/store/configSlice';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/sign-in');
    } else {
      setIsAuthenticated(true);
      // Fetch config once when admin layout mounts
      dispatch(fetchConfig('merchant_12345'));
    }
  }, [router, dispatch]);

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return (
    <SidebarProvider>
      <AdminShell>{children}</AdminShell>
    </SidebarProvider>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  const { activeSection, setActiveSection, isSidebarOpen, toggleSidebar, closeSidebar } =
    useSidebar();
  const config = useAppSelector((state) => state.config.config);

  // Helper to pass to Sidebar so selecting an item also closes the mobile drawer
  const handleSelectSection = (id: string) => {
    setActiveSection(id);
    closeSidebar();
  };

  return (
    <section className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        {config && (
          <Sidebar
            sections={config.sections}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        )}
      </div>

      {/* Mobile Drawer + Backdrop */}
      {config && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${
              isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            onClick={closeSidebar}
            aria-hidden="true"
          />

          {/* Sliding panel */}
          <div
            className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] transform bg-card text-card-foreground shadow-xl transition-transform duration-300 lg:hidden ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation drawer"
          >
            <Sidebar
              sections={config.sections}
              activeSection={activeSection}
              onSectionChange={handleSelectSection}
              closeSdiebar={closeSidebar}
            />
          </div>
        </>
      )}

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Header */}
        <div className="lg:sticky lg:top-0 z-999">
          <Header onToggleSidebar={toggleSidebar} />
        </div>

        <div className="min-h-0 flex-1 overflow-auto px-4 py-4 lg:px-6 lg:py-6">
          <div className="pt-2 lg:pt-0">{children}</div>
        </div>

        <Footer />
      </div>
    </section>
  );
}