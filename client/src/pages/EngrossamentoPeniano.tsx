import EducationalLayout from "@/components/EducationalLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Clock, Shield, Users } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FaviconInjector } from "@/components/FaviconInjector";

export default function EngrossamentoPeniano() {
  const faqItems = [
    {
      question: "Qual é a diferença entre ácido hialurônico e outros preenchimentos?",
      answer:
        "O ácido hialurônico (AH) é reversível, biodegradável e tem excelente perfil de segurança. Diferentemente de preenchimentos permanentes como PMMA (polimetilmetacrilato), que foram banidos em vários países devido a complicações, o AH é reabsorvido naturalmente pelo corpo em 12-18 meses. Isso permite ajustes ou reversão se necessário.",
    },
    {
      question: "Quanto tempo dura o resultado?",
      answer:
        "Os resultados do ácido hialurônico duram aproximadamente 12-18 meses, dependendo da metabolização individual, estilo de vida e atividade física. Estudos clínicos mostram que a durabilidade pode variar conforme fatores como uso de dispositivos de vácuo ou atividade sexual intensa.",
    },
    {
      question: "Qual é o aumento de circunferência esperado?",
      answer:
        "Em média, cada sessão de injeção de AH resulta em aumento de 0,63 cm de circunferência peniana. Com múltiplas sessões (geralmente 3), é possível atingir aumento total de 1,8-2,0 cm. O aumento é mensurável e consistente entre os estudos publicados.",
    },
    {
      question: "Existem complicações sérias?",
      answer:
        "Em estudo retrospectivo de quase 500 homens, todas as complicações foram menores (grau Clavien-Dindo 1-2): infecções (0,42%), granulomas (0,63%) e hematomas leves. Nenhum paciente relatou disfunção erétil ou perda de sensibilidade. Complicações graves são extremamente raras.",
    },
    {
      question: "O procedimento é reversível?",
      answer:
        "Sim. O ácido hialurônico pode ser degradado pela enzima hialuronidase se necessário. Isso oferece uma vantagem significativa sobre preenchimentos permanentes, permitindo correção de resultados insatisfatórios.",
    },
    {
      question: "Qual é o nível de satisfação dos pacientes?",
      answer:
        "Estudos mostram satisfação média de 3,71 ± 0,46 (em escala 0-4) em 1 mês e 3,34 ± 0,53 em 18 meses. A satisfação dos parceiros também é alta (3,65 ± 0,48 em 1 mês). Melhora significativa em confiança sexual, autoestima e satisfação no relacionamento.",
    },
    {
      question: "Quem é candidato ideal para o procedimento?",
      answer:
        "Homens com preocupações estéticas sobre circunferência peniana, sem transtorno dismórfico corporal, com expectativas realistas e sem contraindicações médicas. Avaliação psicológica é recomendada. Homens com pênis de tamanho normal que desejam aumento cosmético são candidatos comuns.",
    },
    {
      question: "Há restrições de atividade após o procedimento?",
      answer:
        "Recomenda-se evitar atividade sexual por 1 semana. Atividade física moderada pode ser retomada após 2-3 dias. Monitoramento de sinais de complicação (inchaço excessivo, infecção) é importante. Seguimento em 2 semanas e 1 mês é recomendado.",
    },
  ];

  return (
    <>
      <FaviconInjector />
      <EducationalLayout
      title="Engrossamento Peniano com Ácido Hialurônico"
      subtitle="Abordagem Segura e Reversível para Aumento de Circunferência Peniana"
      description="Guia completo sobre engrossamento peniano com ácido hialurônico: técnica, segurança, eficácia e resultados baseados em evidências científicas."
      medicalCondition="Engrossamento Peniano"
    >
      {/* Aviso Importante */}
      <Alert className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950 mb-8">
        <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          <strong>Informação Importante:</strong> Este conteúdo é educativo. O engrossamento peniano com ácido hialurônico é um procedimento eletivo que deve ser realizado por urologista qualificado após avaliação clínica completa e consentimento informado.
        </AlertDescription>
      </Alert>

      {/* Introdução */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-[#1C3D5A]" />
            Introdução
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-justify">
          <p>
            O engrossamento peniano com ácido hialurônico (AH) é um procedimento minimamente invasivo que surgiu como alternativa segura e reversível para homens que desejam aumentar a circunferência peniana. Diferentemente de técnicas cirúrgicas tradicionais, que envolvem enxertos de pele ou transferência de gordura com riscos significativos, o preenchimento com AH oferece recuperação rápida, resultados previsíveis e possibilidade de reversão.
          </p>
          <p>
            A demanda por procedimentos de aumento peniano tem crescido, impulsionada por pressões sociais, padrões estéticos em evolução e maior conscientização sobre tratamentos disponíveis. Estudos mostram que 14-20% dos homens relatam insatisfação com o tamanho peniano, o que pode impactar autoconfiança, satisfação sexual e qualidade de vida.
          </p>
          <p>
            Sociedades científicas como a Sexual Medicine Society of North America (SMSNA) e a European Association of Urology (EAU) reconhecem o ácido hialurônico como opção segura e eficaz quando aplicado por profissionais qualificados com protocolos adequados.
          </p>
        </CardContent>
      </Card>

      {/* Anatomia e Técnica */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#1C3D5A]" />
            Anatomia e Técnica de Injeção
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-justify">
          <p>
            O sucesso e a segurança do procedimento dependem de conhecimento profundo da anatomia peniana. O pênis é composto por várias camadas:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Pele:</strong> camada externa sensível
            </li>
            <li>
              <strong>Fáscia de Dartos:</strong> camada muscular superficial
            </li>
            <li>
              <strong>Fáscia de Buck:</strong> membrana fibrosa que envolve os corpos cavernosos
            </li>
            <li>
              <strong>Túnica Albugínea:</strong> membrana que envolve os corpos cavernosos
            </li>
            <li>
              <strong>Estruturas Neurovasculares:</strong> veias dorsais, artérias e nervo dorsal (críticas para evitar)
            </li>
          </ul>
          <p>
            O ácido hialurônico é injetado no plano entre a fáscia de Dartos e a fáscia de Buck, evitando estruturas críticas. A técnica utiliza cânula de 22G com guia ultrassonográfica para garantir colocação precisa. Duas pontas de entrada são criadas na base do pênis (posições 10h e 2h), permitindo distribuição uniforme do preenchimento através de técnica de leque.
          </p>
          <p>
            Após a injeção, moldagem manual é realizada para otimizar contorno e distribuição. Protocolos pós-procedimento padronizados (como o PhalloFILL) incluem uso de roupa de compressão especial para minimizar edema e garantir resultados naturais.
          </p>
        </CardContent>
      </Card>

      {/* Eficácia Clínica */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-[#1C3D5A]" />
            Eficácia Clínica Baseada em Evidências
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-justify">
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Resultados de Estudos Clínicos:</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Aumento de Circunferência:</strong> 0,63 cm por sessão em média; aumento total de 1,8 cm com múltiplas sessões
              </li>
              <li>
                <strong>Durabilidade:</strong> 12-18 meses, com possibilidade de manutenção com sessões de toque
              </li>
              <li>
                <strong>Satisfação do Paciente:</strong> 3,71 ± 0,46 (escala 0-4) em 1 mês; 3,34 ± 0,53 em 18 meses
              </li>
              <li>
                <strong>Satisfação do Parceiro:</strong> 3,65 ± 0,48 em 1 mês; 3,38 ± 0,49 em 18 meses
              </li>
              <li>
                <strong>Melhora Psicológica:</strong> Aumento significativo em confiança sexual, autoestima e satisfação no relacionamento
              </li>
            </ul>
          </div>
          <p>
            Estudo retrospectivo publicado em 2024 avaliou quase 500 homens submetidos a engrossamento peniano com AH. Os resultados demonstraram aumento consistente de circunferência sem complicações graves. Escores de imagem genital masculina (Male Genital Self-Image Scale) melhoraram significativamente, indicando redução de insegurança e vergonha relacionadas ao tamanho peniano.
          </p>
          <p>
            Pesquisa recente utilizando ultrassom de alta resolução confirmou colocação precisa do preenchimento entre as fáscias corretas, com distribuição uniforme e sem migração significativa ao longo de 18 meses.
          </p>
        </CardContent>
      </Card>

      {/* Segurança */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#1C3D5A]" />
            Perfil de Segurança
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-justify">
          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">Complicações Relatadas (Estudo de 500 Pacientes):</h4>
            <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
              <li>
                <strong>Infecções:</strong> 0,42% (2 pacientes) - resolvidas com antibiótico oral
              </li>
              <li>
                <strong>Granulomas:</strong> 0,63% (3 pacientes) - resolvidos com hialuronidase
              </li>
              <li>
                <strong>Hematomas Subcutâneos:</strong> Leves, sem sequelas graves
              </li>
              <li>
                <strong>Edema Transitório:</strong> Resolvido em 1-2 semanas
              </li>
              <li>
                <strong>Disfunção Erétil:</strong> 0% - nenhum paciente relatou
              </li>
              <li>
                <strong>Perda de Sensibilidade:</strong> 0% - sensibilidade preservada
              </li>
            </ul>
          </div>
          <p>
            <strong>Importante:</strong> Todas as complicações foram classificadas como grau Clavien-Dindo 1-2 (leves a moderadas). Nenhuma complicação grave foi relatada. A reversibilidade do ácido hialurônico oferece segurança adicional: se necessário, a enzima hialuronidase pode degradar o preenchimento.
          </p>
          <p>
            Diferentemente de preenchimentos permanentes como PMMA, que foram banidos em vários países, o AH oferece biocompatibilidade superior, risco mínimo de reações inflamatórias crônicas e possibilidade de ajuste ou remoção.
          </p>
        </CardContent>
      </Card>

      {/* Vantagens e Desvantagens */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-700 dark:text-green-400">Vantagens</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Reversível</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pode ser degradado com hialuronidase se necessário</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Seguro</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Perfil de complicações muito baixo</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Minimamente Invasivo</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sem cicatrizes, recuperação rápida</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Resultados Naturais</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Aparência e sensação naturais</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Ajustável</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Múltiplas sessões para resultado gradual</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-orange-700 dark:text-orange-400">Limitações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Temporário</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Dura 12-18 meses; requer manutenção</p>
              </div>
            </div>
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Custo</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Procedimento eletivo; múltiplas sessões necessárias</p>
              </div>
            </div>
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Pesquisa Limitada</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Dados de longo prazo ainda em desenvolvimento</p>
              </div>
            </div>
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Requer Especialista</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Deve ser realizado por urologista qualificado</p>
              </div>
            </div>
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Não Aumenta Comprimento</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Apenas circunferência é aumentada</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Candidatos Ideais */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-[#1C3D5A]" />
            Candidatos Ideais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-justify">
          <p>
            Nem todos os homens são candidatos ideais para engrossamento peniano com ácido hialurônico. Avaliação cuidadosa é essencial:
          </p>
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg space-y-3">
            <div>
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">✓ Candidatos Apropriados:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-blue-800 dark:text-blue-200">
                <li>Homens com pênis de tamanho normal que desejam aumento cosmético</li>
                <li>Preocupação estética genuína com circunferência peniana</li>
                <li>Expectativas realistas sobre resultados</li>
                <li>Sem transtorno dismórfico corporal</li>
                <li>Sem contraindicações médicas</li>
                <li>Capacidade de seguir protocolos pós-procedimento</li>
              </ul>
            </div>
          </div>
          <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg space-y-3">
            <div>
              <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">✗ Contraindicações:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-red-800 dark:text-red-200">
                <li>Transtorno dismórfico corporal ou body dysmorphic disorder (BDD)</li>
                <li>Síndrome do pênis pequeno percebido (sem base objetiva)</li>
                <li>Micropênis verdadeiro (requer avaliação endócrina)</li>
                <li>Infecção ativa ou inflamação peniana</li>
                <li>Histórico de complicações com preenchimentos</li>
                <li>Expectativas irrealistas ou motivação inadequada</li>
              </ul>
            </div>
          </div>
          <p>
            <strong>Avaliação Psicológica:</strong> Recomenda-se avaliação psicológica para descartar transtorno dismórfico corporal, que afeta 1-2% da população e não se beneficia de procedimentos estéticos.
          </p>
        </CardContent>
      </Card>

      {/* Procedimento */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#1C3D5A]" />
            O Procedimento Passo a Passo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-justify">
          <div className="space-y-4">
            <div className="border-l-4 border-[#1C3D5A] pl-4">
              <h4 className="font-semibold mb-2">1. Avaliação Inicial</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Consulta com urologista para história clínica, exame físico e avaliação psicológica. Discussão de expectativas, resultados realistas e possíveis complicações.
              </p>
            </div>
            <div className="border-l-4 border-[#1C3D5A] pl-4">
              <h4 className="font-semibold mb-2">2. Consentimento Informado</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Assinatura de termo de consentimento detalhando procedimento, riscos, benefícios e alternativas.
              </p>
            </div>
            <div className="border-l-4 border-[#1C3D5A] pl-4">
              <h4 className="font-semibold mb-2">3. Anestesia</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Anestesia local com lidocaína (geralmente sem sedação). O procedimento é realizado em consultório.
              </p>
            </div>
            <div className="border-l-4 border-[#1C3D5A] pl-4">
              <h4 className="font-semibold mb-2">4. Injeção de Ácido Hialurônico</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Injeção de 4-5 mL de AH através de cânula de 22G em dois pontos de entrada (10h e 2h). Técnica de leque para distribuição uniforme. Guia ultrassonográfica para colocação precisa entre fáscias.
              </p>
            </div>
            <div className="border-l-4 border-[#1C3D5A] pl-4">
              <h4 className="font-semibold mb-2">5. Moldagem e Contorno</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Moldagem manual pós-injeção para otimizar distribuição e contorno natural.
              </p>
            </div>
            <div className="border-l-4 border-[#1C3D5A] pl-4">
              <h4 className="font-semibold mb-2">6. Protocolo Pós-Procedimento</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Uso de roupa de compressão especial por 7 dias. Monitoramento de edema e complicações. Seguimento em 2 semanas e 1 mês.
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm bg-yellow-50 dark:bg-yellow-950 p-3 rounded">
            <strong>Duração:</strong> Procedimento típico dura 30-45 minutos. Paciente pode retornar às atividades normais imediatamente, com restrição de atividade sexual por 1 semana.
          </p>
        </CardContent>
      </Card>

      {/* Cuidados Pós-Procedimento */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Cuidados Pós-Procedimento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-justify">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">✓ Recomendações</h4>
              <ul className="space-y-2 text-sm">
                <li>• Usar roupa de compressão por 7 dias</li>
                <li>• Aplicar gelo nos primeiros 2-3 dias</li>
                <li>• Manter higiene adequada</li>
                <li>• Monitorar sinais de infecção</li>
                <li>• Seguimento em 2 semanas e 1 mês</li>
                <li>• Relatar qualquer complicação</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
              <h4 className="font-semibold text-red-900 dark:text-red-100 mb-3">✗ Evitar</h4>
              <ul className="space-y-2 text-sm">
                <li>• Atividade sexual por 1 semana</li>
                <li>• Atividade física intensa por 3 dias</li>
                <li>• Banhos quentes nos primeiros 3 dias</li>
                <li>• Uso de sauna ou piscina por 1 semana</li>
                <li>• Manipulação excessiva da área</li>
                <li>• Dispositivos de vácuo por 2 semanas</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Perguntas Frequentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details key={index} className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900">
                <summary className="font-semibold text-[#1C3D5A] dark:text-blue-400 flex items-center justify-between">
                  {item.question}
                  <span className="ml-2">▼</span>
                </summary>
                <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 text-justify">{item.answer}</p>
              </details>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Referências */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Referências Científicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="border-l-4 border-[#1C3D5A] pl-4">
            <p className="font-semibold">1. Pearlman AM, et al.</p>
            <p className="text-gray-600 dark:text-gray-400">
              "OFFICE & SURGICAL TECHNOLOGIES The Evolving Landscape of Penile Girth Enhancement." AUANews, August 2024.
            </p>
          </div>
          <div className="border-l-4 border-[#1C3D5A] pl-4">
            <p className="font-semibold">2. Moon KY, et al.</p>
            <p className="text-gray-600 dark:text-gray-400">
              "Penile Volume Augmentation With Hyaluronic Acid Fillers: Ultrasound Observation." Plastic and Reconstructive Surgery Global Open, 2025;13(12):e7317.
            </p>
          </div>
          <div className="border-l-4 border-[#1C3D5A] pl-4">
            <p className="font-semibold">3. Tardelli F.</p>
            <p className="text-gray-600 dark:text-gray-400">
              "Penile Filling with Hyaluronic Acid – Where Are We?" Ralph E. Hopkins Urology Seminar, February 2025.
            </p>
          </div>
          <div className="border-l-4 border-[#1C3D5A] pl-4">
            <p className="font-semibold">4. Sexual Medicine Society of North America (SMSNA)</p>
            <p className="text-gray-600 dark:text-gray-400">
              Diretrizes sobre procedimentos de aumento peniano e recomendações de segurança.
            </p>
          </div>
          <div className="border-l-4 border-[#1C3D5A] pl-4">
            <p className="font-semibold">5. European Association of Urology (EAU)</p>
            <p className="text-gray-600 dark:text-gray-400">
              Posicionamento sobre procedimentos de aumento peniano e preenchimentos.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Alert className="border-[#1C3D5A] bg-[#1C3D5A]/5 dark:bg-[#1C3D5A]/10">
        <AlertCircle className="h-4 w-4 text-[#1C3D5A]" />
        <AlertDescription className="text-[#1C3D5A] dark:text-blue-300">
          <strong>Tem dúvidas?</strong> Agende uma consulta com o Dr. Felipe de Bulhões para discussão personalizada sobre engrossamento peniano com ácido hialurônico. Avaliação completa e consentimento informado são essenciais.
        </AlertDescription>
      </Alert>
    </EducationalLayout>
    </>
  );
}
