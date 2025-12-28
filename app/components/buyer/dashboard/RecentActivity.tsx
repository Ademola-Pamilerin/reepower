import React from "react";
import Link from "next/link";

interface Activity {
    id?: number;
    type?: string;
    message?: string;
    time?: string;
    icon?: string;
}

interface RecentActivityProps {
    activities: Activity[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-black font-parkinsans">
                    Recent Activity
                </h2>
                <Link href="#" className="text-sm text-[#144E42] font-semibold hover:underline">
                    See All
                </Link>
            </div>
            <div className="space-y-4">
                {activities.map((activity) => (
                    <div key={activity.id} className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-lg shrink-0">
                            {activity.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-black font-parkinsans line-clamp-2">
                                {activity.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
