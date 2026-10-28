import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "../styles/globals.css"
import PageLoader from "@/components/PageLoader"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  title: {
    default: "Restu | Portfolio",
    template: "%s | Restu Portfolio",
  },
  description: "Personal portfolio of Muhammad Restu Rahman. Computer Education student and web developer.",
  keywords: ["Muhammad Restu Rahman", "Restu", "Portfolio", "Web Development", "Computer Education", "Next.js", "React"],
  authors: [{ name: "Muhammad Restu Rahman" }],
  creator: "Muhammad Restu Rahman",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    title: "Restu | Portfolio",
    description: "Personal portfolio of Muhammad Restu Rahman. Computer Education student and web developer.",
    siteName: "Restu Portfolio",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Restu Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Restu | Portfolio",
    description: "Personal portfolio of Muhammad Restu Rahman. Computer Education student and web developer.",
    images: ["/images/hero.jpeg"],
  },
  icons: {
    icon: "/images/hero.jpeg",
    shortcut: "/images/hero.jpeg",
    apple: "/images/hero.jpeg",
  },
  alternates: {
    canonical: "/",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`${poppins.className} antialiased`}>
        <PageLoader />
        {children}
      </body>
    </html>
  )
}