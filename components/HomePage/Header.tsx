'use client'

import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { FC } from 'react'

type HeaderProps = {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <div className="self-stretch rounded h-[100vh] flex flex-col items-center justify-center px-8 box-border gap-[32px] text-center text-5xl md:text-29xl text-gray-400 font-clash-display md:mt-[-45px]">
      <b className="relative flex items-center md:w-[700px] md:h-[178px] shrink-0">
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
    </div>
  )
}

export default Header
