import { useState } from 'react'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import Hero from './components/Hero'
import StudioManifesto from './components/StudioManifesto'
import StudioWorks from './components/StudioWorks'
import StudioContact from './components/StudioContact'

export default function App() {
  const [loadProgress, setLoadProgress] = useState(0)
  const [preloaderComplete, setPreloaderComplete] = useState(false)

  return (
    <>
      {/* Interactive custom cursor with trailing spring physics */}
      <CustomCursor />

      {/* Cinematic intro preloader */}
      {!preloaderComplete && (
        <Preloader
          progress={loadProgress}
          onComplete={() => setPreloaderComplete(true)}
        />
      )}

      {/* Main Website Flow */}
      <main className="bg-black text-[#E1E0CC]">
        {/* 1. Hero scroll frame scrub: ends on pure white */}
        <Hero onProgress={setLoadProgress} />

        {/* 2. Studio Manifesto: starts seamlessly on pure white */}
        <StudioManifesto />

        {/* 3. Selected Cinematic Works */}
        <StudioWorks />

        {/* 4. Atelier Contact & Collaboration Portal */}
        <StudioContact />
      </main>
    </>
  )
}
