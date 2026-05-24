import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import FadeIn from '../components/FadeIn'

const traits = ['about.trait1', 'about.trait2', 'about.trait3', 'about.trait4'] as const

export default function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className="min-h-screen flex items-center bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 lg:gap-16 xl:gap-24 items-center">
        {/* Left — Identity Card */}
        <FadeIn delay={0} y={30}>
          <motion.div
            whileHover={{ rotate: 0, y: -4 }}
            className="relative mx-auto lg:mx-0 w-full max-w-[320px] rounded-[32px] p-[2px] -rotate-1"
            style={{
              background: 'linear-gradient(135deg, #B600A840, #7621B040, #4F6EF740)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05) inset',
            }}
          >
            <div className="bg-[#0C0C0C] rounded-[30px] p-6 sm:p-8">
              {/* Monogram */}
              <div className="text-center mb-6">
                <span className="hero-heading font-black text-6xl sm:text-7xl leading-none select-none">
                  JX
                </span>
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-center mb-1">{t('about.nameChinese')}</h3>
              <p className="text-xs opacity-40 text-center tracking-wider mb-5">{t('about.namePinyin')}</p>

              {/* Role tags */}
              <p className="text-xs sm:text-sm text-center opacity-55 leading-relaxed mb-6">
                {t('about.roleTags')}
              </p>

              {/* Trait capsules */}
              <div className="flex flex-wrap justify-center gap-2">
                {traits.map(tk => (
                  <span key={tk} className="px-3 py-1.5 rounded-full border border-[#D7E2EA]/15 text-[10px] sm:text-xs font-medium opacity-55">
                    {t(tk)}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </FadeIn>

        {/* Right — Content */}
        <div>
          {/* Breadcrumb */}
          <FadeIn delay={0.1} y={20}>
            <p className="text-xs opacity-35 tracking-widest uppercase mb-4">{t('about.breadcrumb')}</p>
          </FadeIn>

          {/* Title */}
          <FadeIn delay={0.15} y={25}>
            <h2 className="text-[#D7E2EA] font-bold leading-tight mb-8 md:mb-10"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)' }}>
              {t('about.title')}
            </h2>
          </FadeIn>

          {/* Paragraphs */}
          <FadeIn delay={0.2} y={25}>
            <div className="space-y-4 text-sm sm:text-base leading-relaxed opacity-55 max-w-xl mb-10">
              <p>{t('about.para1')}</p>
              <p>{t('about.para2')}</p>
              <p>{t('about.para3')}</p>
            </div>
          </FadeIn>

          {/* Education Timeline */}
          <FadeIn delay={0.35} y={25}>
            <div className="flex items-stretch gap-3 sm:gap-5">
              {/* School 1 — 江西财经大学 */}
              <div className="flex-1 p-4 sm:p-5 rounded-2xl border border-[#D7E2EA]/10 bg-[#D7E2EA]/[0.02] flex items-center gap-3 sm:gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden bg-white/80 p-1">
                  <img src="/江西财经大学logo.png" alt="JUFE" className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-semibold">{t('about.edu1School')}</p>
                  <p className="text-xs opacity-45 mt-0.5">{t('about.edu1Degree')}</p>
                  <p className="text-[10px] opacity-30 mt-1.5 font-mono">{t('about.edu1Period')}</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 rounded-full border border-[#D7E2EA]/15 flex items-center justify-center">
                  <ArrowRight size={14} className="opacity-30" />
                </div>
              </div>

              {/* School 2 — 南京理工大学 */}
              <div className="flex-1 p-4 sm:p-5 rounded-2xl border border-[#B600A8]/20 bg-[#B600A8]/[0.03] flex items-center gap-3 sm:gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden bg-white/80 p-1">
                  <img src="/南京理工大学logo.jpg" alt="NJUST" className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-semibold">{t('about.edu2School')}</p>
                  <p className="text-xs opacity-45 mt-0.5">{t('about.edu2Degree')}</p>
                  <p className="text-[10px] opacity-30 mt-1.5 font-mono">{t('about.edu2Period')}</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
