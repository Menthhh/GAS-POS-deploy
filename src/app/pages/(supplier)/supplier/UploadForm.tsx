import FileDownloadIcon from "@mui/icons-material/FileDownload";
import upload from "@/../public/images/upload.png";
import close from "@/../public/images/close.png";
import Image from "next/image";
import { useState } from "react";
import Swal from "sweetalert2";

interface UploadFormProps {
  setRefresh: any;
  setIsShowUpload: any;
  handSubmitCSV: any;
}

const UploadForm = ({
  setRefresh,
  setIsShowUpload,
  handSubmitCSV,
}: UploadFormProps) => {
  const [fileName, setFileName] = useState("");
  const [body, setBody] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = function (e) {
        const data = e.target.result;
        parseCSV(data);
      };
      reader.readAsText(file);
    } else {
      alert("Please select a CSV file.");
    }
  };

  const parseCSV = (csvData) => {
    console.log("csvData:", csvData);
    const rows = [];
    csvData
      .split("\n") // Split CSV data by lines
      .slice(1) // Skip the header row
      .forEach((row) => {
        const columns = row.split(",").map((column) => column.trim()); // Split each row by comma and trim whitespace
        if (columns[columns.length - 1] === "") {
          columns.pop();
        }
        const [
          supplierName,
          supplierContactName,
          supplierAddress,
          supplierPhone,
          supplierTaxId,
        ] = columns;
        const newRow = {
          supplierName,
          supplierContactName,
          supplierAddress,
          supplierPhone,
          supplierTaxId,
        };
        rows.push(newRow);
      });

    // Remove the last element from the array
    rows.pop();

    // Update state with the parsed rows
    setBody(rows);
  };

  // const sendDataToAPI = async () => {
  //   console.log("body:", body);
  //   if (body.length === 0) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "กรุณาเลือกไฟล์",
  //       showConfirmButton: true,
  //     });
  //     return;
  //   }

  //   try {
  //     const res = await fetch("/api/supplier/create-supplier-csv", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ suppliers: body }),
  //     });

  //     if (res.ok) {
  //       setRefresh((prev) => !prev);
  //       setIsShowUpload(false);
  //       Swal.fire({
  //         icon: "success",
  //         title: "อัพโหลดไฟล์สำเร็จ",
  //         showConfirmButton: true,
  //       });
  //     } else {
  //       console.error("Failed to upload CSV file");
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "กรุณากรอกข้อมูลให้ครบ",
  //       showConfirmButton: true,
  //     });
  //   }
  // };

  const handleDrop = (event) => {
    event.preventDefault(); // Prevent default behavior
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "text/csv") {
      setFileName(droppedFile.name);
      const reader = new FileReader();
      reader.onload = function (e) {
        const data = e.target.result;
        parseCSV(data);
      };
      reader.readAsText(droppedFile);
    } else {
      alert("Please drop a CSV file.");
    }
  };

  const toggleUpload = () => {
    //remove  file
    setFileName("");
    setIsShowUpload((prev) => !prev);
  };

  return (
    <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <div className="bg-[#F5F5F5] px-14 py-5 rounded-[50px] flex flex-col items-center font-ibm-plex-sans-thai">
        <div className="absolute right-8 z-200 top-4">
          <Image
            src={close}
            alt="Close"
            className="cursor-pointer"
            onClick={toggleUpload}
          />
        </div>
        <div className="flex flex-col mt-12 items-center gap-5 -translate-y-8">
          <Image src={upload} alt="Upload" width={202.22} className="" />
          <div className="flex items-center border-2 border-secondary rounded-2xl py-3 px-12 gap-3">
            <h1 className="text-extra"> ดาวน์โหลด</h1>
            <a
              href="/csv-files/supplier.csv"
              download
              className="bg-[#001C64] ring-1 ring-[#0C487F] text-white rounded-lg hover:bg-white hover:text-primary hover:ring-1 hover:ring-primary py-1 px-4"
            >
              ไฟล์ตัวอย่าง
            </a>
            <h1 className="text-extra">เพื่ออัปโหลดไฟล์ </h1>
          </div>
          <div className="flex flex-col gap-8">
            <div className="h-[205px] w-[508px] bg-[#CDE7FF] flex flex-col justify-center items-center gap-3 rounded-2xl">
              <FileDownloadIcon className="text-black-800 text-4xl" />
              <p className="text-xl">Drop CSV file or click to upload</p>
            </div>
            <label
              htmlFor="file-upload"
              className="relative h-[50px] bg-white border-[1px] border-[#878787] text-center cursor-pointer flex items-center justify-center rounded-lg w-full transition-colors duration-300"
              style={{ boxShadow: "inset 1px 1px 6px 0px rgba(0, 0, 0, 0.2)" }}
            >
              <span className="absolute left-4 bg-white ring-1 ring-black text-primary px-5 rounded-lg shadow-lg">
                เลือกไฟล์
              </span>
              <span className="text-left">
                {fileName ? fileName : "ไม่มีไฟล์ที่เลือกไว้"}
              </span>
            </label>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <button
            className="bg-[#0059AB] text-white w-[148px] h-[57px] rounded-lg font-bold text-2xl hover:bg-white hover:text-primary hover:ring-1 hover:ring-primary mt-4"
            onClick={() => handSubmitCSV(body)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
