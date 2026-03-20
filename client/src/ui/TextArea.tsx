import type { TextareaHTMLAttributes } from 'react'
import clsx from 'clsx'

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={clsx(
        'min-h-24 rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500',
        className,
      )}
      {...props}
    />
  )
}