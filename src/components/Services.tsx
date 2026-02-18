import React from 'react'

const items = [
  { emoji: '🏗️', title: 'Construcții civile și industriale', desc: 'Calitatea lucrărilor executate și îmbunătățirea serviciilor oferite clienților reprezintă principalele noastre preocupări.' },
  { emoji: '🏠', title: 'Amenajări exterioare și interioare', desc: 'Oferim soluții complete pentru amenajări interioare și exterioare, adaptate nevoilor și preferințelor dumneavoastră.' },
  { emoji: '🛡️', title: 'Lucrări de termo/hidroizolații', desc: 'Asigurăm lucrări de termo și hidroizolații de înaltă calitate pentru protecția și eficiența energetică a clădirilor.' },
  { emoji: '🧱', title: 'Tencuieli mecanizate', desc: 'Executăm tencuieli mecanizate pentru finisaje durabile și estetice, folosind echipamente moderne.' },
  { emoji: '⚡', title: 'Audit energetic', desc: 'Realizăm audituri energetice pentru a identifica și implementa soluții de eficiență energetică.' },
  { emoji: '🔧', title: 'Renovări și modernizări', desc: 'Specializați în renovări complete și modernizări, transformăm spațiile conform celor mai noi standarde.' },
]

export const Services: React.FC = () => (
  <section className="services section" id="services">
    <div className="services__container container">
      <h2 className="section__title reveal">Serviciile Noastre</h2>
      <p className="section__subtitle reveal">Oferim soluții complete pentru construcții civile și industriale</p>
      <div className="services__grid">
        {items.map((s, index) => (
          <div className={`service__card reveal reveal-delay-${(index % 6) + 1}`} key={s.title}>
            <div className="service__icon">
              <span className="service__emoji">{s.emoji}</span>
            </div>
            <h3 className="service__title">{s.title}</h3>
            <p className="service__description">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)
