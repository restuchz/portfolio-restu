"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import FadeDown from "@/components/animations/FadeDown"
import FadeUp from "@/components/animations/FadeUp"
import GlareHover from "@/components/GlareHover"

interface ProjectItem {
  index: number
  gradient: string // dipakai kalau belum ada thumbnail
  image?: string // thumbnail, simpan di public/projects/namafile.png
  category: string
  title: string
  shortDescription: string
  createdAt?: string
  features: string[]
  tech: string[]
  githubUrl?: string
  demoUrl?: string
  demoLabel?: string
}

const ExternalIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
)

const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 015.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
  </svg>
)

const iconLinkClass =
  "p-2 border border-text-secondary/20 rounded-full text-text-secondary hover:text-background hover:bg-text-primary hover:border-text-primary transition-all duration-300"

function ProjectCard({ project, onOpen }: { project: ProjectItem; onOpen: (index: number) => void }) {
  return (
    <GlareHover className="group flex flex-col h-full bg-background border border-text-secondary/20 hover:border-text-primary/50 rounded-xl overflow-hidden transition-all duration-500 shadow-sm hover:shadow-2xl">
      {/* Cover: thumbnail kalau ada, gradient kalau belum */}
      <div className="relative overflow-hidden aspect-[16/10] border-b border-text-secondary/10 bg-black/40">
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <>
            <div className={`absolute inset-0 ${project.gradient} transition-transform duration-700 group-hover:scale-110`} />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-12 -right-8 w-48 h-48 rounded-full bg-black/40 blur-3xl" />
            <div className="absolute inset-0 flex items-center justify-center text-white/30 text-3xl md:text-4xl font-black uppercase tracking-widest select-none pointer-events-none z-10">
              {project.category}
            </div>
          </>
        )}

        {/* Tech Stack Overlay */}
        {project.tech.length > 0 && (
          <div className="absolute top-4 right-4 flex flex-wrap gap-2 justify-end z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-[-10px] group-hover:translate-y-0">
            {project.tech.slice(0, 3).map((tech, i) => (
              <span key={i} className="text-[10px] font-bold bg-background/90 text-text-primary px-2 py-1 rounded backdrop-blur-md border border-text-secondary/20 uppercase tracking-widest shadow-sm">
                {tech}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-[10px] font-bold bg-background/90 text-text-primary px-2 py-1 rounded backdrop-blur-md border border-text-secondary/20 uppercase tracking-widest shadow-sm">
                +{project.tech.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-grow relative">
        {/* Numbering */}
        <div className="absolute top-0 right-6 -translate-y-1/2 bg-background border border-text-secondary/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-text-secondary shadow-sm">
          {String(project.index + 1).padStart(2, "0")}
        </div>

        <div className="flex justify-between items-start mb-4">
          <h4 className="text-2xl font-black text-text-primary tracking-tight leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-text-primary group-hover:to-text-secondary transition-all duration-500">
            {project.title}
          </h4>
        </div>

        <p className="text-sm text-text-secondary font-medium leading-relaxed mb-8 flex-grow line-clamp-3">{project.shortDescription}</p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-text-secondary/10">
          <button className="text-xs font-bold tracking-[0.2em] uppercase text-text-primary flex items-center gap-3 group/btn cursor-pointer" onClick={() => onOpen(project.index)}>
            View Details
            <span className="w-8 h-[2px] bg-text-primary group-hover/btn:w-12 transition-all duration-300"></span>
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="Repository" className={iconLinkClass}>
                <GithubIcon />
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label={project.demoLabel ?? "Live Demo"} className={iconLinkClass}>
                <ExternalIcon />
              </a>
            )}
          </div>
        </div>
      </div>
    </GlareHover>
  )
}

export default function Project() {
  const [isOpen, setIsOpen] = useState<number | null>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

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
    const card = el.querySelector<HTMLElement>("[data-card]")
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8
    el.scrollBy({ left: direction * step, behavior: "smooth" })
  }

  const activeProject = projectList.find((p) => p.index === isOpen)

  const arrowClass =
    "p-3 border border-text-secondary/20 rounded-full text-text-primary hover:bg-text-primary hover:text-background hover:border-text-primary transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"

  return (
    <>
      <section id="projects" className="w-full max-w-7xl mx-auto py-24 md:py-32 cursor-default bg-background relative border-t border-text-secondary/10">
        <FadeDown>
          <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 md:mb-16 w-full flex items-end justify-between gap-6">
            <div className="text-left">
              <h2 className="text-sm font-bold tracking-[0.2em] text-text-secondary uppercase mb-4">Portfolio</h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tighter">Selected Works</h3>
            </div>

            {/* Tombol geser kiri & kanan */}
            <div className="flex gap-3 flex-shrink-0 lg:hidden">
              <button aria-label="Sebelumnya" disabled={!canPrev} onClick={() => scrollSlider(-1)} className={arrowClass}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button aria-label="Berikutnya" disabled={!canNext} onClick={() => scrollSlider(1)} className={arrowClass}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </FadeDown>

        {/* Slider manual: geser dengan jari/mouse atau pakai tombol panah */}
        <FadeUp>
          <div
            ref={sliderRef}
            onScroll={updateArrows}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 md:px-12 scroll-pl-6 md:scroll-pl-12 pt-4 pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:snap-none lg:pb-4"
          >
            {projectList.map((project) => (
              <div key={project.index} data-card className="w-[85vw] sm:w-[400px] flex-shrink-0 snap-start flex lg:w-auto lg:flex-shrink">
                <ProjectCard project={project} onOpen={setIsOpen} />
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp>
          <div className="mt-12 flex justify-center w-full px-6">
            <a href="https://padlet.com/resturhmn/portfolio" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-background border border-text-secondary/20 text-text-primary hover:border-text-primary hover:bg-text-primary hover:text-background rounded-xl font-bold tracking-widest text-sm uppercase transition-all duration-300 ease-out group hover:-translate-y-1.5 hover:scale-[1.02] shadow-sm hover:shadow-xl">
              <span>View More Work</span>
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </FadeUp>

        <AnimatePresence>
          {isOpen !== null && activeProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              {/* Backdrop */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 bg-background/90 backdrop-blur-md" onClick={() => setIsOpen(null)} />

              {/* Modal Container */}
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="bg-background border border-text-secondary/20 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative z-10">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-text-secondary/10">
                  <h4 className="text-2xl font-black text-text-primary tracking-tight pr-4">{activeProject.title}</h4>
                  <button className="text-text-secondary hover:text-text-primary transition-colors p-2 bg-text-secondary/5 rounded-full cursor-pointer" onClick={() => setIsOpen(null)}>
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 md:p-8 overflow-y-auto flex-grow custom-scrollbar">
                  {(activeProject.createdAt || activeProject.tech.length > 0) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10 pb-8 border-b border-text-secondary/10">
                      {activeProject.createdAt && (
                        <div>
                          <span className="text-xs font-bold tracking-widest text-text-secondary uppercase block mb-3">Created</span>
                          <span className="text-sm font-bold bg-thirdary text-text-primary px-3 py-1.5 rounded-lg border border-text-secondary/10">{activeProject.createdAt}</span>
                        </div>
                      )}
                      {activeProject.tech.length > 0 && (
                        <div>
                          <span className="text-xs font-bold tracking-widest text-text-secondary uppercase block mb-3">Technologies</span>
                          <div className="flex flex-wrap gap-2">
                            {activeProject.tech.map((tech, i) => (
                              <span key={i} className="text-xs font-bold bg-thirdary text-text-primary px-3 py-1.5 rounded-lg border border-text-secondary/10 uppercase tracking-wider">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <span className="text-xs font-bold tracking-widest text-text-secondary uppercase block mb-5">Key Features</span>
                    <ul className="space-y-4">
                      {activeProject.features.map((feature, i) => (
                        <li key={i} className="flex items-center bg-thirdary/50 p-4 rounded-xl border border-text-secondary/5">
                          <span className="text-text-primary mr-3 font-black">&rarr;</span>
                          <span className="text-sm font-bold text-text-primary uppercase tracking-wide">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Modal Footer (hanya muncul kalau ada link) */}
                {(activeProject.demoUrl || activeProject.githubUrl) && (
                  <div className="p-6 border-t border-text-secondary/10 flex flex-col sm:flex-row gap-4 bg-background">
                    {activeProject.demoUrl && (
                      <a href={activeProject.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center font-bold text-sm tracking-widest uppercase bg-text-primary text-background py-4 rounded-xl hover:-translate-y-1 transition-transform duration-300">
                        {activeProject.demoLabel ?? "Live Demo"}
                      </a>
                    )}
                    {activeProject.githubUrl && (
                      <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center gap-2 text-center font-bold text-sm tracking-widest uppercase border-2 border-text-secondary/20 text-text-primary hover:border-text-primary hover:-translate-y-1 transition-all duration-300 py-4 rounded-xl">
                        Source Code
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </>
  )
}

const projectList: ProjectItem[] = [
  {
    index: 0,
    gradient: "bg-linear-to-br from-violet-950 via-purple-950 to-indigo-950 opacity-60",
    image: "/images/learnbootstrap.jpg",
    category: "Web",
    title: "Website Media Pembelajaran Bootstrap",
    shortDescription: "Website media pembelajaran materi framework CSS Bootstrap dengan model tutorial, dilengkapi gamifikasi, autentikasi pengguna, dan fitur CRUD. Dibuat sebagai Tugas Akhir.",
    createdAt: "Juli 2026",
    features: ["Modul Pembelajaran & Materi Edukatif", "CRUD Pengelolaan Data", "Gamifikasi: Points, Badges, Leaderboard", "Feedback, Progress Belajar & Sertifikat", "Autentikasi Pengguna"],
    tech: ["PHP", "Laravel", "MySQL", "CSS", "JavaScript"],
    githubUrl: "",
    demoUrl: "https://learn-bootstrap.research-media.web.id/",
  },
  {
    index: 1,
    gradient: "bg-linear-to-br from-sky-950 via-blue-950 to-indigo-950 opacity-60",
    image: "/images/pengaduan.jpg",
    category: "Web",
    title: "Website Pengaduan Mahasiswa",
    shortDescription: "Website pengaduan mahasiswa yang dibangun dengan Laravel dan MySQL, dengan antarmuka interaktif dan autentikasi pengguna. Project Mata Kuliah Pemrograman Website 2.",
    createdAt: "Mei 2024",
    features: ["Struktur Website dengan Laravel", "Antarmuka Interaktif", "Autentikasi Pengguna"],
    tech: ["PHP", "Laravel", "MySQL", "CSS", "JavaScript"],
    githubUrl: "https://github.com/restuchz/project-pengaduan",
    demoUrl: "",
  },
  {
    index: 2,
    gradient: "bg-linear-to-br from-teal-950 via-emerald-950 to-green-950 opacity-60",
    image: "/images/funlearn.jpg",
    category: "Web",
    title: "FunLearn: Website Belajar Komputer",
    shortDescription: "Website belajar komputer berisi kumpulan materi dan kuis dengan sistem peringkat. Project Mata Kuliah Proyek Perangkat Lunak.",
    features: ["Kumpulan Materi Belajar Komputer", "Kuis", "Sistem Peringkat (Rank)"],
    tech: [], // isi sesuai teknologi yang kamu pakai
    githubUrl: "https://github.com/restuchz/project-funlearn",
    demoUrl: "/images/",
  },
  {
    index: 3,
    gradient: "bg-linear-to-br from-amber-950 via-orange-950 to-red-950 opacity-60",
    image: "/images/agenda.png",
    category: "Web",
    title: "Aplikasi Agenda Berbasis Website",
    shortDescription: "Website agenda dengan penyimpanan data menggunakan Firebase, dikerjakan dalam tim tiga orang. Project Mata Kuliah Pemrograman Web 1 dengan nilai akhir A.",
    createdAt: "Juni 2023",
    features: ["Penyimpanan Data dengan Firebase", "Antarmuka Interaktif", "Dikerjakan dalam Tim 3 Orang"],
    tech: ["HTML", "CSS", "JavaScript", "Firebase"],
    githubUrl: "https://github.com/restuchz/Project-AgendaBerbasisWebsite",
    demoUrl: "",
  },
  {
    index: 4,
    gradient: "bg-linear-to-br from-emerald-950 via-teal-950 to-cyan-950 opacity-60",
    image: "/images/kmeans.png",
    category: "Data",
    title: "Clustering Iris dengan K-Means",
    shortDescription: "Pengelompokan 150 sampel bunga Iris ke dalam 3 cluster dengan algoritma K-Means, lengkap dengan visualisasi dan evaluasi hasil. Project Mata Kuliah Sains Data.",
    createdAt: "November 2025",
    features: ["K-Means pada 150 Sampel ke 3 Cluster", "Visualisasi Scatter Plot", "Perhitungan Manual Euclidean Distance & Centroid", "Evaluasi Confusion Matrix, Precision, Recall", "Akurasi 88,6%"],
    tech: ["Python", "scikit-learn"],
    githubUrl: "",
    demoUrl: "https://colab.research.google.com/drive/1tCSKeDQ5HH8cB-jIbE2KOQXke_UWywS8",
    demoLabel: "Buka di Google Colab",
  },
  {
    index: 5,
    gradient: "bg-linear-to-br from-fuchsia-950 via-pink-950 to-rose-950 opacity-60",
    image: "/images/logo1.png",
    category: "3D",
    title: "3D Logo Design, Motion Graphic, Design Graphic",
    shortDescription: "Perancangan logo 3D dan Graphic Design untuk kebutuhan branding klien, mulai dari bentuk, pencahayaan, hingga efek material. Project freelance berbayar.",
    createdAt: "2026",
    features: ["Logo 3D untuk Branding Klien", "Pencahayaan & Efek Material", "Motion Graphic pada Logo 3D"],
    tech: ["Blender", "3D Design", "Motion Graphic", "Graphic Design"],
    githubUrl: "",
    demoUrl: "https://padlet.com/resturhmn/portfolio",
    demoLabel: "Lihat Portofolio",
  },
]