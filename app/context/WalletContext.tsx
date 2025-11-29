"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Transaction {
    id: string;
    type: "credit" | "debit";
    amount: number;
    description: string;
    date: string;
    status: "completed" | "pending" | "failed";
}

export interface WalletData {
    accountName?: string;
    bankName?: string;
    accountNumber?: string;
    balance: number;
    transactions: Transaction[];
    email: string;
    phoneNumber: string;
    bvn: string;
}

interface WalletContextType {
    hasWallet: boolean;
    walletData: WalletData | null;
    createWallet: (data: Omit<WalletData, "balance" | "transactions">) => void;
    updateBalance: (amount: number) => void;
    addTransaction: (transaction: Omit<Transaction, "id">) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
    const [hasWallet, setHasWallet] = useState(false);
    const [walletData, setWalletData] = useState<WalletData | null>(null);

    const createWallet = (data: Omit<WalletData, "balance" | "transactions">) => {
        setWalletData({
            ...data,
            balance: 0,
            transactions: [],
        });
        setHasWallet(true);
    };

    const updateBalance = (amount: number) => {
        if (walletData) {
            setWalletData({
                ...walletData,
                balance: walletData.balance + amount,
            });
        }
    };

    const addTransaction = (transaction: Omit<Transaction, "id">) => {
        if (walletData) {
            const newTransaction: Transaction = {
                ...transaction,
                id: Date.now().toString(),
            };
            setWalletData({
                ...walletData,
                transactions: [newTransaction, ...walletData.transactions],
            });
        }
    };

    return (
        <WalletContext.Provider
            value={{
                hasWallet,
                walletData,
                createWallet,
                updateBalance,
                addTransaction,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
}

export function useWallet() {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
}
