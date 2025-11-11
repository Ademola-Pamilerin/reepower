"use client";

import Image from "next/image";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "./Header";
import { toast } from "sonner";

export default function ForgotPasswordView() {
  const pathname = usePathname();
  const navigations = useRouter();
  const [timer, setTimer] = useState(60);
  const [startTimer, setStartTimer] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    code: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
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

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [startTimer, timer]);

  // Convert seconds to MM:SS format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const sendCode = () => {
    setCurrentPage(2);
    setStartTimer(true);
  };
  const verifyCode = () => {
    setCurrentPage(3);
    setStartTimer(true);
  };
  const resetPasswordAndLogin = () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <Header bgClass="bg-[#E4E4E4EB]" />
      <div className="flex flex-col lg:flex-row h-[88vh]">
        {/* Left Section - Image with Overlay */}
        <div className="lg:w-1/2 relative h-full">
          <Image
            src="/images/auth-image.png"
            alt="ReePower Auth"
            height={1200}
            width={1200}
            className="object-cover h-full w-full"
            priority
          />
          {/* Overlay Content */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 lg:p-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 lg:mb-4 font-parkinsans">
              Powering the Future of Informal Waste Recycling
            </h2>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/90 font-parkinsans">
              Reepower is your all-in-one platform for buying and selling
              recyclable materials across Nigeria&apos;s informal waste market.
            </p>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full lg:w-1/2 bg-white flex flex-col">
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
              <div className="mb-8">
                <h1 className="text-xl lg:text-3xl xl:text-4xl font-bold text-[#000000] mb-3 font-parkinsans">
                  {currentPage === 1 && "Forgot Password"}
                  {currentPage === 2 && "Enter Verification Code"}
                </h1>
                <p className="text-gray-600 font-parkinsans mb-6 text-sm lg:text-base">
                  {currentPage === 1 &&
                    `Enter your registered email or phone number. We&apos;ll send
                  you a code to reset your password.`}
                  {currentPage === 2 &&
                    `Please check your email or phone for the
                  verification code.`}
                </p>

                {/* Role Selection */}
                {currentPage === 1 && (
                  <div className="space-y-3 mb-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700 mb-2 font-parkinsans"
                      >
                        Phone Number or Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 text-black rounded-xl border border-gray-300 focus:border-[#A8E959] focus:ring-2 focus:ring-[#A8E959]/20 outline-none transition-all font-parkinsans"
                        placeholder="Enter your email"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!formData.email}
                      onClick={sendCode}
                      className="w-full py-3 rounded-lg bg-[#A8E959] text-[#144E42] font-parkinsans font-semibold hover:bg-[#A8E959] transition-colors mt-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Send Verification Code
                    </button>
                  </div>
                )}

                {currentPage === 2 && (
                  <div className="space-y-3 mb-6">
                    {/* create an input where we have a box each for 6 digit pins with border white/50 */}
                    <div>
                      <label
                        htmlFor="verificationCode"
                        className="block text-sm font-semibold text-gray-700 mb-2 font-parkinsans"
                      >
                        Verification Code
                      </label>
                      {/* get the values of this input and save in code */}

                      <div className="flex gap-3 w-full justify-between">
                        {[...Array(6)].map((_, index) => (
                          <input
                            key={index}
                            ref={(el) => {
                              inputRefs.current[index] = el;
                            }}
                            type="text"
                            maxLength={1}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value) {
                                const newCode = formData.code.split("");
                                newCode[index] = value;
                                setFormData({
                                  ...formData,
                                  code: newCode.join(""),
                                });
                                if (index < 5) {
                                  inputRefs.current[index + 1]?.focus();
                                }
                              } else {
                                const newCode = formData.code.split("");
                                newCode[index] = "";
                                setFormData({
                                  ...formData,
                                  code: newCode.join(""),
                                });
                              }
                            }}
                            onKeyDown={(e) => {
                              if (
                                e.key === "Backspace" &&
                                !e.currentTarget.value &&
                                index > 0
                              ) {
                                inputRefs.current[index - 1]?.focus();
                              }
                            }}
                            className="w-12 h-12 text-center text-black text-xl font-parkinsans rounded-xl border border-gray-300 focus:border-[#A8E959] focus:ring-2 focus:ring-[#A8E959]/20 outline-none transition-all"
                          />
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!formData.code || formData.code.length < 6}
                      onClick={verifyCode}
                      className="w-full py-3 rounded-lg bg-[#A8E959] text-[#144E42] font-parkinsans font-semibold hover:bg-[#A8E959] transition-colors mt-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Verify Code
                    </button>

                    {/* create the resend code timer here for one minutes */}
                    <div className="text-gray-600 font-parkinsans">
                      <button
                        type="button"
                        disabled={startTimer}
                        onClick={() => {
                          setTimer(60);
                          setStartTimer(true);
                          // TODO: Add resend API call here if needed
                        }}
                        className={`font-medium ${
                          startTimer
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-[#14841E] hover:text-[#14841E] underline cursor-pointer"
                        }`}
                      >
                        Resend Code
                      </button>{" "}
                      {startTimer && `in ${formatTime(+timer)} seconds`}
                    </div>
                  </div>
                )}

                {currentPage === 3 && (
                  <div className="space-y-3 mb-6">
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-gray-700 mb-2 font-parkinsans"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:border-[#A8E959] focus:ring-2 focus:ring-[#A8E959]/20 outline-none transition-all font-parkinsans text-black"
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPassword ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="w-5 h-5 text-gray-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="w-5 h-5 text-gray-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-semibold text-gray-700 mb-2 font-parkinsans"
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:border-[#A8E959] focus:ring-2 focus:ring-[#A8E959]/20 outline-none transition-all font-parkinsans text-black"
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showConfirmPassword ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="w-5 h-5 text-gray-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="w-5 h-5 text-gray-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!formData.confirmPassword || !formData.password}
                      onClick={resetPasswordAndLogin}
                      className="w-full py-3 rounded-lg bg-[#A8E959] text-[#144E42] font-parkinsans font-semibold hover:bg-[#A8E959] transition-colors mt-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
