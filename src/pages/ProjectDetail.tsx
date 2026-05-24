import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ChevronRight, Database, BarChart3, Brain, LineChart } from 'lucide-react'
import FadeIn from '../components/FadeIn'

const slugMap: Record<string, { key: string; next: string | null; prev: string | null }> = {
  ecommerce: { key: 'project1', next: 'game-sales', prev: null },
  'game-sales': { key: 'project2', next: null, prev: 'ecommerce' },
}

const flowSteps = [
  { icon: Database, labelK: 'detail.flowStep1' },
  { icon: BarChart3, labelK: 'detail.flowStep2' },
  { icon: Brain, labelK: 'detail.flowStep3' },
  { icon: LineChart, labelK: 'detail.flowStep4' },
]

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const meta = slug ? slugMap[slug] : null

  if (!meta) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4 opacity-50">Project not found</p>
          <button onClick={() => navigate('/')} className="text-sm opacity-40 hover:opacity-70 underline cursor-pointer">
            {t('detail.back')}
          </button>
        </div>
      </div>
    )
  }

  // Resolve project data from i18n
  const p = t(`projects.${meta.key}`, { returnObjects: true }) as Record<string, unknown>
  const color = (p.color as string) || '#4F6EF7'
  const tags = (p.tags as string[]) || []
  const metrics = (p.metrics as Array<{ value: string; label: string }>) || []
  const recommendations = (p.recommendations as string[]) || []

  const otherKey = meta.key === 'project1' ? 'project2' : 'project1'
  const otherProject = t(`projects.${otherKey}`, { returnObjects: true }) as Record<string, unknown>

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1d1d1f]">
      {/* Fixed nav */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#F5F5F7]/80 backdrop-blur-lg border-b border-black/5 px-5 sm:px-8 py-4"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 opacity-40 hover:opacity-70 transition-opacity font-semibold text-xs tracking-wider cursor-pointer"
        >
          <ArrowLeft size={14} />
          {t('detail.back')}
        </button>
      </motion.nav>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-20 pb-20">
        {/* ───── 5a. Header ───── */}
        <FadeIn delay={0} y={40}>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-black/[0.06] text-xs font-medium text-black/50">
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-center font-black tracking-tight leading-tight mb-10"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', color: '#1d1d1f' }}>
            {p.name as string}
          </h1>

          {/* Metrics cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-14">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                viewport={{ once: false }}
                className="text-center p-4 sm:p-5 rounded-2xl bg-white border border-black/[0.06]"
              >
                <span className="block text-2xl sm:text-3xl font-black mb-1" style={{ color }}>
                  {m.value}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-black/35">{m.label}</span>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* ───── 5b. Background & Methodology ───── */}
        <FadeIn delay={0.1} y={30}>
          <h2 className="text-xs font-bold uppercase tracking-widest text-black/25 mb-5">{t('detail.background')}</h2>
          <p className="text-sm sm:text-base leading-relaxed text-black/55 mb-4">{p.background as string}</p>

          <h2 className="text-xs font-bold uppercase tracking-widest text-black/25 mb-5 mt-10">{t('detail.methodology')}</h2>
          <p className="text-sm sm:text-base leading-relaxed text-black/55 mb-8">{p.methodology as string}</p>

          {/* Flowchart */}
          <div className="flex items-center justify-between gap-1 sm:gap-3 mb-10 py-6 px-2 sm:px-4">
            {flowSteps.map((step, i) => (
              <div key={step.labelK} className="flex items-center gap-1 sm:gap-3 flex-1">
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border border-black/[0.06] flex items-center justify-center"
                    style={{ boxShadow: `0 4px 12px ${color}10` }}>
                    <step.icon size={18} className="sm:w-5 sm:h-5" style={{ color }} />
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-center text-black/30 leading-tight">{t(step.labelK)}</span>
                </div>
                {i < flowSteps.length - 1 && (
                  <ChevronRight size={16} className="text-black/15 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Callout box */}
          <div className="p-5 sm:p-6 rounded-2xl border mb-14" style={{ borderColor: `${color}30`, background: `${color}06` }}>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2" style={{ color }}>{t('detail.calloutLabel')}</p>
            <p className="text-sm leading-relaxed text-black/55">{p.callout as string}</p>
          </div>
        </FadeIn>

        {/* Divider */}
        <div className="border-t border-black/[0.06] my-10" />

        {/* ───── 5c. Main Content ───── */}
        {/* Module A: EDA */}
        <FadeIn delay={0.15} y={30}>
          <h2 className="text-xs font-bold uppercase tracking-widest text-black/25 mb-5">{t('detail.eda')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-14">
            {/* Simulated code block */}
            <div className="md:col-span-2 p-5 rounded-2xl bg-[#1d1d1f] text-[#a8d8a8] font-mono text-xs leading-relaxed overflow-hidden">
              <p className="text-white/30 mb-1">-- {t('detail.flowStep1')}</p>
              <p><span className="text-[#c792ea]">SELECT</span> user_id,</p>
              <p>  behavior_type,</p>
              <p>  <span className="text-[#ffcb6b]">COUNT</span>(*) <span className="text-[#c792ea]">AS</span> cnt</p>
              <p><span className="text-[#c792ea]">FROM</span> behavior_log</p>
              <p><span className="text-[#c792ea]">WHERE</span> scene = <span className="text-[#f78c6c]">'recommendation'</span></p>
              <p><span className="text-[#c792ea]">GROUP BY</span> user_id, behavior_type</p>
              <p><span className="text-[#c792ea]">ORDER BY</span> cnt <span className="text-[#c792ea]">DESC</span>;</p>
            </div>
            <div className="md:col-span-3 flex items-center">
              <p className="text-sm sm:text-base leading-relaxed text-black/55">{p.edaText as string}</p>
            </div>
          </div>
        </FadeIn>

        {/* Module B: Vizzes */}
        <FadeIn delay={0.2} y={30}>
          <h2 className="text-xs font-bold uppercase tracking-widest text-black/25 mb-5">{t('detail.visualizations')}</h2>

          {/* Viz 1 */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
            <div className="md:col-span-3 aspect-[4/3] rounded-2xl bg-white border border-black/[0.06] flex flex-col items-center justify-center p-6"
              style={{ background: `linear-gradient(135deg, white, ${color}08)` }}>
              <BarChart3 size={40} className="opacity-15 mb-3" style={{ color }} />
              <p className="text-xs text-black/20 font-medium">Conversion Funnel</p>
            </div>
            <div className="md:col-span-2">
              <h4 className="font-semibold text-sm mb-3">{p.vizTitle1 as string}</h4>
              <ul className="space-y-2">
                {(p.vizInsights1 as string[])?.map((insight, i) => (
                  <li key={i} className="flex gap-2 text-xs sm:text-sm text-black/50 leading-relaxed">
                    <span className="text-[10px] mt-0.5 flex-shrink-0" style={{ color }}>●</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Viz 2 */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-14">
            <div className="md:col-span-2 md:order-1 order-2">
              <h4 className="font-semibold text-sm mb-3">{p.vizTitle2 as string}</h4>
              <ul className="space-y-2">
                {(p.vizInsights2 as string[])?.map((insight, i) => (
                  <li key={i} className="flex gap-2 text-xs sm:text-sm text-black/50 leading-relaxed">
                    <span className="text-[10px] mt-0.5 flex-shrink-0" style={{ color }}>●</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-3 md:order-2 order-1 aspect-[4/3] rounded-2xl bg-white border border-black/[0.06] flex flex-col items-center justify-center p-6"
              style={{ background: `linear-gradient(135deg, white, ${color}08)` }}>
              <LineChart size={40} className="opacity-15 mb-3" style={{ color }} />
              <p className="text-xs text-black/20 font-medium">Analysis Dashboard</p>
            </div>
          </div>
        </FadeIn>

        {/* Module C: Statistical Analysis */}
        <FadeIn delay={0.25} y={30}>
          <h2 className="text-xs font-bold uppercase tracking-widest text-black/25 mb-5">{t('detail.stats')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-14">
            {/* Beautified table */}
            <div className="md:col-span-3 overflow-x-auto">
              <table className="w-full text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-black/10">
                    <th className="text-left py-2 pr-4 font-semibold text-black/50">Metric</th>
                    <th className="text-right py-2 px-3 font-semibold text-black/50">Control</th>
                    <th className="text-right py-2 px-3 font-semibold text-black/50">Experiment</th>
                    <th className="text-right py-2 pl-3 font-semibold text-black/50">Δ</th>
                    <th className="text-right py-2 pl-3 font-semibold text-black/50">p-value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04]">
                  {[
                    { metric: 'CTR', ctrl: '3.8%', exp: '4.3%', delta: '+13.2%', p: '0.003**' },
                    { metric: 'CVR', ctrl: '1.2%', exp: '1.4%', delta: '+16.7%', p: '0.008**' },
                    { metric: 'GMV/UV', ctrl: '2.41', exp: '2.71', delta: '+12.3%', p: '0.001***' },
                    { metric: '留存率', ctrl: '34.2%', exp: '36.1%', delta: '+5.6%', p: '0.042*' },
                  ].map(row => (
                    <tr key={row.metric} className="hover:bg-black/[0.01]">
                      <td className="py-3 pr-4 font-medium">{row.metric}</td>
                      <td className="py-3 px-3 text-right text-black/45">{row.ctrl}</td>
                      <td className="py-3 px-3 text-right font-medium">{row.exp}</td>
                      <td className="py-3 pl-3 text-right" style={{ color }}>{row.delta}</td>
                      <td className="py-3 pl-3 text-right font-mono text-[10px] sm:text-xs text-black/40">{row.p}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-[9px] text-black/25 mt-2">* p &lt; 0.05 &nbsp; ** p &lt; 0.01 &nbsp; *** p &lt; 0.001</p>
            </div>
            <div className="md:col-span-2 flex items-center">
              <p className="text-sm leading-relaxed text-black/55">{p.statsText as string}</p>
            </div>
          </div>
        </FadeIn>

        {/* Divider */}
        <div className="border-t border-black/[0.06] my-10" />

        {/* ───── 5d. Conclusion & Recommendations ───── */}
        <FadeIn delay={0.3} y={30}>
          <div className="rounded-[32px] p-6 sm:p-8 md:p-10 -mx-2 sm:-mx-0" style={{ background: '#1d1d1f' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Conclusion */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-white/25 mb-4">{t('detail.conclusion')}</h2>
                <p className="text-sm leading-relaxed text-white/55">{p.conclusion as string}</p>
              </div>

              {/* Recommendations */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-white/25 mb-4">{t('detail.recommendations')}</h2>
                <ul className="space-y-3">
                  {recommendations.map((rec, i) => (
                    <li key={i} className="flex gap-2 text-xs sm:text-sm text-white/45 leading-relaxed">
                      <span className="text-[10px] mt-0.5 flex-shrink-0" style={{ color }}>0{i + 1}</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ───── 5e. Footer Navigation ───── */}
        <FadeIn delay={0.4} y={20}>
          <div className="mt-16 pt-10 border-t border-black/[0.06] flex justify-between items-center">
            {meta.prev ? (
              <button
                onClick={() => navigate(`/project/${meta.prev}`)}
                className="flex items-center gap-2 text-sm text-black/35 hover:text-black/60 transition-colors cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>
                  <span className="text-[10px] block opacity-40">{t('detail.prevProject')}</span>
                  {otherProject.name as string}
                </span>
              </button>
            ) : <div />}

            {meta.next ? (
              <button
                onClick={() => navigate(`/project/${meta.next}`)}
                className="flex items-center gap-2 text-sm text-black/35 hover:text-black/60 transition-colors text-right cursor-pointer"
              >
                <span>
                  <span className="text-[10px] block opacity-40">{t('detail.nextProject')}</span>
                  {otherProject.name as string}
                </span>
                <ArrowRight size={14} />
              </button>
            ) : <div />}
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
