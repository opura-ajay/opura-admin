'use client';

import React, { createContext, useContext, useState } from 'react';

type SidebarCtx = {
  activeSection: string;
  setActiveSection: (id: string) => void;
};

const SidebarContext = createContext<SidebarCtx | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState('botSetup');
  return (
    <SidebarContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider');
  return ctx;
}
