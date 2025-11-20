import Header from "./components/layout/Header";
import Hero from "./components/landing/Hero";
import Features from "./components/landing/Features";
import WhoWeServe from "./components/landing/WhoWeServe";
import RecyclablesGrid from "./components/landing/RecyclablesGrid";
import CTABanner from "./components/landing/CTABanner";
import FAQ from "./components/landing/FAQ";
import Footer from "./components/layout/Footer";

export default function Home() {
  // Sample data for "Purchase Waste Recyclables Available Near You"
  const availableRecyclables = [
    {
      id: 1,
      image: "/images/pet-bottles.jpg",
      icon: "recycle",
      type: "PET bottles",
      weight: "200kg",
      price: "N1,000/kg",
    },
    {
      id: 2,
      image: "/images/bottle-container.jpg",
      icon: "recycle",
      type: "Aluminum cans",
      weight: "150kg",
      price: "N800/kg",
    },
    {
      id: 3,
      image: "/images/bottle-3.jpg",
      icon: "recycle",
      type: "Plastic containers",
      weight: "180kg",
      price: "N900/kg",
    },
    {
      id: 4,
      image: "/images/dump.jpg",
      icon: "recycle",
      type: "Mixed recyclables",
      weight: "250kg",
      price: "N750/kg",
    },
  ];

  // Sample data for "Make an offer to sellers"
  const sellerRecyclables = [
    {
      id: 5,
      image: "/images/pet-bottles.jpg",
      icon: "recycle",
      type: "PET bottles",
      weight: "300kg",
      price: "N1,200/kg",
    },
    {
      id: 6,
      image: "/images/bottle-container.jpg",
      icon: "recycle",
      type: "Aluminum cans",
      weight: "220kg",
      price: "N950/kg",
    },
    {
      id: 7,
      image: "/images/bottle-3.jpg",
      icon: "recycle",
      type: "Plastic containers",
      weight: "190kg",
      price: "N1,100/kg",
    },
  ];

  return (
    <main className="min-h-screen w-full">
      <Header />
      <Hero />
      <Features />
      <WhoWeServe />
      <RecyclablesGrid
        title="Purchase Waste Recyclables Available Near You"
        titleHighlight="Near You"
        description="Browse verified sellers and real-time updates on available recyclables in your area. Make secure offers with escrow protection."
        items={availableRecyclables}
        gridColumns={4 % 4}
      />
      <CTABanner />
      <RecyclablesGrid
        title="Make an offer to sellers and earn from selling Waste Recyclables"
        titleHighlight="Waste Recyclables"
        description="Connect with sellers and make competitive offers. Earn from selling your recyclables with transparent pricing and secure transactions."
        items={sellerRecyclables}
        gridColumns={3 % 4}
      />
      <FAQ />
      <Footer />
    </main>
  );
}
