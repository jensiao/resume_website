import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Mail, Phone, MessageCircle, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import { WebGLShader } from '../components/ui/web-gl-shader'
import { GlassButton, GlassFilter } from '../components/ui/liquid-glass'

const stagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

function ContactCard({
  icon: Icon,
  label,
  value,
  actionLabel,
  color,
  href,
  onCopy,
}: {
  icon: typeof Mail
  label: string
  value: string
  actionLabel: string
  color: string
  href: string | null
  onCopy?: () => void
}) {
  const { t: tc } = useTranslation()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (onCopy) { onCopy(); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  }

  const Component = href ? 'a' : 'button'
  const extraProps = href
    ? { href }
    : { onClick: handleCopy, type: 'button' as const }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative w-full"
    >
      <div
        className="relative rounded-2xl p-7 flex flex-col items-center text-center backdrop-blur-md transition-all duration-500"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5"
          style={{
            background: `${color}15`,
            border: `1px solid ${color}40`,
          }}
        >
          <Icon size={22} style={{ color }} />
        </div>

        <p className="text-white/35 text-[11px] tracking-[0.3em] uppercase mb-2 font-medium">
          {label}
        </p>

        <p className="text-white/80 font-medium text-sm mb-6 break-all leading-relaxed">
          {value}
        </p>

        <Component
          {...(extraProps as any)}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium tracking-wide cursor-pointer transition-all duration-300"
          style={{
            background: `${color}18`,
            border: `1px solid ${color}30`,
            color,
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.background = `${color}30`
            ;(e.currentTarget as HTMLElement).style.borderColor = `${color}60`
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.background = `${color}18`
            ;(e.currentTarget as HTMLElement).style.borderColor = `${color}30`
          }}
        >
          <span>{onCopy && copied ? `${tc('contact.copied')} ✓` : actionLabel}</span>
          <ArrowRight size={13} />
        </Component>
      </div>
    </motion.div>
  )
}

export default function Contact() {
  const { t } = useTranslation()

  const handleCopy = async (value: string) => {
    try { await navigator.clipboard.writeText(value) }
    catch { alert(value) }
  }

  const contacts = [
    { icon: Mail, labelKey: 'contact.email', value: '15957232009@163.com', href: 'mailto:15957232009@163.com', color: '#38bdf8', actionLabel: t('contact.actionMail'), isCopy: false },
    { icon: Phone, labelKey: 'contact.phone', value: '(+86) 15957232009', href: 'tel:+8615957232009', color: '#a855f7', actionLabel: t('contact.actionCall'), isCopy: false },
    { icon: MessageCircle, labelKey: 'contact.wechat', value: 'jx00630705', href: null as string | null, color: '#10b981', actionLabel: t('contact.actionCopy'), isCopy: true },
  ]

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-black">
      {/* Background: WebGL shader behind everything */}
      <WebGLShader />

      {/* SVG filter definition for glass distortion */}
      <GlassFilter />

      {/* Navbar: fixed at top, sits above shader */}
      <Navbar />

      {/* Main content: flex-grow fills available space, centered vertically */}
      <motion.main
        variants={stagger}
        initial="initial"
        animate="animate"
        className="flex-grow flex flex-col items-center justify-center w-full px-4 py-20 relative z-10"
      >
        <div className="flex flex-col items-center gap-8 md:gap-12 max-w-5xl w-full">

          {/* ── Typography group ── */}
          <div className="flex flex-col items-center text-center gap-6">
            <motion.h1
              variants={fadeUp}
              className="font-display font-extrabold text-white tracking-tighter leading-[1.05]"
              style={{ fontSize: 'clamp(2rem, 8vw, 7rem)' }}
            >
              {t('contact.title')}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-white/60 max-w-2xl text-base md:text-lg leading-relaxed"
            >
              {t('contact.subtitle')}
            </motion.p>
          </div>

          {/* ── CTA button ── */}
          <motion.div variants={fadeUp}>
            <GlassButton href={import.meta.env.BASE_URL + 'resume.pdf'}>
              <p>{t('contact.viewResume')}</p>
            </GlassButton>
          </motion.div>

          {/* ── Contact cards ── */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4"
          >
            {contacts.map((item) => (
              <ContactCard
                key={item.labelKey}
                icon={item.icon}
                label={t(item.labelKey)}
                value={item.value}
                actionLabel={item.actionLabel}
                color={item.color}
                href={item.href}
                onCopy={item.isCopy ? () => handleCopy(item.value) : undefined}
              />
            ))}
          </motion.div>

        </div>
      </motion.main>

      {/* Footer: sits at bottom of flex column */}
      <footer className="w-full text-center py-6 text-white/10 text-xs tracking-wider relative z-10">
        &copy; 2024 JinXiao. All rights reserved.
      </footer>
    </div>
  )
}
