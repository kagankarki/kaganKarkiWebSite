import { motion } from 'framer-motion'
import { ArrowUpRight, Film, Layers, Sparkles, Wand2 } from 'lucide-react'

const PILLARS = [
  {
    number: '01',
    title: 'Cinematography & Direction',
    icon: Film,
    description:
      'Mastering light, camera movement, and pacing with high-format 8K optical lenses to craft distinct visual identities for cinema, series, and global brands.',
    badge: 'Direction',
  },
  {
    number: '02',
    title: 'Generative & High-End VFX',
    icon: Wand2,
    description:
      'Seamlessly merging practical cinematic photography with procedural simulation, CGI, and neural visual architectures for impossible visual worlds.',
    badge: 'Visual Effects',
  },
  {
    number: '03',
    title: 'Color Grading & Pacing',
    icon: Layers,
    description:
      'Bespoke color pipelines calibrated to emotion and narrative intent, ensuring breathtaking fidelity across HDR cinema projection and digital devices.',
    badge: 'Post-Production',
  },
  {
    number: '04',
    title: 'Spatial Sound & Score',
    icon: Sparkles,
    description:
      'Immersive multi-channel acoustics and tailored cinematic scoring designed to evoke physical sensation and deep emotional resonance.',
    badge: 'Acoustics',
  },
]

const METRICS = [
  { value: '240+', label: 'Produced Cuts & Films' },
  { value: '18', label: 'International Festival Laurels' },
  { value: '4K/8K', label: 'Native Master Pipeline' },
  { value: '100%', label: 'Craft Obsession' },
]

export default function StudioManifesto() {
  return (
    <section id="manifesto" className="relative w-full bg-white text-[#0A0A0A] selection:bg-black selection:text-white">
      {/* Container starting on pure white */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32 md:px-14 md:py-40">
        {/* Section Header / Tag */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2.5 text-xs font-mono font-semibold uppercase tracking-[0.25em] text-neutral-500">
              <span className="h-2 w-2 rounded-full bg-black" />
              <span>Inside The Frame // Manifesto</span>
            </div>

            <h2 className="max-w-3xl font-serif text-4xl font-normal leading-[1.05] tracking-tight text-neutral-900 sm:text-5xl md:text-6xl lg:text-7xl">
              We translate raw human emotion into <span className="italic font-light">timeless cinema</span>.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md text-sm font-normal leading-relaxed text-neutral-600 sm:text-base"
          >
            Prisma operates at the intersection of classical auteur filmmaking and next-generation
            computational visual arts. Every frame is calculated for depth, every cut tuned for
            visceral momentum.
          </motion.p>
        </div>

        {/* Studio Pillars Grid */}
        <div className="mt-20 grid grid-cols-1 gap-6 sm:mt-24 sm:grid-cols-2 lg:mt-32 lg:grid-cols-4">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-neutral-50/80 p-8 transition-all duration-300 hover:border-black hover:bg-neutral-900 hover:text-white"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-neutral-400">
                    <span>{pillar.number}</span>
                    <span className="rounded-full bg-neutral-200/80 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-neutral-700 group-hover:bg-neutral-800 group-hover:text-neutral-300">
                      {pillar.badge}
                    </span>
                  </div>

                  <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-200/60 text-neutral-900 transition-colors duration-300 group-hover:bg-neutral-800 group-hover:text-white">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>

                  <h3 className="mt-6 text-xl font-medium tracking-tight text-neutral-900 group-hover:text-white">
                    {pillar.title}
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-neutral-600 group-hover:text-neutral-400 sm:text-sm">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-200/60 group-hover:border-neutral-800 flex items-center justify-between">
                  <span className="text-xs font-medium tracking-wide text-neutral-500 group-hover:text-neutral-400">
                    Discover Discipline
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-neutral-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Impact Numbers Matrix */}
        <div className="mt-20 rounded-3xl bg-neutral-900 px-8 py-14 text-white sm:mt-28 sm:px-14 sm:py-20">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {METRICS.map((metric, idx) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-col"
              >
                <span className="font-serif text-4xl font-normal text-[#E1E0CC] sm:text-5xl md:text-6xl">
                  {metric.value}
                </span>
                <span className="mt-2 text-xs uppercase tracking-widest text-neutral-400 sm:text-sm">
                  {metric.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
