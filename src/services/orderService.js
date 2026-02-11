// Service pour gérer les commandes et l'envoi d'emails

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'https://cbetqnjr3k.execute-api.us-east-1.amazonaws.com/prod';

/**
 * Envoie un email de confirmation de commande via AWS SES
 * @param {Object} orderData - Données de la commande
 * @returns {Promise<Object>} - Réponse de l'API
 */
export async function sendOrderConfirmationEmail(orderData) {
  try {
    const response = await fetch(`${API_ENDPOINT}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Génère un numéro de commande unique
 * @returns {string} - Numéro de commande
 */
export function generateOrderNumber() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `CMD-${timestamp}-${random}`;
}

/**
 * Calcule le montant total d'une commande
 * @param {Array} items - Articles du panier
 * @returns {number} - Montant total
 */
export function calculateTotal(items) {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
}

/**
 * Valide les données de commande
 * @param {Object} orderData - Données de la commande
 * @returns {Object} - Résultat de la validation
 */
export function validateOrderData(orderData) {
  const errors = [];

  if (!orderData.customerEmail) {
    errors.push('Email client requis');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orderData.customerEmail)) {
    errors.push('Email invalide');
  }

  if (!orderData.customerName || orderData.customerName.trim().length < 2) {
    errors.push('Nom client requis (minimum 2 caractères)');
  }

  if (!orderData.orderItems || orderData.orderItems.length === 0) {
    errors.push('Panier vide');
  }

  if (!orderData.totalAmount || orderData.totalAmount <= 0) {
    errors.push('Montant total invalide');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
