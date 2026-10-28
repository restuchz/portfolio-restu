"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

// 1. Tipe Data Gambar Galeri
interface GalleryItem {
  id: string
  title: string
  category: string // Misal: "Poster", "Branding", "UI/UX", "3D"
  imageUrl: string
  aspectRatio?: string // Opsional: untuk variasi layout masonry
  isVideo?: boolean //
}

// 2. Daftar Kategori Filter
const CATEGORIES = ["All", "Logo", "T-Shirt Design", "Random Design", "Poster", "3D Logo"]

// 3. Data Galeri (Diisi dari karya Padlet Anda)
export const galleryData: GalleryItem[] = [
  {
    id: "logo-1",
    title: "Logo Bros.png brand",
    category: "Logo",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads/2295710792/94ca3db0c799a06e1dca9b5ce45814ce/358060427_4291978367694139_6126670511204134285_n.jpg?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwMNTLe1N_wbHl5BCzdRet8ZjBfSMZ2QSrTf7ix9QpskLHd6wFKgpKZu2tNd9bT1OJ3jadurVupGIQZGvSTc3tAY_edEdydEZvWHKiDMzxAanjW1RwTLwgITo0687xfW1CwWNwwaPePYrV1JibpwLriSdnt5Y5_00ZlAhz8TcwgLXBSTwGl-JJihW0svJiL-f1OPj9vEXd5rXNPzXVc2TGiV3QAOiUadH4bA6vbKGif4g=",
  },
  {
    id: "logo-2",
    title: "Boozt Logo Design",
    category: "Logo",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads-usc1/2295710792/17761517056dd9571022bd2b77698ad0/LOGOBOOZT.png?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwwqJRVqiq-Esv5fBNL6ZnE8pzCxXa3Wc6iqL2ptM_siSLxF3K83lawhirN6CR2eIrDLGcxl_EICBe9b18VdHO-PozaBOB7hLSjxbB9aTkykVQxbkXoWjjQxpGlMGv8SUr6YxNFKi8IMheau7wHiPYv-_kT9H5F4zneOYZGVWEh5KfuCE7Ezfytlh3W8H72j4k",
  },
  {
    id: "logo-3",
    title: "Pilkom Logo",
    category: "Logo",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads/2295710792/69feb11c7a6ec77896d08639b3a7cbfc/pilkom_logo.png?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwMNTLe1N_wbHl5BCzdRet8ZjBfSMZ2QSrTf7ix9QpskLHd6wFKgpKZu2tNd9bT1OJUqOvguYR5rc8flX_0Lxz68b7oWrnXXWi4FuF24TZ77rawyJ7dthgNFsjTsdDC0584o8ut6OsLCZ392YKw3RHtX2lyi6TL9con7lk60y4k_kYaFjveN79D3itkwoJfuA6",
  },
  {
    id: "logo-4",
    title: "Logo Mirlos De Sadicos",
    category: "Logo",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads/2295710792/257433238dd41150e3df7b3ed4675d92/Untitled.png?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwMNTLe1N_wbHl5BCzdRet8ZjBfSMZ2QSrTf7ix9QpskLHd6wFKgpKZu2tNd9bT1OJUEpDmBOVZU2cjk8QPp_UG6jnWjNoCJb1lreSC3NSO8DYqznp1nvDBGBxlnqg7pXuCbfM8z4v3v8OTLTfzLE8Adf90WiNBnJ1jTQXeag29ewu9O0HCEZg-urM-X0n6v9X",
  },

  {
    id: "tshirt-1",
    title: "T-Shirt Design 1",
    category: "T-Shirt Design",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads/2295710792/938a5d2341c67feb180a9351c076c604/359661433_1953191301684736_3962132269594479476_n.jpeg?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwMNTLe1N_wbHl5BCzdRet8ZjBfSMZ2QSrTf7ix9QpskLHd6wFKgpKZu2tNd9bT1OJPPargObZ0SzNF3Dggyt9tiHCNEEk0HzW4jy-7Ga5KEX7eILyHESL5G-K7tUr-f9utDlQCdmoE9Vq-qwlfyQuRzpYxYq4stIFWA9QBUWDRth6AJYLKDWWP8vG51A3VQtNN_UdTP8HPDyjkTN_JDM7hbKt3fVhx3Kbh88oxftZuUQ=",
  },
  {
    id: "tshirt-2",
    title: "T-Shirt Design 2",
    category: "T-Shirt Design",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads/2295710792/fb89b7eed9c6d4d052668b2f0ed67b73/359487293_3421180518136705_1838977672231392784_n.webp?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwMNTLe1N_wbHl5BCzdRet8ZjBfSMZ2QSrTf7ix9QpskLHd6wFKgpKZu2tNd9bT1OJKo2u2JZBgSTDG0n94QPKVZmmXh-6mHuVGOsd-c6msKUBj2ccnqt8qG50oGi3IZ8N3uk7cvGjDVUmnMn5YqYfjBYPHyli_iM7dPUJUMShNGBBtA5czz7_qDTz86xP3VISpgGvndcXBXyclzMHhJ0JFyJD-7HD53vaHO069MyauIM=",
  },
  {
    id: "tshirt-3",
    title: "T-Shirt Design 3",
    category: "T-Shirt Design",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads-usc1/2295710792/cb1d9aabb5ec3e5007be29d757eaecda/Untitled_2.png?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwwqJRVqiq-Esv5fBNL6ZnE8pzCxXa3Wc6iqL2ptM_siSLxF3K83lawhirN6CR2eIrPXGtfkL_sXyLpMQ4ISO86EmaVc4vLDSfoPXgV4Vswru4cC0-EmfbD4JXZ9zJ_DZTw89LlVh2RJJ9vrh6JvDcYI462fKP5FOSyj3MAD5BYqevMaLc6tyrYheb5MyxW4x5",
  },
  {
    id: "tshirt-4",
    title: "T-Shirt Design 4",
    category: "T-Shirt Design",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads/2295710792/e516887c48e6905c04abd9027f863798/364270196_130259353460772_1043145785713901220_n__1_.webp?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwMNTLe1N_wbHl5BCzdRet8ZjBfSMZ2QSrTf7ix9QpskLHd6wFKgpKZu2tNd9bT1OJV5_rhx7cpX5F-_TdERGe63iu1lhgIagA29ioiZN63JMGAshLulrMASsIyNPtftekyklg8KIfgRvkxWZRCEJysiiqS7_i0pq9H9NZibUReCfWznef7RvM68VUGj3CwGAH7wWFawhWCUmVyJ2NdP5R-z_0a3LOt-7l5KhwIL_3eYA=",
  },
  {
    id: "tshirt-5",
    title: "T-Shirt Design 5",
    category: "T-Shirt Design",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads/2295710792/3103845dd87f808dcf43fa348a72775c/363822879_289081080372848_1421442920126213426_n.webp?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwMNTLe1N_wbHl5BCzdRet8ZjBfSMZ2QSrTf7ix9QpskLHd6wFKgpKZu2tNd9bT1OJlmKIplbJvEzbpgXEmVqDQ5B85OZSsjT0DTSdz8PCflY-E50DtsgqUvS6w7sq25rOcZIj448Z9FqvecZv1mTc25JGcESWovCwHFVzPqUeS7U9s2CpzJnQwlHl5KsIEEPUgM_Cqk4QBbYSEJ4ffUru0Yd0lhsgR-6z9DkpgXc_iSg=",
  },
  {
    id: "tshirt-6",
    title: "T-Shirt Design 6",
    category: "T-Shirt Design",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads/2295710792/1607dad23dcfe764584d08032c021859/360947163_2590067854491487_4193524936087228258_n.webp?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwMNTLe1N_wbHl5BCzdRet8ZjBfSMZ2QSrTf7ix9QpskLHd6wFKgpKZu2tNd9bT1OJeRFMfA4fqPENovboesjsreQoVnta2DsZxiLNW74ZXAgHJ3Ail5aXPcrLvhBf075lzCfqTX8uc0OvGehaYywruHP-MfF80sAvnfNvIjZjIGYbjUAP6psixUijFCca1aTM7Eu4rB7n0N1C6WmiIq45vffqOSLP5L4baIFF1Dz8LU4=",
  },
  {
    id: "tshirt-7",
    title: "T-Shirt Design 7",
    category: "T-Shirt Design",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads/2295710792/28e4d2f2610165ddcce3746ebdc7707b/360262893_748805610266049_4390963969666076943_n.webp?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwMNTLe1N_wbHl5BCzdRet8ZjBfSMZ2QSrTf7ix9QpskLHd6wFKgpKZu2tNd9bT1OJQgf8HQBnP95L3YeOdm7M5FSs1yVXKIknaSy1uxRBRXKcyUoG7B_ViI_GU6H17stMfYYPFgW-xZGf5dvsjDBNbbC0AjyJ_8ikTPwbZBwnj5QzgbvO0CkA7u-qB2hnqohjeK0L-xH1vgr-P1ABUZD2Zh0k9oq1tdGnbtHXnSDeKzw=",
  },
  {
    id: "tshirt-8",
    title: "T-Shirt Design 8",
    category: "T-Shirt Design",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads/2295710792/a88cdffe7ccc6b4b0398e10e65d82a4d/360566895_822612439432382_5170553934989544877_n.webp?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwMNTLe1N_wbHl5BCzdRet8ZjBfSMZ2QSrTf7ix9QpskLHd6wFKgpKZu2tNd9bT1OJDUvfQTrI8DpuGvI7eRMjsohpigz9PsufK_KSJJa9daE6GW65bunqZWLGS95hzmnpFctcm37R7sZvhfTId-flTQ_p9nsRZmhnp809aleK-FV15-ZMlcWmW57YRVLLoAtKQVgBnnhnSOPtilQe_DtOiIKxDHyYdTZ5Syjvhb63Uv0=",
  },
  {
    id: "tshirt-9",
    title: "T-Shirt Design 9",
    category: "T-Shirt Design",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads/2295710792/fb404772e56286abd1bbea8162ab0410/360919981_677888281047092_8070760328473127370_n.webp?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwMNTLe1N_wbHl5BCzdRet8ZjBfSMZ2QSrTf7ix9QpskLHd6wFKgpKZu2tNd9bT1OJ_a78VbZk7xfzC1oxom90rQLyvjxJjLQ-9auCMz-qUAbMSp3KXoovKVNmR4MowW-AEf1e5_c9p8aesSz1J97FSiCZGXi2jiGJ4XWHAzet1ylMIOn4X2Ib1K43SwKosfrzfv24hQn35nMN0IwpKrp-rfTvr4rcbqoWCM73gagJOsQ=",
  },
  {
    id: "tshirt-10",
    title: "T-Shirt Design 10",
    category: "T-Shirt Design",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads/2295710792/c3ca75ef27ef69069a71a2d8c9f41f44/363498129_961579821786355_6848640076853398900_n.webp?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwMNTLe1N_wbHl5BCzdRet8ZjBfSMZ2QSrTf7ix9QpskLHd6wFKgpKZu2tNd9bT1OJXm9MT3fawQRZf0svsjwWAT4GIFPv80DZJFp4JwlTFnw97w-1BT-1LjWugJp1N7gLpbc0F29i8ksEYsciNAW-SJFaJZToqV14WmfT4y4xNr4HVmVM8NOy4cp4qYs7e6pGjyliZ9V_MzGx5tR63IW1lE6ImY4QitV9dsUYFC25PFQ=",
  },
  {
    id: "tshirt-11",
    title: "T-Shirt Design 11",
    category: "T-Shirt Design",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads/2295710792/3d61a6c5b9c4f8608610a8603bb0a770/363507996_1341366599793939_2709496764811492416_n.webp?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwMNTLe1N_wbHl5BCzdRet8ZjBfSMZ2QSrTf7ix9QpskLHd6wFKgpKZu2tNd9bT1OJEZLBhLJi3fh0YWkgJAo2VzwwRvdXd1QT3egQt4R9YiaxAPOMW-TkyiPdtqFWCG0lzDz_Ee5nHeg5aUPhM_ZkJJeVAkN8069NEVv0uuAduz4PcrDdcLxQPvryKKeIsX2Q1ta8ipw2Xrqsn_ufZ7ADg6iSyjeX98vZUc6NHtt59Lo=",
  },
  {
    id: "tshirt-12",
    title: "T-Shirt Design 12",
    category: "T-Shirt Design",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads/2295710792/f3a693ffb45aeb14c5acf8a164805e2f/363814287_643581884396204_6382917755272494287_n__1_.webp?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwMNTLe1N_wbHl5BCzdRet8ZjBfSMZ2QSrTf7ix9QpskLHd6wFKgpKZu2tNd9bT1OJfmrmac0W3qT8M-L5pN-k1nnHRLBaiLg0w1o9OiStWmtpsB7PrAVuf2HwhVcJFzjTMf1k70qDaxIdStvYjJNBERV5QS6JwctDk2nHCF3vQUEgO13Vx2CMNeOzhyECvH36GnRU-InYqloCBH0RMKrlZfDT2vSRvvF3K6ITXchOIIw=",
  },
  {
    id: "tshirt-13",
    title: "T-Shirt Design 13",
    category: "T-Shirt Design",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads/2295710792/ee88e73160f74f4c529d94b30258884a/363795572_285036917540691_4582523389705183918_n__1_.webp?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwMNTLe1N_wbHl5BCzdRet8ZjBfSMZ2QSrTf7ix9QpskLHd6wFKgpKZu2tNd9bT1OJ4wIOOiQHZU2sA78iL8X_fXEudmoB_DguCnPRFfOn3ktSfn5Rm_UlSenkylisCX73HgP2W9Wd0O-GIEHIDSWHJ3Q-SREl8Q6tbfE4XPmaOK2on9unXXbunR9wsHCghhkI_sq-nfXEKWTFEnfp0CWlKtaw3klxjBlewb7TLTW3PVo=",
  },

  // --- KATEGORI: RANDOM DESIGN ---
  {
    id: "random-1",
    title: "Random Design 1",
    category: "Random Design",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads/2295710792/86ed8369a1481ac13b5b4d88df019877/_1705943446.jpg?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwMNTLe1N_wbHl5BCzdRet8ZjBfSMZ2QSrTf7ix9QpskLHd6wFKgpKZu2tNd9bT1OJWra3sJ4IRyyAN266ZSk4A_BtHIoK1jFtd20zZkis0PJyPww0kI-UPEc75o8vIy6bjbWGCWaEr845LKnq6CUrwX6AOvjxLMzhbK0rpUS4FQitggZbNaeOKWFpYQp8VjRD",
  },
  {
    id: "random-2",
    title: "Random Design 2",
    category: "Random Design",
    imageUrl: "https://padlet-artifacts.storage.googleapis.com/b1d821a0c649cae0ee7a00ad9b150f162c9619ef/92a4bac855f16c5b1c1db3279e8b2433-h-c5466277e7ba04562ccac32a1ee0c6fc.webp",
  },
  {
    id: "random-3",
    title: "Random Design 3",
    category: "Random Design",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads/2295710792/ba2ad132cdbe88bab2137e5e18073b7b/71733550_175801260225071_6020047106425028951_n.jpg?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwMNTLe1N_wbHl5BCzdRet8ZjBfSMZ2QSrTf7ix9QpskLHd6wFKgpKZu2tNd9bT1OJgAM4t9Xo7IxNor8BVy-6lrISszOTslpRIConzCXJQXjHS308RmN11iLeqZpHFSie9vjfYJi04qZ7Q08VBo9SgSf8oarmbEQv9_bUjN3ve-FfdknM4h-9JG2gW0FpKeF3tQs2ctpL_DF2qbEybwPq7XDakzIYFN1I3yQEn18agRA=",
  },
  {
    id: "random-4",
    title: "Random Design 4",
    category: "Random Design",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads/2295710792/7eb6b6c454cc3c53646bcff6a2f1bca6/WhatsApp_Image_2024_05_03_at_00_09_07.jpeg?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwMNTLe1N_wbHl5BCzdRet8ZjBfSMZ2QSrTf7ix9QpskLHd6wFKgpKZu2tNd9bT1OJlWm6yoxyFX3_5tEK9Fnm51ze8H1MHgxolm4VDbMbB8c0vjY7cKxtS_c2URVj6ImWQD4UWKtopIUSSLqEEyn9fLKxtvemjhqgxnfgzDsl2bGlr0lSc-IGAAktYcVIXI2RPeC7g_7wYhYWPhACBDRi6A==",
  },
  {
    id: "random-5",
    title: "Overprint Style",
    category: "Random Design",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads-usc1/2295710792/ad8211a3144597f68901b31eca31ba64/Overprint_1.png?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwwqJRVqiq-Esv5fBNL6ZnE8pzCxXa3Wc6iqL2ptM_siSLxF3K83lawhirN6CR2eIrskrbj_i9_4ml9pgjHUXQQ6FoxVfYiQzK3JgXanEYeu2E1HLAOXj-wkrj5-goK9ziTJVTNPBTwGnwFk6da3vg_AXdeETYYQam2u_XepRGknaixVDuJUvsmllMEp9mfC9i",
  },
  {
    id: "random-6",
    title: "Grunge Parasite",
    category: "Random Design",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads-usc1/2295710792/b4c6770955b3f229b75f6847f1507d95/Grunge_Parasite.png?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwwqJRVqiq-Esv5fBNL6ZnE8pzCxXa3Wc6iqL2ptM_siSLxF3K83lawhirN6CR2eIr8e0OsFkq69kt2yn0cFvJq3af5srP1loroamYdgtfyMODzp33OtfbbtdcRul2GKNH84w1Fctytw9P7zJf0cVg-1XECyVldW1KZbBRe9sBYnoIv9U-e_wWxz4rJ3hwoY2N",
  },

  // --- KATEGORI: POSTER DESIGN ---
  {
    id: "poster-1",
    title: "Poster FKIP",
    category: "Poster",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads/2295710792/5f0cf77751c80c741ed46be3f6be8fd1/PosterFKIP_REAL2.png?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwMNTLe1N_wbHl5BCzdRet8ZjBfSMZ2QSrTf7ix9QpskLHd6wFKgpKZu2tNd9bT1OJUcUZrbsWFi7ge7KAqBWeJebYeYqI0Y5bpskNkfwUi8VorHgBBZEPxjkr0-TSOBTaeJY-SkZLo4qEi6x1_FOJ95_as2YcvzQZihXWpDyzjnFi9IunYpI52-lzHuWApz-m",
  },

  // --- KATEGORI: 3D LOGO (VIDEO HOVER) ---
  {
    id: "video-1",
    title: "3D Logo Animation 1",
    category: "3D Logo",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads-usc1/2295710792/40e4585911e9f9cf55f91aeab90eb79f/VID.mp4?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwwqJRVqiq-Esv5fBNL6ZnE8pzCxXa3Wc6iqL2ptM_siSLxF3K83lawhirN6CR2eIro33nVKrd4OwQdisQ6CwBPDFybgNFcBqgrh9ADWnHNrYbwcaERlJcTwV7z0CBv_yxyttSQW5e4ia3nhZrJUvg_Bp5sz_bQFfLIosPVCrL3aHg9h9Vkb0NHFCo4uxHakql",
    isVideo: true,
  },
  {
    id: "video-2",
    title: "3D Motion Render 01",
    category: "3D Logo",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads-usc1/2295710792/c4c22061609062081b74ac5fcde2d443/0001_0600.mkv?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwwqJRVqiq-Esv5fBNL6ZnE8pzCxXa3Wc6iqL2ptM_siSLxF3K83lawhirN6CR2eIr6JbvNi2l38W_9HEilSbjmOjCcjTxvYAJGIevnl6Dqi_S3qPSWV4E87emNzkkdGgL-QrWEN-pKUU858sjYy5xcK5ilcJw_FeQlORx_RHGz_ilDxG6xYanuviIHYcOMjV1",
    isVideo: true,
  },
  {
    id: "video-3",
    title: "3D Motion Render 02",
    category: "3D Logo",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads-usc1/2295710792/9a61963b7a3648e8d3bffa95326b3259/0001_0300.mkv?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwwqJRVqiq-Esv5fBNL6ZnE8pzCxXa3Wc6iqL2ptM_siSLxF3K83lawhirN6CR2eIrBS9IlXOYkpMSx0LXOdrAIIzyO7-X-4H5FakHiQN7GNU6kwt8k6KNHjC-Vp9uHPOzE8CLr8t9IjKBXPXP0HgYXcKhBQpzVfZlhsbM_Rhh16hn2KBRihfdXDUKnhBQI33m",
    isVideo: true,
  },
  {
    id: "video-4",
    title: "3D Motion Render 03",
    category: "3D Logo",
    imageUrl: "https://u1.padletusercontent.com/uploads/padlet-uploads-usc1/2295710792/44742c1236f9ea80ca89985e0024191b/0001_0250.mp4?token=QGzSW3EmZkfNaPEhXIzj0MYT9UuD91mEb9YPqHw_xHFeCPmgrLrRtL2ZAhmw8PdwwqJRVqiq-Esv5fBNL6ZnE8pzCxXa3Wc6iqL2ptM_siSLxF3K83lawhirN6CR2eIr-pmqBBZv7DodIgSzRfxm2WyUHX0YWYevaPrmsmpRPxk765VYfwfhXvIx8oZm5lNaaxo_0IAo_ND1swR004RIKN2bsZMKk6SYml6nBlfniREkv9_G8FchaP7QwE5yNXnK",
    isVideo: true,
  },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  // --- TAMBAHKAN KODE INI UNTUK MENGATASI ERROR ---
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = typeof window !== "undefined" ? localStorage.getItem("theme") : null
    const prefersDark = typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)").matches : false
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark)
    setIsDark(shouldBeDark)
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", shouldBeDark)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme ? "dark" : "light")
      document.documentElement.classList.toggle("dark", newTheme)
    }
  }
  // ------------------------------------------------

  // Filter gambar sesuai kategori aktif
  const filteredItems = selectedCategory === "All"
    ? galleryData
    : galleryData.filter((item) => item.category.toLowerCase() === selectedCategory.toLowerCase())
    
  return (
    <main className="min-h-screen bg-background text-text-primary px-6 md:px-16 py-28 transition-colors duration-300 cursor-default">
      
      {/* --- HEADER & NAVIGATION BACK --- */}
      
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-text-secondary/10 pb-8">
        <div>
          <Link 
            href="/#projects" 
            className="text-xs font-bold tracking-[0.2em] text-text-secondary uppercase hover:text-text-primary transition-colors mb-4 inline-block"
          >
            &larr; Back to Portfolio
          </Link>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
            Graphic Design <span className="text-text-secondary font-light">Gallery</span>
          </h1>
        </div>
        <p className="text-sm text-text-secondary max-w-md font-medium">
          A curated collection of visual designs, branding concepts, posters, and 3D visual explorations.
        </p>
      </div>
      
      

      {/* --- FILTER CATEGORY BUTTONS --- */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-wrap gap-3">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat
          return (
                        <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                isActive
                ? "bg-text-primary text-background border-text-primary shadow-md"
                : "bg-transparent text-text-secondary border-text-secondary/20 hover:border-text-primary hover:text-text-primary"
            }`}
            >
            {cat}
            </button>
          )
        })}
      </div>

      {/* --- GALLERY MASONRY / GRID LAYOUT --- */}
      {/* --- GALLERY MASONRY / GRID LAYOUT --- */}
    <motion.div 
    layout
    className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
    <AnimatePresence>
        {filteredItems.map((item) => (
        // <-- MASUKKAN KODE PERTAMA DI SINI (Card Item) -->
        <div
        key={item.id}
        className="group relative cursor-pointer overflow-hidden rounded-2xl bg-text-secondary/5 border border-text-secondary/10 hover:border-text-primary/40 transition-all duration-500 shadow-sm hover:shadow-xl"
        onClick={() => setSelectedImage(item)}
        >
            <div className="relative aspect-[4/5] w-full overflow-hidden flex items-center justify-center bg-black/10">
            {item.isVideo ? (
                <video
                src={item.imageUrl}
                muted
                loop
                playsInline
                onMouseEnter={(e) => e.currentTarget.play()}
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
                <span className="absolute top-4 left-4 text-[10px] font-bold tracking-widest uppercase bg-black/60 text-white px-2.5 py-1 rounded-full backdrop-blur-md pointer-events-none">
                ▶ Video (Hover to Play)
                </span>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white pointer-events-none">
                <span className="text-[10px] font-bold tracking-widest uppercase bg-white/20 backdrop-blur-md px-3 py-1 rounded-full w-fit mb-2">
                {item.category}
                </span>
                <h3 className="text-lg font-bold tracking-tight">{item.title}</h3>
            </div>
            </div>
        </div>
        ))}
    </AnimatePresence>
    </motion.div>

      {/* --- LIGHTBOX MODAL PREVIEW --- */}
      {/* --- LIGHTBOX MODAL PREVIEW --- */}
<AnimatePresence>
  {selectedImage && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
      {/* Backdrop Gelap dengan Blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedImage(null)}
        className="absolute inset-0 bg-background/95 backdrop-blur-md transition-colors duration-300"
      />

      {/* Kotak Modal Utama */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative z-10 max-w-5xl max-h-[90vh] bg-background border border-text-secondary/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row transition-colors duration-300"
      >
        
        {/* Tombol Close */}
        <button 
          onClick={() => setSelectedImage(null)} 
          className="absolute top-4 right-4 z-20 p-2.5 bg-background/80 hover:bg-text-primary hover:text-background rounded-full transition-colors border border-text-secondary/20 cursor-pointer shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Area Media Modal (Gambar / Video) */}
        <div className="flex-1 bg-black/5 dark:bg-white/5 flex items-center justify-center p-4 overflow-hidden transition-colors duration-300">
          {selectedImage.isVideo ? (
            <video
              src={selectedImage.imageUrl}
              controls
              autoPlay
              className="max-h-[75vh] w-auto object-contain rounded-xl shadow-inner"
            />
          ) : (
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              className="max-h-[75vh] w-auto object-contain rounded-xl shadow-inner"
            />
          )}
        </div>

        {/* Bagian Keterangan Samping */}
        <div className="w-full md:w-80 p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-text-secondary/10 bg-background transition-colors duration-300">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-text-secondary block mb-2">
              {selectedImage.category}
            </span>
            <h2 className="text-2xl font-black tracking-tight text-text-primary mb-4">
              {selectedImage.title}
            </h2>
          </div>
          <button 
            onClick={() => setSelectedImage(null)} 
            className="w-full py-3 bg-text-primary text-background text-xs font-bold uppercase tracking-widest rounded-xl hover:-translate-y-0.5 transition-transform cursor-pointer shadow-md"
          >
            Close Preview
          </button>
        </div>

      </motion.div>
    </div>
  )}
</AnimatePresence>

    </main>
  )
}