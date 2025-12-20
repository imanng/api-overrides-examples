'use client';

import { useState } from 'react';
import { Coffee, getCoffeeImage } from '@/types/coffee';

export default function TopCoffeesButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [coffees, setCoffees] = useState<Coffee[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchCoffees = async () => {
        setLoading(true);
        setIsOpen(true);

        try {
            const res = await fetch('https://api-overrides.anng.dev/api/proxy/main/coffee/hot');
            const data: Coffee[] = await res.json();

            // Filter valid coffees and take top 10
            const validCoffees = data.filter(
                (c) => c.title && c.title !== 'title' && c.title.trim() !== ''
            );
            setCoffees(validCoffees.slice(0, 10));
        } catch (e) {
            console.error('Failed to fetch coffees:', e);
            setCoffees([]);
        } finally {
            setLoading(false);
        }
    };

    const closeDialog = () => {
        setIsOpen(false);
    };

    return (
        <>
            <button className="colors-button" onClick={fetchCoffees}>
                🏆 Top 10
            </button>

            {isOpen && (
                <div className="dialog-overlay" onClick={closeDialog}>
                    <div className="dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="dialog-header">
                            <h2>☕ Top 10 Coffees</h2>
                            <button className="close-button" onClick={closeDialog}>✕</button>
                        </div>

                        <div className="dialog-content">
                            {loading ? (
                                <div className="dialog-loading">
                                    <div className="spinner"></div>
                                </div>
                            ) : (
                                <div className="colors-grid">
                                    {coffees.map((coffee, index) => {
                                        const imageUrl = getCoffeeImage(coffee);
                                        return (
                                            <div key={coffee.id || index} className="color-item">
                                                <div
                                                    className="color-swatch"
                                                    style={{
                                                        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                        backgroundColor: !imageUrl ? '#8b5a2b' : undefined,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {!imageUrl && <span style={{ fontSize: '1.5rem' }}>☕</span>}
                                                </div>
                                                <span className="color-name">{coffee.title}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
