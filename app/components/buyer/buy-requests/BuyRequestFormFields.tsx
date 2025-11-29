"use client";

import React from "react";

interface BuyRequestFormFieldsProps {
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
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => void;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveImage: (index: number) => void;
    onSubmit: (e: React.FormEvent) => void;
    isEditing?: boolean;
    onDelete?: () => void;
}

export default function BuyRequestFormFields({
    formData,
    handleChange,
    handleImageChange,
    handleRemoveImage,
    onSubmit,
    isEditing = false,
    onDelete,
}: BuyRequestFormFieldsProps) {
    const isValid =
        formData.materialType &&
        formData.quantity &&
        formData.priceMin &&
        formData.priceMax &&
        formData.location &&
        formData.description;

    return (
        <form onSubmit={onSubmit} className="bg-white border border-gray-200 rounded-xl p-4 md:p-8 shadow-sm">
            <div className="space-y-5 md:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Material Type */}
                    <div>
                        <label htmlFor="materialType" className="block text-sm font-semibold text-gray-700 mb-2">
                            Material Type
                        </label>
                        <select
                            id="materialType"
                            name="materialType"
                            value={formData.materialType}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#144E42] focus:ring-2 focus:ring-[#144E42] focus:ring-opacity-20 outline-none transition-all bg-white text-sm md:text-base text-black font-normal"
                            required
                        >
                            <option value="">Select a material type</option>
                            <option value="PET Bottles">PET Bottles</option>
                            <option value="Aluminum Cans">Aluminum Cans</option>
                            <option value="HDPE Plastic">HDPE Plastic</option>
                            <option value="LDPE Plastic">LDPE Plastic</option>
                            <option value="Glass">Glass</option>
                            <option value="Paper/Cardboard">Paper/Cardboard</option>
                            <option value="Metals">Metals</option>
                            <option value="E-Waste">E-Waste</option>
                            <option value="Mixed Recyclables">Mixed Recyclables</option>
                        </select>
                    </div>

                    {/* Quantity */}
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-2">
                            Quantity Needed (kg)
                        </label>
                        <input
                            type="text"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            placeholder="e.g. 500"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#144E42] focus:ring-2 focus:ring-[#144E42] focus:ring-opacity-20 outline-none transition-all text-sm md:text-base text-black font-normal"
                            required
                        />
                    </div>
                </div>

                {/* Preferred Quantity */}
                <div>
                    <label htmlFor="preferredQuantity" className="block text-sm font-semibold text-gray-700 mb-2">
                        Preferred Quantity (kg)
                    </label>
                    <input
                        type="text"
                        id="preferredQuantity"
                        name="preferredQuantity"
                        value={formData.preferredQuantity}
                        onChange={handleChange}
                        placeholder="e.g. 1000"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#144E42] focus:ring-2 focus:ring-[#144E42] focus:ring-opacity-20 outline-none transition-all text-sm md:text-base text-black font-normal"
                    />
                </div>

                {/* Price Range */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="priceMin" className="block text-sm font-semibold text-gray-700 mb-2">
                            Min Price per kg (₦)
                        </label>
                        <input
                            type="number"
                            id="priceMin"
                            name="priceMin"
                            value={formData.priceMin}
                            onChange={handleChange}
                            placeholder="e.g. 800"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#144E42] focus:ring-2 focus:ring-[#144E42] focus:ring-opacity-20 outline-none transition-all text-sm md:text-base text-black font-normal"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="priceMax" className="block text-sm font-semibold text-gray-700 mb-2">
                            Max Price per kg (₦)
                        </label>
                        <input
                            type="number"
                            id="priceMax"
                            name="priceMax"
                            value={formData.priceMax}
                            onChange={handleChange}
                            placeholder="e.g. 1000"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#144E42] focus:ring-2 focus:ring-[#144E42] focus:ring-opacity-20 outline-none transition-all text-sm md:text-base text-black font-normal"
                            required
                        />
                    </div>
                </div>

                {/* Location */}
                <div>
                    <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                        Preferred Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Lagos, Ikeja"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#144E42] focus:ring-2 focus:ring-[#144E42] focus:ring-opacity-20 outline-none transition-all text-sm md:text-base text-black font-normal"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                        Description / Requirements
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Describe specific requirements (e.g. clean, sorted, baled)..."
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#144E42] focus:ring-2 focus:ring-[#144E42] focus:ring-opacity-20 outline-none transition-all resize-none text-sm md:text-base text-black font-normal"
                        required
                    ></textarea>
                </div>

                {/* Upload Image */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Upload Sample / Reference Image
                    </label>
                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-[#144E42] transition-colors cursor-pointer bg-gray-50">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-8 h-8 text-gray-400 mb-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                        </svg>
                        <p className="text-sm text-gray-600 font-medium">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                        />
                        {formData.images.length > 0 && (
                            <p className="text-xs text-[#144E42] font-medium mt-2">
                                {formData.images.length} file(s) selected
                            </p>
                        )}
                    </div>
                    {/* Image Previews in Form */}
                    {formData.images.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-4">
                            {formData.images.map((file, index) => (
                                <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow-sm"
                                        title="Remove image"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <div className="pt-2 md:pt-4 flex gap-4">
                    <button
                        type="submit"
                        disabled={!isValid}
                        className={`flex-1 px-6 py-3 md:py-4 rounded-lg font-parkinsans font-bold text-base md:text-lg transition-colors shadow-lg hover:shadow-xl ${isValid
                            ? "bg-[#144E42] text-white hover:bg-[#0f3b32]"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        Review Request
                    </button>

                    {isEditing && (
                        <button
                            type="button"
                            className="px-6 py-3 md:py-4 rounded-lg border border-red-500 text-red-500 font-parkinsans font-bold text-base md:text-lg hover:bg-red-50 transition-colors"
                            onClick={onDelete}
                        >
                            Delete Request
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
}
