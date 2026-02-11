import { useState } from 'react';
import { Link } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import './Cart.css';

function Cart() {
  // Simulation d'un panier - À remplacer par un state management (Context, Redux, etc.)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Ligne Vitalité',
      description: 'Boosters d\'énergie naturels',
      price: 35.00,
      quantity: 1
    }
  ]);
  
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const handleOrderComplete = (orderNum) => {
    setOrderCompleted(true);
    setOrderNumber(orderNum);
    setCartItems([]);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  if (orderCompleted) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="order-success">
            <div className="success-icon">✓</div>
            <h1>Commande validée !</h1>
            <p>Numéro de commande : <strong>{orderNumber}</strong></p>
            <p>Un email de confirmation a été envoyé à votre adresse.</p>
            <Link to="/products" className="continue-shopping">
              Continuer vos achats
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1>Panier</h1>
          <div className="empty-cart">
            <p>Votre panier est vide</p>
            <Link to="/products" className="continue-shopping">
              Continuer vos achats
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <div className="cart-page">
        <div className="container">
          <CheckoutForm 
            cartItems={cartItems} 
            onOrderComplete={handleOrderComplete}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Votre Panier</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="item-quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="item-price">
                  {(item.price * item.quantity).toFixed(2)}€
                </div>
                <button className="remove-btn" onClick={() => removeItem(item.id)}>
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Récapitulatif</h2>
            <div className="summary-line">
              <span>Sous-total</span>
              <span>{calculateTotal().toFixed(2)}€</span>
            </div>
            <div className="summary-line">
              <span>Livraison</span>
              <span>Gratuite</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>{calculateTotal().toFixed(2)}€</span>
            </div>
            <button 
              className="checkout-btn"
              onClick={() => setShowCheckout(true)}
            >
              Valider la commande
            </button>
            <p className="checkout-note">
              📧 Un email de confirmation vous sera envoyé
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
