import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function PasswordInput({
  value,
  onChange,
  placeholder = "Enter your password",
}) {
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="relative">
      <input
        type={isShowPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B85FF] focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
      />
      <button
        type="button"
        onClick={toggleShowPassword}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#2B85FF] transition-colors duration-200 focus:outline-none"
      >
        {isShowPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
      </button>
    </div>
  );
}

export default PasswordInput;
