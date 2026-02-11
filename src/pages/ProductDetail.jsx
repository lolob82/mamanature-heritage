import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const products = {
  1: {
    id: 1,
    name: 'Ligne Vitalité',
    price: 35.00,
    image: '⚡',
    category: 'Énergie',
    description: 'Boosters d\'énergie naturels pour votre vitalité quotidienne. Formule exclusive à base de ginseng, guarana et vitamines B pour combattre la fatigue et retrouver votre dynamisme.',
    benefits: ['Augmente l\'énergie naturellement', 'Combat la fatigue', 'Améliore la concentration', 'Formule 100% naturelle']
  },
  2: {
    id: 2,
    name: 'Ligne Sérénité',
    price: 32.00,
    image: '🧘',
    category: 'Bien-être',
    description: 'Solutions anti-stress pour retrouver votre équilibre. Mélange apaisant de camomille, passiflore et magnésium pour une relaxation profonde.',
    benefits: ['Réduit le stress', 'Favorise la relaxation', 'Améliore le sommeil', 'Apaise l\'esprit']
  },
  3: {
    id: 3,
    name: 'Ligne Immunité',
    price: 38.00,
    image: '🛡️',
    category: 'Défenses',
    description: 'Renfort des défenses naturelles pour votre santé. Combinaison puissante d\'échinacée, vitamine C et zinc pour un système immunitaire renforcé.',
    benefits: ['Renforce le système immunitaire', 'Protection naturelle', 'Riche en antioxydants', 'Prévention des infections']
  },
  4: {
    id: 4,
    name: 'Ligne Enfants',
    price: 28.00,
    image: '👶',
    category: 'Jeunesse',
    description: 'Compléments adaptés aux besoins des plus jeunes. Formules douces et naturelles pour accompagner la croissance de vos enfants.',
    benefits: ['Formules douces', 'Adaptées aux enfants', 'Goût agréable', 'Sans additifs artificiels']
  },
  5: {
    id: 5,
    name: 'Pack Vitalité Premium',
    price: 89.00,
    image: '🌟',
    category: 'Pack',
    description: 'Cure complète 3 mois - Vitalité & Immunité. Programme complet pour une santé optimale et une énergie durable.',
    benefits: ['Programme 3 mois', 'Économie de 15%', 'Vitalité + Immunité', 'Résultats optimaux']
  },
  6: {
    id: 6,
    name: 'Pack Bien-être Familial',
    price: 95.00,
    image: '💚',
    category: 'Pack',
    description: 'Solution complète pour toute la famille. Formules adaptées à chaque membre de la famille pour un bien-être partagé.',
    benefits: ['Pour toute la famille', 'Formules variées', 'Économie de 20%', 'Bien-être global']
  }
};

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products[id];
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="product-detail">
        <div className="container">
          <h2>Produit non trouvé</h2>
          <Link to="/products" className="back-link">← Retour aux produits</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="product-detail">
      <div className="container">
        <Link to="/products" className="back-link">← Retour aux produits</Link>
        
        <div className="detail-grid">
          <div className="detail-image">
            <div className="image-placeholder">{product.image}</div>
          </div>
          
          <div className="detail-info">
            <span className="detail-category">{product.category}</span>
            <h1>{product.name}</h1>
            <p className="detail-description">{product.description}</p>
            
            <div className="price-section">
              <span className="detail-price">{product.price.toFixed(2)}€</span>
            </div>
            
            <div className="quantity-section">
              <label>Quantité :</label>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
            
            <div className="action-buttons">
              <button 
                className={`add-to-cart-btn ${addedToCart ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                {addedToCart ? '✓ Ajouté au panier' : 'Ajouter au panier'}
              </button>
              <button className="buy-now-btn" onClick={handleBuyNow}>
                Acheter maintenant
              </button>
            </div>
            
            <div className="product-features">
              <h3>Bienfaits</h3>
              <ul>
                {product.benefits.map((benefit, index) => (
                  <li key={index}>✓ {benefit}</li>
                ))}
              </ul>
            </div>

            <div className="product-certifications">
              <h3>Nos Engagements</h3>
              <ul>
                <li>🌱 Certification Bio Européenne</li>
                <li>♻️ Emballages 100% recyclables</li>
                <li>🇫🇷 Fabriqué en France</li>
                <li>🔬 Testé en laboratoire</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
