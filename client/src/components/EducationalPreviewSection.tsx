/*
 * Design: Dr. Felipe de Bulhões — Direção Editorial
 * Conteúdo educativo: índice numerado de 12 guias, em duas colunas no desktop.
 */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { trackCtaClick } from "@/lib/analytics";

const educationalPages = [
  {
    title: "Próstata Aumentada (HPB) e Tratamentos",
    description:
      "Sintomas, diagnóstico e opções modernas (RTU, HoLEP, ThuLEP e Rezum) para hiperplasia prostática benigna.",
    href: "/educativo/hiperplasia-prostatica",
  },
  {
    title: "Exame e Biópsia de Próstata",
    description:
      "Quando iniciar o check-up urológico, PSA, toque retal, preparo e como funciona a biópsia guiada com segurança.",
    href: "/educativo/exame-prostata",
  },
  {
    title: "Câncer de Próstata e Tratamentos",
    description:
      "Do rastreamento e estadiamento à vigilância ativa, cirurgia robótica (RARP), radioterapia e hormonioterapia.",
    href: "/educativo/cancer-prostata",
  },
  {
    title: "Câncer de Bexiga",
    description:
      "Fatores de risco, investigação de sangue na urina (hematúria), estadiamento, RTU-B, BCG e cistectomia.",
    href: "/educativo/cancer-bexiga",
  },
  {
    title: "Cirurgia Robótica e Minimamente Invasiva",
    description:
      "Plataforma robótica, laparoscopia e endoscopia: visão 3D, menor sangramento, menos dor e recuperação rápida.",
    href: "/educativo/cirurgia-robotica",
  },
  {
    title: "Cálculos Renais e Litotripsia a Laser",
    description:
      "Prevenção de pedras nos rins, ureteroscopia flexível a laser sem cortes e cuidados com o cateter duplo J.",
    href: "/educativo/calculos-renais",
  },
  {
    title: "Urodinâmica, Incontinência e Infecções",
    description:
      "Avaliação urodinâmica, tratamento da perda urinária (Kegel, sling, esfíncter) e infecção urinária no homem.",
    href: "/educativo/incontinencia-urinaria",
  },
  {
    title: "Disfunção Erétil e Doença de Peyronie",
    description:
      "Investigação vascular, terapias medicamentosas, tratamento da curvatura peniana adquirida e próteses.",
    href: "/educativo/disfuncao-eretil",
  },
  {
    title: "Testosterona e Síndrome Metabólica",
    description:
      "Deficiência androgênica (hipogonadismo), reposição hormonal segura, controle de peso e longevidade masculina.",
    href: "/educativo/hipogonadismo",
  },
  {
    title: "Vasectomia e Fertilidade Masculina",
    description:
      "Vasectomia sem bisturi, reversão microcirúrgica, investigação de varicocele, espermograma e reprodução.",
    href: "/educativo/vasectomia",
  },
  {
    title: "Estética Íntima e Procedimentos",
    description:
      "Engrossamento peniano com ácido hialurônico, postectomia (fimose), correção de varicocele e HPV.",
    href: "/educativo/engrossamento-peniano",
  },
  {
    title: "Orientações Pré e Pós-Operatórias",
    description:
      "Checklist completo de preparo cirúrgico, jejum, medicações, cuidados na recuperação e sinais de alerta.",
    href: "/educativo/orientacoes-pre-operatorias",
  },
];

export default function EducationalPreviewSection() {
  return (
    <section id="educativo" className="editorial-section editorial-guides">
      <div className="editorial-wrap">
        <div className="editorial-head">
          <p className="editorial-kicker">Conteúdo Educativo</p>
          <h2 className="editorial-display editorial-title">
            Informação de Qualidade para o Paciente
          </h2>
          <p className="editorial-intro">
            Material educativo baseado em evidências científicas das principais guidelines
            internacionais (EAU, AUA, SBU) e livros de referência.
          </p>
        </div>

        <ol className="editorial-guide-list">
          {educationalPages.map((page, index) => (
            <li key={page.href}>
              <Link
                href={page.href}
                className="editorial-guide"
                onClick={() => trackCtaClick("guia_educativo", page.href)}
              >
                <span className="editorial-row-num">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="editorial-row-title">{page.title}</h3>
                <ArrowRight className="editorial-row-arrow" aria-hidden="true" />
                <p className="editorial-guide-desc">{page.description}</p>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
