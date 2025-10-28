'use client';
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
}

export const MetricCard = ({ title, value, icon: Icon, subtitle }: MetricCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border/50">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className="p-2 bg-accent-cyan rounded-xl">
          <Icon className="w-5 h-5 text-accent-cyan" />
        </div>
      </div>
    </Card>
  );
};
