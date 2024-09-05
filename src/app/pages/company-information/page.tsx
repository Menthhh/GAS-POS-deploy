"use client";
import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";


const Page = () => {


    return (
        <Layout currentPage="การตั้งค่า" subPage="ข้อมูลบริษัท">
            <main className="flex justify-center items-start h-full w-full">
                <div className="bg-white w-full h-4/5 translate-y-10 mx-8 gap-8  rounded-2xl shadow-lg border-[1px] border-[#E4E4E4] flex flex-col pt-5 px-8">
                    <div className="flex items-center" >
                        <div className="bg-[#B1D8FB] p-2 rounded-full  ">
                            <Image src="/images/Office.png" alt="Company" width={50} height={50} />
                        </div>
                        <h1 className="text-secondary font-bold text-lg ml-4">ข้อมูลบริษัท</h1>
                    </div>
                    <form className="flex flex-col gap-6 -translate-x-96 items-end ">
                        <div className="flex gap-5 items-center">
                            <h1 className="text-primary text-lg font-bold">รหัส</h1>
                            <input type="text" className="w-[600px] h-[40px] border-[1px] border-[#878787] rounded-[10px] px-4" 
                            placeholder="รหัส"
                            />
                        </div>
                        <div className="flex gap-5 items-center justify-end">
                            <h1 className="text-primary text-lg font-bold">ชื่อบริษัท</h1>
                            <input type="text" className="w-[600px] h-[40px] border-[1px] border-[#878787] rounded-[10px] px-4" 
                            placeholder="ชื่อบริษัท"
                            />
                        </div>
                        <div className="flex gap-5 items-start justify-end">
                            <h1 className="text-primary text-lg font-bold pt-2">ที่อยู่</h1>
                            <div className="flex flex-col gap-6 items-center justify-end">
                                <input type="text" className="w-[600px] h-[40px] border-[1px] border-[#878787] rounded-[10px] px-4" 
                                placeholder="ที่อยู่"
                                />
                                <input type="text" className="w-[600px] h-[40px] border-[1px] border-[#878787] rounded-[10px] px-4" 
                                placeholder="ที่อยู่"
                                />

                            </div>
                        </div>
                        <div className="flex gap-5 items-center justify-end">
                            <h1 className="text-primary text-lg font-bold">โทรศัพท์</h1>
                            <input type="text" className="w-[600px] h-[40px] border-[1px] border-[#878787] rounded-[10px] px-4" 
                            placeholder="โทรศัพท์"
                            />
                        </div>
                        <div className="flex gap-5 items-center justify-end">
                            <h1 className="text-primary text-lg font-bold">ID LINE</h1>
                            <input type="text" className="w-[600px] h-[40px] border-[1px] border-[#878787] rounded-[10px] px-4" 
                            placeholder="ID LINE"
                            />
                        </div>
                        <div className="flex gap-5 items-center justify-end">
                            <h1 className="text-primary text-lg font-bold">Email</h1>
                            <input type="text" className="w-[600px] h-[40px] border-[1px] border-[#878787] rounded-[10px] px-4" 
                            placeholder="Email"
                            />
                        </div>
                        <div className="flex gap-5 items-center justify-end">
                            <h1 className="text-primary text-lg font-bold">เลขประจำตัวผู้เสียภาษี</h1>
                            <input type="text" className="w-[600px] h-[40px] border-[1px] border-[#878787] rounded-[10px] px-4" 
                            placeholder="เลขประจำตัวผู้เสียภาษี"
                            />
                        </div>
                    </form>


                </div>
            </main>
        </Layout>
    );
}

export default Page; 
