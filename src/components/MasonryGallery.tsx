import React, { useState, useCallback, useRef, useEffect } from 'react'

// Declare global types for CDN-loaded libraries
declare global {
    interface Window {
        GLightbox: any
    }
}

// ─── Project Data ───────────────────────────────────────────────
interface Project {
    id: string
    title: string
    description: string
    category: string
    categoryLabel: string
    location: string
    year: string
    imageCount: number
}

const projects: Project[] = [
    {
        id: 'locuinta-p-m-piscina',
        title: 'Locuință P+M cu Piscină',
        description: 'Realizare construcție locuință "la cheie", hidroizolații, finisaje piscină',
        category: 'rezidential',
        categoryLabel: 'Rezidențial',
        location: 'Constanța',
        year: '2024',
        imageCount: 5,
    },
    {
        id: 'birouri-d-p-5e',
        title: 'Imobil Birouri D+P+5E',
        description: 'Realizare infrastructură + structură metalică mixtă',
        category: 'comercial',
        categoryLabel: 'Comercial',
        location: 'Constanța',
        year: '2023',
        imageCount: 5,
    },
    {
        id: 'imobile-cuplate-sp-p-1e-m',
        title: 'Două Imobile Cuplate Sp+P+1E+M',
        description: 'Preluare structură, zidării, amenajări interioare, fațade',
        category: 'rezidential',
        categoryLabel: 'Rezidențial',
        location: 'Constanța',
        year: '2023',
        imageCount: 5,
    },
    {
        id: 'birouri-d-p-2e',
        title: 'Imobil Birouri D+P+2E',
        description: 'Construcție realizată "la cheie"',
        category: 'comercial',
        categoryLabel: 'Comercial',
        location: 'Constanța',
        year: '2023',
        imageCount: 5,
    },
    {
        id: 'cabinet-stomatologic',
        title: 'Amenajare Cabinet Stomatologic',
        description: 'Amenajare și finisaje interioare cabinet stomatologic',
        category: 'comercial',
        categoryLabel: 'Comercial',
        location: 'Constanța',
        year: '2024',
        imageCount: 5,
    },
    {
        id: 'consolidare-sp-p-3e',
        title: 'Consolidare Imobil Sp+P+3E',
        description: 'Consolidare perete, realizare termosistem',
        category: 'renovare',
        categoryLabel: 'Renovare',
        location: 'Constanța',
        year: '2023',
        imageCount: 6,
    },
    {
        id: 'imobile-p-1e',
        title: 'Două Imobile P+1E',
        description: 'Construcție realizată "la cheie"',
        category: 'rezidential',
        categoryLabel: 'Rezidențial',
        location: 'Constanța',
        year: '2022',
        imageCount: 3,
    },
    {
        id: 'imobile-p-1e-cuplate',
        title: 'Două Imobile P+1E Cuplate',
        description: 'Construcție imobile cuplate',
        category: 'rezidential',
        categoryLabel: 'Rezidențial',
        location: 'Constanța',
        year: '2022',
        imageCount: 5,
    },
    {
        id: 'locuinte-colective-p-3-4p',
        title: 'Imobil Locuințe Colective P+3+4p',
        description: 'Construcție bloc de locuințe colective',
        category: 'rezidential',
        categoryLabel: 'Rezidențial',
        location: 'Constanța',
        year: '2023',
        imageCount: 5,
    },
    {
        id: 'apartamente-p-3e',
        title: 'Imobil P+3E Apartamente',
        description: 'Lucrări zidărie, finisaje interioare, fațade, amenajări exterioare',
        category: 'rezidential',
        categoryLabel: 'Rezidențial',
        location: 'Constanța',
        year: '2023',
        imageCount: 5,
    },
    {
        id: 'imobil-s-p-1e-2p',
        title: 'Imobil S+P+1E+2p',
        description: 'Construcție realizată "la cheie"',
        category: 'rezidential',
        categoryLabel: 'Rezidențial',
        location: 'Constanța',
        year: '2022',
        imageCount: 5,
    },
    {
        id: 'spatii-comerciale-s-p-2e',
        title: 'Imobil S+P+2E Spații Comerciale',
        description: 'Construcție realizată "la cheie"',
        category: 'comercial',
        categoryLabel: 'Comercial',
        location: 'Constanța',
        year: '2022',
        imageCount: 4,
    },
    {
        id: 'locuinta-eforie-sud',
        title: 'Locuință P+1E Eforie Sud',
        description: 'Construcție realizată "la cheie"',
        category: 'rezidential',
        categoryLabel: 'Rezidențial',
        location: 'Eforie Sud',
        year: '2023',
        imageCount: 5,
    },
    {
        id: 'locuinta-tomis-plus',
        title: 'Locuință P+1E Tomis Plus',
        description: 'Construcție locuință în zona Tomis Plus',
        category: 'rezidential',
        categoryLabel: 'Rezidențial',
        location: 'Constanța',
        year: '2023',
        imageCount: 5,
    },
    {
        id: 'locuinta-garaj-bucatarie',
        title: 'Locuință P+1E cu Garaj și Bucătărie',
        description: 'Construcție locuință cu garaj și bucătărie de vară',
        category: 'rezidential',
        categoryLabel: 'Rezidențial',
        location: 'Constanța',
        year: '2022',
        imageCount: 2,
    },
    {
        id: 'modernizare-extindere',
        title: 'Modernizare și Extindere Locuință P',
        description: 'Extindere locuință, refacere fațade și acoperiș',
        category: 'renovare',
        categoryLabel: 'Renovare',
        location: 'Constanța',
        year: '2024',
        imageCount: 3,
    },
]

