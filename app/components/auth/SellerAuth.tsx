"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AuthForm from "./AuthForm";

const SellerAuth = () => {
  const pathname = usePathname();
  const [isLogin, setIsLogin] = useState(pathname !== "/signup");
  const [userType, setUserType] = useState<"seller" | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userType) {
      alert("Please select whether you are a Seller or Buyer");
      return;
    }

    if (isLogin) {
      // Handle login
      console.log("Login:", { ...formData, userType });
      // Redirect based on user type
      if (userType === "seller") {
        window.location.href = "/sellers";
      } else {
        window.location.href = "/buyers";
      }
    } else {
      // Handle signup
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      console.log("Signup:", { ...formData, userType });
      // Redirect based on user type
      if (userType === "seller") {
        window.location.href = "/sellers";
      } else {
        window.location.href = "/buyers";
      }
    }
  };

  return (
    <>
      <AuthForm
        isLogin={isLogin}
        userType={userType}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />

      {isLogin && (
        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 text-[#A8E959] border-gray-300 rounded focus:ring-[#A8E959]"
            />
            <span className="text-sm text-gray-600 font-parkinsans">
              Remember me
            </span>
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-[#14841E] hover:text-[#144E42] font-parkinsans font-semibold"
          >
            Forgot Password?
          </Link>
        </div>
      )}
    </>
  );
};

export default SellerAuth;
