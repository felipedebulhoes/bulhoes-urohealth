/*
 * Design: Clinical Precision — Swiss Medical Design
 * Component: Educational Content Preview Section for Home page
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  BookOpen, ArrowRight, Activity, Scissors, Zap,
  Heart, Dumbbell, Shield, Pill, Stethoscope
} from "lucide-react";

const educationalPages = [
  {
    title: "Tratamentos para HPB",
    description: "RTU, HoLEP, ThuLEP, Rezum e outras opções para hiperplasia prostática benigna.",
    href: "/educativo/tratamentos-hpb",
    icon: <Activity className="w-5 h-5" />,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Cirurgias Minimamente Invasivas",
    description: "Laparoscopia, robótica e endoscopia — menos dor, menos cicatriz, recuperação rápida.",
    href: "/educativo/cirurgias-minimamente-invasivas",
    icon: <Scissors className="w-5 h-5" />,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Cálculos Renais",
    description: "Prevenção, tratamentos modernos e tudo sobre o cateter duplo J.",
    href: "/educativo/calculos-renais",
    icon: <Zap className="w-5 h-5" />,
    color: "bg-amber-50 text-amber-600",
  },
  {
    title: "Disfunção Erétil",
    description: "Causas, diagnóstico e opções de tratamento em decisão compartilhada.",
    href: "/educativo/disfuncao-eretil",
    icon: <Heart className="w-5 h-5" />,
    color: "bg-red-50 text-red-600",
  },
  {
    title: "Hipogonadismo e Testosterona",
    description: "Deficiência de testosterona, sintomas e reposição hormonal.",
    href: "/educativo/hipogonadismo",
    icon: <Pill className="w-5 h-5" />,
    color: "bg-violet-50 text-violet-600",
  },
  {
    title: "Síndrome Metabólica",
    description: "Controle do peso, exercícios e envelhecimento saudável no homem.",
    href: "/educativo/sindrome-metabolica",
    icon: <Dumbbell className="w-5 h-5" />,
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Procedimentos Urológicos",
    description: "Postectomia, vasectomia, varicocele e HPV — o que esperar.",
    href: "/educativo/procedimentos-andrologicos",
    icon: <Shield className="w-5 h-5" />,
    color: "bg-cyan-50 text-cyan-600",
  },
  {
    title: "Orientações Pós-Operatórias",
    description: "Cuidados após cirurgia, sintomas normais e sinais de alerta.",
    href: "/educativo/orientacoes-pos-operatorias",
    icon: <Stethoscope className="w-5 h-5" />,
    color: "bg-teal-50 text-teal-600",
  },
];

export default function EducationalPreviewSection() {
  return (
    <section id="educativo" className="py-16 lg:py-24 bg-[#F8FAFB]">
      <div className="container max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-[#0D9488]" />
            <span className="text-xs font-semibold text-[#0D9488] uppercase tracking-widest">
              Conteúdo Educativo
            </span>
          </div>
          <h2 className="text-2xl lg:text-4xl text-[#0A2540] mb-3 font-serif">
            Informação de Qualidade para o Paciente
          </h2>
          <p className="text-sm text-[#0A2540]/50 max-w-xl mx-auto">
            Material educativo baseado em evidências científicas das principais guidelines internacionais (EAU, AUA, SBU) e livros de referência.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {educationalPages.map((page, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link href={page.href}>
                <div className="group bg-white rounded-xl border border-[#0A2540]/6 p-5 h-full hover:border-[#0D9488]/30 hover:shadow-md transition-all duration-300 cursor-pointer">
                  <div className={`w-10 h-10 rounded-lg ${page.color} flex items-center justify-center mb-3`}>
                    {page.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-[#0A2540] mb-1.5 group-hover:text-[#0D9488] transition-colors">
                    {page.title}
                  </h3>
                  <p className="text-xs text-[#0A2540]/45 leading-relaxed mb-3">
                    {page.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs font-medium text-[#0D9488] opacity-0 group-hover:opacity-100 transition-opacity">
                    Saiba mais <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
