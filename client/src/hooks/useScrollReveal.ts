import { useEffect, useRef } from "react";

/**
 * Hook que adiciona animação de scroll-reveal a um elemento.
 * Quando o elemento entra na viewport, a classe "revealed" é adicionada.
 * 
 * @param threshold - Porcentagem do elemento visível para disparar (0-1)
 * @param rootMargin - Margem extra para antecipar/atrasar o trigger
 */
export function useScrollReveal<T extends HTMLElement>(
  threshold = 0.15,
  rootMargin = "0px 0px -50px 0px"
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            // Once revealed, stop observing
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin]);

  return ref;
}

/**
 * Hook para aplicar scroll-reveal a múltiplos elementos filhos com stagger.
 * Aplica a classe "scroll-reveal-stagger" ao container.
 */
export function useScrollRevealStagger<T extends HTMLElement>(
  threshold = 0.1,
  rootMargin = "0px 0px -30px 0px"
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin]);

  return ref;
}
