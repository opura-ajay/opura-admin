"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateUserData, User, UserRole } from "./types/user";
import { useToast } from "./hooks/use-toast";
import { mockTenants } from "./data/mockData";
import { Input } from "./ui/input";

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUser: User;
  onCreateUser: (userData: CreateUserData) => void;
}

export const CreateUserDialog = ({
  open,
  onOpenChange,
  currentUser,
  onCreateUser,
}: CreateUserDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<CreateUserData>({
    name: "",
    email: "",
    role: "super-admin",
    tenantId: currentUser.tenant.id,
  });

  const isSuperAdmin = currentUser.role === "super-admin";
  const availableTenants = isSuperAdmin ? mockTenants : [currentUser.tenant];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.role ||
      !formData.tenantId
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    onCreateUser(formData);
    setFormData({
      name: "",
      email: "",
      role: "super-admin",
      tenantId: currentUser.tenant.id,
    });
    onOpenChange(false);

    toast({
      title: "User Created",
      description: `${formData.name} has been successfully created.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-[hsl(var(--dialog-background))]">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription>
            Add a new user to {isSuperAdmin ? "any tenant" : "your tenant"}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value: UserRole) =>
                setFormData({ ...formData, role: value })
              }
            >
              <SelectTrigger id="role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value="merchant-admin">Merchant Admin</SelectItem>
                {isSuperAdmin && (
                  <SelectItem value="super-admin">Super Admin</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tenant">Tenant</Label>
            <Select
              value={formData.tenantId}
              onValueChange={(value) =>
                setFormData({ ...formData, tenantId: value })
              }
              disabled={!isSuperAdmin}
            >
              <SelectTrigger id="tenant">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {availableTenants.map((tenant) => (
                  <SelectItem key={tenant.id} value={tenant.id}>
                    {tenant.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!isSuperAdmin && (
              <p className="text-xs text-muted-foreground">
                You can only create users for your own tenant.
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create User</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
