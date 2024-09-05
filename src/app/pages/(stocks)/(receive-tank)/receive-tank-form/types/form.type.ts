export type SelectedProduct = {
  refno: string;
  pcode: string;
  pname: string;
  qty: number;
  unitPrice: number;
  totalPrice: number;
};

export type formData = {
  refno: string;
  date: string;
  supplierId: string;
  selectedProducts: SelectedProduct[];
  totalPrice: number;
};
