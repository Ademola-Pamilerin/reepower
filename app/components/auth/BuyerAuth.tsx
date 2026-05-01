"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import AuthForm, { userType } from "./AuthForm";
import { useLogin, useVerifyEmail, useResendVerification } from "@/hooks/use-auth";
import { toast } from "sonner";

let USER_TYPE = userType.buyer;

const BuyerAuth = () => {
  const pathname = usePathname();
  const [isLogin, setIsLogin] = useState(pathname !== "/signup");
  const router = useRouter();
  const loginMutation = useLogin();
  const verifyEmailMutation = useVerifyEmail();
  const resendVerificationMutation = useResendVerification();

  // Email verification state
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [startTimer, setStartTimer] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (startTimer && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval!);
            setStartTimer(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [startTimer, timer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

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
        localStorage.setItem("user_type", "buyer");

        // Refresh router to update server components with new cookie
        router.refresh();
        router.replace("/buyers");
      },
      onError: (error) => {
        const msg = error.getFullMessage() || "";
        if (msg.toLowerCase().includes("verify your email")) {
          // Credentials are correct but email not verified — show OTP panel
          setVerifyEmail(formData.email);
          setOtp("");
          setShowVerifyEmail(true);
          setTimer(60);
          setStartTimer(true);
          // Trigger a resend so the user gets a fresh code
          resendVerificationMutation.mutate({ email: formData.email }, {
            onSuccess: () => toast.info("A verification code has been sent to your email."),
          });
        } else {
          toast.error(msg || "Login failed. Please try again.");
        }
      },
    });
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    verifyEmailMutation.mutate(
      { email: verifyEmail, token: otp },
      {
        onSuccess: (data) => {
          toast.success(data.message || "Email verified! Please log in again.");
          setShowVerifyEmail(false);
          setOtp("");
        },
        onError: (error) => {
          toast.error(error.getFullMessage() || "Verification failed. Check your code.");
        },
      }
    );
  };

  if (showVerifyEmail) {
    return (
      <div className="animate-fade-in">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#A8E959]/20 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#14841E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[#000000] font-parkinsans">Verify Your Email</h2>
          </div>
          <p className="text-gray-600 font-parkinsans text-sm">
            A 6-digit verification code has been sent to{" "}
            <span className="font-semibold text-[#14841E]">{verifyEmail}</span>. Enter it below to complete sign-in.
          </p>
        </div>

        {/* OTP Form */}
        <form onSubmit={handleVerifyOtp} className="space-y-5">
          <div className="flex gap-2 justify-center">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={otp[index] || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/, "");
                  const newOtp = otp.split("");
                  newOtp[index] = value;
                  setOtp(newOtp.join(""));
                  if (value && index < 5) inputRefs.current[index + 1]?.focus();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !otp[index] && index > 0) {
                    inputRefs.current[index - 1]?.focus();
                  }
                }}
                className="w-11 h-12 text-center text-black text-xl font-parkinsans rounded-xl border border-gray-300 focus:border-[#A8E959] focus:ring-2 focus:ring-[#A8E959]/20 outline-none transition-all"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={otp.length < 6 || verifyEmailMutation.isPending}
            className="w-full py-3 rounded-lg bg-[#A8E959] text-[#144E42] font-parkinsans font-semibold hover:bg-[#95d448] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {verifyEmailMutation.isPending ? "Verifying..." : "Verify & Continue"}
          </button>
        </form>

        {/* Resend + back */}
        <div className="mt-4 flex items-center justify-between text-sm font-parkinsans">
          <button
            type="button"
            onClick={() => setShowVerifyEmail(false)}
            className="text-gray-500 hover:text-gray-700 underline cursor-pointer"
          >
            ← Back to login
          </button>
          <div className="text-gray-600">
            <button
              type="button"
              disabled={startTimer || resendVerificationMutation.isPending}
              onClick={() => {
                resendVerificationMutation.mutate(
                  { email: verifyEmail },
                  {
                    onSuccess: (data) => {
                      toast.success(data.message || "Code resent!");
                      setTimer(60);
                      setStartTimer(true);
                    },
                    onError: (error) => {
                      toast.error(error.getFullMessage() || "Failed to resend code.");
                    },
                  }
                );
              }}
              className={`font-medium ${
                startTimer || resendVerificationMutation.isPending
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[#14841E] underline cursor-pointer"
              }`}
            >
              {resendVerificationMutation.isPending ? "Sending..." : "Resend Code"}
            </button>
            {startTimer && <span className="ml-1 text-gray-400">in {formatTime(timer)}</span>}
          </div>
        </div>
      </div>
    );
  }

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

export default BuyerAuth;
