"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AuthLayout from "./AuthLayout";
import BuyerAuth from "./BuyerAuth";
import SellerAuth from "./SellerAuth";

export default function AuthView() {
  const pathname = usePathname();
  const [isLogin, setIsLogin] = useState(pathname !== "/signup");
  const [userType, setUserType] = useState<"seller" | "buyer" | null>(null);

  const navigation = useRouter();

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <AuthLayout>

      {/* Form Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          {currentPage !== 1 && (
            <div
              className="text-black/60 mb-2 lg:mb-6 cursor-pointer text-sm lg:text-lg"
              onClick={() => {
                setCurrentPage(1);
                // setUserType(null);
              }}
            >
              {""}
              <span className="text-black mr-2">{"<"}</span>Back
            </div>
          )}
          {/* Sign In As Section */}
          <div className="mb-8">
            <h1 className="text-xl lg:text-3xl xl:text-4xl font-bold text-[#000000] mb-3 font-parkinsans">
              Sign In As{" "}
              {currentPage === 2 && userType === "buyer" && (
                <span>Buyer</span>
              )}
              {currentPage === 2 && userType === "seller" && (
                <span>Seller</span>
              )}
            </h1>
            <p className="text-gray-600 font-parkinsans mb-6 text-sm lg:text-base">
              Arecyl is your all-in-one platform for buying and selling
              recyclable materials across Nigeria&apos;s.{" "}
              <button
                onClick={() => navigation.push("/signup")}
                className=" text-[#14841E] hover:text-[#144E42] font-semibold underline cursor-pointer"
              >
                Create an Account
              </button>
            </p>

            {/* Role Selection */}
            {currentPage === 1 && (
              <div className="space-y-3 mb-6">
                <label
                  className={`flex flex-row-reverse justify-between items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${userType === "buyer"
                      ? "border-[#A8E959] bg-[#A8E959]/10"
                      : "border-gray-300 hover:border-[#A8E959]"
                    }`}
                >
                  <input
                    type="checkbox"
                    name="userType"
                    value="buyer"
                    checked={userType === "buyer"}
                    onChange={() => setUserType("buyer")}
                    className="w-5 h-5 text-[#A8E959] border-gray-300 focus:ring-[#A8E959] mr-4 block "
                  />
                  <span className="text-gray-700 font-parkinsans font-semibold block">
                    Buyer
                  </span>
                </label>
                <label
                  className={`flex items-center flex-row-reverse justify-between p-4 border-2 rounded-lg cursor-pointer transition-colors ${userType === "seller"
                      ? "border-[#A8E959] bg-[#A8E959]/10"
                      : "border-gray-300 hover:border-[#A8E959]"
                    }`}
                >
                  <input
                    type="checkbox"
                    name="userType"
                    value="seller"
                    checked={userType === "seller"}
                    onChange={() => setUserType("seller")}
                    className="w-5 h-5 text-[#A8E959] border-gray-300 focus:ring-[#A8E959] mr-4 block"
                  />
                  <span className="text-gray-700 font-parkinsans font-semibold block">
                    Seller
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!userType}
                  onClick={() => setCurrentPage(2)}
                  className="w-full py-3 rounded-lg bg-[#A8E959] text-[#144E42] font-parkinsans font-semibold hover:bg-[#A8E959] transition-colors mt-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            )}
          </div>

          {/* Auth Form */}
          {userType === "buyer" && currentPage === 2 && <BuyerAuth />}
          {userType === "seller" && currentPage === 2 && <SellerAuth />}
        </div>
      </div>
    </AuthLayout>
  );
}
