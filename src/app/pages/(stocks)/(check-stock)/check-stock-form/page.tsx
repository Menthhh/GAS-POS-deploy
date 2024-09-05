"use client";

import Layout from "@/components/Layout";
import React, { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import useFetchProducts from "@/hooks/useFetchProducts";
import useFetchSuppliers from "@/hooks/useFetchSuppliers";
import { Supplier, Product } from "@/type";
import Select from "react-select";
import { DropdownIndicator } from "@/components/DropdownIndicator";
import { useRouter } from "next/navigation";
import { formData, SelectedProduct } from "./types/form.type";

const columnWidths = ["5%", "10%", "40%", "10%", "15%", "15%", "5%"];

function ReceiveTankFormPage() {
  const [refresh, setRefresh] = useState(false);
  const { products } = useFetchProducts(refresh);
  const { suppliers } = useFetchSuppliers(refresh);
  const router = useRouter();
  const [formData, setFormData] = useState<formData>({
    refno: "",
    date: formatDate(new Date()),
    selectedProducts: [] as SelectedProduct[],
    total: 0,
  });

  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const productOptions = products.map((product: Product) => ({
    value: product.P_ID,
    label: product.P_NAME,
    isDisabled: formData.selectedProducts.some(
      (p) => p.pcode.toString() === product.P_ID.toString()
    ),
  }));

  const supplierOptions = suppliers.map((supplier: Supplier) => ({
    value: supplier.S_ID,
    label: supplier.S_NAME,
  }));

  const handleChange = (field: string, value: any) => {
    setFormData((prevState) =>
      updateCalculatedValues({ ...prevState, [field]: value })
    );
    // console.log(formData);
  };

  const resetForm = () => {
    setFormData({
      refno: "",
      date: formatDate(new Date()),
      selectedProducts: [] as SelectedProduct[],
      total: 0,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // console.log(formData);
    try {
      const response = await fetch("/api/create-Improve-product", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "เพิ่มสำเร็จ!",
          // text: "คุณต้องการทำอะไรต่อไป?",
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "เพิ่มข้อมูลต่อ",
          cancelButtonText: "กลับไปหน้ารับสินค้า",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            resetForm();
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            router.replace("/pages/check-stock");
          }
        });
      } else {
        console.error("Error:");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleProductSelection = (selectedOption: any) => {
    const selectedProductId = selectedOption.value;

    if (selectedProductId) {
      const selectedProduct = products.find(
        (p: Product) => p.P_ID == selectedProductId
      );

      if (selectedProduct) {
        const newProduct: SelectedProduct = {
          refno: formData.refno,
          pcode: selectedProduct.P_ID,
          pname: selectedProduct.P_NAME,
          qty: 1,
          uprice: 0,
          amt: 0,
        };
        setFormData((prevState) =>
          updateCalculatedValues({
            ...prevState,
            selectedProducts: [...prevState.selectedProducts, newProduct],
          })
        );
      }
    }
    selectedOption.value = "ค้นหา";
  };


  const handleProductChange = (
    index: number,
    field: "qty" | "uprice",
    value: number
  ) => {
    setFormData((prevState) => {
      const updatedProducts = [...prevState.selectedProducts];
      updatedProducts[index][field] = value;
      updatedProducts[index].amt =
        updatedProducts[index].qty * updatedProducts[index].uprice;
      return updateCalculatedValues({
        ...prevState,
        selectedProducts: updatedProducts,
      });
    });
  };

  const handleDeleteProduct = (index: number) => {
    Swal.fire({
      title: "แน่ใจหรือไม่ที่ลบรายการสินค้านี้?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "ลบ",
      confirmButtonColor: "red",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,

      // denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setFormData((prevState) =>
          updateCalculatedValues({
            ...prevState,
            selectedProducts: prevState.selectedProducts.filter(
              (_, i) => i !== index
            ),
          })
        );
        Swal.fire("Deleted!", "", "success");
      }
    });
  };

  const updateCalculatedValues = (updatedFormData: formData) => {
    const totalBeforeTax = updatedFormData.selectedProducts.reduce(
      (sum, product) => sum + product.amt,
      0
    );

    const total = totalBeforeTax;

    return {
      ...updatedFormData,
      total,
    };
  };

  return (
    <Layout currentPage="สต็อกสินค้า" subPage="ปรับปรุงสินค้า">
      <form className="px-5 py-2 mt-2" onSubmit={handleSubmit}>
        <div
          style={{
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
          }}
          className="flex items-center justify-center py-2 bg-white rounded-2xl mb-2"
        >
          <div
            id="recieve-form"
            className="flex flex-col items-start justify-center space-y-4 p-2"
          >
            <div className="flex flex-row space-x-4 ">
              <div>
                <h1 className="text-extra font-bold mb-2"> เลขที่ </h1>
                <input
                  type="number"
                  name="refno"
                  value={formData.refno}
                  onChange={(e) => handleChange("refno", e.target.value)}
                  className="w-full h-8 text-secondary bg-white font-ibm-plex-sans-thai border-none ring-[1px] rounded-lg ring-[#878787] py-1 px-5 focus:ring-primary hover:ring-primary cursor-pointer "
                />
              </div>
              <div>
                <h1 className="text-extra font-bold mb-2"> วันที่ </h1>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className="w-full h-8 text-secondary bg-white font-ibm-plex-sans-thai border-none ring-[1px] rounded-lg ring-[#878787] py-1 px-5 focus:ring-primary hover:ring-primary cursor-pointer "
                />
              </div>
            </div>

            <span className="flex flex-col w-full">
              <h1 className="text-extra font-bold mb-2"> ชื่อสินค้า </h1>
              <div className="relative">
                <Select
                  components={{ DropdownIndicator }}
                  value=""
                  options={productOptions}
                  onChange={handleProductSelection}
                  isSearchable={true}
                  placeholder="พิมพ์เพื่อค้นหาและเลือกสินค้า"
                  noOptionsMessage={() => "ไม่พบสินค้า"}
                  className="text-secondary h-8 font-ibm-plex-sans-thai cursor-pointer"
                  classNamePrefix="react-select"
                  styles={{
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#878787",
                    }),
                    dropdownIndicator: (provided) => ({
                      ...provided,
                      padding: "0px",
                    }),
                    input: (provided) => ({
                      ...provided,
                      margin: "0px",
                    }),
                    control: (provided) => ({
                      ...provided,
                      borderWidth: "1px",
                      borderColor: "#878787",
                      borderRadius: "0.5rem",
                      boxShadow: "none",
                      "&:hover": {
                        borderWidth: "2px",
                        borderColor: "#0c487f",
                      },
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isDisabled
                        ? "#adadad42"
                        : state.isFocused
                        ? "#4398E7"
                        : "white",
                      color: state.isDisabled
                        ? "#666"
                        : state.isFocused
                        ? "white"
                        : "black",
                    }),
                    indicatorSeparator: () => {},
                  }}
                />
              </div>
            </span>
          </div>
        </div>

        <div
          style={{
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
          }}
          className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl"
        >
          <div
            className="overflow-y-auto max-h-[190px] w-full scroll-smooth"
            style={{ scrollbarWidth: "thin" }}
          >
            <table className="w-full">
              <thead className="bg-[#4398E7] border border-end sticky top-[-1px]">
                <tr>
                  {[
                    "ลำดับ",
                    "รหัสสินค้า",
                    "ชื่อสินค้า",
                    "จำนวน",
                    "ราคาต่อหน่วย",
                    "ราคารวม",
                    "",
                  ].map((header, index) => (
                    <th
                      key={index}
                      className="px-4 py-2 text-white sticky top-0"
                      style={{ width: columnWidths[index] }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {formData.selectedProducts.map(
                  (product: SelectedProduct, index) => (
                    <tr key={product.pcode}>
                      <td className="border border-end px-4 py-1">
                        <div className="flex justify-center items-center font-ibm-plex-sans-thai text-third font-semibold">
                          {index + 1}
                        </div>
                      </td>
                      <td className="border border-end px-4 py-1">
                        <div className="flex justify-center items-center font-ibm-plex-sans-thai text-third font-semibold">
                          {product.pcode}
                        </div>
                      </td>
                      <td className="border border-end px-4 py-1">
                        <div className="flex justify-center items-center font-ibm-plex-sans-thai text-third font-semibold">
                          {product.pname}
                        </div>
                      </td>
                      <td className="border border-end px-4 py-1">
                        <div className="flex justify-center items-center">
                          <input
                            type="number"
                            value={product.qty}
                            onChange={(e) =>
                              handleProductChange(
                                index,
                                "qty",
                                parseFloat(e.target.value)
                              )
                            }
                            className="w-2/3 text-third font-semibold bg-white font-ibm-plex-sans-thai rounded-lg ring-1 ring-[#4398E7] border-none py-1.5 hover:ring-primary cursor-pointer appearance-none"
                            style={{ textAlign: "center" }}
                          />
                        </div>
                      </td>
                      <td className="border border-end px-4 py-1">
                        <div className="flex justify-center items-center">
                          <input
                            type="number"
                            value={product.uprice.toFixed(2)}
                            onChange={(e) =>
                              handleProductChange(
                                index,
                                "uprice",
                                parseFloat(e.target.value)
                              )
                            }
                            className="w-2/3 text-third font-semibold bg-white font-ibm-plex-sans-thai rounded-lg ring-1 ring-[#4398E7] border-none py-1.5  focus:ring-primary  focus:ring-2 hover:ring-2 hover:ring-primary cursor-pointer appearance-none"
                            style={{ textAlign: "center" }}
                          />
                        </div>
                      </td>
                      <td className="border border-end border-r-0 px-4 py-1">
                        <div className="flex justify-center items-center rounded-lg ring-1 ring-[#4398E7] bg-[#B1D8FB] border-none py-1.5 px-5 font-ibm-plex-sans-thai text-third font-semibold">
                          {product.amt.toFixed(2)}
                        </div>
                      </td>
                      <td className="border border-end border-l-0 px-4 py-1">
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(index)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold w-8 h-8 pt-0.5 rounded-full items-center justify-center"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          {formData.selectedProducts.length < 1 && (
            <div className="flex w-full bg-white border border-end 0 py-4 justify-center items-center">
              กรุณาเพิ่มสินค้า
            </div>
          )}

          <div className="flex flex-row w-full justify-end border border-end border-t-0 bg-[#F5FAFF] py-5 px-24">
            <div className="flex flex-row items-center  space-x-10">
              <h1 className="text-extra font-bold mr-3"> รวมเงิน </h1>
              <div className="flex items-center justify-center w-[150px] text-white font-semibold bg-textExtra font-ibm-plex-sans-thai rounded-lg ring-1 ring-primary border-none py-1 px-5">
                {formData.total.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center ">
          <button
            type="submit"
            className="bg-[#0059AB] py-2 px-10 text-lg rounded-lg ring-1 ring-white border-none text-white font-semibold font-ibm-plex-sans-thai mt-3"
          >
            บันทึก
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default ReceiveTankFormPage;
