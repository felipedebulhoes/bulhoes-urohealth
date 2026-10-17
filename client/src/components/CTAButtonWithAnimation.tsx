/**
 * CTA reutilizável com feedback breve e acessível para ações de agendamento.
 */
import { Loader2 } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";

interface CTAButtonWithAnimationProps {
  children: ReactNode;
  onClick?: () => void | Promise<void>;
  href?: string;
  target?: string;
  rel?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  loadingText?: ReactNode;
  autoLoading?: boolean;
}

export function CTAButtonWithAnimation({
  children,
  onClick,
  href,
  target,
  rel,
  variant = "primary",
  size = "md",
  icon,
  className = "",
  disabled = false,
  type = "button",
  loading = false,
  loadingText = "Abrindo…",
  autoLoading = true,
}: CTAButtonWithAnimationProps) {
  const [internalLoading, setInternalLoading] = useState(false);
  const resetTimerRef = useRef<number | null>(null);
  const isLoading = loading || internalLoading;

  useEffect(() => () => {
    if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
  }, []);

  const beginFeedback = () => {
    if (!autoLoading || loading) return;
    setInternalLoading(true);
    resetTimerRef.current = window.setTimeout(() => setInternalLoading(false), 1800);
  };

  const handleClick = async () => {
    if (disabled || isLoading) return;
    beginFeedback();
    await onClick?.();
  };

  const variantStyles = {
    primary: "bg-[#D7C5B0] text-[#2B2420] border border-[#F7F3ED]/50",
    secondary: "bg-[#453830] text-[#F7F3ED] border border-[#D7C5B0]/35",
    outline: "border border-[#D7C5B0]/65 text-white bg-transparent",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const baseClasses = `
    schedule-cta schedule-cta--${variant}
    inline-flex items-center justify-center gap-2 rounded-md font-semibold
    motion-safe:transition-[color,background-color,border-color,box-shadow,transform,opacity]
    motion-safe:duration-150 motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)]
    motion-reduce:transition-none
    disabled:opacity-50 disabled:cursor-not-allowed aria-disabled:opacity-60 aria-busy:cursor-wait
    focus-visible:outline-none
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `;

  const buttonContent = (
    <>
      {isLoading ? (
        <Loader2 className="h-4 w-4 motion-safe:animate-spin" aria-hidden="true" />
      ) : icon ? (
        <span className="flex items-center justify-center">{icon}</span>
      ) : null}
      <span aria-live="polite">{isLoading ? loadingText : children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={(event) => {
          if (disabled || isLoading) {
            event.preventDefault();
            return;
          }
          void handleClick();
        }}
        aria-busy={isLoading}
        aria-disabled={disabled || isLoading}
        tabIndex={disabled || isLoading ? -1 : undefined}
        className={baseClasses}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={() => void handleClick()}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={baseClasses}
    >
      {buttonContent}
    </button>
  );
}
