import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";

interface DeferredSectionProps {
  children: ReactNode;
  minHeight?: number;
  rootMargin?: string;
  mode?: "viewport" | "idle";
  className?: string;
}

export default function DeferredSection({
  children,
  minHeight = 240,
  rootMargin = "700px 0px",
  mode = "viewport",
  className,
}: DeferredSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (mode === "idle") {
      const windowWithIdle = window as Window & {
        requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
        cancelIdleCallback?: (handle: number) => void;
      };

      if (windowWithIdle.requestIdleCallback) {
        const handle = windowWithIdle.requestIdleCallback(() => setShouldRender(true), { timeout: 3500 });
        return () => windowWithIdle.cancelIdleCallback?.(handle);
      }

      const timer = window.setTimeout(() => setShouldRender(true), 1800);
      return () => window.clearTimeout(timer);
    }

    const element = containerRef.current;
    if (!element || !("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldRender(true);
        observer.disconnect();
      },
      { rootMargin }
    );

    observer.observe(element);
    // Não depende exclusivamente de scroll: renderiza após a janela crítica
    // para manter o conteúdo acessível a crawlers, impressão e navegação rápida.
    const maxWaitTimer = window.setTimeout(() => {
      setShouldRender(true);
      observer.disconnect();
    }, 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(maxWaitTimer);
    };
  }, [mode, rootMargin]);

  return (
    <div ref={containerRef} className={className} style={!shouldRender ? { minHeight } : undefined}>
      {shouldRender ? (
        <Suspense
          fallback={
            <div
              aria-hidden="true"
              className="mx-auto my-8 h-1 w-20 rounded-full bg-[#B87333]/20 motion-safe:animate-pulse"
            />
          }
        >
          {children}
        </Suspense>
      ) : null}
    </div>
  );
}
