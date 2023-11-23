'use client'

import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { FC } from 'react'
import TypeWriterText from './TypeWriterText'
import { motion } from 'framer-motion'
import Empower from './Empower'

type HeaderProps = { optClassName?: string }

const Header: FC<HeaderProps> = ({ optClassName }) => {
  // Initial fade-in animation
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1 } } // Adjust duration as needed
  }

  // Pulsating effect
  const pulse = {
    scale: [1, 1.05, 1], // Scale values for pulsating
    transition: {
      repeat: Infinity,
      duration: 1 // Adjust duration for each pulse
    }
  }

  // Scale animation for "Empower"
  const scaleUp = {
    animate: {
      scale: [1, 3, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <section
      className={`relative self-stretch rounded h-[100dvh] flex flex-col items-center justify-center px-8 box-border gap-[32px] text-center text-21xl md:text-[60px] text-gray-400 font-clash-display ${optClassName}`}
    >
      <b className="flex items-center shrink-0 translate-y-[-50px]">
        <span className="w-full tracking-[0.06em] md:leading-[8vh]">
          <p className="m-0 flex items-center justify-center gap-x-[20px]">
            <TypeWriterText text="Empower" />
            Your
          </p>
          <p className="m-0">Blockchain Development</p>
          <p className="m-0 flex items-center justify-center gap-x-[20px]">
            {`on  `}
            <TypeWriterText text=" Koinos" />
          </p>
        </span>
      </b>

      <motion.div {...fadeIn}>
        <motion.div {...pulse}>
          <Button
            href="/swagger"
            as={Link}
            className="rounded-68xl bg-gray-600 box-border md:w-[156px] md:h-[51px] md:mt-4 flex flex-col items-center justify-center py-2 px-4 text-xs md:text-base text-orangered border-[1px] border-solid border-orangered cursor-pointer no-underline font-semibold"
          >
            Get Started!
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Header
