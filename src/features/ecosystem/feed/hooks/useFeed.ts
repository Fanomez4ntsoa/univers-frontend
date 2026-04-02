import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ecosystemAPI } from '../../../../shared/lib/axios'
import type { Post, PostComment } from '../types/post'

const FEED_KEY = ['feed']
const POSTS_KEY = ['posts']

export const useFeed = () => {
  return useQuery<Post[]>({
    queryKey: FEED_KEY,
    queryFn: async () => {
      const { data } = await ecosystemAPI.get('/api/ecosystem/feed')
      return data.data as Post[]
    },
  })
}

export const usePosts = () => {
  return useQuery<Post[]>({
    queryKey: POSTS_KEY,
    queryFn: async () => {
      const { data } = await ecosystemAPI.get('/api/ecosystem/posts')
      return data.data as Post[]
    },
  })
}

export const usePost = (id: number | null) => {
  return useQuery<Post>({
    queryKey: ['post', id],
    queryFn: async () => {
      const { data } = await ecosystemAPI.get(`/api/ecosystem/posts/${id}`)
      return data
    },
    enabled: !!id,
  })
}

export const useCreatePost = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: { content: string; post_type: string }) =>
      ecosystemAPI.post('/api/ecosystem/posts', payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: FEED_KEY })
      qc.invalidateQueries({ queryKey: POSTS_KEY })
    },
  })
}

export const useUpdatePost = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: { id: number; content: string; post_type: string }) =>
      ecosystemAPI.put(`/api/ecosystem/posts/${id}`, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: FEED_KEY })
      qc.invalidateQueries({ queryKey: POSTS_KEY })
    },
  })
}

export const useDeletePost = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => ecosystemAPI.delete(`/api/ecosystem/posts/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: FEED_KEY })
      qc.invalidateQueries({ queryKey: POSTS_KEY })
    },
  })
}

export const useLikePost = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => ecosystemAPI.post(`/api/ecosystem/posts/${id}/like`),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: FEED_KEY })
      await qc.cancelQueries({ queryKey: POSTS_KEY })

      const updatePosts = (old: Post[] | undefined) =>
        old?.map((p) =>
          p.id === id
            ? { ...p, is_liked: !p.is_liked, likes_count: p.is_liked ? p.likes_count - 1 : p.likes_count + 1 }
            : p
        )

      qc.setQueryData<Post[]>(FEED_KEY, updatePosts)
      qc.setQueryData<Post[]>(POSTS_KEY, updatePosts)
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: FEED_KEY })
      qc.invalidateQueries({ queryKey: POSTS_KEY })
    },
  })
}

export const usePostComments = (postId: number | null) => {
  return useQuery<PostComment[]>({
    queryKey: ['post-comments', postId],
    queryFn: async () => {
      const { data } = await ecosystemAPI.get(`/api/ecosystem/posts/${postId}/comments`)
      return data
    },
    enabled: !!postId,
  })
}

export const useAddComment = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ postId, content }: { postId: number; content: string }) =>
      ecosystemAPI.post(`/api/ecosystem/posts/${postId}/comments`, { content }),
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: ['post-comments', v.postId] })
      qc.invalidateQueries({ queryKey: FEED_KEY })
      qc.invalidateQueries({ queryKey: POSTS_KEY })
    },
  })
}
