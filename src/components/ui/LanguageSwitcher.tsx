import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import { LANGUAGES } from '../../i18n'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current =
    LANGUAGES.find((l) => l.code === i18n.language) ??
    LANGUAGES.find((l) => l.code === (i18n.resolvedLanguage ?? 'en')) ??
    LANGUAGES[0]

  const selectLanguage = (code: string, dir: string) => {
    i18n.changeLanguage(code)
    document.documentElement.lang = code
    document.documentElement.dir = dir
    localStorage.setItem('otm-lang', code)
    setOpen(false)
  }

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        className="flex items-center gap-2 rounded-md border border-white/10 px-2.5 py-1.5 text-sm text-text-secondary transition-colors hover:border-accent-cyan/40 hover:text-text-primary"
      >
        <Globe size={18} className="text-accent-cyan" />
        <span className="font-medium tracking-wide">
          {current.code.toUpperCase()}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            role="listbox"
            className="absolute end-0 z-50 mt-2 grid grid-cols-2 gap-1 rounded-[10px] border border-white/10 p-2"
            style={{
              background: '#0d1526',
              minWidth: '200px',
              boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
            }}
          >
            {LANGUAGES.map((lang) => {
              const active = lang.code === current.code
              return (
                <button
                  key={lang.code}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => selectLanguage(lang.code, lang.dir)}
                  className={`flex items-center justify-between gap-2 rounded-md px-3 py-2 text-start text-sm transition-colors ${
                    active
                      ? 'border-s-2 border-accent-cyan text-text-primary'
                      : 'border-s-2 border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                  style={
                    active
                      ? { background: 'rgba(0,200,255,0.06)' }
                      : undefined
                  }
                >
                  <span>{lang.native}</span>
                  <span
                    className={`text-[0.65rem] font-medium tracking-wider ${
                      active ? 'text-accent-cyan' : 'text-text-muted'
                    }`}
                  >
                    {lang.code.toUpperCase()}
                  </span>
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
