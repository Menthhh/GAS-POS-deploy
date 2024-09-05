"use client";
import Layout from "@/components/Layout";
import Image from "next/image";
import excel from "@/../public/images/excel.png";
import add from "@/../public/images/add.png";
import CustomeTable from "@/components/CustomTable";
import search from "@/../public/images/search.png";
import customerInfoLogo from "@/../public/images/customerInfoLogo.png";
import UploadForm from "@/app/pages/product/UploadForm";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ProductForm from "./Form";
import EditButton from "@/components/ui/EditButton.tsx";
import RemoveButton from "@/components/ui/RemoveButton.tsx";
import useFetchProducts from "@/hooks/useFetchProducts";
import Swal from "sweetalert2";
import DeleteAllButton from "@/components/ui/DeleteAllButton";
import DeleteSelectedButton from "@/components/ui/DeleteSelectedButton";
import DeleteAllForm from "@/components/DeleteAllForm";
import DeleteSelectedForm from "@/components/DeleteSelectedForm";
import ProductEditForm from "./EditForm";
import useFetchUnitsTypes from "@/hooks/useFetchUnitsTypes";
import ExportCSV from "@/components/ExportCSV";
import useFetchProductCSV from "@/hooks/useFetchProductCSV";

const columnWidths = [
  "50px",
  "50px",
  "50px",
  "100px",
  "150px",
  "100px",
  "100px",
  "100px",
  "100px",
  "100px",
  "200px",
];

const searchColumns = [2,4];
const startColumns = [4];


const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  outline: "none",
};

