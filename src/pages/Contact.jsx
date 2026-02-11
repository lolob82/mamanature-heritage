import { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-page">
      <div className="container">
        <h1>Contact Us</h1>
        
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Contactez-nous</h2>
            <p>Nous serions ravis de vous entendre. Envoyez-nous un message et nous vous répondrons dans les plus brefs délais.</p>
            
            <div className="contact-details">
              <div className="contact-item">
                <strong>Email:</strong>
                <p>contact@mamanature-heritage.fr</p>
              </div>
              <div className="contact-item">
                <strong>Téléphone:</strong>
                <p>+33 (0)4 XX XX XX XX</p>
              </div>
              <div className="contact-item">
                <strong>Adresse:</strong>
                <p>Alpes françaises<br />France</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-button">Envoyer le message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
