// // 'use client'

// // import { 
// //   ChevronDown,
// //   ChevronRight,
// //   Eye,
// //   Settings,
// //   Bot,
// //   Brain,
// //   MessageSquare,
// //   Database,
// //   Users,
// //   Shield,
// //   BarChart3,
// // } from 'lucide-react';

// // import { useState } from 'react';

// // // Type definitions from the JSON config
// // interface ConfigField {
// //   key: string;
// //   label: string;
// //   type: 'text' | 'textarea' | 'dropdown' | 'color' | 'toggle' | 'number' | 'object' | 'slider';
// //   options?: string[];
// //   default?: any;
// //   min?: number;
// //   max?: number;
// //   step?: number;
// //   fields?: ConfigField[];
// //   visibleIf?: Record<string, any>;
// // }

// // interface ConfigSection {
// //   id: string;
// //   label: string;
// //   visible: boolean;
// //   fields: ConfigField[];
// // }

// // const Sidebar = ({
// //   sections,
// //   activeSection,
// //   onSectionChange
// // }: {
// //   sections: ConfigSection[];
// //   activeSection: string;
// //   onSectionChange: (sectionId: string) => void;
// // }) => {
// //   const [adminOpen, setAdminOpen] = useState(true);
// //   const getSectionIcon = (sectionId: string) => {
// //     const iconMap: Record<string, any> = {
// //       botSetup: Settings,
// //       branding: Eye,
// //       aiSettings: Brain,
// //       behavior: MessageSquare,
// //       knowledge: Database,
// //       handoff: Users,
// //       guardrails: Shield,
// //       analytics: BarChart3
// //     };

// //     const IconComponent = iconMap[sectionId] || Settings;
// //     return <IconComponent className="w-4 h-4" />;
// //   };

// //    // Build submenu from provided sections (exclude dashboard/adminConfig)
// //   const adminSubmenu = sections.filter((s) =>
// //     ['botSetup', 'branding', 'aiSettings', 'behavior', 'knowledge', 'handoff', 'guardrails', 'analytics'].includes(s.id)
// //   );

// //   return (
// //     <aside className="w-64 bg-slate-700 text-white flex-shrink-0 min-h-screen">
// //       <div className="p-4">
// //         <div className="flex items-center space-x-3 mb-8">
// //           <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
// //             {/* <Bot className="w-5 h-5 text-white" /> */}
// //           </div>
// //           <span className="text-lg font-semibold">Opura Admin</span>
// //         </div>

// //         <nav>
// //           <ul className="space-y-1">
// //             {/* Dashboard (top-level) */}
// //             <li>
// //               <button
// //                 onClick={() => onSectionChange('dashboard')}
// //                 className={`
// //                   w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors
// //                   ${activeSection === 'dashboard'
// //                     ? 'bg-blue-600 text-white'
// //                     : 'text-gray-300 hover:bg-slate-600 hover:text-white'}
// //                 `}
// //               >
// //                 <BarChart3 className="w-4 h-4" />
// //                 <span className="text-sm">Dashboard</span>
// //               </button>
// //             </li>

// //             {/* Admin Config (top-level with submenu) */}
// //             <li>
// //               <button
// //                 onClick={() => setAdminOpen((o) => !o)}
// //                 className="w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-colors text-gray-300 hover:bg-slate-600 hover:text-white"
// //               >
// //                 <span className="flex items-center space-x-3">
// //                   <Settings className="w-4 h-4" />
// //                   <span className="text-sm">Admin Config</span>
// //                 </span>
// //                 {adminOpen ? (
// //                   <ChevronDown className="w-4 h-4" />
// //                 ) : (
// //                   <ChevronRight className="w-4 h-4" />
// //                 )}
// //               </button>
// //               {adminOpen && (
// //                 <ul className="mt-1 ml-2 space-y-1">
// //                   {adminSubmenu.map((section) => {
// //                     const IconComponent = getSectionIcon(section.id);
// //                     const isActive = activeSection === section.id;
// //                     return (
// //                       <li key={section.id}>
// //                         <button
// //                           onClick={() => onSectionChange(section.id)}
// //                           className={`
// //                             w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors
// //                             ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-slate-600 hover:text-white'}
// //                           `}
// //                         >
// //                           {IconComponent}
// //                           <span className="text-sm">{section.label}</span>
// //                         </button>
// //                       </li>
// //                     );
// //                   })}
// //                 </ul>
// //               )}
// //             </li>
// //           </ul>
// //         </nav>

