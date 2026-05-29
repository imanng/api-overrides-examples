import { Coffee } from "@/types/coffee";
import CoffeeCard from "@/components/CoffeeCard";
import TopCoffeesButton from "@/components/TopCoffeesButton";
import { getOverrideForwardingHeaders } from "@/lib/overrideForwarding";
import "./globals.css";

const deploymentUrl = process.env.NEXT_PUBLIC_DEPLOYMENT_URL;

async function getCoffees(): Promise<Coffee[]> {
  const forwardingHeaders = await getOverrideForwardingHeaders();
  const res = await fetch(`${deploymentUrl}/api/coffee/hot`, {
    headers: forwardingHeaders,
    cache: "no-store", // SSR: Fetch fresh data on every request
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
    console.error(e);
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
