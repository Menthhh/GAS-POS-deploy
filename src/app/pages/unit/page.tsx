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
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';
import BankForm from "./Form";
import EditButton from "@/components/ui/EditButton";
import RemoveButton from "@/components/ui/RemoveButton";

import Swal from "sweetalert2";
import DeleteAllButton from "@/components/ui/DeleteAllButton";
import DeleteSelectedButton from "@/components/ui/DeleteSelectedButton";
import DeleteAllForm from "@/components/DeleteAllForm";
import DeleteSelectedForm from "@/components/DeleteSelectedForm";
import Link from "next/link";
import UnitForm from "./Form";
import UnitEditForm from "./Edit";
import useFetchUnits from "@/hooks/useFetchUnits";



const columnWidths = [
    "50px",
    "50px",
    "100px",
    "150px",
    "100px"
]

const searchColumns = [1, 2, 3];


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    outline: 'none',
};

const Page = () => {
    const [refresh, setRefresh] = useState(false);
    const { units, isLoading } = useFetchUnits(refresh);
    const [isShowUpload, setIsShowUpload] = useState(false);
    const [isShowForm, setIsShowForm] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const [isShowDeleteOne, setIsShowDeleteOne] = useState(false);
    const [isShowDeleteAll, setIsShowDeleteAll] = useState(false);
    const [deleteOneconfirm, setDeleteOneConfirm] = useState(false);
    const [deleteAllconfirm, setDeleteAllConfirm] = useState(false);
    const [isSelectAll, setIsSelectAll] = useState(false);

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
            });;

        } else if (deleteAllconfirm) {
            setDeleteAllConfirm(false);
            handleDeleteAll();
            setSelectedItems([]);
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach((checkbox) => {
                (checkbox as HTMLInputElement).checked = false;
            });;
        }
    }, [deleteOneconfirm, deleteAllconfirm]);


    const openDeleteOne = () => {
        setIsShowDeleteOne(true);
    }

    const closeDeleteOne = () => {
        setIsShowDeleteOne(false);
    }

    const openDeleteAll = () => {
        setIsShowDeleteAll(true);
    }

    const closeDeleteAll = () => {
        setIsShowDeleteAll(false);
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }

    const toggleUpload = () => {
        setIsShowUpload(prev => !prev);
    }


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
            const response = await fetch('/api/delete-all-units', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                closeDeleteAll();
                setSelectedItems([]);
                Swal.fire({
                    icon: 'success',
                    title: 'ลบสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                });
                setRefresh(!refresh);
                setSelectedItems([]);
                const checkboxes = document.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach((checkbox) => {
                     (checkbox as HTMLInputElement).checked = false;
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'ลบไม่สำเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'ลบไม่สำเร็จ',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const handleDeleteOne = async () => {
        try {
            const response = await fetch('/api/delete-unit', {
                method: 'DELETE',
                body: JSON.stringify({ unit: selectedItems }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                closeDeleteOne();
                setSelectedItems([]);
                Swal.fire({
                    icon: 'success',
                    title: 'ลบสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                });
                setRefresh(prev => !prev);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'ลบไม่สำเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'ลบไม่สำเร็จ',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const handleDelete = async (unitId: string) => {
        try {
            const response = await fetch('/api/delete-unit', {
                method: 'DELETE',
                body: JSON.stringify({ unit: [unitId] }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                setRefresh(prev => !prev);
                Swal.fire({
                    icon: 'success',
                    title: 'ลบสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'ลบไม่สำเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                })
            }

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'ลบไม่สำเร็จ',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const handleSelect = (unitId: string) => {
        if (selectedItems.includes(unitId)) {
            setSelectedItems(prev => prev.filter(item => item !== unitId));
        } else {
            setSelectedItems(prev => [...prev, unitId]);
        }
    }

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setIsSelectAll(isChecked);
        if (isChecked) {
            const allIds = units.map(item => item.U_ID);
            setSelectedItems(allIds);
        } else {
            setSelectedItems([]);
        }

    };


    const data = {
        headers: [<input type="checkbox" onChange={handleSelectAll} checked={isSelectAll} />, "ลำดับที่", "รหัส", "ชื่อ", ""],
        rows: units.map((item, index) => [
            <input
                type="checkbox"
                checked={selectedItems.includes(item.U_ID)}
                onChange={() => handleSelect(item.U_ID)}
            />,
            index + 1,
            item.U_ID,
            item.U_NAME,
            <div className="flex gap-8 justify-center">
                <EditButton
                    label="แก้ไข"
                    onClick={() => handleEdit(item)}
                />
                <RemoveButton
                    label="ลบ"
                    onClick={() => handleDelete(item.U_ID)}
                />
            </div>
        ])
    };

    const handleEdit = (item: any) => {
        setIsShowForm(false);
        setEditData(item);
        setIsShowEditForm((prevState) => !prevState); // Toggle the edit form visibility
    };

    return (
        <Layout currentPage="การตั้งค่า > กำหนดค่าเริ่มต้น" subPage="หน่วยนับ">
            <div className="h-full w-full flex mt-5 gap-2 ">
                <div className="h-full w-full mx-auto flex flex-col gap-4 ">
                    <div className="flex justify-start items-center gap-4 px-2 -mb-6 -translate-x-2 ">
                        <Link href="/pages/product-type"
                            className="text-primary font-bold text-xl bg-white w-[200px] border-[1px] border-[#C6C6C6] h-[50px] rounded-t-2xl flex justify-center items-center hover:drop-shadow-lg cursor-pointer hover:bg-primary hover:text-white"
                        >
                            <h1>
                                ประเภทสินค้า
                            </h1>
                        </Link>

                        <Link href="#"
                            className="text-white font-bold text-xl bg-primary w-[200px] border-[1px] border-[#878787] h-[50px] rounded-t-2xl flex justify-center items-center hover:drop-shadow-lg cursor-pointer hover:shadow-lg"
                        >
                            <h1>
                                หน่วยนับ
                            </h1>
                        </Link>
                    </div>
                    <div className="buttonShow bg-white flex flex-col justify-center items-center gap-3 py-3 z-10 border-[1px] border-[#E4E4E4]">
                        <div className="flex justify-center gap-24 text-textExtra py-3">
                            <div className="flex flex-col gap-2 justify-center items-center">
                                <div
                                    className="bg-white hover:drop-shadow-xl cursor-pointer shadow-lg w-[80px] h-[80px] rounded-2xl border-solid border-primary border-4 flex justify-center items-center "
                                    onClick={toggleForm}
                                >
                                    <Image src={add} width={50} height={50} alt="" />
                                </div>
                                <p className="font-bold">เพิ่มข้อมูล</p>
                            </div>
                        </div>
                        <div className="relative flex items-center gap-6">
                            <h1 className="text-extra font-bold text-xl">ค้นหาหน่วยนับ</h1>
                            <input type="text" className="w-[350px] rounded-2xl ring-1 ring-[#878787] border-none py-2 px-3 focus:ring-primary focus:ring-2 "
                                placeholder="ค้นหา"
                                onChange={(e) => handleSearch(e)}
                            />
                            <Image src={search} width={50} height={50} alt="Search" className="absolute right-0 -top-[1px] mt-2 mr-3 size-[25px] cursor-pointer" />
                        </div>
                    </div>
                    <div className="tableShow bg-white px-4 h-full rounded-2xl flex flex-col py-5"
                        style={{
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        <div className="flex justify-between items-center gap-4 px-2">
                            <div className="flex justify-between items-center gap-4 ">
                                <Image src={customerInfoLogo} width={50} height={50} alt="Customer Info" className="object-cover size-[50px] " />
                                <h1 className="text-secondary font-bold text-xl">ข้อมูลหน่วยนับ</h1>
                            </div>
                        </div>
                        <CustomeTable
                            data={data}
                            columnWidths={columnWidths}
                            searchQuery={searchQuery}
                            searchColumns={searchColumns}
                        />
                        {selectedItems.length > 0 && (
                            <div className="buttomPanel flex gap-8 justify-center items-center -translate-y-8">
                                <DeleteAllButton
                                    onClick={openDeleteAll}
                                />
                                <DeleteSelectedButton
                                    onClick={openDeleteOne}
                                />
                            </div>
                        )}
                    </div>
                </div>
                {isShowForm && (
                    <UnitForm
                        toggleForm={toggleForm}
                        isShowForm={isShowForm}
                        setRefresh={setRefresh}
                    />
                )}
                {isShowForm && (
                    <div className="absolute top-0 right-2 p-2 z-50">
                        <Image
                            src="/images/cancel.png"
                            alt="cancel"
                            className="cursor-pointer"
                            width={30}
                            height={30}
                            onClick={toggleForm}
                        />
                    </div>
                )}
                {isShowEditForm && (
                    <>
                        <UnitEditForm
                            toggleForm={toggleEditForm}
                            isShowForm={isShowEditForm}
                            setRefresh={setRefresh}
                            editData={editData}
                        />
                        <div className="absolute top-0 right-2 p-2 z-50">
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
            <Modal
                open={isShowUpload}
                onClose={toggleUpload}
            >
                <Box sx={style} >
                    <UploadForm
                        setRefresh={setRefresh}
                        setIsShowUpload={setIsShowUpload}
                    />
                </Box>
            </Modal>

            <Modal
                open={isShowDeleteAll}
                onClose={closeDeleteAll}
            >
                <Box sx={style}>
                    <DeleteAllForm
                        setIsShowDeleteAll={setIsShowDeleteAll}
                        setDeleteAllConfirm={setDeleteAllConfirm}
                        rows={data.rows}
                    />
                </Box>
            </Modal>

            <Modal
                open={isShowDeleteOne}
                onClose={closeDeleteOne}
            >
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
}

export default Page; 
