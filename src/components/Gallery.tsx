import React, { useState, useEffect, useRef, useCallback } from 'react'

interface GalleryProps {
    projectId: string
    projectTitle: string
    onBack: () => void
}

// Number of gallery images per project (based on actual files)
const imageCountByProject: Record<string, number> = {
    'cabinet-stomatologic': 5,
    'consolidare-sp-p-3e': 6,
    'imobile-cuplate-sp-p-1e-m': 5,
    'imobile-p-1e': 3,
    'imobile-p-1e-cuplate': 5,
    'birouri-d-p-2e': 5,
    'birouri-d-p-5e': 5,
    'locuinte-colective-p-3-4p': 5,
    'apartamente-p-3e': 5,
    'imobil-s-p-1e-2p': 5,
    'spatii-comerciale-s-p-2e': 4,
    'locuinta-eforie-sud': 5,
    'locuinta-tomis-plus': 5,
    'locuinta-garaj-bucatarie': 2,
    'locuinta-p-m-piscina': 5,
    'modernizare-extindere': 3,
}

// Project descriptions from .txt files
const projectDescriptions: Record<string, string> = {
    'cabinet-stomatologic': 'Amenajare și finisaje interioare cabinet stomatologic',
    'consolidare-sp-p-3e': 'Consolidare perete, realizare termosistem',
    'imobile-cuplate-sp-p-1e-m': 'Preluare structură de la cota 0, realizare structură, zidării, amenajări interioare, fațade',
    'imobile-p-1e': 'Construcție realizată "la cheie"',
    'imobile-p-1e-cuplate': 'Construcție realizată "la cheie"',
    'birouri-d-p-2e': 'Construcție realizată "la cheie"',
    'birouri-d-p-5e': 'Realizare infrastructură + structură metalică mixtă - stâlpi din oțel umpluți cu beton armat, grinzi metalice, planșeu mixt din oțel + beton armat',
    'locuinte-colective-p-3-4p': 'Construcție bloc de locuințe colective',
    'apartamente-p-3e': 'Realizare lucrări zidărie, finisaje interioare, fațade, amenajări exterioare, construcție garaje',
    'imobil-s-p-1e-2p': 'Construcție realizată "la cheie"',
    'spatii-comerciale-s-p-2e': 'Construcție realizată "la cheie"',
    'locuinta-eforie-sud': 'Construcție realizată "la cheie"',
    'locuinta-tomis-plus': 'Construcție locuință în zona Tomis Plus',
    'locuinta-garaj-bucatarie': 'Construcție locuință cu garaj și bucătărie de vară',
    'locuinta-p-m-piscina': 'Realizare construcție locuință "la cheie", lucrări de construcție structură, hidroizolații, finisaje piscină',
    'modernizare-extindere': 'Extindere locuință parter, refacere fațade și acoperiș, amenajări interioare și exterioare',
}

export const Gallery: React.FC<GalleryProps> = ({ projectId, projectTitle, onBack }) => {
    const [images, setImages] = useState<string[]>([])
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    // Touch swipe support
    const touchStartX = useRef<number>(0)
    const touchEndX = useRef<number>(0)
    const minSwipeDistance = 50 // minimum distance for a swipe

    useEffect(() => {
        // Start with portfolio thumbnail as first image
        const imageUrls: string[] = [`/images/portfolio/${projectId}.jpg`]

        // Add gallery images based on the count for this project
        const count = imageCountByProject[projectId] || 0
        for (let i = 1; i <= count; i++) {
            imageUrls.push(`/images/gallery/${projectId}/${i}.jpg`)
        }
        setImages(imageUrls)
    }, [projectId])

    const openLightbox = (img: string, index: number) => {
        setSelectedImage(img)
        setCurrentIndex(index)
    }

    const closeLightbox = () => {
        setSelectedImage(null)
    }

    const goToNext = useCallback(() => {
        const nextIndex = (currentIndex + 1) % images.length
        setCurrentIndex(nextIndex)
        setSelectedImage(images[nextIndex])
    }, [currentIndex, images])

    const goToPrev = useCallback(() => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length
        setCurrentIndex(prevIndex)
        setSelectedImage(images[prevIndex])
    }, [currentIndex, images])

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation()
        goToNext()
    }

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation()
        goToPrev()
    }

    // Touch swipe handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        touchEndX.current = e.changedTouches[0].clientX
        const swipeDistance = touchStartX.current - touchEndX.current

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                // Swiped left - go to next
                goToNext()
            } else {
                // Swiped right - go to previous
                goToPrev()
            }
        }
    }

    const description = projectDescriptions[projectId] || ''

    return (
        <section className="gallery section" id="gallery">
            <div className="gallery__container container">
                <button className="gallery__back" onClick={onBack}>
                    ← Înapoi la Portofoliu
                </button>
                <h2 className="section__title">{projectTitle}</h2>
                <p className="section__subtitle">
                    Galerie foto a proiectului
                    {description && <><br /><span className="gallery__description">{description}</span></>}
                </p>

                {images.length === 0 ? (
                    <div className="gallery__empty">
                        <div className="gallery__empty-icon">📷</div>
                        <h3>Galerie în pregătire</h3>
                        <p>Imaginile pentru acest proiect vor fi adăugate în curând.</p>
                    </div>
                ) : (
                    <div className="gallery__grid">
                        {images.map((img, index) => (
                            <div
                                key={index}
                                className="gallery__item"
                                onClick={() => openLightbox(img, index)}
                            >
                                <img
                                    src={img}
                                    alt={`${projectTitle} - ${index + 1}`}
                                    className="gallery__img"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Lightbox with bottom navigation */}
                {selectedImage && (
                    <div
                        className="gallery__lightbox"
                        onClick={closeLightbox}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <button className="gallery__lightbox-close" onClick={closeLightbox}>×</button>

                        {/* Image container */}
                        <div className="gallery__lightbox-content" onClick={(e) => e.stopPropagation()}>
                            <img src={selectedImage} alt={projectTitle} className="gallery__lightbox-img" />
                        </div>

                        {/* Bottom navigation bar */}
                        <div className="gallery__lightbox-nav" onClick={(e) => e.stopPropagation()}>
                            <button className="gallery__lightbox-btn gallery__lightbox-prev" onClick={prevImage}>
                                <span className="gallery__lightbox-btn-icon">‹</span>
                                <span className="gallery__lightbox-btn-text">Anterior</span>
                            </button>
                            <div className="gallery__lightbox-counter">
                                {currentIndex + 1} / {images.length}
                            </div>
                            <button className="gallery__lightbox-btn gallery__lightbox-next" onClick={nextImage}>
                                <span className="gallery__lightbox-btn-text">Următor</span>
                                <span className="gallery__lightbox-btn-icon">›</span>
                            </button>
                        </div>

                        {/* Swipe hint for mobile */}
                        <div className="gallery__lightbox-swipe-hint">
                            ← Glisați pentru a naviga →
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
