"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface BuyRequest {
    id: string;
    materialType: string;
    quantity: string;
    preferredQuantity?: string;
    priceMin: string;
    priceMax: string;
    location: string;
    description: string;
    status: "Active" | "Fulfilled" | "Expired";
    dateCreated: string;
    offers: number;
    images: string[]; // URLs for preview
}

interface BuyRequestsContextType {
    requests: BuyRequest[];
    addRequest: (request: Omit<BuyRequest, "id" | "dateCreated" | "status" | "offers">) => void;
    updateRequest: (id: string, data: Partial<BuyRequest>) => void;
    deleteRequest: (id: string) => void;
    getRequest: (id: string) => BuyRequest | undefined;
}

const BuyRequestsContext = createContext<BuyRequestsContextType | undefined>(undefined);

// Initial Dummy Data
const initialRequests: BuyRequest[] = [
    {
        id: "BR-2024-001",
        materialType: "PET Bottles",
        quantity: "500",
        preferredQuantity: "1000",
        priceMin: "500",
        priceMax: "700",
        location: "Lagos, Ikeja",
        description: "Clean, sorted PET bottles required. Must be baled.",
        status: "Active",
        dateCreated: "Oct 24, 2024",
        offers: 3,
        images: ["/images/pet-bottles.jpg"],
    },
    {
        id: "BR-2024-002",
        materialType: "Aluminum Cans",
        quantity: "200",
        priceMin: "300",
        priceMax: "500",
        location: "Abuja, FCT",
        description: "Used aluminum cans, crushed.",
        status: "Active",
        dateCreated: "Oct 25, 2024",
        offers: 0,
        images: [],
    },
    {
        id: "BR-2024-003",
        materialType: "HDPE Plastic",
        quantity: "1000",
        priceMin: "800",
        priceMax: "1200",
        location: "Lagos, Yaba",
        description: "High density polyethylene waste.",
        status: "Expired",
        dateCreated: "Sep 15, 2024",
        offers: 5,
        images: [],
    },
];

export function BuyRequestsProvider({ children }: { children: ReactNode }) {
    const [requests, setRequests] = useState<BuyRequest[]>(initialRequests);

    const addRequest = (data: Omit<BuyRequest, "id" | "dateCreated" | "status" | "offers">) => {
        const newRequest: BuyRequest = {
            ...data,
            id: `BR-2024-${String(requests.length + 1).padStart(3, "0")}`,
            dateCreated: new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
            }),
            status: "Active",
            offers: 0,
        };
        setRequests((prev) => [newRequest, ...prev]);
    };

    const updateRequest = (id: string, data: Partial<BuyRequest>) => {
        setRequests((prev) =>
            prev.map((req) => (req.id === id ? { ...req, ...data } : req))
        );
    };

    const deleteRequest = (id: string) => {
        setRequests((prev) => prev.filter((req) => req.id !== id));
    };

    const getRequest = (id: string) => {
        return requests.find((req) => req.id === id);
    };

    return (
        <BuyRequestsContext.Provider
            value={{ requests, addRequest, updateRequest, deleteRequest, getRequest }}
        >
            {children}
        </BuyRequestsContext.Provider>
    );
}

export function useBuyRequests() {
    const context = useContext(BuyRequestsContext);
    if (context === undefined) {
        throw new Error("useBuyRequests must be used within a BuyRequestsProvider");
    }
    return context;
}
