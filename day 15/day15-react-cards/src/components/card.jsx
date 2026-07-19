import './Card.css';

function Card({ title, description, image, price, rating }) {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>

        <div className="card-footer">
          <span className="card-price">₹{price}</span>
          <span className="card-rating">⭐ {rating}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;