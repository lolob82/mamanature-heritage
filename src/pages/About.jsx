import './About.css';

function About() {
  return (
    <div className="about-page">
      <div className="container">
        <h1>Notre Histoire</h1>
        
        <div className="about-content">
          <section className="about-section hero-section">
            <h2>Née au cœur des Alpes françaises</h2>
            <p>
              Mamanature Heritage incarne la rencontre entre la sagesse ancestrale des plantes 
              et l'innovation scientifique moderne. Notre voyage a commencé en 2023, 
              inspiré par la richesse de la biodiversité française et le désir de proposer 
              des solutions naturelles accessibles à tous.
            </p>
          </section>

          <section className="about-section">
            <h2>Notre Philosophie</h2>
            <p>
              Mamanature Heritage s'engage à créer des compléments alimentaires d'excellence, 
              en harmonie avec la nature et respectueux de l'environnement. Notre mission 
              est de démocratiser l'accès à des solutions naturelles de haute qualité, 
              tout en préservant les ressources naturelles pour les générations futures.
            </p>
          </section>

          <section className="about-section">
            <h2>Notre Différenciation</h2>
            <ul>
              <li>🔍 Traçabilité complète de nos ingrédients</li>
              <li>🤝 Partenariats exclusifs avec des producteurs locaux</li>
              <li>⚗️ Processus d'extraction breveté préservant l'intégrité des principes actifs</li>
              <li>✅ Certification bio européenne et label "Entreprise à Mission"</li>
              <li>❄️ Extraction à froid des principes actifs</li>
              <li>🧪 Formulation synergique des ingrédients</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>Notre Engagement Durable</h2>
            <ul>
              <li>🌱 1% du CA reversé à des projets de préservation de la biodiversité</li>
              <li>♻️ Emballages 100% recyclables</li>
              <li>🌳 Programme de reforestation actif</li>
              <li>🌍 Conservation naturelle sans additifs chimiques</li>
              <li>📦 Packaging éco-responsable</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>Nos Valeurs</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3>Authenticité</h3>
                <p>Transparence totale sur nos ingrédients et processus</p>
              </div>
              <div className="value-item">
                <h3>Excellence</h3>
                <p>Qualité premium accessible à tous</p>
              </div>
              <div className="value-item">
                <h3>Innovation</h3>
                <p>Alliance de la tradition et de la science moderne</p>
              </div>
              <div className="value-item">
                <h3>Durabilité</h3>
                <p>Respect de l'environnement et des générations futures</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;
