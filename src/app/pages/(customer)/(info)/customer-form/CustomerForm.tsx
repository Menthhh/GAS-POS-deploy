import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Select from "react-select";
import { DropdownIndicator } from "@/components/DropdownIndicator";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { saveSwal } from "./components/SaveSwal";

const TYPE = ["ขายส่ง", "ขายปลีก"];
const typeOptions = TYPE.map((type) => ({
  value: type,
  label: type,
}));

function CustomerForm({ customerId, customerForm, setCustomerForm }) {
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (
      customerForm.cname === "" ||
      customerForm.csurn === "" ||
      customerForm.tel === "" ||
      customerForm.lineid === "" ||
      customerForm.email1 === "" ||
      customerForm.type1 === ""
    ) {
      return Swal.fire({
        icon: "error",
        title: "ไม่สามารถเว้นว่างได้",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    console.log({ ccode: customerId, ...customerForm });
    try {
      // First, check if the customer exists
      const checkResponse = await fetch(
        `/api/get-customer?ccode=${customerId}`
      );
      console.log(checkResponse.ok);

      if (checkResponse.ok) {
        const { customer } = await checkResponse.json();
        const exists = customer
        const method = exists ? "PATCH" : "POST";
        const url = exists
          ? "/api/update-customer"
          : "/api/create-new-customer";

        console.log(method, url);

        const response = await fetch(url, {
          method: method,
          body: JSON.stringify({ ccode: customerId, ...customerForm }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          await saveSwal(router);
        } else {
          console.error("Error:", await response.text());
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (field: string, value: any) => {
    setCustomerForm((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleTypeChange = (selectedOption) => {
    const newType = selectedOption.value;
    setCustomerForm((prevState) => ({
      ...prevState,
      type1: newType,
    }));
  };

  const selectStyles = {
    singleValue: (provided) => ({
      ...provided,
      color: "#0c487f",
      margin: "0 0 0 12px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "0px",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0 0 0 12px",
    }),
    placeholder: (provided) => ({
      ...provided,
      marginLeft: "12px", // Adds left margin to the placeholder
      color: "#757575", // Keeping the color we set earlier
    }),
    control: (provided) => ({
      ...provided,
      borderWidth: "1px",
      borderColor: "#878787",
      borderRadius: "0.5rem",
      boxShadow: "none",
      "&:hover": {
        borderWidth: "2px",
        borderColor: "#0c487f",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isDisabled
        ? "#adadad42"
        : state.isFocused
        ? "#4398E7"
        : "white",
      color: state.isDisabled ? "#666" : state.isFocused ? "white" : "black",
    }),
    indicatorSeparator: () => {},
  };

  const fieldDivStyle =
    "flex gap-5 w-full max-w-[700px] flex-row justify-between items-center";
  const textFieldStyle = "flex-1 text-extra font-bold text-end";
  const inputStyle =
    "w-full max-w-[600px] text-[#0c487f] bg-white font-ibm-plex-sans-thai border-none ring-[1px] rounded-lg ring-[#878787] py-1 px-5 focus:ring-primary hover:ring-primary cursor-pointer ";
  return (
    <>
      <div
        className="flex flex-row bg-white rounded-2xl py-4 px-8"
        style={{
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
        }}
      >
        <p className="text-third text-xl mr-2">รหัสลูกค้า:</p>
        <p className="text-textExtra text-xl">#{customerId}</p>
      </div>

      <div
        className="flex flex-col bg-white rounded-2xl px-3 py-5"
        style={{
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="flex flex-row gap-1 px-4 items-center">
          <AccountCircleIcon
            className="h-[82px] w-[82px]"
            sx={{ color: "#B1D8FB" }}
          />
          <div className="flex flex-col">
            <p className="text-third font-semibold">ข้อมูลผู้ติดต่อ</p>
            <p className="text-secondary">โปรดระบุข้อมูล</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 justify-center items-center py-5">
          <div className={fieldDivStyle}>
            <p className={textFieldStyle}> ชื่อ </p>
            <input
              type="text"
              name="cname"
              placeholder="ชื่อ"
              value={customerForm.cname}
              onChange={(e) => {
                handleChange("cname", e.target.value);
              }}
              className={inputStyle}
            />
          </div>
          <div className={fieldDivStyle}>
            <p className={textFieldStyle}> นามสกุล </p>
            <input
              type="text"
              name="csurn"
              placeholder="นามสกุล"
              value={customerForm.csurn}
              onChange={(e) => {
                handleChange("csurn", e.target.value);
              }}
              className={inputStyle}
            />
          </div>
          <div className={fieldDivStyle}>
            <p className={textFieldStyle}> โทรศัพท์ </p>
            <input
              type="text"
              name="tel"
              placeholder="โทรศัพท์"
              value={customerForm.tel}
              onChange={(e) => {
                handleChange("tel", e.target.value);
              }}
              className={inputStyle}
            />
          </div>
          <div className={fieldDivStyle}>
            <p className={textFieldStyle}> LINE ID </p>
            <input
              type="text"
              name="lineid"
              placeholder="ไอดีไลน์"
              value={customerForm.lineid}
              onChange={(e) => {
                handleChange("lineid", e.target.value);
              }}
              className={inputStyle}
            />
          </div>
          <div className={fieldDivStyle}>
            <p className={textFieldStyle}> Email </p>
            <input
              placeholder="อีเมล"
              type="email1"
              name="email1"
              value={customerForm.email1}
              onChange={(e) => {
                handleChange("email1", e.target.value);
              }}
              className={inputStyle}
            />
          </div>
          <div className={fieldDivStyle}>
            <p className={textFieldStyle}> ประเภท </p>
            <Select
              components={{ DropdownIndicator }}
              value={
                customerForm.type1
                  ? { value: customerForm.type1, label: customerForm.type1 }
                  : null
              }
              options={typeOptions}
              onChange={handleTypeChange}
              isSearchable={false}
              placeholder="ประเภท"
              // noOptionsMessage={() => "ไม่พบสินค้า"}
              className={"text-secondary cursor-pointer w-full max-w-[600px]"}
              styles={selectStyles}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center ">
        <button
          type="submit"
          className="bg-[#0059AB] py-2 px-10 text-lg rounded-lg border-2 border-white border-none text-white font-semibold font-ibm-plex-sans-thai mt-3"
          onClick={handleSubmit}
          style={{
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          บันทึก
        </button>
      </div>
    </>
  );
}

export default CustomerForm;
