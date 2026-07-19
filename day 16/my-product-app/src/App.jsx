import products from "./data/products";
import ProductCard from "./components/ProductCard";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Maison Élégance</h1>
        <p>Curated pieces, quietly luxurious.</p>
      </header>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;