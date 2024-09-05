import type { SelectedProduct } from "./form.type";

export type ReceiveInfo = {
  refno: string;
  date: string;
  supplierId: string;
  selectedProducts: SelectedProduct[];
  taxType: string;
  totalBeforeTax: number;
  taxPrice: number;
  diff: number;
  totalWithTax: number;
  totalPrice: number;
};