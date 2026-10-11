import { api } from "@/lib/client";
import {
  CreateCreditPayload,
  CreateCreditResponse,
} from "@/types/transaction-types";

export async function createCredit(payload: CreateCreditPayload) {
  const res = await api.post<CreateCreditResponse>(
    `/customer/${payload.customerId}/credit`,
    {
      description: "",
      items: payload.items.map((i) => ({
        itemName: i.name,
        quantity: i.qty,
        unitPrice: i.price,
      })),
    },
  );
  return res.data;
}
