import React from 'react'

export const About: React.FC = () => {
  return (
    <section className="about section" id="about">
      <div className="about__container container">
        <div className="about__content">
          <h2 className="section__title reveal">Despre Noi</h2>
          <p className="about__description reveal">
            Suntem o companie de construcții cu capital integral românesc, definită prin stabilitate, seriozitate și viziune. Cu o experiență de peste două decenii în domeniu, am transformat provocările tehnice în repere arhitecturale, livrând proiecte care rezistă testului timpului.
          </p>
          <p className="about__description reveal">
            <strong>Misiune:</strong> Să oferim soluții de construcție "la cheie" care combină siguranța structurală cu performanța energetică ridicată și finisaje la cel mai înalt nivel.
          </p>
          <p className="about__description reveal">
            <strong>Valori:</strong> Calitate fără compromis, respectarea termenelor, transparență totală.
          </p>
          <div className="about__stats">
            <div className="stat reveal reveal-delay-1">
              <h3 className="stat__number">20+</h3>
              <p className="stat__text">Ani experiență</p>
            </div>
            <div className="stat reveal reveal-delay-2">
              <h3 className="stat__number">100+</h3>
              <p className="stat__text">Proiecte finalizate</p>
            </div>
            <div className="stat reveal reveal-delay-3">
              <h3 className="stat__number">100%</h3>
              <p className="stat__text">Clienți mulțumiți</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