// Build full photo arrays for each project (cover + gallery images)
function getProjectPhotos(project: Project): string[] {
    const basePath = import.meta.env.BASE_URL
    const photos: string[] = [`${basePath}images/portfolio/${project.id}.jpg`]
    for (let i = 1; i <= project.imageCount; i++) {
        photos.push(`${basePath}images/gallery/${project.id}/${i}.jpg`)
    }
    return photos
}

// ─── Filter Categories ──────────────────────────────────────────
const categories = [
    { filter: '*', label: 'Toate Proiectele' },
    { filter: 'rezidential', label: 'Rezidențial' },
    { filter: 'comercial', label: 'Comercial' },
    { filter: 'renovare', label: 'Renovare' },
]

// ─── SVG Icons ──────────────────────────────────────────────────
const ArrowLeft = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
    </svg>
)
const ArrowRight = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
    </svg>
)
const GalleryIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
    </svg>
)

// ─── Per-Card Component ─────────────────────────────────────────
const ProjectCard: React.FC<{
    project: Project
    index: number
    onOpenLightbox: (project: Project, startIndex: number) => void
}> = ({ project, index, onOpenLightbox }) => {
    const photos = getProjectPhotos(project)
    const [photoIndex, setPhotoIndex] = useState(0)
    const totalPhotos = photos.length

    const goPrev = useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        setPhotoIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos)
    }, [totalPhotos])

    const goNext = useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        setPhotoIndex((prev) => (prev + 1) % totalPhotos)
    }, [totalPhotos])

    const handleCardClick = useCallback(() => {
        onOpenLightbox(project, photoIndex)
    }, [project, photoIndex, onOpenLightbox])

    const handleButtonClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        onOpenLightbox(project, 0)
    }, [project, onOpenLightbox])

    return (
        <article
            className="gallery-item"
            role="article"
            onClick={handleCardClick}
            style={{ animationDelay: `${index * 0.06}s` }}
        >
            <div className="card-image-wrapper">
                <img
                    className="card-cover-img"
                    src={photos[photoIndex]}
                    alt={`${project.title} — Foto ${photoIndex + 1}`}
                    loading="lazy"
                    decoding="async"
                />

                {totalPhotos > 1 && (
                    <>
                        <button className="card-arrow card-arrow--prev" aria-label="Fotografia anterioară" onClick={goPrev}>
                            <ArrowLeft />
                        </button>
                        <button className="card-arrow card-arrow--next" aria-label="Fotografia următoare" onClick={goNext}>
                            <ArrowRight />
                        </button>
                    </>
                )}

                {totalPhotos > 1 && (
                    <div className="card-dots" aria-hidden="true">
                        {photos.map((_, i) => (
                            <span key={i} className={`card-dot${i === photoIndex ? ' active' : ''}`} />
                        ))}
                    </div>
                )}

                <span className="card-photo-counter">{photoIndex + 1} / {totalPhotos}</span>
            </div>

            <div className="gallery-overlay">
                <span className="project-badge">{project.categoryLabel}</span>
                <div className="project-text">
                    <h3 className="project-title">{project.title}</h3>
                    <span className="project-meta">{project.location} · {project.year}</span>
                </div>
                <button className="btn-open-lightbox" aria-label={`Galerie foto ${project.title}`} onClick={handleButtonClick}>
                    <GalleryIcon />
                    <span>Vezi Galeria</span>
                    <span className="photo-count-badge">{totalPhotos} foto</span>
                </button>
            </div>
        </article>
    )
}

