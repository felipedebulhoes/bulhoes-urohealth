/*
 * Design: Clinical Precision — Swiss Medical Design
 * Videos: Educational video gallery organized by category
 * Features: Instagram embeds, YouTube embeds, category filter, modal player
 */
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Play, X, ExternalLink, Microscope, Cpu, Heart, ShieldCheck, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  source: "instagram" | "youtube";
  embedUrl: string;
  externalUrl: string;
  duration?: string;
}

const categories = [
  { id: "todos", label: "Todos", icon: Video },
  { id: "calculos", label: "Cálculos Renais", icon: Microscope },
  { id: "robotica", label: "Cirurgia Robótica", icon: Cpu },
  { id: "prostata", label: "Próstata", icon: ShieldCheck },
  { id: "andrologia", label: "Andrologia", icon: Heart },
];

const videos: VideoItem[] = [
  {
    id: "1",
    title: "Tratamento de Cálculos Minimamente Invasivo",
    description:
      "Veja como realizamos o tratamento de cálculos renais utilizando técnicas minimamente invasivas, sem cortes e com recuperação rápida.",
    thumbnail: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop",
    category: "calculos",
    source: "instagram",
    embedUrl: "https://www.instagram.com/reel/DVylCPBlpHh/embed",
    externalUrl: "https://www.instagram.com/reel/DVylCPBlpHh/",
    duration: "0:45",
  },
  {
    id: "2",
    title: "Ureterorrenolitotripsia Flexível a Laser",
    description:
      "Procedimento minimamente invasivo para tratamento de cálculos renais com holmium laser. Sem cortes, pela via natural, com tecnologia de ponta.",
    thumbnail: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=400&fit=crop",
    category: "calculos",
    source: "instagram",
    embedUrl: "https://www.instagram.com/reel/C8o-H2SARsg/embed",
    externalUrl: "https://www.instagram.com/reel/C8o-H2SARsg/",
    duration: "1:20",
  },
  {
    id: "3",
    title: "Simulador de Cirurgia Robótica",
    description:
      "Treinamento em simulador de cirurgia robótica. A tecnologia robótica permite movimentos precisos e visão 3D ampliada durante os procedimentos.",
    thumbnail: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&h=400&fit=crop",
    category: "robotica",
    source: "instagram",
    embedUrl: "https://www.instagram.com/reel/DV4V-N9EejY/embed",
    externalUrl: "https://www.instagram.com/reel/DV4V-N9EejY/",
    duration: "0:30",
  },
  {
    id: "4",
    title: "Andrologia e Prótese Peniana",
    description:
      "Avanços em andrologia: prótese peniana e cirurgia estética genital. Técnicas modernas para restaurar a qualidade de vida e autoestima do paciente.",
    thumbnail: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&h=400&fit=crop",
    category: "andrologia",
    source: "instagram",
    embedUrl: "https://www.instagram.com/reel/DUtvhHVEV8k/embed",
    externalUrl: "https://www.instagram.com/reel/DUtvhHVEV8k/",
    duration: "0:55",
  },
  {
    id: "5",
    title: "Litotripsia a Laser: Passo a Passo",
    description:
      "Entenda como funciona o tratamento de pedras nos rins com litotripsia a laser. Vídeo educativo explicando cada etapa do procedimento.",
    thumbnail: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop",
    category: "calculos",
    source: "youtube",
    embedUrl: "https://www.youtube.com/embed/KgFJmoBU48w",
    externalUrl: "https://www.youtube.com/watch?v=KgFJmoBU48w",
    duration: "6:15",
  },
  {
    id: "6",
    title: "Técnicas Minimamente Invasivas para HPB",
    description:
      "Novas técnicas minimamente invasivas para o tratamento da hiperplasia prostática benigna (HPB), incluindo enucleação a laser e Rezum.",
    thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
    category: "prostata",
    source: "youtube",
    embedUrl: "https://www.youtube.com/embed/B8LljHIqPsA",
    externalUrl: "https://www.youtube.com/watch?v=B8LljHIqPsA",
    duration: "8:42",
  },
];

