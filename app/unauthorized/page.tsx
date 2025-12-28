"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function UnauthorizedContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectPath = searchParams.get("redirect") || "/auth";
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        // Countdown timer
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push("/auth");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#A8E959]/10 to-[#14841E]/10">
            <div className="max-w-md w-full mx-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    {/* Icon */}
                    <div className="mb-6">
                        <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                            <svg
                                className="w-10 h-10 text-red-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 font-parkinsans">
                        Access Denied
                    </h1>

                    {/* Message */}
                    <p className="text-gray-600 mb-6 font-parkinsans">
                        You need to be logged in to access this page. Please sign in to continue.
                    </p>

                    {/* Countdown */}
                    <div className="mb-6">
                        <p className="text-sm text-gray-500 font-parkinsans">
                            Redirecting to login in{" "}
                            <span className="font-bold text-[#14841E]">{countdown}</span>{" "}
                            seconds...
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={() => router.push("/auth")}
                            className="w-full py-3 px-4 bg-[#A8E959] text-[#144E42] font-parkinsans font-semibold rounded-lg hover:bg-[#96d147] transition-colors"
                        >
                            Sign In Now
                        </button>
                        <button
                            onClick={() => router.push("/signup")}
                            className="w-full py-3 px-4 bg-white text-[#14841E] font-parkinsans font-semibold rounded-lg border-2 border-[#14841E] hover:bg-[#14841E]/5 transition-colors"
                        >
                            Create Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function UnauthorizedPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#14841E]"></div>
            </div>
        }>
            <UnauthorizedContent />
        </Suspense>
    );
}
