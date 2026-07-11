/*
 * Design: Clinical Precision — Swiss Medical Design
 * Component: Educational Content Preview Section for Home page
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  BookOpen, ArrowRight, Activity, Scissors, Zap, Flame,
  Heart, Dumbbell, Shield, Pill, Stethoscope,
  Search, Microscope, Thermometer, Waves, Syringe, Cpu, Target, Crosshair, Droplets, ClipboardCheck
} from "lucide-react";

const educationalPages = [
  {
    title: "Próstata Aumentada (HPB)",
    description: "O que é, sintomas, diagnóstico e tratamento da hiperplasia prostática benigna — guia acessível para o paciente.",
    href: "/educativo/hiperplasia-prostatica",
    icon: <Heart className="w-5 h-5" />,
    color: "bg-amber-50 text-amber-600",
  },
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
    color: "bg-amber-50 text-amber-600",
  },
  {
    title: "Cálculos Renais",
    description: "Prevenção, tratamentos modernos e tudo sobre o cateter duplo J.",
    href: "/educativo/calculos-renais",
    icon: <Zap className="w-5 h-5" />,
    color: "bg-amber-50 text-amber-600",
  },
  {
    title: "Litotripsia a Laser",
    description: "Como funciona, indicações, tipos de laser, preparo e recuperação — guia completo.",
    href: "/educativo/litotripsia-laser",
    icon: <Flame className="w-5 h-5" />,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Câncer de Próstata",
    description: "Diagnóstico, estadiamento e opções de tratamento — do rastreamento à cirurgia robótica.",
    href: "/educativo/cancer-prostata",
    icon: <Microscope className="w-5 h-5" />,
    color: "bg-rose-50 text-rose-600",
  },
  {
    title: "Tratamento do Câncer de Próstata",
    description: "Vigilância ativa, cirurgia robótica (RARP), radioterapia e hormonioterapia por grupo de risco.",
    href: "/educativo/tratamento-cancer-prostata",
    icon: <Crosshair className="w-5 h-5" />,
    color: "bg-red-50 text-red-600",
  },
  {
    title: "Exame de Próstata",
    description: "Tudo o que você precisa saber: como é, quando fazer e por que não ter medo.",
    href: "/educativo/exame-prostata",
    icon: <Search className="w-5 h-5" />,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Biópsia de Próstata",
    description: "Indicações, preparo, como é feita, pós-biópsia e complicações — guia completo.",
    href: "/educativo/biopsia-prostata",
    icon: <Syringe className="w-5 h-5" />,
    color: "bg-fuchsia-50 text-fuchsia-600",
  },
  {
    title: "Cirurgia Robótica",
    description: "Guia completo: como funciona, indicações, vantagens, procedimentos e recuperação.",
    href: "/educativo/cirurgia-robotica",
    icon: <Cpu className="w-5 h-5" />,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Câncer de Bexiga",
    description: "Fatores de risco, hematúria, diagnóstico, estadiamento, RTU-B, BCG e cistectomia.",
    href: "/educativo/cancer-bexiga",
    icon: <Target className="w-5 h-5" />,
    color: "bg-purple-50 text-purple-600",
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
    title: "Infecção Urinária no Homem",
    description: "Causas, tratamento e quando procurar o urologista.",
    href: "/educativo/infeccao-urinaria",
    icon: <Thermometer className="w-5 h-5" />,
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    title: "Urodinâmica",
    description: "O que é o exame, como funciona e quando é indicado.",
    href: "/educativo/urodinamica",
    icon: <Waves className="w-5 h-5" />,
    color: "bg-sky-50 text-sky-600",
  },
  {
    title: "Incontinência Urinária",
    description: "Tipos, classificação, exercícios de Kegel, sling masculino e esfíncter artificial.",
    href: "/educativo/incontinencia-urinaria",
    icon: <Droplets className="w-5 h-5" />,
    color: "bg-amber-50 text-amber-600",
  },
  {
    title: "Vasectomia",
    description: "Guia completo: preparo, técnica no-scalpel, pós-operatório, espermograma e reversão.",
    href: "/educativo/vasectomia",
    icon: <Shield className="w-5 h-5" />,
    color: "bg-lime-50 text-lime-600",
  },
  {
    title: "Infertilidade Masculina",
    description: "Espermograma, varicocele, azoospermia, terapia hormonal, micro-TESE e reprodução assistida.",
    href: "/educativo/infertilidade-masculina",
    icon: <Heart className="w-5 h-5" />,
    color: "bg-pink-50 text-pink-600",
  },
  {
    title: "Doença de Peyronie",
    description: "Curvatura peniana adquirida: fases, diagnóstico, Xiaflex, plicatura, enxerto e prótese peniana.",
    href: "/educativo/doenca-peyronie",
    icon: <Activity className="w-5 h-5" />,
    color: "bg-violet-50 text-violet-600",
  },
  {
    title: "Procedimentos Urológicos",
    description: "Postectomia, varicocele e HPV — o que esperar.",
    href: "/educativo/procedimentos-andrologicos",
    icon: <Stethoscope className="w-5 h-5" />,
    color: "bg-cyan-50 text-cyan-600",
  },
  {
    title: "Orientações Pré-Operatórias",
    description: "Preparo para cirurgia: jejum, medicamentos, exames e checklist completo.",
    href: "/educativo/orientacoes-pre-operatorias",
    icon: <ClipboardCheck className="w-5 h-5" />,
    color: "bg-amber-50 text-amber-600",
  },
  {
    title: "Orientações Pós-Operatórias",
    description: "Cuidados após cirurgia, sintomas normais e sinais de alerta.",
    href: "/educativo/orientacoes-pos-operatorias",
    icon: <Stethoscope className="w-5 h-5" />,
    color: "bg-amber-50 text-amber-600",
  },
  {
    title: "Engrossamento Peniano",
    description: "Engrossamento peniano com ácido hialurônico: técnica, segurança, eficácia e resultados baseados em evidências.",
    href: "/educativo/engrossamento-peniano",
    icon: <Syringe className="w-5 h-5" />,
    color: "bg-blue-50 text-blue-600",
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
              key={i}
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
