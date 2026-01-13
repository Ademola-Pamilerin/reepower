import Image from "next/image";
import Header from "../layout/Header";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-white">
      <Header bgClass="bg-[#E4E4E4EB]" />
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Left Section - Image with Overlay */}
        <div className="lg:w-1/2 relative h-96 lg:h-screen">
          <Image
            src="/images/auth-image.png"
            alt="Arecyl Auth"
            height={1200}
            width={1200}
            className="object-cover h-full w-full"
            priority
          />
          {/* Overlay Content */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 lg:px-10 xl:py-56 xl:pl-36 ">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 lg:mb-4 font-parkinsans max-w-3xl">
              Powering the Future of Informal Waste Recycling
            </h2>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/90 font-parkinsans max-w-3xl">
              Arecyl is your all-in-one platform for buying and selling
              recyclable materials across Nigeria&apos;s informal waste market.
            </p>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full lg:w-1/2 bg-white flex flex-col h-full justify-center items-center lg:pr-8">
          {children}
        </div>
      </div>
    </div>
  );
}
