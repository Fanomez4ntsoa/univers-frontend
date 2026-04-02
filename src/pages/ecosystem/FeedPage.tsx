import { useState } from 'react'
import { Rss, Users } from 'lucide-react'
import { useFeed, usePosts } from '../../features/ecosystem/feed/hooks/useFeed'
import PostsList from '../../features/ecosystem/feed/components/PostsList'
import PageSkeleton from '../../shared/components/PageSkeleton'

export default function FeedPage() {
  const [tab, setTab] = useState<'feed' | 'all'>('feed')
  const feedQuery = useFeed()
  const postsQuery = usePosts()

  const isLoading = tab === 'feed' ? feedQuery.isLoading : postsQuery.isLoading
  const isError = tab === 'feed' ? feedQuery.isError : postsQuery.isError
  const data = tab === 'feed' ? feedQuery.data : postsQuery.data

  if (isLoading) return <PageSkeleton />
  if (isError) return <div className="text-center py-16"><p className="text-red-500">Erreur lors du chargement</p></div>

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Fil d'actualité</h1>
        <div className="flex bg-slate-100 rounded-lg p-1">
          <button onClick={() => setTab('feed')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${tab === 'feed' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>
            <Users className="w-4 h-4" /> Suivis
          </button>
          <button onClick={() => setTab('all')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${tab === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>
            <Rss className="w-4 h-4" /> Tous
          </button>
        </div>
      </div>
      <PostsList posts={data ?? []} isFeed={tab === 'feed'} />
    </div>
  )
}
