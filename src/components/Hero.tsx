import React from 'react'

type HeroProps = {
  onCTAClick: () => void
  onContactClick: () => void
}

export const Hero: React.FC<HeroProps> = ({ onCTAClick, onContactClick }) => {
  return (
    <section className="hero section" id="home">
      <div className="hero__container container">
        <div className="hero__content">
          <h1 className="hero__title">
            Firma de <span className="hero__title-accent">construcții civile</span> și industriale
          </h1>
          <p className="hero__description">
            Calitate și profesionalism în fiecare proiect. Experiență de peste 20 ani în construcții civile și industriale.
          </p>
          <div className="hero__buttons">
            <button className="button button--primary" onClick={onCTAClick}>Serviciile Noastre</button>
            <button className="button button--outline" onClick={onContactClick}>Contactează-ne</button>
          </div>
        </div>
        <div className="hero__image">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-construction.jpg`}
            alt="Construcții Balcan Building"
            className="hero__img"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}


