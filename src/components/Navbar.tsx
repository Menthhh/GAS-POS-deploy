"use client";
import Link from "next/link";
import logo from "../../public/images/logo.png";
import Image from "next/image";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InventoryIcon from "@mui/icons-material/Inventory";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CircleIcon from "@mui/icons-material/Circle";
import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface NavbarProps {
  isOpen: boolean;
  CurrentPage: string;
  SubPage: string;
}

const StockSubmenu = ({ isOpen, CurrentPage, SubPage }: NavbarProps) => {
  if (!isOpen) return null;
  return (
    <div className="mt-1 ml-7 flex flex-col gap-1">
      <Link
        href="/pages/stock-inventory"
        className={`flex justify-start items-center gap-3 p-2 hover:rounded-lg hover:bg-[#347EC2] ${
          SubPage === "สต็อกคงเหลือ" ? "bg-[#347EC2] rounded-lg" : ""
        }`}
      >
        <CircleIcon
          className="-translate-y-[2px]"
          sx={{ color: "#B1D8FB", height: "14px" }}
        />
        <p>สต็อกคงเหลือ</p>
      </Link>
      <Link
        href="/pages/check-stock"
        className={`flex justify-start items-center gap-3 p-2 hover:rounded-lg hover:bg-[#347EC2] ${
          SubPage === "ปรับปรุงสินค้า" ? "bg-[#347EC2] rounded-lg" : ""
        }`}
      >
        <CircleIcon
          className="-translate-y-[2px]"
          sx={{ color: "#B1D8FB", height: "14px" }}
        />
        <p>ปรับปรุงสินค้า</p>
      </Link>
      <Link
        href="/pages/receive"
        className={`flex justify-start items-center gap-3 p-2 hover:rounded-lg hover:bg-[#347EC2] ${
          SubPage === "รับสินค้า" ? "bg-[#347EC2] rounded-lg" : ""
        }`}
      >
        <CircleIcon
          className="-translate-y-[2px]"
          sx={{ color: "#B1D8FB", height: "14px" }}
        />
        <p>รับสินค้า</p>
      </Link>
      <Link
        href="/pages/receive-tank"
        className={`flex justify-start items-center gap-3 p-2 hover:rounded-lg hover:bg-[#347EC2] ${
          SubPage === "รับถัง" ? "bg-[#347EC2] rounded-lg" : ""
        }`}
      >
        <CircleIcon
          className="-translate-y-[2px]"
          sx={{ color: "#B1D8FB", height: "14px" }}
        />
        <p>รับถัง</p>
      </Link>
      <Link
        href="/pages/stock-card"
        className={`flex justify-start items-center gap-3 p-2 hover:rounded-lg hover:bg-[#347EC2] ${
          SubPage === "สต็อกการ์ด" ? "bg-[#347EC2] rounded-lg" : ""
        }`}
      >
        <CircleIcon
          className="-translate-y-[2px]"
          sx={{ color: "#B1D8FB", height: "14px" }}
        />
        <p>สต็อกการ์ด</p>
      </Link>
    </div>
  );
};

