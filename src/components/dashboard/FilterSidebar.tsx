'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeTab: string;
}

export const FilterSidebar = ({ isOpen, onToggle, activeTab }: FilterSidebarProps) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const [startDate, setStartDate] = useState<Date>(thirtyDaysAgo);
  const [endDate, setEndDate] = useState<Date>(new Date());

  const handleStartDateChange = (date: Date | undefined) => {
    if (date) {
      setStartDate(date);
      if (activeTab === "products" || activeTab === "summary") {
        const maxEndDate = new Date(date);
        maxEndDate.setDate(maxEndDate.getDate() + 30);
        if (endDate > maxEndDate) {
          setEndDate(maxEndDate);
        }
      }
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    if (date) {
      if (activeTab === "products" || activeTab === "summary") {
        const maxEndDate = new Date(startDate);
        maxEndDate.setDate(maxEndDate.getDate() + 30);
        if (date > maxEndDate) {
          setEndDate(maxEndDate);
        } else {
          setEndDate(date);
        }
      } else {
        setEndDate(date);
      }
    }
  };

  const agents = [
    "All",
    "Recommendation agent",
    "Compare agent",
    "Image agent",
    "Cosmos agent",
    "Deep reviews agent",
    "Support agent",
    "Trend radar agent",
    "Green mode agent",
    "Gift suggester agent",
    "Try-on agent",
    "Occasion agent",
    "Deals agent"
  ];

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="fixed right-4 top-24 z-50 bg-card hover:bg-indigo-700 transition-all"
      >
        {isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      <div
        className={cn(
          "fixed right-0 top-0 h-full bg-card border-l border-border shadow-xl transition-all duration-300 z-40 overflow-y-auto",
          isOpen ? "w-80 translate-x-0" : "w-0 translate-x-full"
        )}
      >
        <div className="p-6 pt-25 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Filters
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-popover z-50">
                  <Calendar mode="single" selected={startDate} onSelect={handleStartDateChange} />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-popover z-50">
                  <Calendar 
                    mode="single" 
                    selected={endDate} 
                    onSelect={handleEndDateChange}
                    disabled={(activeTab === "products" || activeTab === "summary") ? (date) => {
                      const maxDate = new Date(startDate);
                      maxDate.setDate(maxDate.getDate() + 30);
                      return date < startDate || date > maxDate;
                    } : undefined}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {activeTab !== "products" && activeTab !== "summary" && (
              <div>
                <Label className="text-sm font-medium mb-2 block">User Type</Label>
                <Select defaultValue="all">
                  <SelectTrigger  className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="first-time">First Time User</SelectItem>
                    <SelectItem value="repeat">Repeat User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {activeTab !== "products" && activeTab !== "summary" && (
              <div>
                <Label className="text-sm font-medium mb-2 block">Channel Source</Label>
                <Select defaultValue="all">
                  <SelectTrigger  className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="web">Web</SelectItem>
                    <SelectItem value="mobile">Mobile App</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {activeTab === "analytics" && (
              <div>
                <Label className="text-sm font-medium mb-2 block">Agent Filter</Label>
                <Select defaultValue="All">
                  <SelectTrigger  className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50 max-h-[300px]">
                    {agents.map((agent) => (
                      <SelectItem key={agent} value={agent}>
                        {agent}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {activeTab !== "products" && activeTab !== "summary" && (
              <div>
                <Label className="text-sm font-medium mb-2 block">Device Type</Label>
                <Select defaultValue="all">
                  <SelectTrigger  className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="desktop">Desktop</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {activeTab === "analytics" && (
              <div>
                <Label className="text-sm font-medium mb-2 block">Customer Satisfaction</Label>
                <Select defaultValue="all">
                  <SelectTrigger  className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {activeTab !== "products" && activeTab !== "summary" && (
              <div>
                <Label className="text-sm font-medium mb-2 block">Mode of Conversation</Label>
                <Select defaultValue="all">
                  <SelectTrigger  className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="voice">Voice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
