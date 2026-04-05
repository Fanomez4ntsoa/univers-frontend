// ReseauPage.tsx — Orchestration pure (max 50 lignes)
// Fidèle à Emergent ActuPage.jsx — layout 3 colonnes desktop

import { usePosts } from '../../features/ecosystem/feed/hooks/useFeed'
import PostsList from '../../features/ecosystem/feed/components/PostsList'
import StoriesBar from '../../features/ecosystem/reseau/components/StoriesBar'
import PublicationZone from '../../features/ecosystem/reseau/components/PublicationZone'
import ReseauSidebarLeft from '../../features/ecosystem/reseau/components/ReseauSidebarLeft'
import ReseauSidebarRight from '../../features/ecosystem/reseau/components/ReseauSidebarRight'
import ConversionBannerReseau from '../../features/ecosystem/reseau/components/ConversionBannerReseau'
import BetaBannerReseau from '../../features/ecosystem/reseau/components/BetaBannerReseau'

export default function ReseauPage() {
  const { data: posts = [], isLoading } = usePosts()

  return (
    <div style={{ background: '#F5F5F7', minHeight: '100vh' }}>
      <ConversionBannerReseau />

      {/* Stories — mobile/tablette only */}
      <div className="lg:hidden">
        <StoriesBar variant="mobile" />
      </div>

      {/* Beta banner — tablette only */}
      <div className="hidden md:block lg:hidden" style={{ maxWidth: '1400px', margin: '0 auto', padding: '16px 24px' }}>
        <BetaBannerReseau />
      </div>

      {/* Layout Desktop 3 colonnes */}
      <div className="hidden lg:block">
        <BetaBannerReseau />
        <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto', padding: '16px 24px', gap: '24px' }}>
          <ReseauSidebarLeft />
          <div style={{ flex: 1, maxWidth: '600px' }}>
            <StoriesBar variant="desktop" />
            <PublicationZone />
            {isLoading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Chargement...</div>
            ) : (
              posts.map((post) => (
                <div key={post.id} style={{ background: '#fff', borderRadius: '16px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden', padding: '16px' }}>
                  <p className="font-semibold text-gray-900 mb-1">{post.user?.display_name}</p>
                  <p className="text-gray-600 text-sm">{post.content}</p>
                </div>
              ))
            )}
          </div>
          <ReseauSidebarRight />
        </div>
      </div>

      {/* Mobile/Tablette — feed simple */}
      <div className="lg:hidden" style={{ maxWidth: '600px', margin: '0 auto', padding: '16px' }}>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Chargement...</div>
        ) : (
          <PostsList posts={posts} isFeed={false} />
        )}
      </div>
    </div>
  )
}
