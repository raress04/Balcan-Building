import React, { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

// ─── EmailJS credentials ────────────────────────────────────────────────────
// Replace these with your own values from https://dashboard.emailjs.com
const EMAILJS_SERVICE_ID = 'service_g0euzw1'
const EMAILJS_TEMPLATE_ID = 'template_2qk6gjq'
const EMAILJS_PUBLIC_KEY = 'e59IAHisMUHhBWCHr'
// ─────────────────────────────────────────────────────────────────────────────

export const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (!formRef.current) return

    setLoading(true)
    setStatus('idle')
    setErrorMessage('')

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      setStatus('success')
      formRef.current.reset()
    } catch (err: unknown) {
      console.error('EmailJS error:', err)
      if (err && typeof err === 'object' && 'text' in err) {
        setErrorMessage((err as { text: string }).text)
      } else {
        setErrorMessage('Eroare de rețea. Verifică conexiunea la internet.')
      }
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
          <form ref={formRef} className={`contact__form ${loading ? 'loading' : ''}`} onSubmit={onSubmit}>
            {/* Field 'name' attrs match EmailJS template variables: {{name}}, {{email}}, {{title}}, {{phone}}, {{message}} */}
            <div className="form__group"><input name="name" placeholder="Numele complet" className="form__input" required /></div>
            <div className="form__group"><input type="email" name="email" placeholder="Adresa de email" className="form__input" required /></div>
            <div className="form__group"><input name="phone" placeholder="Numărul de telefon" className="form__input" required /></div>
            <div className="form__group"><select name="title" className="form__input" required><option value="">Selectează serviciul</option><option value="constructii-civile">Construcții civile</option><option value="constructii-industriale">Construcții industriale</option><option value="amenajari">Amenajări exterioare/interioare</option><option value="termoizolatie">Termo/hidroizolații</option><option value="tencuieli">Tencuieli mecanizate</option><option value="audit-energetic">Audit energetic</option><option value="renovari">Renovări și modernizări</option></select></div>
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
