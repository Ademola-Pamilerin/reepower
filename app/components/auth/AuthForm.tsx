import { useState } from "react";
import FormInput from "./inputs/FormInput";

export enum userType {
  seller = "seller",
  buyer = "buyer",
}

interface AuthFormProps {
  isLogin: boolean;
  userType: userType;
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    phone: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
      confirmPassword: string;
      fullName: string;
      phone: string;
    }>
  >;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export default function AuthForm({
  isLogin,
  userType,
  formData,
  setFormData,
  onSubmit,
  isLoading = false,
}: AuthFormProps) {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      id="auth-form"
      onSubmit={onSubmit}
      className="space-y-4 animate-fade-in"
    >
      {!isLogin && (
        <FormInput
          label="Full Name"
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Enter your full name"
          required={!isLogin}
        />
      )}

      <FormInput
        label={
          userType === "seller"
            ? "Business Phone Number or Email"
            : "Phone Number or Email"
        }
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
        required
      />

      {!isLogin && (
        <FormInput
          label="Phone Number"
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Enter your phone number"
          required={!isLogin}
        />
      )}

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

      {!isLogin && (
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
              required={!isLogin}
              className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:border-[#A8E959] focus:ring-2 focus:ring-[#A8E959]/20 outline-none transition-all font-parkinsans text-black"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
      )}

      <button
        type="submit"
        disabled={
          !formData.email ||
          !formData.password ||
          (!isLogin &&
            (!formData.fullName ||
              !formData.phone ||
              !formData.confirmPassword)) ||
          isLoading
        }
        className="w-full py-3 rounded-lg bg-[#A8E959] text-[#144E42] font-parkinsans font-semibold hover:bg-[#A8E959] transition-colors mt-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Loading..." : isLogin ? "Log In" : "Create Account"}
      </button>
    </form>
  );
}
