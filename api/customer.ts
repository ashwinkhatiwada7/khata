import { api } from "@/lib/client";
import { GetAllCustomer } from "@/types/customer-types";

export async function getAllCustomer(page = 1, perpage = 20) {
  const res = await api.get<GetAllCustomer>("/customer", {
    params: { page, perpage },
  });
  // console.log(res.data);
  return res.data;
}
