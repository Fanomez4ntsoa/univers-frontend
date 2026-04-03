import { useParams } from 'react-router-dom'
import EventDetail from '../../features/ecosystem/jobs/components/EventDetail'

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>()
  return <EventDetail eventId={Number(id)} />
}
