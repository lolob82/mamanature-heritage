import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import './ProductDetail.css';

const products = {
  1: { id: 1, name: 'Organic Herbal Tea', price: 15.99, image: '🍵', category: 'Beverages', description: 'Premium organic herbal tea blend made from carefully selected herbs. Perfect for relaxation and wellness.' },
  2: { id: 2, name: 'Natural Honey', price: 24.99, image: '🍯', category: 'Food', description: 'Pure raw honey from local beekeepers. Rich in antioxidants and natural enzymes.' },
  3: { id: 3, name: 'Handmade Soap', price: 12.99, image: '🧼', category: 'Personal Care', description: 'Natural ingredients, traditional recipe. Gentle on skin, free from harsh chemicals.' },
  4: { id: 4, name: 'Essential Oil Set', price: 39.99, image: '🌸', category: 'Wellness', description: 'Collection of pure essential oils for aromatherapy and natural wellness.' },
  5: { id: 5, name: 'Organic Spice Mix', price: 18.99, image: '🌶️', category: 'Food', description: 'Heritage spice blend for cooking. Adds authentic flavor to your dishes.' },
  6: { id: 6, name: 'Natural Candles', price: 22.99, image: '🕯️', category: 'Home', description: 'Beeswax candles with essential oils. Creates a warm, natural ambiance.' }
};

function ProductDetail() {
  const { id } = useParams();
  const product = products[id];
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div className="container"><h2>Product not found</h2></div>;
  }

  const handleAddToCart = () => {
    alert(`Added ${quantity} ${product.name}(s) to cart!`);
  };

  return (
    <div className="product-detail">
      <div className="container">
        <Link to="/products" className="back-link">← Back to Products</Link>
        
        <div className="detail-grid">
          <div className="detail-image">
            <div className="image-placeholder">{product.image}</div>
          </div>
          
          <div className="detail-info">
            <span className="detail-category">{product.category}</span>
            <h1>{product.name}</h1>
            <p className="detail-description">{product.description}</p>
            
            <div className="price-section">
              <span className="detail-price">${product.price}</span>
            </div>
            
            <div className="quantity-section">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
            
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            
            <div className="product-features">
              <h3>Product Features</h3>
              <ul>
                <li>✓ 100% Natural Ingredients</li>
                <li>✓ Sustainably Sourced</li>
                <li>✓ Traditional Methods</li>
                <li>✓ Eco-Friendly Packaging</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
