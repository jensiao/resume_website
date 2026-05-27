import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BarChart3, Sigma, Languages, Mail, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import { LampContainer } from '../components/ui/lamp'

const stagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

const traits = [
  { key: 'trait1', color: '#4F8CF7' },
  { key: 'trait2', color: '#B600A8' },
  { key: 'trait3', color: '#4F8CF7' },
  { key: 'trait4', color: '#B600A8' },
]

const skills = [
  {
    icon: BarChart3,
    color: '#4F8CF7',
    titleKey: 'about.skillsCat1',
    descKey: 'about.skillsCat1Desc',
    items: ['Excel · VLOOKUP / 数据透视表', 'SQL · MySQL', 'Python', 'Tableau', 'SPSS', 'ChatGPT 辅助代码优化'],
  },
  {
    icon: Sigma,
    color: '#B600A8',
    titleKey: 'about.skillsCat2',
    descKey: 'about.skillsCat2Desc',
    items: ['概率论', '假设检验', '线性回归', '对比分析', 'A/B 测试', 'Bonferroni 校正'],
  },
  {
    icon: Languages,
    color: '#4F8CF7',
    titleKey: 'about.skillsCat3',
    descKey: 'about.skillsCat3Desc',
    items: ['skillCet'],
    isLang: true,
  },
]

