'use client';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download } from "lucide-react";

const conversationData = [
  {
    id: "CONV-001",
    timestamp: "2024-10-24 14:32",
    userType: "First Time",
    channel: "Web",
    categories: ["Electronics", "Smartphones"],
    duration: 5.2,
    mode: "Text",
    summary: "Customer inquired about latest iPhone models, compared features with Samsung Galaxy, added iPhone 15 Pro to cart after detailed discussion about camera capabilities and battery life. Agent provided comprehensive comparison and answered questions about warranty and trade-in options.",
  },
  {
    id: "CONV-002",
    timestamp: "2024-10-24 13:15",
    userType: "Repeat",
    channel: "Mobile App",
    categories: ["Apparel"],
    duration: 3.8,
    mode: "Text",
    summary: "Regular customer looking for winter jackets. Discussed various brands, sizes, and styles. Customer particularly interested in waterproof and insulated options.",
  },
  {
    id: "CONV-003",
    timestamp: "2024-10-24 12:45",
    userType: "First Time",
    channel: "Social Media",
    categories: ["Home Decor", "Candles"],
    duration: 4.5,
    mode: "Voice",
    summary: "New customer searched for lavender scented candles in metal jars with minimalist design. Unfortunately, exact match not found in inventory. Suggested similar alternatives.",
  },
  {
    id: "CONV-004",
    timestamp: "2024-10-24 11:20",
    userType: "Repeat",
    channel: "Web",
    categories: ["Beauty", "Skincare"],
    duration: 6.1,
    mode: "Text",
    summary: "Customer looking for anti-aging serums with vitamin C. Compared multiple brands, read reviews, and added two products to cart for trial.",
  },
];

export const ConversationSummary = () => {
  const downloadCSV = () => {
    const headers = ["Conversation ID", "Timestamp", "User Type", "Channel", "Product Categories", "Chat Duration (min)", "Mode", "Summary"];
    const rows = conversationData.map(c => [
      c.id, 
      c.timestamp, 
      c.userType, 
      c.channel, 
      c.categories.join("; "), 
      c.duration, 
      c.mode, 
      `"${c.summary}"`
    ]);
    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "conversation_summary.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Conversation Summary</h3>
          <p className="text-sm text-muted-foreground mt-1">Detailed breakdown of individual conversations (max 30-day range)</p>
        </div>
        <Button onClick={downloadCSV} size="sm" variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download CSV
        </Button>
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Conversation ID</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>User Type</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Product Categories</TableHead>
              <TableHead>Chat Duration (min)</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead>Summary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conversationData.map((conversation) => (
              <TableRow key={conversation.id}>
                <TableCell className="font-medium">{conversation.id}</TableCell>
                <TableCell>{conversation.timestamp}</TableCell>
                <TableCell>{conversation.userType}</TableCell>
                <TableCell>{conversation.channel}</TableCell>
                <TableCell>{conversation.categories.join(", ")}</TableCell>
                <TableCell>{conversation.duration}</TableCell>
                <TableCell>{conversation.mode}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="link" size="sm" className="p-0 h-auto">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View Summary
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl bg-card">
                      <DialogHeader>
                        <DialogTitle>Conversation Summary - {conversation.id}</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <p className="text-sm leading-relaxed">{conversation.summary}</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
