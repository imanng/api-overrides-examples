import { Coffee } from "@/types/coffee";
import CoffeeCard from "@/components/CoffeeCard";
import TopCoffeesButton from "@/components/TopCoffeesButton";
import { headers } from "next/headers";
import "./globals.css";

// Force dynamic rendering (SSR) since we need request headers
export const dynamic = 'force-dynamic';

const baseAPI = "https://api-overrides.anng.dev/api/proxy/main";

async function getCoffees(): Promise<Coffee[]> {
  // Forward original request headers (includes X-Forwarded-For from Vercel/hosting)
  const headersList = await headers();

  const res = await fetch(`${baseAPI}/coffee/hot`, {
    cache: 'no-store',
    headers: {
      "X-Forwarded-For": headersList.get("x-forwarded-for") || "",
      "X-Real-IP": headersList.get("x-real-ip") || "",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch coffees");
  }

  const data: Coffee[] = await res.json();

  // Filter out entries with empty or placeholder titles
  return data.filter(
    (coffee) =>
      coffee.title && coffee.title !== "title" && coffee.title.trim() !== ""
  );
}

export default async function Home() {
  let coffees: Coffee[] = [];
  let error = false;

  try {
    coffees = await getCoffees();
  } catch (e) {
    console.log(e);
    error = true;
  }

  return (
    <>
      <header className="header">
        <div className="header-content">
          <span className="coffee-icon">☕</span>
          <h1>Coffee Menu</h1>
          <TopCoffeesButton />
        </div>
      </header>

      <main className="main">
        <p className="subtitle">
          Discover our selection of {coffees.length} delicious coffees
        </p>

        {error ? (
          <div className="error">
            <div className="error-icon">⚠️</div>
            <p>Failed to load coffees. Please try again later.</p>
          </div>
        ) : (
          <div className="coffee-grid">
            {coffees.map((coffee) => (
              <CoffeeCard key={coffee.id} coffee={coffee} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
