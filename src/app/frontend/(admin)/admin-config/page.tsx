'use client';


import { FormField } from '@/components/admin-config/FormField';
import { HeaderBar } from '@/components/admin-config/HeaderBar';
import { LivePreview } from '@/components/admin-config/LivePreview';
import { useSidebar } from '@/components/layout/SidebarContext';
import { defaultConfig } from '@/config/opura-config';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const { activeSection } = useSidebar();
  const [config] = useState(defaultConfig);
  const [formData, setFormData] = useState<Record<string, any>>({});

  // Initialize defaults once (or fetch)
  useEffect(() => {
    const defaults: Record<string, any> = {};
    config.page.sections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.type === 'object' && field.fields) {
          defaults[field.key] = {};
          field.fields.forEach((sub) => {
            defaults[field.key][sub.key] = sub.default;
          });
        } else {
          defaults[field.key] = field.default;
        }
      });
    });
    setFormData(defaults);
  }, [config]);

  const section = config.page.sections.find((s) => s.id === activeSection);

    const handleSave = async () => {
    try {
      // In a real application, you would save to an API
      console.log('Saving configuration:', formData);
      // Show success notification
      alert('Configuration saved successfully!');
    } catch (error) {
      console.error('Error saving configuration:', error);
      alert('Error saving configuration. Please try again.');
    }
  };

  const handleRollback = () => {
    // Reset to defaults
    const defaults: Record<string, any> = {};
    config.page.sections.forEach(section => {
      section.fields.forEach(field => {
        if (field.type === 'object' && field.fields) {
          defaults[field.key] = {};
          field.fields.forEach(subField => {
            defaults[field.key][subField.key] = subField.default;
          });
        } else {
          defaults[field.key] = field.default;
        }
      });
    });
    setFormData(defaults);
  };

  const handlePublish = async () => {
    try {
      // In a real application, you would publish the configuration
      console.log('Publishing configuration:', formData);
      alert('Configuration published successfully!');
    } catch (error) {
      console.error('Error publishing configuration:', error);
      alert('Error publishing configuration. Please try again.');
    }
  };

  return (
    <>
      <div className="lg:sticky lg:top-0 pb-4">
        <HeaderBar
          onSave={() => { handleSave() }}
          onRollback={() => { handleRollback() }}
          onPublish={() => { handlePublish()}}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-10">

        <div className="lg:col-span-6">
          {section && (
            <div className="rounded-lg border border-border bg-card shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-card-foreground">{section.label}</h2>
              </div>
              <hr className="mx-[3%] border-border" />
              <div className="space-y-6 p-6">
                {section.fields.map((field) => (
                  <div key={field.key}>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      {field.label}
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