import React, { useState } from 'react'

export const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('idle')
    setErrorMessage('')

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('https://formspree.io/f/mzddprbp', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        form.reset()
      } else {
        console.error('Formspree error:', data)
        setErrorMessage(data.errors?.map((e: { message: string }) => e.message).join(', ') || 'Eroare necunoscută de la server')
        setStatus('error')
      }
    } catch (err) {
      console.error('Network/fetch error:', err)
      setErrorMessage('Eroare de rețea. Verifică conexiunea la internet.')
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <h2 className="section__title reveal">Contactează-ne</h2>
        <p className="section__subtitle reveal">Suntem aici să vă ajutăm cu proiectul dumneavoastră</p>
        <div className="contact__content">
          <div className="contact__info">
            <div className="contact__card"><div className="contact__icon">📞</div><div className="contact__details"><h3 className="contact__title">Telefon</h3><p className="contact__text">+40 744 381 663</p></div></div>
            <div className="contact__card"><div className="contact__icon">✉️</div><div className="contact__details"><h3 className="contact__title">Email</h3><p className="contact__text">office@balcan-construct.ro</p></div></div>
            <div className="contact__card"><div className="contact__icon">📍</div><div className="contact__details"><h3 className="contact__title">Adresă</h3><p className="contact__text">Cumpăna, Str. Ion Minulescu nr. 5,</p><p className="contact__text">907105, Jud. Constanța</p></div></div>
          </div>
          <form className={`contact__form ${loading ? 'loading' : ''}`} onSubmit={onSubmit}>
            <input type="hidden" name="_subject" value="Mesaj nou de pe site-ul Balcan Construct" />
            <div className="form__group"><input name="name" placeholder="Numele complet" className="form__input" required /></div>
            <div className="form__group"><input type="email" name="email" placeholder="Adresa de email" className="form__input" required /></div>
            <div className="form__group"><input name="phone" placeholder="Numărul de telefon" className="form__input" required /></div>
            <div className="form__group"><select name="service" className="form__input" required><option value="">Selectează serviciul</option><option value="constructii-civile">Construcții civile</option><option value="constructii-industriale">Construcții industriale</option><option value="amenajari">Amenajări exterioare/interioare</option><option value="termoizolatie">Termo/hidroizolații</option><option value="tencuieli">Tencuieli mecanizate</option><option value="audit-energetic">Audit energetic</option><option value="renovari">Renovări și modernizări</option></select></div>
            <div className="form__group"><textarea name="message" placeholder="Descrie proiectul dumneavoastră..." className="form__input form__textarea" rows={5} required /></div>
            {status === 'success' && <p className="form__message form__message--success">✓ Mesajul a fost trimis cu succes! Vă vom contacta în curând.</p>}
            {status === 'error' && <p className="form__message form__message--error">✗ {errorMessage || 'A apărut o eroare. Vă rugăm încercați din nou.'}</p>}
            <button className="button button--primary form__button" disabled={loading}>{loading ? 'Se trimite...' : 'Trimite Mesajul'}</button>
          </form>
        </div>
      </div>
    </section>
  )
}
