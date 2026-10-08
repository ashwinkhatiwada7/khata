export type Customer = {
  id: string;
  name: string;
  shopOwnerId: string;
  phone: string;
  address: string;
  creditLimit: string;
  creditBalance: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  image: string;
};

export type PaginationMeta = {
  page: number;
  perpage: number;
  total: number;
  totalPages: number;
};

export type GetAllCustomer = {
  success: boolean;
  data: Customer[];
  meta: PaginationMeta;
};
