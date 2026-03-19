type ToastProps = {
  type: 'success' | 'error' | 'info'
  message: string
  actionLabel?: string
  onAction?: () => void
}

const stylesByType: Record<ToastProps['type'], string> = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  error: 'border-red-200 bg-red-50 text-red-700',
  info: 'border-slate-200 bg-slate-50 text-slate-700',
}

export function Toast({ type, message, actionLabel, onAction }: ToastProps) {
  return (
    <div className={`rounded-md border px-3 py-2 text-sm ${stylesByType[type]}`}>
      <p>{message}</p>
      {actionLabel && onAction && (
        <button className="mt-2 underline" onClick={onAction} type="button">
          {actionLabel}
        </button>
      )}
    </div>
  )
}
