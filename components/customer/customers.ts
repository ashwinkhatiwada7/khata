export type Customer = {
  id: string;
  name: string;
  phone: string;
  credit: number;
};

export const CUSTOMERS: Customer[] = [
  { id: "1", name: "Ram Sharma", phone: "9841234567", credit: 12500 },
  { id: "2", name: "Sita Karki", phone: "9812345678", credit: 0 },
  { id: "3", name: "Hari Thapa", phone: "9801122334", credit: 3400 },
  { id: "4", name: "Gita Rai", phone: "9851098765", credit: 780 },
  { id: "5", name: "Bikash Gurung", phone: "9863344556", credit: 0 },
  { id: "6", name: "Anita Shrestha", phone: "9841567890", credit: 21050 },
  { id: "7", name: "Suman Magar", phone: "9808899001", credit: 150 },
  { id: "8", name: "Gita Rai", phone: "9851098765", credit: 780 },
  { id: "9", name: "Bikash Gurung", phone: "9863344556", credit: 0 },
  { id: "10", name: "Anita Shrestha", phone: "9841567890", credit: 21050 },
  { id: "11", name: "Suman Magar", phone: "9808899001", credit: 150 },
];

const AVATAR_COLORS = ["#5f33e1", "#e17a33", "#2a9d8f", "#d6336c", "#3b82f6"];

export function avatarColor(id: string) {
  return AVATAR_COLORS[Number(id) % AVATAR_COLORS.length];
}

export function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export function searchCustomers(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return CUSTOMERS;
  return CUSTOMERS.filter(
    (c) => c.name.toLowerCase().includes(q) || c.phone.includes(q),
  );
}

export function addCustomer(input: Omit<Customer, "id">) {
  const nextId = String(
    CUSTOMERS.reduce((max, c) => Math.max(max, Number(c.id)), 0) + 1,
  );
  const customer = { id: nextId, ...input };
  CUSTOMERS.push(customer);
  return customer;
}

export function updateCustomer(id: string, input: Omit<Customer, "id">) {
  const customer = CUSTOMERS.find((c) => c.id === id);
  if (customer) Object.assign(customer, input);
  return customer;
}
