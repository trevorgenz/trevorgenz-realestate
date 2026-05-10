"use client";
import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, ReferenceLine,
} from "recharts";
import { ExternalLink, TrendingUp, TrendingDown, Minus } from "lucide-react";

// Data from Beacon Appraisal Group — May 2026 report (May 2025 – April 2026)
const bendData = {
  priceHistory: [
    { month: "May", price: 700 }, { month: "Jun", price: 700 },
    { month: "Jul", price: 700 }, { month: "Aug", price: 693 },
    { month: "Sep", price: 713 }, { month: "Oct", price: 698 },
    { month: "Nov", price: 686 }, { month: "Dec", price: 688 },
    { month: "Jan", price: 699 }, { month: "Feb", price: 682 },
    { month: "Mar", price: 680 }, { month: "Apr", price: 669 },
  ],
  salesVolume: [
    { month: "May", sales: 45 }, { month: "Jun", sales: 45 },
    { month: "Jul", sales: 45 }, { month: "Aug", sales: 44 },
    { month: "Sep", sales: 43 }, { month: "Oct", sales: 51 },
    { month: "Nov", sales: 53 }, { month: "Dec", sales: 53 },
    { month: "Jan", sales: 56 }, { month: "Feb", sales: 62 },
    { month: "Mar", sales: 66 }, { month: "Apr", sales: 66 },
  ],
  monthsSupply: [
    { month: "May", mos: 3.5 }, { month: "Jun", mos: 4.0 },
    { month: "Jul", mos: 4.0 }, { month: "Aug", mos: 3.5 },
    { month: "Sep", mos: 3.5 }, { month: "Oct", mos: 3.0 },
    { month: "Nov", mos: 3.0 }, { month: "Dec", mos: 3.0 },
    { month: "Jan", mos: 3.0 }, { month: "Feb", mos: 3.0 },
    { month: "Mar", mos: 3.0 }, { month: "Apr", mos: 3.0 },
  ],
  stats: [
    { label: "Median Sale Price", value: "$669,000", change: "-6.3% vs Apr '25", up: false },
    { label: "Months of Supply", value: "3 months", change: "Balanced market", up: null },
    { label: "Annual Sales Vol.", value: "1,770 homes", change: "~147 sales/mo avg", up: null },
    { label: "Active Listings", value: "470 homes", change: "3 mo inventory", up: null },
  ],
};

const redmondData = {
  priceHistory: [
    { month: "May", price: 495 }, { month: "Jun", price: 493 },
    { month: "Jul", price: 500 }, { month: "Aug", price: 491 },
    { month: "Sep", price: 498 }, { month: "Oct", price: 500 },
    { month: "Nov", price: 497 }, { month: "Dec", price: 483 },
    { month: "Jan", price: 472 }, { month: "Feb", price: 473 },
    { month: "Mar", price: 469 }, { month: "Apr", price: 460 },
  ],
  salesVolume: [
    { month: "May", sales: 34 }, { month: "Jun", sales: 37 },
    { month: "Jul", sales: 38 }, { month: "Aug", sales: 41 },
    { month: "Sep", sales: 46 }, { month: "Oct", sales: 46 },
    { month: "Nov", sales: 47 }, { month: "Dec", sales: 47 },
    { month: "Jan", sales: 51 }, { month: "Feb", sales: 50 },
    { month: "Mar", sales: 57 }, { month: "Apr", sales: 60 },
  ],
  monthsSupply: [
    { month: "May", mos: 3.5 }, { month: "Jun", mos: 3.5 },
    { month: "Jul", mos: 3.5 }, { month: "Aug", mos: 3.0 },
    { month: "Sep", mos: 3.0 }, { month: "Oct", mos: 3.0 },
    { month: "Nov", mos: 3.0 }, { month: "Dec", mos: 3.0 },
    { month: "Jan", mos: 3.0 }, { month: "Feb", mos: 3.0 },
    { month: "Mar", mos: 3.0 }, { month: "Apr", mos: 3.0 },
  ],
  stats: [
    { label: "Median Sale Price", value: "$460,000", change: "-7.8% vs Apr '25", up: false },
    { label: "Months of Supply", value: "3 months", change: "Balanced market", up: null },
    { label: "Annual Sales Vol.", value: "583 homes", change: "~49 sales/mo avg", up: null },
    { label: "Active Listings", value: "150 homes", change: "3 mo inventory", up: null },
  ],
};

const priceFmt = (v: number) => `$${v}k`;

