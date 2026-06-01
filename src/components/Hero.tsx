import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { EASE_OUT_EXPO, wordReveal } from '../lib/animations'

const TRUST_NAMES = [
  'Stolle Machinery',
  'Q3Power',
  'Evaporation King',
  'Agritecture',
  'BiPOM',
]

const scrollToId = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Hero() {
  const { t } = useTranslation()
  const line1Words = t('hero.headline1').split(' ')
  const line2Words = t('hero.headline2').split(' ')

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Background layers */}
      <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0,200,255,0.12), transparent)',
        }}
      />
      {/* Floating blobs */}
      <div
        className="animate-float pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full opacity-[0.12] blur-3xl"
        aria-hidden
        style={{ background: '#00c8ff' }}
      />
      <div
        className="animate-float pointer-events-none absolute -right-16 bottom-1/4 h-80 w-80 rounded-full opacity-[0.1] blur-3xl"
        aria-hidden
        style={{ background: '#3b82f6', animationDelay: '-4s' }}
      />

      <div className="relative z-10 mx-auto flex max-w-[900px] flex-col items-center text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="mb-6 font-medium uppercase text-accent-cyan"
          style={{ fontSize: '0.75rem', letterSpacing: '0.15em' }}
        >
          {t('hero.eyebrow')}
        </motion.p>

        {/* Headline */}
        <h1
          className="font-bold leading-[1.05] tracking-[-0.03em]"
          style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
        >
          <motion.span
            className="block text-text-primary"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08, delayChildren: 0.15 }}
          >
            {line1Words.map((word, i) => (
              <motion.span
                key={i}
                variants={wordReveal}
                className="inline-block whitespace-pre"
              >
                {word}{' '}
              </motion.span>
            ))}
          </motion.span>
          <motion.span
            className="gradient-text block"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08, delayChildren: 0.35 }}
          >
            {line2Words.map((word, i) => (
              <motion.span
                key={i}
                variants={wordReveal}
                className="inline-block whitespace-pre"
              >
                {word}{' '}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: EASE_OUT_EXPO }}
          className="mt-8 max-w-[620px] text-text-secondary"
          style={{ fontSize: '1.15rem', lineHeight: 1.7 }}
        >
          {t('hero.subheading')}
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: EASE_OUT_EXPO }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <motion.button
            type="button"
            onClick={() => scrollToId('contact')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-lg px-7 py-3.5 font-semibold text-bg-primary"
            style={{ background: 'linear-gradient(135deg, #00c8ff, #3b82f6)' }}
          >
            {t('hero.cta_primary')}
          </motion.button>
          <motion.button
            type="button"
            onClick={() => scrollToId('work')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-lg border px-7 py-3.5 font-medium text-accent-cyan"
            style={{ borderColor: 'rgba(0,200,255,0.4)' }}
          >
            {t('hero.cta_secondary')}
          </motion.button>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 w-full max-w-[760px] border-t border-white/[0.07] pt-8"
        >
          <p
            className="mb-5 font-medium uppercase text-text-muted"
            style={{ fontSize: '0.7rem', letterSpacing: '0.2em' }}
          >
            {t('hero.trusted_by')}
          </p>
          <div className="marquee-mask relative overflow-hidden">
            <div className="marquee-track flex w-max gap-12">
              {[...TRUST_NAMES, ...TRUST_NAMES].map((name, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap text-base font-medium text-text-secondary opacity-50 transition-opacity"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => scrollToId('about')}
        aria-label="Scroll to content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted"
      >
        <ChevronDown size={26} className="animate-bounceChevron" />
      </motion.button>
    </section>
  )
}
