"use client";

import { Tenant, User } from "../types/user";

export const mockTenants: Tenant[] = [
  { id: "1", name: "Acme Corporation" },
  { id: "2", name: "TechStart Inc" },
  { id: "3", name: "Global Solutions" },
  { id: "4", name: "Innovation Labs" },
];

const generateUsers = (): User[] => {
  const firstNames = [
    "John",
    "Sarah",
    "Mike",
    "Emily",
    "Alex",
    "Lisa",
    "David",
    "Jennifer",
    "James",
    "Maria",
    "Robert",
    "Linda",
    "Michael",
    "Barbara",
    "William",
    "Elizabeth",
    "Richard",
    "Susan",
    "Joseph",
    "Jessica",
    "Thomas",
    "Karen",
    "Charles",
    "Nancy",
    "Christopher",
    "Margaret",
    "Daniel",
    "Betty",
    "Matthew",
    "Sandra",
    "Anthony",
    "Ashley",
    "Mark",
    "Dorothy",
    "Donald",
    "Kimberly",
    "Steven",
    "Carol",
    "Paul",
    "Donna",
    "Andrew",
    "Michelle",
    "Joshua",
    "Amanda",
    "Kenneth",
    "Melissa",
    "Kevin",
    "Deborah",
    "Patricia",
    "George",
    "Helen",
    "Brian",
    "Laura",
  ];

  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
    "Lee",
    "Perez",
    "Thompson",
    "White",
    "Harris",
    "Sanchez",
    "Clark",
    "Ramirez",
    "Lewis",
    "Robinson",
    "Walker",
    "Young",
    "Allen",
    "King",
    "Wright",
    "Scott",
    "Torres",
    "Nguyen",
    "Hill",
    "Flores",
    "Green",
    "Adams",
    "Nelson",
    "Baker",
    "Hall",
    "Rivera",
    "Campbell",
    "Mitchell",
    "Carter",
    "Roberts",
  ];

  const roles: ("super-admin" | "merchant-admin")[] = [
    "super-admin",
    "merchant-admin",
  ];
  const statuses: ("active" | "inactive")[] = ["active", "inactive"];
  const lastActiveOptions = [
    "1 minute ago",
    "5 minutes ago",
    "15 minutes ago",
    "1 hour ago",
    "2 hours ago",
    "4 hours ago",
    "1 day ago",
    "2 days ago",
    "4 days ago",
    "1 week ago",
    "2 weeks ago",
    "1 month ago",
    "2 months ago",
    "3 months ago",
    "6 months ago",
  ];

  // --- Generate all unique name combinations ---
  const nameCombos: { firstName: string; lastName: string }[] = [];
  for (const f of firstNames) {
    for (const l of lastNames) {
      nameCombos.push({ firstName: f, lastName: l });
    }
  }

  // --- Shuffle combinations to randomize ---
  for (let i = nameCombos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [nameCombos[i], nameCombos[j]] = [nameCombos[j], nameCombos[i]];
  }

  const users: User[] = [];

  for (let i = 1; i <= 500; i++) {
    const combo = nameCombos[i % nameCombos.length];
    const { firstName, lastName } = combo;

    const tenant = mockTenants[Math.floor(Math.random() * mockTenants.length)];
    const role =
      i === 1 ? "super-admin" : roles[Math.floor(Math.random() * roles.length)];
    const status = Math.random() > 0.1 ? "active" : "inactive";

    const year = Math.random() > 0.5 ? 2024 : 2023;
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");

    // Unique avatar seed → ensures 100% uniqueness even if names repeat
    const uniqueSeed = `${firstName}${lastName}${tenant.id}_${i}_${Math.random()
      .toString(36)
      .substring(2, 8)}`;

    users.push({
      id: i.toString(),
      name: `${firstName} ${lastName}`,
      username: `${firstName.toLowerCase()}_${lastName.toLowerCase()}_${i}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@${tenant.name
        .toLowerCase()
        .replace(/\s+/g, "")}.com`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
        uniqueSeed
      )}`,
      role,
      tenant,
      createdAt: `${year}-${month}-${day}`,
      lastActive:
        lastActiveOptions[Math.floor(Math.random() * lastActiveOptions.length)],
      status,
    });
  }

  return users;
};

export const mockUsers: User[] = generateUsers();

// Simulated current user
export const currentUser: User = mockUsers[0]; // Super admin
// export const currentUser: User = mockUsers[1]; // Merchant admin
