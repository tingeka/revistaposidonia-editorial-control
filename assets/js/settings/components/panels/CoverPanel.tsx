// assets/js/settings/components/CoverSettings.tsx
import { CoverArticlesModule } from '../modules/CoverArticlesModule';
import { CoverAudiovisualModule } from '../modules/CoverAudiovisualModule';

export const CoverPanel = () => {
  return (
    <div className="rp-ecs-cover-settings">
      <CoverArticlesModule />
      <hr />
      <CoverAudiovisualModule />
    </div>
  );
};
