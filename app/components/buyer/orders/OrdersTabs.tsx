interface OrdersTabsProps {
    activeTab: "all" | "ongoing" | "completed";
    setActiveTab: (tab: "all" | "ongoing" | "completed") => void;
}

export default function OrdersTabs({ activeTab, setActiveTab }: OrdersTabsProps) {
    return (
        <div className="flex gap-4 mb-6">
            <button
                onClick={() => setActiveTab("all")}
                className={`px-6 py-2 rounded-lg font-parkinsans font-semibold transition-colors ${activeTab === "all"
                    ? "bg-[#144E42] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
            >
                All
            </button>
            <button
                onClick={() => setActiveTab("ongoing")}
                className={`px-6 py-2 rounded-lg font-parkinsans font-semibold transition-colors ${activeTab === "ongoing"
                    ? "bg-[#144E42] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
            >
                Ongoing
            </button>
            <button
                onClick={() => setActiveTab("completed")}
                className={`px-6 py-2 rounded-lg font-parkinsans font-semibold transition-colors ${activeTab === "completed"
                    ? "bg-[#144E42] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
            >
                Completed
            </button>
        </div>
    );
}
