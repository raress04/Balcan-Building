import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const items = [
    { emoji: '🏗️', title: 'Construcții civile și industriale', desc: 'Calitatea lucrărilor executate și îmbunătățirea serviciilor oferite clienților reprezintă principalele noastre preocupări.' },
    { emoji: '🏠', title: 'Amenajări exterioare și interioare', desc: 'Oferim soluții complete pentru amenajări interioare și exterioare, adaptate nevoilor și preferințelor dumneavoastră.' },
    { emoji: '🛡️', title: 'Lucrări de termo/hidroizolații', desc: 'Asigurăm lucrări de termo și hidroizolații de înaltă calitate pentru protecția și eficiența energetică a clădirilor.' },
    { emoji: '🧱', title: 'Tencuieli mecanizate', desc: 'Executăm tencuieli mecanizate pentru finisaje durabile și estetice, folosind echipamente moderne.' },
    { emoji: '⚡', title: 'Audit energetic', desc: 'Realizăm audituri energetice pentru a identifica și implementa soluții de eficiență energetică.' },
    { emoji: '🔧', title: 'Renovări și modernizări', desc: 'Specializați în renovări complete și modernizări, transformăm spațiile conform celor mai noi standarde.' },
]

export const ServicesPage: React.FC = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="services-page">
            <header className="services-page__header">
                <div className="container" style={{ display: 'flex', alignItems: 'center', height: '60px' }}>
                    <Link to="/" className="services-page__back">
                        ← Înapoi
                    </Link>
                    <h1 style={{ marginLeft: '1rem', fontSize: '1.2rem', fontWeight: 700 }}>Toate Serviciile</h1>
                </div>
            </header>

            <main className="container section" style={{ paddingTop: '80px' }}>
                <div className="services__grid">
                    {items.map((s) => (
                        <div className="service__card revealed" key={s.title}>
                            <div className="service__icon">
                                <span className="service__emoji">{s.emoji}</span>
                            </div>
                            <h3 className="service__title">{s.title}</h3>
                            <p className="service__description">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}
