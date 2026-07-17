/**
 * Componente para injetar favicon e apple-touch-icon em landing pages
 * Garante consistência visual em todas as páginas do site
 */
import { useEffect } from 'react';

interface FaviconInjectorProps {
  title?: string;
  description?: string;
}

export function FaviconInjector({ title, description }: FaviconInjectorProps) {
  useEffect(() => {
    // Favicon URLs
    const faviconUrl = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/favicon-192-hBsZz5ygpyEFRWYduWw7YC.png';
    const appleTouchIconUrl = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/apple-touch-icon-180-DQsGysGf4bDBHNB45VjyhM.png';

    // Injetar ou atualizar favicon (192x192)
    let favicon192 = document.querySelector('link[rel="icon"][sizes="192x192"]');
    if (!favicon192) {
      favicon192 = document.createElement('link');
      favicon192.setAttribute('rel', 'icon');
      favicon192.setAttribute('type', 'image/png');
      favicon192.setAttribute('sizes', '192x192');
      document.head.appendChild(favicon192);
    }
    favicon192.setAttribute('href', faviconUrl);

    // Injetar ou atualizar favicon (32x32)
    let favicon32 = document.querySelector('link[rel="icon"][sizes="32x32"]');
    if (!favicon32) {
      favicon32 = document.createElement('link');
      favicon32.setAttribute('rel', 'icon');
      favicon32.setAttribute('type', 'image/png');
      favicon32.setAttribute('sizes', '32x32');
      document.head.appendChild(favicon32);
    }
    favicon32.setAttribute('href', faviconUrl);

    // Injetar ou atualizar favicon (16x16)
    let favicon16 = document.querySelector('link[rel="icon"][sizes="16x16"]');
    if (!favicon16) {
      favicon16 = document.createElement('link');
      favicon16.setAttribute('rel', 'icon');
      favicon16.setAttribute('type', 'image/png');
      favicon16.setAttribute('sizes', '16x16');
      document.head.appendChild(favicon16);
    }
    favicon16.setAttribute('href', faviconUrl);

    // Injetar ou atualizar apple-touch-icon
    let appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]');
    if (!appleTouchIcon) {
      appleTouchIcon = document.createElement('link');
      appleTouchIcon.setAttribute('rel', 'apple-touch-icon');
      appleTouchIcon.setAttribute('type', 'image/png');
      appleTouchIcon.setAttribute('sizes', '180x180');
      document.head.appendChild(appleTouchIcon);
    }
    appleTouchIcon.setAttribute('href', appleTouchIconUrl);

    // Atualizar theme-color se não existir
    let themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      themeColor = document.createElement('meta');
      themeColor.setAttribute('name', 'theme-color');
      themeColor.setAttribute('content', '#1C3D5A');
      document.head.appendChild(themeColor);
    }
  }, []);

  return null; // Este componente não renderiza nada, apenas injeta meta tags
}
