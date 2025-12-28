import React from "react";
import Link from "next/link";

export default function MarketplaceHeader() {
    return (
        <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-black font-parkinsans mb-2">
                        Seller's Market Place
                    </h1>
                    <p className="text-sm text-gray-600 font-parkinsans">
                        Enter your registered email or phone number. We'll send you a code to reset your password.
                    </p>
                </div>
            </div>
        </div>
    );
}
