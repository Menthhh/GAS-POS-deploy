import Swal from "sweetalert2";

export const handleSubmit = async (e: React.FormEvent, setRefresh: (value: boolean | ((prevValue: boolean) => boolean)) => void) => {
  e.preventDefault();

  const form = e.currentTarget as HTMLFormElement;
  const accountNumber = form.accountNumber.value;
  const bankName = form.bankName.value;
  const location = form.location.value;
  const accountType = form.accountType.value;

  try {
    const response = await fetch("/api/create-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accountNumber, bankName, location, accountType }),
    });

    const data = await response.json();
    console.log("data", data)
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
        title: data.error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error:any) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: error.error,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
