"use client";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import CustomerForm from "./CustomerForm";
import OrganizationForm from "./OrganizationForm";
import ShippingForm from "./ShippingForm";
import LoanCreditForm from "./LoanCreditForm";
import { useSearchParams } from "next/navigation";

const pages = {
  0: "ข้อมูลผู้ติดต่อ",
  1: "ข้อมูลสถานประกอบการ",
  2: "ข้อมูลจัดส่ง",
  3: "เงินเชื่อและเครดิต",
};

// {
//   "ccode": "01006",
//   "cname": "สมชาย แสนดี",
//   "csurn": "แสนดี",
//   "tel": "0801234567",
//   "lineid": "somchai.s",
//   "email1": "somchai@example.com",
//   "type1": "ขายปลีก",
//   "org_name": "สมชายแอนด์โค",
//   "org_addr1": "123 ถนนสุขุมวิท",
//   "org_addr2": "แขวงบางนา เขตบางนา",
//   "refno": "REF006",
//   "taxid": "TAX12345678",
//   "send_addr1": "456 ซอยสุขุมวิท 101",
//   "send_addr2": "แขวงบางนาเหนือ เขตบางนา",
//   "day1": 30
// }

const Page = ({searchParams} : any) => {
  //const ccode = searchParams.get("ccode");
  const ccode = searchParams.ccode;

  const [page, setPage] = useState(0);
  const [customerId, setCustomerId] = useState("");
  const [customerForm, setCustomerForm] = useState({
    cname: "",
    csurn: "",
    tel: "",
    lineid: "",
    email1: "",
    type1: "",
  });
  const [organizationForm, setOrganizationForm] = useState({
    org_name: "",
    org_addr1: "",
    org_addr2: "",
    refno: "",
    taxid: "",
  });
  const [shippingForm, setShippingForm] = useState({
    send_addr1: "",
    send_addr2: "",
    useOrganizationAddress: false,
  });
  const [day1, setDay] = useState(null);

  const fetchCustomerId = async () => {
    try {
      const response = await fetch("/api/get-customer-id");
      const data = await response.json();
      setCustomerId(data.customerId);
      console.log(customerId);
    } catch (error) {
      console.error("Failed to generate customer ID:", error);
      // Handle the error appropriately
    }
  };

  const fetchCustomer = async () => {
    try {
      const response = await fetch("/api/get-customer?ccode=" + ccode);
      const { customer } = await response.json();
      setCustomerForm({
        cname: customer.CNAME,
        csurn: customer.CSURN,
        tel: customer.TEL,
        lineid: customer.LINEID,
        email1: customer.EMAIL1,
        type1: customer.TYPE1,
      });
      setOrganizationForm({
        org_name: customer.ORG_NAME,
        org_addr1: customer.ORG_ADDR1,
        org_addr2: customer.ORG_ADDR2,
        refno: customer.REFNO,
        taxid: customer.TAXID,
      });
      setShippingForm({
        send_addr1: customer.SEND_ADDR1,
        send_addr2: customer.SEND_ADDR2,
        useOrganizationAddress: false,
      });
      setDay(customer.DAY1);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (ccode === null) {
      fetchCustomerId();
    } else {
      setCustomerId(ccode);
      fetchCustomer();
    }
  }, []);

  const handleOrganizationFormChange = (newOrganizationForm) => {
    setOrganizationForm(newOrganizationForm);
  };

  const handleShippingFormChange = (newShippingForm) => {
    setShippingForm(newShippingForm);
  };

  return (
    <Layout currentPage="ลูกค้า" subPage="ข้อมูลลูกค้า">
      <div className="flex flex-col p-3 mt-2 gap-2">
        <div
          className="flex flex-row bg-white rounded-2xl px-8 py-3"
          style={{
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          {Object.entries(pages).map(([key, value]) => (
            <div
              key={key}
              className={`rounded-xl ${
                page === parseInt(key) ? "bg-extra" : ""
              } mr-2 py-1 px-3 items-center justify-center cursor-pointer`}
              onClick={() => setPage(parseInt(key))}
            >
              <p
                className={`font-semibold ${
                  page === parseInt(key) ? "text-white" : "text-extra"
                }`}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
        {page === 0 && (
          <CustomerForm
            customerId={customerId}
            customerForm={customerForm}
            setCustomerForm={setCustomerForm}
          />
        )}
        {page === 1 && (
          <OrganizationForm
            customerId={customerId}
            onOrganizationFormChange={handleOrganizationFormChange}
            setPage={setPage}
            setOrganizationForm={setOrganizationForm}
            organizationForm={organizationForm}
          />
        )}
        {page === 2 && (
          <ShippingForm
            customerId={customerId}
            organizationForm={organizationForm}
            shippingForm={shippingForm}
            onShippingFormChange={handleShippingFormChange}
            setPage={setPage}
          />
        )}
        {page === 3 && (
          <LoanCreditForm
            customerId={customerId}
            setPage={setPage}
            day1={day1}
            setDay={setDay}
          />
        )}
      </div>
    </Layout>
  );
};

export default Page;
