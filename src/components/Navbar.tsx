import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../context/ThemeContext'

const links = ['about', 'projects'] as const

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const isZh = i18n.language === 'zh'

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0C0C0C]/85 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.04)]' : ''
      }`}
    >
      <div className="flex items-center justify-between px-5 sm:px-8 md:px-10 py-4 md:py-5">
        {/* Logo */}
        <button onClick={() => go('hero')} className="font-display font-bold text-xl sm:text-2xl tracking-tight cursor-pointer select-none shrink-0">
          <span className="text-[#D7E2EA]">J</span>
          <span className="text-[#B600A8]">i</span>
          <span className="text-[#D7E2EA]">nX</span>
          <span className="text-[#B600A8]">i</span>
          <span className="text-[#D7E2EA]">ao</span>
          <span className="text-[#E84040]">.</span>
        </button>

        {/* Desktop nav links — centered */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10 absolute left-1/2 -translate-x-1/2">
          {links.map(k => (
            <button
              key={k}
              onClick={() => go(k)}
              className="text-[#D7E2EA]/70 hover:text-[#D7E2EA] font-medium uppercase tracking-wider text-sm transition-colors duration-200 cursor-pointer"
            >
              {t(`nav.${k}`)}
            </button>
          ))}
        </div>

        {/* Right side widgets */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language toggle */}
          <button
            onClick={() => i18n.changeLanguage(isZh ? 'en' : 'zh')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-[#D7E2EA]/20 text-xs font-semibold tracking-wider hover:border-[#D7E2EA]/40 transition-colors cursor-pointer"
          >
            <span className={isZh ? 'text-[#B600A8]' : 'text-[#D7E2EA]/50'}>中</span>
            <span className="text-[#D7E2EA]/20">/</span>
            <span className={!isZh ? 'text-[#B600A8]' : 'text-[#D7E2EA]/50'}>EN</span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-[#D7E2EA]/20 hover:border-[#D7E2EA]/40 transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Moon size={15} /> : <Sun size={15} />}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-[#D7E2EA]/20 cursor-pointer ml-1"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-[#D7E2EA]/6"
          >
            <div className="flex flex-col gap-0 px-5 pb-5 pt-3">
              {links.map((k, i) => (
                <motion.button
                  key={k}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => go(k)}
                  className="text-[#D7E2EA]/70 hover:text-[#D7E2EA] font-medium uppercase tracking-wider text-base py-3 text-left cursor-pointer transition-colors"
                >
                  {t(`nav.${k}`)}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
