"use client";
import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Minus, ExternalLink } from "lucide-react";

type RateData = {
  current30: number;
  current15: number;
  change30: number;
  change15: number;
  asOf: string;
  history: { date: string; rate30: number; rate15: number }[];
};

function ChangeChip({ change }: { change: number }) {
  if (change === 0) return <span className="flex items-center gap-1 text-gray-400 text-xs font-semibold"><Minus size={11} /> Unchanged</span>;
  const up = change > 0;
  const Icon = up ? TrendingUp : TrendingDown;
  const color = up ? "text-red-400" : "text-emerald-500";
  return (
    <span className={`flex items-center gap-1 text-xs font-semibold ${color}`}>
      <Icon size={11} /> {up ? "+" : ""}{change.toFixed(2)}% this week
    </span>
  );
}

export default function MortgageRates() {
  const [data, setData] = useState<RateData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/mortgage-rates")
      .then((r) => r.json())
      .then((d) => d.error ? setError(true) : setData(d))
      .catch(() => setError(true));
  }, []);

  return (
    <section id="rates" className="bg-[#f1f5f9] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[#3b82f6] text-sm font-semibold tracking-widest uppercase mb-2">
              Freddie Mac Survey
            </p>
            <h2 className="text-4xl font-bold text-[#0f172a]">Mortgage Rates</h2>
            <p className="text-gray-500 mt-2">
              National averages — updated weekly every Thursday
              {data && <span className="ml-2 text-gray-400 text-sm">· as of {data.asOf}</span>}
            </p>
          </div>
          <a
            href="https://www.freddiemac.com/pmms"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#3b82f6] transition-colors"
          >
            Source: Freddie Mac PMMS <ExternalLink size={13} />
          </a>
        </div>

        {error && (
          <p className="text-gray-400 text-sm text-center py-12">Rate data temporarily unavailable — check back shortly.</p>
        )}

        {!data && !error && (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-[#3b82f6] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {data && (
          <>
            {/* Rate cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-3">30-Year Fixed</p>
                <p className="text-[#0f172a] text-5xl font-bold mb-2">{data.current30.toFixed(2)}<span className="text-2xl text-gray-400">%</span></p>
                <ChangeChip change={data.change30} />
              </div>
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-3">15-Year Fixed</p>
                <p className="text-[#0f172a] text-5xl font-bold mb-2">{data.current15.toFixed(2)}<span className="text-2xl text-gray-400">%</span></p>
                <ChangeChip change={data.change15} />
              </div>
            </div>

            {/* Trend chart */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-[#0f172a] font-bold text-base mb-1">12-Week Rate Trend</h3>
              <p className="text-gray-400 text-xs mb-5">National average — Freddie Mac Primary Mortgage Market Survey</p>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={data.history} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
                  <YAxis
                    domain={["auto", "auto"]}
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                    width={44}
                  />
                  <Tooltip
                    formatter={(v, name) => [`${Number(v).toFixed(2)}%`, name === "rate30" ? "30-Year" : "15-Year"]}
                    labelStyle={{ color: "#0f172a", fontWeight: 600 }}
                    contentStyle={{ border: "none", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
                  />
                  <Legend formatter={(v) => v === "rate30" ? "30-Year Fixed" : "15-Year Fixed"} wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="rate30" stroke="#3b82f6" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="rate15" stroke="#0f172a" strokeWidth={2} dot={false} activeDot={{ r: 5 }} strokeDasharray="5 3" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <p className="text-xs text-gray-400 mt-4 text-center">
              Rates are national averages and may differ from individual loan quotes. Contact Trevor for a personalized rate estimate.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
