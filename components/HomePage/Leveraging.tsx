import { FC } from 'react'

type LeveragingProps = { optClassName?: string }

const Leveraging: FC<LeveragingProps> = ({ optClassName }) => {
  return (
    <section
      className={`relative w-full h-[100dvh] flex flex-col md:flex-row items-start justify-center text-left text-gray-500 font-satoshi ${optClassName}`}
    >
      <div className="w-full h-[50vh] md:w-[50vw] md:h-[100dvh] flex flex-row items-center justify-center py-4 px-8 box-border order-last md:order-first">
        <div className="self-stretch flex-1 relative flex items-center justify-center">
          <span className="md:w-[480px] text-[14px] md:text-xl md:leading-[3.5vh]">
            <p className="m-0">
              {`By utilizing our tools on Koinos, developers gain access to a robust, scalable, and
              user-centric blockchain environment. Our tools are designed to complement Koinos's
              unique features, making it easier than ever to:`}
            </p>
            <ul className="m-0">
              <li className="md:leading-6 pt-4 pb-2">
                Create and deploy smart contracts with minimal effort.
              </li>
              <li className="md:leading-6 py-2">
                Develop applications that benefit from fee-less transactions, attracting a broader
                user base.
              </li>
              <li className="md:leading-6 pt-2">
                {`Stay ahead of the curve in blockchain technology, thanks to Koinos's modular
                upgradeability.`}
              </li>
            </ul>
          </span>
        </div>
      </div>

      <div className="self-stretch bg-orangered w-full h-[50vh] md:w-[50vw] md:h-[100dvh] flex flex-row items-center justify-center p-4 box-border text-center text-21xl text-white font-satoshi">
        <div className="self-stretch relative flex items-center shrink-0">
          <span className="w-full md:leading-[10vh] md:text-29xl">
            <p className="m-0">
              <b className="font-satoshi">Leveraging</b>
              <span>{` `}</span>
            </p>
            <p className="m-0">{`Koinos for `}</p>
            <p className="m-0">Your Projects</p>
          </span>
        </div>
      </div>
    </section>
  )
}

export default Leveraging
