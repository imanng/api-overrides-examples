export interface Coffee {
  id: string | number;
  title: string;
  description: string;
  ingredients: string[] | string;
  image: string | string[];
}

export function getCoffeeImage(coffee: Coffee): string {
  const img = Array.isArray(coffee.image) ? coffee.image[0] : coffee.image;
  if (img && (img.startsWith('http://') || img.startsWith('https://'))) {
    return img;
  }
  return '';
}

export function getCoffeeIngredients(coffee: Coffee): string[] {
  if (Array.isArray(coffee.ingredients)) {
    return coffee.ingredients;
  }
  if (typeof coffee.ingredients === 'string') {
    return [coffee.ingredients];
  }
  return [];
}
