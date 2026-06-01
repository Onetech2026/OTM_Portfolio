import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Mail, Phone, CheckCircle2, CalendarClock } from 'lucide-react'
import { fadeUp, stagger, viewportOnce } from '../lib/animations'
import SectionLabel from './ui/SectionLabel'

const CONTACT_EMAIL = 'hr@onetechmatedsolutions.com'
const PHONES = ['+91 9908272012', '+91 9441940532']
// Replace with a real Formspree form ID to enable network submission.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyzabc123'

const inputClass =
  'w-full rounded-lg border border-white/10 px-4 py-3.5 text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent-cyan/50'
const inputStyle = { background: 'rgba(255,255,255,0.03)' } as const

export default function Contact() {
  const { t } = useTranslation()
  const inquiryOptions = t('contact.inquiry_options', {
    returnObjects: true,
  }) as string[]
  const industries = t('contact.industries', { returnObjects: true }) as string[]

  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setSending(true)

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setSent(true)
        form.reset()
        return
      }
      throw new Error('Form endpoint not configured')
    } catch {
      // Fallback to mailto so the message is never lost.
      const name = data.get('name')
      const company = data.get('company')
      const email = data.get('email')
      const inquiry = data.get('inquiry')
      const message = data.get('message')
      const subject = encodeURIComponent(`New inquiry: ${inquiry} — ${name}`)
      const body = encodeURIComponent(
        `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nInquiry Type: ${inquiry}\n\n${message}`,
      )
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
      setSent(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="relative px-6 py-[120px]">
      <div className="mx-auto max-w-[1000px]">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{t('contact.label')}</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-semibold leading-tight"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
          >
            {t('contact.heading')}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-text-secondary">
            {t('contact.subheading')}
          </motion.p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-[60px] md:grid-cols-[55%_45%]">
          {/* Left: form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass flex h-full flex-col items-center justify-center rounded-[12px] p-10 text-center"
                style={{ borderColor: 'rgba(34,197,94,0.4)' }}
              >
                <CheckCircle2 size={44} className="text-green-400" />
                <p className="mt-4 text-lg font-medium text-text-primary">
                  {t('contact.success')}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    name="name"
                    required
                    placeholder={t('contact.name')}
                    aria-label={t('contact.name')}
                    className={inputClass}
                    style={inputStyle}
                  />
                  <input
                    name="company"
                    placeholder={t('contact.company')}
                    aria-label={t('contact.company')}
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder={t('contact.email')}
                  aria-label={t('contact.email')}
                  className={inputClass}
                  style={inputStyle}
                />
                <select
                  name="inquiry"
                  required
                  aria-label={t('contact.inquiry')}
                  defaultValue=""
                  className={inputClass}
                  style={inputStyle}
                >
                  <option value="" disabled className="bg-bg-surface">
                    {t('contact.inquiry')}
                  </option>
                  {inquiryOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-bg-surface">
                      {opt}
                    </option>
                  ))}
                </select>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder={t('contact.message')}
                  aria-label={t('contact.message')}
                  className={`${inputClass} resize-y`}
                  style={inputStyle}
                />
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileTap={{ scale: 0.97 }}
                  className="w-full rounded-lg px-6 py-3.5 font-semibold text-bg-primary disabled:opacity-70"
                  style={{ background: 'linear-gradient(135deg, #00c8ff, #3b82f6)' }}
                >
                  {sending ? t('contact.sending') : t('contact.send')}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Right: info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-6"
          >
            {/* Direct contact */}
            <div className="glass rounded-[12px] p-6">
              <h4 className="text-sm font-medium uppercase tracking-wider text-text-muted">
                {t('contact.info_heading')}
              </h4>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-4 flex items-center gap-3 text-text-primary transition-colors hover:text-accent-cyan"
              >
                <Mail size={18} className="text-accent-cyan" />
                <span className="break-all">{CONTACT_EMAIL}</span>
              </a>
              {PHONES.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="mt-3 flex items-center gap-3 text-text-primary transition-colors hover:text-accent-cyan"
                >
                  <Phone size={18} className="text-accent-cyan" />
                  <span dir="ltr">{phone}</span>
                </a>
              ))}
            </div>

            {/* Schedule CTA with gradient border */}
            <div className="gradient-border rounded-[12px] p-6">
              <div className="flex items-center gap-2">
                <CalendarClock size={20} className="text-accent-cyan" />
                <h4 className="text-lg font-semibold text-text-primary">
                  {t('contact.schedule_heading')}
                </h4>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {t('contact.schedule_body')}
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                  'Consultation Request',
                )}`}
                className="mt-5 inline-block rounded-lg px-5 py-2.5 text-sm font-semibold text-bg-primary"
                style={{ background: 'linear-gradient(135deg, #00c8ff, #3b82f6)' }}
              >
                {t('contact.schedule_cta')}
              </a>
            </div>

            {/* Industries tag cloud */}
            <div>
              <h4 className="text-sm font-medium uppercase tracking-wider text-text-muted">
                {t('contact.industries_label')}
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <span
                    key={industry}
                    className="rounded-md border border-white/[0.08] px-3 py-1 text-xs text-text-secondary"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
