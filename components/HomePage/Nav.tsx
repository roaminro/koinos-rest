'use client'

import { usePathname } from 'next/navigation'
import { FC, ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type ActiveLinkProps = {
  href: string
  children: ReactNode
}

const ActiveLink = ({ href, children }: ActiveLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === href

  const linkClasses = `relative leading-[24px] text-black cursor-pointer [text-decoration:underline] underline-offset-2 ${
    isActive ? 'font-bold ' : ''
  }`

  return (
    <Link href={href} className={linkClasses}>
      {children}
    </Link>
  )
}

type NavProps = {}

const Nav: FC<NavProps> = ({}) => {
  return (
    <section className="w-full h-8 flex flex-row flex-wrap items-center justify-between py-2 px-6 box-border text-left text-orangered">
      <div className="rounded-9xl flex flex-row items-center justify-start gap-[8px]">
        <Image className="rounded-9xl" alt="" src="/frame-10.svg" width={16} height={16} />
        <p className="font-semibold m-0">Koinos Tools</p>
      </div>

      <nav className="w-[149px] flex flex-row items-start justify-end gap-x-[16px] text-xs text-gray-300 font-inter">
        <ActiveLink href="https://wll8.github.io/redoc-try/index.html?openApi=https://koinos-rest.vercel.app/api/swagger">
          Documentation
        </ActiveLink>
        <ActiveLink href="/swagger">API</ActiveLink>
      </nav>
    </section>
  )
}

export default Nav
