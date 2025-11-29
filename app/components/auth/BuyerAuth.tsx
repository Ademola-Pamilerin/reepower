"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import AuthForm, { userType } from "./AuthForm";

let USER_TYPE = userType.buyer;

const BuyerAuth = () => {
  const pathname = usePathname();
  const [isLogin, setIsLogin] = useState(pathname !== "/signup");
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Login:", { ...formData, USER_TYPE });
    // Redirect based on user type

    router.replace("/buyers");
  };

  return (
    <>
      <AuthForm
        isLogin={isLogin}
        userType={USER_TYPE}
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

export default BuyerAuth;
