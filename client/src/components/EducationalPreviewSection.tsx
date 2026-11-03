/*
 * Design: Clinical Precision — Swiss Medical Design
 * Component: Educational Content Preview Section for Home page
 * Consolidado em 12 temas clínicos essenciais (3 linhas no desktop) para evitar redundância e sobrecarga visual.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  BookOpen,
  ArrowRight,
  Activity,
  Zap,
  Heart,
  Shield,
  Pill,
  Search,
  Microscope,
  Waves,
  Syringe,
  Cpu,
  Target,
  ClipboardCheck,
} from "lucide-react";

const educationalPages = [
  {
    title: "Próstata Aumentada (HPB) e Tratamentos",
    description:
      "Sintomas, diagnóstico e opções modernas (RTU, HoLEP, ThuLEP e Rezum) para hiperplasia prostática benigna.",
    href: "/educativo/hiperplasia-prostatica",
    icon: <Heart className="w-5 h-5" />,
    color: "bg-[#B87333]/10 text-[#8B5A2B]",
  },
  {
    title: "Exame e Biópsia de Próstata",
    description:
      "Quando iniciar o check-up urológico, PSA, toque retal, preparo e como funciona a biópsia guiada com segurança.",
    href: "/educativo/exame-prostata",
    icon: <Search className="w-5 h-5" />,
    color: "bg-[#1C3D5A]/8 text-[#1C3D5A]",
  },
  {
    title: "Câncer de Próstata e Tratamentos",
    description:
      "Do rastreamento e estadiamento à vigilância ativa, cirurgia robótica (RARP), radioterapia e hormonioterapia.",
    href: "/educativo/cancer-prostata",
    icon: <Microscope className="w-5 h-5" />,
    color: "bg-[#B87333]/10 text-[#8B5A2B]",
  },
  {
    title: "Câncer de Bexiga",
    description:
      "Fatores de risco, investigação de sangue na urina (hematúria), estadiamento, RTU-B, BCG e cistectomia.",
    href: "/educativo/cancer-bexiga",
    icon: <Target className="w-5 h-5" />,
    color: "bg-[#1C3D5A]/8 text-[#1C3D5A]",
  },
  {
    title: "Cirurgia Robótica e Minimamente Invasiva",
    description:
      "Plataforma robótica, laparoscopia e endoscopia: visão 3D, menor sangramento, menos dor e recuperação rápida.",
    href: "/educativo/cirurgia-robotica",
    icon: <Cpu className="w-5 h-5" />,
    color: "bg-[#1C3D5A]/8 text-[#1C3D5A]",
  },
  {
    title: "Cálculos Renais e Litotripsia a Laser",
    description:
      "Prevenção de pedras nos rins, ureteroscopia flexível a laser sem cortes e cuidados com o cateter duplo J.",
    href: "/educativo/calculos-renais",
    icon: <Zap className="w-5 h-5" />,
    color: "bg-[#B87333]/10 text-[#8B5A2B]",
  },
  {
    title: "Urodinâmica, Incontinência e Infecções",
    description:
      "Avaliação urodinâmica, tratamento da perda urinária (Kegel, sling, esfíncter) e infecção urinária no homem.",
    href: "/educativo/incontinencia-urinaria",
    icon: <Waves className="w-5 h-5" />,
    color: "bg-[#1C3D5A]/8 text-[#1C3D5A]",
  },
  {
    title: "Disfunção Erétil e Doença de Peyronie",
    description:
      "Investigação vascular, terapias medicamentosas, tratamento da curvatura peniana adquirida e próteses.",
    href: "/educativo/disfuncao-eretil",
    icon: <Activity className="w-5 h-5" />,
    color: "bg-[#B87333]/10 text-[#8B5A2B]",
  },
  {
    title: "Testosterona e Síndrome Metabólica",
    description:
      "Deficiência androgênica (hipogonadismo), reposição hormonal segura, controle de peso e longevidade masculina.",
    href: "/educativo/hipogonadismo",
    icon: <Pill className="w-5 h-5" />,
    color: "bg-[#B87333]/10 text-[#8B5A2B]",
  },
  {
    title: "Vasectomia e Fertilidade Masculina",
    description:
      "Vasectomia sem bisturi, reversão microcirúrgica, investigação de varicocele, espermograma e reprodução.",
    href: "/educativo/vasectomia",
    icon: <Shield className="w-5 h-5" />,
    color: "bg-[#1C3D5A]/8 text-[#1C3D5A]",
  },
  {
    title: "Estética Íntima e Procedimentos",
    description:
      "Engrossamento peniano com ácido hialurônico, postectomia (fimose), correção de varicocele e HPV.",
    href: "/educativo/engrossamento-peniano",
    icon: <Syringe className="w-5 h-5" />,
    color: "bg-[#B87333]/10 text-[#8B5A2B]",
  },
  {
    title: "Orientações Pré e Pós-Operatórias",
    description:
      "Checklist completo de preparo cirúrgico, jejum, medicações, cuidados na recuperação e sinais de alerta.",
    href: "/educativo/orientacoes-pre-operatorias",
    icon: <ClipboardCheck className="w-5 h-5" />,
    color: "bg-[#1C3D5A]/8 text-[#1C3D5A]",
  },
];

export default function EducationalPreviewSection() {
  return (
    <section id="educativo" className="py-16 lg:py-20 bg-[#F8FAFB]">
      <div className="container max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-[#B87333]" />
            <span className="text-xs font-semibold text-[#B87333] uppercase tracking-widest">
              Conteúdo Educativo
            </span>
          </div>
          <h2 className="text-2xl lg:text-4xl text-[#1C3D5A] dark:text-foreground mb-3 font-serif">
            Informação de Qualidade para o Paciente
          </h2>
          <p className="text-sm text-[#1C3D5A] dark:text-foreground/50 max-w-xl mx-auto">
            Material educativo baseado em evidências científicas das principais guidelines internacionais (EAU, AUA, SBU) e livros de referência.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {educationalPages.map((page, i) => (
            <motion.div
              key={page.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link href={page.href}>
                <div className="group card-hover bg-white dark:bg-card rounded-xl border border-[#1C3D5A]/6 p-5 h-full hover:border-[#B87333]/30 cursor-pointer">
                  <div className={`w-10 h-10 rounded-lg ${page.color} flex items-center justify-center mb-3`}>
                    {page.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-[#1C3D5A] dark:text-foreground mb-1.5 group-hover:text-[#B87333] transition-colors">
                    {page.title}
                  </h3>
                  <p className="text-xs text-[#1C3D5A] dark:text-foreground/45 leading-relaxed mb-3">
                    {page.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs font-medium text-[#B87333] opacity-0 group-hover:opacity-100 transition-opacity">
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