// ─── Main Gallery Component ─────────────────────────────────────
// ─── Main Gallery Component ─────────────────────────────────────
export const MasonryGallery: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('*')
    // Responsive: 1 item on mobile (<768), 3 items on desktop
    const [itemsPerSlide, setItemsPerSlide] = useState(
        typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3
    )
    const [currentSlide, setCurrentSlide] = useState(0)
    const touchStartX = useRef(0)

    // Filter projects using React state
    const filteredProjects = activeFilter === '*'
        ? projects
        : projects.filter((p) => p.category === activeFilter)

    // Chunk projects into slides
    const slides = []
    for (let i = 0; i < filteredProjects.length; i += itemsPerSlide) {
        slides.push(filteredProjects.slice(i, i + itemsPerSlide))
    }
    const totalSlides = slides.length

    // Handle filter change
    const handleFilter = useCallback((filter: string) => {
        setActiveFilter(filter)
        setCurrentSlide(0) // Reset to first slide
    }, [])

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            const newPerSlide = window.innerWidth < 768 ? 1 : 3
            setItemsPerSlide((prev) => {
                if (prev !== newPerSlide) {
                    setCurrentSlide(0)
                    return newPerSlide
                }
                return prev
            })
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Carousel Navigation
    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, [totalSlides])

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
    }, [totalSlides])

    const goToSlide = (index: number) => {
        setCurrentSlide(index)
    }

    // Touch/Swipe Support
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX
    }
    const handleTouchEnd = (e: React.TouchEvent) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide()
            else prevSlide()
        }
    }

    // Handle lightbox open
    const handleOpenLightbox = useCallback((project: Project, startIndex: number) => {
        if (!window.GLightbox) return

        const photos = getProjectPhotos(project)
        const projectSlides = photos.map((src, i) => ({
            href: src,
            type: 'image' as const,
            title: i === 0 ? project.title : `${project.title} — Foto ${i}`,
            description: i === 0
                ? `${project.categoryLabel} · ${project.location} · ${project.year}`
                : project.description,
        }))

        const lightbox = window.GLightbox({
            elements: projectSlides,
            startAt: startIndex,
            touchNavigation: true,
            loop: true,
            autoplayVideos: false,
            openEffect: 'zoom',
            closeEffect: 'fade',
            skin: 'clean',
        })

        lightbox.open()
    }, [])

    return (
        <section className="gallery-section" id="portfolio">
            <div className="gallery-header">
                <h2 className="gallery-section-title reveal">Portofoliul Nostru</h2>
                <p className="gallery-section-subtitle reveal">
                    Explorați proiectele noastre finalizate în toate sectoarele de construcții.
                </p>
            </div>

            <div className="gallery-filters reveal" role="group" aria-label="Filtrare proiecte">
                {categories.map((cat) => (
                    <button
                        key={cat.filter}
                        className={`filter-btn${activeFilter === cat.filter ? ' active' : ''}`}
                        aria-pressed={activeFilter === cat.filter}
                        onClick={() => handleFilter(cat.filter)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Carousel Structure */}
            <div
                className="portfolio-carousel reveal"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* Navigation Arrows (visible if >1 slide) */}
                {totalSlides > 1 && (
                    <>
                        <button className="portfolio-nav portfolio-nav--prev" onClick={prevSlide} aria-label="Proiecte anterioare">
                            <ArrowLeft />
                        </button>
                        <button className="portfolio-nav portfolio-nav--next" onClick={nextSlide} aria-label="Proiecte următoare">
                            <ArrowRight />
                        </button>
                    </>
                )}

                <div className="portfolio-track-container">
                    <div
                        className="portfolio-track"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {slides.map((slideGroup, slideIndex) => (
                            <div key={slideIndex} className="portfolio-slide">
                                {slideGroup.map((project, i) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        index={i}
                                        onOpenLightbox={handleOpenLightbox}
                                    />
                                ))}
                                {/* Fill empty slots if last slide is incomplete (optional, or let flex handle it) */}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dots Pagination */}
                {totalSlides > 1 && (
                    <div className="portfolio-dots">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                className={`portfolio-dot${idx === currentSlide ? ' active' : ''}`}
                                onClick={() => goToSlide(idx)}
                                aria-label={`Pagina ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
