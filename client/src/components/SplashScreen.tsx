import { useState, useEffect, useRef } from "react";

/**
 * SplashScreen — Animação de abertura do site (VERSÃO v3 - "O Diagnóstico Vivo")
 * Baseada no pacote animacao-todas-versoes.zip fornecido pelo Dr. Felipe.
 * 
 * Conceito:
 * - Ultrassonografia transretal REALISTA (speckle, zonas anatômicas, interface de aparelho)
 * - Próstata "emerge" do ultrassom como o B deitado
 * - B cresce e rotaciona para vertical
 * - F cinza aparece completando o logotipo FB
 * - Texto "Dr. Felipe de Bulhões" + "UROLOGISTA" aparece
 * - Duração: 6 segundos (vídeo MP4 pré-renderizado)
 * 
 * Implementação: Vídeo MP4 (178KB) via CDN para máxima fidelidade visual.
 * Sons: heartbeat (batimento cardíaco suave) + whoosh (transição)
 * Só aparece 1x por sessão (sessionStorage).
 */
export default function SplashScreen() {
  const [show, setShow] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const heartbeatRef = useRef<HTMLAudioElement | null>(null);
  const whooshRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

    // Tocar whoosh na transição (quando B começa a girar ~2.5s)
    const whooshTimer = setTimeout(() => {
      try {
        const whoosh = new Audio("/manus-storage/whoosh_c71d172a.mp3");
        whoosh.volume = 0.25;
        whooshRef.current = whoosh;
        whoosh.play().catch(() => {});
      } catch {}
    }, 2500);

    // Mostrar botão "Pular" após 3s
    const skipTimer = setTimeout(() => setShowSkip(true), 3000);

    // Após 6.5s (vídeo 6s + 0.5s hold), inicia fade-out
    const fadeTimer = setTimeout(() => setFadeOut(true), 6500);
    // Após 7.3s, remove do DOM
    const removeTimer = setTimeout(() => setShow(false), 7300);

    return () => {
      clearTimeout(skipTimer);
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

  const handleSkip = () => {
    setFadeOut(true);
    setTimeout(() => setShow(false), 800);
    if (heartbeatRef.current) {
      heartbeatRef.current.pause();
      heartbeatRef.current = null;
    }
    if (whooshRef.current) {
      whooshRef.current.pause();
      whooshRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  if (!show) return null;

  return (
    <div
      className={`splash-screen ${fadeOut ? "splash-fadeout" : ""}`}
      aria-label="Animação de abertura - Ultrassonografia transretal se transforma no logotipo FB"
    >
      <div className="splash-video-container">
        <video
          ref={videoRef}
          className={`splash-video ${videoLoaded ? "splash-video-visible" : ""}`}
          src="/manus-storage/site-splash-6s_45b79a42.mp4"
          poster="/manus-storage/splash-poster_0d71c137.png"
          muted
          playsInline
          preload="auto"
          onLoadedData={handleVideoLoaded}
          onEnded={() => {
            // Manter no último frame até o fade-out
          }}
        />
        {/* Fallback: poster estático se vídeo não carregar */}
        {!videoLoaded && (
          <img
            src="/manus-storage/splash-poster_0d71c137.png"
            alt="Animação de abertura Dr. Felipe de Bulhões Urologista"
            className="splash-poster-fallback"
          />
        )}
      </div>

      {/* Botão Pular - aparece após 3s */}
      {showSkip && !fadeOut && (
        <button
          onClick={handleSkip}
          className="splash-skip-btn"
          aria-label="Pular animação de abertura"
        >
          PULAR
        </button>
      )}
    </div>
  );
}
