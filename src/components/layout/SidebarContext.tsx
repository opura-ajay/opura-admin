'use client';

import { createContext, useContext, useMemo, useState } from 'react';

type SidebarCtx = {
  activeSection: string;
  setActiveSection: (id: string) => void;
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
};

const Ctx = createContext<SidebarCtx | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<string>('botSetup');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const value = useMemo(
    () => ({
      activeSection,
      setActiveSection,
      isSidebarOpen,
      openSidebar: () => setIsSidebarOpen(true),
      closeSidebar: () => setIsSidebarOpen(false),
      toggleSidebar: () => setIsSidebarOpen((v) => !v),
    }),
    [activeSection, isSidebarOpen]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSidebar() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider');
  return ctx;
}