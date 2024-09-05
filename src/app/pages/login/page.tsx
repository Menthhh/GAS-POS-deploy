import SignInBg from "@/../public/images/signIn-bg.jpg";
import Image from "next/image";
import logo from "@/../public/images/logo.png";

export default function Sigin() {
  return (
    <div className="flex h- overflow-hidden items-center relative justify-center w-screen h-screen">
      <div className="z-50 absolute left-[200px] top-[120px] ">
        <h1 className=" text-white font-extrabold text-5xl [text-shadow:_4px_0px_0_rgb(0_0_0_/_40%)] font-ibm-plex-sans-thai">โปรแกรมบริหารจัดการ</h1>
        <h1 className="font-outline-4 text-[135px] font-[1000] text-[#0C487F] [text-shadow:_9px_0px_0_rgb(0_0_0_/_40%)]  font-ibm-plex-sans-thai">ร้านแก็ส</h1>
      </div>
      <Image
        src={SignInBg}
        alt="Sign In"
        className=" absolute bottom-0 left-0 w-[1200px] h-[1600px] z-0"
      />

      <div className="bg-gradient-to-b from-[hsla(215,86%,34%,1)] to-[#4398E7] w-[1400px] h-[1400px] -right-1/4 top-1/2 transform -translate-y-1/2 rounded-full absolute"></div>

        <div className="absolute top-[10px] left-[1150px] z-50 flex flex-col justify-center items-center gap-3">
          <Image
            src={logo}
            alt="Logo"
            className="w-[600px] h-[300px] "
          />
          <form action="" className="flex flex-col gap-7 items-center">
          <h1 className="font-outline-2 text-5xl font-bold text-[#0C487F] [text-shadow:_4px_0px_0_rgb(0_0_0_/_80%)]  font-ibm-plex-sans-thai">เข้าสู่ระบบ</h1>
            <span className="flex flex-col">
              <p className="text-white font-extrabold text-xl pl-5 pb-2  font-ibm-plex-sans-thai">ชื่อผู้ใช้</p>
              <input type="text" 
              placeholder="Name"
              className="p-2 w-[500px] rounded-full bg-[#F0F0F0] border-none py-4 px-5" 
              />
            </span>
            <span className="flex flex-col">
              <p className="text-white font-extrabold text-xl pl-5 pb-2  font-ibm-plex-sans-thai">รหัสผ่าน</p>
              <input type="text" 
              placeholder="Password"
              className="p-2 w-[500px] rounded-full bg-[#F0F0F0] border-none py-4 px-5" 
              />
            </span>
            <p className="cursor-pointer self-end px-4 -translate-y-2 text-white underline  font-ibm-plex-sans-thai">ลืมรหัสผ่าน</p>
            <button className="ring ring-white w-1/2 text-white font-medium text-2xl rounded-full py-2 bg-[#0059AB]">
              Login
            </button>
          </form>
        </div>

        <h1 className="">ร้านแก็ส</h1>
      </div>
      );
}
