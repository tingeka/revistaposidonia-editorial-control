// __tests__/modules/CoverAudiovisualModule.integration.test.tsx
import { act, render, screen, within } from '@testing-library/react';

import {
    CoverAudiovisualModule
} from '../../../assets/js/settings/components/modules/CoverAudiovisualModule';
import { useSettingsStore } from '../../../assets/js/settings/stores/settings';

describe('CoverAudiovisualModule', () => {
  afterEach(() => {
    // reset store after every test
    useSettingsStore.setState((state) => {
      state.settings.cover.audiovisual = {
        title: '',
        url: '',
        desc: '',
      };
      return state;
    });
  });

  it('YouTube URL with additional query params still shows correct video embed preview', async () => {
    act(() => {
      useSettingsStore.getState().cover.updateAudiovisualField('url', 'https://www.youtube.com/watch?v=abc123&t=10s');
    });

    render(<CoverAudiovisualModule />);

    const preview = await screen.getByTestId('audiovisual-preview');
    expect(preview).toBeInTheDocument();
    const iframe = within(preview).getByTestId('video-embed-iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', expect.stringContaining('https://www.youtube.com/embed/abc123'));
  });

  it('Vimeo URL with extra path segments shows correct video embed preview', async () => {
    act(() => {
      useSettingsStore.getState().cover.updateAudiovisualField('url', 'https://vimeo.com/channels/staffpicks/12345678');
    });

    render(<CoverAudiovisualModule />);

    const preview = await screen.getByTestId('audiovisual-preview');
    expect(preview).toBeInTheDocument();
    const iframe = within(preview).getByTestId('video-embed-iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', expect.stringContaining('https://player.vimeo.com/video/12345678'));
  });

  it('URL with uppercase hostname shows video embed preview', async () => {
    act(() => {
      useSettingsStore.getState().cover.updateAudiovisualField('url', 'HTTPS://WWW.YOUTUBE.COM/watch?v=xyz789');
    });

    render(<CoverAudiovisualModule />);

    const preview = await screen.getByTestId('audiovisual-preview');
    expect(preview).toBeInTheDocument();
    const iframe = within(preview).getByTestId('video-embed-iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', expect.stringContaining('https://www.youtube.com/embed/xyz789'));
  });

  it('URL with trailing slash shows video embed preview', async () => {
    act(() => {
      useSettingsStore.getState().cover.updateAudiovisualField('url', 'https://vimeo.com/987654321/');
    });

    render(<CoverAudiovisualModule />);

    const preview = await screen.getByTestId('audiovisual-preview');
    expect(preview).toBeInTheDocument();
    const iframe = within(preview).getByTestId('video-embed-iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', expect.stringContaining('https://player.vimeo.com/video/987654321'));
  });

  it('Empty title or description still shows video embed preview', async () => {
    act(() => {
      useSettingsStore.getState().cover.updateAudiovisualField('url', 'https://www.youtube.com/watch?v=abc123');
      useSettingsStore.getState().cover.updateAudiovisualField('title', '');
      useSettingsStore.getState().cover.updateAudiovisualField('desc', '');
    });

    render(<CoverAudiovisualModule />);

    const preview = await screen.getByTestId('audiovisual-preview');
    expect(preview).toBeInTheDocument();

    const iframe = within(preview).getByTestId('video-embed-iframe');
    expect(iframe).toBeInTheDocument();

    // Assert title/desc aren’t required
    const title = within(preview).queryByRole('heading');
    expect(title).not.toBeInTheDocument();

    const desc = within(preview).queryByText(/abc123/i);
    expect(desc).not.toBeInTheDocument();
  });

  it('Whitespace-only URL hides preview section', async () => {
    act(() => {
      useSettingsStore.getState().cover.updateAudiovisualField(
        'url', '   '
      );
    });

    render(<CoverAudiovisualModule />);

    const preview = await screen.queryByTestId('audiovisual-preview');
    expect(preview).toBeNull();
  });
});
