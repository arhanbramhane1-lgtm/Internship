export type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  image: string;
};

export const products: Product[] = [
  {
    id: 1,
    title: "Aurora Wireless Headphones",
    category: "Audio",
    price: 189.0,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: 2,
    title: "Nimbus Smart Watch",
    category: "Wearables",
    price: 249.0,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: 3,
    title: "Lumen Desk Lamp",
    category: "Home",
    price: 79.0,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: 4,
    title: "Orbit Bluetooth Speaker",
    category: "Audio",
    price: 129.0,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: 5,
    title: "Vector Mechanical Keyboard",
    category: "Accessories",
    price: 159.0,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: 6,
    title: "Prism VR Headset",
    category: "Gaming",
    price: 399.0,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: 7,
    title: "Cascade Wireless Mouse",
    category: "Accessories",
    price: 59.0,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: 8,
    title: "Solace Leather Backpack",
    category: "Lifestyle",
    price: 219.0,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=70",
  },
];
