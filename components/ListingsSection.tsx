import { ExternalLink, Bed, Bath, Square } from "lucide-react";

const BEND_URL =
  "https://www.zillow.com/homes/for_sale/Bend-OR_rb/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22filterState%22%3A%7B%22price%22%3A%7B%22max%22%3A600000%7D%2C%22mp%22%3A%7B%22max%22%3A3000%7D%2C%22sort%22%3A%7B%22value%22%3A%22days%22%7D%2C%22con%22%3A%7B%22value%22%3Afalse%7D%2C%22apa%22%3A%7B%22value%22%3Afalse%7D%2C%22mf%22%3A%7B%22value%22%3Afalse%7D%2C%22land%22%3A%7B%22value%22%3Afalse%7D%2C%22tow%22%3A%7B%22value%22%3Afalse%7D%7D%7D";
const REDMOND_URL =
  "https://www.zillow.com/homes/for_sale/Redmond-OR_rb/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22filterState%22%3A%7B%22price%22%3A%7B%22max%22%3A600000%7D%2C%22mp%22%3A%7B%22max%22%3A3000%7D%2C%22sort%22%3A%7B%22value%22%3A%22days%22%7D%2C%22con%22%3A%7B%22value%22%3Afalse%7D%2C%22apa%22%3A%7B%22value%22%3Afalse%7D%2C%22mf%22%3A%7B%22value%22%3Afalse%7D%2C%22land%22%3A%7B%22value%22%3Afalse%7D%2C%22tow%22%3A%7B%22value%22%3Afalse%7D%7D%7D";

const photos = [
  {
    id: "1570129477492-1f17708d364f",
    label: "Bend, OR",
    beds: 3, baths: 2, sqft: "1,840",
    tag: "Just Listed",
  },
  {
    id: "1564013799919-ab3a5f5f6c37",
    label: "Redmond, OR",
    beds: 4, baths: 2, sqft: "2,150",
    tag: "New",
  },
  {
    id: "1558618666-fcd25c85cd64",
    label: "Bend, OR",
    beds: 3, baths: 2, sqft: "1,620",
    tag: "Just Listed",
  },
  {
    id: "1512917774080-a3eafa8be3d6",
    label: "Redmond, OR",
    beds: 4, baths: 3, sqft: "2,480",
    tag: "New",
  },
  {
    id: "1523217582562-09d8e2046ab9",
    label: "Bend, OR",
    beds: 3, baths: 2, sqft: "1,550",
    tag: "Just Listed",
  },
  {
    id: "1600585154340-be6161a56a0c",
    label: "Bend, OR",
    beds: 5, baths: 3, sqft: "2,900",
    tag: "New",
  },
];

export default function ListingsSection() {
  return (
    <section id="listings" className="bg-[#f1f5f9] py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[#3b82f6] text-sm font-semibold tracking-widest uppercase mb-2">
              New To Market
            </p>
            <h2 className="text-4xl font-bold text-[#0f172a]">Fresh Listings</h2>
            <p className="text-gray-500 mt-2">Bend &amp; Redmond · Under $600,000 · Updated daily</p>
          </div>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {photos.map((p) => (
            <div
              key={p.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-${p.id}?w=600&q=80&fit=crop&auto=format`}
                  alt={`Home in ${p.label}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#3b82f6] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {p.tag}
                </span>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">{p.label}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1.5"><Bed size={14} className="text-[#3b82f6]" /> {p.beds} bd</span>
                  <span className="flex items-center gap-1.5"><Bath size={14} className="text-[#3b82f6]" /> {p.baths} ba</span>
                  <span className="flex items-center gap-1.5"><Square size={14} className="text-[#3b82f6]" /> {p.sqft} sf</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href={BEND_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-white border border-gray-200 hover:border-[#3b82f6] rounded-xl px-6 py-5 transition-colors group"
          >
            <div>
              <p className="font-bold text-[#0f172a] text-lg">Bend Homes</p>
              <p className="text-gray-500 text-sm">New listings under $600k on Zillow</p>
            </div>
            <ExternalLink size={18} className="text-gray-400 group-hover:text-[#3b82f6] transition-colors" />
          </a>
          <a
            href={REDMOND_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-white border border-gray-200 hover:border-[#3b82f6] rounded-xl px-6 py-5 transition-colors group"
          >
            <div>
              <p className="font-bold text-[#0f172a] text-lg">Redmond Homes</p>
              <p className="text-gray-500 text-sm">New listings under $600k on Zillow</p>
            </div>
            <ExternalLink size={18} className="text-gray-400 group-hover:text-[#3b82f6] transition-colors" />
          </a>
        </div>

        <p className="text-xs text-gray-400 mt-5 text-center">
          Photos are representative. Click a button above to see live listings with current prices on Zillow.
        </p>
      </div>
    </section>
  );
}
