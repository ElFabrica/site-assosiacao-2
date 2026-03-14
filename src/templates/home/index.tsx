import {
  EventsPreview,
  HeroSection,
  MissionSection,
  NewsPreview,
  ServiceSection,
  CTASection,
} from "./sections";

export function HomePage() {
  return (
    <article>
      <HeroSection />
      <NewsPreview />
      <EventsPreview />
      <MissionSection />
      <ServiceSection />
      <CTASection />
    </article>
  );
}
