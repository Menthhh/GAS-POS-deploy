import Swal from "sweetalert2";

export const handleSubmit = async (
  e: React.FormEvent,
  setRefresh: any
) => {
  e.preventDefault();

  const supplierName = e.currentTarget.supplierName.value;
  const supplierContactName = e.currentTarget.supplierContactName.value;
  const supplierAddress = e.currentTarget.supplierAddress.value;
  const supplierPhone = e.currentTarget.supplierPhone.value;
  const supplierTaxId = e.currentTarget.supplierTaxId.value;

  const body = {
    supplierName,
    supplierContactName,
    supplierAddress,
    supplierPhone,
    supplierTaxId,
  };

  console.log("body", body);

  try {
    const response = await fetch("/api/create-supplier", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (response.ok) {
      Swal.fire("สำเร็จ", "เพิ่มสินค้าสำเร็จ", "success");
      setRefresh((prev) => !prev);
    } else {
      Swal.fire("ผิดพลาด", "เพิ่มสินค้าไม่สำเร็จ", "error");
    }
  } catch (error) {
    console.error(error);
    Swal.fire("ผิดพลาด", "เพิ่มสินค้าไม่สำเร็จ", "error");
  }
};
