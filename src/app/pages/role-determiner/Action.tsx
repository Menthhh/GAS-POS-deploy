import Swal from "sweetalert2";

export const handleSubmit = async (e: React.FormEvent, selectedFile: File | null, setRefresh: any) => {

  e.preventDefault();
  const form = e.currentTarget;

  const fullName = e.currentTarget.fullName.value;
  const workerType = e.currentTarget.workerType.value;
  const username = e.currentTarget.username.value;
  const password = e.currentTarget.password.value;

  const formData = new FormData();
  formData.append("fullName", fullName);
  formData.append("workerType", workerType);
  formData.append("username", username);
  formData.append("password", password);
  console.log(selectedFile)
  const fileInput = selectedFile

  if (fileInput && fileInput.name) {
    formData.append("file", fileInput);
  } 

  try {
    const response = await fetch("/api/create-user", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      //use thai language
      Swal.fire("สำเร็จ", "เพิ่มข้อมูลพนักงานสำเร็จ", "success");
      setRefresh((prev) => !prev);
    } else {
      Swal.fire("ผิดพลาด", "เพิ่มข้อมูลพนักงานไม่สำเร็จ", "error");  
    }
  } catch (error) {
    console.error(error);
    Swal.fire("ผิดพลาด", "เพิ่มข้อมูลพนักงานไม่สำเร็จ", "error");
  }
};