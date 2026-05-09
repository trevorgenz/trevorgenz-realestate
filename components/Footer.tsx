import { Phone, Mail, MapPin } from "lucide-react";

const nav = [
  { label: "New Listings", href: "#listings" },
  { label: "Market Data", href: "#market" },
  { label: "Rent Trends", href: "#rent" },
  { label: "Commercial", href: "#commercial" },
  { label: "Zoning", href: "#zoning" },
  { label: "Tax Info", href: "#tax" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a1a30] text-white/60 py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <p className="text-white font-bold text-lg mb-1">Trevor Genz</p>
            <p className="text-[#e07b39] text-xs font-semibold tracking-widest uppercase mb-4">Central Oregon Real Estate</p>
            <p className="text-sm leading-relaxed">
              Helping buyers and sellers navigate the Bend and Redmond market with honest data and local expertise.
            </p>
          </div>

          <div>
            <p className="text-white font-semibold text-sm mb-4">Quick Links</p>
            <ul className="flex flex-col gap-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-sm hover:text-[#e07b39] transition-colors">{n.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold text-sm mb-4">Contact</p>
            <div className="flex flex-col gap-3 text-sm">
              <a href="tel:5412797522" className="flex items-center gap-2 hover:text-[#e07b39] transition-colors">
                <Phone size={14} /> (541) 279-7522
              </a>
              <a href="mailto:trevorgenz@gmail.com" className="flex items-center gap-2 hover:text-[#e07b39] transition-colors">
                <Mail size={14} /> trevorgenz@gmail.com
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={14} /> Redmond &amp; Bend, Oregon
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
          <p>© {new Date().getFullYear()} Trevor Genz Real Estate. All rights reserved.</p>
          <p>Licensed in Oregon · Serving Central Oregon</p>
        </div>
      </div>
    </footer>
  );
}
