import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

function Header() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>Mamanature Heritage</h1>
          <span className="logo-tagline">La force de la nature</span>
        </Link>
        <nav className="nav">
          <Link to="/">Accueil</Link>
          <Link to="/products">Nos Produits</Link>
          <Link to="/about">Notre Histoire</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/cart" className="cart-link">
            🛒 Panier
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
