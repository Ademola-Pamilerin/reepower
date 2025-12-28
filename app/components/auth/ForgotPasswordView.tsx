"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AuthLayout from "./AuthLayout";
import FormInput from "./inputs/FormInput";
import VerificationCodeInput from "./inputs/VerificationCodeInput";
import Timer from "../shared/Timer";
import { toast } from "sonner";
import { useForgotPassword, useVerifyResetToken, useResetPassword } from "@/hooks/use-auth";

export default function ForgotPasswordView() {
  const pathname = usePathname();
  const navigations = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    code: "",
  });

  // React Query hooks
  const forgotPasswordMutation = useForgotPassword();
  const verifyResetTokenMutation = useVerifyResetToken();
  const resetPasswordMutation = useResetPassword();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [currentPage, setCurrentPage] = useState(1);

  const sendCode = () => {
    const payload = {
      email: formData.email,
    };

    forgotPasswordMutation.mutate(payload, {
      onSuccess: (data) => {
        toast.success(data.message || "Verification code sent to your email!");
        setCurrentPage(2);
      },
      onError: (error) => {
        toast.error(error.getFullMessage() || "Failed to send verification code. Please try again.");
      },
    });
  };

  const verifyCode = () => {
    const payload = {
      email: formData.email,
      token: formData.code,
    };

    verifyResetTokenMutation.mutate(payload, {
      onSuccess: (data) => {
        toast.success(data.message || "Code verified successfully!");
        setCurrentPage(3);
      },
      onError: (error) => {
        toast.error(error.getFullMessage() || "Invalid verification code. Please try again.");
      },
    });
  };

  const resetPasswordAndLogin = () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const payload = {
      email: formData.email,
      token: formData.code,
      newPassword: formData.password,
    };

    resetPasswordMutation.mutate(payload, {
      onSuccess: (data) => {
        toast.success(data.message || "Password reset successful! Please login with your new password.");
        navigations.push("/auth");
      },
      onError: (error) => {
        toast.error(error.getFullMessage() || "Failed to reset password. Please try again.");
      },
    });
  };

  const handleResend = () => {
    const payload = {
      email: formData.email,
    };

    forgotPasswordMutation.mutate(payload, {
      onSuccess: (data) => {
        toast.success(data.message || "Verification code resent!");
      },
      onError: (error) => {
        toast.error(error.getFullMessage() || "Failed to resend code. Please try again.");
      },
    });
  };

  return (
    <AuthLayout>
      {/* Form Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          <div
            className="text-black/60 mb-6 cursor-pointer text-sm lg:text-lg"
            onClick={() => {
              if (currentPage === 1) {
                navigations.push("/auth");
                return;
              } else {
                setCurrentPage((prev) => prev - 1);
              }
            }}
          >
            {""}
            <span className="text-black mr-2">{"<"}</span>Back
          </div>

          {/* Sign In As Section */}
          <div className="mb-8 w-full md:min-w-lg">
            <h1 className="text-xl lg:text-3xl xl:text-4xl font-bold text-[#000000] mb-3 font-parkinsans">
              {currentPage === 1 && "Forgot Password"}
              {currentPage === 2 && "Enter Verification Code"}
              {currentPage === 3 && "Reset Password"}
            </h1>
            <p className="text-gray-600 font-parkinsans mb-6 text-sm lg:text-base">
              {currentPage === 1 &&
                `Enter your registered email or phone number. We'll send
              you a code to reset your password.`}
              {currentPage === 2 &&
                `Please check your email or phone for the
              verification code.`}
              {currentPage === 3 && `Enter your new password below.`}
            </p>

            {/* Role Selection */}
            {currentPage === 1 && (
              <div className="space-y-3 mb-6">
                <FormInput
                  label="Phone Number or Email"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />

                <button
                  type="submit"
                  disabled={!formData.email || forgotPasswordMutation.isPending}
                  onClick={sendCode}
                  className="w-full py-3 rounded-lg bg-[#A8E959] text-[#144E42] font-parkinsans font-semibold hover:bg-[#A8E959] transition-colors mt-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {forgotPasswordMutation.isPending ? "Sending..." : "Send Verification Code"}
                </button>
              </div>
            )}

            {currentPage === 2 && (
              <div className="space-y-3 mb-6">
                <div>
                  <label
                    htmlFor="verificationCode"
                    className="block text-sm font-semibold text-gray-700 mb-2 font-parkinsans"
                  >
                    Verification Code
                  </label>
                  <VerificationCodeInput
                    code={formData.code}
                    setCode={(code) => setFormData({ ...formData, code })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!formData.code || formData.code.length < 6 || verifyResetTokenMutation.isPending}
                  onClick={verifyCode}
                  className="w-full py-3 rounded-lg bg-[#A8E959] text-[#144E42] font-parkinsans font-semibold hover:bg-[#A8E959] transition-colors mt-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {verifyResetTokenMutation.isPending ? "Verifying..." : "Verify Code"}
                </button>

                <Timer initialTime={60} onResend={handleResend} />
              </div>
            )}

            {currentPage === 3 && (
              <div className="space-y-3 mb-6">
                <FormInput
                  label="Password"
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />

                <FormInput
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                />

                <button
                  type="submit"
                  disabled={!formData.confirmPassword || !formData.password || resetPasswordMutation.isPending}
                  onClick={resetPasswordAndLogin}
                  className="w-full py-3 rounded-lg bg-[#A8E959] text-[#144E42] font-parkinsans font-semibold hover:bg-[#A8E959] transition-colors mt-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
