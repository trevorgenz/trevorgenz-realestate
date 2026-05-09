"use client";
import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { ExternalLink, TrendingUp, TrendingDown, Minus } from "lucide-react";

const bendData = {
  priceHistory: [
    { month: "Jun", price: 685 }, { month: "Jul", price: 692 },
    { month: "Aug", price: 698 }, { month: "Sep", price: 701 },
    { month: "Oct", price: 695 }, { month: "Nov", price: 688 },
    { month: "Dec", price: 683 }, { month: "Jan", price: 690 },
    { month: "Feb", price: 706 }, { month: "Mar", price: 718 },
    { month: "Apr", price: 722 }, { month: "May", price: 725 },
  ],
  salesVolume: [
    { month: "Jun", sales: 124 }, { month: "Jul", sales: 138 },
    { month: "Aug", sales: 142 }, { month: "Sep", sales: 119 },
    { month: "Oct", sales: 98 }, { month: "Nov", sales: 87 },
    { month: "Dec", sales: 72 }, { month: "Jan", sales: 81 },
    { month: "Feb", sales: 93 }, { month: "Mar", sales: 108 },
    { month: "Apr", sales: 121 }, { month: "May", sales: 130 },
  ],
  stats: [
    { label: "Median Sale Price", value: "$725,000", change: "+3.6%", up: true },
    { label: "Months of Supply", value: "3.2 mo", change: "+0.4 mo", up: false },
    { label: "Avg Days on Market", value: "28 days", change: "-4 days", up: true },
    { label: "List-to-Sale Ratio", value: "98.2%", change: "+0.5%", up: true },
  ],
};

const redmondData = {
  priceHistory: [
    { month: "Jun", price: 462 }, { month: "Jul", price: 468 },
    { month: "Aug", price: 471 }, { month: "Sep", price: 475 },
    { month: "Oct", price: 470 }, { month: "Nov", price: 463 },
    { month: "Dec", price: 458 }, { month: "Jan", price: 464 },
    { month: "Feb", price: 472 }, { month: "Mar", price: 485 },
    { month: "Apr", price: 492 }, { month: "May", price: 499 },
  ],
  salesVolume: [
    { month: "Jun", sales: 58 }, { month: "Jul", sales: 64 },
    { month: "Aug", sales: 67 }, { month: "Sep", sales: 54 },
    { month: "Oct", sales: 46 }, { month: "Nov", sales: 39 },
    { month: "Dec", sales: 31 }, { month: "Jan", sales: 37 },
    { month: "Feb", sales: 44 }, { month: "Mar", sales: 51 },
    { month: "Apr", sales: 57 }, { month: "May", sales: 62 },
  ],
  stats: [
    { label: "Median Sale Price", value: "$499,500", change: "+0.4%", up: true },
    { label: "Months of Supply", value: "2.8 mo", change: "-0.1 mo", up: true },
    { label: "Avg Days on Market", value: "22 days", change: "-2 days", up: true },
    { label: "List-to-Sale Ratio", value: "99.1%", change: "+0.8%", up: true },
  ],
};

const priceFmt = (v: number) => `$${v}k`;

function StatCard({ label, value, change, up }: { label: string; value: string; change: string; up: boolean | null }) {
  const Icon = up === null ? Minus : up ? TrendingUp : TrendingDown;
  const color = up === null ? "text-gray-400" : up ? "text-emerald-500" : "text-red-400";
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-2">{label}</p>
      <p className="text-[#0f2240] text-2xl font-bold mb-1">{value}</p>
      <p className={`text-xs font-semibold flex items-center gap-1 ${color}`}>
        <Icon size={12} /> {change} vs. last year
      </p>
    </div>
  );
}

export default function MarketUpdates() {
  const [city, setCity] = useState<"bend" | "redmond">("bend");
  const data = city === "bend" ? bendData : redmondData;

  return (
    <section id="market" className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[#e07b39] text-sm font-semibold tracking-widest uppercase mb-2">
              Beacon Report Data
            </p>
            <h2 className="text-4xl font-bold text-[#0f2240]">Market Updates</h2>
            <p className="text-gray-500 mt-2">Central Oregon housing market — updated monthly</p>
          </div>
          <a
            href="https://beaconappraisers.com/market-overviews/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#e07b39] transition-colors"
          >
            Source: Beacon Appraisers <ExternalLink size={13} />
          </a>
        </div>

        {/* City tabs */}
        <div className="flex gap-0 border-b border-gray-200 mb-8">
          {(["bend", "redmond"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCity(c)}
              className={`px-8 py-3 text-sm font-semibold capitalize transition-all ${
                city === c
                  ? "border-b-[3px] border-[#e07b39] text-[#0f2240]"
                  : "border-b-[3px] border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {c === "bend" ? "Bend, OR" : "Redmond, OR"}
            </button>
          ))}
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {data.stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Price trend */}
          <div className="bg-[#faf8f5] rounded-2xl p-6 border border-gray-100">
            <h3 className="text-[#0f2240] font-bold text-base mb-1">Median Sale Price</h3>
            <p className="text-gray-400 text-xs mb-5">12-month trend (in thousands)</p>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={data.priceHistory} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={priceFmt} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={48} />
                <Tooltip formatter={(v) => [`$${(Number(v) * 1000).toLocaleString()}`, "Median Price"]} labelStyle={{ color: "#0f2240", fontWeight: 600 }} contentStyle={{ border: "none", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }} />
                <Line type="monotone" dataKey="price" stroke="#e07b39" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: "#e07b39" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Sales volume */}
          <div className="bg-[#faf8f5] rounded-2xl p-6 border border-gray-100">
            <h3 className="text-[#0f2240] font-bold text-base mb-1">Sales Volume</h3>
            <p className="text-gray-400 text-xs mb-5">Closed transactions per month</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={data.salesVolume} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={32} />
                <Tooltip formatter={(v) => [v, "Sales"]} labelStyle={{ color: "#0f2240", fontWeight: 600 }} contentStyle={{ border: "none", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }} />
                <Bar dataKey="sales" fill="#0f2240" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-6 text-center">
          Data sourced from Beacon Appraisers monthly report — Deschutes County SFR sales. Updated each month when new report is published.
        </p>
      </div>
    </section>
  );
}
