'use client";';
import { useState, useEffect } from "react";
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
import { useToast } from "./hooks/use-toast";
import { User, UserRole } from "./types/user";
import { mockTenants } from "./data/mockData";
import { Input } from "./ui/input";

interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUser: User;
  editingUser: User | null;
  onUpdateUser: (userId: string, updates: Partial<User>) => void;
}

export const EditUserDialog = ({
  open,
  onOpenChange,
  currentUser,
  editingUser,
  onUpdateUser,
}: EditUserDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    role: "merchant-admin" as UserRole,
    tenantId: "",
    status: "active" as User["status"],
  });

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name,
        email: editingUser.email,
        username: editingUser.username,
        role: editingUser.role,
        tenantId: editingUser.tenant.id,
        status: editingUser.status,
      });
    }
  }, [editingUser]);

  const isSuperAdmin = currentUser.role === "super-admin";
  const availableTenants = isSuperAdmin ? mockTenants : [currentUser.tenant];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.username ||
      !editingUser
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const tenant = mockTenants.find((t) => t.id === formData.tenantId);
    if (!tenant) return;

    onUpdateUser(editingUser.id, {
      name: formData.name,
      email: formData.email,
      username: formData.username,
      role: formData.role,
      tenant,
      status: formData.status,
    });

    onOpenChange(false);

    toast({
      title: "User Updated",
      description: `${formData.name} has been successfully updated.`,
    });
  };

  if (!editingUser) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-[hsl(var(--dialog-background))]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user information for {editingUser.name}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Name</Label>
            <Input
              id="edit-name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-email">Email</Label>
            <Input
              id="edit-email"
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
            <Label htmlFor="edit-username">Username</Label>
            <Input
              id="edit-username"
              placeholder="johndoe"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value: UserRole) =>
                setFormData({ ...formData, role: value })
              }
            >
              <SelectTrigger id="edit-role">
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
            <Label htmlFor="edit-status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: User["status"]) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger id="edit-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="banned">Banned</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-tenant">Tenant</Label>
            <Select
              value={formData.tenantId}
              onValueChange={(value) =>
                setFormData({ ...formData, tenantId: value })
              }
              disabled={!isSuperAdmin}
            >
              <SelectTrigger id="edit-tenant">
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
                You can only edit users in your own tenant.
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
            <Button type="submit">Update User</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
