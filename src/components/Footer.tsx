import React from 'react'

export const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer__container container">
      <div className="footer__content">
        <div className="footer__brand">
          <div className="footer__logo">
            <img src="/images/logo.png" alt="Balcan Building Logo" className="footer__logo-img" />
            <span className="footer__logo-text">Balcan Building</span>
          </div>
          <p className="footer__description">Firma de construcții civile și industriale din Constanța. Calitate și profesionalism în fiecare proiect.</p>
        </div>
        <div className="footer__links">
          <h3 className="footer__title">Link-uri Rapide</h3>
          <ul className="footer__list">
            <li><a href="#about" className="footer__link">Despre Noi</a></li>
            <li><a href="#services" className="footer__link">Servicii</a></li>
            <li><a href="#portfolio" className="footer__link">Portofoliu</a></li>
            <li><a href="#providers" className="footer__link">Furnizori</a></li>
            <li><a href="#contact" className="footer__link">Contact</a></li>
          </ul>
        </div>
        <div className="footer__contact">
          <h3 className="footer__title">Contact</h3>
          <div className="footer__contact-item">📞 <span>0241-664910</span></div>
          <div className="footer__contact-item">✉️ <span>office@balcan-construct.ro</span></div>
          <div className="footer__contact-item">📍 <span>Constanța, Blv. Tomis 320</span></div>
        </div>
      </div>
      <div className="footer__bottom">
        <p className="footer__copy">© 2026 Balcan Building SRL. Toate drepturile rezervate.</p>
      </div>
    </div>
  </footer>
)


