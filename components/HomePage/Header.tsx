'use client'

import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { FC } from 'react'

type HeaderProps = { optClassName?: string }

const Header: FC<HeaderProps> = ({ optClassName }) => {
  return (
    <section
      className={`relative self-stretch rounded h-[100dvh] flex flex-col items-center justify-center px-8 box-border gap-[32px] text-center text-21xl md:text-[60px] text-gray-400 font-clash-display ${optClassName}`}
    >
      <b className="flex items-center shrink-0">
        <span className="w-full tracking-[0.06em] md:leading-[8vh]">
          <p className="m-0 ">Empower Your</p>
          <p className="m-0">Blockchain Development</p>
          <p className="m-0">
            {`on  `}
            <span className="text-mediumblue">Koinos</span>
          </p>
        </span>
      </b>

      <Button
        href="/swagger"
        as={Link}
        className="rounded-68xl bg-gray-600 box-border md:w-[156px] md:h-[51px] md:mt-4 flex flex-col items-center justify-center py-2 px-4 text-xs md:text-base text-orangered border-[1px] border-solid border-orangered cursor-pointer no-underline font-semibold"
      >
        Get Started!
      </Button>
    </section>
  )
}

export default Header
