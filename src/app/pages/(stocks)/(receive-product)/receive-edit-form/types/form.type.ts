export type SelectedProduct = {
  refno: string;
  pid: number;
  name: string;
  qty: number;
  unitPrice: number;
  totalPrice: number;
};

export type formData = {
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
