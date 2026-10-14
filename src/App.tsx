import { useState } from 'react'
import SmoothScroll from './components/SmoothScroll'
import Cursor from './components/Cursor'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import ScreenDive from './components/ScreenDive'
import About from './components/About'
import LogoMarquee from './components/LogoMarquee'
import GaziSpotlight from './components/GaziSpotlight'
import Projects from './components/Projects'
import Ventures from './components/Ventures'
import Helix from './components/Helix'
import Contact from './components/Contact'

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <>
      <SmoothScroll />
      <Cursor />
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <Nav />

      <main>
        <Hero ready={ready} />
        <ScreenDive ready={ready} />
        <About />
        <LogoMarquee />
        <GaziSpotlight />
        <Projects />
        <Ventures />
        <Helix />
        <Contact />
      </main>
    </>
  )
}
