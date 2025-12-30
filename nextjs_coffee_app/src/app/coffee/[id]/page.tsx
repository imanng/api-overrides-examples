import { Coffee, getCoffeeImage, getCoffeeIngredients } from "@/types/coffee";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getCoffee(id: string): Promise<Coffee | null> {
  const deploymentUrl = process.env.NEXT_PUBLIC_DEPLOYMENT_URL;
  const res = await fetch(`${deploymentUrl}/api/coffee/hot/${id}`);

  if (!res.ok) {
    return null;
  }

  return res.json();
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CoffeeDetailPage({ params }: Props) {
  const { id } = await params;
  const coffee = await getCoffee(id);

  if (!coffee) {
    notFound();
  }

  const imageUrl = getCoffeeImage(coffee);
  const ingredients = getCoffeeIngredients(coffee);

  return (
    <div className="detail-container">
      <Link href="/" className="back-button">
        ← Back to Menu
      </Link>

      <div className="detail-image-container">
        {imageUrl ? (
          <img src={imageUrl} alt={coffee.title} className="detail-image" />
        ) : (
          <div className="coffee-placeholder" style={{ height: "100%" }}>
            ☕
          </div>
        )}
      </div>

      <h1 className="detail-title">{coffee.title}</h1>

      {coffee.description && (
        <p className="detail-description">{coffee.description}</p>
      )}

      {ingredients.length > 0 && (
        <div className="ingredients-section">
          <h2 className="ingredients-title">Ingredients</h2>
          <div className="ingredients-list">
            {ingredients.map((ingredient, index) => (
              <span key={index} className="ingredient-tag">
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const coffee = await getCoffee(id);

  return {
    title: coffee ? `${coffee.title} | Coffee Menu` : "Coffee Not Found",
    description: coffee?.description || "Coffee details",
  };
}