const SupplierSubmenu = ({ isOpen, CurrentPage, SubPage }: NavbarProps) => {
  if (!isOpen) return null;
  return (
    <div className="mt-1 ml-7 flex flex-col gap-1">
      <Link
        href="/pages/supplier"
        className={`flex justify-start items-center gap-3 p-2 hover:rounded-lg hover:bg-[#347EC2] ${
          SubPage === "ข้อมูลผู้จัดจำหน่าย" ? "bg-[#347EC2] rounded-lg" : ""
        }`}
      >
        <CircleIcon
          className="-translate-y-[2px]"
          sx={{ color: "#B1D8FB", height: "14px" }}
        />
        <p>ข้อมูลผู้จัดจำหน่าย</p>
      </Link>
      <Link
        href="/pages/supplier-history"
        className={`flex justify-start items-center gap-3 p-2 hover:rounded-lg hover:bg-[#347EC2] ${
          SubPage === "ประวัติการซื้อ" ? "bg-[#347EC2] rounded-lg" : ""
        }`}
      >
        <CircleIcon
          className="-translate-y-[2px]"
          sx={{ color: "#B1D8FB", height: "14px" }}
        />
        <p>ประวัติการซื้อ</p>
      </Link>
    </div>
  );
};
const ReportSubmenu = ({ isOpen, CurrentPage, SubPage }: NavbarProps) => {
  if (!isOpen) return null;
  return (
    <div className="mt-3 ml-7 flex flex-col gap-2">
      <Link href="/pages/report?type=receive" className={`flex justify-start items-center gap-3 p-3 hover:rounded-lg hover:bg-[#347EC2] ${SubPage === "รับสินค้า" ? "bg-[#347EC2] rounded-lg" : ""}`}>
        <CircleIcon className="-translate-y-[2px] w-3 h-3" sx={{ color: "#B1D8FB" }} />
        <p>รับสินค้า</p>
      </Link>
      <Link href="/pages/report?type=saleBill" className={`flex justify-start items-center gap-3 p-3 hover:rounded-lg hover:bg-[#347EC2] ${SubPage === "งานขาย" ? "bg-[#347EC2] rounded-lg" : ""}`}>
        <CircleIcon className="-translate-y-[2px] w-3 h-3" sx={{ color: "#B1D8FB" }} />
        <p>งานขาย</p>
      </Link>
      <Link href="/pages/report?type=loanVendor" className={`flex justify-start items-center gap-3 p-3 hover:rounded-lg hover:bg-[#347EC2] ${SubPage === "ใบยืมถัง" ? "bg-[#347EC2] rounded-lg" : ""}`}>
        <CircleIcon className="-translate-y-[2px] w-3 h-3" sx={{ color: "#B1D8FB" }} />
        <p>ใบยืมถัง</p>
      </Link>
      <Link href="/pages/report?type=stockRemain" className={`flex justify-start items-center gap-3 p-3 hover:rounded-lg hover:bg-[#347EC2] ${SubPage === "สต็อกสินค้า" ? "bg-[#347EC2] rounded-lg" : ""}`}>
        <CircleIcon className="-translate-y-[2px] w-3 h-3 " sx={{ color: "#B1D8FB" }} />
        <p>สต็อกสินค้า</p>
      </Link>
      <Link href="/pages/report?type=tax" className={`flex justify-start items-center gap-3 p-3 hover:rounded-lg hover:bg-[#347EC2] ${SubPage === "ภาษีซื้อ" ? "bg-[#347EC2] rounded-lg" : ""}`}>
        <CircleIcon className="-translate-y-[2px] w-3 h-3" sx={{ color: "#B1D8FB" }} />
        <p>ภาษีซื้อ</p>
      </Link>
    </div>
  );
}

const CustomerSubmenu = ({ isOpen, CurrentPage, SubPage }: NavbarProps) => {
  if (!isOpen) return null;
  return (
    <div className="mt-1 ml-7 flex flex-col gap-1">
      <Link
        href="/pages/customer"
        className={`flex justify-start items-center gap-3 p-2 hover:rounded-lg hover:bg-[#347EC2] ${
          SubPage === "ข้อมูลลูกค้า" ? "bg-[#347EC2] rounded-lg" : ""
        }`}
      >
        <CircleIcon
          className="-translate-y-[2px]"
          sx={{ color: "#B1D8FB", height: "14px" }}
        />
        <p>ข้อมูลลูกค้า</p>
      </Link>
      <Link
        href="#"
        className={`flex justify-start items-center gap-3 p-2 hover:rounded-lg hover:bg-[#347EC2] ${
          SubPage === "ประวัติการขาย" ? "bg-[#347EC2] rounded-lg" : ""
        }`}
      >
        <CircleIcon
          className="-translate-y-[2px]"
          sx={{ color: "#B1D8FB", height: "14px" }}
        />
        <p>ประวัติการขาย</p>
      </Link>
    </div>
  );
};

