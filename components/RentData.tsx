import { Home, TrendingUp } from "lucide-react";

const rentData = [
  {
    city: "Bend",
    units: [
      { type: "3 Bed / 2 Bath", avg: "$2,150", trend: "+4.2%", up: true },
      { type: "4 Bed / 2 Bath", avg: "$2,680", trend: "+3.8%", up: true },
    ],
  },
  {
    city: "Redmond",
    units: [
      { type: "3 Bed / 2 Bath", avg: "$1,720", trend: "+5.1%", up: true },
      { type: "4 Bed / 2 Bath", avg: "$2,090", trend: "+4.6%", up: true },
    ],
  },
];

export default function RentData() {
  return (
    <section id="rent" className="bg-[#0f172a] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="text-[#3b82f6] text-sm font-semibold tracking-widest uppercase mb-2">
            Rental Market
          </p>
          <h2 className="text-4xl font-bold text-white">Average Rent Trends</h2>
          <p className="text-white/50 mt-2">Bend &amp; Redmond · Residential rentals · Updated monthly via Zillow</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rentData.map((market) => (
            <div key={market.city} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/20 flex items-center justify-center">
                  <Home size={18} className="text-[#3b82f6]" />
                </div>
                <h3 className="text-white font-bold text-xl">{market.city}, Oregon</h3>
              </div>

              <div className="flex flex-col gap-4">
                {market.units.map((u) => (
                  <div
                    key={u.type}
                    className="flex items-center justify-between bg-white/5 rounded-xl px-5 py-4"
                  >
                    <div>
                      <p className="text-white/60 text-xs font-medium uppercase tracking-wide mb-1">{u.type}</p>
                      <p className="text-white text-3xl font-bold">{u.avg}</p>
                      <p className="text-white/40 text-xs mt-1">avg/month</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 justify-end text-emerald-400 text-sm font-semibold">
                        <TrendingUp size={14} /> {u.trend}
                      </div>
                      <p className="text-white/30 text-xs mt-1">year over year</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-white/30 mt-8 text-center">
          Rental estimates sourced from Zillow Rental Market data. Figures represent median asking rents for residential properties.
        </p>
      </div>
    </section>
  );
}
