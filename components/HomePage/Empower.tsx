'use client'
import { motion } from 'framer-motion'
import { FC } from 'react'

const Empower: FC = () => {
  return (
    <motion.span
      animate={{ scale: [1, 3, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      Empower
    </motion.span>
  )
}

export default Empower
