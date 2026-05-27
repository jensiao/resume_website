import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Mail, Phone, MessageCircle, ArrowRight, Diamond } from 'lucide-react'
import { useState } from 'react'
import Navbar from '../components/Navbar'

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

// ─── Neon Cyberpunk Orb ───
function CyberOrb() {
  return (
    <div className="relative w-full max-w-[520px] mx-auto aspect-square flex items-center justify-center">
      {/* Outer ambient glow halos */}
      <div className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(168,85,247,0.10) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div className="absolute inset-[-10%] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.10) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Dot grid background behind orb */}
      <div className="absolute inset-0 rounded-full overflow-hidden opacity-[0.10]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(168,85,247,0.6) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          mask: 'radial-gradient(circle, black 25%, transparent 70%)',
          WebkitMask: 'radial-gradient(circle, black 25%, transparent 70%)',
        }}
      />

      {/* Main planet sphere with strong rim light */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-[62%] aspect-square rounded-full"
        style={{
          background: `
            radial-gradient(circle at 35% 35%, #1e1b4b 0%, #0c0a1f 55%, #020617 100%)
          `,
          boxShadow: `
            0 0 0 1px rgba(168,85,247,0.25),
            -22px 0 60px rgba(56,189,248,0.55),
            22px 0 60px rgba(236,72,153,0.45),
            0 -10px 50px rgba(168,85,247,0.35),
            0 30px 90px rgba(236,72,153,0.30),
            0 0 140px rgba(168,85,247,0.20),
            inset 18px 0 30px rgba(56,189,248,0.18),
            inset -18px 0 30px rgba(236,72,153,0.15),
            inset 0 0 80px rgba(2,6,23,0.9)
          `,
        }}
      >
        {/* Surface gradients */}
        <div className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            background: `
              radial-gradient(circle at 25% 25%, rgba(56,189,248,0.30) 0%, transparent 40%),
              radial-gradient(circle at 75% 70%, rgba(236,72,153,0.25) 0%, transparent 45%),
              radial-gradient(circle at 50% 50%, transparent 35%, rgba(2,6,23,0.7) 100%)
            `,
          }}
        />
        {/* Subtle latitude streak */}
        <div className="absolute top-[40%] left-[10%] right-[10%] h-[1px] opacity-30 rounded-full overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.7), transparent)',
            transform: 'rotate(-12deg)',
          }}
        />
        {/* Highlight streak */}
        <div className="absolute top-[20%] left-[18%] right-[35%] h-[2px] opacity-40 blur-[1px]"
          style={{
            background: 'linear-gradient(90deg, rgba(56,189,248,0.9), transparent)',
            transform: 'rotate(-18deg)',
          }}
        />
      </motion.div>

      {/* Tilted neon orbit ring with traveling node — the signature cyberpunk ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[2%] pointer-events-none"
        style={{ transform: 'rotateX(72deg) rotateZ(-18deg)' }}
      >
        <div className="absolute inset-0 rounded-full"
          style={{
            border: '1.5px solid transparent',
            background: 'linear-gradient(90deg, #38bdf8, #a855f7 50%, #ec4899) border-box',
            WebkitMask: 'linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'destination-out',
            maskComposite: 'exclude',
            boxShadow: `
              0 0 20px rgba(168,85,247,0.6),
              0 0 40px rgba(56,189,248,0.4),
              0 0 60px rgba(236,72,153,0.3)
            `,
          }}
        />
        {/* Traveling node on ring */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-3 h-3 rounded-full"
          style={{
            background: '#38bdf8',
            boxShadow: '0 0 12px #38bdf8, 0 0 24px #38bdf8, 0 0 36px rgba(56,189,248,0.6)',
          }}
        />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 rounded-full"
          style={{
            background: '#ec4899',
            boxShadow: '0 0 10px #ec4899, 0 0 20px #ec4899',
          }}
        />
      </motion.div>

      {/* Secondary thin orbit, reversed */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[8%] pointer-events-none"
        style={{ transform: 'rotateX(55deg) rotateZ(15deg)' }}
      >
        <div className="absolute inset-0 rounded-full"
          style={{
            border: '1px solid rgba(56,189,248,0.18)',
            boxShadow: '0 0 14px rgba(56,189,248,0.18)',
          }}
        />
      </motion.div>

      {/* Floating particles / stars */}
      {[
        { x: '15%', y: '8%', s: 3, c: '#38bdf8', d: 0 },
        { x: '82%', y: '18%', s: 2.5, c: '#ec4899', d: 1.5 },
        { x: '10%', y: '78%', s: 3, c: '#a855f7', d: 0.8 },
        { x: '78%', y: '82%', s: 2, c: '#38bdf8', d: 2.2 },
        { x: '50%', y: '3%', s: 2, c: '#fff', d: 1.1 },
        { x: '92%', y: '48%', s: 2.5, c: '#ec4899', d: 0.4 },
        { x: '5%', y: '40%', s: 1.5, c: '#fff', d: 1.8 },
        { x: '95%', y: '88%', s: 1.5, c: '#a855f7', d: 2.5 },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.x, top: p.y,
            width: p.s, height: p.s,
            background: p.c,
            boxShadow: `0 0 ${p.s * 4}px ${p.c}, 0 0 ${p.s * 8}px ${p.c}`,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 3.5, delay: p.d, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ─── Section Divider ───
function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-6">
      <div className="flex items-center gap-2">
        <Diamond size={6} fill="#38bdf8" className="text-[#38bdf8] drop-shadow-[0_0_6px_#38bdf8]" />
        <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#38bdf8]/30" />
      </div>
      <span className="text-[#D7E2EA]/50 text-xs tracking-[0.3em] uppercase font-medium shrink-0">
        联系我的方式
      </span>
      <div className="flex items-center gap-2">
        <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#ec4899]/30" />
        <Diamond size={6} fill="#ec4899" className="text-[#ec4899] drop-shadow-[0_0_6px_#ec4899]" />
      </div>
    </div>
  )
}

// ─── Contact Card ───
function ContactCard({
  icon: Icon,
  label,
  value,
  actionLabel,
  color,
  href,
  onCopy,
  isCopy,
}: {
  icon: typeof Mail
  label: string
  value: string
  actionLabel: string
  color: string
  href: string | null
  onCopy?: () => void
  isCopy?: boolean
}) {
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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative"
    >
      {/* Outer glow halo on hover */}
      <div
        className="absolute -inset-1 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${color}40, transparent 70%)` }}
      />

      <div
        className="relative rounded-3xl p-8 sm:p-9 h-full flex flex-col items-center text-center overflow-hidden"
        style={{
          background: `linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)`,
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: `1px solid ${color}22`,
          boxShadow: `0 0 30px ${color}10, inset 0 0 40px ${color}05`,
          transition: 'all 0.4s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${color}66`
          e.currentTarget.style.boxShadow = `0 0 50px ${color}25, 0 0 100px ${color}12, inset 0 0 60px ${color}08`
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = `${color}22`
          e.currentTarget.style.boxShadow = `0 0 30px ${color}10, inset 0 0 40px ${color}05`
        }}
      >
        {/* Top color glow spot */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-3xl opacity-50 pointer-events-none"
          style={{ background: color }}
        />

        {/* Icon — neon glowing ring */}
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 relative"
          style={{
            background: 'rgba(2,6,23,0.6)',
            border: `1.5px solid ${color}`,
            boxShadow: `0 0 18px ${color}80, 0 0 36px ${color}50, inset 0 0 14px ${color}30`,
          }}
        >
          <Icon size={26} style={{ color, filter: `drop-shadow(0 0 6px ${color})` }} />
        </div>

        {/* Label */}
        <p className="text-[#D7E2EA]/45 text-[11px] tracking-[0.35em] uppercase mb-3 font-medium">
          {label}
        </p>

        {/* Value */}
        <p className="text-white font-semibold text-lg mb-8 break-all leading-relaxed">
          {value}
        </p>

        {/* Action — full-width pill button */}
        <Component
          {...(extraProps as any)}
          className="mt-auto w-full inline-flex items-center justify-between gap-3 rounded-full px-5 py-3 text-sm font-medium tracking-wide cursor-pointer transition-all duration-300 group/btn"
          style={{
            background: 'rgba(2,6,23,0.55)',
            border: `1px solid ${color}44`,
            color,
            boxShadow: `inset 0 0 16px ${color}10`,
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.background = `linear-gradient(90deg, ${color}22, ${color}10)`
            ;(e.currentTarget as HTMLElement).style.borderColor = color
            ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 18px ${color}50, inset 0 0 20px ${color}25`
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.background = 'rgba(2,6,23,0.55)'
            ;(e.currentTarget as HTMLElement).style.borderColor = `${color}44`
            ;(e.currentTarget as HTMLElement).style.boxShadow = `inset 0 0 16px ${color}10`
          }}
        >
          <span>{isCopy && copied ? '已复制 ✓' : actionLabel}</span>
          <span
            className="flex items-center justify-center w-7 h-7 rounded-full transition-transform duration-300 group-hover/btn:translate-x-0.5"
            style={{
              background: color,
              boxShadow: `0 0 12px ${color}, 0 0 22px ${color}80`,
            }}
          >
            <ArrowRight size={13} className="text-[#020617]" strokeWidth={2.5} />
          </span>
        </Component>
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════
export default function Contact() {
  const { t } = useTranslation()

  const handleCopy = async (value: string) => {
    try { await navigator.clipboard.writeText(value) }
    catch { alert(value) }
  }

  const contacts = [
    { icon: Mail, labelKey: 'contact.email', value: '15957232009@163.com', href: 'mailto:15957232009@163.com', color: '#38bdf8', actionLabel: '发送邮件给我', isCopy: false },
    { icon: Phone, labelKey: 'contact.phone', value: '(+86) 15957232009', href: 'tel:+8615957232009', color: '#a855f7', actionLabel: '拨打电话与我联系', isCopy: false },
    { icon: MessageCircle, labelKey: 'contact.wechat', value: 'jx00630705', href: null as string | null, color: '#10b981', actionLabel: '添加微信，快速沟通', isCopy: true },
  ]

  return (
    <div className="w-full min-h-screen flex flex-col relative overflow-hidden">
      <Navbar />

      {/* ─── Background ambient glows ─── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#020617' }} />

        {/* Top-left cyan glow */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-0 w-[55vw] h-[55vh] rounded-full blur-[140px]"
          style={{ background: '#38bdf8', transform: 'translate(-20%, -20%)' }}
        />

        {/* Top-right purple glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.14, 0.22, 0.14] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-0 right-0 w-[50vw] h-[50vh] rounded-full blur-[130px]"
          style={{ background: '#a855f7', transform: 'translate(15%, -15%)' }}
        />

        {/* Mid-right magenta accent — fills the orb side empty space */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.10, 0.20, 0.10] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          className="absolute top-[35%] right-0 w-[40vw] h-[45vh] rounded-full blur-[120px]"
          style={{ background: '#ec4899', transform: 'translate(20%, 0)' }}
        />

        {/* Bottom-left blue glow */}
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="absolute bottom-0 left-0 w-[60vw] h-[55vh] rounded-full blur-[140px]"
          style={{ background: '#38bdf8', transform: 'translate(-25%, 25%)' }}
        />

        {/* Bottom-right pink glow */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.16, 0.26, 0.16] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
          className="absolute bottom-0 right-0 w-[55vw] h-[55vh] rounded-full blur-[140px]"
          style={{ background: '#ec4899', transform: 'translate(25%, 25%)' }}
        />

        {/* Vibrant bottom edge aurora — the signature glow strip */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[28vh]"
          style={{
            background: `
              linear-gradient(180deg,
                transparent 0%,
                rgba(56,189,248,0.06) 30%,
                rgba(168,85,247,0.18) 60%,
                rgba(236,72,153,0.30) 85%,
                rgba(251,146,60,0.20) 100%
              )
            `,
            filter: 'blur(20px)',
          }}
        />
        {/* Sharp aurora hairline at very bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[6vh]"
          style={{
            background: `
              linear-gradient(90deg,
                rgba(56,189,248,0.0) 0%,
                rgba(56,189,248,0.35) 18%,
                rgba(168,85,247,0.55) 45%,
                rgba(236,72,153,0.55) 70%,
                rgba(251,146,60,0.35) 90%,
                rgba(251,146,60,0.0) 100%
              )
            `,
            filter: 'blur(40px)',
          }}
        />

        {/* Subtle dot grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Vignette to keep contrast */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(2,6,23,0.55) 100%)',
          }}
        />
      </div>

      {/* ─── Main Content ─── */}
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="w-full flex-1 flex flex-col relative z-10"
        style={{ paddingTop: '5.5rem' }}
      >
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col px-6 sm:px-10 md:px-12 lg:px-16">

          {/* ═══════════════════════════════════════
              HERO — left text + right orb
              ═══════════════════════════════════════ */}
          <section className="mb-12 flex-1 flex items-center pt-4">
            <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center w-full">

              {/* ── LEFT: Text ── */}
              <div>
                <motion.p
                  variants={fadeUp}
                  className="text-[#ec4899]/80 font-semibold tracking-[0.35em] text-xs mb-5 uppercase"
                >
                  Let's Connect
                </motion.p>

                <motion.h1
                  variants={fadeUp}
                  className="font-display font-black mb-6"
                  style={{
                    fontSize: 'clamp(2.8rem, 6.5vw, 5rem)',
                    lineHeight: 1.08,
                    letterSpacing: '-0.02em',
                  }}
                >
                  <span
                    className="bg-gradient-to-r from-[#38bdf8] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent"
                    style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >
                    {t('contact.title')}
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="text-[#94a3b8] text-base sm:text-lg max-w-lg leading-relaxed mb-10"
                >
                  如果您对我的背景感兴趣，或有合作机会、项目咨询，欢迎随时联系我。我会在 24 小时内回复您。
                </motion.p>

                <motion.div variants={fadeUp}>
                  <motion.a
                    href="mailto:15957232009@163.com"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-3 rounded-full px-10 py-4 text-base font-semibold tracking-wider text-white cursor-pointer select-none transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #38bdf8 0%, #a855f7 50%, #ec4899 100%)',
                      boxShadow: '0px 0px 50px rgba(56,189,248,0.3), 0px 0px 80px rgba(168,85,247,0.2), 0px 8px 32px rgba(0,0,0,0.5)',
                    }}
                  >
                    立即联系我
                    <ArrowRight size={18} />
                  </motion.a>
                </motion.div>
              </div>

              {/* ── RIGHT: Cyber Orb ── */}
              <motion.div variants={fadeUp} className="hidden lg:flex justify-center">
                <CyberOrb />
              </motion.div>
            </div>
          </section>

          {/* ═══════════════════════════════════════
              SECTION DIVIDER
              ═══════════════════════════════════════ */}
          <motion.div variants={fadeUp}>
            <SectionDivider />
          </motion.div>

          {/* ═══════════════════════════════════════
              CONTACT CARDS
              ═══════════════════════════════════════ */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pb-8"
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
                isCopy={item.isCopy}
                onCopy={item.isCopy ? () => handleCopy(item.value) : undefined}
              />
            ))}
          </motion.div>

        </div>

        {/* ── Footer ── */}
        <motion.footer
          variants={fadeUp}
          className="w-full text-center pb-6"
        >
          <p className="text-[#D7E2EA]/12 text-xs tracking-wider">
            &copy; 2024 JinXiao. All rights reserved.
          </p>
        </motion.footer>
      </motion.div>
    </div>
  )
}
