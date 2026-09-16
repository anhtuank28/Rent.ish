import React, { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  href?: string;
  icon?: string;
}

export function Button({
  className = '',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  href,
  icon,
  children,
  ...props
}: ButtonProps) {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center rounded-full font-label-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container shadow-sm',
    secondary: 'bg-surface-container hover:bg-surface-container-high text-on-surface',
    outline: 'border border-outline hover:bg-surface-container-low text-on-surface',
    ghost: 'hover:bg-surface-container-low text-on-surface-variant hover:text-on-surface',
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-label-sm gap-1',
    md: 'px-space-md py-space-sm text-label-lg gap-2',
    lg: 'px-space-lg py-4 text-headline-sm gap-2',
    icon: 'p-2 rounded-full',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  const content = (
    <>
      {children}
      {icon && <span className="material-symbols-outlined text-[1.1em]">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