const Navbar = ({ isOpen, CurrentPage, SubPage }: NavbarProps) => {
  const [isSupplierSubmenuOpen, setSupplierSubmenuOpen] = useState(false);
  const [isStockSubmenuOpen, setStockSubmenuOpen] = useState(false);
  const [isCustomerSubmenuOpen, setCustomerSubmenuOpen] = useState(false);
  const [isReportSubmenuOpen, setReportSubmenuOpen] = useState(false);

  return (
    <nav
      className={`z-50 transition-transform duration-500 ease-in-out w-1/6 flex flex-col bg-gradient-to-b from-primary to-end gap-8 shadow-2xl drop-shadow-lg [box-shadow:_0px_0px_12px_rgb(0_0_0_/_40%)] ${
        isOpen ? "block" : "-translate-x-full"
      } overflow-y-auto`}
      id="navBar"
    >
      <div className="h-[80px] bg-[#0C487F] rounded-br-[20px] flex [box-shadow:_0px_4px_0_rgb(0_0_0_/_40%)] drop-shadow-lg shadow-2xl justify-center items-center">
        <Image
          src={logo}
          alt="Logo"
          className=" object-cover h-[80px] w-[220px]"
        />
      </div>
      <div className="flex flex-col gap-2 justify-center items-start ml-6  font-ibm-plex-sans-thai font-bold text-white z-50  mr-6">
        <Link
          href="/pages/setting"
          className={`flex justify-start items-center gap-3 p-3 hover:rounded-lg hover:bg-[#347EC2] relative w-full  ${
            CurrentPage === "หน้าหลัก" ? "bg-[#347EC2] rounded-lg" : ""
          }`}
        >
          <PeopleIcon className="-translate-y-[2px] " />
          <p className="">หน้าหลัก</p>
        </Link>
        <Link
          href="/pages/information/intializing"
          className={`flex justify-start items-center gap-3 p-3 hover:rounded-lg hover:bg-[#347EC2] relative w-full  ${
            CurrentPage === "งานขาย" ? "bg-[#347EC2] rounded-lg" : ""
          }`}
        >
          <ReceiptLongIcon className="-translate-y-[2px] " />
          <p className="">งานขาย</p>
        </Link>
        <Link
          href="/pages/product"
          className={`flex justify-start items-center gap-3 p-3 hover:rounded-lg hover:bg-[#347EC2] relative w-full  ${
            CurrentPage === "ข้อมูลสินค้า" ? "bg-[#347EC2] rounded-lg" : ""
          }`}
        >
          <ShoppingCartIcon className="-translate-y-[2px] " />
          <p className="">ข้อมูลสินค้า</p>
        </Link>
        <div className={`flex flex-col w-full`}>
          <button
            onClick={() => {
              setStockSubmenuOpen(!isStockSubmenuOpen);
              console.log(isStockSubmenuOpen);
            }}
            className={`flex justify-start items-center gap-3 p-3 hover:rounded-lg hover:bg-[#347EC2] relative w-full ${
              CurrentPage === "" ? "bg-[#347EC2] rounded-lg" : ""
            }`}
          >
            <StorefrontIcon className="-translate-y-[2px]" />
            <p className="">สต็อกสินค้า</p>
            {isStockSubmenuOpen ? (
              <ExpandMoreIcon className="absolute right-0 mr-1 h-6 w-6" />
            ) : (
              <p className="absolute right-0 pr-2 text-lg"> {">"} </p>
            )}
          </button>
          <StockSubmenu
            isOpen={isStockSubmenuOpen}
            CurrentPage={CurrentPage}
            SubPage={SubPage}
          />
        </div>
        <div className={`flex flex-col w-full`}>
          <button
            onClick={() => {
              setCustomerSubmenuOpen(!isCustomerSubmenuOpen);
            }}
            className={`flex justify-start items-center gap-3 p-3 hover:rounded-lg hover:bg-[#347EC2] relative w-full ${
              CurrentPage === "" ? "bg-[#347EC2] rounded-lg" : ""
            }`}
          >
            <AssignmentIcon className="-translate-y-[2px] " />
            <p className="">ลูกค้า</p>
            {isCustomerSubmenuOpen ? (
              <ExpandMoreIcon className="absolute right-0 mr-1 h-6 w-6" />
            ) : (
              <p className="absolute right-0 pr-2 text-lg"> {">"} </p>
            )}
          </button>
          <CustomerSubmenu
            isOpen={isCustomerSubmenuOpen}
            CurrentPage={CurrentPage}
            SubPage={SubPage}
          />
        </div>
        <div className={`flex flex-col w-full`}>
          <button
            onClick={() => {
              setSupplierSubmenuOpen(!isSupplierSubmenuOpen);
            }}
            className={`flex justify-start items-center gap-3 p-3 hover:rounded-lg hover:bg-[#347EC2] relative w-full ${
              CurrentPage === "" ? "bg-[#347EC2] rounded-lg" : ""
            }`}
          >
            <InventoryIcon className="-translate-y-[2px] " />
            <p className="">ผู้จัดจำหน่าย</p>
            {isSupplierSubmenuOpen ? (
              <ExpandMoreIcon className="absolute right-0 mr-1 h-6 w-6" />
            ) : (
              <p className="absolute right-0 pr-2 text-lg"> {">"} </p>
            )}
          </button>
          <SupplierSubmenu
            isOpen={isSupplierSubmenuOpen}
            CurrentPage={CurrentPage}
            SubPage={SubPage}
          />
        </div>
        <Link
          href="#"
          className={`flex justify-start items-center gap-3 p-3 hover:rounded-lg hover:bg-[#347EC2] relative w-full  ${
            CurrentPage === "ค้างจ่าย" ? "bg-[#347EC2] rounded-lg" : ""
          }`}
        >
          <CalendarMonthIcon className="-translate-y-[2px] " />
          <p className="">ค้างจ่าย</p>
        </Link>
        {/* <Link
          href="/pages/customer"
          className={`flex justify-start items-center gap-3 p-3 hover:rounded-lg hover:bg-[#347EC2] relative w-full  ${
            CurrentPage === "รายงาน" ? "bg-[#347EC2] rounded-lg" : ""
          }`}
        >
          <PeopleAltIcon className="-translate-y-[2px] " />
          <p className="">รายงาน</p>
        </Link> */}
         <div className={`flex flex-col w-full`}>
          <button
            onClick={() => {
              setReportSubmenuOpen(!isReportSubmenuOpen);
            }}
            className={`flex justify-start items-center gap-3 p-3 hover:rounded-lg hover:bg-[#347EC2] relative w-full ${
              CurrentPage === "" ? "bg-[#347EC2] rounded-lg" : ""
            }`}
          >
            <InventoryIcon className="-translate-y-[2px] " />
            <p className="">รายงาน</p>
            {isReportSubmenuOpen ? (
              <ExpandMoreIcon className="absolute right-0 mr-1 h-6 w-6" />
            ) : (
              <p className="absolute right-0 pr-2 text-lg"> {">"} </p>
            )}
          </button>
          <ReportSubmenu
            isOpen={isReportSubmenuOpen}
            CurrentPage={CurrentPage}
            SubPage={SubPage}
          />
        </div>
        <Link
          href="/pages/monthly-checkout"
          className={`flex justify-start items-center gap-3 p-3 hover:rounded-lg hover:bg-[#347EC2] relative w-full  ${
            CurrentPage === "ปิดประจำเดือน" ? "bg-[#347EC2] rounded-lg" : ""
          }`}
        >
          <PeopleAltIcon className="-translate-y-[2px] " />
          <p className="">ปิดประจำเดือน</p>
        </Link>
      </div>
      <div className="flex justify-start gap-3 items-center mt-auto mb-6 border-t border-solid border-white pt-4 font-ibm-plex-sans-thai text-white font-bold pl-8 cursor-pointer">
        <LogoutIcon />
        <p>ออกจากระบบ</p>
      </div>

      <style jsx>
        {`
          #navBar {
            scrollbar-width: thin;
            scrollbar-color: #347ec2 transparent;
          }
          #navBar::-webkit-scrollbar {
            width: 8px;
          }
          #navBar::-webkit-scrollbar-track {
            background: transparent;
          }
          #navBar::-webkit-scrollbar-thumb {
            background-color: #347ec2;
            border-radius: 10px;
            border: 3px solid transparent;
          }
          #navBar:hover::-webkit-scrollbar-thumb {
            background-color: #347ec2;
          }
          #navBar::-webkit-scrollbar-thumb:hover {
            background-color: #1d6eb8;
          }
          #navBar:hover {
            scrollbar-width: thin;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;