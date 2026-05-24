import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { FileText, Mail, Sparkles } from 'lucide-react'
import FadeIn from '../components/FadeIn'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center overflow-x-clip pt-20 pb-10 px-5 sm:px-8 md:px-10">
      {/* Greeting */}
      <FadeIn delay={0} y={25}>
        <p className="text-sm sm:text-base opacity-50 tracking-wide mb-8 sm:mb-10">
          {'\u{1F44B}'} {t('hero.greeting')} <span className="font-semibold text-[#D7E2EA]">{t('hero.name')}</span>
        </p>
      </FadeIn>

      {/* Frosted glass hero card */}
      <FadeIn delay={0.12} y={35}>
        <motion.div
          whileHover={{ y: -2 }}
          className="relative max-w-lg mx-auto mb-10 sm:mb-14"
        >
          {/* Outer glow */}
          <div className="absolute -inset-1 rounded-[40px] opacity-30 blur-2xl"
            style={{ background: 'linear-gradient(135deg, #B600A840, #7621B040, #4F6EF740)' }} />

          {/* Glass card */}
          <div className="relative rounded-[36px] px-8 py-8 sm:px-12 sm:py-10 md:px-14 md:py-12 text-center"
            style={{
              background: 'rgba(215, 226, 234, 0.04)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '1px solid rgba(215, 226, 234, 0.1)',
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.05),
                inset 0 -1px 0 rgba(0, 0, 0, 0.1)
              `,
            }}
          >
            {/* Subtle top shimmer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} />

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full mb-5 sm:mb-6"
              style={{
                background: 'rgba(182, 0, 168, 0.1)',
                border: '1px solid rgba(182, 0, 168, 0.2)',
              }}>
              <Sparkles size={12} className="text-[#B600A8]/70" />
              <span className="text-[10px] sm:text-xs font-medium tracking-wider text-[#B600A8]/80">
                {t('hero.roleTag')}
              </span>
            </div>

            {/* Main heading */}
            <h1 className="font-display font-bold tracking-tight leading-tight mb-3 sm:mb-4"
              style={{ fontSize: 'clamp(2rem, 6vw, 3.2rem)', color: '#D7E2EA' }}>
              {t('hero.titleLine1')}
            </h1>

            {/* Subtitle line */}
            <p className="text-sm sm:text-base opacity-40 font-light tracking-wide"
              style={{ fontSize: 'clamp(0.9rem, 2vw, 1.15rem)' }}>
              {t('hero.titleLine2')}
            </p>
          </div>
        </motion.div>
      </FadeIn>

      {/* Bottom info grid */}
      <FadeIn delay={0.35} y={30}>
        <div className="grid grid-cols-2 gap-6 sm:gap-10 md:gap-16 mb-10 sm:mb-12">
          <div className="text-left">
            <p className="text-[10px] sm:text-xs uppercase tracking-widest opacity-35 mb-2">
              {t('hero.eduNowLabel')}
            </p>
            <p className="text-sm sm:text-base font-medium leading-snug max-w-[180px] sm:max-w-[220px]">
              {t('hero.eduNow')}
            </p>
          </div>
          <div className="text-left">
            <p className="text-[10px] sm:text-xs uppercase tracking-widest opacity-35 mb-2">
              {t('hero.eduPrevLabel')}
            </p>
            <p className="text-sm sm:text-base font-medium leading-snug max-w-[180px] sm:max-w-[220px]">
              {t('hero.eduPrev')}
            </p>
          </div>
        </div>
      </FadeIn>

      {/* CTA buttons */}
      <FadeIn delay={0.5} y={25}>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 rounded-full px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-wider text-white cursor-pointer select-none"
            style={{
              background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
              boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
            }}
          >
            <FileText size={16} />
            {t('hero.viewResume')}
          </motion.a>

          <motion.a
            href="mailto:15957232009@163.com"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA]/50 px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-wider text-[#D7E2EA] hover:border-[#D7E2EA] transition-colors cursor-pointer select-none"
          >
            <Mail size={16} />
            {t('hero.contactMe')}
          </motion.a>
        </div>
      </FadeIn>
    </section>
  )
}
