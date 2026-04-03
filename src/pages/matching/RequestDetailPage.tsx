import { useParams } from 'react-router-dom'
import RequestDetail from '../../features/matching/components/RequestDetail'

export default function RequestDetailPage() {
  const { id } = useParams<{ id: string }>()
  return <RequestDetail requestId={Number(id)} />
}
