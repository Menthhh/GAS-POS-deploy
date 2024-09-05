export type SelectedProduct = {
  refno: string;
  pcode: string;
  pname: string;
  qty: number;
  uprice: number;
  amt: number;
};

export type formData = {
  refno: string;
  date: string;
  selectedProducts: SelectedProduct[];
  total: number;
};
