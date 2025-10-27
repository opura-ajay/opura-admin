'use client';
import { Clock, Star, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MetricCard } from "./MetricCard";

const agentData = [
  { agent: "Recommendation", percentage: 22, count: 4840 },
  { agent: "Compare", percentage: 18, count: 3962 },
  { agent: "Image", percentage: 12, count: 2640 },
  { agent: "Cosmos", percentage: 10, count: 2200 },
  { agent: "Deep Reviews", percentage: 9, count: 1980 },
  { agent: "Support", percentage: 8, count: 1760 },
  { agent: "Trend Radar", percentage: 7, count: 1540 },
  { agent: "Green Mode", percentage: 5, count: 1100 },
  { agent: "Gift Suggester", percentage: 4, count: 880 },
  { agent: "Try-on", percentage: 3, count: 660 },
  { agent: "Occasion", percentage: 1, count: 220 },
  { agent: "Deals", percentage: 1, count: 220 },
];

const getAgentColor = (index: number) => {
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];
  return colors[index % colors.length];
};

export const OperationalKPIs = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Average Session Duration"
          value="4.2 min"
          icon={Clock}
          subtitle="All Agents"
        />
        <MetricCard
          title="Chat Satisfaction Score"
          value="4.6/5"
          icon={Star}
        />
        <MetricCard
          title="Average Messages per Conversation"
          value="8.3"
          icon={MessageCircle}
        />
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Agents Used</h3>
          <p className="text-sm text-muted-foreground mt-1">Frequency of AI agent usage across all conversations</p>
        </div>
        <div className="space-y-3">
          {agentData.map((agent, index) => (
            <div key={agent.agent} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{agent.agent}</span>
                <span className="text-muted-foreground">
                  {agent.count.toLocaleString()} ({agent.percentage}%)
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${agent.percentage}%`,
                    backgroundColor: getAgentColor(index),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
