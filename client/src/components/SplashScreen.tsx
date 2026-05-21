import { useState, useEffect } from "react";

/**
 * SplashScreen — Animação de abertura do site
 * Mostra a próstata se transformando no "B" do logotipo FB,
 * depois revela o logotipo completo e faz fade-out para o site.
 * 
 * Só aparece 1x por sessão (sessionStorage).
 * A animação dura ~5s e depois faz fade-out.
 */
export default function SplashScreen() {
  const [show, setShow] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Só mostra 1x por sessão
    const seen = sessionStorage.getItem("splash_seen");
    if (seen) return;
    
    setShow(true);
    sessionStorage.setItem("splash_seen", "1");

    // Após 5s, inicia fade-out
    const fadeTimer = setTimeout(() => setFadeOut(true), 5000);
    // Após 5.8s, remove do DOM
    const removeTimer = setTimeout(() => setShow(false), 5800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`splash-screen ${fadeOut ? "splash-fadeout" : ""}`}
      aria-label="Animação de abertura - Próstata se transforma no logotipo FB"
    >
      <div className="splash-content">
        {/* SVG Animation: Próstata → B → FB */}
        <div className="splash-svg-container">
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
            <defs>
              {/* Glow pulsante (heartbeat) */}
              <filter id="splash-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur">
                  <animate attributeName="stdDeviation" 
                    values="0;3;1;4;0" 
                    keyTimes="0;0.2;0.4;0.6;1"
                    dur="2s" repeatCount="2"/>
                </feGaussianBlur>
                <feColorMatrix in="blur" type="matrix"
                  values="1 0 0 0 0
                          1 0 0 0 0
                          1 0 0 0 0
                          0 0 0 0.6 0" result="glow"/>
                <feMerge>
                  <feMergeNode in="glow"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              {/* Motion blur durante rotação */}
              <filter id="splash-mblur" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0 0">
                  <animate attributeName="stdDeviation" 
                    values="0 0;0 0;2 0;0 0;0 0" 
                    keyTimes="0;0.4;0.55;0.7;1"
                    dur="5s" fill="freeze"/>
                </feGaussianBlur>
              </filter>
            </defs>
            
            {/* === VIAS URINÁRIAS === */}
            <g id="splash-urinary">
              {/* Rim esquerdo */}
              <path d="M 108 62 C 108 50, 115 42, 125 42 C 135 42, 145 48, 150 58 C 155 68, 155 80, 152 92 C 149 104, 143 112, 135 114 C 127 116, 118 112, 113 104 C 108 96, 106 84, 108 72 Z" fill="none" stroke="#FEFEFE" strokeWidth="1.3"/>
              <path d="M 140 68 C 143 72, 144 78, 143 84 C 142 90, 139 95, 136 98" fill="none" stroke="#FEFEFE" strokeWidth="0.9"/>
              <path d="M 138 72 C 141 76, 141 82, 140 88" fill="none" stroke="#FEFEFE" strokeWidth="0.7"/>
              <path d="M 118 55 C 122 58, 124 62, 123 66" fill="none" stroke="#FEFEFE" strokeWidth="0.5"/>
              <path d="M 114 68 C 118 70, 120 74, 119 78" fill="none" stroke="#FEFEFE" strokeWidth="0.5"/>
              <path d="M 113 82 C 117 83, 119 87, 118 91" fill="none" stroke="#FEFEFE" strokeWidth="0.5"/>
              <path d="M 118 42 C 122 37, 130 36, 136 38 C 140 39, 142 41, 140 43" fill="none" stroke="#FEFEFE" strokeWidth="0.6" opacity="0.6"/>
              {/* Rim direito */}
              <path d="M 292 62 C 292 50, 285 42, 275 42 C 265 42, 255 48, 250 58 C 245 68, 245 80, 248 92 C 251 104, 257 112, 265 114 C 273 116, 282 112, 287 104 C 292 96, 294 84, 292 72 Z" fill="none" stroke="#FEFEFE" strokeWidth="1.3"/>
              <path d="M 260 68 C 257 72, 256 78, 257 84 C 258 90, 261 95, 264 98" fill="none" stroke="#FEFEFE" strokeWidth="0.9"/>
              <path d="M 262 72 C 259 76, 259 82, 260 88" fill="none" stroke="#FEFEFE" strokeWidth="0.7"/>
              <path d="M 282 55 C 278 58, 276 62, 277 66" fill="none" stroke="#FEFEFE" strokeWidth="0.5"/>
              <path d="M 286 68 C 282 70, 280 74, 281 78" fill="none" stroke="#FEFEFE" strokeWidth="0.5"/>
              <path d="M 287 82 C 283 83, 281 87, 282 91" fill="none" stroke="#FEFEFE" strokeWidth="0.5"/>
              <path d="M 282 42 C 278 37, 270 36, 264 38 C 260 39, 258 41, 260 43" fill="none" stroke="#FEFEFE" strokeWidth="0.6" opacity="0.6"/>
              {/* Ureteres */}
              <path d="M 140 100 C 142 108, 145 118, 150 130 C 156 145, 162 162, 168 180 C 174 198, 180 218, 184 235 C 187 248, 189 256, 191 262" fill="none" stroke="#FEFEFE" strokeWidth="0.9"/>
              <path d="M 260 100 C 258 108, 255 118, 250 130 C 244 145, 238 162, 232 180 C 226 198, 220 218, 216 235 C 213 248, 211 256, 209 262" fill="none" stroke="#FEFEFE" strokeWidth="0.9"/>
              {/* Bexiga */}
              <path d="M 168 258 C 165 248, 170 238, 180 233 C 188 229, 195 228, 200 227 C 205 228, 212 229, 220 233 C 230 238, 235 248, 232 258 C 230 268, 226 278, 218 285 C 212 290, 206 292, 200 293 C 194 292, 188 290, 182 285 C 174 278, 170 268, 168 258 Z" fill="none" stroke="#FEFEFE" strokeWidth="1.5"/>
              <path d="M 172 256 C 170 248, 174 240, 182 236 C 190 232, 198 231, 200 231 C 202 231, 210 232, 218 236 C 226 240, 230 248, 228 256" fill="none" stroke="#FEFEFE" strokeWidth="0.5" opacity="0.35"/>
              <path d="M 191 262 L 200 282 L 209 262" fill="none" stroke="#FEFEFE" strokeWidth="0.6" opacity="0.5"/>
              <circle cx="191" cy="262" r="1.5" fill="#FEFEFE" opacity="0.5"/>
              <circle cx="209" cy="262" r="1.5" fill="#FEFEFE" opacity="0.5"/>
              {/* Colo vesical e uretra */}
              <path d="M 197 293 C 197 296, 197 298, 198 300" fill="none" stroke="#FEFEFE" strokeWidth="0.8"/>
              <path d="M 203 293 C 203 296, 203 298, 202 300" fill="none" stroke="#FEFEFE" strokeWidth="0.8"/>
              <path d="M 198 322 C 198 330, 198 340, 199 350 C 199 358, 200 365, 200 375" fill="none" stroke="#FEFEFE" strokeWidth="0.7"/>
              <path d="M 202 322 C 202 330, 202 340, 201 350 C 201 358, 200 365, 200 375" fill="none" stroke="#FEFEFE" strokeWidth="0.7"/>
              {/* Vesículas seminais */}
              <path d="M 185 298 C 180 296, 174 293, 170 288 C 166 283, 163 278, 161 273 C 159 268, 158 264, 160 261" fill="none" stroke="#FEFEFE" strokeWidth="0.9"/>
              <path d="M 161 273 C 158 271, 156 268, 155 265" fill="none" stroke="#FEFEFE" strokeWidth="0.5"/>
              <path d="M 163 278 C 160 277, 157 274, 156 271" fill="none" stroke="#FEFEFE" strokeWidth="0.5"/>
              <path d="M 215 298 C 220 296, 226 293, 230 288 C 234 283, 237 278, 239 273 C 241 268, 242 264, 240 261" fill="none" stroke="#FEFEFE" strokeWidth="0.9"/>
              <path d="M 239 273 C 242 271, 244 268, 245 265" fill="none" stroke="#FEFEFE" strokeWidth="0.5"/>
              <path d="M 237 278 C 240 277, 243 274, 244 271" fill="none" stroke="#FEFEFE" strokeWidth="0.5"/>
              {/* Ductos deferentes */}
              <path d="M 188 300 C 183 298, 176 295, 170 292 C 164 289, 158 286, 152 284" fill="none" stroke="#FEFEFE" strokeWidth="0.6" opacity="0.7"/>
              <path d="M 212 300 C 217 298, 224 295, 230 292 C 236 289, 242 286, 248 284" fill="none" stroke="#FEFEFE" strokeWidth="0.6" opacity="0.7"/>
              {/* Fade das vias urinárias: visível 0-35%, desaparece 35-50% */}
              <animate attributeName="opacity" 
                values="0.8;0.8;0;0;0" 
                keyTimes="0;0.35;0.5;0.8;1" 
                dur="5s" fill="freeze"/>
            </g>
            
            {/* === PRÓSTATA = B DEITADO com GLOW === */}
            <g id="splash-prostate" filter="url(#splash-glow)" transform="translate(200, 290) rotate(90) scale(0.14) translate(-150, -216)">
              <path d="M179.25 359.97L89.50 359.97L89.50 239.52L110.98 239.52L110.98 355.42L179.89 355.42C190.68 354.60 200.33 350.73 208.93 343.81C217.49 336.89 224.31 327.75 229.46 316.37C234.55 304.99 237.10 292.38 237.10 278.59C237.10 264.48 235.69 250.92 229.05 239.95C198.49 189.48 40.09 208.52 40.44 212.17L40.48 185.48C40.48 187.92 167.15 198.12 184.58 189.27C193.56 184.71 200.84 181.42 206.43 171.35C212.03 161.26 214.85 149.73 214.85 136.85C214.85 125.75 212.75 115.64 208.52 106.54C204.29 97.44 198.60 90.11 191.50 84.65C184.40 79.19 176.52 76.45 167.92 76.45L110.98 76.45L110.98 158.37L89.50 158.37L89.50 71.90L170.83 71.90C183.03 71.90 194.14 74.77 204.20 80.51C214.21 86.24 222.22 93.93 228.23 103.54C234.24 113.14 237.24 124.34 237.24 137.13C237.24 151.28 233.07 163.81 224.72 174.72C216.36 185.66 205.52 195.40 192.18 200.14C205.06 202.19 216.61 204.86 226.77 212.00C236.96 219.16 245.02 228.16 250.99 238.99C256.95 249.87 259.91 261.66 259.91 274.49L259.91 282.73C259.91 296.98 256.31 309.90 249.03 321.60C241.79 333.30 232.05 342.63 219.85 349.55C207.61 356.47 194.09 359.97 179.25 359.97Z" 
                fill="#FEFEFE" fillOpacity="0.12" stroke="#FEFEFE" strokeWidth="1.4">
                <animate attributeName="stroke-width" 
                  values="1.2;1.8;1.2;1.8;1.2" 
                  keyTimes="0;0.2;0.4;0.6;1" 
                  dur="2s" repeatCount="2"/>
                <animate attributeName="fill-opacity" 
                  values="0.08;0.22;0.08;0.22;0.08" 
                  keyTimes="0;0.2;0.4;0.6;1" 
                  dur="2s" repeatCount="2"/>
              </path>
              {/* Próstata visível 0-35%, desaparece 35-55% */}
              <animate attributeName="opacity" 
                values="1;1;0;0;0" 
                keyTimes="0;0.35;0.55;0.8;1" 
                dur="5s" fill="freeze"/>
            </g>
            
            {/* === B DO LOGOTIPO com ROTAÇÃO === */}
            <g id="splash-logoB" opacity="0" filter="url(#splash-mblur)">
              <animateTransform attributeName="transform" type="rotate" 
                values="90 200 200;90 200 200;0 200 200;0 200 200" 
                keyTimes="0;0.4;0.7;1" 
                dur="5s" fill="freeze" 
                calcMode="spline" 
                keySplines="0 0 1 1;0.42 0 0.58 1;0 0 1 1"/>
              <g transform="translate(200, 200) scale(0.85) translate(-150, -216)">
                <path d="M179.25 359.97L89.50 359.97L89.50 239.52L110.98 239.52L110.98 355.42L179.89 355.42C190.68 354.60 200.33 350.73 208.93 343.81C217.49 336.89 224.31 327.75 229.46 316.37C234.55 304.99 237.10 292.38 237.10 278.59C237.10 264.48 235.69 250.92 229.05 239.95C198.49 189.48 40.09 208.52 40.44 212.17L40.48 185.48C40.48 187.92 167.15 198.12 184.58 189.27C193.56 184.71 200.84 181.42 206.43 171.35C212.03 161.26 214.85 149.73 214.85 136.85C214.85 125.75 212.75 115.64 208.52 106.54C204.29 97.44 198.60 90.11 191.50 84.65C184.40 79.19 176.52 76.45 167.92 76.45L110.98 76.45L110.98 158.37L89.50 158.37L89.50 71.90L170.83 71.90C183.03 71.90 194.14 74.77 204.20 80.51C214.21 86.24 222.22 93.93 228.23 103.54C234.24 113.14 237.24 124.34 237.24 137.13C237.24 151.28 233.07 163.81 224.72 174.72C216.36 185.66 205.52 195.40 192.18 200.14C205.06 202.19 216.61 204.86 226.77 212.00C236.96 219.16 245.02 228.16 250.99 238.99C256.95 249.87 259.91 261.66 259.91 274.49L259.91 282.73C259.91 296.98 256.31 309.90 249.03 321.60C241.79 333.30 232.05 342.63 219.85 349.55C207.61 356.47 194.09 359.97 179.25 359.97Z" fill="#FEFEFE"/>
              </g>
              {/* B aparece em 35%, fica até o fim */}
              <animate attributeName="opacity" 
                values="0;0;1;1;1" 
                keyTimes="0;0.35;0.55;0.8;1" 
                dur="5s" fill="freeze"/>
            </g>
            
            {/* === F DO LOGOTIPO (haste cinza) === */}
            <g id="splash-logoF" opacity="0" transform="translate(200, 200) scale(0.92) translate(-150, -216)">
              <path d="M62.10 360.00L40.48 360.00L40.48 239.52L62.10 239.52L62.10 360.00ZM40.48 158.13L40.48 40.00L237.06 40.00L237.06 60.71C220.19 50.63 187.09 44.55 167.06 44.55L62.10 44.55L62.10 158.13L40.48 158.13Z" fill="#C4C4C4"/>
              {/* F aparece em 70% */}
              <animate attributeName="opacity" 
                values="0;0;0;1;1" 
                keyTimes="0;0.65;0.75;0.85;1" 
                dur="5s" fill="freeze"/>
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
