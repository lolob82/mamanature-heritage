import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Mamanature Heritage</h1>
          <p className="hero-tagline">La force de la nature pour votre bien-être</p>
          <p className="hero-description">Fusion de la sagesse ancestrale des plantes avec la science moderne</p>
          <Link to="/products" className="cta-button">Découvrir nos compléments</Link>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Notre Engagement</h2>
          <p className="features-subtitle">Excellence naturelle et innovation scientifique</p>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🌿</span>
              <h3>100% Naturel Certifié</h3>
              <p>Ingrédients bio certifiés, extraction à froid préservant les principes actifs. Traçabilité complète de la source à votre bien-être.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🔬</span>
              <h3>Science & Tradition</h3>
              <p>Processus d'extraction breveté alliant sagesse ancestrale et innovation moderne. Formulations synergiques scientifiquement prouvées.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🌍</span>
              <h3>Engagement Durable</h3>
              <p>1% du CA reversé à la biodiversité. Emballages 100% recyclables. Programme de reforestation actif.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="product-lines">
        <div className="container">
          <h2>Nos Gammes</h2>
          <div className="lines-grid">
            <div className="line-card">
              <span className="line-icon">⚡</span>
              <h3>Ligne Vitalité</h3>
              <p>Boosters d'énergie naturels</p>
            </div>
            <div className="line-card">
              <span className="line-icon">🧘</span>
              <h3>Ligne Sérénité</h3>
              <p>Solutions anti-stress</p>
            </div>
            <div className="line-card">
              <span className="line-icon">🛡️</span>
              <h3>Ligne Immunité</h3>
              <p>Renfort des défenses naturelles</p>
            </div>
            <div className="line-card">
              <span className="line-icon">👶</span>
              <h3>Ligne Enfants</h3>
              <p>Formules adaptées aux plus jeunes</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Rejoignez notre communauté engagée</h2>
          <p>Des produits 100% naturels et scientifiquement prouvés pour votre vitalité quotidienne</p>
          <Link to="/products" className="cta-button">Voir tous nos produits</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
