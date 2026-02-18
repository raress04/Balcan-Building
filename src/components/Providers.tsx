import React, { useState, useEffect, useRef, useCallback } from 'react'

// Providers list with actual supplier names
const providers = [
  { name: 'Bit Industries', logo: '/images/providers/provider-1.png', className: '' },
  { name: 'Arabesque', logo: '/images/providers/provider-2.png', className: '' },
  { name: 'Pro Tools Consult', logo: '/images/providers/provider-3.png', className: '' },
  { name: 'Triton', logo: '/images/providers/provider-4.png', className: '' },
  { name: 'VDT', logo: '/images/providers/provider-5.png', className: 'providers__logo--smaller' },
  { name: 'Repec', logo: '/images/providers/provider-6.png', className: 'providers__logo--bigger' },
  { name: 'GDC Commercial', logo: '/images/providers/provider-7.png', className: '' },
  { name: 'Menatwork Solution', logo: '/images/providers/provider-8.png', className: '' },
  { name: 'Ejot', logo: '/images/providers/provider-9.png', className: '' },
  { name: 'Basik Supply', logo: '/images/providers/provider-10.png', className: '' },
  { name: 'Eurozone Metal', logo: '/images/providers/provider-11.png', className: 'providers__logo--smaller' },
  { name: 'Euroart', logo: '/images/providers/provider-12.png', className: '' },
  { name: 'Holver', logo: '/images/providers/provider-13.png', className: '' },
  { name: 'Fibrotermica', logo: '/images/providers/provider-14.png', className: '' },
]

const AUTO_SLIDE_INTERVAL = 5000

function buildSlides(perSlide: number) {
  const result: typeof providers[] = []
  const total = Math.ceil(providers.length / perSlide)
  for (let i = 0; i < total; i++) {
    result.push(providers.slice(i * perSlide, (i + 1) * perSlide))
  }
  return result
}

export const Providers: React.FC = () => {
  const [itemsPerSlide, setItemsPerSlide] = useState(
    typeof window !== 'undefined' && window.innerWidth <= 768 ? 4 : 5
  )
  const [currentSlide, setCurrentSlide] = useState(0)
  const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const userInteractedRef = useRef(false)
  const touchStartX = useRef(0)

  const slides = buildSlides(itemsPerSlide)
  const totalSlides = slides.length

  // Respond to resize — switch between 5 (desktop) and 4 (mobile)
  useEffect(() => {
    const onResize = () => {
      const newPerSlide = window.innerWidth <= 768 ? 4 : 5
      setItemsPerSlide((prev) => {
        if (prev !== newPerSlide) {
          setCurrentSlide(0) // reset to first slide on layout change
          return newPerSlide
        }
        return prev
      })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Start auto-slide on mount
  useEffect(() => {
    if (userInteractedRef.current) return

    autoSlideRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, AUTO_SLIDE_INTERVAL)

    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current)
    }
  }, [totalSlides])

  // Stop auto-slide permanently on user interaction
  const stopAutoSlide = useCallback(() => {
    if (!userInteractedRef.current) {
      userInteractedRef.current = true
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current)
        autoSlideRef.current = null
      }
    }
  }, [])

  const goToSlide = useCallback((index: number) => {
    stopAutoSlide()
    setCurrentSlide(((index % totalSlides) + totalSlides) % totalSlides)
  }, [stopAutoSlide])

  const nextSlide = useCallback(() => goToSlide(currentSlide + 1), [currentSlide, goToSlide])
  const prevSlide = useCallback(() => goToSlide(currentSlide - 1), [currentSlide, goToSlide])

  // Touch/swipe support
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

  return (
    <section className="providers section" id="providers">
      <div className="container">
        <h2 className="section__title">Furnizori</h2>
        <p className="section__subtitle">Partenerii noștri de încredere</p>

        <div
          className="providers__carousel"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left arrow */}
          <button
            className="providers__nav providers__nav--prev"
            onClick={prevSlide}
            aria-label="Slide anterior"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Slides */}
          <div className="providers__slides">
            <div
              className="providers__slides-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slideItems, slideIndex) => (
                <div key={slideIndex} className="providers__slide">
                  {slideItems.map((p) => (
                    <div key={p.name} className="providers__item">
                      <div className="providers__logo-wrap">
                        <img
                          src={p.logo}
                          alt={p.name}
                          className={p.className}
                          loading="lazy"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0.3' }}
                        />
                      </div>
                      <span className="providers__name">{p.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button
            className="providers__nav providers__nav--next"
            onClick={nextSlide}
            aria-label="Slide următor"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="providers__dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`providers__dot${index === currentSlide ? ' providers__dot--active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
