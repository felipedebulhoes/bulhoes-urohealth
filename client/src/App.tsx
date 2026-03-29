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


function Router() {
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
