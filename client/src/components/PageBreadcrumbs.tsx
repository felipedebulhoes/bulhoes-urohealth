import { Link, useLocation } from "wouter";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getBreadcrumbItems } from "@shared/pageMetadata";
import { cn } from "@/lib/utils";

type PageBreadcrumbsProps = {
  className?: string;
  tone?: "default" | "inverted";
};

/**
 * Breadcrumbs visíveis e JSON-LD derivados da mesma política central de rotas.
 * Rotas sem intenção de indexação não exibem a trilha nem publicam BreadcrumbList.
 */
export default function PageBreadcrumbs({
  className,
  tone = "inverted",
}: PageBreadcrumbsProps) {
  const [location] = useLocation();
  const items = getBreadcrumbItems(location);

  if (items.length < 2) return null;

  const isInverted = tone === "inverted";
  const linkClassName = isInverted
    ? "text-white/65 hover:text-white focus-visible:text-white"
    : "text-[#1C3D5A]/60 hover:text-[#1C3D5A] dark:text-foreground/60 dark:hover:text-foreground";
  const currentClassName = isInverted
    ? "text-white/95"
    : "text-[#1C3D5A] dark:text-foreground";
  const separatorClassName = isInverted
    ? "text-white/35"
    : "text-[#1C3D5A]/35 dark:text-foreground/35";

  return (
    <>
      <BreadcrumbSchema items={items} />
      <Breadcrumb className={cn("text-sm", className)} aria-label="Caminho de navegação">
        <BreadcrumbList className="gap-y-2 text-xs sm:text-sm">
          {items.map((item, index) => {
            const isCurrent = index === items.length - 1;
            return (
              <BreadcrumbItem key={item.url} className="min-w-0">
                {isCurrent ? (
                  <BreadcrumbPage className={cn("max-w-[15rem] truncate font-medium sm:max-w-[28rem]", currentClassName)}>
                    {item.name}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild className={cn("focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4884A] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent", linkClassName)}>
                    <Link href={item.url}>{item.name}</Link>
                  </BreadcrumbLink>
                )}
                {!isCurrent && <BreadcrumbSeparator className={separatorClassName} />}
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
