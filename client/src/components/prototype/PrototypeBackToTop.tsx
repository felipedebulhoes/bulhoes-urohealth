import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { trackPrototypeEvent } from "@/lib/analytics";

export default function PrototypeBackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setVisible(window.scrollY > 520);
        frame = 0;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const goToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    trackPrototypeEvent("prototype_section_view", "mens_health_back_to_top", "top");
  };

  return (
    <button
      type="button"
      onClick={goToTop}
      aria-label="Voltar ao topo da página"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-20 right-4 z-40 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#17364F]/15 bg-white px-3 py-2 text-sm font-semibold text-[#17364F] shadow-xl transition duration-200 hover:-translate-y-0.5 hover:border-[#B87333]/45 hover:text-[#9D602A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] focus-visible:ring-offset-4 motion-reduce:transform-none sm:bottom-24 sm:right-7 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">Voltar ao topo</span>
    </button>
  );
}
