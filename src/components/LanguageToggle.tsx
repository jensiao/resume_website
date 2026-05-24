import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function LanguageToggle() {
  const { i18n } = useTranslation()
  const isZh = i18n.language === 'zh'

  return (
    <motion.button
      onClick={() => i18n.changeLanguage(isZh ? 'en' : 'zh')}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="flex items-center justify-center w-10 h-10 rounded-full border border-current/20 cursor-pointer text-xs font-semibold tracking-wider"
      aria-label="Toggle language"
    >
      {isZh ? 'EN' : '中'}
    </motion.button>
  )
}
