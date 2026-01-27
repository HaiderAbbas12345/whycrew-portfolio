import Header from '@/components/header'
import Hero from '@/components/hero'
import Services from '@/components/services'
import Process from '@/components/process'
import Portfolio from '@/components/portfolio'
import Expertise from '@/components/expertise'
import Leadership from '@/components/leadership'
import Contact from '@/components/contact'
import Footer from '@/components/footer'
import StructuredData from '@/components/structured-data'

export default function Home() {
  return (
    <>
      <StructuredData />
      <main className="min-h-screen">
        <Header />
        <Hero />
        <Services />
        <Process />
        <Portfolio />
        <Expertise />
        <Leadership />
        <Contact />
        <Footer />
      </main>
    </>
  )
}