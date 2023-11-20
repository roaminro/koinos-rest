import About from '@/components/HomePage/About'
import Footer from '@/components/HomePage/Footer'
import Header from '@/components/HomePage/Header'
import Leveraging from '@/components/HomePage/Leveraging'
import Nav from '@/components/HomePage/Nav'
import Welcome from '@/components/HomePage/Welcome'


export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-start bg-whitesmoke-200 w-full h-full overflow-hidden pt-4 box-border font-clash-display">
      <Nav />
      <Header />
      <Welcome />
      <Leveraging />
      <About />
      <Footer />
    </main>
  )
}
