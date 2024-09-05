import Swal from "sweetalert2";

export const handleSubmit = async (e: React.FormEvent, selectedFile: File | null, setRefresh: any) => {

  e.preventDefault();
  const form = e.currentTarget;

  const productName = e.currentTarget.productName.value;
  const productType = e.currentTarget.productType.value;
  const unit = e.currentTarget.unit.value;
  const unitAmount = e.currentTarget.unitAmount.value;
  const retailPrice = e.currentTarget.retailPrice.value;
  const wholesalePrice = e.currentTarget.wholesalePrice.value;
  const notificationAmount = e.currentTarget.notificationAmount.value;

  const formData = new FormData();
  formData.append("productName", productName);
  formData.append("productType", productType);
  formData.append("unit", unit);
  formData.append("unitAmount", unitAmount);
  formData.append("retailPrice", retailPrice);
  formData.append("wholesalePrice", wholesalePrice);
  formData.append("notificationAmount", notificationAmount);
  console.log(selectedFile)
  const fileInput = selectedFile


  if (fileInput && fileInput.name) {
    formData.append("file", fileInput);
  }else {
    formData.append("file", null);
  }

  try {
    const response = await fetch("/api/create-product", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      //use thai language
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