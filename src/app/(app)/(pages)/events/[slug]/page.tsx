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
    return {};
  }

  console.log("Event", event);

  return {
    title: event.name,
    description: event.description,
    robots: "index, follow",
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001",
    ),
    openGraph: {
      images: [event.coverImage?.url || ""],
    },
  };
}

export default async function Event({ params }: EventDetailProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  prefetchEvent({ slug: decodedSlug });

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Erro ao carregar evento</div>}>
        <Suspense fallback={<div>Carregando...</div>}>
          <EventDetail slug={decodedSlug} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
