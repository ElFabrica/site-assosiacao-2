import { prefetchEvent } from "@/modules/events/server/prefetch";
import { EventDetail } from "@/templates/event-detail";
import { caller, HydrateClient } from "@/trpc/server";
import { Metadata } from "next";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface EventDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: EventDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const eventDetail = await caller.events.getOne({
    slug: decodedSlug,
  });

  const event = eventDetail.docs[0];

  if (!event) {
    return {
      title: "Evento não encontrado",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001";
  const url = `${baseUrl}/events/${slug}`;

  return {
    title: event.name ?? undefined,
    description: event.description ?? undefined,
    alternates: {
      canonical: url,
    },
    robots: "index, follow",
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: event.name ?? undefined,
      description: event.description ?? undefined,
      url,
      siteName: "Associação",
      locale: "pt_BR",
      type: "website",
      images: [
        {
          url: event.coverImage?.url || "",
          width: 1200,
          height: 630,
          alt: event.name ?? "",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: event.name ?? undefined,
      description: event.description ?? undefined,
      images: event.coverImage?.url ? [event.coverImage.url] : [],
    },
  };
}

export default async function Event({ params }: EventDetailProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const eventDetail = await caller.events.getOne({
    slug: decodedSlug,
  });

  const event = eventDetail.docs[0];

  const jsonLd = event
    ? {
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.name,
        description: event.description,
        image: event.coverImage?.url ? [event.coverImage.url] : [],
        startDate: event.eventDate,
        endDate: event.eventEndDate,
        location: {
          "@type": "Place",
          name: event.location,
          address: event.location,
        },
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
      }
    : null;

  prefetchEvent({ slug: decodedSlug });

  return (
    <HydrateClient>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ErrorBoundary fallback={<div>Erro ao carregar evento</div>}>
        <Suspense fallback={<div>Carregando...</div>}>
          <EventDetail slug={decodedSlug} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
