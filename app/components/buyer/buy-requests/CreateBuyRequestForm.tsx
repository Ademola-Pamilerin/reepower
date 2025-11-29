"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BuyRequestFormFields from "./BuyRequestFormFields";
import BuyRequestSummary from "./BuyRequestSummary";
import BuyRequestSubmissionModal from "./BuyRequestSubmissionModal";
import BuyRequestDeleteModal from "./BuyRequestDeleteModal";
import { useBuyRequests } from "../../../context/BuyRequestsContext";

export default function CreateBuyRequestForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const isEditing = !!editId;
  const { addRequest, updateRequest, deleteRequest, getRequest } = useBuyRequests();

  const [step, setStep] = useState<"form" | "review">("form");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissionStep, setSubmissionStep] = useState<"loading" | "success">("loading");

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteStep, setDeleteStep] = useState<"consent" | "loading" | "success">("consent");

  const [formData, setFormData] = useState({
    materialType: "",
    quantity: "",
    preferredQuantity: "",
    priceMin: "",
    priceMax: "",
    location: "",
    description: "",
    images: [] as File[],
  });

  useEffect(() => {
    if (editId) {
      const existingRequest = getRequest(editId);
      if (existingRequest) {
        setFormData({
          materialType: existingRequest.materialType,
          quantity: existingRequest.quantity,
          preferredQuantity: existingRequest.preferredQuantity || "",
          priceMin: existingRequest.priceMin,
          priceMax: existingRequest.priceMax,
          location: existingRequest.location,
          description: existingRequest.description,
          images: [], // Images handling would be more complex in real app (converting URL to File or separate handling)
        });
      }
    }
  }, [editId, getRequest]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...newFiles] }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("review");
  };

  const handleSubmit = () => {
    setIsModalOpen(true);
    setSubmissionStep("loading");

    setTimeout(() => {
      if (isEditing && editId) {
        updateRequest(editId, {
          materialType: formData.materialType,
          quantity: formData.quantity,
          preferredQuantity: formData.preferredQuantity,
          priceMin: formData.priceMin,
          priceMax: formData.priceMax,
          location: formData.location,
          description: formData.description,
          // Images would be handled here
        });
      } else {
        addRequest({
          materialType: formData.materialType,
          quantity: formData.quantity,
          preferredQuantity: formData.preferredQuantity,
          priceMin: formData.priceMin,
          priceMax: formData.priceMax,
          location: formData.location,
          description: formData.description,
          images: [], // Handle images
        });
      }
      setSubmissionStep("success");
    }, 1500);
  };

  // Delete Flow
  const handleDelete = () => {
    if (isEditing && editId) {
      setDeleteStep("consent");
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!editId) return;

    setDeleteStep("loading");
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    deleteRequest(editId);
    setDeleteStep("success");
  };

  const handleDeleteComplete = () => {
    setIsDeleteModalOpen(false);
    router.push("/buyers/buy-requests");
  };

  const handleCreateNew = () => {
    setIsModalOpen(false);
    setStep("form");
    setFormData({
      materialType: "",
      quantity: "",
      preferredQuantity: "",
      priceMin: "",
      priceMax: "",
      location: "",
      description: "",
      images: [],
    });
    router.push("/buyers/buy-requests/create"); // Clear edit param
  };

  return (
    <div className="w-full bg-white min-h-screen flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-6 md:py-8 flex-1 flex flex-col">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 mb-6">
          <Link href="/buyers/buy-requests" className="hover:text-[#144E42]">
            My Buy Requests
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3 md:w-4 md:h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
          <span className="text-[#144E42] font-medium">Create New Request</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start flex-1">
          {/* Left Column - Image */}
          <div className="w-full lg:w-1/2 hidden lg:block sticky top-8">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="/images/create-buy-request.png"
                alt="Create Buy Request"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
                <h2 className="text-3xl font-bold font-parkinsans mb-2">Post a Buy Request</h2>
                <p className="text-lg opacity-90">
                  Connect with verified sellers and source recyclables efficiently.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Form or Review */}
          <div className="w-full lg:w-1/2">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-[#144E42] font-parkinsans">
                {step === "form" ? "Create New Buy Request" : "Request Summary"}
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-2">
                {step === "form"
                  ? "Fill in the details below to post a new request for recyclable materials."
                  : "Please review your request details below before posting."}
              </p>
            </div>

            {step === "form" ? (
              <BuyRequestFormFields
                formData={formData}
                handleChange={handleChange}
                handleImageChange={handleImageChange}
                handleRemoveImage={handleRemoveImage}
                onSubmit={handleReview}
                isEditing={isEditing}
                onDelete={handleDelete}
              />
            ) : (
              <BuyRequestSummary
                formData={formData}
                onSubmit={handleSubmit}
                onEdit={() => setStep("form")}
              />
            )}
          </div>
        </div>
      </div>

      {/* Submission Modal */}
      <BuyRequestSubmissionModal
        isOpen={isModalOpen}
        step={submissionStep}
        onViewRequests={() => router.push("/buyers/buy-requests")}
        onCreateNew={handleCreateNew}
      />

      {/* Delete Modal */}
      <BuyRequestDeleteModal
        isOpen={isDeleteModalOpen}
        step={deleteStep}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirmDelete={handleConfirmDelete}
        onViewRequests={handleDeleteComplete}
      />
    </div>
  );
}
