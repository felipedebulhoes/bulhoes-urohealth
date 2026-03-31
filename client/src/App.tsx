import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import TratamentosHPB from "./pages/TratamentosHPB";
import CirurgiasMinimamenteInvasivas from "./pages/CirurgiasMinimamenteInvasivas";
import OrientacoesPosOperatorias from "./pages/OrientacoesPosOperatorias";
import CalculosRenais from "./pages/CalculosRenais";
import Hipogonadismo from "./pages/Hipogonadismo";
import SindromeMetabolica from "./pages/SindromeMetabolica";
import ProcedimentosAndrologicos from "./pages/ProcedimentosAndrologicos";
import DisfuncaoEretil from "./pages/DisfuncaoEretil";
import PrimeiraConsulta from "./pages/PrimeiraConsulta";
import GuiaGoogleBusiness from "./pages/GuiaGoogleBusiness";
import ExameProstata from "./pages/ExameProstata";
import Urodinamica from "./pages/Urodinamica";
import InfeccaoUrinaria from "./pages/InfeccaoUrinaria";
import CancerProstata from "./pages/CancerProstata";
import BiopsiaProstata from "./pages/BiopsiaProstata";
import Vasectomia from "./pages/Vasectomia";
import LitotripsieLaser from "./pages/LitotripsieLaser";
import CirurgiaRobotica from "./pages/CirurgiaRobotica";
import CancerBexiga from "./pages/CancerBexiga";
import TratamentoCancerProstata from "./pages/TratamentoCancerProstata";
import IncontinenciaUrinaria from "./pages/IncontinenciaUrinaria";
import SobreDrFelipe from "./pages/SobreDrFelipe";
import { CampinasDayHospital, ClinoviPaulista, ClinoviMoema } from "./pages/LocationPages";
import AdminFiles from "./pages/AdminFiles";
import AdminLeads from "./pages/AdminLeads";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/:slug"} component={BlogPost} />
      <Route path={"/educativo/tratamentos-hpb"} component={TratamentosHPB} />
      <Route path={"/educativo/cirurgias-minimamente-invasivas"} component={CirurgiasMinimamenteInvasivas} />
      <Route path={"/educativo/orientacoes-pos-operatorias"} component={OrientacoesPosOperatorias} />
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
      <Route path={"/sobre"} component={SobreDrFelipe} />
      <Route path={"/local/campinas-day-hospital"} component={CampinasDayHospital} />
      <Route path={"/local/clinovi-paulista"} component={ClinoviPaulista} />
      <Route path={"/local/clinovi-moema"} component={ClinoviMoema} />
      <Route path={"/primeira-consulta"} component={PrimeiraConsulta} />
      <Route path={"/guia-google-business"} component={GuiaGoogleBusiness} />
      <Route path={"/admin/files"} component={AdminFiles} />
      <Route path={"/admin/leads"} component={AdminLeads} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
