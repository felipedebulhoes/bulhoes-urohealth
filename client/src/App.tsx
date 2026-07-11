import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { lazy, Suspense, useEffect } from "react";
import { Route, Switch } from "wouter";
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
const ClinoviMoema = lazy(() => import("./pages/LocationPages").then((m) => ({ default: m.ClinoviMoema })));
const ClinoviPinheiros = lazy(() => import("./pages/LocationPages").then((m) => ({ default: m.ClinoviPinheiros })));
const ClinoviSBC = lazy(() => import("./pages/LocationPages").then((m) => ({ default: m.ClinoviSBC })));
const CemedSaoLuizCampinas = lazy(() => import("./pages/LocationPages").then((m) => ({ default: m.CemedSaoLuizCampinas })));
const AdminFiles = lazy(() => import("./pages/AdminFiles"));
const AdminLeads = lazy(() => import("./pages/AdminLeads"));
const AdminKeywords = lazy(() => import("./pages/AdminKeywords"));
const Consultorios = lazy(() => import("./pages/Consultorios"));
const Contato = lazy(() => import("./pages/Contato"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Agendamento = lazy(() => import("./pages/Agendamento"));
const GuiaGLP1 = lazy(() => import("./pages/GuiaGLP1"));
const VasectomiaSemBisturi = lazy(() => import("./pages/VasectomiaSemBisturi"));
const AndrologiaPerformance = lazy(() => import("./pages/AndrologiaPerformance"));
const EsteticaIntimaMasculina = lazy(() => import("./pages/EsteticaIntimaMasculina"));
const EngrossamentoPeniano = lazy(() => import("./pages/EngrossamentoPeniano"));
const AgendarDoctoralia = lazy(() => import("./pages/AgendarDoctoralia"));
const AgendarWhatsApp = lazy(() => import("./pages/AgendarWhatsApp"));

import { captureAttribution, initGlobalContactListener, initEngagementTracking } from "@/lib/tracking";
import CanonicalTag from "./components/CanonicalTag";
import PageTransition from "./components/PageTransition";
import SplashScreen from "./components/SplashScreen";
import CookieBanner from "./components/CookieBanner";
import GoogleTagManager from "./components/GoogleTagManager";

// Minimal, layout-neutral fallback while a route chunk is being fetched.
// Kept intentionally blank (no spinner) to avoid a flash on fast/local
// connections; SplashScreen already covers the initial app load.
function RouteFallback() {
  return null;
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Suspense fallback={<RouteFallback />}>
      <Switch>
        <Route path={"/"} component={Home} />
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
        <Route path={"/local/clinovi-moema"} component={ClinoviMoema} />
        <Route path={"/local/clinovi-pinheiros"} component={ClinoviPinheiros} />
        <Route path={"/local/clinovi-sbc"} component={ClinoviSBC} />
        <Route path={"/local/cemed-sao-luiz-campinas"} component={CemedSaoLuizCampinas} />
        <Route path={"/primeira-consulta"} component={PrimeiraConsulta} />
        <Route path={"/guia-google-business"} component={GuiaGoogleBusiness} />
        <Route path={"/admin/files"} component={AdminFiles} />
        <Route path={"/admin/leads"} component={AdminLeads} />
        <Route path={"/admin/keywords"} component={AdminKeywords} />
        <Route path={"/guia-glp1"} component={GuiaGLP1} />
        <Route path={"/vasectomia-sem-bisturi"} component={VasectomiaSemBisturi} />
        <Route path={"/andrologia-performance-masculina"} component={AndrologiaPerformance} />
        <Route path={"/estetica-intima-masculina"} component={EsteticaIntimaMasculina} />
        <Route path={"/educativo/engrossamento-peniano"} component={EngrossamentoPeniano} />
        <Route path={"/agendar/doctoralia"} component={AgendarDoctoralia} />
        <Route path={"/agendar/whatsapp"} component={AgendarWhatsApp} />
        <Route path={"/canetas-emagrecedoras"} component={GuiaGLP1} />
        <Route path={"/privacidade"} component={PrivacyPolicy} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  useEffect(() => {
    captureAttribution();
    initGlobalContactListener();
    initEngagementTracking();
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        switchable={true}
      >
        <TooltipProvider>
          <Toaster />
          <CanonicalTag />
          <SplashScreen />
          <PageTransition />
          <Router />
          <CookieBanner />
          <GoogleTagManager />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
