import { useEffect } from "react";
import Home from "./Home";

const PREVIEW_FONT_URL = "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Lato:ital,wght@0,400;0,700;1,400&display=swap";

/**
 * Rota privada de avaliação visual da nova identidade marrom/neutra.
 * A rota é mantida fora do sitemap e recebe noindex no servidor.
 */
export default function BrandPalettePreview() {
  useEffect(() => {
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = PREVIEW_FONT_URL;
    fontLink.dataset.brandPaletteFont = "espresso";
    document.head.appendChild(fontLink);

    return () => {
      fontLink.remove();
    };
  }, []);

  return <Home isBrandPalettePreview />;
}
