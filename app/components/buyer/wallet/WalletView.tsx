"use client";

import { useWallet } from "../../../context/WalletContext";
import WalletDashboard from "./WalletDashboard";
import WalletCreationForm from "./WalletCreationForm";

export default function WalletView() {
    const { hasWallet } = useWallet();

    return hasWallet ? <WalletDashboard /> : <WalletCreationForm />;
}
