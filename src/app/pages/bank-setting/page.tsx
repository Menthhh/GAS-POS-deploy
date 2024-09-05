"use client";
import Layout from "@/components/Layout";
import Image from "next/image";
import excel from "@/../public/images/excel.png";
import add from "@/../public/images/add.png";
import CustomeTable from "@/components/CustomTable";
import search from "@/../public/images/search.png";
import customerInfoLogo from "@/../public/images/customerInfoLogo.png";

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
import useFetchBankAccount from "@/hooks/useFetchBankAccount";
import BankFormEdit from "./EditForm";


const columnWidths = [
    "50px",
    "50px",
    "100px",
    "150px",
    "100px",
    "100px",
    "100px",
    "200px"
]

const searchColumns = [1, 2, 3];

const startColumns = [3];

const searchQuery = "";

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
    const { bankAccounts, loading: loadingAccounts, error: errorAccounts } = useFetchBankAccount(refresh);
    const [isShowUpload, setIsShowUpload] = useState(false);
    const [isShowForm, setIsShowForm] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const [isShowDeleteOne, setIsShowDeleteOne] = useState(false);
    const [isShowDeleteAll, setIsShowDeleteAll] = useState(false);
    const [deleteOneconfirm, setDeleteOneConfirm] = useState(false);
    const [deleteAllconfirm, setDeleteAllConfirm] = useState(false);

    const [isShowEditForm, setIsShowEditForm] = useState(false);
    const [editData, setEditData] = useState({});


    useEffect(() => {
        if (deleteOneconfirm) {
            setSelectedItems([]);
            setDeleteOneConfirm(false);
            handleDeleteOne();
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach((checkbox) => {
                (checkbox as HTMLInputElement).checked = false;
            });;

        } else if (deleteAllconfirm) {
            setSelectedItems([]);
            setDeleteAllConfirm(false);
            handleDeleteAll();
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
        console.log(e.target.value);
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
            const response = await fetch('/api/delete-all-accounts', {
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
            const response = await fetch('/api/delete-account', {
                method: 'DELETE',
                body: JSON.stringify({ accountId: selectedItems }),
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

    const handleDelete = async (accountId: string) => {
        console.log(accountId);
        try {
            const response = await fetch('/api/delete-account', {
                method: 'DELETE',
                body: JSON.stringify({ accountId: [accountId] }),
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

    const handleSelect = (accountId: string) => {
        if (selectedItems.includes(accountId)) {
            setSelectedItems(prev => prev.filter(item => item !== accountId));
        } else {
            setSelectedItems(prev => [...prev, accountId]);
        }
    }

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
                        setSelectedItems(bankAccounts.map((bankAccount) => bankAccount.ACCOUNT_ID));
                    } else {
                        setSelectedItems([]);
                    }
                }}
                checked={selectedItems.length === bankAccounts.length}
            />,
            "ลำดับที่",
            "ธนาคาร",
            "เลขที่บัญชี",
            "สาขา",
            "ประเภท",
            ""
        ],
        rows: bankAccounts.map((account, index) => [
            <input
                type="checkbox"
                onChange={() => handleSelect(account.ACCOUNT_ID)}
            />,
            index + 1,
            account.BANK_NAME,
            account.ACCOUNT_ID,
            account.LOCATION,
            account.ACCOUNT_TYPE,

            <div className="flex gap-8  justify-center">
                <EditButton
                    label="แก้ไข"
                    onClick={() => handleEdit(account)}
                />
                <RemoveButton
                    label="ลบ"
                    onClick={() => handleDelete(account.ACCOUNT_ID)}
                />
            </div>
        ])
    }

    const handleEdit = (item:any) => {
        setIsShowForm(false);
        setEditData(() => item);
        setIsShowEditForm((prevState) => !prevState); // Toggle the edit form visibility
    };
    return (
        <Layout currentPage="การตั้งค่า" subPage="บัญชีธนาคาร">
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
                                <h1 className="text-secondary font-bold text-xl">ข้อมูลพนักงาน</h1>
                            </div>
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
                    <BankForm
                        toggleForm={toggleForm}
                        isShowForm={isShowForm}
                        setRefresh={setRefresh}
                    />
                )}
                {isShowForm && (
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
                )}
                {isShowEditForm && (
                    <>
                        <BankFormEdit
                            toggleForm={toggleEditForm}
                            isShowForm={isShowEditForm}
                            setRefresh={setRefresh}
                            editData={editData}
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
