import { Link } from "wouter";

export default function PrivacyPolicy() {
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
            Última atualização: 22 de maio de 2026
          </p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none text-[#1C3D5A] dark:text-gray-200 space-y-8">
          
          {/* Introdução */}
          <section>
            <p className="text-lg leading-relaxed">
              O <strong>Dr. Felipe de Bulhões Ojeda</strong> (CRM-SP 000000), doravante denominado "Controlador", 
              compromete-se com a proteção dos dados pessoais dos usuários deste site, em conformidade com a 
              <strong> Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018)</strong>, o 
              Código de Defesa do Consumidor (Lei nº 8.078/1990) e as resoluções do Conselho Federal de Medicina (CFM).
            </p>
            <p className="leading-relaxed">
              Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos e protegemos 
              suas informações pessoais ao acessar nosso site e utilizar nossos serviços.
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
              <li>Mensagens enviadas via formulário de contato ou chat</li>
              <li>Informações sobre sintomas ou condições de saúde (quando informadas voluntariamente no chat)</li>
            </ul>

            <h3 className="text-xl text-[#1C3D5A] dark:text-gray-100 mt-4">1.2 Dados coletados automaticamente</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Endereço IP</li>
              <li>Tipo de navegador e dispositivo</li>
              <li>Páginas visitadas e tempo de permanência</li>
              <li>Origem do acesso (referrer)</li>
              <li>Cookies e identificadores de sessão</li>
              <li>Dados de geolocalização aproximada (cidade/estado)</li>
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
              <li><strong>Comunicação:</strong> responder dúvidas, enviar confirmações e informações relevantes sobre saúde</li>
              <li><strong>Melhoria do site:</strong> analisar padrões de uso para aprimorar a experiência do usuário</li>
              <li><strong>Marketing (com consentimento):</strong> enviar conteúdos educativos sobre saúde urológica</li>
              <li><strong>Obrigações legais:</strong> cumprir exigências regulatórias e do CFM</li>
              <li><strong>Segurança:</strong> prevenir fraudes e proteger a integridade do site</li>
            </ul>
          </section>

          {/* 3. Base legal */}
          <section>
            <h2 className="text-2xl text-[#1C3D5A] dark:text-white border-b border-[#C4C4C4] pb-2">
              3. Base Legal para o Tratamento
            </h2>
            <p className="leading-relaxed">O tratamento de dados pessoais é realizado com base nas seguintes hipóteses legais (Art. 7º da LGPD):</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Consentimento (Art. 7º, I):</strong> para envio de comunicações de marketing e uso de cookies não essenciais</li>
              <li><strong>Execução de contrato (Art. 7º, V):</strong> para agendamento e prestação de serviços médicos</li>
              <li><strong>Exercício regular de direitos (Art. 7º, VI):</strong> para defesa em processos judiciais ou administrativos</li>
              <li><strong>Legítimo interesse (Art. 7º, IX):</strong> para melhoria dos serviços e segurança do site</li>
              <li><strong>Tutela da saúde (Art. 7º, VIII):</strong> quando necessário para proteção da vida ou incolumidade física do titular</li>
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
                    <td className="border border-[#C4C4C4] p-3">Google Ads — mensuração de conversões e remarketing</td>
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
              <li><strong>Plataformas de agendamento:</strong> Doctoralia e Rede D'Or para marcação de consultas</li>
              <li><strong>Serviços de comunicação:</strong> para envio de e-mails e mensagens</li>
              <li><strong>Autoridades competentes:</strong> quando exigido por lei ou ordem judicial</li>
            </ul>
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
              Os dados são retidos pelo período necessário para cumprir as finalidades descritas nesta política 
              ou conforme exigido por lei (prontuários médicos: mínimo 20 anos, conforme Resolução CFM nº 1.821/2007).
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
              Informações sobre saúde são consideradas dados pessoais sensíveis pela LGPD (Art. 5º, II). 
              Quando você compartilha informações sobre sintomas ou condições de saúde através do nosso chat 
              ou formulários, esses dados são tratados com base na <strong>tutela da saúde</strong> (Art. 11, II, "f") 
              e com as seguintes garantias adicionais:
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
              Alguns de nossos prestadores de serviço (como Google e plataformas de hospedagem) podem 
              armazenar dados em servidores localizados fora do Brasil. Nesses casos, garantimos que 
              a transferência ocorre em conformidade com o Art. 33 da LGPD, mediante:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cláusulas contratuais padrão de proteção de dados</li>
              <li>Certificações reconhecidas (ex.: Privacy Shield, SOC 2)</li>
              <li>Garantia de nível adequado de proteção pelo país destinatário</li>
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
              12. Contato do Encarregado (DPO)
            </h2>
            <p className="leading-relaxed">
              Para questões relacionadas à proteção de dados pessoais, entre em contato com nosso 
              Encarregado de Proteção de Dados:
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
