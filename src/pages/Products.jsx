import { Link } from 'react-router-dom';
import './Products.css';

const products = [
  {
    id: 1,
    name: 'Ligne Vitalité',
    price: 35.00,
    image: '⚡',
    category: 'Énergie',
    description: 'Boosters d\'énergie naturels pour votre vitalité quotidienne',
    benefits: 'Augmente l\'énergie naturellement, combat la fatigue'
  },
  {
    id: 2,
    name: 'Ligne Sérénité',
    price: 32.00,
    image: '🧘',
    category: 'Bien-être',
    description: 'Solutions anti-stress pour retrouver votre équilibre',
    benefits: 'Réduit le stress, favorise la relaxation'
  },
  {
    id: 3,
    name: 'Ligne Immunité',
    price: 38.00,
    image: '🛡️',
    category: 'Défenses',
    description: 'Renfort des défenses naturelles pour votre santé',
    benefits: 'Renforce le système immunitaire naturellement'
  },
  {
    id: 4,
    name: 'Ligne Enfants',
    price: 28.00,
    image: '👶',
    category: 'Jeunesse',
    description: 'Compléments adaptés aux besoins des plus jeunes',
    benefits: 'Formules douces et adaptées aux enfants'
  },
  {
    id: 5,
    name: 'Pack Vitalité Premium',
    price: 89.00,
    image: '🌟',
    category: 'Pack',
    description: 'Cure complète 3 mois - Vitalité & Immunité',
    benefits: 'Programme complet pour une santé optimale'
  },
  {
    id: 6,
    name: 'Pack Bien-être Familial',
    price: 95.00,
    image: '💚',
    category: 'Pack',
    description: 'Solution complète pour toute la famille',
    benefits: 'Formules adaptées à chaque membre de la famille'
  }
];

function Products() {
  return (
    <div className="products-page">
      <div className="container">
        <h1>Nos Produits</h1>
        <p className="subtitle">Des produits naturels soigneusement sélectionnés pour votre bien-être</p>
        
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">{product.image}</div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-footer">
                  <span className="product-price">{product.price}€</span>
                  <Link to={`/product/${product.id}`} className="view-button">
                    Voir Détails
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
