import Link from 'next/link'
import { FC } from 'react'

type AboutProps = { optClassName?: string }

const About: FC<AboutProps> = ({ optClassName }) => {
  return (
    <section
      className={`relative w-full h-[100dvh] flex flex-col md:flex-row items-start justify-center text-center text-21xl text-white font-satoshi ${optClassName}`}
    >
      <div className="self-stretch bg-orangered w-full h-[50vh] md:w-[50vw] md:h-[100dvh] flex flex-row items-center justify-center p-4 box-border">
        <b className="self-stretch relative flex items-center justify-center md:w-[480px] shrink-0 md:text-29xl">{`About Koinos `}</b>
      </div>

      <div className="w-full h-[50vh] md:w-[50vw] md:h-[100dvh] flex flex-row items-start justify-center py-4 px-8 box-border text-center md:text-left text-base md:text-xl text-gray-400">
        <div className="self-stretch flex-1 relative flex items-center justify-center">
          <span className="md:w-[480px]">
            <p className="m-0 leading-[3.5vh]">
              <span>
                <b className="font-satoshi">{`Koinos `}</b>
                <span>
                  is a revolutionary blockchain designed to offer unparalleled flexibility and
                  scalability. It stands out in the blockchain landscape for several key reasons:
                </span>
              </span>
            </p>
            <p className="m-0 leading-[5vh]">
              <span>
                <span>&nbsp;</span>
              </span>
            </p>
            <p className="m-0 leading-[5vh]">
              <span>
                <b>Modular Upgradeability</b>
              </span>
            </p>
            <p className="m-0 leading-[5vh]">
              <span>
                <b>{`High-Performance Infrastructure `}</b>
              </span>
            </p>
            <p className="m-0 leading-[5vh]">
              <span>
                <b>Decentralized Governance</b>
              </span>
            </p>
            <p className="m-0 leading-[5vh]">
              <span>
                <span>{`Visit the Koinos website `}</span>
              </span>
              <Link href="https://koinos.io" className="text-chocolate no-underline">
                https://koinos.io
              </Link>
            </p>
          </span>
        </div>
      </div>
    </section>
  )
}

export default About
