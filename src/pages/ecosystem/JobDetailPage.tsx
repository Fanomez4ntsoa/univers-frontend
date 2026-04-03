import { useParams } from 'react-router-dom'
import JobDetail from '../../features/ecosystem/jobs/components/JobDetail'

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>()
  return <JobDetail jobId={Number(id)} />
}
