// assets/js/settings/components/Section.tsx
interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Section = ({ title, children, className = '' }: SectionProps) => (
  <section className={`rp-ecs-section ${className}`}>
    <h2 className="rp-ecs-section__title">{title}</h2>
    <div className="rp-ecs-section__content">
      {children}
    </div>
  </section>
);