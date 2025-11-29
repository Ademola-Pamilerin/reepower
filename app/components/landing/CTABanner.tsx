"use client";

import Link from "next/link";
import SectionWrapper from "./SectionWrapper";

export default function CTABanner() {
  return (
    <section className="w-full bg-[#144E42] py-16 sm:py-20">
      <SectionWrapper className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 font-parkinsans">
            Ready to Start Selling or Buying Recyclables? Join Nigeria&apos;s
            Most Trusted Recycling Marketplace.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-4 rounded-lg bg-[#A8E959] text-[#144E42] font-parkinsans font-semibold hover:bg-[#9dd84a] transition-colors inline-block"
            >
              Create an Account
            </Link>
            <Link
              href="/learn-more"
              className="px-8 py-4 rounded-lg border-2 border-white text-white font-parkinsans font-semibold hover:bg-white/10 transition-colors inline-block"
            >
              Learn More
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
