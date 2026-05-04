import { ButtonHTMLAttributes } from 'react';

export function GlassButton({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20 transition ${className}`}
      {...props}
    />
  );
}
