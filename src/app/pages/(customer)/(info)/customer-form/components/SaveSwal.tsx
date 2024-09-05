import Swal from "sweetalert2";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export const saveSwal = (router: AppRouterInstance) => {
  return new Promise<void>((resolve) => {
    Swal.fire({
      icon: "success",
      title: "บันทึกข้อมูลสำเร็จ",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "เพิ่มข้อมูลต่อ",
      cancelButtonText: "กลับไปหน้าลูกค้า",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      reverseButtons: true,
      footer: '<p style="color: #666; font-size: 0.8em; text-align: center;">ในกรณีที่อยู่จัดส่งเดียวกับที่อยู่สถานประกอบการ จะต้องกดบันทึกใหม่ในหน้าที่อยู่จัดส่ง</p>',
      didOpen: (popup) => {
        const footer = popup.querySelector('.swal2-footer');
        if (footer) {
          footer.style.marginTop = '20px';
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        resolve();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        router.replace("/pages/customer");
      }
    });
  });
};