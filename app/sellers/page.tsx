import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function SellersPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#144E42] mb-4 font-parkinsans">
            Seller&apos;s Marketplace
          </h1>
          <p className="text-lg text-gray-600 mb-8 font-parkinsans">
            List your recyclable materials and connect with verified buyers.
            Earn from selling your waste recyclables with transparent pricing
            and secure transactions.
          </p>
          {/* Seller dashboard content will go here */}
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-500 font-parkinsans">
              Seller dashboard coming soon...
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

