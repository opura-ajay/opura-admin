
// // export default function AdminConfigComp() {
// //     return <div>Admin Config Page</div>;
// // }

// 'use client';

// import { useEffect, useState } from 'react';
// import { defaultConfig, PageConfig } from '@/config/opura-config';
// import { Sidebar } from '@/components/admin-config/Sidebar';
// import { FormField } from '@/components/admin-config/FormField';
// import { LivePreview } from '@/components/admin-config/LivePreview';
// import { HeaderBar } from '@/components/admin-config/HeaderBar';

// export default function OpuraBotAdminConsole() {
//   const [config, setConfig] = useState<PageConfig | null>(null);
//   const [formData, setFormData] = useState<Record<string, any>>({});
//   const [activeSection, setActiveSection] = useState('botSetup');

//   // Load config (from API or local default)
//   useEffect(() => {
//     // try fetching from API; fallback to local
//     fetch('/api/opura-config')
//       .then((r) => (r.ok ? r.json() : Promise.reject()))
//       .then((data) => setConfig(data))
//       .catch(() => setConfig(defaultConfig));
//   }, []);

//   // Initialize defaults when config is ready
//   useEffect(() => {
//     if (!config) return;
//     const defaults: Record<string, any> = {};
//     config.page.sections.forEach((section) => {
//       section.fields.forEach((field) => {
//         if (field.type === 'object' && field.fields) {
//           defaults[field.key] = {};
//           field.fields.forEach((sub) => {
//             defaults[field.key][sub.key] = sub.default;
//           });
//         } else {
//           defaults[field.key] = field.default;
//         }
//       });
//     });
//     setFormData(defaults);
//   }, [config]);

//   const handleFieldChange = (key: string, value: any) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleSave = () => {
//     console.log('Saving configuration:', formData);
//     alert('Configuration saved successfully!');
//   };

//   const handleRollback = () => {
//     if (!config) return;
//     const defaults: Record<string, any> = {};
//     config.page.sections.forEach((section) => {
//       section.fields.forEach((field) => {
//         if (field.type === 'object' && field.fields) {
//           defaults[field.key] = {};
//           field.fields.forEach((sub) => {
//             defaults[field.key][sub.key] = sub.default;
//           });
//         } else {
//           defaults[field.key] = field.default;
//         }
//       });
//     });
//     setFormData(defaults);
//   };

//   const handlePublish = () => {
//     console.log('Publishing configuration:', formData);
//     alert('Configuration published successfully!');
//   };

//   const activeConfigSection = config?.page.sections.find((s) => s.id === activeSection);

//   return (
//     <div className="min-h-screen bg-background text-foreground">
//       {/* Header */}
//       <HeaderBar
//         onSave={handleSave}
//         onRollback={handleRollback}
//         onPublish={handlePublish}
//       />

//       <div className="mx-auto flex max-w-screen-2xl">
//         {/* Sidebar - collapses to top on small screens */}
//         {/* <div className="hidden lg:block">
//           {config && (
//             <Sidebar
//               sections={config.page.sections}
//               activeSection={activeSection}
//               onSectionChange={setActiveSection}
//             />
//           )}
//         </div> */}

//         {/* Mobile sidebar as a horizontal bar (simple fallback) */}
//         <div className="w-full border-b border-border bg-card px-3 py-2 lg:hidden">
//           {config && (
//             <div className="flex items-center gap-2 overflow-x-auto">
//               {config.page.sections.map((s) => (
//                 <button
//                   key={s.id}
//                   onClick={() => setActiveSection(s.id)}
//                   className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm ${
//                     activeSection === s.id
//                       ? 'bg-primary text-primary-foreground'
//                       : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
//                   }`}
//                 >
//                   {s.label}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Main content */}
//         <main className="flex-1 p-4 md:p-6">
//           <div className="grid grid-cols-1 gap-6 lg:grid-cols-10">
//             {/* Form */}
//             <div className="lg:col-span-6">
//               {activeConfigSection && (
//                 <div className="rounded-lg border border-border bg-card shadow-sm">
//                   <div className="p-6">
//                     <h2 className="text-xl font-semibold text-card-foreground">
//                       {activeConfigSection.label}
//                     </h2>
//                   </div>
//                   <hr className="mx-[3%] border-border" />
//                   <div className="space-y-6 p-6">
//                     {activeConfigSection.fields.map((field) => (
//                       <div key={field.key}>
//                         <label className="mb-2 block text-sm font-medium text-foreground">
//                           {field.label}
//                         </label>
//                         <FormField
//                           field={field}
//                           value={formData[field.key]}
//                           onChange={handleFieldChange}
//                           formData={formData}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Preview */}
//             <div className="lg:col-span-4">
//               <LivePreview formData={formData} />
//             </div>
//           </div>
//         </main>
//       </div>

//       <style jsx global>{`
//         .slider::-webkit-slider-thumb {
//           appearance: none;
//           height: 20px;
//           width: 20px;
//           border-radius: 50%;
//           background: #3b82f6;
//           cursor: pointer;
//           border: 2px solid #ffffff;
//           box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//         }
//         .slider::-moz-range-thumb {
//           height: 20px;
//           width: 20px;
//           border-radius: 50%;
//           background: #3b82f6;
//           cursor: pointer;
//           border: 2px solid #ffffff;
//           box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//         }
//       `}</style>
//     </div>
//   );
// }

'use client';


import { FormField } from '@/components/admin-config/FormField';
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

  return (
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
  );
}