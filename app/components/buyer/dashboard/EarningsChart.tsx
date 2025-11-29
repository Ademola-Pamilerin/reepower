import React from "react";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface EarningsData {
    day: string;
    amount: number;
}

interface EarningsChartProps {
    data: EarningsData[];
}

export default function EarningsChart({ data }: EarningsChartProps) {
    return (
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-black font-parkinsans">
                    Earnings/Progress Tracker
                </h2>
                <Link href="#" className="text-sm text-[#144E42] font-semibold hover:underline">
                    See All
                </Link>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #e0e0e0",
                            borderRadius: "8px",
                        }}
                    />
                    <Bar dataKey="amount" fill="#B8EE7D" radius={[8, 8, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
