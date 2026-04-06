import { prefetchNew } from "@/modules/news/server/prefetch";
import { NewsDetailPage } from "@/templates/new-detail";
import { caller, HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { Metadata } from "next";
import { ErrorBoundary } from "react-error-boundary";

interface NewsDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const newDetail = await caller.news.getOne({
    slug: decodedSlug,
    locale: "pt",
  });

  const article = newDetail.docs[0];

  if (!article) {
    return {
      title: "Notícia não encontrada",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001";
  const url = `${baseUrl}/news/${slug}`;

  return {
    title: article.title ?? undefined,
    description: article.excerpt ?? undefined,
    alternates: {
      canonical: url,
    },
    robots: "index, follow",
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: article.title ?? undefined,
      description: article.excerpt ?? undefined,
      url,
      siteName: "Associação",
      locale: "pt_BR",
      type: "article",
      images: [
        {
          url: article.coverImage?.url || "",
          width: 1200,
          height: 630,
          alt: article.title ?? "",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title ?? undefined,
      description: article.excerpt ?? undefined,
      images: article.coverImage?.url ? [article.coverImage.url] : [],
    },
  };
}

export default async function NewsDetail({ params }: NewsDetailProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const newDetail = await caller.news.getOne({
    slug: decodedSlug,
    locale: "pt",
  });

  const article = newDetail.docs[0];

  const jsonLd = article
    ? {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: article.title,
        description: article.excerpt,
        image: [article.coverImage?.url || ""],
        datePublished: article.publishedAt,
        author: article.author?.name
          ? {
              "@type": "Person",
              name: article.author.name,
            }
          : undefined,
      }
    : null;

  prefetchNew({ slug: decodedSlug });

  return (
    <HydrateClient>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ErrorBoundary fallback={<div>Erro ao carregar notícia</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <NewsDetailPage slug={decodedSlug} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
