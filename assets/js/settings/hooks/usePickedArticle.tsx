// assets/js/settings/hooks/usePickedArticle.tsx
import { useEntityRecords } from '@wordpress/core-data';

import { ArticleItem, WPPost } from '../types';

interface PickedArticle extends ArticleItem {
  date: string;
  author: string;
  featuredMediaUrl: string;
}

interface usePickedArticleReturn {
  picked: PickedArticle | undefined;
  isLoading: boolean;
}

export const usePickedArticle = (selectedItem?: ArticleItem): usePickedArticleReturn => {
  const postId = selectedItem?.id;

  const postsResolution = useEntityRecords<WPPost>('postType', 'post', {
    include: postId ? [postId] : [],
    _embed: true,
    per_page: 1,
  });

  const { records, isResolving, hasResolved } = postsResolution;
  const post = records?.find((p) => p.id === postId);

  const pickedArticle: PickedArticle = {
    id: post?.id ?? 0,
    title: post?.title?.rendered ?? '',
    url: post?.link ?? '',
    type: selectedItem?.type ?? '',
    subtype: selectedItem?.subtype ?? '',
    date: post?.date ?? '',
    author: post?._embedded?.author?.[0]?.name ?? '',
    featuredMediaUrl: post?._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? '',
  };

  const isLoading = isResolving || !hasResolved;  
  const picked = !isLoading ? pickedArticle : undefined;

  return { picked, isLoading };
};
