export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    price: 89.99,
    image: "/images/headphones.jpg",
    category: "Electronics",
    description: "Experience premium sound quality with active noise cancellation and 30-hour battery life.",
    rating: 4.8
  },
  {
    id: "2",
    name: "Premium Leather Wallet",
    price: 49.99,
    image: "/images/wallet.jpg",
    category: "Accessories",
    description: "Handcrafted from genuine leather. Features RFID protection and a slim profile.",
    rating: 4.9
  },
  {
    id: "3",
    name: "Ergonomic Mechanical Keyboard",
    price: 129.99,
    image: "/images/keyboard.jpg",
    category: "Electronics",
    description: "Enhance your typing experience with tactile switches and customizable RGB lighting.",
    rating: 4.7
  },
  {
    id: "4",
    name: "Stainless Steel Water Bottle",
    price: 34.99,
    image: "/images/water-bottle.jpg",
    category: "Lifestyle",
    description: "Double-wall vacuum insulation keeps drinks cold for 24 hours or hot for 12 hours.",
    rating: 4.6
  },
  {
    id: "5",
    name: "Smart Fitness Tracker",
    price: 79.99,
    image: "/images/fitness-tracker.jpg",
    category: "Electronics",
    description: "Monitor your heart rate, sleep patterns, and daily activities with precision.",
    rating: 4.5
  },
  {
    id: "6",
    name: "Minimalist Desk Lamp",
    price: 59.99,
    image: "/images/desk-lamp.jpg",
    category: "Home",
    description: "Adjustable color temperature and brightness levels to reduce eye strain.",
    rating: 4.8
  },
  {
    id: "7",
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    image: "/images/tshirt.jpg",
    category: "Clothing",
    description: "Breathable and ultra-soft basic tee made from 100% ethically sourced cotton.",
    rating: 4.4
  },
  {
    id: "8",
    name: "Professional Notebook",
    price: 19.99,
    image: "/images/notebook.jpg",
    category: "Stationery",
    description: "Premium 120gsm dot-grid paper with a durable hardcover and elastic closure.",
    rating: 4.9
  }
];