import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { FileText, Mail } from 'lucide-react'

const stagger = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const riseUp = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-x-clip">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/首页背景.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-[#0C0C0C]/55" />

      {/* Content */}
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="relative z-10 flex flex-col items-center px-5 sm:px-8 md:px-10 py-32 md:py-40"
      >
        {/* Greeting */}
        <motion.p
          variants={riseUp}
          className="font-light tracking-[0.3em] opacity-45 mb-8 sm:mb-10 text-center"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', color: '#D7E2EA' }}
        >
          {t('hero.greeting')}
        </motion.p>

        {/* Name — gradient hero-heading */}
        <motion.h1
          variants={riseUp}
          className="hero-heading font-display font-black tracking-[0.02em] leading-[1.05] select-none text-center mb-12 sm:mb-16"
          style={{
            fontSize: 'clamp(5rem, 16vw, 12rem)',
            textShadow: '0 0 120px rgba(187, 204, 215, 0.15)',
          }}
        >
          {t('hero.name')}
        </motion.h1>

        {/* Role badges — wider */}
        <motion.div variants={riseUp} className="flex items-center gap-4 sm:gap-5 mb-12 sm:mb-14">
          <span
            className="px-7 py-2.5 rounded-full text-sm sm:text-base font-medium tracking-wide"
            style={{
              background: 'rgba(79, 140, 247, 0.1)',
              border: '1px solid rgba(79, 140, 247, 0.22)',
              color: '#D7E2EA',
            }}
          >
            商业分析
          </span>
          <span className="text-[#D7E2EA]/20 text-lg select-none">·</span>
          <span
            className="px-7 py-2.5 rounded-full text-sm sm:text-base font-medium tracking-wide"
            style={{
              background: 'rgba(79, 140, 247, 0.08)',
              border: '1px solid rgba(79, 140, 247, 0.18)',
              color: '#D7E2EA',
            }}
          >
            数据分析
          </span>
        </motion.div>

        {/* CTAs — wider */}
        <motion.div variants={riseUp} className="flex flex-col sm:flex-row items-center gap-4 mb-14 sm:mb-16">
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2.5 rounded-full px-10 py-3.5 sm:px-12 sm:py-4 text-sm sm:text-base font-semibold tracking-wider text-white cursor-pointer select-none"
            style={{
              background: 'linear-gradient(123deg, #0a1a3a 7%, #1a5dc4 37%, #3b82f6 72%, #1e40af 100%)',
              boxShadow: '0px 4px 20px rgba(59, 130, 246, 0.3), 4px 4px 16px #1a5dc4 inset',
            }}
          >
            <FileText size={17} />
            {t('hero.viewResume')}
          </motion.a>

          <motion.a
            href="mailto:15957232009@163.com"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2.5 rounded-full border-2 border-[#D7E2EA]/25 px-10 py-3.5 sm:px-12 sm:py-4 text-sm sm:text-base font-semibold tracking-wider text-[#D7E2EA] hover:border-[#D7E2EA]/55 transition-colors cursor-pointer select-none"
          >
            <Mail size={17} />
            {t('hero.contactMe')}
          </motion.a>
        </motion.div>

        {/* Contact info — more visible */}
        <motion.p
          variants={riseUp}
          className="text-xs sm:text-sm text-[#D7E2EA]/45 tracking-wide text-center leading-relaxed max-w-2xl"
        >
          (+86) 15957232009 &nbsp;|&nbsp; 15957232009@163.com &nbsp;|&nbsp; 微信：jx00630705
        </motion.p>
      </motion.div>
    </section>
  )
}
