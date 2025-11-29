"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      className="relative w-full h-[600px] sm:h-[700px] lg:h-[800px] xl:h-[95vh] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/landingpage.jpg"
          alt="People trading recyclables"
          fill
          className="object-cover object-[center_20%] w-full h-full"
          priority
          sizes="100vw"
        />
      </div>

      {/* Dark Overlay */}
      {/* <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent" /> */}

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 h-full flex items-center">
        <div className="max-w-4xl">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white font-parkinsans">
              Turn Waste into Wealth
            </span>
            <br />
            <span className="text-green-800 font-parkinsans">
              <span className=" text-white">Trade</span> Recyclables
            </span>{" "}
            <span className="text-green-500">Safely</span>
          </h1>

          {/* Sub-text */}
          <p className="text-white text-lg sm:text-xl mb-8 max-w-xl leading-relaxed">
            Connect with verified buyers and sellers of recyclable materials.
            Trade smarter, faster, and with confidence — powered by escrow and
            product verification.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/buy"
              className="px-8 py-4 font-parkinsans  rounded-lg bg-white text-[#144E42] transition-colors text-center font-semibold"
            >
              Buy Plastic Waste
            </Link>
            <Link
              href="/sell"
              className="px-8 py-4 font-parkinsans rounded-lg bg-transparent text-white border-2 border-gray-300  transition-colors text-center font-semibold"
            >
              Sell Plastic Waste
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
