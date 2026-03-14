"use client";

import { useQueryNews } from "@/modules/news/hooks/use-news";
import { format } from "date-fns";
import { ptBR, it, es } from "date-fns/locale";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";

export function NewsPreview() {
  const locale = useLocale();
  const { news, isLoading } = useQueryNews();
  const t = useTranslations("HomePage.newsPreview");

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

  const featuredNews = news.filter((item) => item.featured)[0];
  const regularNews = news.filter((item) => !item.featured).slice(0, 3);

  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4"
        >
          <div className="flex-1">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-12 w-64 md:w-96" />
                <Skeleton className="h-6 w-full max-w-lg" />
              </div>
            ) : (
              <>
                <span className="inline-block bg-red-100 text-red-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                  {t("badge")}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  {t("title")}
                </h2>
                <p className="text-lg text-gray-600 mt-3">{t("description")}</p>
              </>
            )}
          </div>
          {!isLoading && (
            <Link
              href={"/news"}
              className="flex items-center text-emerald-600 font-semibold hover:text-emerald-700 text-lg"
            >
              {t("seeAll")}
              <ArrowRightIcon className="ml-2 size-5" />
            </Link>
          )}
        </motion.div>

        {/* Featured Article */}
        {isLoading ? (
          <FeaturedNewsSkeleton />
        ) : (
          featuredNews && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Link href={`/news/${featuredNews.slug}`}>
                <div className="group grid md:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  {featuredNews.coverImage && (
                    <div className="h-80 md:h-[500px] overflow-hidden">
                      <img
                        src={featuredNews.coverImage.url || ""}
                        alt={featuredNews.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                      {featuredNews.categories && (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700`}
                        >
                          {featuredNews.categories.name}
                        </span>
                      )}
                      <ClockIcon className="w-4 h-4" />
                      <span>
                        {format(
                          new Date(featuredNews.publishedAt?.toString() || ""),
                          "d 'de' MMMM, yyyy",
                          { locale: getLocale() },
                        )}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 group-hover:text-emerald-700 transition-colors leading-tight">
                      {featuredNews.title}
                    </h3>
                    {featuredNews.excerpt && (
                      <p className="text-lg text-gray-600 mb-8 leading-relaxed line-clamp-4">
                        {featuredNews.excerpt}
                      </p>
                    )}
                    <div className="flex items-center text-emerald-600 font-semibold text-lg">
                      {t("readMore")}
                      <ArrowRightIcon className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <NewsCardSkeleton key={i} />
              ))
            : regularNews.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/news/${item.slug}`}>
                    <div className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full border border-gray-100">
                      {item.coverImage && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={item.coverImage.url || ""}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          {item.categories && (
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700`}
                            >
                              {item.categories.name}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                          {item.title}
                        </h3>
                        {item.excerpt && (
                          <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                            {item.excerpt}
                          </p>
                        )}
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <ClockIcon className="w-3 h-3" />
                          {format(
                            new Date(item.publishedAt?.toString() || ""),
                            "d 'de' MMMM, yyyy",
                            { locale: getLocale() },
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedNewsSkeleton() {
  return (
    <div className="mb-12 bg-white rounded-3xl overflow-hidden shadow-lg grid md:grid-cols-2 gap-8">
      <Skeleton className="h-80 md:h-[500px] w-full rounded-none" />
      <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
        <Skeleton className="h-4 w-32" />
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-3/4" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <Skeleton className="h-6 w-40" />
      </div>
    </div>
  );
}

function NewsCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-3 w-24" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/3" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
}
