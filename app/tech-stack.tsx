"use client"
import { useState, useRef, useEffect } from "react"
import FadeDown from "@/components/animations/FadeDown"
import FadeUp from "@/components/animations/FadeUp"

function TechIcon({ name, src }: { name: string; src?: string }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className="w-full h-full flex items-center justify-center font-bold text-xl bg-thirdary/50 rounded-lg">
        {name.charAt(0)}
      </div>
    )
  }

  if (src.startsWith("<")) {
    return <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: src }} />
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      className="w-full h-full tech-icon-img"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

function CategoryTechList({ category, categoryIdx }: { category: typeof techCategories[0]; categoryIdx: number }) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateArrows = () => {
    const el = sliderRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  useEffect(() => {
    updateArrows()
    window.addEventListener("resize", updateArrows)
    return () => window.removeEventListener("resize", updateArrows)
  }, [])

  const scrollSlider = (direction: 1 | -1) => {
    const el = sliderRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>("[data-tech-card]")
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.7
    el.scrollBy({ left: direction * step, behavior: "smooth" })
  }

  const arrowClass =
    "p-2 border border-text-secondary/20 rounded-full text-text-primary hover:bg-text-primary hover:text-background hover:border-text-primary transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-start w-full">
      {/* Category Header & Mobile Arrow Controls */}
      <div className="md:w-1/3 flex items-center justify-between w-full">
        <FadeDown delay={categoryIdx * 0.1}>
          <h4 className="text-2xl font-black text-text-primary tracking-tight mb-2">{category.title}</h4>
          <p className="text-text-secondary font-medium text-sm">{category.description}</p>
        </FadeDown>

        {/* Navigation arrows for Mobile */}
        <div className="flex gap-2 flex-shrink-0 md:hidden">
          <button aria-label="Sebelumnya" disabled={!canPrev} onClick={() => scrollSlider(-1)} className={arrowClass}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button aria-label="Berikutnya" disabled={!canNext} onClick={() => scrollSlider(1)} className={arrowClass}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Swipeable Container on Mobile, Grid on Desktop */}
      <div className="md:w-2/3 w-full">
        <div
          ref={sliderRef}
          onScroll={updateArrows}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:snap-none md:pb-0"
        >
          {category.technologies.map((tech, techIdx) => (
            <div
              key={techIdx}
              data-tech-card
              className="w-[140px] sm:w-[160px] flex-shrink-0 snap-start md:w-auto md:flex-shrink"
            >
              <FadeUp delay={categoryIdx * 0.1 + techIdx * 0.05}>
                <div className="group flex flex-col items-center justify-center p-6 bg-thirdary/20 hover:bg-thirdary/50 border border-text-secondary/10 hover:border-text-primary/50 rounded-2xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className="w-12 h-12 mb-4 transition-colors flex items-center justify-center pointer-events-none">
                    <TechIcon name={tech.name} src={tech.svg} />
                  </div>
                  <span className="text-sm font-bold text-text-primary text-center">{tech.name}</span>
                </div>
              </FadeUp>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function TechStack() {
  return (
    <section id="techstack" className="w-full max-w-7xl mx-auto py-24 md:py-32 cursor-default bg-background relative border-t border-text-secondary/10 overflow-hidden">
      <FadeDown>
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24 w-full text-left">
          <h2 className="text-sm font-bold tracking-[0.2em] text-text-secondary uppercase mb-4">Skills & Tools</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tighter">My Tech Stack</h3>
        </div>
      </FadeDown>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16">
        {techCategories.map((category, idx) => (
          <CategoryTechList key={idx} category={category} categoryIdx={idx} />
        ))}
      </div>
    </section>
  )
}

// Ikon baru diambil dari CDN Devicon (tanpa perlu diunduh)
const dv = (name: string, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${name}/${name}-${variant}.svg`

const techCategories = [
  {
    title: "Frontend",
    description: "Languages and libraries for building the user interface.",
    technologies: [
      { name: "HTML5", svg: "/icons/html.svg" },
      { name: "CSS3", svg: "/icons/css.svg" },
      { name: "JavaScript", svg: dv("javascript") },
      { name: "React.js", svg: "/icons/react.svg" },
      { name: "Next.js", svg: "/icons/nextjs.svg" },
      { name: "Tailwind CSS", svg: "/icons/tailwindcss.svg" },
      { name: "Bootstrap", svg: dv("bootstrap") },
    ],
  },
  {
    title: "Backend & Database",
    description: "Server-side frameworks and data storage.",
    technologies: [
      { name: "PHP", svg: dv("php") },
      { name: "Laravel", svg: "/icons/laravel.svg" },
      { name: "Node.js", svg: "/icons/nodejs.svg" },
      { name: "MySQL", svg: "/icons/mysql.svg" },
      { name: "Firebase", svg: dv("firebase", "plain") },
    ],
  },
  {
    title: "Tools & Infrastructure",
    description: "Version control, containers, and deployment.",
    technologies: [
      { name: "Git", svg: "/icons/git.svg" },
      { name: "GitHub", svg: "/icons/github.svg" },
      { name: "Docker", svg: "/icons/docker.svg" },
      { name: "Linux", svg: "/icons/linux.svg" },
      { name: "Nginx", svg: "/icons/nginx.svg" },
    ],
  },
  {
    title: "Programming & Mobile",
    description: "Other languages and platforms I have worked with.",
    technologies: [
      { name: "Python", svg: dv("python") },
      { name: "Java", svg: dv("java") },
      { name: "Android Studio", svg: dv("androidstudio", "plain") },
    ],
  },
  {
    title: "UI/UX & Graphic Design",
    description: "Interface design, logos, posters, flyers, and banners.",
    technologies: [
      { name: "Figma", svg: dv("figma") },
      { name: "Adobe Illustrator", svg: dv("illustrator", "plain") },
      { name: "Adobe Photoshop", svg: dv("photoshop", "plain") },
      { name: "CorelDRAW", svg: "" },
      { name: "Affinity", svg: "" },
      { name: "Inkscape", svg: dv("inkscape") },
      { name: "Canva", svg: dv("canva") },
    ],
  },
  {
    title: "3D & Video",
    description: "3D logos, motion graphics, and video editing.",
    technologies: [
      { name: "Blender", svg: dv("blender") },
      { name: "Adobe Premiere Pro", svg: dv("premierepro", "plain") },
      { name: "CapCut", svg: "" },
    ],
  },
]