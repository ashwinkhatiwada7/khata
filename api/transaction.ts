import { api } from "@/lib/client";
import {
  CreateCreditPayload,
  CreateCreditResponse,
  CreatePaymentPayload,
  CreatePaymentResponse,
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

export async function createPayment(payload: CreatePaymentPayload) {
  const res = await api.post<CreatePaymentResponse>(
    `/customer/${payload.customerId}/payment`,
    {
      amount: payload.amount,
      paymentMethod: payload.paymentMethod,
      remark: payload.remark,
    },
  );
  return res.data;
}
