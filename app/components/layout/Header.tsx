"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/use-auth";

const getInitials = (name: string) => {
  if (!name) return "U";
  return name.substring(0, 2).toUpperCase();
};

type HeaderProps = {
  bgClass?: string;
};

const bgClassVal = "bg-[#144E42]";

export default function Header({ bgClass = bgClassVal }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { data: userData } = useCurrentUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`w-full ${bgClass} shadow-sm py-3 flex justify-center items-center`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between py-2 lg:py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 ">
            <div className="w-10 h-10 rounded flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="Arecyl"
                width={40}
                height={80}
                className="object-contain w-full h-full"
              />
            </div>
            <span
              className={`text-xl xl:text-2xl font-bold font-parkinsans ${bgClass === bgClassVal ? "text-white" : "text-[#144E42]"
                }`}
            >
              Arecyl
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm xl:text-base font-parkinsans font-semibold hover:text-green-400 transition-colors ${bgClass === bgClassVal ? "text-white" : "text-[#144E42]"
                }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-sm xl:text-base font-parkinsans font-semibold hover:text-green-400 transition-colors ${bgClass === bgClassVal ? "text-white" : "text-[#144E42]"
                }`}
            >
              About Us
            </Link>
            <Link
              href="/sellers"
              className={`hidden xl:block text-sm xl:text-base font-parkinsans font-semibold hover:text-green-400 transition-colors ${bgClass === bgClassVal ? "text-white" : "text-[#144E42]"
                }`}
            >
              Seller&apos;s Marketplace
            </Link>
            <Link
              href="/buyers"
              className={`hidden xl:block text-sm xl:text-base font-parkinsans font-semibold hover:text-green-400 transition-colors ${bgClass === bgClassVal ? "text-white" : "text-[#144E42]"
                }`}
            >
              Buyer&apos;s Marketplace
            </Link>
            <Link
              href="/faqs"
              className={`text-sm xl:text-base font-parkinsans font-semibold hover:text-green-400 transition-colors ${bgClass === bgClassVal ? "text-white" : "text-[#144E42]"
                }`}
            >
              FAQs
            </Link>
          </div>

          {/* Desktop Action Buttons / User Profile */}
          <div className="hidden md:flex items-center gap-4">
            {userData?.user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-3 focus:outline-none"
                >
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold font-parkinsans text-[#144E42] bg-white/80 px-2 rounded-md">
                      {userData.user.username || userData.user.name.split(' ')[0]}
                    </span>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-2 border-white shadow-sm ${bgClass === bgClassVal ? "bg-[#A8E959] text-[#144E42]" : "bg-[#144E42] text-white"
                    }`}>
                    {getInitials(userData.user.username || userData.user.name)}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm text-gray-500">Active User</p>
                      <p className="text-sm font-bold text-[#144E42] truncate">
                        {userData.user.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {userData.user.email}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        localStorage.removeItem('auth_token');
                        window.location.href = '/auth';
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                    >
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/auth"
                  className={`px-6 py-4 rounded-lg  bg-inherit text-sm xl:text-base font-parkinsans font-semibold  border  transition-colors ${bgClass === bgClassVal
                    ? "text-[#A8E959] border-[#A8E959]"
                    : "text-[#144E42] border-[#144E42]"
                    }`}
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className={`px-6 py-4 rounded-lg text-sm xl:text-base font-parkinsans font-semibold text-[#144E42] bg-[#A8E959]  transition-colors ${bgClass === bgClassVal ? " border " : "border-none"
                    }`}
                >
                  Create an Account
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 transition-all duration-300 ${bgClass === bgClassVal ? "bg-white" : "bg-black/40"
                } ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-0.5 w-6  transition-all duration-300 ${bgClass === bgClassVal ? "bg-white" : "bg-black/40"
                } ${isMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6  transition-all duration-300 ${bgClass === bgClassVal ? "bg-white" : "bg-black/40"
                } ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={closeMenu}
      />

      {/* Mobile Menu Slide-in */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-[#144E42] z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={closeMenu}
            >
              <div className="w-10 h-10 rounded flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Arecyl"
                  width={40}
                  height={80}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="text-xl font-bold text-white font-parkinsans">
                Arecyl
              </span>
            </Link>
            <button
              onClick={closeMenu}
              className="text-white w-8 h-8 flex items-center justify-center"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Links - Centered */}
          <nav className="flex flex-col gap-6 flex-1 justify-center border-t border-b border-white/20 py-8">
            <Link
              href="/"
              onClick={closeMenu}
              className="text-white text-lg font-parkinsans font-semibold hover:text-green-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className="text-white text-lg font-parkinsans font-semibold hover:text-green-400 transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/sellers"
              onClick={closeMenu}
              className="text-white text-lg font-parkinsans font-semibold hover:text-green-400 transition-colors"
            >
              Seller&apos;s Marketplace
            </Link>
            <Link
              href="/buyers"
              onClick={closeMenu}
              className="text-white text-lg font-parkinsans font-semibold hover:text-green-400 transition-colors"
            >
              Buyer&apos;s Marketplace
            </Link>
            <Link
              href="/faqs"
              onClick={closeMenu}
              className="text-white text-lg font-parkinsans font-semibold hover:text-green-400 transition-colors"
            >
              FAQs
            </Link>
          </nav>

          {/* Mobile Action Buttons */}
          <div className="flex flex-col gap-4 pt-6">
            <Link
              href="/auth"
              onClick={closeMenu}
              className="px-6 py-3 rounded-lg border-[#A8E959] bg-inherit text-center font-parkinsans font-semibold text-[#A8E959] border transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              onClick={closeMenu}
              className="px-6 py-3 rounded-lg bg-[#A8E959] text-center font-parkinsans font-semibold text-[#144E42] border transition-colors"
            >
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
