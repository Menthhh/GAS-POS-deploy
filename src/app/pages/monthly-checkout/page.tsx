'use client'
import Layout from "@/components/Layout";
import Select from "react-select";
import Image from "next/image";

const Page = () => {

  return (
    <Layout currentPage="ปิดประจำเดือน" subPage="ปิดประจำเดือน">
      <div className="h-full w-full flex flex-col mt-3 gap-1 font-ibm-plex-sans-thai">
        <div className="h-full w-full mx-auto flex flex-col ">
          <div className="translate-y-3 -z-50 w-64 h-20 bg-white rounded-t-2xl flex justify-center items-center text-xl font-bold font-ibm-plex-sans-thai text-textPrimary border-2 border-outlined shadow-lg">
            ปิดประจำเดือน
          </div>

          <div
            className=" tableShow gap-32 border-t-2 border-outlined bg-white px-4 rounded-2xl flex flex-col py-14 justify-center items-center"
            style={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="flex gap-10">
              <span className="flex justify-center items-center gap-5">
                <h1 className="text-extra font-bold text-lg flex-1 whitespace-nowrap"> ปี </h1>
                <input type="text" className="text-black h-10 border-2 border-outlined rounded-lg px-2" placeholder="ปี" />
              </span>

              <span className="flex w-full justify-center items-center gap-5">
                  <h1 className="text-extra font-bold text-lg"> เดือน </h1>
                  <div className="relative ">
                    <Select
                      isSearchable={true}
                      placeholder="เดือน"
                      noOptionsMessage={() => "ไม่พบเดือน"}
                      className="text-secondary w-64 h-8 font-ibm-plex-sans-thai cursor-pointer"
                      classNamePrefix="react-select"
                    
                    />
                  </div>
              </span>
              <span className="flex justify-center items-center gap-5">
                <h1 className="text-extra font-bold text-lg flex-1 whitespace-nowrap"> จำนวน </h1>
                <input type="text" className="text-black h-10 border-2 border-outlined rounded-lg px-2" placeholder="จำนวน" />
              </span>
            </div>

            <button className="bg-white flex items-center justify-center gap-4 border-2 p-10 rounded-xl border-primary shadow-lg hover:shadow-2xl ">
            <Image
               src="/images/FDbtn.png"
               width={50}
               height={50}
               />
             <div className="text-primary text-2xl font-bold  ">โอนข้อมูลสิ้นเดือน</div>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