function SectionHeader({ no, label, title, subtitle }: { no: string; label: string; title: string; subtitle?: string }) {
  return (
    <motion.div variants={fadeUp} className="flex items-end justify-between mb-12 gap-6">
      <div>
        <p className="text-[#D7E2EA]/30 text-xs tracking-[0.3em] uppercase mb-2 font-mono">
          {no} / {label}
        </p>
        <h2 className="text-white font-display font-semibold text-2xl sm:text-3xl tracking-wide">
          {title}
        </h2>
        {subtitle && <p className="text-[#D7E2EA]/45 text-sm tracking-wide mt-1.5">{subtitle}</p>}
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-[#D7E2EA]/15 to-transparent mb-4 hidden sm:block" />
    </motion.div>
  )
}

export default function About() {
  const { t } = useTranslation()

  return (
    <div className="w-full min-h-screen relative">
      <Navbar />
      <LampContainer className="overflow-y-auto">

      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="w-full max-w-7xl mx-auto py-12 px-6 sm:px-10 md:px-12 lg:px-16">

          {/* ═══════════════════════════════════════
              ROW 1 — Name Card + Bio + Education
              ═══════════════════════════════════════ */}
          <section className="mb-20">
            <div className="grid lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20 items-center">

              {/* ── LEFT: Name Card ── */}
              <motion.div
                variants={fadeUp}
                className="relative w-full max-w-xs mx-auto lg:mx-0"
              >
                <div className="glass-panel rounded-3xl px-8 py-10 relative overflow-hidden text-center">
                  {/* glow */}
                  <div
                    className="absolute -top-20 -left-20 w-48 h-48 rounded-full blur-3xl opacity-[0.14] pointer-events-none"
                    style={{ background: '#4F8CF7' }}
                  />
                  <div
                    className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-[0.12] pointer-events-none"
                    style={{ background: '#B600A8' }}
                  />

                  {/* ID label */}
                  <p className="text-[#D7E2EA]/35 text-[10px] tracking-[0.3em] font-mono mb-5 relative">
                    / ID · 2026
                  </p>

                  {/* Big name */}
                  <h1
                    className="hero-heading font-display font-black leading-none mb-2 relative"
                    style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}
                  >
                    {t('about.nameChinese')}
                  </h1>

                  {/* Pinyin subtitle */}
                  <p className="text-[#D7E2EA]/55 italic font-display tracking-[0.2em] text-sm mb-5 relative">
                    {t('about.namePinyin')}
                  </p>

                  {/* Role line */}
                  <p className="text-[#D7E2EA]/65 text-xs tracking-[0.25em] mb-6 relative">
                    {t('about.roleTags')}
                  </p>

                  {/* Trait chips */}
                  <div className="flex flex-wrap gap-2 justify-center relative">
                    {traits.map((trait) => (
                      <span
                        key={trait.key}
                        className="px-3 py-1 rounded-full text-[11px] font-medium tracking-wide"
                        style={{
                          background: `${trait.color}10`,
                          border: `1px solid ${trait.color}30`,
                          color: '#D7E2EA',
                        }}
                      >
                        {t(`about.${trait.key}`)}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* ── RIGHT: Bio + Education ── */}
              <div>
                {/* Breadcrumb */}
                <motion.p
                  variants={fadeUp}
                  className="text-[#D7E2EA]/40 text-xs tracking-[0.3em] uppercase mb-6 font-mono"
                >
                  / {t('nav.about')}
                </motion.p>

                {/* Big tagline */}
                <motion.h2
                  variants={fadeUp}
                  className="font-display font-bold mb-10"
                  style={{
                    fontSize: 'clamp(2rem, 4.2vw, 3.4rem)',
                    lineHeight: 1.15,
                    letterSpacing: '-0.01em',
                  }}
                >
                  <span className="hero-heading">用数据理解业务，</span>
                  <br />
                  <span className="text-[#D7E2EA]/40">用洞察驱动决策。</span>
                </motion.h2>

                {/* Bio paragraphs */}
                <motion.div variants={fadeUp} className="space-y-5 mb-12">
                  <p className="text-[#D1D5DB] text-[15px]" style={{ lineHeight: 1.85 }}>
                    {t('about.para1')}
                  </p>
                  <p className="text-[#D1D5DB] text-[15px]" style={{ lineHeight: 1.85 }}>
                    {t('about.para2')}
                  </p>
                  <p className="text-[#D1D5DB] text-[15px]" style={{ lineHeight: 1.85 }}>
                    {t('about.para3')}
                  </p>
                </motion.div>

                {/* Education footer */}
                <motion.div
                  variants={fadeUp}
                  className="pt-8 border-t border-[#D7E2EA]/10"
                >
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-3">
                    {/* JUFE */}
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        <img
                          src="/江西财经大学logo.png"
                          alt="江西财经大学"
                          className="w-9 h-9 object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-white font-semibold text-sm tracking-wide mb-0.5 truncate">
                          {t('about.edu1School')}
                        </h4>
                        <p className="text-[#D7E2EA]/55 text-xs">
                          {t('about.edu1Degree')} · 2022 – 2026
                        </p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden sm:flex items-center justify-center px-2 text-[#D7E2EA]/30">
                      <ArrowRight size={18} />
                    </div>

                    {/* NJUST */}
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(182,0,168,0.25)',
                        }}
                      >
                        <img
                          src="/南京理工大学logo.jpg"
                          alt="南京理工大学"
                          className="w-9 h-9 object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-white font-semibold text-sm tracking-wide mb-0.5 truncate">
                          {t('about.edu2School')}
                        </h4>
                        <p className="text-[#D7E2EA]/55 text-xs">
                          {t('about.edu2Degree')} · 2026 秋季
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════
              ROW 2 — Skill Matrix
              ═══════════════════════════════════════ */}
          <section className="mb-16">
            <SectionHeader
              no="02"
              label="Skills"
              title={t('about.skillsTitle')}
              subtitle={t('about.skillsSubtitle')}
            />

            <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-6">
              {skills.map((cat) => (
                <div
                  key={cat.titleKey}
                  className="glass-panel rounded-2xl p-8 relative overflow-hidden group"
                >
                  <div
                    className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-500 pointer-events-none"
                    style={{ background: cat.color }}
                  />

                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 relative"
                    style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}25` }}
                  >
                    <cat.icon size={22} style={{ color: cat.color }} />
                  </div>

                  <h3 className="text-white font-semibold text-base mb-1.5 relative">
                    {t(cat.titleKey)}
                  </h3>
                  <p className="text-[#D7E2EA]/45 text-xs mb-5 relative leading-relaxed">
                    {t(cat.descKey)}
                  </p>

                  <div className="flex flex-wrap gap-2 relative">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          color: '#D1D5DB',
                        }}
                      >
                        {cat.isLang ? t(`about.${item}`) : item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </section>

          {/* ═══════════════════════════════════════
              CTA
              ═══════════════════════════════════════ */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-3 rounded-full px-10 py-4 text-base font-semibold tracking-wider text-white cursor-pointer select-none transition-transform hover:scale-[1.03]"
              style={{
                background: 'linear-gradient(123deg, #0a1a3a 7%, #1a5dc4 37%, #3b82f6 72%, #1e40af 100%)',
                boxShadow: '0px 4px 20px rgba(59, 130, 246, 0.3), 4px 4px 16px #1a5dc4 inset',
              }}
            >
              <BarChart3 size={18} />
              查看项目作品
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-full border-2 border-[#D7E2EA]/25 px-10 py-4 text-base font-semibold tracking-wider text-[#D7E2EA] hover:border-[#D7E2EA]/55 transition-colors cursor-pointer select-none"
            >
              <Mail size={18} />
              联系我
            </Link>
          </motion.div>
      </motion.div>
      </LampContainer>
    </div>
  )
}
