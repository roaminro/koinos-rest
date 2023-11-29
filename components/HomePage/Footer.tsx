import { FC } from 'react'

type FooterProps = { optClassName?: string }

const Footer: FC<FooterProps> = ({ optClassName }) => {
  return (
    <section
      className={`bg-gray-200 w-full h-[100dvh] flex flex-row items-center justify-center py-4 px-8 box-border text-left text-xs md:text-xl text-white font-satoshi ${optClassName}`}
    >
      <footer className="relative leading-[4vh] md:leading-[5vh] md:w-[50vw]">
        <p className="m-0 text-xl md:text-5xl md:pb-4">
          <b>Key Features</b>
        </p>

        <div className="py-4">
          <p className="m-0">
            <span>
              <span>1. REST API - Simplified Interactions</span>
            </span>
          </p>
          <ul className="m-0 pl-[27px]">
            <li className="mb-0">
              <span>
                <span>
                  Effortless Integration: Quick setup to connect your applications with Koinos.
                </span>
              </span>
            </li>
            <li className="mb-0">
              <span>
                <span>
                  Comprehensive Documentation: Detailed guides and examples to kickstart your
                  development.
                </span>
              </span>
            </li>
            <li className="mb-0">
              <span>
                <span>Real-Time Data Access: Fetch blockchain data with ease and reliability.</span>
              </span>
            </li>
          </ul>
        </div>
      </footer>
    </section>
  )
}

export default Footer
