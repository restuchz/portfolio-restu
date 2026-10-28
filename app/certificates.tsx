"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import FadeDown from "@/components/animations/FadeDown"
import FadeUp from "@/components/animations/FadeUp"
import GlareHover from "@/components/GlareHover"

interface CertificateItem {
  index: number
  category: "BNSP" | "Pelatihan" | "Juara"
  title: string
  issuer: string
  date: string
  description: string
  credentialId?: string
  image: string // Path ke foto sertifikat (JPG/PNG) di folder public
  pdfUrl?: string // Optional: path ke file PDF asli jika ada
}

export default function Certificates() {
  const [isOpen, setIsOpen] = useState<number | null>(null)

  // Prevent scrolling ketika modal preview terbuka
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

  const activeCert = certificateList.find((c) => c.index === isOpen)

  return (
    <section id="certificates" className="w-full max-w-7xl mx-auto py-24 md:py-32 cursor-default bg-background relative border-t border-text-secondary/10">
      
      {/* Header Section */}
      <FadeDown>
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24 w-full text-left">
          <h2 className="text-sm font-bold tracking-[0.2em] text-text-secondary uppercase mb-4">
            Credentials
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tighter">
            Licenses & Awards
          </h3>
        </div>
      </FadeDown>

      {/* Grid Sertifikat */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-12">
        {certificateList.map((cert) => (
          <FadeUp key={`cert-${cert.index}`}>
            <GlareHover className="group flex flex-col h-full bg-background border border-text-secondary/20 hover:border-text-primary/50 rounded-xl overflow-hidden transition-all duration-500 shadow-sm hover:shadow-2xl">
              
              {/* Thumbnail dengan Foto Sertifikat + Gradient Transparan Elegan */}
              <div 
                onClick={() => setIsOpen(cert.index)}
                className="relative overflow-hidden aspect-[16/11] border-b border-text-secondary/10 bg-background cursor-pointer group/img"
              >
                {/* Foto Sertifikat sebagai Background */}
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-110"
                  loading="lazy"
                />

                {/* Layer Gradient Overlay Transparan (Mewah & Estetik) */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover/img:opacity-50 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-white/10 mix-blend-overlay" />

                {/* Badge Kategori Atas */}
                <div className="absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase bg-background/80 text-text-primary px-2.5 py-1 rounded-md backdrop-blur-md border border-text-secondary/20 shadow-sm z-10">
                  {cert.category}
                </div>

                {/* Nama Issuer di Tengah Thumbnail */}
                <div className="absolute inset-x-4 bottom-3 z-10">
                  <span className="text-xs font-black text-text-primary tracking-tight line-clamp-1 drop-shadow-md">
                    {cert.issuer}
                  </span>
                </div>
              </div>

              {/* Konten Bawah Card */}
              <div className="p-6 flex flex-col flex-grow relative">
                {/* Nomor Urut */}
                <div className="absolute top-0 right-6 -translate-y-1/2 bg-background border border-text-secondary/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-text-secondary shadow-sm">
                  {String(cert.index + 1).padStart(2, "0")}
                </div>

                <h5 className="text-lg font-black text-text-primary tracking-tight leading-snug mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-text-primary group-hover:to-text-secondary transition-all">
                  {cert.title}
                </h5>

                <p className="text-xs text-text-secondary font-medium leading-relaxed mb-6 flex-grow line-clamp-2">
                  {cert.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-text-secondary/10">
                  <span className="text-[11px] font-bold text-text-secondary">{cert.date}</span>
                  <button 
                    onClick={() => setIsOpen(cert.index)}
                    className="text-xs font-bold tracking-[0.2em] uppercase text-text-primary flex items-center gap-2 group/btn cursor-pointer"
                  >
                    View Details
                    <span className="w-6 h-[2px] bg-text-primary group-hover/btn:w-10 transition-all duration-300"></span>
                  </button>
                </div>
              </div>
            </GlareHover>
          </FadeUp>
        ))}
      </div>

      {/* Modal Preview Full Image & Details */}
      <AnimatePresence>
        {isOpen !== null && activeCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            {/* Backdrop Gelap dengan Blur */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-background/90 backdrop-blur-md" 
              onClick={() => setIsOpen(null)} 
            />

            {/* Container Modal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-background border border-text-secondary/20 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl relative z-10"
            >
              {/* Area Tampilan Foto Sertifikat Penuh */}
              <div className="flex-1 bg-text-secondary/5 border-b md:border-b-0 md:border-r border-text-secondary/10 p-4 md:p-6 flex items-center justify-center overflow-hidden">
                <img
                  src={activeCert.image}
                  alt={activeCert.title}
                  className="max-h-[60vh] md:max-h-[75vh] w-auto object-contain rounded-xl shadow-lg border border-text-secondary/10"
                />
              </div>

              {/* Area Informasi & Detail Samping */}
              <div className="w-full md:w-80 p-6 md:p-8 flex flex-col justify-between bg-background overflow-y-auto custom-scrollbar">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold tracking-widest text-text-secondary uppercase px-2.5 py-1 bg-text-secondary/10 rounded-full border border-text-secondary/10">
                      {activeCert.category} &bull; {activeCert.date}
                    </span>
                    <button 
                      className="text-text-secondary hover:text-text-primary transition-colors p-1.5 bg-text-secondary/5 rounded-full cursor-pointer" 
                      onClick={() => setIsOpen(null)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <h4 className="text-xl font-black text-text-primary tracking-tight leading-snug mb-1">
                    {activeCert.title}
                  </h4>
                  <p className="text-xs font-bold text-text-secondary mb-4">{activeCert.issuer}</p>

                  <p className="text-xs text-text-secondary font-medium leading-relaxed mb-4">
                    {activeCert.description}
                  </p>

                  {activeCert.credentialId && (
                    <div className="p-3 rounded-xl bg-text-secondary/5 border border-text-secondary/10 text-[11px] font-mono text-text-secondary mb-4">
                      ID: <span className="text-text-primary font-bold">{activeCert.credentialId}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-text-secondary/10">
                  {activeCert.pdfUrl && (
                    <a 
                      href={activeCert.pdfUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full text-center font-bold text-xs tracking-widest uppercase bg-text-primary text-background py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-md"
                    >
                      Lihat File PDF
                    </a>
                  )}
                  <button 
                    onClick={() => setIsOpen(null)}
                    className="w-full text-center font-bold text-xs tracking-widest uppercase border border-text-secondary/20 text-text-primary hover:bg-text-secondary/10 py-3 rounded-xl transition-colors cursor-pointer"
                  >
                    Tutup Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

// Data Sertifikat Anda
const certificateList: CertificateItem[] = [
{
    index: 0,
    category: "BNSP",
    title: "Sertifikat Kompetensi Kerja - Junior Web Programmer",
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    date: "25 Januari 2025",
    description: "Sertifikat kompetensi resmi bidang Web Development dengan kualifikasi Junior Web Programmer yang dikeluarkan oleh LSP Teknologi Digital.",
    credentialId: "Reg. TIK 1565 01718 2025",
    image: "/images/certificates/bnsp-1.jpg",
    pdfUrl: "/images/certificates/bnsp-1.pdf",
  },
  {
    index: 1,
    category: "Pelatihan",
    title: "Pelatihan Desain Digital",
    issuer: "Prodi Pendidikan Komputer FKIP ULM",
    date: "20 April 2024",
    description: "Sertifikat partisipasi sebagai peserta dalam acara Pelatihan Desain Digital yang diselenggarakan oleh Program Studi Pendidikan Komputer FKIP ULM.",
    image: "/images/certificates/pelatihan.jpg",
  },
  {
    index: 2,
    category: "Juara",
    title: "Juara III Desain Media Kampanye Sosial",
    issuer: "FKIP Universitas Lambung Mangkurat",
    date: "23 April 2024",
    description: "Penghargaan Juara III dalam Lomba Pekan Seni Mahasiswa FKIP ULM Tahun 2024 untuk kategori Desain Media Kampanye Sosial.",
    image: "/images/certificates/peksiminas.jpg",
  },
]