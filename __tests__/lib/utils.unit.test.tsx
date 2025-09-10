import { getEmbedUrl, hasAudiovisualContent } from '../../assets/js/settings/lib/utils';
import { CoverAudiovisualSettings } from '../../assets/js/settings/types';

describe('utils', () => {
  describe('getEmbedUrl', () => {
    describe('Happy paths', () => {
      it('returns embed URL for youtube.com/watch?v=abc123', () => {
        const url = getEmbedUrl('https://www.youtube.com/watch?v=abc123');
        expect(url).toBe('https://www.youtube.com/embed/abc123');
      });

      it('returns embed URL for youtu.be/abc123 short links', () => {
        const url = getEmbedUrl('https://youtu.be/abc123');
        expect(url).toBe('https://www.youtube.com/embed/abc123');
      });

      it('returns embed URL for vimeo.com/123456 links', () => {
        const url = getEmbedUrl('https://vimeo.com/123456');
        expect(url).toBe('https://player.vimeo.com/video/123456');
      });
    });
    describe('Sad paths', () => {
      it('returns null for unsupported host', () => {
        expect(getEmbedUrl('https://example.com/video')).toBeNull();
      });

      it('returns null for empty string', () => {
        expect(getEmbedUrl('')).toBeNull();
      });

      it('returns null for malformed URL', () => {
        expect(getEmbedUrl('notaurl')).toBeNull();
      });

      it('returns null for youtube.com without video id', () => {
        expect(getEmbedUrl('https://www.youtube.com/watch')).toBeNull();
      });

      it('returns null for youtu.be with no id', () => {
        expect(getEmbedUrl('https://youtu.be/')).toBeNull();
      });

      it('returns null for vimeo.com without id', () => {
        expect(getEmbedUrl('https://vimeo.com/')).toBeNull();
      });
    });
  });

  describe('hasAudiovisualContent', () => {
    describe('Happy paths', () => {
      it('returns true if at least one field has non-empty value', () => {
        const settings: CoverAudiovisualSettings = { title: 'Title', url: '', desc: '' };
        expect(hasAudiovisualContent(settings)).toBe(true);
      });
    });
    describe('Sad paths', () => {
      it('returns false if all fields are empty', () => {
        const settings: CoverAudiovisualSettings = { title: '', url: '', desc: '' };
        expect(hasAudiovisualContent(settings)).toBe(false);
      });
  
      it('ignores whitespace-only values', () => {
        const settings: CoverAudiovisualSettings = { title: '   ', url: '', desc: '' };
        expect(hasAudiovisualContent(settings)).toBe(false);
      });
    });
  });
});
