"use client";

import React, { useState } from 'react';
import Layout from "@/components/Layout";
import { MagnifyingGlassIcon, ArrowPathIcon, BellIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Image from 'next/image';

function Page() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Layout currentPage="งานขาย" subPage="บิลเงินสด">
            <div className="p-6 font-ibm-plex-sans-thai">
                {/* Date and search section */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6 h-[167px] flex flex-col justify-evenly pl-10 pr-20">
                    <div className="flex gap-2 items-center">
                        <AccessTimeFilledIcon className="text-primary" />
                        <p className='text-primary'>พุธ, 01 มิถุนายน 2567  15:30:32</p>
                    </div>
                    <div className="flex items-center gap-4 w-full">
                        <div className="flex gap-2 items-center flex-1">
                            <p className="text-secondary whitespace-nowrap">วันที่ :</p>
                            <input
                                type="text"
                                placeholder="ว/ด/ป"
                                className="border border-secondary rounded-lg pl-3 pr-4 py-2 w-full"
                            />
                        </div>
                        <div className="flex gap-2 items-center flex-1">
                            <p className="text-secondary whitespace-nowrap">ลูกค้า :</p>
                            <input
                                type="text"
                                placeholder="กรอกรหัสสมาชิก"
                                className="border border-secondary rounded-lg pl-3 pr-4 py-2 w-full"
                            />
                        </div>
                        <div className="flex gap-2 items-center flex-[2]">
                            <p className="text-secondary whitespace-nowrap">ชื่อ :</p>
                            <input
                                type="text"
                                placeholder="กรอกชื่อลูกค้า"
                                className="border border-secondary rounded-lg pl-3 pr-4 py-2 w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Main content area */}
                <div className="flex space-x-6 h-full">
                    {/* Left side: Search and results */}
                    <div className="w-3/4 h-full flex flex-col">
                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="ค้นหาสินค้าที่ต้องการขายได้ที่นี่"
                                className="w-full border rounded-lg pl-10 pr-4 py-2"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>

                        <div className="bg-white rounded-lg shadow-md flex-1 flex flex-col justify-center items-center flex-grow">
                            <Image src="/path-to-box-icon.png" alt="Empty Box" width={64} height={64} className="mb-4" />
                            <p className="text-gray-500">ไม่พบรายการ</p>
                        </div>
                    </div>

                    {/* Right side: Action buttons */}
                    <div className="w-1/4 space-y-4">
                        <button className="w-full text-4xl font-extrabold border-2 border-primary bg-white text-primary py-8 rounded-lg shadow-md hover:shadow-xl">ประวัติการขาย</button>
                        <button className="w-full text-4xl font-extrabold border-2 border-primary bg-white text-primary py-8 rounded-lg shadow-md hover:shadow-xl">พักบิล</button>
                        <button className="w-full text-4xl font-extrabold border-2 border-primary bg-white text-primary py-8 rounded-lg shadow-md hover:shadow-xl">เรียกบิลคืน</button>
                        <button className="w-full text-4xl font-extrabold border-2 border-primary bg-white text-primary py-8 rounded-lg shadow-md hover:shadow-xl">เคลียร์รายการทั้งหมด</button>
                        <div className="flex justify-between gap-2">
                            <button className="hover:shadow-xl w-full font-extrabold text-3xl bg-green-500 text-white py-5 rounded-lg shadow-md">ยืนยัน</button>
                            <button className="hover:shadow-xl w-full font-extrabold text-3xl bg-red-500 text-white py-5 rounded-lg shadow-md">ยกเลิกบิล</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Page;