// //         <div className="absolute bottom-4 left-4 text-xs text-gray-400">
// //           Opure Admin © 2025
// //         </div>
// //       </div>
// //     </aside>
// //   );
// // };

// // export default Sidebar;

// 'use client'

// import {
//     ChevronDown,
//     ChevronRight,
//     Eye,
//     Settings,
//     Brain,
//     MessageSquare,
//     Database,
//     Users,
//     Shield,
//     BarChart3,
// } from 'lucide-react'
// import { useState } from 'react'

// /**
//  * Theme support notes:
//  * - Uses shadcn/tailwind semantic tokens: bg-background, text-foreground, border-border,
//  *   bg-card, text-muted-foreground, accent, primary, ring, etc.
//  * - Ensure Tailwind has darkMode: "class" and the app is wrapped with shadcn ThemeProvider.
//  * - Layout unchanged; only colors swapped to theme-aware tokens.
//  */

// interface ConfigField {
//     key: string
//     label: string
//     type:
//     | 'text'
//     | 'textarea'
//     | 'dropdown'
//     | 'color'
//     | 'toggle'
//     | 'number'
//     | 'object'
//     | 'slider'
//     options?: string[]
//     default?: any
//     min?: number
//     max?: number
//     step?: number
//     fields?: ConfigField[]
//     visibleIf?: Record<string, any>
// }

// interface ConfigSection {
//     id: string
//     label: string
//     visible: boolean
//     fields: ConfigField[]
// }

// const Sidebar = ({
//     sections,
//     activeSection,
//     onSectionChange,
// }: {
//     sections: ConfigSection[]
//     activeSection: string
//     onSectionChange: (sectionId: string) => void
// }) => {
//     const [adminOpen, setAdminOpen] = useState(true)

//     const getSectionIcon = (sectionId: string) => {
//         const iconMap: Record<string, any> = {
//             botSetup: Settings,
//             branding: Eye,
//             aiSettings: Brain,
//             behavior: MessageSquare,
//             knowledge: Database,
//             handoff: Users,
//             guardrails: Shield,
//             analytics: BarChart3,
//         }
//         const IconComponent = iconMap[sectionId] || Settings
//         return <IconComponent className="h-4 w-4" />
//     }

//     // Build submenu from provided sections (exclude dashboard/adminConfig)
//     const adminSubmenu = sections.filter((s) =>
//         [
//             'botSetup',
//             'branding',
//             'aiSettings',
//             'behavior',
//             'knowledge',
//             'handoff',
//             'guardrails',
//             'analytics',
//         ].includes(s.id)
//     )

//     return (
//         <aside className="min-h-screen w-64 flex-shrink-0 bg-card text-card-foreground">
//             <div className="relative flex h-screen flex-col p-4">
//                 <div className="mb-8 flex items-center space-x-3">
//                     <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
//                         {/* Optionally place an icon here */}
//                         {/* <Bot className="h-5 w-5" /> */}
//                     </div>
//                     <span className="text-lg font-semibold">Opura Admin</span>
//                 </div>

//                 <nav>
//                     <ul className="space-y-1">
//                         {/* Dashboard (top-level) */}
//                         <li>
//                             <button
//                                 onClick={() => onSectionChange('dashboard')}
//                                 className={`w-full rounded-md px-3 py-2 text-left transition-colors
//                   flex items-center space-x-3
//                   ${activeSection === 'dashboard'
//                                         ? 'bg-primary text-primary-foreground'
//                                         : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
//                                     }`}
//                             >
//                                 <BarChart3 className="h-4 w-4" />
//                                 <span className="text-sm">Dashboard</span>
//                             </button>
//                         </li>

