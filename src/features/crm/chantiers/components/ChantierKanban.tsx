import { ArrowRight } from 'lucide-react'
import { Button } from '../../../../shared/ui/button'
import { toast } from 'sonner'
import { useMoveStage } from '../hooks/useChantiers'
import { STATUS_CONFIG, PIPELINE_STAGES, TYPE_CONFIG } from '../types/chantier'
import type { Chantier } from '../../../../shared/types/crm'
import type { ChantierStatus } from '../types/chantier'
import RentabiliteIndicator from './RentabiliteIndicator'

interface ChantierKanbanProps {
  data: Chantier[]
  onSelect: (c: Chantier) => void
}

export default function ChantierKanban({ data, onSelect }: ChantierKanbanProps) {
  const moveMutation = useMoveStage()

  const handleMove = (chantierId: number, newStage: ChantierStatus) => {
    moveMutation.mutate(
      { id: chantierId, stage: newStage },
      { onSuccess: () => toast.success('Chantier déplacé'), onError: () => toast.error('Erreur') }
    )
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {PIPELINE_STAGES.map((stage) => {
        const config = STATUS_CONFIG[stage]
        const stageChantiers = data.filter((c) => c.status === stage)
        const stageIdx = PIPELINE_STAGES.indexOf(stage)
        const nextStage = stageIdx < PIPELINE_STAGES.length - 1 ? PIPELINE_STAGES[stageIdx + 1] : null

        return (
          <div key={stage} className="flex-shrink-0 w-72">
            <div className={`rounded-t-xl px-4 py-2 ${config.color} font-medium text-sm flex items-center justify-between`}>
              <span>{config.label}</span>
              <span className="text-xs opacity-75">{stageChantiers.length}</span>
            </div>
            <div className="bg-slate-50 rounded-b-xl border border-slate-200 border-t-0 min-h-[200px] p-2 space-y-2">
              {stageChantiers.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-8">Aucun chantier</p>
              ) : (
                stageChantiers.map((chantier) => (
                  <div
                    key={chantier.id}
                    onClick={() => onSelect(chantier)}
                    className="bg-white rounded-lg border border-slate-200 p-3 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm text-slate-900 truncate">{chantier.client_name}</span>
                      <RentabiliteIndicator level={chantier.rentability_level} margin={chantier.margin} />
                    </div>
                    <p className="text-xs text-slate-500">{TYPE_CONFIG[chantier.chantier_type]}</p>
                    {chantier.city && <p className="text-xs text-slate-400">{chantier.city}</p>}
                    {nextStage && stage !== 'cancelled' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full mt-2 text-xs text-[#1E40AF]"
                        onClick={(e) => { e.stopPropagation(); handleMove(chantier.id, nextStage) }}
                      >
                        <ArrowRight className="w-3 h-3 mr-1" /> {STATUS_CONFIG[nextStage].label}
                      </Button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
