'use client';

import { FormField } from '@/components/admin-config/FormField';
import { HeaderBar } from '@/components/admin-config/HeaderBar';
import { LivePreview } from '@/components/admin-config/LivePreview';
import { useSidebar } from '@/components/layout/SidebarContext';
import { PageConfig, defaultConfig } from '@/config/admin-config';
import { Info } from 'lucide-react';
import { useEffect, useState } from 'react';

// shadcn/ui tooltip
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

export default function AdminPage() {
  const { activeSection } = useSidebar();
  const [config, setConfig] = useState<PageConfig | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    fetch('/api/config')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setConfig(data))
      .catch(() => setConfig(defaultConfig));
  }, []);

  useEffect(() => {
    const defaults: Record<string, any> = {};
    config?.sections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.type === 'object' && field.fields) {
          defaults[field.key] = {};
          field.fields.forEach((sub) => {
            defaults[field.key][sub.key] = sub.current_value;
          });
        } else {
          defaults[field.key] = field.current_value;
        }
      });
    });
    setFormData(defaults);
  }, [config]);

  const section = config?.sections.find((s) => s.id === activeSection);

  const handleSave = async () => {
    try {
      console.log('Saving configuration:', formData);
      alert('Configuration saved successfully!');
    } catch (error) {
      console.error('Error saving configuration:', error);
      alert('Error saving configuration. Please try again.');
    }
  };

  const handleRollback = () => {
    const defaults: Record<string, any> = {};
    config?.sections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.type === 'object' && field.fields) {
          defaults[field.key] = {};
          field.fields.forEach((subField) => {
            defaults[field.key][subField.key] = subField.current_value;
          });
        } else {
          defaults[field.key] = field.current_value;
        }
      });
    });
    setFormData(defaults);
  };

  const handlePublish = async () => {
    try {
      console.log('Publishing configuration:', formData);
      alert('Configuration published successfully!');
    } catch (error) {
      console.error('Error publishing configuration:', error);
      alert('Error publishing configuration. Please try again.');
    }
  };

  return (
    <>
      <div className="lg:top-0 pb-4">
        <HeaderBar
          onSave={() => {
            handleSave();
          }}
          onRollback={() => {
            handleRollback();
          }}
          onPublish={() => {
            handlePublish();
          }}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-10">
        <div className="lg:col-span-6">
          {section && (
            <div className="rounded-lg border border-border bg-card shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-card-foreground flex items-center gap-2">
                  {section.label}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex h-5 w-5 items-center justify-center rounded-md text-muted-foreground/90 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition"
                        aria-label="Section info"
                      >
                        <Info size={18} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" align="start" className="max-w-sm">
                      {section.infoText || 'No info available.'}
                    </TooltipContent>
                  </Tooltip>
                </h2>
              </div>

              <hr className="mx-[3%] border-border" />

              <div className="space-y-6 p-6">
                {section.fields.map((field) => (
                  <div key={field.key}>
                    <label className="mb-2 block text-sm font-medium text-foreground flex items-center gap-2">
                      <span className="inline-flex items-center gap-1">
                        {field.label}
                        {field.mandatory && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span
                                role="img"
                                aria-label="Required field"
                                className="inline-flex h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-red-500/20"
                              />
                            </TooltipTrigger>
                            <TooltipContent side="top" align="center">
                              Required field
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </span>

                      {(field.type === 'text' || field.type === 'textarea') && (
                        <span className="ml-1 text-xs text-muted-foreground">
                          ({(formData[field.key]?.length ?? 0)}/
                          {field.maxLength ??
                            (field.type === 'text' ? 100 : 3000)}
                          )
                        </span>
                      )}

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            className="inline-flex h-5 w-5 items-center justify-center rounded-md text-muted-foreground/90 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition"
                            aria-label="Field info"
                          >
                            <Info size={16} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" align="start" className="max-w-xs">
                          {field.infoText || 'No info available.'}
                        </TooltipContent>
                      </Tooltip>
                    </label>

                    <FormField
                      field={field}
                      value={formData[field.key]}
                      onChange={(k, v) => setFormData((p) => ({ ...p, [k]: v }))}
                      formData={formData}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4">
          <LivePreview formData={formData} />
        </div>
      </div>
    </>
  );
}