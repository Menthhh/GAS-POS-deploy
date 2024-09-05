import Image from 'next/image'

interface DeleteSelectedFormProps {
    setIsShowDeleteOne: (value: boolean) => void;
    setDeleteOneConfirm: (value: boolean) => void;
    selectedItems: any;
}

const DeleteSelectedForm = ({
    setIsShowDeleteOne,
    setDeleteOneConfirm,
    selectedItems
}: DeleteSelectedFormProps) => {

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="bg-[#F5F5F5] p-4 rounded-3xl z-50 w-[544px] h-[291px] flex flex-col relative">
                <div className="absolute right-4">
                    <Image
                        src="/images/close.png"
                        alt="Close"
                        width={8}
                        height={8}
                        className="cursor-pointer size-8"
                        onClick={() => setIsShowDeleteOne(false)}
                    />
                </div>
                <div className="flex flex-col mt-2 justify-start items-center gap-7">
                    <div>
                        <Image
                            src="/images/delete_one_modal.png"
                            width={300}
                            height={300}
                            alt="delet one text"
                        />
                    </div>
                    <p className="text-center text-2xl text-extra">ลบ {selectedItems.length} รายการ ที่เลือก?</p>
                    <div className="flex justify-center gap-12 mt-4">
                        <button className="bg-[#0059AB] text-white w-[148px] h-[57px] rounded-lg font-bold text-2xl hover:bg-white hover:text-primary hover:ring-1 hover:ring-primary"
                            onClick={() => setDeleteOneConfirm(true)}
                        >ตกลง</button>
                        <button className="bg-[#F62626] text-white  w-[148px] h-[57px] rounded-lg font-bold text-2xl hover:bg-white hover:text-primary hover:ring-1 hover:ring-primary"
                            onClick={() => setIsShowDeleteOne(false)}
                        >ยกเลิก</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DeleteSelectedForm;