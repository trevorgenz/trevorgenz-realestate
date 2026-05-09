"use client";
import { Phone, Mail, ChevronDown } from "lucide-react";

const slides = [
  {
    bg: "linear-gradient(135deg, #0a0f1e 0%, #0f2d5c 50%, #0a0f1e 100%)",
    label: "Bend, Oregon",
  },
  {
    bg: "linear-gradient(135deg, #050b15 0%, #1a3a7a 50%, #050b15 100%)",
    label: "Cascade Mountains",
  },
  {
    bg: "linear-gradient(135deg, #0a0f1e 0%, #1e4d8c 40%, #0d1f3c 100%)",
    label: "High Desert Living",
  },
  {
    bg: "linear-gradient(135deg, #050b15 0%, #0f2d5c 50%, #1a3a7a 100%)",
    label: "Redmond, Oregon",
  },
];

export default function HeroSection() {
  return (
    <section id="hero" className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Cycling background slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="slide"
          style={{ background: s.bg }}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55 z-10" />

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
            className="bg-[#3b82f6] hover:bg-[#f5a06a] text-white font-semibold px-8 py-4 rounded-lg transition-all hover:-translate-y-0.5 text-base"
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

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/50 animate-bounce">
        <ChevronDown size={28} />
      </div>
    </section>
  );
}
