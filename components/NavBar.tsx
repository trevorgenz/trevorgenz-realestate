"use client";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";

const links = [
  { label: "Listings", href: "#listings" },
  { label: "Market Data", href: "#market" },
  { label: "Rent Trends", href: "#rent" },
  { label: "Commercial", href: "#commercial" },
  { label: "Zoning", href: "#zoning" },
  { label: "Tax Info", href: "#tax" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bg = scrolled ? "bg-[#0f2240] shadow-lg" : "bg-transparent";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bg}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#hero" className="text-white font-bold text-lg tracking-tight">
          Trevor Genz <span className="text-[#e07b39]">Real Estate</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/80 hover:text-[#e07b39] text-sm font-medium transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:5412797522"
            className="flex items-center gap-2 bg-[#e07b39] hover:bg-[#f5a06a] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <Phone size={14} /> (541) 279-7522
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0f2240] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-[#e07b39] text-sm font-medium"
            >
              {l.label}
            </a>
          ))}
          <a href="tel:5412797522" className="text-[#e07b39] font-semibold text-sm">
            (541) 279-7522
          </a>
        </div>
      )}
    </nav>
  );
}
