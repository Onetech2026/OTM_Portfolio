import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  Code2,
  BrainCircuit,
  LayoutDashboard,
  Smartphone,
  Database,
  CloudCog,
  Cpu,
  Cable,
  Network,
  Workflow,
  GaugeCircle,
  BarChart3,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { fadeUp, stagger, staggerFast, viewportOnce } from '../lib/animations'
import SectionLabel from './ui/SectionLabel'

interface ServiceItem {
  title: string
  desc: string
}

const IT_ICONS: LucideIcon[] = [
  Code2,
  BrainCircuit,
  LayoutDashboard,
  Smartphone,
  Database,
  CloudCog,
]
const OT_ICONS: LucideIcon[] = [
  Cpu,
  Cable,
  Network,
  Workflow,
  GaugeCircle,
  BarChart3,
]

function ServiceCard({
  Icon,
  title,
  desc,
}: {
  Icon: LucideIcon
  title: string
  desc: string
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        borderColor: 'rgba(0,200,255,0.2)',
        backgroundColor: 'rgba(0,200,255,0.03)',
      }}
      transition={{ duration: 0.2 }}
      className="rounded-[10px] border border-white/[0.07] p-5"
      style={{ background: 'rgba(255,255,255,0.02)' }}
    >
      <Icon size={24} className="text-accent-cyan" />
      <h4 className="mt-4 text-base font-semibold text-text-primary">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{desc}</p>
    </motion.div>
  )
}

function ServiceColumn({
  badge,
  badgeStyle,
  heading,
  items,
  icons,
}: {
  badge: string
  badgeStyle: React.CSSProperties
  heading: string
  items: ServiceItem[]
  icons: LucideIcon[]
}) {
  return (
    <motion.div
      variants={staggerFast}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.span
        variants={fadeUp}
        className="inline-block rounded-md px-3 py-1 text-xs font-semibold uppercase tracking-wider"
        style={badgeStyle}
      >
        {badge}
      </motion.span>
      <motion.h3
        variants={fadeUp}
        className="mt-4 text-2xl font-semibold text-text-primary"
      >
        {heading}
      </motion.h3>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {items.map((item, i) => (
          <ServiceCard
            key={item.title}
            Icon={icons[i] ?? Code2}
            title={item.title}
            desc={item.desc}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function Services() {
  const { t } = useTranslation()
  const itServices = t('services.it_services', { returnObjects: true }) as ServiceItem[]
  const otServices = t('services.ot_services', { returnObjects: true }) as ServiceItem[]

  return (
    <section id="services" className="relative px-6 py-[120px]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{t('services.label')}</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-semibold leading-tight"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
          >
            {t('services.heading')}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-text-secondary">
            {t('services.subheading')}
          </motion.p>
        </motion.div>

        {/* Two columns */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-10">
          <ServiceColumn
            badge={t('services.it_badge')}
            badgeStyle={{
              background: 'rgba(0,200,255,0.1)',
              color: '#00c8ff',
              border: '1px solid rgba(0,200,255,0.25)',
            }}
            heading={t('services.it_heading')}
            items={itServices}
            icons={IT_ICONS}
          />
          <ServiceColumn
            badge={t('services.ot_badge')}
            badgeStyle={{
              background: 'rgba(59,130,246,0.15)',
              color: '#3b82f6',
              border: '1px solid rgba(59,130,246,0.3)',
            }}
            heading={t('services.ot_heading')}
            items={otServices}
            icons={OT_ICONS}
          />
        </div>

        {/* Footer quote */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="glass mx-auto mt-16 max-w-3xl rounded-[10px] p-7 ps-8"
          style={{ borderInlineStart: '3px solid rgba(0,200,255,0.5)' }}
        >
          <p className="text-lg italic text-text-primary" style={{ lineHeight: 1.6 }}>
            {t('services.quote')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
