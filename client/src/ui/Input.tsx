import type { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        'rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500',
        className,
      )}
      {...props}
    />
  )
}