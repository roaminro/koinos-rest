'use client'

import { motion } from 'framer-motion'
import { FC } from 'react'

type TypeWriterTextProps = { text: string }

const TypeWriterText: FC<TypeWriterTextProps> = ({ text }) => {
  // Animation for each letter
  const letterMotion = {
    hidden: { opacity: 0, x: -10 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: custom * 0.1 } // Each letter appears with a delay
    })
  }

  return (
    <span className="text-mediumblue inline-block overflow-hidden">
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={letterMotion}
          className="inline-block mr-[2px]" // Ensures spacing between letters
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

export default TypeWriterText
