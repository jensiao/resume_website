import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import FadeIn from '../components/FadeIn'

interface Proj {
  slug: string
  key: string
  gradient: string
}

const projects: Proj[] = [
  {
    slug: 'ecommerce',
    key: 'project1',
    gradient: 'linear-gradient(137deg, #4F6EF7 0%, #A78BFA 45%, #C084FC 100%)',
  },
  {
    slug: 'game-sales',
    key: 'project2',
    gradient: 'linear-gradient(137deg, #F77F4F 0%, #FB923C 45%, #FBBF24 100%)',
  },
]

function Card({ project, index }: { project: Proj; index: number }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const p = t(`projects.${project.key}`, { returnObjects: true }) as Record<string, unknown>
  const tags = (p.tags as string[]) || []

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.15 }}
      viewport={{ once: false }}
      onClick={() => navigate(`/project/${project.slug}`)}
      className="relative flex flex-col justify-start items-start w-full group mx-auto cursor-pointer h-full"
    >
      {/* Glow background */}
      <motion.div
        className="absolute inset-0 w-full h-full opacity-50 rounded-[40px] pointer-events-none"
        style={{ background: project.gradient, filter: 'blur(45px)' }}
        whileHover={{ opacity: 0.7, scale: 1.05 }}
        transition={{ duration: 0.4 }}
      />

      {/* Foreground card with gradient border */}
      <div
        className="relative self-stretch flex-1 rounded-[40px] z-10 overflow-hidden p-[1.5px]"
        style={{ background: project.gradient }}
      >
        <div className="w-full h-full min-h-[400px] sm:min-h-[420px] rounded-[39px] p-7 sm:p-8 flex flex-col justify-between"
          style={{ background: '#141416' }}>
          {/* Top content */}
          <div>
            {/* Number + arrow */}
            <div className="flex items-start justify-between mb-8">
              <span className="font-display font-black text-6xl sm:text-7xl text-white/6 select-none leading-none">
                0{index + 1}
              </span>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 45 }}
                className="w-11 h-11 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:bg-white/[0.12] transition-colors"
              >
                <ArrowUpRight size={20} className="text-white/50 group-hover:text-white/80 transition-colors" />
              </motion.div>
            </div>

            {/* Title */}
            <h3 className="text-white font-semibold text-xl sm:text-2xl mb-4 tracking-tight leading-snug">
              {p.name as string}
            </h3>

            {/* Description */}
            <p className="text-white/35 text-[15px] leading-[1.7] font-light mb-6">
              {p.brief as string}
            </p>
          </div>

          {/* Bottom: tags */}
          <div className="flex flex-wrap gap-1.5">
            {tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium text-white/30 bg-white/[0.04] border border-white/[0.06]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { t } = useTranslation()

  return (
    <section id="projects" className="min-h-screen bg-[#0A0A0B] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 flex flex-col items-center justify-center py-16 sm:py-20 md:py-24 px-5 sm:px-8 md:px-10">
      {/* Title */}
      <FadeIn delay={0} y={30}>
        <h2 className="text-[#D7E2EA] font-black uppercase leading-none tracking-tight text-center mb-12 sm:mb-16"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 5rem)' }}>
          {t('projects.title')}
        </h2>
      </FadeIn>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-8 md:gap-6 lg:gap-8 w-full max-w-[960px]">
        {projects.map((p, i) => (
          <Card key={p.slug} project={p} index={i} />
        ))}
      </div>

      {/* Hint */}
      <p className="text-center mt-10 text-[10px] opacity-20 tracking-widest uppercase">
        Click to view project details
      </p>
    </section>
  )
}
