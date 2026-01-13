import Image from "next/image";
import Link from "next/link";

export default function WhoWeServe() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center lg:items-start md:justify-between mb-12">
          <div className="mb-6 md:mb-0 md:flex-1 max-w-4xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-black leading-tight font-parkinsans">
              Who do we serve in the Recyclables{" "}
              <span className="text-green-600">Value Chain</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
              We connect buyers and sellers of recyclable materials, providing a
              secure platform for transactions with escrow protection and
              product verification.
            </p>
          </div>
          <div className="md:ml-8">
            <Link
              href="/signup"
              className="px-8 py-4 rounded-lg bg-green-600 text-white font-parkinsans font-semibold hover:bg-green-700 transition-colors inline-block"
            >
              Create an Account
            </Link>
          </div>
        </div>

        {/* Feature Icons */}
        <div className="flex flex-wrap gap-6 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <span className="text-gray-700 font-parkinsans font-medium">
              Escrow Protection
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
            </div>
            <span className="text-gray-700 font-parkinsans font-medium">
              Remote Product Verification
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <span className="text-gray-700 font-parkinsans font-medium">
              Product Inspection
            </span>
          </div>
        </div>

        {/* Buyer and Seller Cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Buyer Card */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="relative w-full h-[300px] sm:h-[400px]">
              <Image
                src="/images/buyer-image.png"
                alt="Arecyl Buyer"
                fill
                className="object-cover object-[center_30%]"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-black mb-3 font-parkinsans">
                Arecyl Buyers
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Access verified sellers and secure transactions with escrow
                protection. Get real-time updates on available recyclables near
                you.
              </p>
              <Link
                href="/buyers"
                className="px-6 py-3 rounded-lg bg-green-600 text-white font-parkinsans font-semibold hover:bg-green-700 transition-colors inline-block"
              >
                Become a Buyer
              </Link>
            </div>
          </div>

          {/* Seller Card */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="relative w-full h-[300px] sm:h-[400px]">
              <Image
                src="/images/seller-image.png"
                alt="Arecyl Seller"
                fill
                className="object-cover object-[center_30%]"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-black mb-3 font-parkinsans">
                Arecyl Sellers
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                List your recyclables with transparent pricing. Receive offers
                from verified buyers and get paid securely through escrow.
              </p>
              <Link
                href="/sellers"
                className="px-6 py-3 rounded-lg bg-green-600 text-white font-parkinsans font-semibold hover:bg-green-700 transition-colors inline-block"
              >
                Become a Seller
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

