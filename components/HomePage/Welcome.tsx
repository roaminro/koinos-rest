import { FC } from 'react'
import { TypingText } from './Typing'

type WelcomeProps = { optClassName?: string }

const Welcome: FC<WelcomeProps> = ({ optClassName }) => {
  return (
    <section
      className={`relative w-full h-[100dvh] flex flex-col md:flex-row items-start justify-center text-center text-21xl text-whitesmoke-100 font-satoshi ${optClassName}`}
    >
      <div className="self-stretch bg-orangered w-full h-[50vh] md:w-[50vw] md:h-[100dvh] flex flex-row items-center justify-center p-4 box-border">
        <div className="self-stretch relative font-black flex items-center justify-center w-[480px] shrink-0 md:leading-[8vh] md:text-[60px]">
          <b>
            <p className="leading-[3.5vh]">{`Welcome to the `}</p>
            <p className="leading-[3.5vh]">{`Future `}</p>
            <p className="leading-[3.5vh]">of Blockchain</p>
            <p className="leading-[3.5vh]">Development</p>
          </b>
        </div>
      </div>

      <div className="w-full h-[50vh] md:w-[50vw] md:h-[100dvh] flex flex-row items-center justify-center py-4 px-8 box-border text-center md:text-left text-base md:text-xl text-gray-100">
        <span className="">
          <p className="m-0 text-gray-500 leading-[5vh] md:w-[480px]">
            {`Embark on a journey of innovation and efficiency with our suite of developer tools,
              expertly crafted for the Koinos blockchain. Whether you're an experienced blockchain
              developer or new to the field, our tools are designed to streamline your development
              process on this cutting-edge platform.`}
          </p>

          {/* <TypingText
            title={`Embark on a journey of innovation and efficiency with our suite of developer tools,
              expertly crafted for the Koinos blockchain. Whether you're an experienced blockchain
              developer or new to the field, our tools are designed to streamline your development
              process on this cutting-edge platform.`}
            textStyles="m-0 text-gray-500 leading-[5vh] md:w-[480px]"
          /> */}
        </span>
      </div>
    </section>
  )
}

export default Welcome
