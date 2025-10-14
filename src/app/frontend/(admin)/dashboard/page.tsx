// "use client"

// import {
//   MessageCircle,
//   Brain,
//   Users,
//   BarChart3,
//   LayoutDashboard,
// } from "lucide-react"

// /**
//  * Theme support notes:
//  * - Replaced fixed grays/whites with shadcn/tailwind semantic tokens:
//  *   bg-background, text-foreground, bg-card, text-card-foreground,
//  *   border-border, text-muted-foreground, bg-accent, etc.
//  * - Colorful stat cards keep their hue but adapt in dark mode using dark: variants.
//  * - Layout and spacing remain exactly the same.
//  *
//  * Ensure:
//  * - Tailwind config uses darkMode: "class"
//  * - App is wrapped with shadcn ThemeProvider (next-themes)
//  */

// export default function DashboardPage() {
//   return (
//     <div className="space-y-6 mb-height">
//       <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
//         <h2 className="mb-4 flex items-center text-xl font-semibold text-card-foreground">
//           <LayoutDashboard className="mr-2 h-5 w-5" />
//           Dashboard Overview
//         </h2>

//         {/* Stats Grid */}
//         <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
//           <div className="rounded-lg p-4 bg-blue-50 dark:bg-blue-500/10">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
//                   Total Conversations
//                 </p>
//                 <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">
//                   2,847
//                 </p>
//               </div>
//               <MessageCircle className="h-8 w-8 text-blue-500 dark:text-blue-400" />
//             </div>
//           </div>

//           <div className="rounded-lg p-4 bg-green-50 dark:bg-emerald-500/10">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-green-600 dark:text-emerald-400">
//                   Success Rate
//                 </p>
//                 <p className="text-2xl font-bold text-green-900 dark:text-emerald-300">
//                   94.2%
//                 </p>
//               </div>
//               <BarChart3 className="h-8 w-8 text-green-500 dark:text-emerald-400" />
//             </div>
//           </div>

//           <div className="rounded-lg p-4 bg-yellow-50 dark:bg-yellow-500/10">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
//                   Avg Response Time
//                 </p>
//                 <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-300">
//                   0.8s
//                 </p>
//               </div>
//               <Brain className="h-8 w-8 text-yellow-500 dark:text-yellow-400" />
//             </div>
//           </div>

//           <div className="rounded-lg p-4 bg-purple-50 dark:bg-violet-500/10">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-purple-600 dark:text-violet-400">
//                   Human Handoffs
//                 </p>
//                 <p className="text-2xl font-bold text-purple-900 dark:text-violet-300">
//                   156
//                 </p>
//               </div>
//               <Users className="h-8 w-8 text-purple-500 dark:text-violet-400" />
//             </div>
//           </div>
//         </div>

//         {/* Recent Activity */}
//         <div className="border-t border-border pt-6">
//           <h3 className="mb-4 text-lg font-medium text-card-foreground">
//             Recent Activity
//           </h3>
//           <div className="space-y-3">
//             <div className="flex items-center space-x-3 rounded-lg bg-accent p-3">
//               <div className="h-2 w-2 rounded-full bg-emerald-500" />
//               <span className="text-sm text-foreground">
//                 Bot successfully handled customer inquiry about shipping
//               </span>
//               <span className="ml-auto text-xs text-muted-foreground">
//                 2 minutes ago
//               </span>
//             </div>
//             <div className="flex items-center space-x-3 rounded-lg bg-accent p-3">
//               <div className="h-2 w-2 rounded-full bg-blue-500" />
//               <span className="text-sm text-foreground">
//                 Configuration updated: AI model changed to GPT-4 Turbo
//               </span>
//               <span className="ml-auto text-xs text-muted-foreground">
//                 15 minutes ago
//               </span>
//             </div>
//             <div className="flex items-center space-x-3 rounded-lg bg-accent p-3">
//               <div className="h-2 w-2 rounded-full bg-yellow-500" />
//               <span className="text-sm text-foreground">
//                 Handoff initiated for complex pricing inquiry
//               </span>
//               <span className="ml-auto text-xs text-muted-foreground">
//                 1 hour ago
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


'use client';

import {
  MessageCircle,
  Brain,
  Users,
  BarChart3,
  LayoutDashboard,
} from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 mb-height">
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 flex items-center text-xl font-semibold text-card-foreground">
          <LayoutDashboard className="mr-2 h-5 w-5" />
          Dashboard Overview
        </h2>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-500/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Total Conversations
                </p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">2,847</p>
              </div>
              <MessageCircle className="h-8 w-8 text-blue-500 dark:text-blue-400" />
            </div>
          </div>

          <div className="rounded-lg bg-green-50 p-4 dark:bg-emerald-500/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-emerald-400">
                  Success Rate
                </p>
                <p className="text-2xl font-bold text-green-900 dark:text-emerald-300">94.2%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-500 dark:text-emerald-400" />
            </div>
          </div>

          <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-500/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                  Avg Response Time
                </p>
                <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-300">0.8s</p>
              </div>
              <Brain className="h-8 w-8 text-yellow-500 dark:text-yellow-400" />
            </div>
          </div>

          <div className="rounded-lg bg-purple-50 p-4 dark:bg-violet-500/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-violet-400">
                  Human Handoffs
                </p>
                <p className="text-2xl font-bold text-purple-900 dark:text-violet-300">156</p>
              </div>
              <Users className="h-8 w-8 text-purple-500 dark:text-violet-400" />
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="mb-4 text-lg font-medium text-card-foreground">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 rounded-lg bg-accent p-3">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-sm text-foreground">
                Bot successfully handled customer inquiry about shipping
              </span>
              <span className="ml-auto text-xs text-muted-foreground">2 minutes ago</span>
            </div>
            <div className="flex items-center space-x-3 rounded-lg bg-accent p-3">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-sm text-foreground">
                Configuration updated: AI model changed to GPT-4 Turbo
              </span>
              <span className="ml-auto text-xs text-muted-foreground">15 minutes ago</span>
            </div>
            <div className="flex items-center space-x-3 rounded-lg bg-accent p-3">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <span className="text-sm text-foreground">
                Handoff initiated for complex pricing inquiry
              </span>
              <span className="ml-auto text-xs text-muted-foreground">1 hour ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}