//                         {/* Admin Config (top-level with submenu) */}
//                         <li>
//                             <button
//                                 onClick={() => setAdminOpen((o) => !o)}
//                                 className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
//                             >
//                                 <span className="flex items-center space-x-3">
//                                     <Settings className="h-4 w-4" />
//                                     <span className="text-sm">Admin Config</span>
//                                 </span>
//                                 {adminOpen ? (
//                                     <ChevronDown className="h-4 w-4" />
//                                 ) : (
//                                     <ChevronRight className="h-4 w-4" />
//                                 )}
//                             </button>

//                             {adminOpen && (
//                                 <ul className="ml-2 mt-1 space-y-1">
//                                     {adminSubmenu.map((section) => {
//                                         const IconComponent = getSectionIcon(section.id)
//                                         const isActive = activeSection === section.id
//                                         return (
//                                             <li key={section.id}>
//                                                 <button
//                                                     onClick={() => onSectionChange(section.id)}
//                                                     className={`w-full rounded-md px-3 py-2 text-left transition-colors
//                             flex items-center space-x-3
//                             ${isActive
//                                                             ? 'bg-primary text-primary-foreground'
//                                                             : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
//                                                         }`}
//                                                 >
//                                                     {IconComponent}
//                                                     <span className="text-sm">{section.label}</span>
//                                                 </button>
//                                             </li>
//                                         )
//                                     })}
//                                 </ul>
//                             )}
//                         </li>
//                     </ul>
//                 </nav>

//                 {/* Push footer to the bottom and center it */}
//                 <div className="mt-auto flex items-center justify-center">
//                     <div
//                         className="text-center text-xs text-muted-foreground"
//                         aria-label="Opura Admin 2025 footer"
//                     >
//                         Opura Admin © 2025
//                     </div>
//                 </div>
//             </div>
//         </aside>
//     )
// }

// export default Sidebar


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
import { ConfigSection } from '@/config/opura-config';
import Image from 'next/image';

export default function Sidebar({
    sections,
    activeSection,
    onSectionChange,
}: {
    sections: ConfigSection[];
    activeSection: string;
    onSectionChange: (sectionId: string) => void;
}) {
    const router = useRouter();
    const pathname = usePathname();
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

    const adminSubmenu = useMemo(
        () =>
            sections.filter((s) =>
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
            ),
        [sections]
    );

    const isDashboardRoute = pathname?.startsWith('/dashboard');

    const goDashboard = () => {
        if (!isDashboardRoute) router.push('/dashboard');
    };

    const openAdminConfig = () => {
        // If user is on dashboard, go back to admin config root
        if (isDashboardRoute) {
            router.push('/admin-config');
        }
        setAdminOpen((o) => !o);
    };

    const selectConfigSection = (id: string) => {
        // If currently on dashboard, navigate to /admin first so the page with the shell renders
        if (isDashboardRoute) {
            router.push('/admin-config');
            // Small timeout to allow route transition before setting section;
            // avoids a race where the shell isn't mounted yet.
            setTimeout(() => onSectionChange(id), 0);
            return;
        }
        onSectionChange(id);
    };

    return (
        <aside className="min-h-screen w-64 flex-shrink-0 bg-card text-card-foreground">
            <div className="flex h-screen flex-col p-4">


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
                                className={`flex w-full items-center space-x-3 rounded-md px-3 py-2 text-left transition-colors ${isDashboardRoute
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                    }`}
                            >
                                <BarChart3 className="h-4 w-4" />
                                <span className="text-sm">Dashboard</span>
                            </button>
                        </li>

                        {/* Admin Config */}
                        <li>
                            <button
                                onClick={openAdminConfig}
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
                                        const Icon = iconMap[s.id] || Settings;
                                        const isActive = !isDashboardRoute && activeSection === s.id;
                                        return (
                                            <li key={s.id}>
                                                <button
                                                    onClick={() => selectConfigSection(s.id)}
                                                    className={`flex w-full items-center space-x-3 rounded-md px-3 py-2 text-left transition-colors ${isActive
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