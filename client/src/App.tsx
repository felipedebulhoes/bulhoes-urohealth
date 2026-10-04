import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { lazy, Suspense, useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

// Route-level code splitting: every page below Home is fetched on demand.
// Home stays a static import since it's the most common landing page and we
// want it ready the instant the main bundle finishes parsing (no extra
// network round-trip for the most-visited route).
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const TratamentosHPB = lazy(() => import("./pages/TratamentosHPB"));
const CirurgiasMinimamenteInvasivas = lazy(() => import("./pages/CirurgiasMinimamenteInvasivas"));
const OrientacoesPosOperatorias = lazy(() => import("./pages/OrientacoesPosOperatorias"));
const OrientacoesPreOperatorias = lazy(() => import("./pages/OrientacoesPreOperatorias"));
const CalculosRenais = lazy(() => import("./pages/CalculosRenais"));
const Hipogonadismo = lazy(() => import("./pages/Hipogonadismo"));
const SindromeMetabolica = lazy(() => import("./pages/SindromeMetabolica"));
const ProcedimentosAndrologicos = lazy(() => import("./pages/ProcedimentosAndrologicos"));
const DisfuncaoEretil = lazy(() => import("./pages/DisfuncaoEretil"));
const PrimeiraConsulta = lazy(() => import("./pages/PrimeiraConsulta"));
const GuiaGoogleBusiness = lazy(() => import("./pages/GuiaGoogleBusiness"));
const ExameProstata = lazy(() => import("./pages/ExameProstata"));
const Urodinamica = lazy(() => import("./pages/Urodinamica"));
const InfeccaoUrinaria = lazy(() => import("./pages/InfeccaoUrinaria"));
const CancerProstata = lazy(() => import("./pages/CancerProstata"));
const BiopsiaProstata = lazy(() => import("./pages/BiopsiaProstata"));
const Vasectomia = lazy(() => import("./pages/Vasectomia"));
const LitotripsieLaser = lazy(() => import("./pages/LitotripsieLaser"));
const CirurgiaRobotica = lazy(() => import("./pages/CirurgiaRobotica"));
const CancerBexiga = lazy(() => import("./pages/CancerBexiga"));
const TratamentoCancerProstata = lazy(() => import("./pages/TratamentoCancerProstata"));
const IncontinenciaUrinaria = lazy(() => import("./pages/IncontinenciaUrinaria"));
const InfertilidadeMasculina = lazy(() => import("./pages/InfertilidadeMasculina"));
const DoencaPeyronie = lazy(() => import("./pages/DoencaPeyronie"));
const Varicocele = lazy(() => import("./pages/Varicocele"));
const HiperplasiaProstática = lazy(() => import("./pages/HiperplasiaProstática"));
const SobreDrFelipe = lazy(() => import("./pages/SobreDrFelipe"));
const CampinasDayHospital = lazy(() => import("./pages/LocationPages").then((m) => ({ default: m.CampinasDayHospital })));
const ClinoviPaulista = lazy(() => import("./pages/LocationPages").then((m) => ({ default: m.ClinoviPaulista })));
const ClinoviPinheiros = lazy(() => import("./pages/LocationPages").then((m) => ({ default: m.ClinoviPinheiros })));
const CemedSaoLuizCampinas = lazy(() => import("./pages/LocationPages").then((m) => ({ default: m.CemedSaoLuizCampinas })));
const AdminFiles = lazy(() => import("./pages/AdminFiles"));
const AdminLeads = lazy(() => import("./pages/AdminLeads"));
const AdminKeywords = lazy(() => import("./pages/AdminKeywords"));
const AdminSocialPreview = lazy(() => import("./pages/AdminSocialPreview"));
const BrandPalettePreview = lazy(() => import("./pages/BrandPalettePreview"));
const Consultorios = lazy(() => import("./pages/Consultorios"));
const Contato = lazy(() => import("./pages/Contato"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Agendamento = lazy(() => import("./pages/Agendamento"));
const GuiaGLP1 = lazy(() => import("./pages/GuiaGLP1"));
const VasectomiaSemBisturi = lazy(() => import("./pages/VasectomiaSemBisturi"));
const AndrologiaPerformance = lazy(() => import("./pages/AndrologiaPerformance"));
const EsteticaIntimaMasculina = lazy(() => import("./pages/EsteticaIntimaMasculina"));
const EngrossamentoPeniano = lazy(() => import("./pages/EngrossamentoPeniano"));
const InstagramCarousel = lazy(() => import("./pages/InstagramCarousel"));
const AgendarDoctoralia = lazy(() => import("./pages/AgendarDoctoralia"));
const AgendarWhatsApp = lazy(() => import("./pages/AgendarWhatsApp"));
const PrototypePatientJourneyHome = lazy(() => import("./pages/PrototypePatientJourney"));
const PrototypeMensHealth = lazy(() => import("./pages/PrototypePatientJourney").then((m) => ({ default: m.PrototypeMensHealth })));
const PrototypeIntimateHealth = lazy(() => import("./pages/PrototypePatientJourney").then((m) => ({ default: m.PrototypeIntimateHealth })));
const PrototypeGirthEnhancement = lazy(() => import("./pages/PrototypePatientJourney").then((m) => ({ default: m.PrototypeGirthEnhancement })));
const PrototypeScheduling = lazy(() => import("./pages/PrototypePatientJourney").then((m) => ({ default: m.PrototypeScheduling })));

import { captureAttribution, initGlobalContactListener, initEngagementTracking } from "@/lib/tracking";
import CanonicalTag from "./components/CanonicalTag";
import PageTransition from "./components/PageTransition";
import SplashScreen from "./components/SplashScreen";
import CookieBanner from "./components/CookieBanner";
import GoogleTagManager from "./components/GoogleTagManager";

// Feedback visual discreto enquanto uma rota carregada sob demanda é resolvida.
// A composição repete os tons e o isotipo da identidade pública, evitando tela
// vazia em conexões lentas sem competir com o conteúdo da página.
function LoadingBrandMark() {
  return (
    <svg viewBox="0 0 1295.52 1888.96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        fill="#C9B6A3"
        d="M127.85 1888.96H.23v-711.2h127.62v711.2zM.23 697.32V0h1160.42v122.25c-99.57-59.5-295-95.38-413.23-95.38H127.84v670.46H.23z"
      />
      <path
        fill="#F7F5F2"
        d="M819.42 1888.79H289.59v-711.02H416.4v684.16h406.78c63.68-4.84 120.64-27.67 171.42-68.51 50.51-40.84 90.81-94.84 121.17-162.01 30.09-67.17 45.14-141.59 45.14-223 0-83.29-8.33-163.32-47.56-228.11C932.99 882.42-2.36 994.84-.3 1016.35l.22-157.52c0 14.4 747.77 74.61 850.63 22.36 53.03-26.94 95.97-46.35 128.96-105.76 33.11-59.62 49.71-127.62 49.71-203.66 0-65.56-12.36-125.2-37.35-178.94-24.99-53.74-58.57-96.99-100.49-129.23-41.91-32.24-88.39-48.36-139.17-48.36H415.09v483.53H288.28V188.37h480.13c72 0 137.56 16.93 196.94 50.78 59.11 33.85 106.4 79.26 141.86 135.95 35.47 56.69 53.2 122.79 53.2 198.28 0 83.56-24.63 157.51-73.89 221.93-49.35 64.55-113.38 122.09-192.1 150.03 76.04 12.09 144.24 27.9 204.2 70.02 60.14 42.24 107.74 95.38 142.94 159.33 35.2 64.21 52.66 133.8 52.66 209.57v48.63c0 84.1-21.22 160.4-64.21 229.45-42.72 69.05-100.22 124.13-172.22 164.97-72.27 40.84-152.07 61.53-239.66 61.53z"
      />
    </svg>
  );
}

function RouteFallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite" aria-label="Carregando a página">
      <div className="route-fallback__content">
        <div className="route-fallback__mark"><LoadingBrandMark /></div>
        <span className="route-fallback__label">Preparando a página</span>
      </div>
    </div>
  );
}

function PublicHomeRoute() {
  return <Home />;
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Suspense fallback={<RouteFallback />}>
      <Switch>
        <Route path={"/"} component={PublicHomeRoute} />
        <Route path={"/blog"} component={Blog} />
        <Route path={"/blog/:slug"} component={BlogPost} />
        <Route path={"/educativo/tratamentos-hpb"} component={TratamentosHPB} />
        <Route path={"/educativo/cirurgias-minimamente-invasivas"} component={CirurgiasMinimamenteInvasivas} />
        <Route path={"/educativo/orientacoes-pos-operatorias"} component={OrientacoesPosOperatorias} />
        <Route path={"/educativo/orientacoes-pre-operatorias"} component={OrientacoesPreOperatorias} />
        <Route path={"/educativo/calculos-renais"} component={CalculosRenais} />
        <Route path={"/educativo/hipogonadismo"} component={Hipogonadismo} />
        <Route path={"/educativo/sindrome-metabolica"} component={SindromeMetabolica} />
        <Route path={"/educativo/procedimentos-andrologicos"} component={ProcedimentosAndrologicos} />
        <Route path={"/educativo/disfuncao-eretil"} component={DisfuncaoEretil} />
        <Route path={"/educativo/exame-prostata"} component={ExameProstata} />
        <Route path={"/educativo/urodinamica"} component={Urodinamica} />
        <Route path={"/educativo/infeccao-urinaria"} component={InfeccaoUrinaria} />
        <Route path={"/educativo/cancer-prostata"} component={CancerProstata} />
        <Route path={"/educativo/biopsia-prostata"} component={BiopsiaProstata} />
        <Route path={"/educativo/vasectomia"} component={Vasectomia} />
        <Route path={"/educativo/litotripsia-laser"} component={LitotripsieLaser} />
        <Route path={"/educativo/cirurgia-robotica"} component={CirurgiaRobotica} />
        <Route path={"/educativo/cancer-bexiga"} component={CancerBexiga} />
        <Route path={"/educativo/tratamento-cancer-prostata"} component={TratamentoCancerProstata} />
        <Route path={"/educativo/incontinencia-urinaria"} component={IncontinenciaUrinaria} />
        <Route path={"/educativo/infertilidade-masculina"} component={InfertilidadeMasculina} />
        <Route path={"/educativo/doenca-peyronie"} component={DoencaPeyronie} />
        <Route path={"/educativo/varicocele"} component={Varicocele} />
        <Route path={"/educativo/hiperplasia-prostatica"} component={HiperplasiaProstática} />
        <Route path={"/consultorios"} component={Consultorios} />
        <Route path={"/contato"} component={Contato} />
        <Route path={"/agendamento"} component={Agendamento} />
        <Route path={"/sobre"} component={SobreDrFelipe} />
        <Route path={"/local/campinas-day-hospital"} component={CampinasDayHospital} />
        <Route path={"/local/clinovi-paulista"} component={ClinoviPaulista} />
        <Route path={"/local/clinovi-pinheiros"} component={ClinoviPinheiros} />
        <Route path={"/local/cemed-sao-luiz-campinas"} component={CemedSaoLuizCampinas} />
        <Route path={"/primeira-consulta"} component={PrimeiraConsulta} />
        <Route path={"/guia-google-business"} component={GuiaGoogleBusiness} />
        <Route path={"/admin/files"} component={AdminFiles} />
        <Route path={"/admin/leads"} component={AdminLeads} />
        <Route path={"/admin/keywords"} component={AdminKeywords} />
        <Route path={"/admin/social-preview"} component={AdminSocialPreview} />
        <Route path={"/preview-paleta"} component={BrandPalettePreview} />
        <Route path={"/guia-glp1"} component={GuiaGLP1} />
        <Route path={"/vasectomia-sem-bisturi"} component={VasectomiaSemBisturi} />
        <Route path={"/andrologia-performance-masculina"} component={AndrologiaPerformance} />
        <Route path={"/estetica-intima-masculina"} component={EsteticaIntimaMasculina} />
        <Route path={"/educativo/engrossamento-peniano"} component={EngrossamentoPeniano} />
        <Route path={"/instagram-carousel"} component={InstagramCarousel} />
        <Route path={"/agendar/doctoralia"} component={AgendarDoctoralia} />
        <Route path={"/agendar/whatsapp"} component={AgendarWhatsApp} />
        <Route path={"/canetas-emagrecedoras"} component={GuiaGLP1} />
        <Route path={"/privacidade"} component={PrivacyPolicy} />
        <Route path={"/prototipo-jornada-paciente"} component={PrototypePatientJourneyHome} />
        <Route path={"/prototipo-jornada-paciente/saude-do-homem"} component={PrototypeMensHealth} />
        <Route path={"/prototipo-jornada-paciente/saude-intima-performance"} component={PrototypeIntimateHealth} />
        <Route path={"/prototipo-jornada-paciente/engrossamento-peniano"} component={PrototypeGirthEnhancement} />
        <Route path={"/prototipo-jornada-paciente/agendamento"} component={PrototypeScheduling} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  const [location] = useLocation();
  const isPrototypeRoute = location.startsWith("/prototipo-jornada-paciente");
  const isInternalRoute = location.startsWith("/admin/");
  const isBrandPalettePreview = location === "/preview-paleta";
  const isPublicBrandedRoute = !isPrototypeRoute && !isInternalRoute;

  useEffect(() => {
    if (isInternalRoute || isBrandPalettePreview) return;
    captureAttribution();
    initGlobalContactListener();
    initEngagementTracking();
  }, [isBrandPalettePreview, isInternalRoute]);

  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        switchable={true}
      >
        <TooltipProvider>
          <Toaster />
          <CanonicalTag />
          {!isPrototypeRoute && !isInternalRoute && !isBrandPalettePreview && <SplashScreen />}
          {!isBrandPalettePreview && <PageTransition />}
          <div className={isPublicBrandedRoute ? "brand-site" : undefined}>
            <Router />
            {!isInternalRoute && !isBrandPalettePreview && <CookieBanner />}
            {!isInternalRoute && !isBrandPalettePreview && <GoogleTagManager />}
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
