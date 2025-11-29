"use client";

import { useState } from "react";
import SectionWrapper from "./SectionWrapper";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "How does ReePower protect my money during a transaction?",
      answer:
        "We use an escrow system. When a buyer pays for materials, the money is held safely by ReePower until the buyer verifies that the material quality.",
    },
    {
      id: 2,
      question: "How do I verify product quality?",
      answer:
        "You can verify product quality either on-site or remotely. Our system allows you to choose your preferred verification method before completing the transaction.",
    },
    {
      id: 3,
      question: "Are prices location-based?",
      answer:
        "Yes, prices are location-based and updated in real-time. This ensures you get accurate pricing based on your location and current market conditions.",
    },
    {
      id: 4,
      question: "How do I become a verified seller?",
      answer:
        "To become a verified seller, create an account and complete the verification process. This includes providing necessary documentation and completing our seller onboarding.",
    },
    {
      id: 5,
      question: "What types of recyclables can I trade?",
      answer:
        "You can trade various types of recyclables including plastic bottles, aluminum cans, plastic containers, and mixed recyclables. Browse our marketplace to see all available categories.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <SectionWrapper className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-black leading-tight font-parkinsans">
            Frequently Asked{" "}
            <span className="text-green-600">Questions</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed font-parkinsans">
            Browse materials from verified sellers. Prices are location-based
            and updated in real time. Use escrow to protect your payment until
            you confirm quality.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg font-semibold text-black font-parkinsans pr-4">
                  {item.question}
                </span>
                <div className="shrink-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                  {openIndex === index ? (
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
                        d="M20 12H4"
                      />
                    </svg>
                  ) : (
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  )}
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed font-parkinsans">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}
