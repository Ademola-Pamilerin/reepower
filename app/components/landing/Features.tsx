"use client";

import Image from "next/image";
import SectionWrapper from "./SectionWrapper";

export default function Features() {
  const features = [
    {
      title: "Escrow Protection",
      description: "Escrow protects both buyer and seller",
    },
    {
      title: "Zero Scams",
      description: "No price scams - offers are transparent",
    },
    {
      title: "Remote Product Verification",
      description: "You choose how to verify - on-site or remotely",
    },
    {
      title: "Product Inspection",
      description: "Escrow + physical or remote product inspection",
    },
  ];

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <SectionWrapper className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Image */}
          <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
            <Image
              src="/images/serviceimage.png"
              alt="Arecyl service providers"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Column - Text and Features */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-black leading-tight font-parkinsans">
              Why we are a leading{" "}
              <span className="text-green-600">
                commercial waste service provider
              </span>
            </h2>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed font-parkinsans">
              We&apos;ve built Arecyl with informal recyclers, agents, and
              buyers in mind. From escrow-secured payments to real-time offers,
              our system puts you in control of your trade.
            </p>

            {/* Feature List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 flex items-center justify-center mt-1">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-black mb-1 font-parkinsans">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 font-parkinsans">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
