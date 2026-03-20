import type { PropsWithChildren } from 'react'

export function Field({
  label,
  children,
}: PropsWithChildren<{ label: string }>) {
  return (
    <label className="grid gap-1">
      <span className="text-sm font-medium text-slate-700">
        {label}
      </span>
      {children}
    </label>
  )
}