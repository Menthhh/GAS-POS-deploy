import Swal from "sweetalert2";

export const handleSubmit = async (e: React.FormEvent, setRefresh: (value: boolean | ((prevValue: boolean) => boolean)) => void) => {
  e.preventDefault();

  const form = e.currentTarget as HTMLFormElement;
  const unit = form.unit.value;
  
  
  console.log(unit);
  try {
    const response = await fetch("/api/create-unit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ unit }),
    });

    const data = await response.json();
    if (data.status === 200) {
      Swal.fire({
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
      setRefresh((prev) => !prev);
    } else {
      Swal.fire({
        icon: "error",
        title: "บันทึกข้อมูลไม่สำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "บันทึกข้อมูลไม่สำเร็จ",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};