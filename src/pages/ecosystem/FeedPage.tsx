import { useState } from 'react'
import { Rss, Users, LogIn } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../shared/ui/button'
import { useFeed, usePosts } from '../../features/ecosystem/feed/hooks/useFeed'
import PostsList from '../../features/ecosystem/feed/components/PostsList'
import PageSkeleton from '../../shared/components/PageSkeleton'

export default function FeedPage() {
  const isLoggedIn = !!localStorage.getItem('token')
  const [tab, setTab] = useState<'feed' | 'all'>(isLoggedIn ? 'feed' : 'all')
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

      {tab === 'feed' && !isLoggedIn ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Connecte-toi pour voir ton feed personnalisé</h3>
          <p className="text-sm text-slate-500 mb-4">Suis des artisans et retrouve leurs publications ici</p>
          <Link to="/login">
            <Button className="bg-[#1E40AF] hover:bg-blue-800 rounded-lg text-white cursor-pointer">
              <LogIn className="w-4 h-4 mr-2" /> Se connecter
            </Button>
          </Link>
        </div>
      ) : (
        <PostsList posts={data ?? []} isFeed={tab === 'feed'} />
      )}
    </div>
  )
}
