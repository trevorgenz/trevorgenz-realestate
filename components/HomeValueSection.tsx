"use client";
import { useState } from "react";
import { Home, CheckCircle, TrendingUp, Clock, Shield } from "lucide-react";

const PERKS = [
  { icon: TrendingUp, text: "Accurate local comp analysis" },
  { icon: Clock,      text: "Response within 24 hours" },
  { icon: Shield,     text: "Zero obligation, 100% free" },
];

const TIMEFRAMES = [
  "Just curious",
  "12+ months",
  "6–12 months",
  "3–6 months",
  "ASAP",
];

type Status = "idle" | "loading" | "success" | "error";

export default function HomeValueSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    address: "", name: "", email: "", phone: "", timeframe: TIMEFRAMES[0],
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/home-value", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="home-value" className="bg-[#0f172a] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — copy */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Home size={16} className="text-[#3b82f6]" />
              <p className="text-[#3b82f6] text-sm font-semibold tracking-widest uppercase">
                Free Home Value Report
              </p>
            </div>
            <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-5">
              What's Your<br />
              <span className="text-[#3b82f6]">Home Worth?</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-md">
              Get a free Comparative Market Analysis from a local Central Oregon
              expert — not an algorithm. Real data, real insight.
            </p>
            <ul className="space-y-4">
              {PERKS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-white/70">
                  <div className="w-8 h-8 rounded-lg bg-[#3b82f6]/15 flex items-center justify-center flex-shrink-0">
                    <Icon size={15} className="text-[#3b82f6]" />
                  </div>
                  <span className="text-sm font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form card */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
                <CheckCircle size={48} className="text-emerald-500" />
                <h3 className="text-[#0f172a] text-2xl font-bold">Request Received!</h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  Thanks! I'll personally review your property and get back to you within 24 hours.
                </p>
                <p className="text-[#3b82f6] font-semibold text-sm">— Trevor Genz</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-[#0f172a] text-xl font-bold mb-1">Get Your Free Report</h3>
                  <p className="text-gray-400 text-sm">No obligation — just honest local insight.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Property Address *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="123 Main St, Bend, OR"
                    value={form.address}
                    onChange={set("address")}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#0f172a] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Your Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={set("name")}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#0f172a] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="(541) 000-0000"
                      value={form.phone}
                      onChange={set("phone")}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#0f172a] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Email *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={set("email")}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#0f172a] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Selling Timeframe
                  </label>
                  <select
                    value={form.timeframe}
                    onChange={set("timeframe")}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent bg-white"
                  >
                    {TIMEFRAMES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-xs">Something went wrong — please call or email me directly.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-60 text-white font-bold py-4 rounded-lg transition-colors text-sm tracking-wide"
                >
                  {status === "loading" ? "Sending…" : "Get My Free Home Value →"}
                </button>

                <p className="text-center text-xs text-gray-400">
                  Your info is never shared or sold.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
