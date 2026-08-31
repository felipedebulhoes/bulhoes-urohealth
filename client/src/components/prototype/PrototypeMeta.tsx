import { useEffect } from "react";
import { trackPrototypeEvent } from "@/lib/analytics";

interface PrototypeMetaProps {
  title: string;
  pageId: string;
}

export default function PrototypeMeta({ title, pageId }: PrototypeMetaProps) {
  useEffect(() => {
    const previousTitle = document.title;
    const existingRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const previousRobots = existingRobots?.content;
    const robots = existingRobots ?? document.createElement("meta");

    robots.name = "robots";
    robots.content = "noindex, nofollow, noarchive, nosnippet";
    if (!existingRobots) document.head.appendChild(robots);

    document.title = `${title} | Protótipo Dr. Felipe de Bulhões`;
    trackPrototypeEvent("prototype_page_view", pageId);

    return () => {
      document.title = previousTitle;
      if (existingRobots && previousRobots) {
        existingRobots.content = previousRobots;
      } else {
        robots.remove();
      }
    };
  }, [pageId, title]);

  return null;
}
