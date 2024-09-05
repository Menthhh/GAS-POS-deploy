import Image from 'next/image';

interface DeleteAllFormProps {
    setIsShowDeleteAll: (value: boolean) => void;
    setDeleteAllConfirm: (value: boolean) => void;
    rows: any;
}

const DeleteAllForm = ({
    setIsShowDeleteAll,
    setDeleteAllConfirm,
    rows
}: DeleteAllFormProps) => {


    return (

        <div className="bg-[#F5F5F5] p-4 rounded-3xl z-50 w-[544px] h-[291px] flex flex-col relative">
            <div className="absolute right-4">
                <Image
                    src="/images/close.png"
                    alt="Close"
                    width={8}
                    height={8}
                    className="cursor-pointer size-8"
                    onClick={() => setIsShowDeleteAll(false)}
                />
            </div>
            <div className="flex flex-col mt-2 justify-start items-center gap-7">
                <div>
                    <Image
                        src="/images/delete_modal.png"
                        alt="delet all text"
                        width={400}
                        height={400}
                    />
                </div>
                <p className="text-center text-2xl text-extra">ลบ {rows.length} รายการ ทั้งหมด?</p>
                <div className="flex justify-center gap-12 mt-4">
                    <button className="bg-[#0059AB] text-white w-[148px] h-[57px] rounded-lg font-bold text-2xl hover:bg-white hover:text-primary hover:ring-1 hover:ring-primary"
                        onClick={() => setDeleteAllConfirm(true)}
                    >ตกลง</button>
                    <button className="bg-[#F62626] text-white  w-[148px] h-[57px] rounded-lg font-bold text-2xl hover:bg-white hover:text-primary hover:ring-1 hover:ring-primary"
                        onClick={() => setIsShowDeleteAll(false)}
                    >ยกเลิก</button>
                </div>
            </div>
        </div>

    )
};

export default DeleteAllForm;