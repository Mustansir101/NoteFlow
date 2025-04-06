import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function PasswordInput({ value, onChange, placeholder = "Password" }) {
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="flex items-center bg-transparent border-[1.5px] border-gray-400 px-5 py-3 rounded mb-3">
      <input
        type={isShowPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full text-sm bg-transparent rounded outline-none"
      />
      {isShowPassword ? (
        <FaRegEyeSlash
          size={22}
          className="text-slate-400 cursor-pointer"
          onClick={toggleShowPassword}
        />
      ) : (
        <FaRegEye
          size={22}
          className="text-[#2B85FF] cursor-pointer"
          onClick={toggleShowPassword}
        />
      )}
    </div>
  );
}

export default PasswordInput;
