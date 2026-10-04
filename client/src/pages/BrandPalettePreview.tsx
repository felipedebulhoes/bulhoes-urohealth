import Home from "./Home";

/**
 * Rota privada de avaliação visual da nova identidade marrom/neutra.
 * A rota é mantida fora do sitemap e recebe noindex no servidor.
 */
export default function BrandPalettePreview() {
  return <Home isBrandPalettePreview />;
}
