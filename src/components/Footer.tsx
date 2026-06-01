import { useTranslation } from 'react-i18next'
import Logo from './ui/Logo'

const CONTACT_EMAIL = 'hr@onetechmatedsolutions.com'

// Maps company links to in-page anchors (Schedule a Call → contact).
const COMPANY_TARGETS = ['about', 'work', 'contact', 'contact']

const scrollToId = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Footer() {
  const { t } = useTranslation()
  const servicesLinks = t('footer.services_links', {
    returnObjects: true,
  }) as string[]
  const companyLinks = t('footer.company_links', {
    returnObjects: true,
  }) as string[]

  return (
    <footer className="px-6 pb-10 pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-secondary">
              {t('footer.tagline')}
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-block text-sm text-text-secondary transition-colors hover:text-accent-cyan"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary">
              {t('footer.services_heading')}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {servicesLinks.map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    onClick={() => scrollToId('services')}
                    className="text-start text-sm text-text-secondary transition-colors hover:text-accent-cyan"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary">
              {t('footer.company_heading')}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link, i) => (
                <li key={link}>
                  <button
                    type="button"
                    onClick={() => scrollToId(COMPANY_TARGETS[i] ?? 'contact')}
                    className="text-start text-sm text-text-secondary transition-colors hover:text-accent-cyan"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-white/[0.07] pt-6 text-center">
          <p className="text-sm text-text-muted">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
