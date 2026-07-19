import Card from './components/Card';
import './App.css';

const cardsData = [
  {
    id: 1,
    title: "Mountain Escape",
    description: "Explore the serene mountain trails.",
    image: "https://picsum.photos/300/200?1",
    price: 2999,
    rating: 4.5
  },
  {
    id: 2,
    title: "Ocean Breeze",
    description: "Relax by the crystal clear waters.",
    image: "https://picsum.photos/300/200?2",
    price: 4499,
    rating: 4.8
  },
  {
    id: 3,
    title: "City Lights",
    description: "Experience the vibrant nightlife.",
    image: "https://picsum.photos/300/200?3",
    price: 3599,
    rating: 4.2
  }
];

function App() {
  return (
    <div className="container">
      <h1>Reusable Card Components</h1>
      <div className="cards-grid">
        {cardsData.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
            image={card.image}
            price={card.price}
            rating={card.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default App;