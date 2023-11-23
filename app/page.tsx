// 'use client'

import About from '@/components/HomePage/About'
import Footer from '@/components/HomePage/Footer'
import Header from '@/components/HomePage/Header'
import Leveraging from '@/components/HomePage/Leveraging'
import Nav from '@/components/HomePage/Nav'
import Welcome from '@/components/HomePage/Welcome'

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-start bg-whitesmoke-200 w-full h-full overflow-hidden pt-4 box-border font-clash-display snap-container no-scrollbar">
      {/* <ReactFullpage
        scrollingSpeed={1000}
        render={({}) => {
          return (
            <ReactFullpage.Wrapper>
              <div className="section">
                <Nav />
                <Header />
              </div>
              <div className="section">
                <Welcome />
              </div>
              <div className="section">
                <Leveraging />
              </div>
              <div className="section">
                <About />
              </div>
              <div className="section">
                <Footer />
              </div>
            </ReactFullpage.Wrapper>
          )
        }}
      /> */}

      <Nav />
      <Header />
      <Welcome />
      <Leveraging />
      <About />
      <Footer />

      {/* <Nav />
        <Header optClassName="child" />
        <Welcome optClassName="child" />
        <Leveraging optClassName="child" />
        <About optClassName="child" />
        <Footer optClassName="child" /> */}

      {/* <div className="snap-start">
        <Nav />
      </div>
      <div className="snap-start">
        <Header />
      </div>
      <div className="snap-start">
        <Welcome />
      </div>
      <div className="snap-start">
        <Leveraging />
      </div>
      <div className="snap-start">
        <About />
      </div>
      <div className="snap-start">
        <Footer />
      </div> */}
    </main>
  )
}
