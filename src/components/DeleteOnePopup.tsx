

interface PropType {
    isShow? : boolean;
    excuteFunction? : any;
    numberOfSelected? : number;
}

const DeleteOnePopup = ({isShow, excuteFunction, numberOfSelected} : PropType) => {
    
    // make background blur when popup is shown
    return (
        <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 ${isShow ? "" : "hidden"}`}>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg z-50">
                <p className="text-center text-lg font-semibold">คุณต้องการลบข้อมูล {numberOfSelected} รายการ ใช่หรือไม่</p>
                <div className="flex justify-center gap-4 mt-4">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={() => excuteFunction(false)}>ยกเลิก</button>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={() => excuteFunction(true)}>ตกลง</button>
                </div>
            </div>
        </div>
    )


}

export default DeleteOnePopup;