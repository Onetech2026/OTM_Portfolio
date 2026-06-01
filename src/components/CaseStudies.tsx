import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { fadeUp, stagger, staggerSlow, viewportOnce } from '../lib/animations'
import SectionLabel from './ui/SectionLabel'

interface Project {
  client: string
  title: string
  desc: string
  tags: string[]
  metrics: string[]
  stack: string[]
  url: string
}

// Top accent bar gradients, in card order.
const ACCENT_BARS = [
  'linear-gradient(90deg, #22c55e, #14b8a6)',
  'linear-gradient(90deg, #00c8ff, #3b82f6)',
  'linear-gradient(90deg, #f97316, #facc15)',
]

function ProjectCard({
  project,
  accent,
  viewLabel,
  clientLabel,
}: {
  project: Project
  accent: string
  viewLabel: string
  clientLabel: string
}) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -8, borderColor: 'rgba(0,200,255,0.3)' }}
      transition={{ duration: 0.3 }}
      className="flex flex-col overflow-hidden rounded-[12px] border border-white/[0.08]"
      style={{ background: 'rgba(255,255,255,0.025)' }}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: accent }} />

      <div className="flex flex-1 flex-col p-6">
        {/* Tag badges */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2.5 py-0.5 text-[0.7rem] font-medium text-accent-cyan"
              style={{ background: 'rgba(0,200,255,0.1)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Client */}
        <p className="mt-5 text-xs uppercase tracking-wider text-text-muted">
          {clientLabel}:{' '}
          <span className="text-text-secondary">{project.client}</span>
        </p>

        {/* Title */}
        <h3 className="mt-1.5 text-xl font-semibold text-text-primary">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          {project.desc}
        </p>

        {/* Metrics */}
        <ul className="mt-5 space-y-2">
          {project.metrics.map((metric) => (
            <li
              key={metric}
              className="flex items-start gap-2 text-sm text-text-secondary"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan" />
              {metric}
            </li>
          ))}
        </ul>

        {/* Tech stack chips */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/[0.08] px-2 py-0.5 text-[0.7rem] text-text-muted"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Link */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent-cyan transition-opacity hover:opacity-80"
        >
          {viewLabel}
          <ArrowUpRight size={16} />
        </a>
      </div>
    </motion.article>
  )
}

export default function CaseStudies() {
  const { t } = useTranslation()
  const projects = t('work.projects', { returnObjects: true }) as Project[]

  return (
    <section id="work" className="relative px-6 py-[120px]">
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
            <SectionLabel>{t('work.label')}</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-semibold leading-tight"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
          >
            {t('work.heading')}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-text-secondary">
            {t('work.subheading')}
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              accent={ACCENT_BARS[i] ?? ACCENT_BARS[1]}
              viewLabel={t('work.view_poc')}
              clientLabel={t('work.client_label')}
            />
          ))}
        </motion.div>

        {/* Footer note */}
        <p className="mx-auto mt-10 max-w-2xl text-center text-xs italic text-text-muted">
          {t('work.poc_note')}
        </p>
      </div>
    </section>
  )
}
