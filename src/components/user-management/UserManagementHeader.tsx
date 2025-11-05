"use client";

import { Button } from "@/components/ui/button";
import { Plus, Search, User as UserIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { User } from "./types/user";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";

interface UserManagementHeaderProps {
  currentUser: User;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCreateClick: () => void;
}

export const UserManagementHeader = ({
  currentUser,
  searchQuery,
  onSearchChange,
  onCreateClick,
}: UserManagementHeaderProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="border-b bg-admin-header">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <UserIcon className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold">
                User Management
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                Manage users and permissions
              </p>
            </div>
          </div>
          {/* <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <div className="text-right">
              <p className="text-sm font-medium">{currentUser.name}</p>
              <Badge variant="outline" className="text-xs">
                {currentUser.role}
              </Badge>
            </div>
          </div> */}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={onCreateClick} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            <span className="sm:inline">Create User</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