function StatCard({ label, value, change, up }: { label: string; value: string; change: string; up: boolean | null }) {
  const Icon = up === null ? Minus : up ? TrendingUp : TrendingDown;
  const color = up === null ? "text-gray-400" : up ? "text-emerald-500" : "text-red-400";
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-2">{label}</p>
      <p className="text-[#0f172a] text-2xl font-bold mb-1">{value}</p>
      <p className={`text-xs font-semibold flex items-center gap-1 ${color}`}>
        <Icon size={12} /> {change}
      </p>
    </div>
  );
}

const mosZoneLabel = (mos: number) => {
  if (mos < 3) return "Seller's Market";
  if (mos <= 6) return "Balanced Market";
  return "Buyer's Market";
};

export default function MarketUpdates() {
  const [city, setCity] = useState<"bend" | "redmond">("bend");
  const data = city === "bend" ? bendData : redmondData;

  return (
    <section id="market" className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[#3b82f6] text-sm font-semibold tracking-widest uppercase mb-2">
              Beacon Report Data
            </p>
            <h2 className="text-4xl font-bold text-[#0f172a]">Market Updates</h2>
            <p className="text-gray-500 mt-2">Central Oregon housing market — updated monthly</p>
          </div>
          <a
            href="https://beaconappraisers.com/market-overviews/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#3b82f6] transition-colors"
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
                  ? "border-b-[3px] border-[#3b82f6] text-[#0f172a]"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Price trend */}
          <div className="bg-[#f1f5f9] rounded-2xl p-6 border border-gray-100">
            <h3 className="text-[#0f172a] font-bold text-base mb-1">Median Sale Price</h3>
            <p className="text-gray-400 text-xs mb-5">12-month trend (in thousands)</p>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={data.priceHistory} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={priceFmt} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={48} />
                <Tooltip formatter={(v) => [`$${(Number(v) * 1000).toLocaleString()}`, "Median Price"]} labelStyle={{ color: "#0f172a", fontWeight: 600 }} contentStyle={{ border: "none", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }} />
                <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: "#3b82f6" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Sales volume */}
          <div className="bg-[#f1f5f9] rounded-2xl p-6 border border-gray-100">
            <h3 className="text-[#0f172a] font-bold text-base mb-1">Sales Volume</h3>
            <p className="text-gray-400 text-xs mb-5">Closed transactions per month</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={data.salesVolume} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={32} />
                <Tooltip formatter={(v) => [v, "Sales"]} labelStyle={{ color: "#0f172a", fontWeight: 600 }} contentStyle={{ border: "none", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }} />
                <Bar dataKey="sales" fill="#0f172a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Months of Supply chart — full width */}
        <div className="bg-[#f1f5f9] rounded-2xl p-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-5">
            <div>
              <h3 className="text-[#0f172a] font-bold text-base mb-1">Months of Supply</h3>
              <p className="text-gray-400 text-xs">Active listings ÷ monthly sales rate · under 3 = seller's market · 3–6 = balanced · over 6 = buyer's market</p>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${
              data.monthsSupply[data.monthsSupply.length - 1].mos < 3
                ? "bg-orange-100 text-orange-600"
                : data.monthsSupply[data.monthsSupply.length - 1].mos <= 6
                ? "bg-emerald-100 text-emerald-600"
                : "bg-blue-100 text-blue-600"
            }`}>
              {mosZoneLabel(data.monthsSupply[data.monthsSupply.length - 1].mos)}
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data.monthsSupply} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis
                domain={[0, 7]}
                ticks={[0, 1, 2, 3, 4, 5, 6, 7]}
                tickFormatter={(v) => `${v}mo`}
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                width={40}
              />
              <Tooltip
                formatter={(v) => [`${Number(v).toFixed(1)} months`, "Supply"]}
                labelStyle={{ color: "#0f172a", fontWeight: 600 }}
                contentStyle={{ border: "none", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
              />
              <ReferenceLine y={3} stroke="#10b981" strokeDasharray="4 3" strokeWidth={1.5} label={{ value: "Balanced (3mo)", position: "insideTopRight", fontSize: 10, fill: "#10b981" }} />
              <ReferenceLine y={6} stroke="#3b82f6" strokeDasharray="4 3" strokeWidth={1.5} label={{ value: "Buyer's Market (6mo)", position: "insideTopRight", fontSize: 10, fill: "#3b82f6" }} />
              <Line type="monotone" dataKey="mos" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4, fill: "#f59e0b", strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <p className="text-xs text-gray-400 mt-6 text-center">
          Data sourced from Beacon Appraisers May 2026 report — Deschutes County SFR, May 2025–April 2026. Updated each month when new report is published.
        </p>
      </div>
    </section>
  );
}
