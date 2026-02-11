import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Mamanature Heritage</h3>
          <p>La force de la nature pour votre bien-être</p>
          <p className="footer-tagline">Fusion de la sagesse ancestrale avec la science moderne</p>
        </div>
        <div className="footer-section">
          <h4>Nos Gammes</h4>
          <ul>
            <li><a href="/products">Ligne Vitalité</a></li>
            <li><a href="/products">Ligne Sérénité</a></li>
            <li><a href="/products">Ligne Immunité</a></li>
            <li><a href="/products">Ligne Enfants</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>L'Entreprise</h4>
          <ul>
            <li><a href="/about">Notre Histoire</a></li>
            <li><a href="/about">Nos Engagements</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Nos Engagements</h4>
          <p>🌱 Certification Bio Européenne</p>
          <p>♻️ Emballages 100% recyclables</p>
          <p>🌍 1% du CA pour la biodiversité</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023-2026 Mamanature Heritage. Tous droits réservés. | Entreprise à Mission</p>
      </div>
    </footer>
  );
}

export default Footer;
