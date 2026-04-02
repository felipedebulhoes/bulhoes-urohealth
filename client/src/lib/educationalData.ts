export interface EducationalPage {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
}

export const educationalPages: EducationalPage[] = [
  {
    slug: "tratamentos-hpb",
    title: "Tratamentos para HPB",
    subtitle: "Hiperplasia Prostática Benigna",
    description:
      "Conheça todas as opções de tratamento para o aumento benigno da próstata, desde medicamentos até as técnicas cirúrgicas mais modernas.",
    icon: "shield",
    color: "#0D9488",
  },
  {
    slug: "cirurgias-minimamente-invasivas",
    title: "Cirurgias Minimamente Invasivas",
    subtitle: "Endourologia, Laparoscopia e Robótica",
    description:
      "Entenda as diferenças entre as técnicas cirúrgicas minimamente invasivas em urologia: endourologia, laparoscopia e cirurgia robótica.",
    icon: "cpu",
    color: "#2563EB",
  },
  {
    slug: "orientacoes-pos-operatorias",
    title: "Orientações Pós-Operatórias",
    subtitle: "Cuidados e Sinais de Alerta",
    description:
      "Saiba o que esperar após as cirurgias urológicas mais frequentes, quais sintomas são normais e quando procurar atendimento médico.",
    icon: "heart-pulse",
    color: "#DC2626",
  },
  {
    slug: "varicocele",
    title: "Varicocele",
    subtitle: "Causas, Diagnóstico e Tratamento",
    description:
      "Entenda o que é varicocele, como é diagnosticada, quando o tratamento é indicado e quais são as técnicas cirúrgicas disponíveis.",
    icon: "activity",
    color: "#0D9488",
  },
];
