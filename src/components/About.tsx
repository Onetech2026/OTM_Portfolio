import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '../lib/animations'
import SectionLabel from './ui/SectionLabel'
import GlassCard from './ui/GlassCard'
import Counter from './ui/Counter'

interface Stat {
  value: string
  label: string
  sub?: string
}

export default function About() {
  const { t } = useTranslation()
  const pills = t('about.pills', { returnObjects: true }) as string[]

  const stats: Stat[] = [
    {
      value: t('about.stats.years'),
      label: t('about.stats.years_label'),
    },
    {
      value: t('about.stats.clients'),
      label: t('about.stats.clients_label'),
      sub: t('about.stats.clients_names'),
    },
    {
      value: t('about.stats.domains'),
      label: t('about.stats.domains_label'),
    },
    {
      value: t('about.stats.products'),
      label: t('about.stats.products_label'),
    },
  ]

  return (
    <section id="about" className="relative px-6 py-[120px]">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-12 md:grid-cols-[60%_40%]"
      >
        {/* Left: text */}
        <div>
          <motion.div variants={fadeUp}>
            <SectionLabel>{t('about.label')}</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-semibold leading-tight"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
          >
            {t('about.heading')}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-text-secondary"
            style={{ fontSize: '1rem', lineHeight: 1.7 }}
          >
            {t('about.p1')}
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-text-secondary"
            style={{ fontSize: '1rem', lineHeight: 1.7 }}
          >
            {t('about.p2')}
          </motion.p>

          {/* Differentiator pills */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-2.5">
            {pills.map((pill) => (
              <span
                key={pill}
                className="rounded-md px-3.5 py-1.5 text-accent-cyan"
                style={{
                  fontSize: '0.8rem',
                  background: 'rgba(0,200,255,0.08)',
                  border: '1px solid rgba(0,200,255,0.2)',
                }}
              >
                {pill}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right: stat cards 2x2 */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <GlassCard key={stat.label} interactive className="p-5">
              <Counter
                value={stat.value}
                className="block text-[2rem] font-bold leading-none text-accent-cyan"
              />
              <p className="mt-3 text-sm font-medium text-text-primary">
                {stat.label}
              </p>
              {stat.sub && (
                <p className="mt-0.5 text-xs text-text-muted">{stat.sub}</p>
              )}
            </GlassCard>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
