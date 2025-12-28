"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import AuthForm, { userType } from "./AuthForm";
import { useLogin } from "@/hooks/use-auth";
import { toast } from "sonner";

let USER_TYPE = userType.seller;

const SellerAuth = () => {
  const pathname = usePathname();
  const [isLogin, setIsLogin] = useState(pathname !== "/signup");
  const router = useRouter();
  const loginMutation = useLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      email: formData.email,
      password: formData.password,
    };

    loginMutation.mutate(payload, {
      onSuccess: (data) => {
        toast.success(data.message || "Login successful!");
        // Store token if provided
        if (data.token) {
          // Import and use setAuthToken from cookies utility
          const { setAuthToken } = require('@/lib/cookies');
          setAuthToken(data.token);
        }
        // Store user data if provided
        if (data.user) {
          localStorage.setItem("user_data", JSON.stringify(data.user));
        }
        // Store user type
        localStorage.setItem("user_type", "seller");
        // Redirect to seller dashboard
        router.replace("/sellers");
      },
      onError: (error) => {
        toast.error(error.getFullMessage() || "Login failed. Please try again.");
      },
    });
  };

  return (
    <>
      <AuthForm
        isLogin={isLogin}
        userType={USER_TYPE}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isLoading={loginMutation.isPending}
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
