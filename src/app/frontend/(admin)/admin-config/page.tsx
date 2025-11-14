'use client';

import { FormField } from '@/components/admin-config/FormField';
import { HeaderBar } from '@/components/admin-config/HeaderBar';
import { LivePreview } from '@/components/admin-config/LivePreview';
import { useSidebar } from '@/components/layout/SidebarContext';
import { Info } from 'lucide-react';
import { useEffect, useState } from 'react';

// shadcn/ui tooltip
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateFormField, resetFormData, publishConfig } from '@/store/configSlice';

export default function AdminPage() {
  const { activeSection } = useSidebar();
  const dispatch = useAppDispatch();
  const { config, formData, loading } = useAppSelector((state) => state.config);
  const [publishLoading, setPublishLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  const section = config?.sections.find((s) => s.id === activeSection);

  // Handle validation change from FormField
  const handleValidationChange = (key: string, hasError: boolean) => {
    setFieldErrors(prev => ({
      ...prev,
      [key]: hasError
    }));
  };

  // Check if any field has errors
  const hasErrors = Object.values(fieldErrors).some(hasError => hasError);

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
    dispatch(resetFormData());
  };

  const handlePublish = async () => {
    if (!config) return;
    
    try {
      setPublishLoading(true);
      
      // Build object with only changed values
      const changedData: Record<string, any> = {};
      
      config.sections.forEach((section) => {
        section.fields.forEach((field) => {
          if (field.type === 'object' && field.fields) {
            // Handle nested object fields
            const hasChanges = field.fields.some((subField) => {
              const currentValue = formData[field.key]?.[subField.key];
              return currentValue !== subField.current_value;
            });
            
            if (hasChanges) {
              changedData[field.key] = {};
              field.fields.forEach((subField) => {
                const currentValue = formData[field.key]?.[subField.key];
                if (currentValue !== subField.current_value) {
                  changedData[field.key][subField.key] = currentValue;
                }
              });
            }
          } else {
            // Handle regular fields
            const currentValue = formData[field.key];
            if (currentValue !== field.current_value) {
              changedData[field.key] = currentValue;
            }
          }
        });
      });

      // Only send if there are changes
      if (Object.keys(changedData).length === 0) {
        alert('No changes to publish.');
        return;
      }

      console.log('Publishing changes:', changedData);

      await dispatch(publishConfig({ 
        merchantId: 'merchant_12345', 
        changedData 
      })).unwrap();

      alert('Configuration published successfully!');
    } catch (error) {
      console.error('Error publishing configuration:', error);
      alert('Error publishing configuration. Please try again.');
    } finally {
      setPublishLoading(false);
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
          publishDisabled={hasErrors || publishLoading}
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
                      onChange={(k, v) => dispatch(updateFormField({ key: k, value: v }))}
                      formData={formData}
                      onValidationChange={handleValidationChange}
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