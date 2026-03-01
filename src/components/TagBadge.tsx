interface TagBadgeProps {
  label: string
  variant?: 'default' | 'stack' | 'type' | 'industry' | 'active'
  className?: string
}

const variantStyles = {
  default: 'bg-zinc-800 text-zinc-300 border border-zinc-700/50',
  stack: 'bg-zinc-800/60 text-zinc-300 border border-zinc-700/40',
  type: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
  industry: 'bg-violet-500/10 text-violet-400 border border-violet-500/20',
  active: 'bg-cyan-500 text-zinc-950 border border-cyan-500 font-semibold',
}

export default function TagBadge({ label, variant = 'default', className = '' }: TagBadgeProps) {
  return (
    <span
      className={`inline-flex items-center text-xs px-2.5 py-1 rounded-md ${variantStyles[variant]} ${className}`}
    >
      {label}
    </span>
  )
}
