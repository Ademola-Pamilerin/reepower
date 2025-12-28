import React from "react";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface SalesData {
    day: string;
    sales: number;
}

interface WeeklySalesTrendProps {
    data: SalesData[];
}

export default function WeeklySalesTrend({ data }: WeeklySalesTrendProps) {
    return (
        <div className="col-span-1 bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-black font-parkinsans">
                    Weekly Sales Trend
                </h2>
                <Link href="#" className="text-sm text-[#144E42] font-semibold hover:underline">
                    See All
                </Link>
            </div>
            <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#B8EE7D" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#B8EE7D" stopOpacity={0.1} />
                        </linearGradient>
                    </defs>
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
                    <Area
                        type="monotone"
                        dataKey="sales"
                        stroke="#82ca9d"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorSales)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
