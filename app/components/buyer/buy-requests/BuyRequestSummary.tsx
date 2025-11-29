"use client";

import React from "react";

interface BuyRequestSummaryProps {
    formData: {
        materialType: string;
        quantity: string;
        preferredQuantity: string;
        priceMin: string;
        priceMax: string;
        location: string;
        description: string;
        images: File[];
    };
    onSubmit: () => void;
    onEdit: () => void;
}

export default function BuyRequestSummary({
    formData,
    onSubmit,
    onEdit,
}: BuyRequestSummaryProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-8 shadow-sm space-y-6">
            {/* Summary Header */}
            <div className="bg-[#E8F5E9] p-4 rounded-lg flex justify-between items-center">
                <span className="font-bold text-[#144E42] text-lg">{formData.materialType}</span>
                <span className="font-bold text-[#144E42] text-lg">
                    ₦{Number(formData.priceMin).toLocaleString()} - ₦{Number(formData.priceMax).toLocaleString()}
                </span>
            </div>

            {/* Details Grid */}
            <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-600 font-medium">Commodity Type:</span>
                    <span className="text-gray-900 font-semibold">{formData.materialType}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-600 font-medium">Quantity Needed:</span>
                    <span className="text-gray-900 font-semibold">{formData.quantity}kg</span>
                </div>
                {formData.preferredQuantity && (
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600 font-medium">Preferred Quantity:</span>
                        <span className="text-gray-900 font-semibold">{formData.preferredQuantity}kg</span>
                    </div>
                )}
                <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-600 font-medium">Location:</span>
                    <span className="text-gray-900 font-semibold">{formData.location}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-600 font-medium">Description:</span>
                    <span className="text-gray-900 font-semibold text-right max-w-[60%]">{formData.description}</span>
                </div>
            </div>

            {/* Uploaded Images */}
            {formData.images.length > 0 && (
                <div>
                    <p className="text-gray-600 font-medium mb-3">Uploaded Images</p>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {formData.images.map((file, index) => (
                            <div key={index} className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={`Uploaded Preview ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 space-y-3">
                <button
                    onClick={onSubmit}
                    className="w-full px-6 py-3 md:py-4 rounded-lg bg-[#84D35E] text-[#144E42] font-parkinsans font-bold text-base md:text-lg hover:bg-[#76c052] transition-colors shadow-md"
                >
                    Upload Request
                </button>
                <button
                    onClick={onEdit}
                    className="w-full px-6 py-3 md:py-4 rounded-lg border border-gray-300 text-gray-700 font-parkinsans font-bold text-base md:text-lg hover:bg-gray-50 transition-colors"
                >
                    Edit
                </button>
            </div>
        </div>
    );
}
