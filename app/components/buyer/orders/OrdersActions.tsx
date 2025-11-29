import Link from "next/link";

interface OrdersActionsProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export default function OrdersActions({ searchQuery, setSearchQuery }: OrdersActionsProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for product"
                        className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:border-[#144E42] focus:ring-2 focus:ring-[#144E42] focus:ring-opacity-20 outline-none transition-all font-parkinsans text-black"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </div>
            </div>
            <Link
                href="/buyers/buy-requests/create"
                className="px-6 py-3 rounded-lg bg-[#B8EE7D] font-parkinsans font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap text-[#144E42] hover:bg-[#a3d96b]"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
                Create New Buy Request
            </Link>
        </div>
    );
}
