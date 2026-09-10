import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function PrivacyPolicy() {
  usePageMeta({
    title: "Política de Privacidade",
    description: "Política de Privacidade e Proteção de Dados (LGPD) do site do Dr. Felipe de Bulhões. Saiba como coletamos, usamos e protegemos seus dados pessoais.",
    canonical: "https://felipebulhoes.com/privacidade",
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F2A3F]">
      {/* Header */}
      <div className="bg-[#1C3D5A] py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <Link href="/" className="text-[#C4C4C4] hover:text-white text-sm mb-4 inline-flex items-center gap-1 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Voltar ao início
          </Link>
          <h1 className="text-3xl md:text-4xl text-white mt-4" style={{ fontFamily: "'Callingstone', Georgia, serif", fontStyle: "italic" }}>
            Política de Privacidade
          </h1>
          <p className="text-[#C4C4C4] mt-3 text-sm">
            Última atualização: 10 de setembro de 2026
          </p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none text-[#1C3D5A] dark:text-gray-200 space-y-8">
          
          {/* Introdução */}
          <section>
            <p className="text-lg leading-relaxed">
              O <strong>Dr. Felipe de Bulhões Ojeda</strong> (CRM-SP 202291), doravante denominado "Controlador", 
              compromete-se com a proteção dos dados pessoais dos usuários deste site, em conformidade com a 
              <strong> Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018)</strong>, o 
              Código de Defesa do Consumidor (Lei nº 8.078/1990) e as resoluções do Conselho Federal de Medicina (CFM).
            </p>
            <p className="leading-relaxed">
              Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos e protegemos 
              suas informações pessoais ao acessar nosso site, preencher formulários em plataformas de publicidade,
              solicitar contato, utilizar nossos canais de comunicação ou agendar atendimento.
            </p>
          </section>

          {/* 1. Dados coletados */}
          <section>
            <h2 className="text-2xl text-[#1C3D5A] dark:text-white border-b border-[#C4C4C4] pb-2">
              1. Dados Pessoais Coletados
            </h2>
            <p className="leading-relaxed">Podemos coletar os seguintes dados pessoais:</p>
            
            <h3 className="text-xl text-[#1C3D5A] dark:text-gray-100 mt-4">1.1 Dados fornecidos voluntariamente</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nome completo</li>
              <li>Endereço de e-mail</li>
              <li>Número de telefone/WhatsApp</li>
              <li>Preferências administrativas de contato, local, modalidade e período de atendimento</li>
              <li>Mensagens enviadas via formulário de contato ou chat</li>
            </ul>
            <p className="mt-4 leading-relaxed">
              Formulários de captação em plataformas de publicidade, como o TikTok Ads, destinam-se somente a
              contato e agendamento. <strong>Não envie sintomas, diagnósticos, exames, medicamentos, fotografias
              ou outras informações de saúde nesses formulários.</strong>
            </p>

            <h3 className="text-xl text-[#1C3D5A] dark:text-gray-100 mt-4">1.2 Dados coletados automaticamente</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Endereço IP</li>
              <li>Tipo de navegador e dispositivo</li>
              <li>Páginas visitadas e tempo de permanência</li>
              <li>Origem do acesso (referrer)</li>
              <li>Cookies e identificadores de sessão</li>
              <li>Dados de geolocalização aproximada (cidade/estado)</li>
              <li>Campanha, anúncio e página de origem do acesso</li>
            </ul>
          </section>

          {/* 2. Finalidades */}
          <section>
            <h2 className="text-2xl text-[#1C3D5A] dark:text-white border-b border-[#C4C4C4] pb-2">
              2. Finalidades do Tratamento
            </h2>
            <p className="leading-relaxed">Utilizamos seus dados pessoais para as seguintes finalidades:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Agendamento de consultas:</strong> facilitar o contato e agendamento de atendimentos médicos</li>
              <li><strong>Atendimento administrativo:</strong> responder solicitações sobre horários, locais, modalidades e funcionamento da consulta</li>
              <li><strong>Comunicação transacional:</strong> enviar confirmações e informações relacionadas à solicitação feita pelo titular</li>
              <li><strong>Melhoria do site:</strong> analisar padrões de uso para aprimorar a experiência do usuário</li>
              <li><strong>Mensuração de campanhas:</strong> avaliar o desempenho da publicidade sem transmitir dados de saúde às plataformas</li>
              <li><strong>Marketing opcional:</strong> enviar conteúdos educativos e informações sobre serviços somente quando houver escolha específica do titular</li>
              <li><strong>Obrigações legais:</strong> cumprir exigências regulatórias e do CFM</li>
              <li><strong>Segurança:</strong> prevenir fraudes e proteger a integridade do site</li>
            </ul>
          </section>

          {/* 3. Base legal */}
          <section>
            <h2 className="text-2xl text-[#1C3D5A] dark:text-white border-b border-[#C4C4C4] pb-2">
              3. Base Legal para o Tratamento
            </h2>
            <p className="leading-relaxed">A hipótese legal é definida de acordo com cada finalidade. As principais hipóteses utilizadas são:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Consentimento (Art. 7º, I):</strong> para envio de comunicações de marketing e uso de cookies não essenciais</li>
              <li><strong>Procedimentos preliminares a pedido do titular e execução de contrato (Art. 7º, V):</strong> para responder a pedidos de contato, organizar agendamentos e prestar serviços solicitados</li>
              <li><strong>Cumprimento de obrigação legal ou regulatória (Art. 7º, II):</strong> quando o tratamento for exigido pela legislação aplicável</li>
              <li><strong>Exercício regular de direitos (Art. 7º, VI):</strong> para defesa em processos judiciais ou administrativos</li>
              <li><strong>Legítimo interesse (Art. 7º, IX):</strong> para segurança, prevenção de fraude e melhoria dos serviços, após avaliação de necessidade, expectativa e salvaguardas, sem aplicação a dados de saúde</li>
              <li><strong>Tutela da saúde (Art. 11, II, “f”):</strong> para dados de saúde indispensáveis a procedimento realizado por profissional ou serviço de saúde, em fluxo assistencial separado da captação publicitária</li>
            </ul>
          </section>

          {/* 4. Cookies */}
          <section>
            <h2 className="text-2xl text-[#1C3D5A] dark:text-white border-b border-[#C4C4C4] pb-2">
              4. Cookies e Tecnologias de Rastreamento
            </h2>
            <p className="leading-relaxed">Utilizamos cookies para melhorar sua experiência. Os cookies são classificados em:</p>
            
            <div className="overflow-x-auto mt-4">
              <table className="w-full border-collapse border border-[#C4C4C4] text-sm">
                <thead>
                  <tr className="bg-[#1C3D5A] text-white">
                    <th className="border border-[#C4C4C4] p-3 text-left">Categoria</th>
                    <th className="border border-[#C4C4C4] p-3 text-left">Finalidade</th>
                    <th className="border border-[#C4C4C4] p-3 text-left">Consentimento</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="dark:bg-[#1a3a52]">
                    <td className="border border-[#C4C4C4] p-3 font-semibold">Essenciais</td>
                    <td className="border border-[#C4C4C4] p-3">Funcionamento básico do site, sessão, preferências de tema</td>
                    <td className="border border-[#C4C4C4] p-3">Não necessário</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-[#0F2A3F]">
                    <td className="border border-[#C4C4C4] p-3 font-semibold">Analytics</td>
                    <td className="border border-[#C4C4C4] p-3">Google Analytics 4 — métricas de uso e performance</td>
                    <td className="border border-[#C4C4C4] p-3">Necessário</td>
                  </tr>
                  <tr className="dark:bg-[#1a3a52]">
                    <td className="border border-[#C4C4C4] p-3 font-semibold">Marketing</td>
                    <td className="border border-[#C4C4C4] p-3">Google Ads e Meta Pixel — mensuração de campanhas e remarketing, quando autorizados</td>
                    <td className="border border-[#C4C4C4] p-3">Necessário</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4 leading-relaxed">
              Você pode gerenciar suas preferências de cookies a qualquer momento através do banner de cookies 
              exibido no site ou nas configurações do seu navegador.
            </p>
          </section>

          {/* 5. Compartilhamento */}
          <section>
            <h2 className="text-2xl text-[#1C3D5A] dark:text-white border-b border-[#C4C4C4] pb-2">
              5. Compartilhamento de Dados
            </h2>
            <p className="leading-relaxed">Seus dados pessoais podem ser compartilhados com:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google LLC:</strong> para serviços de analytics e publicidade (Google Analytics, Google Ads)</li>
              <li><strong>Meta Platforms:</strong> para mensuração de campanhas por meio do Meta Pixel, conforme as preferências de cookies</li>
              <li><strong>TikTok Ads:</strong> quando você preenche um formulário instantâneo, para receber e encaminhar os dados administrativos necessários à solicitação de contato</li>
              <li><strong>Plataformas de agendamento:</strong> Doctoralia e Rede D'Or para marcação de consultas</li>
              <li><strong>Serviços de comunicação:</strong> WhatsApp, e-mail e telefonia para responder à solicitação pelo canal escolhido</li>
              <li><strong>Hospedagem, banco de dados e CRM:</strong> prestadores estritamente necessários à operação, segurança e registro do contato</li>
              <li><strong>Autoridades competentes:</strong> quando exigido por lei ou ordem judicial</li>
            </ul>
            <p className="mt-4 leading-relaxed">
              Não compartilhamos dados de saúde com plataformas de publicidade para segmentação, criação de públicos,
              remarketing ou mensuração. O preenchimento de um formulário de contato não autoriza automaticamente o
              envio de marketing; essa escolha, quando oferecida, é apresentada separadamente e pode ser revogada.
            </p>
            <p className="mt-4 leading-relaxed">
              <strong>Não vendemos, alugamos ou cedemos</strong> seus dados pessoais a terceiros para fins comerciais.
            </p>
          </section>

          {/* 6. Armazenamento e segurança */}
          <section>
            <h2 className="text-2xl text-[#1C3D5A] dark:text-white border-b border-[#C4C4C4] pb-2">
              6. Armazenamento e Segurança
            </h2>
            <p className="leading-relaxed">
              Seus dados são armazenados em servidores seguros com criptografia TLS/SSL. 
              Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, 
              destruição, perda, alteração ou divulgação indevida, incluindo:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Criptografia de dados em trânsito (HTTPS/TLS)</li>
              <li>Controle de acesso baseado em funções</li>
              <li>Monitoramento contínuo de segurança</li>
              <li>Backups regulares</li>
            </ul>
            <p className="mt-4 leading-relaxed">
              Aplicamos prazos de retenção conforme a finalidade. Leads que não resultem em agendamento são mantidos
              por até 180 dias após o último contato relevante e depois eliminados ou anonimizados, salvo obrigação
              legal ou necessidade de exercício regular de direitos. Registros de consentimento para marketing são
              mantidos enquanto a autorização estiver ativa e pelo período necessário para demonstrar sua gestão;
              a revogação interrompe novos envios promocionais.
            </p>
            <p className="mt-4 leading-relaxed">
              O TikTok informa que leads ficam disponíveis em seu Ads Manager por até 90 dias. Esse prazo operacional
              não amplia a retenção adotada pelo Controlador. Dados que passem a integrar prontuário médico seguem
              regras assistenciais e legais próprias, distintas das aplicáveis a um lead de campanha, incluindo a
              Lei nº 13.787/2018.
            </p>
          </section>

          {/* 7. Direitos do titular */}
          <section>
            <h2 className="text-2xl text-[#1C3D5A] dark:text-white border-b border-[#C4C4C4] pb-2">
              7. Seus Direitos (Art. 18 da LGPD)
            </h2>
            <p className="leading-relaxed">Como titular dos dados, você tem direito a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Confirmação</strong> da existência de tratamento de seus dados</li>
              <li><strong>Acesso</strong> aos dados pessoais que mantemos sobre você</li>
              <li><strong>Correção</strong> de dados incompletos, inexatos ou desatualizados</li>
              <li><strong>Anonimização, bloqueio ou eliminação</strong> de dados desnecessários ou excessivos</li>
              <li><strong>Portabilidade</strong> dos dados a outro fornecedor de serviço</li>
              <li><strong>Eliminação</strong> dos dados tratados com base no consentimento</li>
              <li><strong>Informação</strong> sobre entidades com as quais compartilhamos seus dados</li>
              <li><strong>Informação</strong> sobre a possibilidade de não fornecer consentimento e suas consequências</li>
              <li><strong>Oposição</strong> ao tratamento realizado em desconformidade com a LGPD</li>
              <li><strong>Revogação</strong> do consentimento a qualquer momento</li>
            </ul>
            <p className="mt-4 leading-relaxed">
              Para exercer qualquer desses direitos, entre em contato pelo e-mail: {" "}
              <a href="mailto:contato@felipebulhoes.com" className="text-[#B87333] hover:underline font-semibold">
                contato@felipebulhoes.com
              </a>
            </p>
          </section>

          {/* 8. Dados sensíveis */}
          <section>
            <h2 className="text-2xl text-[#1C3D5A] dark:text-white border-b border-[#C4C4C4] pb-2">
              8. Dados Sensíveis de Saúde
            </h2>
            <p className="leading-relaxed">
              Informações sobre saúde e vida sexual são dados pessoais sensíveis pela LGPD (Art. 5º, II).
              Elas não devem ser enviadas em formulários de publicidade, comentários de redes sociais ou canais
              administrativos de agendamento. Quando um dado de saúde for necessário ao atendimento, sua coleta
              ocorrerá em canal assistencial apropriado, com finalidade definida e uma hipótese do Art. 11 da LGPD,
              incluindo a <strong>tutela da saúde</strong> (Art. 11, II, "f") quando aplicável.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Acesso restrito apenas ao profissional de saúde responsável</li>
              <li>Não utilização para fins de marketing ou publicidade</li>
              <li>Sigilo médico conforme Código de Ética Médica (Resolução CFM nº 2.217/2018)</li>
              <li>Armazenamento com camada adicional de proteção</li>
            </ul>
          </section>

          {/* 9. Menores */}
          <section>
            <h2 className="text-2xl text-[#1C3D5A] dark:text-white border-b border-[#C4C4C4] pb-2">
              9. Crianças e Adolescentes
            </h2>
            <p className="leading-relaxed">
              Este site não é direcionado a menores de 18 anos. Não coletamos intencionalmente dados 
              de crianças ou adolescentes. Caso um responsável legal identifique que dados de um menor 
              foram coletados, solicitamos contato imediato para que possamos proceder à eliminação.
            </p>
          </section>

          {/* 10. Transferência internacional */}
          <section>
            <h2 className="text-2xl text-[#1C3D5A] dark:text-white border-b border-[#C4C4C4] pb-2">
              10. Transferência Internacional de Dados
            </h2>
            <p className="leading-relaxed">
              Alguns prestadores, incluindo plataformas de publicidade, comunicação, analytics e hospedagem,
              podem tratar dados fora do Brasil. Quando houver transferência internacional, adotamos um mecanismo
              previsto no Art. 33 da LGPD e na Resolução CD/ANPD nº 19/2024, conforme o fluxo e o fornecedor,
              além de medidas de transparência, necessidade e segurança.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Decisão de adequação, quando aplicável</li>
              <li>Cláusulas-padrão contratuais ou cláusulas específicas aprovadas pela ANPD</li>
              <li>Outros mecanismos legalmente válidos para a transferência concreta</li>
            </ul>
          </section>

          {/* 11. Alterações */}
          <section>
            <h2 className="text-2xl text-[#1C3D5A] dark:text-white border-b border-[#C4C4C4] pb-2">
              11. Alterações nesta Política
            </h2>
            <p className="leading-relaxed">
              Esta Política de Privacidade pode ser atualizada periodicamente. Quaisquer alterações 
              significativas serão comunicadas através de aviso no site. A data da última atualização 
              está indicada no topo deste documento.
            </p>
          </section>

          {/* 12. Contato */}
          <section>
            <h2 className="text-2xl text-[#1C3D5A] dark:text-white border-b border-[#C4C4C4] pb-2">
              12. Canal de Privacidade
            </h2>
            <p className="leading-relaxed">
              Para exercer direitos ou esclarecer questões relacionadas à proteção de dados pessoais,
              entre em contato com o canal abaixo:
            </p>
            <div className="bg-gray-50 dark:bg-[#1a3a52] p-6 rounded-lg mt-4 border border-[#C4C4C4]/30">
              <p className="font-semibold text-[#1C3D5A] dark:text-white">Dr. Felipe de Bulhões Ojeda</p>
              <p className="mt-2">
                <strong>E-mail:</strong>{" "}
                <a href="mailto:contato@felipebulhoes.com" className="text-[#B87333] hover:underline">
                  contato@felipebulhoes.com
                </a>
              </p>
              <p className="mt-1">
                <strong>WhatsApp:</strong>{" "}
                <a href="https://wa.me/5511981124455" className="text-[#B87333] hover:underline">
                  (11) 98112-4455
                </a>
              </p>
              <p className="mt-1">
                <strong>Endereço:</strong> Av. Ibirapuera, 2907 — Moema, São Paulo/SP
              </p>
            </div>
          </section>

          {/* 13. ANPD */}
          <section>
            <h2 className="text-2xl text-[#1C3D5A] dark:text-white border-b border-[#C4C4C4] pb-2">
              13. Autoridade Nacional de Proteção de Dados
            </h2>
            <p className="leading-relaxed">
              Caso entenda que o tratamento de seus dados pessoais viola a LGPD, você tem direito 
              de apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD):
            </p>
            <p className="mt-2">
              <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" className="text-[#B87333] hover:underline font-semibold">
                www.gov.br/anpd
              </a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
