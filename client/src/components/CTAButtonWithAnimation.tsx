/**
 * Botão CTA com Animações de Hover e Transições Suaves
 * Melhora experiência do usuário e engajamento
 */
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CTAButtonWithAnimationProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
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
}: CTAButtonWithAnimationProps) {
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
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B87333]
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `;

  const buttonContent = (
    <>
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      <span>{children}</span>
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
      onClick={onClick}
      disabled={disabled}
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
