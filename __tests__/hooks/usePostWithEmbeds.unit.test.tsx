// assets/js/settings/__tests__/hooks/usePostWithEmbeds.unit.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { useEntityRecords } from '@wordpress/core-data';

import { usePostWithEmbeds } from '../../assets/js/settings/hooks/usePostWithEmbeds';

// mock useEntityRecords from @wordpress/core-data
jest.mock('@wordpress/core-data', () => ({
	useEntityRecords: jest.fn(),
}));

describe('usePostWithEmbeds', () => {
	const mockUseEntityRecords = useEntityRecords as jest.Mock;

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('returns isLoading=true while fetching post data', async () => {
		mockUseEntityRecords.mockReturnValue({
			records: [],
			isResolving: true,
			hasResolved: false,
		});

		const { result } = renderHook(() => usePostWithEmbeds(123));

		expect(result.current.isLoading).toBe(true);
		expect(result.current.post).toBeUndefined();
	});
	
	it('calls useEntityRecords with correct arguments', () => {
		const selectedItem = {
			id: 123,
			title: 'ignored',
			url: 'ignored',
			type: 'ignored',
			subtype: 'ignored',
		};

		mockUseEntityRecords.mockReturnValue({
			records: [],
			isResolving: false,
			hasResolved: true,
		});

		renderHook(() => usePostWithEmbeds(selectedItem.id));

		expect(mockUseEntityRecords).toHaveBeenCalledWith(
			'postType',
			'post',
			expect.objectContaining({
				include: [selectedItem.id],
				_embed: true,
				per_page: 1,
			})
		);
	});
});
