import Home from "./Home";

/**
 * Rota privada de avaliação do sistema visual Quiet Luxury.
 * Permanece fora do sitemap e recebe noindex no servidor.
 */
export default function QuietLuxuryPreview() {
  return <Home isQuietLuxuryPreview />;
}