const Page = () => {
  const [refresh, setRefresh] = useState(false);
  const { products } = useFetchProducts(refresh);
  const { productCSV } = useFetchProductCSV(refresh);
  const { units, types } = useFetchUnitsTypes(refresh);
  const [isShowUpload, setIsShowUpload] = useState(false);
  const [isShowForm, setIsShowForm] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [isShowDeleteOne, setIsShowDeleteOne] = useState(false);
  const [isShowDeleteAll, setIsShowDeleteAll] = useState(false);
  const [deleteOneconfirm, setDeleteOneConfirm] = useState(false);
  const [deleteAllconfirm, setDeleteAllConfirm] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [isShowEditForm, setIsShowEditForm] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (deleteOneconfirm) {
      setSelectedItems([]);
      setDeleteOneConfirm(false);
      handleDeleteOne();
      //uncheck all checkboxes
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
         (checkbox as HTMLInputElement).checked = false;
      });
    } else if (deleteAllconfirm) {
      setDeleteAllConfirm(false);
      handleDeleteAll();
      setSelectedItems([]);
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
         (checkbox as HTMLInputElement).checked = false;
      });
    }
  }, [deleteOneconfirm, deleteAllconfirm]);

  const openDeleteOne = () => {
    setIsShowDeleteOne(true);
  };

  const closeDeleteOne = () => {
    setIsShowDeleteOne(false);
  };

  const openDeleteAll = () => {
    setIsShowDeleteAll(true);
  };

  const closeDeleteAll = () => {
    setIsShowDeleteAll(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleUpload = () => {
    setIsShowUpload((prev) => !prev);
  };

  const toggleForm = () => {
    setIsShowForm((prev) => !prev);
    if (!isShowForm) {
      setIsShowEditForm(false);
    }
  };

  const toggleEditForm = () => {
    setIsShowEditForm((prev) => !prev);
    if (!isShowEditForm) {
      setIsShowForm(false);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const response = await fetch("/api/delete-all-products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        closeDeleteAll();
        setSelectedItems([]);
        Swal.fire({
          icon: "success",
          title: "ลบสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
        setRefresh((prev) => !prev);
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
           (checkbox as HTMLInputElement).checked = false;
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "ลบไม่สำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "ลบไม่สำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleDeleteOne = async () => {
    try {
      const response = await fetch("/api/delete-product", {
        method: "DELETE",
        body: JSON.stringify({ productID: selectedItems }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        closeDeleteOne();
        setSelectedItems([]);
        Swal.fire({
          icon: "success",
          title: "ลบสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
        setRefresh((prev) => !prev);
      } else {
        Swal.fire({
          icon: "error",
          title: "ลบไม่สำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "ลบไม่สำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleDelete = async (productID: string) => {
    try {
      const response = await fetch("/api/delete-product", {
        method: "DELETE",
        body: JSON.stringify({ productID: [productID] }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setRefresh((prev) => !prev);
        Swal.fire({
          icon: "success",
          title: "ลบสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "ลบไม่สำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "ลบไม่สำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleSelect = (productID: string) => {
    if (selectedItems.includes(productID)) {
      setSelectedItems((prev) => prev.filter((item) => item !== productID));
    } else {
      setSelectedItems((prev) => [...prev, productID]);
    }
  };

  const data = {
    headers: [
      <input
        type="checkbox"
        onChange={(e) => {
          const checkboxes = document.querySelectorAll(
            'input[type="checkbox"]'
          );
          checkboxes.forEach((checkbox) => {
             (checkbox as HTMLInputElement).checked = e.target.checked;
          });
          if (e.target.checked) {
            setSelectedItems(products.map((product) => product.P_ID));
          } else {
            setSelectedItems([]);
          }
        }}
        checked={selectedItems.length === products.length}
      />,
      "ลำดับ",
      "รหัส",
      "รูป",
      "ชื่อ",
      "ประเภท",
      "หน่วย",
      "สถานะ",
      "ราคาขายปลีก",
      "ราคาขายส่ง",
      "",
    ],
    rows: products.map((item, index) => [
      <input type="checkbox" onChange={() => handleSelect(item.P_ID)} />,
      index + 1,
      item.P_ID,
      <div className="flex justify-center items-center">
        <div className="w-8 h-8 flex justify-center items-center rounded-full overflow-hidden border-2 border-black">
          <img src={item.P_IMAGE} alt="" className="w-full h-full object-cover" />
        </div>
      </div>,
      item.P_NAME,
      item.P_TYPE,
      item.P_UNIT,
      <span
        className={
          item.P_STATUS === "ใช้งานอยู่" ? "text-[#07DE29]" : "text-[#F62626]"
        }
      >
        {item.P_STATUS}
      </span>,
      item.RETAIL_PRICE,
      item.WHOLE_PRICE,
      <div className="flex gap-8 justify-center">
        <EditButton label="แก้ไข" onClick={() => handleEdit(item)} />
        <RemoveButton label="ลบ" onClick={() => handleDelete(item.P_ID)} />
      </div>,
    ]),
  };

  const handleEdit = (item:any) => {
    setIsShowForm(false);
    setEditData(() => item);
    setIsShowEditForm((prevState) => !prevState); // Toggle the edit form visibility
  };

  const handSubmitCSV = async (products) => {
    console.log(products);

    try {
      const response = await fetch("/api/submit-product-csv", {
        method: "POST",
        body: JSON.stringify({ products }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "นำเข้าสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
        setRefresh((prev) => !prev);
        setIsShowUpload(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "นำเข้าไม่สำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "นำเข้าไม่สำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  console.log(productCSV);
  return (
    <Layout currentPage="ข้อมูลสินค้า" subPage="ข้อมูลสินค้า">
      <div className="h-full w-full flex mt-5 gap-2 ">
        <div className="h-full w-full mx-auto flex flex-col gap-6">
          <div className="flex flex-col justify-center items-center gap-10">
            <div className="flex justify-center gap-24 pt-6 text-textExtra">
              <div className="flex flex-col gap-4 justify-center items-center">
                <div
                  className="bg-white hover:drop-shadow-xl cursor-pointer shadow-lg w-[80px] h-[80px] rounded-2xl border-solid border-primary border-4 flex justify-center items-center "
                  onClick={toggleForm}
                >
                  <Image src={add} width={50} height={50} alt="" />
                </div>
                <p className="font-bold">เพิ่มข้อมูล</p>
              </div>
              <div
                className="flex flex-col gap-4 justify-center items-center"
                onClick={toggleUpload}
              >
                <div className="bg-white hover:drop-shadow-xl cursor-pointer shadow-lg w-[80px] h-[80px] rounded-2xl border-solid border-primary border-4 flex justify-center items-center ">
                  <Image src={excel} width={50} height={50} alt="" />
                </div>
                <p className="font-bold">นำเข้าไฟล์ Excel</p>
              </div>
            </div>
            <div className="relative flex items-center gap-6">
              <h1 className="text-extra font-bold text-2xl">ค้นหาสินค้า</h1>
              <input
                type="text"
                className="w-[350px] rounded-2xl ring-1 ring-[#878787] border-none py-2 px-3 focus:ring-primary focus:ring-2 "
                placeholder="ค้นหา"
                onChange={(e) => handleSearch(e)}
              />
              <Image
                src={search}
                width={50}
                height={50}
                alt="Search"
                className="absolute right-0 -top-1 mt-2 mr-3 size-[25px] cursor-pointer"
              />
            </div>
          </div>
          <div
            className="tableShow bg-white px-4 h-full rounded-2xl flex flex-col py-5"
            style={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="flex justify-between items-center gap-4 px-2">
              <div className="flex justify-between items-center gap-4 ">
                <Image
                  src={customerInfoLogo}
                  width={50}
                  height={50}
                  alt="Customer Info"
                  className="object-cover size-[50px]"
                />
                <h1 className="text-secondary font-bold text-xl">
                  ข้อมูลสินค้าทั้งหมด
                </h1>
              </div>
              <ExportCSV 
                data= {productCSV}
                fileName="ข้อมูลสินค้า"
                label="นำออกไฟล์ (Excel)"
              />
            </div>
            <CustomeTable
              data={data}
              columnWidths={columnWidths}
              searchQuery={searchQuery}
              searchColumns={searchColumns}
              startColumns={startColumns}
            />
            {selectedItems.length > 0 && (
              <div className="buttomPanel flex gap-8 justify-center items-center -translate-y-8">
                <DeleteAllButton onClick={openDeleteAll} />
                <DeleteSelectedButton onClick={openDeleteOne} />
              </div>
            )}
          </div>
        </div>
        {isShowForm && (
          <>
            <ProductForm
              toggleForm={toggleForm}
              isShowForm={isShowForm}
              setRefresh={setRefresh}
              units={units}
              types={types}
            />
            <div className="absolute top-0 right-2 p-2">
              <Image
                src="/images/cancel.png"
                alt="cancel"
                className="cursor-pointer"
                width={30}
                height={30}
                onClick={toggleForm}
              />
            </div>
          </>
        )}
        {isShowEditForm && (
          <>
            <ProductEditForm
              toggleForm={toggleEditForm}
              isShowForm={isShowEditForm}
              setRefresh={setRefresh}
              editData={editData}
              units={units}
              types={types}
            />
            <div className="absolute top-0 right-2 p-2">
              <Image
                src="/images/cancel.png"
                alt="cancel"
                className="cursor-pointer"
                width={30}
                height={30}
                onClick={toggleEditForm}
              />
            </div>
          </>
        )}
      </div>
      <Modal open={isShowUpload} onClose={toggleUpload}>
        <Box sx={style}>
          <UploadForm
            setRefresh={setRefresh}
            setIsShowUpload={setIsShowUpload}
            handSubmitCSV={handSubmitCSV}
          />
        </Box>
      </Modal>
      <Modal open={isShowDeleteAll} onClose={closeDeleteAll}>
        <Box sx={style}>
          <DeleteAllForm
            setIsShowDeleteAll={setIsShowDeleteAll}
            setDeleteAllConfirm={setDeleteAllConfirm}
            rows={data.rows}
          />
        </Box>
      </Modal>
      <Modal open={isShowDeleteOne} onClose={closeDeleteOne}>
        <Box sx={style}>
          <DeleteSelectedForm
            setIsShowDeleteOne={setIsShowDeleteOne}
            setDeleteOneConfirm={setDeleteOneConfirm}
            selectedItems={selectedItems}
          />
        </Box>
      </Modal>
    </Layout>
  );
};

export default Page;
