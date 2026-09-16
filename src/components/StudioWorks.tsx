import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Play } from 'lucide-react'

const PROJECTS = [
  {
    id: '01',
    title: 'Echoes of Solitude',
    category: 'Feature Film // Direction',
    year: '2026',
    video:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4',
    aspect: 'CinemaScope 2.39:1',
    awards: 'Official Selection // Venice',
  },
  {
    id: '02',
    title: 'Monolith & Horizon',
    category: 'Commercial // Visual Alchemy',
    year: '2025',
    video:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4',
    aspect: '4K ProRes RAW',
    awards: 'Cannes Lions // Craft Gold',
  },
]

export default function StudioWorks() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  return (
    <section id="works" className="relative w-full bg-[#0D0D0D] py-28 text-[#E1E0CC] sm:py-36 md:py-44">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-14">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-12 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.25em] text-primary/70">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span>Selected Portfolio // 2024-2026</span>
            </div>
            <h2 className="mt-4 font-serif text-4xl font-light tracking-tight text-white sm:text-5xl md:text-6xl">
              Architecting Visual <span className="italic font-normal text-primary">Masterpieces</span>
            </h2>
          </div>

          <p className="max-w-md text-xs font-normal leading-relaxed text-neutral-400 sm:text-sm">
            Every project in our atelier is approached as a bespoke piece of art. Explore selected
            films, commercial pieces, and exploratory visual studies.
          </p>
        </div>

        {/* Cinematic Projects Grid */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-20 lg:grid-cols-2">
          {PROJECTS.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/60 transition-all duration-500 hover:border-white/30"
            >
              {/* Media Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <video
                  ref={(el) => (videoRefs.current[idx] = el)}
                  src={project.video}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  autoPlay
                  loop
                  muted
                  playsInline
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Floating Tags */}
                <div className="absolute left-5 top-5 flex items-center gap-2">
                  <span className="rounded-full bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur-md">
                    {project.aspect}
                  </span>
                  <span className="rounded-full bg-primary/20 px-3 py-1 text-[10px] font-medium tracking-wide text-primary backdrop-blur-md">
                    {project.awards}
                  </span>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-black shadow-2xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-0.5 h-6 w-6 fill-current" />
                  </div>
                </div>
              </div>

              {/* Content / Meta */}
              <div className="flex flex-col p-6 sm:p-8">
                <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <h3 className="text-2xl font-medium tracking-tight text-white transition-colors group-hover:text-primary sm:text-3xl">
                    {project.title}
                  </h3>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-black">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
