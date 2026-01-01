import { Coffee } from "@/types/coffee";
import CoffeeCard from "@/components/CoffeeCard";
import TopCoffeesButton from "@/components/TopCoffeesButton";
import "./globals.css";

async function getCoffees(): Promise<Coffee[]> {
  const deploymentUrl = process.env.NEXT_PUBLIC_DEPLOYMENT_URL;
  const res = await fetch(`${deploymentUrl}/api/coffee/hot`, {
    next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
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
