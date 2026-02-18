import React, { useEffect, useState } from 'react'

type HeaderProps = {
  active: string
  onNavigate: (id: string) => void
}

export const Header: React.FC<HeaderProps> = ({ active, onNavigate }) => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Toggle body class for menu-open animation
  useEffect(() => {
    if (open) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
    return () => document.body.classList.remove('menu-open')
  }, [open])

  const Link = (id: string, label: string) => (
    <li>
      <a
        className={`nav__link ${active === id ? 'active-link' : ''}`}
        href={`#${id}`}
        onClick={(e) => { e.preventDefault(); setOpen(false); onNavigate(id) }}
      >{label}</a>
    </li>
  )

  return (
    <header id="app-header" className={`header ${scrolled ? 'scroll-header' : ''}`}>
      <nav className="nav container">
        <div className="nav__logo">
          <img src="/images/logo.png" alt="Balcan Building Logo" className="nav__logo-img" />
          <span className="nav__logo-text">Balcan Building</span>
        </div>
        <button className="nav__toggle" onClick={() => setOpen(true)} aria-label="Deschide meniul">☰</button>
        <div className={`nav__menu ${open ? 'show-menu' : ''}`}>
          <ul className="nav__list">
            {Link('home', 'Acasă')}
            {Link('about', 'Despre Noi')}
            {Link('services', 'Servicii')}
            {Link('portfolio', 'Portofoliu')}
            {Link('providers', 'Furnizori')}
            {Link('contact', 'Contact')}
          </ul>
          <button className="nav__close" onClick={() => setOpen(false)} aria-label="Închide meniul">✕</button>
        </div>
      </nav>
    </header>
  )
}


