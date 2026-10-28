"use client"

import Link from "next/link"
import FadeDown from "@/components/animations/FadeDown"
import FadeUp from "@/components/animations/FadeUp"
import { galleryData } from "@/app/gallery/page" // Mengambil data dari galeri utama

// Daftar ID spesifik yang ingin ditampilkan di halaman depan (maksimal 3x3 / 9 item)
const featuredIds = [
  "logo-2",       // Boozt Logo Design
  "logo-3",       // Pilkom Logo
  "tshirt-3",     // T-Shirt Design 3
  "tshirt-4",     // T-Shirt Design 4
  "random-4",     // Random Design 4
  "poster-1",     // Poster FKIP
  "video-1",      // 3D Logo Animation 1
  "video-2",      // 3D Motion Render 01
  "video-3",      // 3D Motion Render 02
]

export default function GallerySection() {
  // Filter data agar hanya 9 item terpilih yang muncul di landing page
  const featuredItems = galleryData.filter((item) => featuredIds.includes(item.id))

  return (
    <section id="gallery" className="w-full max-w-7xl mx-auto py-24 md:py-32 cursor-default bg-background relative border-t border-text-secondary/10">
      
      {/* --- HEADER --- */}
      <FadeDown>
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24 w-full text-left">
          <h2 className="text-sm font-bold tracking-[0.2em] text-text-secondary uppercase mb-4">
            Gallery
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tighter">
            Selected Design
          </h3>
        </div>
      </FadeDown>

      {/* --- GRID GALERI 3x3 (9 Item Terpilih) --- */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredItems.map((item, index) => (
          <FadeUp key={item.id || index}>
            <div className="group relative cursor-pointer overflow-hidden rounded-xl bg-background border border-text-secondary/20 hover:border-text-primary/50 transition-all duration-500 shadow-sm hover:shadow-2xl flex flex-col h-full">
              <div className="relative aspect-[4/5] w-full overflow-hidden flex items-center justify-center bg-text-secondary/5 border-b border-text-secondary/10">
                {item.isVideo ? (
                <video
                    src={item.imageUrl}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onMouseEnter={(e) => {
                    const playPromise = e.currentTarget.play()
                    if (playPromise !== undefined) {
                        playPromise.catch(() => {
                        // Menangkap error pemutaran agar tidak menyebabkan crash/AbortError
                        })
                    }
                    }}
                    onMouseLeave={(e) => {
                    e.currentTarget.pause()
                    e.currentTarget.currentTime = 0
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                ) : (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                )}

                {item.isVideo && (
                  <span className="absolute top-4 left-4 text-[10px] font-bold tracking-widest uppercase bg-background/90 text-text-primary px-2.5 py-1 rounded-md backdrop-blur-md border border-text-secondary/20 shadow-sm pointer-events-none">
                    ▶ Video
                  </span>
                )}

                {/* Overlay saat Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white pointer-events-none">
                  <span className="text-[10px] font-bold tracking-widest uppercase bg-white/20 backdrop-blur-md px-3 py-1 rounded-full w-fit mb-2">
                    {item.category}
                  </span>
                  <h4 className="text-lg font-bold tracking-tight">{item.title}</h4>
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      {/* --- TOMBOL VIEW MORE WORKS --- */}
      <FadeUp>
        <div className="mt-16 flex justify-center w-full px6 md:px-12">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 px-8 py-4 bg-background border border-text-secondary/20 text-text-primary hover:border-text-primary hover:bg-text-primary hover:text-background rounded-xl font-bold tracking-widest text-sm uppercase transition-all duration-300 ease-out group hover:-translate-y-1.5 hover:scale-[1.02] shadow-sm hover:shadow-xl cursor-pointer"
          >
            <span>View More Works</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </FadeUp>
    </section>
  )
}