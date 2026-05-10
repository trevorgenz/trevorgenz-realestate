import { NextResponse } from "next/server";

export const revalidate = 3600;

type Obs = { date: string; value: string };

async function fetchSeries(id: string): Promise<Obs[]> {
  const key = process.env.FRED_API_KEY;
  const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${id}&api_key=${key}&sort_order=desc&limit=14&file_type=json`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  const json = await res.json();
  return (json.observations ?? []).filter((o: Obs) => o.value !== ".");
}

export async function GET() {
  try {
    const [obs30, obs15] = await Promise.all([
      fetchSeries("MORTGAGE30US"),
      fetchSeries("MORTGAGE15US"),
    ]);

    const current30 = parseFloat(obs30[0].value);
    const prev30    = parseFloat(obs30[1].value);
    const current15 = parseFloat(obs15[0].value);
    const prev15    = parseFloat(obs15[1].value);

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const fmt = (d: string) => {
      const [, m, day] = d.split("-");
      return `${months[parseInt(m) - 1]} ${parseInt(day)}`;
    };

    // oldest → newest for chart
    const history = obs30.slice(0, 12).reverse().map((o, i) => ({
      date:  fmt(o.date),
      rate30: parseFloat(o.value),
      rate15: parseFloat(obs15.slice(0, 12).reverse()[i]?.value ?? "0"),
    }));

    return NextResponse.json({
      current30,
      current15,
      change30: parseFloat((current30 - prev30).toFixed(2)),
      change15: parseFloat((current15 - prev15).toFixed(2)),
      asOf: fmt(obs30[0].date),
      history,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch rates" }, { status: 500 });
  }
}
