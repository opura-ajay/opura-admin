'use client';

import { useEffect, useState } from 'react';
import { PageConfig, defaultConfig } from '@/config/opura-config';
import Footer from '@/components/layout/Footer';
import { HeaderBar } from '@/components/admin-config/HeaderBar';
import { SidebarProvider, useSidebar } from '@/components/layout/SidebarContext';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminShell>{children}</AdminShell>
    </SidebarProvider>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  const { activeSection, setActiveSection } = useSidebar();
  const [config, setConfig] = useState<PageConfig | null>(null);

  useEffect(() => {
    fetch('/api/opura-config')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setConfig(data))
      .catch(() => setConfig(defaultConfig));
  }, []);

  return (
    <section className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* Sidebar (sticky column) */}
      <div className="hidden lg:block">
        {config && (
          <Sidebar
            sections={config.page.sections}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        )}
      </div>

      {/* Mobile top nav for sections */}
      {/* <div className="lg:hidden fixed inset-x-0 top-0 z-40 border-b border-border bg-card/90 backdrop-blur">
        {config && (
          <div className="flex items-center gap-2 overflow-x-auto p-2">
            {config.page.sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm ${
                  activeSection === s.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div> */}

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
       
        {/* Header */}
        <div className="lg:sticky lg:top-0 z-30">
          <Header />
        </div>

        <div className="min-h-0 flex-1 overflow-auto px-4 py-4 lg:px-6 lg:py-6">
          {/* Add top padding on mobile to avoid overlap with the mobile nav */}
          <div className="pt-12 lg:pt-0">{children}</div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </section>
  );
}