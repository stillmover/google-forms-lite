type MessageProps = {
  message: string
}

export function LoadingState({ message }: MessageProps) {
  return <p className="text-slate-600">{message}</p>
}

export function EmptyState({ message }: MessageProps) {
  return (
    <p className="rounded-xl border border-slate-200 bg-white p-4 text-slate-600">
      {message}
    </p>
  )
}

export function ErrorState({ message }: MessageProps) {
  return (
    <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-red-700">
      {message}
    </p>
  )
}
