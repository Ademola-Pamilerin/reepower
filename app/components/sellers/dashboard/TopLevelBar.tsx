import React from "react";
import Link from "next/link";

interface LevelItem {
    name: string;
    category: string;
    percentage: number;
}

interface TopLevelBarProps {
    items: LevelItem[];
}

export default function TopLevelBar({ items }: TopLevelBarProps) {
    return (
        <div className="col-span-1 bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-black font-parkinsans">
                    Top 3 Most Level Bar
                </h2>
                <Link href="#" className="text-sm text-[#144E42] font-semibold hover:underline">
                    See All
                </Link>
            </div>
            <div className="space-y-6">
                {items.map((item, index) => (
                    <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <p className="text-sm font-semibold text-black font-parkinsans">
                                    {item.name}
                                </p>
                                <p className="text-xs text-gray-500">{item.category}</p>
                            </div>
                            <span className="text-sm font-semibold text-[#144E42]">
                                {item.percentage}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-[#144E42] to-[#B8EE7D] h-2 rounded-full transition-all duration-300"
                                style={{ width: `${item.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
