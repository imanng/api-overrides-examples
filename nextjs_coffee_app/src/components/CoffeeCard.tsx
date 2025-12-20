'use client';

import { Coffee, getCoffeeImage } from '@/types/coffee';
import Link from 'next/link';

interface CoffeeCardProps {
    coffee: Coffee;
}

export default function CoffeeCard({ coffee }: CoffeeCardProps) {
    const imageUrl = getCoffeeImage(coffee);
    const ingredientCount = Array.isArray(coffee.ingredients)
        ? coffee.ingredients.length
        : coffee.ingredients ? 1 : 0;

    return (
        <Link href={`/coffee/${coffee.id}`} className="coffee-card">
            <div className="coffee-image-container">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={coffee.title}
                        className="coffee-image"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                        }}
                    />
                ) : null}
                <div className={`coffee-placeholder ${imageUrl ? 'hidden' : ''}`} style={{ display: imageUrl ? 'none' : 'flex' }}>
                    ☕
                </div>
            </div>
            <div className="coffee-content">
                <h2 className="coffee-title">{coffee.title}</h2>
                {coffee.description && (
                    <p className="coffee-description">{coffee.description}</p>
                )}
                <div className="coffee-meta">
                    <span>🫘</span>
                    <span>{ingredientCount} ingredient{ingredientCount !== 1 ? 's' : ''}</span>
                </div>
            </div>
        </Link>
    );
}
