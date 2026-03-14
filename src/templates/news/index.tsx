"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryNews } from "@/modules/news/hooks/use-news";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Clock,
  ClockIcon,
  Filter,
  Newspaper,
  TagIcon,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { format } from "date-fns";
import { useQueryCategory } from "@/modules/categories/hooks/use-category";
import { useLocale, useTranslations } from "next-intl";
import { es, it, ptBR } from "date-fns/locale";

export function NewsPage() {
  const locale = useLocale();
  const t = useTranslations("NewsPage");
  const { news, isLoading } = useQueryNews();
  const { categories, isLoadingCategory } = useQueryCategory();
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  const filteredNews =
    selectedCategory === "all"
      ? news
      : news.filter((item) => item.categories?.slug === selectedCategory);

  const featuredNews =
    filteredNews.find((item) => item.featured) || filteredNews[0];
  const regularNews = filteredNews.filter(
    (item) => item.id !== featuredNews?.id,
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-20 bg-linear-to-br from-gray-900 to-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t("hero.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-6 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto">
            <Filter className="w-5 h-5 text-gray-400 shrink-0" />
            <Button
              variant={selectedCategory === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className={
                selectedCategory === "all"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : ""
              }
            >
              {t("filters.all")}
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.slug ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(cat.slug)}
                className={
                  selectedCategory === cat.slug
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : ""
                }
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-80 rounded-2xl" />
              ))}
            </div>
          ) : filteredNews.length > 0 ? (
            <>
              {/* Featured Article */}
              {featuredNews && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-12"
                >
                  <Link href={`/news/${featuredNews.slug}`}>
                    <div className="group grid md:grid-cols-2 gap-8 bg-gray-50 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow">
                      {featuredNews.coverImage && (
                        <div className="h-64 md:h-96 overflow-hidden">
                          <img
                            src={featuredNews.coverImage?.url || ""}
                            alt={featuredNews.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          {featuredNews.categories && (
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700`}
                            >
                              {featuredNews.categories.name}
                            </span>
                          )}
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {format(
                              new Date(
                                featuredNews.publishedAt?.toString() || "",
                              ),
                              "d 'de' MMMM, yyyy",
                              { locale: getLocale() },
                            )}
                          </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors">
                          {featuredNews.title}
                        </h2>
                        {featuredNews.excerpt && (
                          <p className="text-gray-600 mb-6 line-clamp-3">
                            {featuredNews.excerpt}
                          </p>
                        )}
                        <div className="flex items-center text-emerald-600 font-semibold group-hover:text-emerald-700">
                          {t("article.readMore")}
                          <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Regular Articles */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularNews.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={`/news/${item.slug}`}>
                      <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-gray-100">
                        {item.coverImage && (
                          <div className="h-48 overflow-hidden">
                            <img
                              src={item.coverImage?.url || ""}
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
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
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
            </>
          ) : (
            <div className="text-center py-20">
              <Newspaper className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {t("empty.title")}
              </h3>
              <p className="text-gray-600">{t("empty.description")}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
