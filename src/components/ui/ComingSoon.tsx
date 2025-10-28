import React from "react";

const ComingSoon = ({ message = "Coming Soon!" }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center h-full py-24 text-center">
    <svg width="64" height="64" fill="none" viewBox="0 0 64 64" className="mb-6">
      <circle cx="32" cy="32" r="32" fill="oklch(var(--chart-1))" />
      <text x="32" y="38" textAnchor="middle" fontSize="24" fill="white" fontFamily="inherit">⏳</text>
    </svg>
    <h2 className="text-3xl font-bold text-card-foreground mb-2">{message}</h2>
    <p className="text-muted-foreground">This feature is under development. Please check back soon.</p>
  </div>
);

export default ComingSoon;
