import React from "react";
import Link from "next/link";

interface Activity {
    id: number;
    type: string;
    message: string;
    time: string;
    icon: string;
}

interface RecentActivityProps {
    activities: Activity[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
    return (
        <div className="col-span-1 rounded-xl border border-gray-200 p-6 bg-[#F3F3F375]">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-black font-parkinsans">
                    Recent Activity
                </h2>
                <Link href="#" className="text-sm text-[#144E42] font-semibold hover:underline">
                    See All
                </Link>
            </div>
            <div className="bg-[#F3F3F375] rounded-xl p-1 space-y-3">
                {activities.map((activity) => (
                    <div key={activity.id} className="bg-white rounded-lg px-3 py-5 flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-lg shrink-0">
                            {activity.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-black font-parkinsans line-clamp-2 mb-1">
                                {activity.message}
                            </p>
                            <div className="flex items-center justify-between gap-2">
                                <button className="flex items-center gap-1 text-xs text-[#144E42] font-semibold hover:underline">
                                    View Detail
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                    </svg>
                                </button>
                                <p className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
