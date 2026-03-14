"use client";

import { RichText } from "@/components/payload/components/rich-text";
import { Button } from "@/components/ui/button";
import { useQueryNew } from "@/modules/news/hooks/use-news";
import { Author, Media } from "@/payload-types";
import { format } from "date-fns";
import { ArrowLeftIcon, ClockIcon, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useLocale } from "next-intl";
import { es, it, ptBR } from "date-fns/locale";
import Link from "next/link";
import { PostShare } from "./post-share";

export function NewsDetailPage({ slug }: { slug: string }) {
  const locale = useLocale();
  const { news, isLoading, error } = useQueryNew(slug);

  const authorImage = news?.author?.image as Media | null;

  const newUrl = `${process.env.NEXT_PUBLIC_APP_URL}/news/${slug}`;

  const getLocale = () => {
    switch (locale) {
      case "it":
        return it;
      case "es":
        return es;
      default:
        return ptBR;
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header Image Skeleton */}
        <div className="relative h-[50vh] overflow-hidden bg-gray-200 animate-pulse" />

        {/* Content Skeleton */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Back Button Skeleton */}
            <div className="h-10 bg-gray-200 rounded animate-pulse w-24" />

            {/* Meta Skeleton */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="h-8 bg-gray-200 rounded-full animate-pulse w-32" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-40" />
            </div>

            {/* Title Skeleton */}
            <div className="space-y-3">
              <div className="h-10 bg-gray-200 rounded animate-pulse w-full" />
              <div className="h-10 bg-gray-200 rounded animate-pulse w-3/4" />
            </div>

            {/* Excerpt Skeleton */}
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-full" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-5/6" />
            </div>

            {/* Content Skeleton */}
            <div className="space-y-3 pt-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Image */}
      {news?.coverImage && (
        <div className="relative h-[50vh] overflow-hidden">
          <img
            src={news.coverImage.url || ""}
            alt={news.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Back Button */}

          <Button variant="ghost" className="mb-8" asChild>
            <Link href={"/news"}>
              <ArrowLeftIcon className="mr-2 w-4 h-4" />
              Voltar
            </Link>
          </Button>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {news?.categories && (
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-semibold bg-gray-100 text-gray-700`}
              >
                <Tag className="w-4 h-4 inline mr-1" />
                {news.categories.name}
              </span>
            )}
            <span className="text-gray-500 flex items-center gap-2">
              <ClockIcon className="w-4 h-4" />
              {news?.publishedAt &&
                format(
                  new Date(news.publishedAt?.toString() || ""),
                  "d 'de' MMMM, yyyy",
                  { locale: getLocale() },
                )}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {news?.title}
          </h1>

          {/* Excerpt */}
          {news?.excerpt && (
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {news?.excerpt}
            </p>
          )}

          {/* Content */}
          <div>{news?.content && <RichText data={news.content} />}</div>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {news?.author && (
          <>
            <div className="flex items-center gap-4">
              {authorImage && (
                <div className="size-12 rounded-full overflow-hidden">
                  <img
                    src={authorImage.url || ""}
                    alt={authorImage.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-semibold">{news?.author?.name}</span>
                <span className="text-muted-foreground text-sm">
                  {news?.author?.position}
                </span>
              </div>
            </div>
          </>
        )}

        <PostShare
          url={newUrl}
          title={news?.title || ""}
          description={news?.excerpt || ""}
        />
      </div>
    </div>
  );
}
