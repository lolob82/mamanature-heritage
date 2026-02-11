const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

const sesClient = new SESClient({ region: process.env.REGION || 'eu-west-1' });

// Email vérifié dans SES - À REMPLACER par votre email vérifié
const SENDER_EMAIL = 'contact@mamanature-heritage.fr';

exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));

  try {
    // Parse le body si c'est une requête API Gateway
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    
    const { customerEmail, customerName, orderItems, totalAmount, orderNumber } = body;

    // Validation des données
    if (!customerEmail || !orderItems || !totalAmount) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
        body: JSON.stringify({
          message: 'Données manquantes: email, items ou montant total requis'
        })
      };
    }

    // Génération du HTML de l'email
    const emailHtml = generateOrderEmailHtml({
      customerName: customerName || 'Client',
      orderNumber: orderNumber || `CMD-${Date.now()}`,
      orderItems,
      totalAmount
    });

    // Paramètres de l'email
    const params = {
      Source: SENDER_EMAIL,
      Destination: {
        ToAddresses: [customerEmail]
      },
      Message: {
        Subject: {
          Data: `Confirmation de commande - Mamanature Heritage`,
          Charset: 'UTF-8'
        },
        Body: {
          Html: {
            Data: emailHtml,
            Charset: 'UTF-8'
          },
          Text: {
            Data: generateOrderEmailText({ customerName: customerName || 'Client', orderNumber: orderNumber || `CMD-${Date.now()}`, orderItems, totalAmount }),
            Charset: 'UTF-8'
          }
        }
      }
    };

    // Envoi de l'email via SES
    const command = new SendEmailCommand(params);
    const response = await sesClient.send(command);

    console.log('Email envoyé avec succès:', response.MessageId);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify({
        message: 'Email de confirmation envoyé avec succès',
        messageId: response.MessageId
      })
    };

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify({
        message: 'Erreur lors de l\'envoi de l\'email',
        error: error.message
      })
    };
  }
};

// Génération du HTML de l'email
function generateOrderEmailHtml({ customerName, orderNumber, orderItems, totalAmount }) {
  const itemsHtml = orderItems.map(item => `
    <tr>
      <td style="padding: 15px; border-bottom: 1px solid #e0e0e0;">
        <strong>${item.name}</strong><br>
        <span style="color: #666; font-size: 14px;">${item.description || ''}</span>
      </td>
      <td style="padding: 15px; border-bottom: 1px solid #e0e0e0; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 15px; border-bottom: 1px solid #e0e0e0; text-align: right;">
        ${item.price.toFixed(2)}€
      </td>
      <td style="padding: 15px; border-bottom: 1px solid #e0e0e0; text-align: right;">
        <strong>${(item.price * item.quantity).toFixed(2)}€</strong>
      </td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmation de commande</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #faf8f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #faf8f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #8b957a 0%, #657254 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700;">Mamanature Heritage</h1>
                  <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">La force de la nature pour votre bien-être</p>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="color: #657254; margin: 0 0 20px 0; font-size: 24px;">Merci pour votre commande !</h2>
                  <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">
                    Bonjour ${customerName},
                  </p>
                  <p style="color: #666; line-height: 1.6; margin: 0 0 30px 0;">
                    Nous avons bien reçu votre commande et nous vous en remercions. Voici le récapitulatif de votre achat :
                  </p>

                  <!-- Order Number -->
                  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 30px;">
                    <p style="margin: 0; color: #666;">
                      <strong>Numéro de commande :</strong> ${orderNumber}
                    </p>
                  </div>

                  <!-- Order Items -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                    <thead>
                      <tr style="background-color: #8b957a;">
                        <th style="padding: 15px; text-align: left; color: #ffffff; font-weight: 600;">Produit</th>
                        <th style="padding: 15px; text-align: center; color: #ffffff; font-weight: 600;">Qté</th>
                        <th style="padding: 15px; text-align: right; color: #ffffff; font-weight: 600;">Prix unit.</th>
                        <th style="padding: 15px; text-align: right; color: #ffffff; font-weight: 600;">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${itemsHtml}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="3" style="padding: 20px 15px; text-align: right; font-size: 18px; font-weight: 700; color: #657254;">
                          TOTAL
                        </td>
                        <td style="padding: 20px 15px; text-align: right; font-size: 18px; font-weight: 700; color: #657254;">
                          ${totalAmount.toFixed(2)}€
                        </td>
                      </tr>
                    </tfoot>
                  </table>

                  <!-- Next Steps -->
                  <div style="background-color: #e8f5e9; padding: 20px; border-radius: 8px; border-left: 4px solid #8b957a; margin-bottom: 30px;">
                    <h3 style="color: #657254; margin: 0 0 10px 0; font-size: 18px;">Prochaines étapes</h3>
                    <ul style="color: #666; line-height: 1.8; margin: 0; padding-left: 20px;">
                      <li>Préparation de votre commande sous 24-48h</li>
                      <li>Expédition avec numéro de suivi</li>
                      <li>Livraison sous 3-5 jours ouvrés</li>
                    </ul>
                  </div>

                  <p style="color: #666; line-height: 1.6; margin: 0;">
                    Si vous avez des questions, n'hésitez pas à nous contacter à <a href="mailto:contact@mamanature-heritage.fr" style="color: #8b957a; text-decoration: none;">contact@mamanature-heritage.fr</a>
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f5f5f5; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                  <p style="color: #666; margin: 0 0 10px 0; font-size: 14px;">
                    🌱 Certification Bio Européenne | ♻️ Emballages 100% recyclables
                  </p>
                  <p style="color: #999; margin: 0; font-size: 12px;">
                    © 2023-2026 Mamanature Heritage. Tous droits réservés.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// Génération du texte brut de l'email
function generateOrderEmailText({ customerName, orderNumber, orderItems, totalAmount }) {
  const itemsText = orderItems.map(item => 
    `${item.name} - Qté: ${item.quantity} - ${item.price.toFixed(2)}€ x ${item.quantity} = ${(item.price * item.quantity).toFixed(2)}€`
  ).join('\n');

  return `
MAMANATURE HERITAGE
La force de la nature pour votre bien-être

Merci pour votre commande !

Bonjour ${customerName},

Nous avons bien reçu votre commande et nous vous en remercions.

Numéro de commande : ${orderNumber}

DÉTAILS DE LA COMMANDE :
${itemsText}

TOTAL : ${totalAmount.toFixed(2)}€

PROCHAINES ÉTAPES :
- Préparation de votre commande sous 24-48h
- Expédition avec numéro de suivi
- Livraison sous 3-5 jours ouvrés

Pour toute question : contact@mamanature-heritage.fr

© 2023-2026 Mamanature Heritage. Tous droits réservés.
  `;
}
