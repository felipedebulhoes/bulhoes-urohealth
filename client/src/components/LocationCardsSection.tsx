/*
 * Design: Dr. Felipe de Bulhões — Direção Editorial
 * Locais: uma linha por endereço (foto, nome, dados práticos e agendamento),
 * seguida do mapa interativo.
 */
import { Link } from "wouter";
import InteractiveMap from "@/components/InteractiveMap";
import { getWhatsAppUrl } from "@/lib/tracking";
import { trackCtaClick } from "@/lib/analytics";

interface LocationData {
  name: string;
  region: "sao-paulo" | "campinas";
  regionLabel: string;
  typeLabel: string;
  image: string;
  address: string;
  neighborhood: string;
  phone: string;
  whatsapp?: string;
  hours: string;
  highlight: string;
  payment?: string[];
  bookingUrl: string;
  bookingLabel: string;
  mapUrl: string;
  slug: string;
}

const DOCTORALIA_PROFILE =
  "https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas";

const locations: LocationData[] = [
  {
    name: "Clinovi Paulista",
    region: "sao-paulo",
    regionLabel: "São Paulo",
    typeLabel: "Particular",
    image: "/manus-storage/clinovi-paulista_42fff2fa_cecba450.webp",
    address: "Av. Paulista, 1048, 18° andar",
    neighborhood: "Bela Vista, São Paulo - SP",
    phone: "(11) 3382-1529",
    hours: "Segundas e quartas, 13h às 22h",
    highlight: "Vista panorâmica, 760m², 26 consultórios",
    payment: ["PIX", "Cartão de Crédito", "Cartão de Débito"],
    bookingUrl: DOCTORALIA_PROFILE,
    bookingLabel: "Agendar via Doctoralia",
    mapUrl: "https://maps.google.com/?q=Av.+Paulista+1048+Bela+Vista+São+Paulo",
    slug: "clinovi-paulista",
  },
  {
    name: "Clinovi Pinheiros",
    region: "sao-paulo",
    regionLabel: "São Paulo",
    typeLabel: "Particular",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/clinovi-pinheiros_cec58be4.webp",
    address: "Av. Rebouças, 2636",
    neighborhood: "Pinheiros, São Paulo - SP",
    phone: "(11) 3382-1529",
    hours: "Segundas e quartas, 13h às 22h",
    highlight: "ComVem Rebouças, próximo à Faria Lima",
    payment: ["PIX", "Cartão de Crédito", "Cartão de Débito"],
    bookingUrl: DOCTORALIA_PROFILE,
    bookingLabel: "Agendar via Doctoralia",
    mapUrl: "https://maps.google.com/?q=Av.+Rebouças+2636+Pinheiros+São+Paulo",
    slug: "clinovi-pinheiros",
  },
  {
    name: "CEMED São Luiz Campinas",
    region: "campinas",
    regionLabel: "Campinas",
    typeLabel: "",
    image: "/manus-storage/sao-luiz-campinas-fachada_a326a12f.webp",
    address: "Av. Andrade Neves, 863, 4° andar",
    neighborhood: "Centro, Campinas - SP",
    phone: "(19) 3014-3000",
    hours: "Sextas, 13h às 17h",
    highlight: "Hospital Rede D'Or — Acreditação JCI",
    bookingUrl:
      "https://www.rededorsaoluiz.com.br/encontre-um-medico/perfil/felipe-de-bulhoes-ojeda",
    bookingLabel: "Agendar pela Rede D'Or",
    mapUrl: "https://maps.google.com/?q=Av.+Andrade+Neves+863+Centro+Campinas",
    slug: "cemed-sao-luiz-campinas",
  },
  {
    name: "Campinas Day Hospital",
    region: "campinas",
    regionLabel: "Campinas",
    typeLabel: "Particular",
    image: "/manus-storage/campinas-day-hospital_47df2b14_d5a9cb24.webp",
    address: "Av. Benjamin Constant, 1991",
    neighborhood: "Cambuí, Campinas - SP",
    phone: "(19) 2127-2900",
    whatsapp: "(19) 99855-9890",
    hours: "Sextas, 18h às 20h",
    highlight: "Centro Urológico Avançado",
    bookingUrl: DOCTORALIA_PROFILE,
    bookingLabel: "Agendar via Doctoralia",
    mapUrl: "https://maps.google.com/?q=Av.+Benjamin+Constant+1991+Cambuí+Campinas",
    slug: "campinas-day-hospital",
  },
];

const digits = (value: string) => value.replace(/\D/g, "");

export default function LocationCardsSection() {
  return (
    <section id="locais-atendimento" className="editorial-section editorial-places">
      <div className="editorial-wrap">
        <div className="editorial-head">
          <p className="editorial-kicker">Agende sua consulta</p>
          <h2 className="editorial-display editorial-title">Locais de atendimento</h2>
          <p className="editorial-intro">
            Atendimento presencial em quatro locais — São Paulo e Campinas — além de teleconsulta
            por vídeo. Escolha o mais conveniente e agende diretamente.
          </p>
        </div>

        <ul className="editorial-place-list">
          {locations.map((loc) => (
            <li key={loc.slug} className="editorial-place">
              <div className="editorial-place-photo">
                <img
                  src={loc.image}
                  alt={`${loc.name} — ${loc.neighborhood}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="editorial-place-name">
                <p className="editorial-kicker">
                  {loc.regionLabel}
                  {loc.typeLabel ? ` · ${loc.typeLabel}` : ""}
                </p>
                <h3 className="editorial-display">{loc.name}</h3>
                <p className="editorial-place-highlight">{loc.highlight}</p>
              </div>

              <dl className="editorial-place-facts">
                <div>
                  <dt>Endereço</dt>
                  <dd>
                    {loc.address}
                    <br />
                    {loc.neighborhood}
                  </dd>
                </div>
                <div>
                  <dt>Horário</dt>
                  <dd>{loc.hours}</dd>
                </div>
                <div>
                  <dt>Telefone</dt>
                  <dd>
                    <a href={`tel:${digits(loc.phone)}`}>{loc.phone}</a>
                  </dd>
                </div>
                {loc.payment && (
                  <div>
                    <dt>Pagamento</dt>
                    <dd>{loc.payment.join(" · ")}</dd>
                  </div>
                )}
              </dl>

              <div className="editorial-place-actions">
                <a
                  href={loc.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link"
                  onClick={() => trackCtaClick("agendar_local", loc.slug)}
                >
                  {loc.bookingLabel}
                </a>
                <a
                  href={loc.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-place-minor"
                >
                  Como chegar
                </a>
                {loc.whatsapp ? (
                  <a
                    href={`https://wa.me/55${digits(loc.whatsapp)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-place-minor"
                  >
                    WhatsApp {loc.whatsapp}
                  </a>
                ) : (
                  <Link href="/consultorios" className="editorial-place-minor">
                    Mais detalhes
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="editorial-place-map">
          <p className="editorial-kicker">Mapa interativo</p>
          <InteractiveMap />
        </div>

        <div className="editorial-place-foot">
          <p>Dúvidas sobre qual unidade escolher?</p>
          <a
            href={getWhatsAppUrl({ page: "consultorios" })}
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link"
          >
            Fale conosco pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
