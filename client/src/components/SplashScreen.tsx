import { useState, useEffect, useRef } from "react";

/**
 * SplashScreen — Animação de abertura do site (VERSÃO ATUALIZADA)
 * Baseada no arquivo animacao-prostata-fb.html fornecido pelo Dr. Felipe.
 * 
 * Conceito:
 * - Vias urinárias masculinas (monocromático branco/cinza) com detalhes anatômicos
 * - Próstata (B deitado) pulsa com glow branco (heartbeat)
 * - Vias desvanecem, próstata se revela como B deitado
 * - B rotaciona para vertical (com motion blur)
 * - F cinza aparece completando o logotipo FB
 * - Duração: 12s (1 ciclo completo), fade-out após 10s
 * 
 * Sons: heartbeat (batimento cardíaco suave) + whoosh (transição)
 * Só aparece 1x por sessão (sessionStorage).
 */
export default function SplashScreen() {
  const [show, setShow] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const heartbeatRef = useRef<HTMLAudioElement | null>(null);
  const whooshRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const seen = sessionStorage.getItem("splash_seen");
    if (seen) return;
    
    setShow(true);
    sessionStorage.setItem("splash_seen", "1");

    // Tocar heartbeat imediatamente
    try {
      const heartbeat = new Audio("/manus-storage/heartbeat_c004f89d.mp3");
      heartbeat.volume = 0.3;
      heartbeatRef.current = heartbeat;
      heartbeat.play().catch(() => {});
    } catch {}

    // Tocar whoosh na transição (quando B começa a girar ~6.5s)
    const whooshTimer = setTimeout(() => {
      try {
        const whoosh = new Audio("/manus-storage/whoosh_c71d172a.mp3");
        whoosh.volume = 0.25;
        whooshRef.current = whoosh;
        whoosh.play().catch(() => {});
      } catch {}
    }, 6500);

    // Após 10s, inicia fade-out (logo FB já está completo)
    const fadeTimer = setTimeout(() => setFadeOut(true), 10000);
    // Após 11s, remove do DOM
    const removeTimer = setTimeout(() => setShow(false), 11000);

    return () => {
      clearTimeout(whooshTimer);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      if (heartbeatRef.current) {
        heartbeatRef.current.pause();
        heartbeatRef.current = null;
      }
      if (whooshRef.current) {
        whooshRef.current.pause();
        whooshRef.current = null;
      }
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`splash-screen ${fadeOut ? "splash-fadeout" : ""}`}
      aria-label="Animação de abertura - Próstata se transforma no logotipo FB"
    >
      <div className="splash-content">
        <div className="splash-svg-container" style={{ width: "clamp(150px, 25vw, 300px)", aspectRatio: "1/1", margin: "0 auto" }}>
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" style={{ width: "100%", height: "100%", display: "block" }}>
            <defs>
              {/* Glow pulsante branco (heartbeat) */}
              <filter id="fb-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur">
                  <animate attributeName="stdDeviation" values="3;6;3;6;3" keyTimes="0;0.2;0.4;0.6;1" dur="2.5s" repeatCount="indefinite"/>
                </feGaussianBlur>
                <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 0.7 0" result="g"/>
                <feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              {/* Motion blur direcional */}
              <filter id="fb-mblur" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0 0">
                  <animate attributeName="stdDeviation" values="0 0;0 0;3 0;0 0;0 0;0 0" keyTimes="0;0.542;0.667;0.792;0.917;1" dur="12s" repeatCount="indefinite"/>
                </feGaussianBlur>
              </filter>
              {/* Gradientes monocromáticos */}
              <radialGradient id="fb-kfl" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FEFEFE" stopOpacity="0.25"/>
                <stop offset="50%" stopColor="#C4C4C4" stopOpacity="0.18"/>
                <stop offset="100%" stopColor="#FEFEFE" stopOpacity="0.10"/>
              </radialGradient>
              <radialGradient id="fb-kfr" cx="60%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FEFEFE" stopOpacity="0.25"/>
                <stop offset="50%" stopColor="#C4C4C4" stopOpacity="0.18"/>
                <stop offset="100%" stopColor="#FEFEFE" stopOpacity="0.10"/>
              </radialGradient>
              <radialGradient id="fb-mf" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FEFEFE" stopOpacity="0.15"/>
                <stop offset="100%" stopColor="#C4C4C4" stopOpacity="0.08"/>
              </radialGradient>
              <radialGradient id="fb-bf" cx="50%" cy="45%" r="55%">
                <stop offset="0%" stopColor="#FEFEFE" stopOpacity="0.22"/>
                <stop offset="40%" stopColor="#C4C4C4" stopOpacity="0.16"/>
                <stop offset="100%" stopColor="#FEFEFE" stopOpacity="0.08"/>
              </radialGradient>
              <radialGradient id="fb-af" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#C4C4C4" stopOpacity="0.20"/>
                <stop offset="100%" stopColor="#FEFEFE" stopOpacity="0.10"/>
              </radialGradient>
              <radialGradient id="fb-sf" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#C4C4C4" stopOpacity="0.18"/>
                <stop offset="100%" stopColor="#FEFEFE" stopOpacity="0.08"/>
              </radialGradient>
              <linearGradient id="fb-uf" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FEFEFE" stopOpacity="0.15"/>
                <stop offset="100%" stopColor="#C4C4C4" stopOpacity="0.10"/>
              </linearGradient>
            </defs>

            {/* Vias Urinárias (monocromático branco/cinza) */}
            <g id="fb-urinary" strokeLinecap="round" strokeLinejoin="round">
              {/* Rim esquerdo */}
              <path d="M 105 52 C 100 58, 97 68, 97 78 C 97 88, 100 98, 105 106 C 110 114, 117 118, 125 118 C 133 118, 140 114, 144 108 C 148 102, 150 94, 150 84 C 150 74, 148 64, 144 58 C 140 52, 133 48, 125 48 C 117 48, 110 46, 105 52 Z" fill="url(#fb-kfl)" stroke="#FEFEFE" strokeWidth="1.8" strokeOpacity="0.4"/>
              <path d="M 112 58 C 108 64, 106 72, 106 80 C 106 88, 108 96, 112 103 C 116 109, 121 112, 127 112 C 133 112, 138 109, 141 104 C 144 99, 145 92, 145 84 C 145 76, 144 69, 141 64 C 138 59, 133 56, 127 56 C 121 56, 116 54, 112 58 Z" fill="url(#fb-mf)" stroke="#C4C4C4" strokeWidth="0.8" strokeOpacity="0.3" opacity="0.7"/>
              <path d="M 132 68 C 137 72, 140 78, 140 84 C 140 90, 137 96, 132 100 C 130 97, 128 92, 128 84 C 128 76, 130 71, 132 68 Z" fill="#FEFEFE" fillOpacity="0.12" stroke="#C4C4C4" strokeWidth="0.9" strokeOpacity="0.3"/>
              <path d="M 113 62 C 116 60, 120 62, 125 66 L 130 72 L 118 68 Z" fill="#C4C4C4" fillOpacity="0.15"/>
              <path d="M 110 74 C 113 72, 118 74, 122 78 L 128 83 L 114 80 Z" fill="#C4C4C4" fillOpacity="0.15"/>
              <path d="M 112 88 C 115 86, 120 87, 124 92 L 129 97 L 116 93 Z" fill="#C4C4C4" fillOpacity="0.15"/>
              <path d="M 125 66 C 128 68, 130 70, 132 72" fill="none" stroke="#FEFEFE" strokeWidth="1.2" opacity="0.25"/>
              <path d="M 122 78 C 126 80, 129 82, 131 84" fill="none" stroke="#FEFEFE" strokeWidth="1.2" opacity="0.25"/>
              <path d="M 124 92 C 127 94, 130 96, 132 97" fill="none" stroke="#FEFEFE" strokeWidth="1.2" opacity="0.25"/>
              <path d="M 112 42 C 116 36, 124 34, 132 36 C 138 38, 142 42, 138 46 C 134 50, 126 48, 120 46 C 116 45, 113 44, 112 42 Z" fill="url(#fb-af)" stroke="#C4C4C4" strokeWidth="1.2" strokeOpacity="0.3" opacity="0.75"/>
              {/* Rim direito */}
              <path d="M 295 57 C 300 63, 303 73, 303 83 C 303 93, 300 103, 295 111 C 290 119, 283 123, 275 123 C 267 123, 260 119, 256 113 C 252 107, 250 99, 250 89 C 250 79, 252 69, 256 63 C 260 57, 267 53, 275 53 C 283 53, 290 51, 295 57 Z" fill="url(#fb-kfr)" stroke="#FEFEFE" strokeWidth="1.8" strokeOpacity="0.4"/>
              <path d="M 288 63 C 292 69, 294 77, 294 85 C 294 93, 292 101, 288 108 C 284 114, 279 117, 273 117 C 267 117, 262 114, 259 109 C 256 104, 255 97, 255 89 C 255 81, 256 74, 259 69 C 262 64, 267 61, 273 61 C 279 61, 284 59, 288 63 Z" fill="url(#fb-mf)" stroke="#C4C4C4" strokeWidth="0.8" strokeOpacity="0.3" opacity="0.7"/>
              <path d="M 268 73 C 263 77, 260 83, 260 89 C 260 95, 263 101, 268 105 C 270 102, 272 97, 272 89 C 272 81, 270 76, 268 73 Z" fill="#FEFEFE" fillOpacity="0.12" stroke="#C4C4C4" strokeWidth="0.9" strokeOpacity="0.3"/>
              <path d="M 287 67 C 284 65, 280 67, 275 71 L 270 77 L 282 73 Z" fill="#C4C4C4" fillOpacity="0.15"/>
              <path d="M 290 79 C 287 77, 282 79, 278 83 L 272 88 L 286 85 Z" fill="#C4C4C4" fillOpacity="0.15"/>
              <path d="M 288 93 C 285 91, 280 92, 276 97 L 271 102 L 284 98 Z" fill="#C4C4C4" fillOpacity="0.15"/>
              <path d="M 275 71 C 272 73, 270 75, 268 77" fill="none" stroke="#FEFEFE" strokeWidth="1.2" opacity="0.25"/>
              <path d="M 278 83 C 274 85, 271 87, 269 89" fill="none" stroke="#FEFEFE" strokeWidth="1.2" opacity="0.25"/>
              <path d="M 276 97 C 273 99, 270 101, 268 102" fill="none" stroke="#FEFEFE" strokeWidth="1.2" opacity="0.25"/>
              <path d="M 288 47 C 284 41, 276 39, 268 41 C 262 43, 258 47, 262 51 C 266 55, 274 53, 280 51 C 284 50, 287 49, 288 47 Z" fill="url(#fb-af)" stroke="#C4C4C4" strokeWidth="1.2" strokeOpacity="0.3" opacity="0.75"/>
              {/* Ureteres */}
              <path d="M 141 100 C 144 113, 148 128, 153 146 C 158 164, 164 182, 170 198 C 176 214, 181 228, 184 240 C 187 250, 189 256, 190 260 L 194 260 C 193 256, 191 250, 188 240 C 185 228, 180 214, 174 198 C 168 182, 162 164, 157 146 C 152 128, 148 113, 145 100 Z" fill="url(#fb-uf)" stroke="#FEFEFE" strokeWidth="1.0" strokeOpacity="0.25"/>
              <path d="M 259 105 C 256 118, 252 133, 247 151 C 242 169, 236 187, 230 203 C 224 219, 219 233, 216 245 C 213 255, 211 261, 210 265 L 206 265 C 207 261, 209 255, 212 245 C 215 233, 220 219, 226 203 C 232 187, 238 169, 243 151 C 248 133, 252 118, 255 105 Z" fill="url(#fb-uf)" stroke="#FEFEFE" strokeWidth="1.0" strokeOpacity="0.25"/>
              {/* Bexiga */}
              <path d="M 170 255 C 167 245, 170 235, 178 228 C 186 222, 193 220, 200 219 C 207 220, 214 222, 222 228 C 230 235, 233 245, 230 255 C 228 265, 224 275, 218 283 C 213 289, 207 293, 200 294 C 193 293, 187 289, 182 283 C 176 275, 172 265, 170 255 Z" fill="url(#fb-bf)" stroke="#FEFEFE" strokeWidth="2.2" strokeOpacity="0.4"/>
              <path d="M 176 252 C 174 244, 176 236, 183 231 C 189 226, 195 225, 200 224 C 205 225, 211 226, 217 231 C 224 236, 226 244, 224 252 C 222 260, 219 268, 214 274 C 210 278, 205 280, 200 281 C 195 280, 190 278, 186 274 C 181 268, 178 260, 176 252 Z" fill="#FEFEFE" fillOpacity="0.05"/>
              <path d="M 192 262 L 200 278 L 208 262 Z" fill="#C4C4C4" fillOpacity="0.08" stroke="#FEFEFE" strokeWidth="0.8" strokeOpacity="0.2" opacity="0.6"/>
              <circle cx="192" cy="262" r="2.8" fill="#FEFEFE" fillOpacity="0.12" stroke="#FEFEFE" strokeWidth="1.0" strokeOpacity="0.3"/>
              <circle cx="208" cy="262" r="2.8" fill="#FEFEFE" fillOpacity="0.12" stroke="#FEFEFE" strokeWidth="1.0" strokeOpacity="0.3"/>
              {/* Uretra */}
              <path d="M 196 294 C 196 298, 197 304, 197 310 C 198 316, 198 320, 198 322 L 202 322 C 202 320, 202 316, 203 310 C 203 304, 204 298, 204 294 Z" fill="#FEFEFE" fillOpacity="0.10" stroke="#FEFEFE" strokeWidth="1.0" strokeOpacity="0.25"/>
              <path d="M 198 322 C 198 330, 199 340, 199 352 C 199 362, 200 372, 200 382 L 200 382 C 200 372, 201 362, 201 352 C 201 340, 202 330, 202 322 Z" fill="#FEFEFE" fillOpacity="0.08" stroke="#FEFEFE" strokeWidth="0.8" strokeOpacity="0.2"/>
              {/* Vesículas seminais */}
              <path d="M 186 298 C 182 296, 176 293, 172 289 C 168 285, 164 280, 162 275 C 160 270, 159 265, 160 261 C 161 257, 163 255, 166 256 C 163 259, 162 264, 163 270 C 164 276, 167 282, 171 287 C 175 292, 180 295, 184 297 Z" fill="url(#fb-sf)" stroke="#FEFEFE" strokeWidth="1.6" strokeOpacity="0.3"/>
              <path d="M 214 298 C 218 296, 224 293, 228 289 C 232 285, 236 280, 238 275 C 240 270, 241 265, 240 261 C 239 257, 237 255, 234 256 C 237 259, 238 264, 237 270 C 236 276, 233 282, 229 287 C 225 292, 220 295, 216 297 Z" fill="url(#fb-sf)" stroke="#FEFEFE" strokeWidth="1.6" strokeOpacity="0.3"/>
              {/* Ductos deferentes */}
              <path d="M 188 300 C 184 298, 178 295, 172 291 C 166 287, 160 283, 154 280 C 148 277, 142 275, 136 274" fill="none" stroke="#C4C4C4" strokeWidth="2.2" strokeOpacity="0.35" opacity="0.6"/>
              <path d="M 212 300 C 216 298, 222 295, 228 291 C 234 287, 240 283, 246 280 C 252 277, 258 275, 264 274" fill="none" stroke="#C4C4C4" strokeWidth="2.2" strokeOpacity="0.35" opacity="0.6"/>
              <ellipse cx="200" cy="310" rx="2.5" ry="2" fill="#C4C4C4" fillOpacity="0.15" stroke="#FEFEFE" strokeWidth="0.6" strokeOpacity="0.2"/>
              {/* Fade das vias urinárias */}
              <animate attributeName="opacity" values="0.85;0.85;0;0;0;0;0;0.85" keyTimes="0;0.18;0.375;0.45;0.6;0.8;0.92;1" dur="12s" repeatCount="indefinite"/>
            </g>

            {/* Próstata = B deitado (branco com glow pulsante) */}
            <g id="fb-prostate" filter="url(#fb-glow)" transform="translate(200, 290) rotate(90) scale(0.18) translate(-150, -216)">
              <path d="M179.25 359.97L89.50 359.97L89.50 239.52L110.98 239.52L110.98 355.42L179.89 355.42C190.68 354.60 200.33 350.73 208.93 343.81C217.49 336.89 224.31 327.75 229.46 316.37C234.55 304.99 237.10 292.38 237.10 278.59C237.10 264.48 235.69 250.92 229.05 239.95C198.49 189.48 40.09 208.52 40.44 212.17L40.48 185.48C40.48 187.92 167.15 198.12 184.58 189.27C193.56 184.71 200.84 181.42 206.43 171.35C212.03 161.26 214.85 149.73 214.85 136.85C214.85 125.75 212.75 115.64 208.52 106.54C204.29 97.44 198.60 90.11 191.50 84.65C184.40 79.19 176.52 76.45 167.92 76.45L110.98 76.45L110.98 158.37L89.50 158.37L89.50 71.90L170.83 71.90C183.03 71.90 194.14 74.77 204.20 80.51C214.21 86.24 222.22 93.93 228.23 103.54C234.24 113.14 237.24 124.34 237.24 137.13C237.24 151.28 233.07 163.81 224.72 174.72C216.36 185.66 205.52 195.40 192.18 200.14C205.06 202.19 216.61 204.86 226.77 212.00C236.96 219.16 245.02 228.16 250.99 238.99C256.95 249.87 259.91 261.66 259.91 274.49L259.91 282.73C259.91 296.98 256.31 309.90 249.03 321.60C241.79 333.30 232.05 342.63 219.85 349.55C207.61 356.47 194.09 359.97 179.25 359.97Z" 
                fill="#FEFEFE" fillOpacity="0.5" stroke="#FEFEFE" strokeWidth="2.5">
                <animate attributeName="strokeWidth" values="2.5;3.5;2.5;3.5;2.5" keyTimes="0;0.2;0.4;0.6;1" dur="2.5s" repeatCount="indefinite"/>
                <animate attributeName="fillOpacity" values="0.4;0.65;0.4;0.65;0.4" keyTimes="0;0.2;0.4;0.6;1" dur="2.5s" repeatCount="indefinite"/>
              </path>
              <animate attributeName="opacity" values="1;1;1;0;0;0;0;1" keyTimes="0;0.18;0.35;0.54;0.6;0.8;0.92;1" dur="12s" repeatCount="indefinite"/>
            </g>

            {/* B do logotipo (rotação com motion blur) */}
            <g id="fb-logoB" opacity="0" filter="url(#fb-mblur)">
              <animateTransform attributeName="transform" type="rotate" values="90 200 200;90 200 200;90 200 200;0 200 200;0 200 200;0 200 200" keyTimes="0;0.375;0.542;0.792;0.917;1" dur="12s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1;0 0 1 1;0.42 0 0.58 1;0 0 1 1;0 0 1 1"/>
              <g transform="translate(200, 200) scale(0.85) translate(-150, -216)">
                <path d="M179.25 359.97L89.50 359.97L89.50 239.52L110.98 239.52L110.98 355.42L179.89 355.42C190.68 354.60 200.33 350.73 208.93 343.81C217.49 336.89 224.31 327.75 229.46 316.37C234.55 304.99 237.10 292.38 237.10 278.59C237.10 264.48 235.69 250.92 229.05 239.95C198.49 189.48 40.09 208.52 40.44 212.17L40.48 185.48C40.48 187.92 167.15 198.12 184.58 189.27C193.56 184.71 200.84 181.42 206.43 171.35C212.03 161.26 214.85 149.73 214.85 136.85C214.85 125.75 212.75 115.64 208.52 106.54C204.29 97.44 198.60 90.11 191.50 84.65C184.40 79.19 176.52 76.45 167.92 76.45L110.98 76.45L110.98 158.37L89.50 158.37L89.50 71.90L170.83 71.90C183.03 71.90 194.14 74.77 204.20 80.51C214.21 86.24 222.22 93.93 228.23 103.54C234.24 113.14 237.24 124.34 237.24 137.13C237.24 151.28 233.07 163.81 224.72 174.72C216.36 185.66 205.52 195.40 192.18 200.14C205.06 202.19 216.61 204.86 226.77 212.00C236.96 219.16 245.02 228.16 250.99 238.99C256.95 249.87 259.91 261.66 259.91 274.49L259.91 282.73C259.91 296.98 256.31 309.90 249.03 321.60C241.79 333.30 232.05 342.63 219.85 349.55C207.61 356.47 194.09 359.97 179.25 359.97Z" fill="#FEFEFE"/>
              </g>
              <animate attributeName="opacity" values="0;0;1;1;1;0" keyTimes="0;0.35;0.54;0.80;0.917;1" dur="12s" repeatCount="indefinite"/>
            </g>

            {/* F do logotipo */}
            <g id="fb-logoF" opacity="0" transform="translate(200, 200) scale(0.92) translate(-150, -216)">
              <path d="M62.10 360.00L40.48 360.00L40.48 239.52L62.10 239.52L62.10 360.00ZM40.48 158.13L40.48 40.00L237.06 40.00L237.06 60.71C220.19 50.63 187.09 44.55 167.06 44.55L62.10 44.55L62.10 158.13L40.48 158.13Z" fill="#C4C4C4"/>
              <animate attributeName="opacity" values="0;0;0;1;1;0" keyTimes="0;0.72;0.792;0.83;0.917;1" dur="12s" repeatCount="indefinite"/>
            </g>
          </svg>
        </div>

        {/* Texto abaixo da animação */}
        <p className="splash-tagline">
          Dr. Felipe de Bulhões
        </p>
        <p className="splash-subtitle">
          Urologista & Cirurgião Geral
        </p>
      </div>
    </div>
  );
}
