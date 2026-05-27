import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const links = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'projects', path: '/projects' },
  { key: 'contact', path: '/contact' },
] as const

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const isZh = i18n.language === 'zh'
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const goHome = () => {
    setOpen(false)
    if (location.pathname === '/') {
      document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname === path || location.pathname.startsWith(path + '/')
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
      <div className="flex items-center justify-between px-6 sm:px-10 md:px-12 py-5 md:py-6">
        {/* Logo */}
        <button
          onClick={goHome}
          className="font-display font-bold text-2xl sm:text-3xl tracking-tight cursor-pointer select-none shrink-0"
        >
          <span className="text-[#D7E2EA]">J</span>
          <span className="text-[#B600A8]">i</span>
          <span className="text-[#D7E2EA]">nX</span>
          <span className="text-[#B600A8]">i</span>
          <span className="text-[#D7E2EA]">ao</span>
          <span className="text-[#E84040]">.</span>
        </button>

        {/* Desktop nav — centered */}
        <div className="hidden md:flex items-center gap-10 lg:gap-12 absolute left-1/2 -translate-x-1/2">
          {links.map(({ key, path }) => (
            <Link
              key={key}
              to={path}
              onClick={() => setOpen(false)}
              className={`font-medium uppercase tracking-wider text-base transition-colors duration-200 cursor-pointer ${
                isActive(path) ? 'text-[#D7E2EA]' : 'text-[#D7E2EA]/70 hover:text-[#D7E2EA]'
              }`}
            >
              {t(`nav.${key}`)}
            </Link>
          ))}
        </div>

        {/* Right side widgets */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => i18n.changeLanguage(isZh ? 'en' : 'zh')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-[#D7E2EA]/20 text-xs font-semibold tracking-wider hover:border-[#D7E2EA]/40 transition-colors cursor-pointer"
          >
            <span className={isZh ? 'text-[#B600A8]' : 'text-[#D7E2EA]/50'}>中</span>
            <span className="text-[#D7E2EA]/20">/</span>
            <span className={!isZh ? 'text-[#B600A8]' : 'text-[#D7E2EA]/50'}>EN</span>
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-[#D7E2EA]/20 cursor-pointer ml-1"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-[#D7E2EA]/6"
          >
            <div className="flex flex-col gap-0 px-5 pb-5 pt-3">
              {links.map(({ key, path }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={path}
                    onClick={() => setOpen(false)}
                    className={`block font-medium uppercase tracking-wider text-lg py-3 text-left cursor-pointer transition-colors ${
                      isActive(path) ? 'text-[#D7E2EA]' : 'text-[#D7E2EA]/70 hover:text-[#D7E2EA]'
                    }`}
                  >
                    {t(`nav.${key}`)}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
