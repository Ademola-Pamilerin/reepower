import React, { useState } from "react";
import LoadingDots from "../../shared/LoadingDots";

interface SellerReportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type ReportStep = "form" | "loading" | "success";

export default function SellerReportModal({ isOpen, onClose }: SellerReportModalProps) {
    const [step, setStep] = useState<ReportStep>("form");
    const [reason, setReason] = useState("");
    const [description, setDescription] = useState("");

    if (!isOpen) return null;

    const handleReport = (e: React.FormEvent) => {
        e.preventDefault();
        setStep("loading");

        // Simulate API call
        setTimeout(() => {
            setStep("success");
        }, 2000);
    };

    const handleClose = () => {
        onClose();
        // Reset state after closing
        setTimeout(() => {
            setStep("form");
            setReason("");
            setDescription("");
        }, 300);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-in zoom-in-95 duration-200">
                {step === "form" && (
                    <>
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-bold text-black font-parkinsans mb-2">Report Seller</h2>
                            <p className="text-sm text-gray-500">
                                Use this form to report a suspicious, abusive, or unprofessional behavior. Your report is confidential.
                            </p>
                        </div>

                        <form onSubmit={handleReport} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                                    Why are you reporting this seller?
                                </label>
                                <div className="relative">
                                    <select
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        required
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#144E42] focus:ring-1 focus:ring-[#144E42] appearance-none"
                                    >
                                        <option value="">Select a Reason</option>
                                        <option value="fraud">Fraudulent Activity</option>
                                        <option value="abuse">Abusive Language</option>
                                        <option value="spam">Spam</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                                    Description
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    placeholder="Describe the issue..."
                                    rows={4}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#144E42] focus:ring-1 focus:ring-[#144E42] resize-none"
                                ></textarea>
                            </div>

                            <div className="pt-2 flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="flex-1 py-3 border border-gray-200 text-gray-600 font-medium rounded-lg font-parkinsans hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 bg-[#B8EE7D] text-[#144E42] font-bold rounded-lg font-parkinsans hover:bg-[#a3d96b] transition-colors"
                                >
                                    Report Seller
                                </button>
                            </div>
                        </form>
                    </>
                )}

                {step === "loading" && (
                    <div className="py-12 flex flex-col items-center justify-center text-center">
                        <LoadingDots text="Submitting Report..." />
                    </div>
                )}

                {step === "success" && (
                    <div className="text-center py-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-green-600">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-black font-parkinsans mb-2">
                            Report Submitted
                        </h3>
                        <p className="text-gray-500 mb-6 text-sm">
                            Your report has been successfully submitted. We will review it shortly.
                        </p>
                        <button
                            onClick={handleClose}
                            className="w-full py-3 bg-[#B8EE7D] text-[#144E42] font-bold rounded-lg font-parkinsans hover:bg-[#a3d96b] transition-colors"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
