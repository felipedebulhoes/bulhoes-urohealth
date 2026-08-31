/**
 * Botão CTA com Animações de Hover e Transições Suaves
 * Melhora experiência do usuário e engajamento
 */
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface CTAButtonWithAnimationProps {
  children: ReactNode;
  onClick?: () => void | Promise<void>;
  href?: string;
  target?: string;
  rel?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
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
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  disabled = false,
  type = 'button',
  loading = false,
  loadingText = 'Abrindo…',
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
  // Estilos base por variante
  const variantStyles = {
    primary: 'bg-[#B87333] hover:bg-[#A0632A] text-white',
    secondary: 'bg-[#1C3D5A] hover:bg-[#152B42] text-white',
    outline: 'border-2 border-[#B87333] text-[#B87333] hover:bg-[#B87333] hover:text-white',
  };

  // Estilos por tamanho
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2 rounded-lg font-medium
    transition-all duration-300 ease-out
    disabled:opacity-50 disabled:cursor-not-allowed aria-disabled:opacity-60
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B87333]
    active:scale-[0.97]
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

  // Animações
  const buttonVariants = {
    rest: {
      scale: 1,
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    hover: {
      scale: 1.05,
      boxShadow: '0px 12px 20px rgba(184, 115, 51, 0.3)',
    },
    tap: {
      scale: 0.98,
    },
  };

  if (href) {
    return (
      <motion.a
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
        className={baseClasses}
        variants={buttonVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={() => void handleClick()}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={baseClasses}
      variants={buttonVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {buttonContent}
    </motion.button>
  );
}