export default function VideosSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("todos");
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const filteredVideos =
    activeCategory === "todos"
      ? videos
      : videos.filter((v) => v.category === activeCategory);

  return (
    <>
      <section id="videos" className="py-20 lg:py-28 bg-[#F8FAFB]" ref={ref}>
        <div className="container">
          {/* Header */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-[#B87333]" />
                <span className="text-[#B87333] text-sm font-semibold uppercase tracking-[0.15em]">
                  Vídeos Educativos
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl text-[#1C3D5A] leading-tight">
                Entenda os
                <span className="block text-[#B87333]">Procedimentos</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-end"
            >
              <p className="text-base text-[#1C3D5A]/60 leading-relaxed">
                Conheça as técnicas minimamente invasivas utilizadas no tratamento das
                principais doenças urológicas. Vídeos reais de procedimentos e conteúdo
                educativo para desmistificar os tratamentos.
              </p>
            </motion.div>
          </div>

          {/* Category filter */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-[#1C3D5A] text-white shadow-md"
                    : "bg-white text-[#1C3D5A]/60 border border-[#1C3D5A]/8 hover:border-[#B87333]/30 hover:text-[#1C3D5A]"
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Video grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredVideos.map((video, i) => (
                <motion.div
                  key={video.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="bg-white rounded-xl border border-[#1C3D5A]/6 overflow-hidden hover:shadow-xl hover:shadow-[#1C3D5A]/5 transition-all duration-500 hover:-translate-y-1">
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Play overlay */}
                      <div className="absolute inset-0 bg-[#1C3D5A]/30 group-hover:bg-[#1C3D5A]/50 transition-colors flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-[#1C3D5A] ml-1" fill="currentColor" />
                        </div>
                      </div>
                      {/* Duration badge */}
                      {video.duration && (
                        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      )}
                      {/* Source badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded ${
                          video.source === "instagram"
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                            : "bg-red-600 text-white"
                        }`}>
                          {video.source === "instagram" ? "Instagram" : "YouTube"}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] uppercase tracking-wider text-[#B87333] font-semibold bg-[#B87333]/8 px-2 py-0.5 rounded">
                          {categories.find((c) => c.id === video.category)?.label || video.category}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-[#1C3D5A] leading-snug mb-2 group-hover:text-[#B87333] transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-xs text-[#1C3D5A]/50 leading-relaxed line-clamp-2">
                        {video.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mt-10 text-center"
          >
            <a
              href="https://www.instagram.com/drfelipebulhoes/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="border-[#1C3D5A]/10 text-[#1C3D5A]/60 hover:text-[#1C3D5A] hover:border-[#1C3D5A]/20">
                Ver mais vídeos no Instagram
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Video modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-xl overflow-hidden w-full max-w-3xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 border-b border-[#1C3D5A]/8">
                <div>
                  <h3 className="text-base font-semibold text-[#1C3D5A]">{selectedVideo.title}</h3>
                  <span className="text-xs text-[#1C3D5A]/40">
                    {categories.find((c) => c.id === selectedVideo.category)?.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={selectedVideo.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md hover:bg-[#1C3D5A]/5 transition-colors text-[#1C3D5A]/40 hover:text-[#1C3D5A]"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="p-2 rounded-md hover:bg-[#1C3D5A]/5 transition-colors text-[#1C3D5A]/40 hover:text-[#1C3D5A]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Embed */}
              <div className="aspect-video bg-black">
                <iframe
                  src={selectedVideo.embedUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={selectedVideo.title}
                />
              </div>

              {/* Description */}
              <div className="p-5">
                <p className="text-sm text-[#1C3D5A]/60 leading-relaxed">
                  {selectedVideo.description}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <a
                    href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" className="bg-[#B87333] hover:bg-[#8B5A2B] text-white text-xs">
                      Agendar Consulta
                    </Button>
                  </a>
                  <a
                    href="https://wa.me/5511981124455?text=Ol%C3%A1%2C%20assisti%20o%20v%C3%ADdeo%20e%20gostaria%20de%20saber%20mais."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" variant="outline" className="text-xs border-[#1C3D5A]/10">
                      Tirar Dúvidas via WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
