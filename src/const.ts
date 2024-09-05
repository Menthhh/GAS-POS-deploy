import { ReportType, ReportTab } from "./enum";

export const ReportTypeTab = [
    {
      type:ReportType.RECEIVE,
      subType:[ReportTab.RECEIVE]
    },
    {
      type:ReportType.SALE,
      subType:[
        ReportTab.SALE_BILL,
        ReportTab.SALE_DELIVERY,
        ReportTab.SALE_INVOICE,
        ReportTab.SALE_DEBT,
        ReportTab.SALE_DEBT_SUMMARY,

 
        ReportTab.SALE_TAX,
      ]
    },
    {
      type:ReportType.LOAN,
      subType:[ReportTab.LOAN_VENDOR,ReportTab.LOAN_CUSTOMER]
    },
    {
      type:ReportType.STOCK,
      subType:[ReportTab.STOCK_REMAIN,ReportTab.STOCK_MOVEMENT]
    },
    {
      type:ReportType.TAX,
      subType:[ReportTab.TAX]
    },
    
  ]
  export const reportTabAttribute = {
    [ReportTab.RECEIVE]: {
        label: 'รายงานใบรับสินค้า',
        hasDatePicker: true,
        hasVendor: true ,
        hasCustomer: false,
        column: [
            { id: 'id', label: 'ที่', minWidth: 50 },
            { id: 'RDATE', label: 'วันที่', minWidth: 100 },
            { id: 'REFNO', label: 'เลขที่เอกสาร', minWidth: 150 },
            { id: 'S_NAME', label: 'ผู้จัดจำหน่าย', minWidth: 100 },
            { id: 'P_NAME', label: 'สินค้า', minWidth: 150 },
            { id: 'QUANTITY', label: 'จำนวน', minWidth: 100, align: 'right' },
            { id: 'UPRICE', label: 'ราคา', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) },
            { id: 'TOTAL_AMOUNT', label: 'จำนวนเงิน', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) },
            { id: 'TOTAL', label: 'ราคาก่อนภาษี', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) },
            { id: 'VAMT', label: 'ภาษี', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) },
            { id: 'GTOTAL', label: 'จน.เงินรวมภาษี', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) },
            { id: 'DIFF1', label: 'เพิ่ม/ลด', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) },
            { id: 'GTOTAL1', label: 'เงินรวม', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) },
          ],
          showSummary: [],
      },
      [ReportTab.SALE_DELIVERY]: {
        label: 'รายงานใบส่งของ/ใบกำกับภาษี',
        hasDatePicker: true,
        hasVendor: false,
        hasCustomer: true,
        column: [
            { id: 'id', label: 'ที่', minWidth: 50 },
            { id: 'date', label: 'วันที่', minWidth: 100 },
            { id: 'docNum', label: 'เลขที่เอกสาร', minWidth: 150 },
            { id: 'customer', label: 'ลูกค้า', minWidth: 200 },
            { id: 'product', label: 'สินค้า', minWidth: 300 },
            { id: 'quantity', label: 'จำนวน', minWidth: 100, align: 'right' },
            { id: 'price', label: 'ราคาต่อหน่วย', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) },
            { id: 'total', label: 'จำนวนเงิน', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) },
            { id: 'preTax', label: 'มูลค่าสินค้า', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) },
            { id: 'tax', label: 'ภาษี', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) },
            { id: 'grandTotal', label: 'รวมทั้งสิ้น', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) }
          ]
          ,
          showSummary: ['quantity','total','preTax','tax','grandTotal'],
      },
      [ReportTab.SALE_BILL]: {
        label: 'รายงานบิลเงินสด/ใบกำกับภาษี',
        hasDatePicker: true,
        hasVendor: false,
        hasCustomer: true,
        column: [
            { id: 'id', label: 'ที่', minWidth: 50 },
            { id: 'date', label: 'วันที่', minWidth: 100 },
            { id: 'docNum', label: 'เลขที่เอกสาร', minWidth: 150 },
            { id: 'customer', label: 'ลูกค้า', minWidth: 200 },
            { id: 'product', label: 'สินค้า', minWidth: 300 },
            { id: 'quantity', label: 'จำนวน', minWidth: 100, align: 'right' },
            { id: 'price', label: 'ราคาต่อหน่วย', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) },
            { id: 'total', label: 'จำนวนเงิน', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) },
            { id: 'preTax', label: 'มูลค่าสินค้า', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) },
            { id: 'tax', label: 'ภาษี', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) },
            { id: 'grandTotal', label: 'รวมทั้งสิ้น', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) }
          ]
          ,
          showSummary: [],
        
      },
      
      [ReportTab.SALE_INVOICE]: {
        label: 'รายงานใบเสร็จรับเงิน',
        hasDatePicker: true,
        hasVendor: false,
        hasCustomer: true,
        column: [
            { id: 'id', label: 'ที่', minWidth: 50 },
            { id: 'date', label: 'วันที่', minWidth: 100 },
            { id: 'docNum', label: 'ใบเสร็จรับเงิน', minWidth: 150 },
            { id: 'customer', label: 'ลูกค้า', minWidth: 200 },
            { id: 'product', label: 'สินค้า', minWidth: 300 },
            { id: 'invoiceNum', label: 'ใบแจ้งหนี้', minWidth: 150 },
            { id: 'total', label: 'จำนวนเงิน', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) }
          ]
          ,
          showSummary: ['total'],
      },
      [ReportTab.SALE_DEBT]: {
        label: 'รายงานลูกหนี้ค้างชำระ',
        hasDatePicker: false,
        hasVendor: false,
        hasCustomer: true,
        column: [
            { id: 'id', label: 'ที่', minWidth: 50 },
            { id: 'date', label: 'วันที่', minWidth: 100 },
            { id: 'docNum', label: 'ใบส่งของ', minWidth: 150 },
            { id: 'customer', label: 'ลูกค้า', minWidth: 200 },
            { id: 'preTax', label: 'มูลค่าสินค้า', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) },
            { id: 'tax', label: 'ภาษี', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) },
            { id: 'grandTotal', label: 'รวมทั้งสิ้น', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) }
          ],
          showSummary: ['preTax','tax','grandTotal'],
      },
      [ReportTab.SALE_DEBT_SUMMARY]: {
        label: 'รายงานสรุปลูกหนี้ค้างชำระ',
        hasDatePicker: false,
        hasVendor: false,
        hasCustomer: false,
        column: [
            { id: 'id', label: 'ที่', minWidth: 50 },
            { id: 'customer', label: 'ลูกค้า', minWidth: 200 },
            { id: 'total', label: 'จำนวนเงิน', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) }
          ],
          showSummary: ['total'],
      },
      [ReportTab.SALE_TAX]: {
        label: 'รายงานภาษีขาย',
        hasDatePicker: false,
        hasVendor: false,
        hasCustomer: false,
        column: [
            { id: 'id', label: 'ที่', minWidth: 50 },
            { id: 'date', label: 'วันที่', minWidth: 100 },
            { id: 'taxInvoiceNumber', label: 'เลขที่ใบกำกับภาษี', minWidth: 150 },
            { id: 'buyerName', label: 'ชื่อผู้ซื้อสินค้า', minWidth: 200 },
            { id: 'taxId', label: 'เลขประจำตัวผู้เสียภาษี', minWidth: 150 },
            { id: 'value', label: 'มูลค่าสินค้า', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) },
            { id: 'tax', label: 'ภาษีมูลค่าเพิ่ม', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) }
          ],
          showSummary: [],
      },
      [ReportTab.LOAN_VENDOR]: {
        label: 'รายงานใบยืมถังจากผู้จัดจำหน่าย',
        hasDatePicker: true,
        hasVendor: true,
        hasCustomer: false,
        column: [
            { id: 'id', label: 'ที่', minWidth: 50 },
            { id: 'date', label: 'วันที่', minWidth: 100 },
            { id: 'docNum', label: 'เลขที่เอกสาร', minWidth: 150 },
            { id: 'seller', label: 'ผู้จัดจำหน่าย', minWidth: 200 },
            { id: 'product', label: 'สินค้า', minWidth: 300 },
            { id: 'quantity', label: 'จำนวน', minWidth: 100, align: 'right' },
            { id: 'price', label: 'ราคาต่อหน่วย', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) },
            { id: 'total', label: 'จำนวนเงิน', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) },
            { id: 'finalTotal', label: 'รวมเงิน', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) },
            ],
            showSummary: ['total'],
      },
      [ReportTab.LOAN_CUSTOMER]: {
        label: 'รายงานใบยืมถังของลูกค้า',
        hasDatePicker: true,
        hasVendor: false,
        hasCustomer: true,
        column:[
            { id: 'id', label: 'ที่', minWidth: 50 },
            { id: 'date', label: 'วันที่', minWidth: 100 },
            { id: 'docNum', label: 'เลขที่เอกสาร', minWidth: 150 },
            { id: 'customer', label: 'ลูกค้า', minWidth: 200 },
            { id: 'product', label: 'สินค้า', minWidth: 300 },
            { id: 'quantity', label: 'จำนวน', minWidth: 100, align: 'right' },
            { id: 'price', label: 'ราคาต่อหน่วย', minWidth: 100, align: 'right', format: (value:number) => (typeof value === 'number' ? value.toFixed(2) : value) },
            { id: 'total', label: 'จำนวนเงิน', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) },
            { id: 'finalTotal', label: 'รวมเงิน', minWidth: 100, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) }
            ],
            showSummary: ['quantity','total'],
      },
      [ReportTab.STOCK_REMAIN]: {
        label: 'รายงานสินค้าคงเหลือ',
        hasDatePicker: false,
        hasVendor: false,
        hasCustomer: false,
        column:[
            { id: 'id', label: 'ที่', minWidth: 50 },
            { id: 'productCode', label: 'รหัสสินค้า', minWidth: 100 },
            { id: 'productName', label: 'รายการ', minWidth: 300 },
            { id: 'unit', label: 'หน่วยนับ', minWidth: 100 },
            { id: 'quantity', label: 'จำนวน', minWidth: 100, align: 'right' }
            ],
            showSummary: [],
      },
      [ReportTab.STOCK_MOVEMENT]: {
        label: 'รายงานการเคลื่อนไหวของสินค้า',
        hasDatePicker: false,
        hasVendor: false,
        hasCustomer: false,
        column: [
            { id: 'id', label: 'ที่', minWidth: 50 },
            { id: 'productCode', label: 'รหัสสินค้า', minWidth: 100 },
            { id: 'productName', label: 'ชื่อสินค้า', minWidth: 300 },
            { id: 'unit', label: 'หน่วยนับ', minWidth: 100 },
            { id: 'quantity', label: 'ยกมา', minWidth: 100, align: 'right' },
            { id: 'inStock', label: 'ใบรับ', minWidth: 100, align: 'right' },
            { id: 'sale', label: 'ขาย', minWidth: 100, align: 'right' },
            { id: 'remaining', label: 'คงเหลือ', minWidth: 100, align: 'right' }
            ],
            showSummary: ['quantity','inStock','sale','remaining'],
      },
      [ReportTab.TAX]: {
        label: 'รายงานภาษีซื้อ',
        hasDatePicker: false,
        hasVendor: false,
        hasCustomer: false,
        column:[
            { id: 'id', label: 'ที่', minWidth: 50 },
            { id: 'RDATE', label: 'วันที่', minWidth: 100 },
            { id: 'REFNO', label: 'เลขที่เอกสาร', minWidth: 150 },
            { id: 'S_NAME', label: 'ชื่อผู้ขาย', minWidth: 200 },
            { id: 'S_TAX_ID', label: 'เลขที่ประจำตัวผู้เสียภาษี', minWidth: 200 },
            { id: 'TOTAL', label: 'มูลค่าสินค้าหรือบริการ', minWidth: 150, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) },
  { id: 'VAMT', label: 'จำนวนเงินหลังหักส่วนลด', minWidth: 150, align: 'right', format: (value) => (typeof value === 'number' ? value.toFixed(2) : value) }
            ],
            showSummary: [],
      },
    };
