import { ProjectMetric } from '@/types'

interface MetricCardProps {
  metric: ProjectMetric
  accent?: boolean
}

export default function MetricCard({ metric, accent = false }: MetricCardProps) {
  return (
    <div className={`rounded-xl p-6 border text-center ${
      accent
        ? 'bg-cyan-500/5 border-cyan-500/20'
        : 'bg-[#13131f] border-[#252540]'
    }`}>
      <p className={`text-3xl font-bold tracking-tight leading-none ${
        accent ? 'text-cyan-400' : 'text-white'
      }`}>
        {metric.value}
      </p>
      <p className="mt-2 text-sm text-zinc-500 leading-snug">{metric.label}</p>
    </div>
  )
}
