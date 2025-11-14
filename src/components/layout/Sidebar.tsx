'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useMemo, useState, useCallback } from 'react';
import { useSidebar } from './SidebarContext';
import { ChevronLeft, Menu } from 'lucide-react';
import {
  ChevronDown,
  ChevronRight,
  Eye,
  Settings,
  Brain,
  MessageSquare,
  Database,
  Users,
  Shield,
  BarChart3,
} from 'lucide-react';
import { ConfigSection } from '@/config/admin-config';
import Image from 'next/image';

export default function Sidebar({
  sections,
  activeSection,
  onSectionChange,
  closeSdiebar,
}: {
  sections: ConfigSection[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  closeSdiebar?: () => void;
}) {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();
  const [adminOpen, setAdminOpen] = useState(true);

  const iconMap: Record<string, any> = {
    ui_branding: Eye,
    conversation_personality: Brain,
    ai_settings: MessageSquare,
    knowledge_base: Database,
    voice_speech: Users,
    guardrails: Shield,
    meta_controls: BarChart3,
  };

  const adminSubmenu = useMemo(
    () =>
      sections.filter(
        (s) =>
          [
            'ui_branding',
            'conversation_personality',
            'ai_settings',
            'knowledge_base',
            'voice_speech',
            'guardrails',
            'meta_controls',
          ].includes(s.id) && s.visible !== false,
      ),
    [sections],
  );

  const isDashboard = pathname?.startsWith('/dashboard');
  const isUsers = pathname?.startsWith('/user-management');
  const isFinance = pathname?.startsWith('/finance');
  const isAdminArea = pathname?.startsWith('/admin-config');

  // Find the currently active admin sub item label for collapsed display
  const activeAdminItem = useMemo(() => {
    if (!isAdminArea) return null;
    return adminSubmenu.find((s) => s.id === activeSection) || null;
  }, [isAdminArea, adminSubmenu, activeSection]);

  // Helper: if collapsed, expand first, then run action
  const withAutoExpand = useCallback(
    (fn: () => void) => {
      if (!isSidebarOpen) {
        toggleSidebar();
        // Defer the action slightly to allow expand transition to start
        setTimeout(fn, 0);
      } else {
        fn();
      }
    },
    [isSidebarOpen, toggleSidebar],
  );

  const goDashboard = () => {
    withAutoExpand(() => {
      if (!isDashboard) router.push('/dashboard');
      closeSdiebar?.();
    });
  };

  const toggleAdmin = () => {
    // If collapsed, expand and always open submenu
    if (!isSidebarOpen) {
      toggleSidebar();
      // Ensure admin shell is active
      if (!isAdminArea) {
        router.push('/admin-config');
      }
      // Open submenu after the expand tick
      setTimeout(() => setAdminOpen(true), 0);
      return;
    }
    // If expanded: ensure admin shell, then toggle normally
    if (!isAdminArea) {
      router.push('/admin-config');
    }
    setAdminOpen((o) => !o);
  };

  const selectConfigSection = (id: string) => {
    withAutoExpand(() => {
      // Ensure admin shell is active before selecting subsection
      if (!isAdminArea) {
        router.push('/admin-config');
        setTimeout(() => onSectionChange(id), 0);
        return;
      }
      onSectionChange(id);
    });
  };

  const goUsers = () => {
    withAutoExpand(() => {
      if (!isUsers) router.push('/user-management');
    });
  };

  const goFinance = () => {
    withAutoExpand(() => {
      if (!isFinance) router.push('/finance');
    });
  };

  // Dedicated style classes for main vs sub menu
  const mainItemBase =
    'flex items-center rounded-md px-3 py-2 text-left transition-colors w-full';
  const mainItemActive = 'bg-primary text-primary-foreground';
  const mainItemIdle =
    'text-muted-foreground hover:bg-accent hover:text-accent-foreground';

  const subItemBase =
    'flex items-center rounded-md py-2 text-left transition-colors w-full text-sm';
  const subItemActive = 'bg-primary text-primary-foreground';
  const subItemIdle =
    'text-muted-foreground hover:bg-accent hover:text-accent-foreground';

  return (
    <aside
      className={`h-full flex-shrink-0 bg-card text-card-foreground border-r border-border shadow-sm transition-all duration-300 ${
        isSidebarOpen ? 'w-68' : 'w-16'
      }`}
    >
      <div className="flex h-full flex-col p-2 overflow-y-auto">
        {/* Sidebar toggle button and brand */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center mb-2">
            <button
              onClick={toggleSidebar}
              className="rounded-md p-3 text-muted-foreground hover:text-foreground hover:bg-accent"
              title={isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
            >
              {isSidebarOpen ? (
                <ChevronLeft className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
            <div className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-border bg-card ml-3">
              <Image
                src="/images/opura-logo.png"
                alt="Opura Admin"
                fill
                sizes="32px"
                className="object-cover"
                priority
              />
            </div>
            {isSidebarOpen && (
              <span className="text-lg font-semibold ml-2">Opura Admin</span>
            )}
          </div>
        </div>

        <nav>
          <ul className="space-y-2">
            {/* Main menu group */}
            <li>
              <button
                onClick={goDashboard}
                className={`${mainItemBase} ${
                  isDashboard ? mainItemActive : mainItemIdle
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                {isSidebarOpen && (
                  <span className="ml-3 text-sm">Dashboard</span>
                )}
              </button>
            </li>

            {/* Admin Config */}
            <li>
              <button
                onClick={toggleAdmin}
                className={`${mainItemBase} ${
                  (adminOpen || isAdminArea) && isSidebarOpen
                    ? 'text-foreground bg-secondary'
                    : mainItemIdle
                } justify-between`}
                title="Admin Config"
              >
                <span className="flex items-center min-w-0">
                  <Settings className="h-4 w-4 flex-shrink-0" />
                  {isSidebarOpen ? (
                    <span className="ml-3 text-sm truncate">Admin Config</span>
                  ) : (
                    // When collapsed, show currently active admin sub item next to icon
                    isAdminArea &&
                    activeAdminItem && (
                      <span className="ml-2 text-[11px] truncate">
                        {activeAdminItem.label}
                      </span>
                    )
                  )}
                </span>
                {isSidebarOpen &&
                  (adminOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  ))}
              </button>

              {/* Sub menu: render only when expanded */}
              {isSidebarOpen && adminOpen && (
                <ul className="mt-1 space-y-1 ml-3">
                  {adminSubmenu.map((s) => {
                    const Icon = iconMap[s.id] || Settings;
                    const isActive = isAdminArea && activeSection === s.id;
                    return (
                      <li key={s.id}>
                        <button
                          onClick={() => selectConfigSection(s.id)}
                          className={`${subItemBase} ${
                            isActive ? subItemActive : subItemIdle
                          } px-3`}
                          title={s.label}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="ml-3">{s.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>

            {/* User Management */}
            <li>
              <button
                onClick={goUsers}
                className={`${mainItemBase} ${
                  isUsers ? mainItemActive : mainItemIdle
                }`}
                title="User Management"
              >
                <Users className="h-4 w-4" />
                {isSidebarOpen && (
                  <span className="ml-3 text-sm">User Management</span>
                )}
              </button>
            </li>

            {/* Finance */}
            <li>
              <button
                onClick={goFinance}
                className={`${mainItemBase} ${
                  isFinance ? mainItemActive : mainItemIdle
                }`}
                title="Finance"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                {isSidebarOpen && (
                  <span className="ml-3 text-sm">Finance</span>
                )}
              </button>
            </li>
          </ul>
        </nav>

        <div className="mt-auto flex items-center justify-center">
          {isSidebarOpen && (
            <div className="text-center text-xs text-muted-foreground">
              Opura Admin © 2025
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}