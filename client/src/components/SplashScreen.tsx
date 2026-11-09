import { useState, useEffect } from "react";

/**
 * SplashScreen — abertura silenciosa com o logotipo oficial.
 * Aparece uma vez por sessão (sessionStorage) e não reproduz áudio.
 */
export default function SplashScreen() {
  const [show, setShow] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("splash_seen")) return;

    setShow(true);
    sessionStorage.setItem("splash_seen", "1");

    const fadeTimer = setTimeout(() => setFadeOut(true), 2300);
    const removeTimer = setTimeout(() => setShow(false), 3100);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`splash-screen ${fadeOut ? "splash-fadeout" : ""}`}
      role="presentation"
    >
      <div className="splash-mark">
        <img
          loading="eager"
          decoding="async"
          src="/brand/logo-site-fundo-escuro.png"
          alt="Dr. Felipe de Bulhões"
          className="splash-logo"
        />
        <span className="splash-rule" aria-hidden="true" />
      </div>
    </div>
  );
}
