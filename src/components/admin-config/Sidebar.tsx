'use client';

import { useState } from 'react';
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
import { ConfigSection } from '@/config/opura-config';

export function Sidebar({
  sections,
  activeSection,
  onSectionChange,
}: {
  sections: ConfigSection[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}) {
  const [adminOpen, setAdminOpen] = useState(true);

  const iconMap: Record<string, any> = {
    botSetup: Settings,
    branding: Eye,
    aiSettings: Brain,
    behavior: MessageSquare,
    knowledge: Database,
    handoff: Users,
    guardrails: Shield,
    analytics: BarChart3,
  };

  const getIcon = (id: string) => {
    const Icon = iconMap[id] || Settings;
    return <Icon className="h-4 w-4" />;
  };

  const adminSubmenu = sections.filter((s) =>
    [
      'botSetup',
      'branding',
      'aiSettings',
      'behavior',
      'knowledge',
      'handoff',
      'guardrails',
      'analytics',
    ].includes(s.id)
  );

  return (
    <aside className="min-h-screen w-64 flex-shrink-0 bg-card text-card-foreground">
      <div className="flex h-full flex-col p-4">
        <div className="mb-8 flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground" />
          <span className="text-lg font-semibold">Opura Admin</span>
        </div>

        <nav>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => onSectionChange('dashboard')}
                className={`flex w-full items-center space-x-3 rounded-md px-3 py-2 text-left transition-colors ${
                  activeSection === 'dashboard'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span className="text-sm">Dashboard</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => setAdminOpen((o) => !o)}
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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
                <ul className="ml-2 mt-1 space-y-1">
                  {adminSubmenu.map((s) => {
                    const isActive = activeSection === s.id;
                    return (
                      <li key={s.id}>
                        <button
                          onClick={() => onSectionChange(s.id)}
                          className={`flex w-full items-center space-x-3 rounded-md px-3 py-2 text-left transition-colors ${
                            isActive
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                          }`}
                        >
                          {getIcon(s.id)}
                          <span className="text-sm">{s.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
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