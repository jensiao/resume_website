import { useTranslation } from 'react-i18next'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Database,
  LineChart,
  FlaskConical,
  Target,
  Lightbulb,
  CheckCircle2,
  Image as ImageIcon,
  ArrowRight,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import ParticleBackground from '../components/ParticleBackground'

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

const projectKeys = ['project1', 'project2'] as const
type ProjectKey = (typeof projectKeys)[number]

function ImagePlaceholder({ color, label, slot }: { color: string; label: string; slot: string }) {
  return (
    <div
      className="relative rounded-2xl border-2 border-dashed overflow-hidden"
      style={{
        borderColor: `${color}30`,
        background: `linear-gradient(135deg, ${color}08 0%, transparent 80%)`,
        aspectRatio: '16/9',
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-center px-6">
        <div>
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
            style={{ background: `${color}15`, border: `1px solid ${color}30` }}
          >
            <ImageIcon size={22} style={{ color }} />
          </div>
          <p className="text-[#D7E2EA]/55 text-sm font-medium mb-1">{label}</p>
          <p className="text-[#D7E2EA]/30 text-xs font-mono break-all">{slot}</p>
        </div>
      </div>
      {/* User-supplied image overlays when it loads successfully */}
      <img
        src={slot}
        alt={label}
        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500"
        onLoad={(e) => { e.currentTarget.style.opacity = '1' }}
        onError={(e) => { e.currentTarget.remove() }}
      />
    </div>
  )
}

export default function ProjectDetail() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()

  if (!id || !projectKeys.includes(id as ProjectKey)) {
    return <Navigate to="/projects" replace />
  }

  const key = id as ProjectKey
  const proj: Record<string, any> = t(`projects.${key}`, { returnObjects: true })
  const color = String(proj.color || '#4F8CF7')

  const currentIdx = projectKeys.indexOf(key)
  const prevKey = currentIdx > 0 ? projectKeys[currentIdx - 1] : null
  const nextKey = currentIdx < projectKeys.length - 1 ? projectKeys[currentIdx + 1] : null
  const indexLabel = String(currentIdx + 1).padStart(2, '0')

  return (
    <div className="w-full min-h-screen relative overflow-x-hidden">
      <Navbar />
      <ParticleBackground />

      <div
        className="absolute top-1/4 -left-48 w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.05] pointer-events-none"
        style={{ background: color, zIndex: -1 }}
      />

      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="w-full relative z-10"
      >
        <div className="w-full pt-28 pb-24 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32">

          {/* ── Back link ── */}
          <motion.div variants={fadeUp} className="mb-12">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-[#D7E2EA]/55 hover:text-[#D7E2EA] text-sm tracking-wider transition-colors group"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              {t('projects.backToList')}
            </Link>
          </motion.div>

          {/* ═══════════════════════════════════════
              HERO — Project header
              ═══════════════════════════════════════ */}
          <section className="mb-16">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <span
                className="font-display font-black"
                style={{ fontSize: '1.5rem', color, opacity: 0.7 }}
              >
                {indexLabel}
              </span>
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider"
                style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}
              >
                {String(proj.period)}
              </span>
              <span className="text-[#D7E2EA]/35 text-xs tracking-wider">
                {String(proj.role)}
              </span>
              <span className="text-[#D7E2EA]/20 mx-1">·</span>
              <span className="text-[#D7E2EA]/35 text-xs tracking-wider uppercase font-mono">
                {t('projects.reportLabel')}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="hero-heading font-display font-black mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', lineHeight: 1.15 }}
            >
              {String(proj.name)}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-[#D1D5DB] text-base sm:text-lg max-w-3xl mb-8"
              style={{ lineHeight: 1.7 }}
            >
              {String(proj.brief)}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              {(proj.tags as string[]).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-xs font-medium tracking-wide"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${color}30`,
                    color: '#D7E2EA',
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </section>

          {/* ── Cover image (placeholder shown by default, image overlays if file exists) ── */}
          <motion.div
            variants={fadeUp}
            className="mb-20 relative rounded-3xl overflow-hidden border-2 border-dashed"
            style={{
              borderColor: `${color}25`,
              background: `linear-gradient(135deg, ${color}15 0%, ${color}05 50%, #0C0C0C 100%)`,
              aspectRatio: '21/9',
            }}
          >
            {/* Pattern overlay */}
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage: `radial-gradient(circle at 70% 30%, ${color}25, transparent 50%)`,
              }}
            />
            {/* Placeholder content */}
            <div className="absolute inset-0 flex items-center justify-center text-center px-6">
              <div>
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                  style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                >
                  <ImageIcon size={26} style={{ color }} />
                </div>
                <p className="text-[#D7E2EA]/65 text-base font-medium mb-1">{t('detail.coverPlaceholder')}</p>
                <p className="text-[#D7E2EA]/30 text-xs font-mono">
                  /public/projects/{key}-cover.png
                </p>
              </div>
            </div>
            {/* User-supplied image overlays on top when it loads successfully */}
            <img
              src={`/projects/${key}-cover.png`}
              alt={String(proj.name)}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500"
              onLoad={(e) => { e.currentTarget.style.opacity = '1' }}
              onError={(e) => { e.currentTarget.remove() }}
            />
          </motion.div>

          {/* ═══════════════════════════════════════
              METRICS ROW
              ═══════════════════════════════════════ */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          >
            {(proj.metrics as Array<{ value: string; label: string }>).map((m, mi) => (
              <div
                key={mi}
                className="glass-panel rounded-2xl p-6 text-center relative overflow-hidden"
              >
                <div
                  className="absolute inset-x-0 top-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                />
                <div
                  className="font-display font-bold mb-1"
                  style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color }}
                >
                  {m.value}
                </div>
                <p className="text-[#D7E2EA]/45 text-xs tracking-wide">{m.label}</p>
              </div>
            ))}
          </motion.div>

          {/* ═══════════════════════════════════════
              01 — Background
              ═══════════════════════════════════════ */}
          <motion.section variants={fadeUp} className="mb-20">
            <div className="flex items-center gap-4 mb-6">
              <div
                className="flex items-center justify-center w-11 h-11 rounded-xl"
                style={{ background: `${color}15`, border: `1px solid ${color}25` }}
              >
                <Target size={18} style={{ color }} />
              </div>
              <div>
                <p className="text-[#D7E2EA]/30 text-xs tracking-[0.3em] uppercase font-mono">01</p>
                <h2 className="text-white font-display font-semibold text-xl sm:text-2xl tracking-wide">
                  {t('detail.background')}
                </h2>
              </div>
            </div>
            <div className="glass-panel rounded-2xl p-8">
              <p className="text-[#D1D5DB] text-base" style={{ lineHeight: 1.85 }}>
                {String(proj.background)}
              </p>
            </div>
          </motion.section>

          {/* ═══════════════════════════════════════
              02 — Methodology
              ═══════════════════════════════════════ */}
          <motion.section variants={fadeUp} className="mb-20">
            <div className="flex items-center gap-4 mb-6">
              <div
                className="flex items-center justify-center w-11 h-11 rounded-xl"
                style={{ background: `${color}15`, border: `1px solid ${color}25` }}
              >
                <FlaskConical size={18} style={{ color }} />
              </div>
              <div>
                <p className="text-[#D7E2EA]/30 text-xs tracking-[0.3em] uppercase font-mono">02</p>
                <h2 className="text-white font-display font-semibold text-xl sm:text-2xl tracking-wide">
                  {t('detail.methodology')}
                </h2>
              </div>
            </div>
            <div className="glass-panel rounded-2xl p-8">
              <p className="text-[#D1D5DB] text-base mb-6" style={{ lineHeight: 1.85 }}>
                {String(proj.methodology)}
              </p>
              {proj.callout && (
                <div
                  className="p-5 rounded-xl"
                  style={{ background: `${color}0c`, border: `1px solid ${color}25` }}
                >
                  <p className="text-xs font-semibold tracking-wider mb-2 uppercase" style={{ color }}>
                    {t('detail.calloutLabel')}
                  </p>
                  <p className="text-[#D1D5DB] text-sm" style={{ lineHeight: 1.7 }}>
                    {String(proj.callout)}
                  </p>
                </div>
              )}
            </div>
          </motion.section>

          {/* ═══════════════════════════════════════
              03 — EDA + chart placeholder
              ═══════════════════════════════════════ */}
          {proj.edaText && (
            <motion.section variants={fadeUp} className="mb-20">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-xl"
                  style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                >
                  <Database size={18} style={{ color }} />
                </div>
                <div>
                  <p className="text-[#D7E2EA]/30 text-xs tracking-[0.3em] uppercase font-mono">03</p>
                  <h2 className="text-white font-display font-semibold text-xl sm:text-2xl tracking-wide">
                    {String(proj.edaTitle)}
                  </h2>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="glass-panel rounded-2xl p-8">
                  <p className="text-[#D1D5DB] text-base" style={{ lineHeight: 1.85 }}>
                    {String(proj.edaText)}
                  </p>
                </div>
                <ImagePlaceholder
                  color={color}
                  label={t('projects.imagePlaceholder')}
                  slot={`/projects/${key}-eda.png`}
                />
              </div>
            </motion.section>
          )}

          {/* ═══════════════════════════════════════
              04 — Visualizations
              ═══════════════════════════════════════ */}
          <motion.section variants={fadeUp} className="mb-20">
            <div className="flex items-center gap-4 mb-6">
              <div
                className="flex items-center justify-center w-11 h-11 rounded-xl"
                style={{ background: `${color}15`, border: `1px solid ${color}25` }}
              >
                <LineChart size={18} style={{ color }} />
              </div>
              <div>
                <p className="text-[#D7E2EA]/30 text-xs tracking-[0.3em] uppercase font-mono">04</p>
                <h2 className="text-white font-display font-semibold text-xl sm:text-2xl tracking-wide">
                  {t('detail.visualizations')}
                </h2>
              </div>
            </div>

            <div className="space-y-8">
              {proj.vizTitle1 && (
                <div>
                  <h3 className="text-[#D7E2EA] font-semibold text-base mb-4">
                    {String(proj.vizTitle1)}
                  </h3>
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="glass-panel rounded-2xl p-7">
                      <ul className="space-y-3">
                        {(proj.vizInsights1 as string[]).map((insight, ii) => (
                          <li
                            key={ii}
                            className="flex items-start gap-3 text-[#D1D5DB] text-sm"
                            style={{ lineHeight: 1.75 }}
                          >
                            <span
                              className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
                              style={{ background: color }}
                            />
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <ImagePlaceholder
                      color={color}
                      label={t('projects.imagePlaceholder')}
                      slot={`/projects/${key}-viz1.png`}
                    />
                  </div>
                </div>
              )}

              {proj.vizTitle2 && (
                <div>
                  <h3 className="text-[#D7E2EA] font-semibold text-base mb-4">
                    {String(proj.vizTitle2)}
                  </h3>
                  <div className="grid lg:grid-cols-2 gap-6">
                    <ImagePlaceholder
                      color={color}
                      label={t('projects.imagePlaceholder')}
                      slot={`/projects/${key}-viz2.png`}
                    />
                    <div className="glass-panel rounded-2xl p-7">
                      <ul className="space-y-3">
                        {(proj.vizInsights2 as string[]).map((insight, ii) => (
                          <li
                            key={ii}
                            className="flex items-start gap-3 text-[#D1D5DB] text-sm"
                            style={{ lineHeight: 1.75 }}
                          >
                            <span
                              className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
                              style={{ background: color }}
                            />
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.section>

          {/* ═══════════════════════════════════════
              05 — Statistical Analysis
              ═══════════════════════════════════════ */}
          {proj.statsText && (
            <motion.section variants={fadeUp} className="mb-20">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-xl"
                  style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                >
                  <FlaskConical size={18} style={{ color }} />
                </div>
                <div>
                  <p className="text-[#D7E2EA]/30 text-xs tracking-[0.3em] uppercase font-mono">05</p>
                  <h2 className="text-white font-display font-semibold text-xl sm:text-2xl tracking-wide">
                    {String(proj.statsTitle)}
                  </h2>
                </div>
              </div>
              <div className="glass-panel rounded-2xl p-8">
                <p className="text-[#D1D5DB] text-base" style={{ lineHeight: 1.85 }}>
                  {String(proj.statsText)}
                </p>
              </div>
            </motion.section>
          )}

          {/* ═══════════════════════════════════════
              06 — Conclusion + Recommendations
              ═══════════════════════════════════════ */}
          <motion.section variants={fadeUp} className="mb-20">
            <div className="grid lg:grid-cols-5 gap-6">
              {proj.conclusion && (
                <div className="lg:col-span-2 glass-panel rounded-2xl p-8 relative overflow-hidden">
                  <div
                    className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-[0.1] pointer-events-none"
                    style={{ background: color }}
                  />
                  <div className="flex items-center gap-3 mb-5 relative">
                    <div
                      className="flex items-center justify-center w-11 h-11 rounded-xl"
                      style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                    >
                      <CheckCircle2 size={18} style={{ color }} />
                    </div>
                    <div>
                      <p className="text-[#D7E2EA]/30 text-xs tracking-[0.3em] uppercase font-mono">06</p>
                      <h3 className="text-white font-display font-semibold text-lg tracking-wide">
                        {t('detail.conclusion')}
                      </h3>
                    </div>
                  </div>
                  <p className="text-[#D1D5DB] text-sm relative" style={{ lineHeight: 1.85 }}>
                    {String(proj.conclusion)}
                  </p>
                </div>
              )}

              {proj.recommendations && (proj.recommendations as string[]).length > 0 && (
                <div className="lg:col-span-3 glass-panel rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="flex items-center justify-center w-11 h-11 rounded-xl"
                      style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                    >
                      <Lightbulb size={18} style={{ color }} />
                    </div>
                    <div>
                      <p className="text-[#D7E2EA]/30 text-xs tracking-[0.3em] uppercase font-mono">07</p>
                      <h3 className="text-white font-display font-semibold text-lg tracking-wide">
                        {t('detail.recommendations')}
                      </h3>
                    </div>
                  </div>
                  <ul className="space-y-4">
                    {(proj.recommendations as string[]).map((rec, ri) => (
                      <li
                        key={ri}
                        className="flex items-start gap-3 text-[#D1D5DB] text-sm"
                        style={{ lineHeight: 1.75 }}
                      >
                        <span
                          className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold mt-0.5"
                          style={{ background: `${color}20`, color }}
                        >
                          {ri + 1}
                        </span>
                        <span className="flex-1">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.section>

          {/* ═══════════════════════════════════════
              Prev/Next + Back navigation
              ═══════════════════════════════════════ */}
          <motion.div
            variants={fadeUp}
            className="grid sm:grid-cols-2 gap-4 mt-24 pt-12 border-t border-[#D7E2EA]/8"
          >
            {prevKey ? (
              <Link
                to={`/projects/${prevKey}`}
                className="glass-panel rounded-2xl p-6 group hover:border-[#D7E2EA]/25 transition-colors"
              >
                <p className="text-[#D7E2EA]/35 text-xs tracking-wider uppercase mb-2 inline-flex items-center gap-2">
                  <ArrowLeft size={12} />
                  {t('detail.prevProject')}
                </p>
                <h4 className="text-white font-display font-semibold text-base line-clamp-2 group-hover:text-[#4F8CF7] transition-colors">
                  {String(t(`projects.${prevKey}.name`))}
                </h4>
              </Link>
            ) : (
              <div />
            )}

            {nextKey ? (
              <Link
                to={`/projects/${nextKey}`}
                className="glass-panel rounded-2xl p-6 group hover:border-[#D7E2EA]/25 transition-colors text-right sm:ml-auto sm:w-full"
              >
                <p className="text-[#D7E2EA]/35 text-xs tracking-wider uppercase mb-2 inline-flex items-center gap-2">
                  {t('detail.nextProject')}
                  <ArrowRight size={12} />
                </p>
                <h4 className="text-white font-display font-semibold text-base line-clamp-2 group-hover:text-[#4F8CF7] transition-colors">
                  {String(t(`projects.${nextKey}.name`))}
                </h4>
              </Link>
            ) : (
              <Link
                to="/projects"
                className="glass-panel rounded-2xl p-6 group hover:border-[#D7E2EA]/25 transition-colors text-right sm:ml-auto sm:w-full"
              >
                <p className="text-[#D7E2EA]/35 text-xs tracking-wider uppercase mb-2 inline-flex items-center gap-2">
                  {t('projects.backToList')}
                  <ArrowRight size={12} />
                </p>
                <h4 className="text-white font-display font-semibold text-base group-hover:text-[#4F8CF7] transition-colors">
                  {t('detail.browseAll')}
                </h4>
              </Link>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
