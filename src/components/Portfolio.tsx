import React from 'react'

// Project data based on actual folder structure
const projects = [
  { id: 'cabinet-stomatologic', title: 'Amenajare Cabinet Stomatologic', desc: 'Amenajare și finisaje interioare', category: 'comercial' },
  { id: 'consolidare-sp-p-3e', title: 'Consolidare Imobil Sp+P+3E', desc: 'Consolidare structură existentă', category: 'rezidential' },
  { id: 'imobile-cuplate-sp-p-1e-m', title: 'Două Imobile Cuplate Sp+P+1E+M', desc: 'Construcție imobile cuplate', category: 'rezidential' },
  { id: 'imobile-p-1e', title: 'Două Imobile P+1E', desc: 'Construcție două imobile', category: 'rezidential' },
  { id: 'imobile-p-1e-cuplate', title: 'Două Imobile P+1E Cuplate', desc: 'Construcție imobile cuplate', category: 'rezidential' },
  { id: 'birouri-d-p-2e', title: 'Imobil Birouri D+P+2E', desc: 'Clădire de birouri', category: 'comercial' },
  { id: 'birouri-d-p-5e', title: 'Imobil Birouri D+P+5E', desc: 'Clădire de birouri multietajată', category: 'comercial' },
  { id: 'locuinte-colective-p-3-4p', title: 'Imobil Locuințe Colective P+3+4p', desc: 'Bloc de locuințe', category: 'rezidential' },
  { id: 'apartamente-p-3e', title: 'Imobil P+3E Apartamente', desc: 'Bloc de apartamente', category: 'rezidential' },
  { id: 'imobil-s-p-1e-2p', title: 'Imobil S+P+1E+2p', desc: 'Construcție rezidențială', category: 'rezidential' },
  { id: 'spatii-comerciale-s-p-2e', title: 'Imobil S+P+2E Spații Comerciale', desc: 'Spații comerciale', category: 'comercial' },
  { id: 'locuinta-eforie-sud', title: 'Locuință P+1E Eforie Sud', desc: 'Vilă la mare', category: 'rezidential' },
  { id: 'locuinta-tomis-plus', title: 'Locuință P+1E Tomis Plus', desc: 'Locuință în Tomis Plus', category: 'rezidential' },
  { id: 'locuinta-garaj-bucatarie', title: 'Locuință P+1E cu Garaj și Bucătărie', desc: 'Locuință cu anexe', category: 'rezidential' },
  { id: 'locuinta-p-m-piscina', title: 'Locuință P+M cu Piscină', desc: 'Vilă cu piscină', category: 'rezidential' },
  { id: 'modernizare-extindere', title: 'Modernizare și Extindere Locuință P', desc: 'Renovare și extindere', category: 'renovare' },
]

interface PortfolioProps {
  onProjectClick?: (projectId: string) => void
}

export const Portfolio: React.FC<PortfolioProps> = ({ onProjectClick }) => {
  const handleClick = (projectId: string) => {
    if (onProjectClick) {
      onProjectClick(projectId)
    }
  }

  return (
    <section className="portfolio section" id="portfolio">
      <div className="portfolio__container container">
        <h2 className="section__title reveal">Portofoliul Nostru</h2>
        <p className="section__subtitle reveal">Proiecte realizate cu succes pentru clienții noștri</p>
        <div className="portfolio__grid">
          {projects.map((p, index) => (
            <div
              className={`portfolio__item reveal reveal-delay-${(index % 4) + 1}`}
              key={p.id}
              onClick={() => handleClick(p.id)}
            >
              <h3 className="portfolio__label">{p.title}</h3>
              <div className="portfolio__image">
                <img
                  src={`/images/portfolio/${p.id}.jpg`}
                  alt={p.title}
                  className="portfolio__img"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.add('portfolio__placeholder--visible');
                  }}
                />
                <div className="portfolio__placeholder">
                  <span className="portfolio__placeholder-icon">🏗️</span>
                </div>
                <div className="portfolio__overlay">
                  <span className="portfolio__category">{p.category}</span>
                  <h3 className="portfolio__title">{p.title}</h3>
                  <p className="portfolio__description">{p.desc}</p>
                  <span className="portfolio__cta">Vezi Galeria →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
