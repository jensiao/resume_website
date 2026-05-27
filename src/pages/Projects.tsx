import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import GradientBackground from '../components/ui/gradient-background'
import { ProjectCard } from '../components/ui/project-card'

const stagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

const projectKeys = ['project1', 'project2'] as const

const imgMap: Record<string, string> = {
  project1: '/美妆项目.jpg',
  project2: '/游戏项目.jpg',
}

export default function Projects() {
  const { t } = useTranslation()

  return (
    <div className="w-full min-h-screen relative">
      <Navbar />
      <GradientBackground />

      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="w-full relative z-10"
        style={{ paddingTop: '5.5rem' }}
      >
        <div className="w-full pb-24 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32">

          {/* ── Page hero ── */}
          <section className="mb-12">
            <motion.h1
              variants={fadeUp}
              className="hero-heading font-display font-black"
              style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1.05 }}
            >
              {t('projects.title')}
            </motion.h1>
          </section>

          {/* ── Gallery header ── */}
          <motion.div variants={fadeUp} className="mb-8">
            <p className="text-[#D7E2EA]/30 text-xs tracking-[0.3em] uppercase mb-2 font-mono">
              Gallery · {projectKeys.length} {t('projects.projectCount')}
            </p>
            <h2 className="text-white font-display font-semibold text-2xl tracking-wide">
              研究与项目
            </h2>
          </motion.div>

          {/* ── Project cards grid ── */}
          <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-8 mb-8">
            {projectKeys.map((key) => {
              const proj: Record<string, any> = t(`projects.${key}`, { returnObjects: true })
              const color = String(proj.color || '#4F8CF7')

              return (
                <ProjectCard
                  key={key}
                  imgSrc={imgMap[key]}
                  title={String(proj.name)}
                  description={String(proj.brief)}
                  link={`/projects/${key}`}
                  linkText="查看详情"
                  color={color}
                  tags={proj.tags as string[]}
                  period={String(proj.period)}
                />
              )
            })}

            {/* Trailing card hint */}
            <div className="rounded-2xl border-2 border-dashed border-[#D7E2EA]/10 flex flex-col items-center justify-center p-8 text-center min-h-[280px]">
              <div className="w-12 h-12 rounded-full border border-[#D7E2EA]/15 flex items-center justify-center mb-4">
                <span className="text-[#D7E2EA]/35 text-2xl font-light">+</span>
              </div>
              <p className="text-[#D7E2EA]/35 text-sm font-medium mb-1">更多项目</p>
              <p className="text-[#D7E2EA]/20 text-xs">持续更新中</p>
            </div>
          </motion.div>

          {/* ── Hint ── */}
          <motion.p
            variants={fadeUp}
            className="text-[#D7E2EA]/30 text-xs tracking-wider text-center"
          >
            点击卡片查看项目详情
          </motion.p>

          {/* ── Bottom CTA ── */}
          <motion.div variants={fadeUp} className="mt-32 text-center">
            <p className="text-[#D7E2EA]/45 text-sm tracking-wide mb-6">
              想了解更多项目细节或合作机会？
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-full px-10 py-4 text-base font-semibold tracking-wider text-white cursor-pointer select-none transition-transform hover:scale-[1.03]"
              style={{
                background: 'linear-gradient(123deg, #0a1a3a 7%, #1a5dc4 37%, #3b82f6 72%, #1e40af 100%)',
                boxShadow: '0px 4px 20px rgba(59, 130, 246, 0.3), 4px 4px 16px #1a5dc4 inset',
              }}
            >
              联系我
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
