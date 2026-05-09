import { Building2, Map, Calculator, ExternalLink } from "lucide-react";

const resources = [
  {
    id: "commercial",
    icon: Building2,
    label: "Commercial Listings",
    title: "Central Oregon Commercial",
    description:
      "Browse available commercial properties, retail, office, and industrial spaces across Central Oregon on LoopNet.",
    cta: "Search LoopNet",
    href: "https://www.loopnet.com/search/commercial-real-estate/bend-or/for-sale/",
    accent: "#0f2240",
  },
  {
    id: "zoning",
    icon: Map,
    label: "Zoning",
    title: "Redmond Zoning Codes",
    description:
      "Access official zoning code documents for the City of Redmond, Oregon — including residential, commercial, and mixed-use zone requirements.",
    cta: "View Redmond Zoning",
    href: "https://www.redmondoregon.gov/government/departments/community-development/planning/zoning",
    accent: "#1a6b3c",
  },
  {
    id: "tax",
    icon: Calculator,
    label: "Tax & Accounting",
    title: "Cascade Peaks Accounting",
    description:
      "Need help with property taxes, investment income, or real estate deductions? My dad runs Cascade Peaks Accounting right here in Central Oregon.",
    cta: "Visit Cascade Peaks",
    href: "https://cascadepeaksaccounting.com",
    accent: "#7c3d11",
  },
];

export default function ResourcesSection() {
  return (
    <section className="bg-[#faf8f5] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-[#e07b39] text-sm font-semibold tracking-widest uppercase mb-2">
            Local Resources
          </p>
          <h2 className="text-4xl font-bold text-[#0f2240]">Everything You Need</h2>
          <p className="text-gray-500 mt-2">Commercial listings, zoning info, and trusted local professionals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.id}
                id={r.id}
                className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 flex flex-col"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${r.accent}15` }}
                >
                  <Icon size={22} style={{ color: r.accent }} />
                </div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: r.accent }}>
                  {r.label}
                </p>
                <h3 className="text-[#0f2240] font-bold text-xl mb-3">{r.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-6">{r.description}</p>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-semibold text-sm transition-colors hover:opacity-80"
                  style={{ color: r.accent }}
                >
                  {r.cta} <ExternalLink size={13} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
