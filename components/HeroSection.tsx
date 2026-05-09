"use client";
import { useEffect, useState } from "react";
import { Phone, Mail, ChevronDown } from "lucide-react";

const BASE = "https://images.unsplash.com/photo-";
const Q = "?w=1920&q=85&fit=crop&auto=format";

const slides = [
  { id: "1585418515278-4d2246f56a28", label: "Smith Rock State Park" },
  { id: "1528672903139-6a4496639a68", label: "Smith Rock State Park" },
  { id: "1582332872732-d3784c63d448", label: "Mt. Bachelor" },
  { id: "1563328234-3b7d345fbe05",    label: "Mt. Bachelor" },
  { id: "1718927445954-b050d18bc135", label: "Three Sisters Wilderness" },
  { id: "1568666062525-111347cc88e4", label: "Three Sisters Wilderness" },
  { id: "1638176818276-a4e90c753da6", label: "Cascade Mountains" },
  { id: "1720999748915-ac0bfdbab7d5", label: "Bend — Old Mill District" },
  { id: "1686903430763-ce58bce57eac", label: "Bend, Oregon" },
  { id: "1680693315986-227af5667594", label: "Redmond, Oregon" },
].map((s) => ({ ...s, url: `${BASE}${s.id}${Q}` }));

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative h-screen min-h-[600px] overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`slide ${i === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${s.url})` }}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* Location label */}
      <div className="absolute bottom-14 right-6 z-20 text-white/40 text-xs tracking-widest uppercase">
        {slides[current].label}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-6 h-2 bg-[#3b82f6]" : "w-2 h-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
        <p className="text-[#3b82f6] text-sm font-semibold tracking-widest uppercase mb-4">
          Central Oregon Real Estate
        </p>
        <h1 className="text-white text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6">
          Trevor Genz
        </h1>
        <p className="text-white/80 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
          Your local guide to buying and selling in Bend &amp; Redmond.
          Real data. Real insight. Real results.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#listings"
            className="bg-[#3b82f6] hover:bg-[#60a5fa] text-white font-semibold px-8 py-4 rounded-lg transition-all hover:-translate-y-0.5 text-base"
          >
            View New Listings
          </a>
          <a
            href="#market"
            className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-lg transition-all hover:-translate-y-0.5 text-base backdrop-blur-sm"
          >
            Market Data
          </a>
        </div>

        <div className="flex gap-6 mt-10 text-white/70 text-sm">
          <a href="tel:5412797522" className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors">
            <Phone size={14} /> (541) 279-7522
          </a>
          <a href="mailto:trevorgenz@gmail.com" className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors">
            <Mail size={14} /> trevorgenz@gmail.com
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-6 z-20 text-white/20 animate-bounce">
        <ChevronDown size={22} />
      </div>
    </section>
  );
}
