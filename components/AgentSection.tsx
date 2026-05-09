import { Phone, Mail, MapPin } from "lucide-react";

export default function AgentSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Headshot placeholder — replace src with real photo */}
        <div className="flex-shrink-0">
          <div className="w-52 h-52 rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#2d6a9f] flex items-center justify-center text-white text-5xl font-bold shadow-xl">
            TG
          </div>
        </div>

        <div className="flex-1">
          <p className="text-[#3b82f6] text-sm font-semibold tracking-widest uppercase mb-2">
            Your Agent
          </p>
          <h2 className="text-4xl font-bold text-[#0f172a] mb-1">Trevor Genz</h2>
          <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
            <MapPin size={13} /> Central Oregon — Bend &amp; Redmond
          </p>
          <p className="text-gray-600 leading-relaxed mb-6 max-w-lg">
            Born and raised in Central Oregon, I know this market inside and out.
            Whether you&apos;re buying your first home, upgrading, or investing in
            this incredible region — I bring honest local expertise and real data
            to every conversation.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:5412797522"
              className="flex items-center gap-2 bg-[#0f172a] hover:bg-[#1a3a5c] text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
            >
              <Phone size={15} /> (541) 279-7522
            </a>
            <a
              href="mailto:trevorgenz@gmail.com"
              className="flex items-center gap-2 border-2 border-[#0f172a] text-[#0f172a] hover:bg-[#0f172a] hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
            >
              <Mail size={15} /> trevorgenz@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
