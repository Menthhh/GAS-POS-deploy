export type HistorySupplier = {
  BILL_NUMBER: string;
  S_NAME: string;
  DATE: string;
  P_NAME: string;
  QUANTITY: string;
  UPRICE: string;
  TOTAL: string;
};

export const mockData: HistorySupplier[] = [
  {
    BILL_NUMBER: "G547676985",
    S_NAME: "บริษัท ปตท จำกัด (มหาชน)",
    DATE: "03/07/2567",
    P_NAME: "น้ำมันเครื่อง",
    QUANTITY: "10",
    UPRICE: "150",
    TOTAL: "1500",
  },
  {
    BILL_NUMBER: "G357794678",
    S_NAME: "หจก. ที โอ จี ลําปางอิ๊อกซิเยน",
    DATE: "03/06/2567",
    P_NAME: "ถังออกซิเจน",
    QUANTITY: "5",
    UPRICE: "200",
    TOTAL: "1000",
  },
  {
    BILL_NUMBER: "G659756340",
    S_NAME: "บริษัท ปตท จำกัด (มหาชน)",
    DATE: "03/05/2567",
    P_NAME: "น้ำมันดีเซล",
    QUANTITY: "-",
    UPRICE: "-",
    TOTAL: "-",
  },
  {
    BILL_NUMBER: "G873007654",
    S_NAME: "หจก. ที โอ จี ลําปางอิ๊อกซิเยน",
    DATE: "03/04/2567",
    P_NAME: "ถังไนโตรเจน",
    QUANTITY: "-",
    UPRICE: "-",
    TOTAL: "-",
  },
  {
    BILL_NUMBER: "G579658765",
    S_NAME: "หจก. ที โอ จี ลําปางอิ๊อกซิเยน",
    DATE: "03/03/2567",
    P_NAME: "ถังไฮโดรเจน",

    QUANTITY: "4",
    UPRICE: "250",
    TOTAL: "1000",
  },
  {
    BILL_NUMBER: "G123456789",
    S_NAME: "บริษัท ซีพี จำกัด",
    DATE: "03/07/2566",
    P_NAME: "ปุ๋ยเคมี",
    QUANTITY: "50",
    UPRICE: "20",
    TOTAL: "1000",
  },
  {
    BILL_NUMBER: "G987654421",
    S_NAME: "บริษัท ไอทีโซลูชั่น จำกัด",
    DATE: "03/07/2563",
    P_NAME: "คอมพิวเตอร์",
    QUANTITY: "3",
    UPRICE: "20000",
    TOTAL: "60000",
  },
  {
    BILL_NUMBER: "G987655321",
    S_NAME: "บริษัท ไอทีโซลูชั่น จำกัด",
    DATE: "03/05/2566",
    P_NAME: "คอมพิวเตอร์",
    QUANTITY: "3",
    UPRICE: "20000",
    TOTAL: "60000",
  },
  {
    BILL_NUMBER: "G987656321",
    S_NAME: "บริษัท ไอทีโซลูชั่น จำกัด",
    DATE: "15/06/2567",
    P_NAME: "คอมพิวเตอร์",
    QUANTITY: "3",
    UPRICE: "20000",
    TOTAL: "60000",
  },
];
