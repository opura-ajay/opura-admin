"use client";
export type UserRole = "super-admin" | "merchant-admin";

export type Tenant = {
  id: string;
  name: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
  role: UserRole;
  tenant: Tenant;
  createdAt: string;
  lastActive: string;
  status: "active" | "inactive" | "banned" | "pending" | "suspended";
};

export type CreateUserData = {
  name: string;
  email: string;
  role: UserRole;
  tenantId: string;
};
