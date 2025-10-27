// 'use client';

// import {
//   MessageCircle,
//   Brain,
//   Users,
//   BarChart3,
//   LayoutDashboard,
// } from 'lucide-react';

// export default function AdminDashboardPage() {
//   return (
//     <div className="space-y-6 mb-height">
//       <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
//         <h2 className="mb-4 flex items-center text-xl font-semibold text-card-foreground">
//           <LayoutDashboard className="mr-2 h-5 w-5" />
//           Dashboard Overview
//         </h2>

//         <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
//           <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-500/10">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
//                   Total Conversations
//                 </p>
//                 <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">2,847</p>
//               </div>
//               <MessageCircle className="h-8 w-8 text-blue-500 dark:text-blue-400" />
//             </div>
//           </div>

//           <div className="rounded-lg bg-green-50 p-4 dark:bg-emerald-500/10">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-green-600 dark:text-emerald-400">
//                   Success Rate
//                 </p>
//                 <p className="text-2xl font-bold text-green-900 dark:text-emerald-300">94.2%</p>
//               </div>
//               <BarChart3 className="h-8 w-8 text-green-500 dark:text-emerald-400" />
//             </div>
//           </div>

//           <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-500/10">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
//                   Avg Response Time
//                 </p>
//                 <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-300">0.8s</p>
//               </div>
//               <Brain className="h-8 w-8 text-yellow-500 dark:text-yellow-400" />
//             </div>
//           </div>

//           <div className="rounded-lg bg-purple-50 p-4 dark:bg-violet-500/10">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-purple-600 dark:text-violet-400">
//                   Human Handoffs
//                 </p>
//                 <p className="text-2xl font-bold text-purple-900 dark:text-violet-300">156</p>
//               </div>
//               <Users className="h-8 w-8 text-purple-500 dark:text-violet-400" />
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-border pt-6">
//           <h3 className="mb-4 text-lg font-medium text-card-foreground">Recent Activity</h3>
//           <div className="space-y-3">
//             <div className="flex items-center space-x-3 rounded-lg bg-accent p-3">
//               <div className="h-2 w-2 rounded-full bg-emerald-500" />
//               <span className="text-sm text-foreground">
//                 Bot successfully handled customer inquiry about shipping
//               </span>
//               <span className="ml-auto text-xs text-muted-foreground">2 minutes ago</span>
//             </div>
//             <div className="flex items-center space-x-3 rounded-lg bg-accent p-3">
//               <div className="h-2 w-2 rounded-full bg-blue-500" />
//               <span className="text-sm text-foreground">
//                 Configuration updated: AI model changed to GPT-4 Turbo
//               </span>
//               <span className="ml-auto text-xs text-muted-foreground">15 minutes ago</span>
//             </div>
//             <div className="flex items-center space-x-3 rounded-lg bg-accent p-3">
//               <div className="h-2 w-2 rounded-full bg-yellow-500" />
//               <span className="text-sm text-foreground">
//                 Handoff initiated for complex pricing inquiry
//               </span>
//               <span className="ml-auto text-xs text-muted-foreground">1 hour ago</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import { useState } from "react";
import { FilterSidebar } from "@/components/dashboard/FilterSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConversationAnalytics } from "@/components/dashboard/ConversationAnalytics";
import { OperationalKPIs } from "@/components/dashboard/OperationalKPIs";
import { ProductDetails } from "@/components/dashboard/ProductDetails";
import { ConversationSummary } from "@/components/dashboard/ConversationSummary";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("analytics");

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <FilterSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeTab={activeTab}
      />

      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "mr-80" : "mr-0"
        }`}
      >
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text mb-2 bg-clip-text text-transparent">
                  Myra Performance Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Retailer: TechStyle Boutique
                </p>
                <p className="text-sm text-muted-foreground mt-1 italic">
                  Note: All data displayed in this dashboard represents Myra Chat
                  analytics only and does not reflect overall website analytics.
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="text-sm font-medium">{currentDate}</p>
              </div>
            </div>
          </div>

          {/* Main Content Tabs */}
          <Tabs
            defaultValue="analytics"
            className="space-y-6"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full max-w-3xl grid-cols-4">
              <TabsTrigger value="analytics">Conversation Analytics</TabsTrigger>
              <TabsTrigger value="kpis">Agent Analytics</TabsTrigger>
              <TabsTrigger value="products">Products Summary</TabsTrigger>
              <TabsTrigger value="summary">Conversation Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="analytics">
              <ConversationAnalytics />
            </TabsContent>

            <TabsContent value="kpis">
              <OperationalKPIs />
            </TabsContent>

            <TabsContent value="products">
              <ProductDetails />
            </TabsContent>

            <TabsContent value="summary">
              <ConversationSummary />
            </TabsContent>
          </Tabs>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center italic">
              Note: All data displayed in this dashboard represents Myra Chat
              analytics only and does not reflect overall website analytics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;