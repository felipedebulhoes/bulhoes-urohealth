import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";

/**
 * PageTransition — Exibe uma animação suave com o isotipo FB
 * ao transitar entre páginas do site.
 * 
 * Funciona detectando mudanças de rota via wouter useLocation.
 * Mostra um overlay com fade-in do logo, depois fade-out ao concluir.
 */
export default function PageTransition() {
  const [location] = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [phase, setPhase] = useState<"idle" | "fadeIn" | "fadeOut">("idle");
  const prevLocation = useRef(location);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Skip on initial mount
    if (prevLocation.current === location) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const visibleDuration = reduceMotion ? 0 : 360;
    const transitionDuration = reduceMotion ? 1 : 760;

    prevLocation.current = location;
    setIsTransitioning(true);
    setPhase("fadeIn");

    // O logo recebe uma pausa curta antes do fade-out, mantendo a transição
    // perceptível sem bloquear a navegação entre páginas.
    timeoutRef.current = setTimeout(() => {
      setPhase("fadeOut");
    }, visibleDuration);

    const hideTimeout = setTimeout(() => {
      setIsTransitioning(false);
      setPhase("idle");
    }, transitionDuration);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      clearTimeout(hideTimeout);
    };
  }, [location]);

  if (!isTransitioning) return null;

  return (
    <div
      className={`page-transition-overlay ${phase}`}
      aria-hidden="true"
    >
      <div className="page-transition-logo">
        <img
          loading="eager"
          decoding="async"
          src="/manus-storage/isotipo-fb_b21c0959.svg"
          alt="Logotipo Dr. Felipe de Bulhões"
          className="page-transition-icon"
        />
        <div className="page-transition-pulse" />
      </div>
    </div>
  );
}
