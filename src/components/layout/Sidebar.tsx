'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
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
      sections.filter((s) =>
        [
          'ui_branding',
          'conversation_personality',
          'ai_settings',
          'knowledge_base',
          'voice_speech',
          'guardrails',
          'meta_controls',
        ].includes(s.id),
      ),
    [sections],
  );

  const isDashboard = pathname?.startsWith('/dashboard');
  const isUsers = pathname?.startsWith('/user-management');
  const isFinance = pathname?.startsWith('/finance');
  const isAdminArea = pathname?.startsWith('/admin-config');

  const goDashboard = () => {
    if (!isDashboard) router.push('/dashboard');
    closeSdiebar?.();
  };

  const toggleAdmin = () => {
    // If user is on dashboard, open the admin shell first
    if (isDashboard) {
      router.push('/admin-config');
    }
    setAdminOpen((o) => !o);
  };

  const selectConfigSection = (id: string) => {
    // Ensure admin shell is active before selecting subsection
    if (!isAdminArea) {
      router.push('/admin-config');
      setTimeout(() => onSectionChange(id), 0);
      return;
    }
    onSectionChange(id);
  };

  return (
    <aside className="h-full w-68 flex-shrink-0 bg-card text-card-foreground border-r border-border shadow-sm">
      <div className="flex h-full flex-col p-4 overflow-y-auto">
        <div className="mb-8 flex items-center space-x-3">
          <div className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-border bg-card">
            <Image
              src="/images/opura-logo.png"
              alt="Opura Admin"
              fill
              sizes="32px"
              className="object-cover"
              priority
            />
          </div>
          <span className="text-lg font-semibold">Opura Admin</span>
        </div>

        <nav>
          <ul className="space-y-1">
            {/* Dashboard */}
            <li>
              <button
                onClick={goDashboard}
                className={`flex w-full items-center space-x-3 rounded-md px-3 py-2 text-left transition-colors ${
                  isDashboard
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span className="text-sm">Dashboard</span>
              </button>
            </li>

            {/* Admin Config (parent shows open state, not selected) */}
            <li>
              <button
                onClick={toggleAdmin}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition-colors
                  ${
                    adminOpen || isAdminArea
                      ? 'text-foreground bg-secondary'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
              >
                <span className="flex items-center space-x-3">
                  <Settings className="h-4 w-4" />
                  <span className="text-sm">Admin Config</span>
                </span>
                {adminOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>

              {adminOpen && (
                <ul className="ml-3 mt-1 space-y-1">
                  {adminSubmenu.map((s) => {
                    const Icon = iconMap[s.id] || Settings;
                    const isActive = isAdminArea && activeSection === s.id;
                    return (
                      <li key={s.id}>
                        <button
                          onClick={() => selectConfigSection(s.id)}
                          className={`flex w-full items-center space-x-3 rounded-md px-3 py-2 text-left transition-colors ${
                            isActive
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="text-sm">{s.label}</span>
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
                onClick={() => router.push('/user-management')}
                className={`flex w-full items-center space-x-3 rounded-md px-3 py-2 text-left transition-colors ${
                  isUsers
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <Users className="h-4 w-4" />
                <span className="text-sm">User Management</span>
              </button>
            </li>

            {/* Finance */}
            <li>
              <button
                onClick={() => router.push('/finance')}
                className={`flex w-full items-center space-x-3 rounded-md px-3 py-2 text-left transition-colors ${
                  isFinance
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
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
                <span className="text-sm">Finance</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="mt-auto flex items-center justify-center">
          <div className="text-center text-xs text-muted-foreground">
            Opura Admin © 2025
          </div>
        </div>
      </div>
    </aside>
  );
}