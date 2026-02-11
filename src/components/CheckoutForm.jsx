import { useState } from 'react';
import { sendOrderConfirmationEmail, generateOrderNumber, calculateTotal, validateOrderData } from '../services/orderService';
import './CheckoutForm.css';

function CheckoutForm({ cartItems, onOrderComplete }) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Calcul du total
      const totalAmount = calculateTotal(cartItems);
      
      // Génération du numéro de commande
      const orderNumber = generateOrderNumber();

      // Préparation des données de commande
      const orderData = {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        orderNumber,
        orderItems: cartItems.map(item => ({
          name: item.name,
          description: item.description,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount,
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode
        }
      };

      // Validation des données
      const validation = validateOrderData(orderData);
      if (!validation.isValid) {
        setError(validation.errors.join(', '));
        setIsSubmitting(false);
        return;
      }

      // Envoi de l'email de confirmation
      const result = await sendOrderConfirmationEmail(orderData);

      if (result.success) {
        setSuccess(true);
        // Appeler le callback pour vider le panier et afficher la confirmation
        if (onOrderComplete) {
          onOrderComplete(orderNumber);
        }
      } else {
        setError(`Erreur lors de l'envoi de la confirmation: ${result.error}`);
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la validation de votre commande');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="checkout-success">
        <div className="success-icon">✓</div>
        <h2>Commande validée !</h2>
        <p>Un email de confirmation a été envoyé à <strong>{formData.customerEmail}</strong></p>
        <p>Merci pour votre confiance !</p>
      </div>
    );
  }

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h2>Informations de livraison</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="customerName">Nom complet *</label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
          minLength="2"
        />
      </div>

      <div className="form-group">
        <label htmlFor="customerEmail">Email *</label>
        <input
          type="email"
          id="customerEmail"
          name="customerEmail"
          value={formData.customerEmail}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Téléphone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="address">Adresse *</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="postalCode">Code postal *</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
            pattern="[0-9]{5}"
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">Ville *</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <button 
        type="submit" 
        className="submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Validation en cours...' : 'Valider la commande'}
      </button>

      <p className="form-note">
        * Champs obligatoires. Un email de confirmation vous sera envoyé.
      </p>
    </form>
  );
}

export default CheckoutForm;
