/**
 * Banner de Cookies / LGPD
 * Conformidade com Lei Geral de Proteção de Dados (Lei nº 13.709/2018)
 * Exibe apenas na primeira visita, salva consentimento em localStorage
 */
import { useState, useEffect } from "react";
import { X, Cookie, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const CONSENT_KEY = "lgpd_consent";
const CONSENT_VERSION = "1.0";

interface ConsentData {
  version: string;
  accepted: boolean;
  timestamp: number;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      // Mostrar banner após 1.5s para não competir com splash screen
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
    try {
      const data: ConsentData = JSON.parse(stored);
      if (data.version !== CONSENT_VERSION) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const saveConsent = (accepted: boolean) => {
    const consent: ConsentData = {
      version: CONSENT_VERSION,
      accepted,
      timestamp: Date.now(),
      analytics: accepted ? analytics : false,
      marketing: accepted ? marketing : false,
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    setVisible(false);
  };

  const acceptAll = () => {
    setAnalytics(true);
    setMarketing(true);
    saveConsent(true);
  };

  const acceptSelected = () => {
    saveConsent(true);
  };

  const rejectAll = () => {
    setAnalytics(false);
    setMarketing(false);
    saveConsent(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[9998] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white dark:bg-card rounded-2xl shadow-2xl border border-[#C4C4C4]/30 dark:border-border overflow-hidden">
            {/* Header */}
            <div className="p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#B87333]/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#B87333]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-[#1C3D5A] dark:text-foreground mb-1">
                    Sua privacidade é importante para nós
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-muted-foreground leading-relaxed">
                    Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência de navegação, 
                    personalizar conteúdo e analisar o tráfego do site, em conformidade com a{" "}
                    <span className="font-medium text-[#1C3D5A] dark:text-foreground">
                      Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)
                    </span>
                    . Você pode gerenciar suas preferências a qualquer momento.
                  </p>

                  {/* Detalhes expandíveis */}
                  <AnimatePresence>
                    {showDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-4"
                      >
                        <div className="space-y-3 p-4 bg-gray-50 dark:bg-muted rounded-lg">
                          {/* Essenciais */}
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-[#1C3D5A] dark:text-foreground">
                                <Cookie className="w-4 h-4 inline mr-1.5" />
                                Cookies Essenciais
                              </p>
                              <p className="text-xs text-gray-500 dark:text-muted-foreground mt-0.5">
                                Necessários para o funcionamento do site. Não podem ser desativados.
                              </p>
                            </div>
                            <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded">
                              Sempre ativo
                            </span>
                          </div>

                          {/* Analytics */}
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-[#1C3D5A] dark:text-foreground">
                                Cookies de Análise
                              </p>
                              <p className="text-xs text-gray-500 dark:text-muted-foreground mt-0.5">
                                Nos ajudam a entender como você usa o site para melhorá-lo.
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={analytics}
                                onChange={(e) => setAnalytics(e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-9 h-5 bg-gray-200 dark:bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#B87333]"></div>
                            </label>
                          </div>

                          {/* Marketing */}
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-[#1C3D5A] dark:text-foreground">
                                Cookies de Marketing
                              </p>
                              <p className="text-xs text-gray-500 dark:text-muted-foreground mt-0.5">
                                Usados para exibir anúncios relevantes e medir campanhas.
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={marketing}
                                onChange={(e) => setMarketing(e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-9 h-5 bg-gray-200 dark:bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#B87333]"></div>
                            </label>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Close button */}
                <button
                  onClick={rejectAll}
                  className="flex-shrink-0 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-muted transition-colors text-gray-400 hover:text-gray-600 dark:text-muted-foreground"
                  aria-label="Fechar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-4 ml-14">
                <Button
                  onClick={acceptAll}
                  className="btn-copper text-white text-sm font-medium px-5 h-9"
                >
                  Aceitar Todos
                </Button>
                {showDetails && (
                  <Button
                    onClick={acceptSelected}
                    variant="outline"
                    className="text-sm font-medium px-5 h-9 border-[#1C3D5A]/20 text-[#1C3D5A] dark:text-foreground dark:border-border"
                  >
                    Salvar Preferências
                  </Button>
                )}
                <Button
                  onClick={() => setShowDetails(!showDetails)}
                  variant="ghost"
                  className="text-sm font-medium px-5 h-9 text-[#1C3D5A] dark:text-foreground hover:text-[#B87333]"
                >
                  {showDetails ? "Ocultar Detalhes" : "Gerenciar Preferências"}
                </Button>
                <Button
                  onClick={rejectAll}
                  variant="ghost"
                  className="text-sm font-medium px-5 h-9 text-gray-500 dark:text-muted-foreground hover:text-gray-700"
                >
                  Rejeitar
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
