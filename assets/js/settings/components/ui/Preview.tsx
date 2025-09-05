// assets/js/settings/components/Preview.tsx
interface PreviewProps {
  className?: string;
  children: React.ReactNode;
};

export const Preview = ({ className = '', children }: PreviewProps) => (
  <div className={`rp-ecs-preview ${className}`}>{children}</div>
);
