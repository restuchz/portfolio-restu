import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Hero from "./hero"
import About from "./about"
import Experience from "./experience"
import Certificates from "./certificates"
import TechStack from "./tech-stack"
import Project from "./project"
import GallerySection from "./gallery-section" // <-- 1. Import komponen galeri baru kita
import Contact from "./contact"

export default function Home() {
  return (
    <>
      <header className="cursor-default sticky top-0 z-50">
        <Header />
      </header>
      <Hero />
      <About />
      <Experience />
      <Certificates />
      <TechStack />
      <Project />
      
      {/* --- 2. Preview Gallery (Maksimal 3x3) di antara Project & Contact --- */}
      <GallerySection />
      
      <Contact />
      <Footer />
    </>
  )
}