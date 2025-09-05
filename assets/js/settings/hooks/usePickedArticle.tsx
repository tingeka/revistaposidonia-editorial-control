// assets/js/settings/hooks/usePickedArticle.tsx
import { useEntityRecords } from '@wordpress/core-data';

import { CoverArticleItem, WPPost } from '../types';

export const usePickedArticle = (selectedItem?: CoverArticleItem) => {
  const postId = selectedItem?.id;
  // console.log(selectedItem);

  // Use type from WPPost
  const postsResolution = useEntityRecords<WPPost>('postType', 'post', {
    include: postId ? [postId] : [],
    _embed: true,
    per_page: 1,
  });

  const post = postsResolution?.records?.find((p) => p.id === postId);


  const featuredMediaUrl = post?._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? '';
  const authorName = post?._embedded?.author?.[0]?.name ?? '';

  const isLoading = postsResolution === undefined;

  return { post, featuredMediaUrl, authorName, isLoading };
};
