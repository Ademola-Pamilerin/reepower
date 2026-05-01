import React from "react";
import { useWallet } from "@/app/context/WalletContext";

export default function DashboardHeader() {
    const { walletData } = useWallet();
    const [name, setName] = React.useState("User");
    const currentTime = new Date().getHours();
    const greeting = currentTime < 12 ? "Good Morning" : currentTime < 18 ? "Good Afternoon" : "Good Evening";

    React.useEffect(() => {
        const userData = localStorage.getItem("user_data");
        if (userData) {
            try {
                const parsed = JSON.parse(userData);
                if (parsed && parsed.name) {
                    setName(parsed.name);
                }
            } catch (e) {
                console.error("Failed to parse user data", e);
            }
        }
    }, []);

    return (
        <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-black font-parkinsans">
                {greeting} {name.split(" ")[0]}
            </h1>
        </div>
    );
}
