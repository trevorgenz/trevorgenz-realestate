import { ExternalLink } from "lucide-react";

export default function ListingsSection() {
  return (
    <section id="listings" className="bg-[#f1f5f9] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[#3b82f6] text-sm font-semibold tracking-widest uppercase mb-2">
              New To Market
            </p>
            <h2 className="text-4xl font-bold text-[#0f172a]">Fresh Listings</h2>
            <p className="text-gray-500 mt-2">Bend &amp; Redmond · Under $600,000 · Updated daily</p>
          </div>
          <a
            href="https://www.zillow.com/homes/for_sale/Bend-OR_rb/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22filterState%22%3A%7B%22price%22%3A%7B%22max%22%3A600000%7D%2C%22mp%22%3A%7B%22max%22%3A3000%7D%2C%22sort%22%3A%7B%22value%22%3A%22days%22%7D%2C%22con%22%3A%7B%22value%22%3Afalse%7D%2C%22apa%22%3A%7B%22value%22%3Afalse%7D%2C%22mf%22%3A%7B%22value%22%3Afalse%7D%2C%22land%22%3A%7B%22value%22%3Afalse%7D%2C%22tow%22%3A%7B%22value%22%3Afalse%7D%7D%7D"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#3b82f6] hover:bg-[#f5a06a] text-white font-semibold px-5 py-3 rounded-lg transition-colors text-sm whitespace-nowrap"
          >
            View All on Zillow <ExternalLink size={14} />
          </a>
        </div>

        {/* Zillow search widget embed */}
        <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white">
          <iframe
            src="https://www.zillow.com/search/GetSearchPageState.htm?searchQueryState=%7B%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22price%22%3A%7B%22max%22%3A600000%7D%2C%22doz%22%3A%7B%22value%22%3A%2230%22%7D%2C%22sort%22%3A%7B%22value%22%3A%22days%22%7D%7D%2C%22mapZoom%22%3A11%7D"
            className="w-full h-[600px] border-0"
            title="Zillow Listings"
            loading="lazy"
          />
        </div>

        {/* Fallback CTA if iframe blocked */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="https://www.zillow.com/homes/for_sale/Bend-OR_rb/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22filterState%22%3A%7B%22price%22%3A%7B%22max%22%3A600000%7D%2C%22mp%22%3A%7B%22max%22%3A3000%7D%2C%22sort%22%3A%7B%22value%22%3A%22days%22%7D%2C%22con%22%3A%7B%22value%22%3Afalse%7D%2C%22apa%22%3A%7B%22value%22%3Afalse%7D%2C%22mf%22%3A%7B%22value%22%3Afalse%7D%2C%22land%22%3A%7B%22value%22%3Afalse%7D%2C%22tow%22%3A%7B%22value%22%3Afalse%7D%7D%7D"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-white border border-gray-200 hover:border-[#3b82f6] rounded-xl px-6 py-5 transition-colors group"
          >
            <div>
              <p className="font-bold text-[#0f172a] text-lg">Bend Homes</p>
              <p className="text-gray-500 text-sm">New listings under $600k</p>
            </div>
            <ExternalLink size={18} className="text-gray-400 group-hover:text-[#3b82f6] transition-colors" />
          </a>
          <a
            href="https://www.zillow.com/homes/for_sale/Redmond-OR_rb/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22filterState%22%3A%7B%22price%22%3A%7B%22max%22%3A600000%7D%2C%22mp%22%3A%7B%22max%22%3A3000%7D%2C%22sort%22%3A%7B%22value%22%3A%22days%22%7D%2C%22con%22%3A%7B%22value%22%3Afalse%7D%2C%22apa%22%3A%7B%22value%22%3Afalse%7D%2C%22mf%22%3A%7B%22value%22%3Afalse%7D%2C%22land%22%3A%7B%22value%22%3Afalse%7D%2C%22tow%22%3A%7B%22value%22%3Afalse%7D%7D%7D"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-white border border-gray-200 hover:border-[#3b82f6] rounded-xl px-6 py-5 transition-colors group"
          >
            <div>
              <p className="font-bold text-[#0f172a] text-lg">Redmond Homes</p>
              <p className="text-gray-500 text-sm">New listings under $600k</p>
            </div>
            <ExternalLink size={18} className="text-gray-400 group-hover:text-[#3b82f6] transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
}
