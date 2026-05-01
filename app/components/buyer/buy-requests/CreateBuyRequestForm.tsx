"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BuyRequestFormFields from "./BuyRequestFormFields";
import BuyRequestSummary from "./BuyRequestSummary";
import BuyRequestSubmissionModal from "./BuyRequestSubmissionModal";
import BuyRequestDeleteModal from "./BuyRequestDeleteModal";
import { useCreateBuyRequest, useEditBuyRequest, useBuyRequest, useDeleteBuyRequest } from "@/hooks/use-buyers";
import { CreateBuyRequestPayload } from "@/lib/api/buyers-api";
import { toast } from "sonner";
import LoadingDots from "../../shared/LoadingDots";

import { useQueryClient } from "@tanstack/react-query";

export default function CreateBuyRequestForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const editId = searchParams.get("edit");
  const isEditing = !!editId;

  // API Hooks
  const createMutation = useCreateBuyRequest();
  const editMutation = useEditBuyRequest();
  const deleteMutation = useDeleteBuyRequest();
  const { data: existingRequestData, isLoading: isLoadingRequest } = useBuyRequest(editId);

  const [step, setStep] = useState<"form" | "review">("form");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissionStep, setSubmissionStep] = useState<"loading" | "success">("loading");

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteStep, setDeleteStep] = useState<"consent" | "loading" | "success">("consent");

  const [formData, setFormData] = useState<any>({
    materialType: "",
    quantity: "",
    preferredQuantity: "",
    priceMin: "",
    priceMax: "",
    location: "",
    description: "",
    image: null as File | null,
  });

  useEffect(() => {
    if (editId && existingRequestData?.data) {
      const request = existingRequestData.data as any;

      setFormData({
        materialType: request.material_type || request.materialType || "",
        quantity: String(request.qty_needed || request.quantity_needed || request.quantity || ""),
        preferredQuantity: String(request.preferred_quantity || request.preferredQuantity || ""),
        priceMin: String(request.min_price_per_kg || request.priceMin || ""),
        priceMax: String(request.max_price_per_kg || request.priceMax || ""),
        location: request.preferred_location || request.location || "",
        description: request.description || "",
        image: null,
        existingImageUrl: request.image || (request.images && request.images.length > 0 ? request.images[0] : null), // Store existing image URL
      });
    }
  }, [editId, existingRequestData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev: any) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev: any) => ({
      ...prev,
      image: null,
      existingImageUrl: null,
    }));
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("review");
  };

  const handleSubmit = async () => {
    // 🔒 Image is REQUIRED (both create & edit)
    if (!formData.image && !formData.existingImageUrl) {
      toast.error("Please upload an image for the buy request");
      return;
    }

    setIsModalOpen(true);
    setSubmissionStep("loading");

    let finalImageString = "";

    try {
      if (formData.image) {
        toast.info("Processing new image...");
        finalImageString = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(formData.image as File);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
        });
      } else if (formData.existingImageUrl) {
        finalImageString = formData.existingImageUrl;
      }
    } catch (error) {
      console.error("Image conversion failed:", error);
      setIsModalOpen(false);
      toast.error("Failed to process image");
      return;
    }

    // 🛑 Absolute guarantee
    if (!finalImageString || finalImageString.trim() === "") {
      console.error("Empty image string:", finalImageString);
      setIsModalOpen(false);
      toast.error("Invalid image data. Please re-upload.");
      return;
    }

    const payload: CreateBuyRequestPayload = {
      material_type: formData.materialType,
      quantity_needed: Number(formData.quantity.replace(/,/g, "")),
      preferred_quantity: Number(formData.preferredQuantity?.replace(/,/g, "") || 0),
      min_price_per_kg: Number(formData.priceMin.replace(/,/g, "")),
      max_price_per_kg: Number(formData.priceMax.replace(/,/g, "")),
      preferred_location: formData.location,
      description: formData.description,
      image: finalImageString, // ✅ Valid Base64 OR URL
    };

    console.log("Submitting payload image:", payload.image.slice(0, 40));

    if (isEditing && editId) {
      editMutation.mutate(
        { id: editId, payload },
        {
          onSuccess: () => {
            setSubmissionStep("success");
            toast.success("Request updated successfully");
            // Invalidate queries to refresh data
            queryClient.invalidateQueries({ queryKey: ['buyRequest', editId] });
            queryClient.invalidateQueries({ queryKey: ['buyRequests'] });
            queryClient.invalidateQueries({ queryKey: ['buyerDashboard'] });
          },
          onError: (error) => {
            setIsModalOpen(false);
            toast.error(error.message || "Failed to update request");
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          setSubmissionStep("success");
          toast.success("Request created successfully");
          // Invalidate queries to refresh list
          queryClient.invalidateQueries({ queryKey: ['buyRequests'] });
          queryClient.invalidateQueries({ queryKey: ['buyerDashboard'] });
        },
        onError: (error) => {
          setIsModalOpen(false);
          toast.error(error.message || "Failed to create request");
        },
      });
    }
  };


  const handleDelete = () => {
    if (isEditing && editId) {
      setDeleteStep("consent");
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!editId) return;

    setDeleteStep("loading");

    deleteMutation.mutate(editId, {
      onSuccess: () => {
        setDeleteStep("success");
        queryClient.invalidateQueries({ queryKey: ['buyRequests'] });
        queryClient.invalidateQueries({ queryKey: ['buyerDashboard'] });
      },
      onError: () => {
        setIsDeleteModalOpen(false);
        alert("Failed to delete request");
      }
    });
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
      image: null,
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
            <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden">
              <img
                src="/images/create-buy-request.png"
                alt="Create Buy Request"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
                <h2 className="text-3xl font-bold font-parkinsans mb-2">Post a Buy Request</h2>
                <p className="text-lg opacity-90">
                  Connect with verified sellers and source recyclables efficiently.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Form or Review */}
          <div className="w-full lg:w-1/2">
            {isEditing && isLoadingRequest ? (
              <div className="flex flex-col items-center justify-center w-full min-h-[50vh]">
                <LoadingDots text="Fetching request details..." />
              </div>
            ) : (
              <>
                <div className="mb-6 md:mb-8">
                  <h1 className="text-2xl md:text-3xl font-bold text-[#144E42] font-parkinsans">
                    {step === "form" ? (isEditing ? "Edit Buy Request" : "Create New Buy Request") : "Request Summary"}
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
              </>
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
        isEditing={isEditing}
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
