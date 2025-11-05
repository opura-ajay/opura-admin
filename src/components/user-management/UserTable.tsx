'use client";';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ArrowUpDown } from "lucide-react";
import { User } from "./types/user";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface UserTableProps {
  users: User[];
  selectedUsers: Set<string>;
  onSelectUser: (userId: string) => void;
  onSelectAll: () => void;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
  onSort?: (field: string) => void;
  sortField?: string;
  sortDirection?: "asc" | "desc";
}

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "active":
      return "default";
    case "inactive":
      return "secondary";
    case "banned":
      return "destructive";
    case "pending":
      return "outline";
    case "suspended":
      return "secondary";
    default:
      return "outline";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-500 text-white";
    case "inactive":
      return "bg-gray-500 text-white";
    case "banned":
      return "bg-red-500 text-white";
    case "pending":
      return "bg-purple-500 text-white";
    case "suspended":
      return "bg-orange-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const getRoleDisplay = (role: string) => {
  switch (role) {
    case "super-admin":
      return "Admin";
    case "merchant-admin":
      return "Merchant Admin";
    default:
      return role;
  }
};

export const UserTable = ({
  users,
  selectedUsers,
  onSelectUser,
  onSelectAll,
  onEdit,
  onDelete,
  onSort,
  sortField,
  sortDirection,
}: UserTableProps) => {
  if (users.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-8 text-center">
        <p className="text-muted-foreground">No users found.</p>
      </div>
    );
  }

  const SortableHeader = ({
    field,
    children,
  }: {
    field: string;
    children: React.ReactNode;
  }) => (
    <TableHead
      className="text-white cursor-pointer hover:bg-slate-600"
      onClick={() => onSort?.(field)}
    >
      <div className="flex items-center gap-2">
        {children}
        <ArrowUpDown className="h-3 w-3" />
      </div>
    </TableHead>
  );

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block rounded-lg border bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-700 hover:bg-slate-700 border-slate-600">
              <TableHead className="w-[50px] text-white">
                <Checkbox
                  checked={
                    selectedUsers.size === users.length && users.length > 0
                  }
                  onCheckedChange={onSelectAll}
                  className="border-white"
                />
              </TableHead>
              <SortableHeader field="name">Full Name</SortableHeader>
              <SortableHeader field="email">Email</SortableHeader>
              <SortableHeader field="username">Username</SortableHeader>
              <SortableHeader field="status">Status</SortableHeader>
              <SortableHeader field="role">Role</SortableHeader>
              <SortableHeader field="createdAt">Joined Date</SortableHeader>
              <SortableHeader field="lastActive">Last Active</SortableHeader>
              <TableHead className="text-white text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="border-border">
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.has(user.id)}
                    onCheckedChange={() => onSelectUser(user.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="max-w-[200px] truncate cursor-pointer">
                          {user.email}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{user.email}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {user.username}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${getStatusColor(
                      user.status
                    )} capitalize border-0`}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {getRoleDisplay(user.role)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {user.lastActive}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit?.(user)}
                      disabled={selectedUsers.size > 0}
                      className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 disabled:opacity-50"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete?.(user)}
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-lg border bg-card p-4 space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Checkbox
                  checked={selectedUsers.has(user.id)}
                  onCheckedChange={() => onSelectUser(user.id)}
                />
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 flex-1 min-w-0">
                  <h3 className="font-medium truncate">{user.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {user.email}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    @{user.username}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit?.(user)}
                  disabled={selectedUsers.size > 0}
                  className="h-8 w-8 disabled:opacity-50"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete?.(user)}
                  className="h-8 w-8 text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground text-xs mb-1">Status</p>
                <Badge
                  className={`${getStatusColor(
                    user.status
                  )} capitalize text-xs border-0`}
                >
                  {user.status}
                </Badge>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-1">Role</p>
                <p className="font-medium">{getRoleDisplay(user.role)}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-1">Joined</p>
                <p className="font-medium text-xs">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-1">
                  Last Active
                </p>
                <p className="font-medium text-xs">{user.lastActive}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
