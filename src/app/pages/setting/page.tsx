"use client";
import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";


const Page = () => {


    return (
        <Layout currentPage="หน้าหลัก" subPage="ตั้งค่า">
            <main className="flex justify-center items-center h-full w-full">

                <div className="flex flex-row gap-12">
                    <div className="flex flex-col gap-12">
                        <Link href="/pages/company-information" className="bg-white w-[476px] h-[322px] rounded-[50px] shadow-lg hover:drop-shadow-lg cursor-pointer flex flex-col justify-center items-end">

                            <div className="flex flex-col gap-3 items-center mr-8">
                                <p className="text-primary font-bold text-[36px]">ข้อมูลบริษัท</p>
                                <Image src="/images/Company.png" alt="Company" width={182} height={210} />
                            </div>

                        </Link>
                        <Link href="/pages/product-type" className="bg-white w-[476px] h-[322px] rounded-[50px] shadow-lg hover:drop-shadow-lg cursor-pointer flex flex-col justify-center items-end">
                            <div className="flex flex-col gap-3 items-center mr-8">
                                <p className="text-primary font-bold text-[36px]">กำหนดค่าเริ่มต้น</p>
                                <Image src="/images/Gear.png" alt="Company" width={182} height={210} />
                            </div>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-12">
                        <div className="flex flex-col gap-12">
                            <Link href="/pages/role-determiner" className="bg-white w-[476px] h-[322px] rounded-[50px] shadow-lg hover:drop-shadow-lg cursor-pointer flex flex-col justify-center items-end">
                                <div className="flex flex-col gap-3 items-center mr-8">
                                    <p className="text-primary font-bold text-[36px]">จัดการสิทธิพนักงาน</p>
                                    <Image src="/images/People.png" alt="Company" width={182} height={210} />
                                </div>
                            </Link>
                            <Link href="/pages/bank-setting" className="bg-white w-[476px] h-[322px] rounded-[50px] shadow-lg hover:drop-shadow-lg cursor-pointer flex flex-col justify-center items-end">
                                <div className="flex flex-col gap-3 items-center mr-8">
                                    <p className="text-primary font-bold text-[36px]">บัญชีธนาคาร</p>
                                    <Image src="/images/BankCards.png" alt="Company" width={182} height={210} />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}

export default Page; 
