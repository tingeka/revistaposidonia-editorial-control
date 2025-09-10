// hooks/usePostWithEmbeds.ts
import { useEntityRecords } from '@wordpress/core-data';

import { WPPost } from '../types';

export const usePostWithEmbeds = (postId: number) => {
  
  const { records, isResolving, hasResolved } = useEntityRecords<WPPost>(
    'postType',
    'post',
    {
      include: [postId],
      _embed: true,
      per_page: 1,
    }
  );
  
  const post = records?.find((p) => p.id === postId);
  const isLoading = isResolving || !hasResolved;
  
  return { post, isLoading };
};