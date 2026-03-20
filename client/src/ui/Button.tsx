import type { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

export function Button({
  variant = 'primary',
  className,
  ...props
}: Props) {
  const base =
    'rounded-md px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60'

  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-slate-900 text-white hover:bg-slate-700 cursor-pointer',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 cursor-pointer',
    danger: 'bg-red-100 text-red-700 hover:bg-red-200 cursor-pointer',
    ghost: 'hover:bg-slate-100 text-slate-700 cursor-pointer',
  }

  return (
    <button
      className={clsx(base, variants[variant], className)}
      {...props}
    />
  )
}