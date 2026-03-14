"use client";

import { ArrowRightIcon, CalendarIcon, MapPinIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useQueryEvents } from "@/modules/events/hooks/use-event";
import { it, es, ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export function EventsPreview() {
  const language = useLocale();
  const t = useTranslations("HomePage.eventsPreview");
  const { events, isLoading } = useQueryEvents(3);
  const getLocale = () => {
    switch (language) {
      case "it":
        return it;
      case "es":
        return es;
      default:
        return ptBR;
    }
  };

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            {isLoading ? (
              <Skeleton className="h-8 w-24 mb-4 rounded-full" />
            ) : (
              <span className="inline-block bg-red-100 text-red-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                {t("badge")}
              </span>
            )}
            {isLoading ? (
              <Skeleton className="h-10 w-64" />
            ) : (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {t("title")}
              </h2>
            )}
          </div>
          {!isLoading && (
            <Link
              href={"/culture#events"}
              className="flex items-center text-emerald-600 font-semibold hover:text-emerald-700"
            >
              {t("seeAll")}
              <ArrowRightIcon className="ml-2 size-5" />
            </Link>
          )}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <EventCardSkeleton key={i} />
              ))
            : events?.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group"
                >
                  <Link href={`/events/${event.slug}`}>
                    {event.coverImage && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={event.coverImage.url || ""}
                          alt={event.coverImage.alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {event.categories && (
                          <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                            {event.categories.name}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                        {event.name}
                      </h3>
                      {event.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {event.description}
                        </p>
                      )}
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-emerald-600" />
                          <span>
                            {event.eventDate &&
                              format(
                                new Date(event.eventDate),
                                "d 'de' MMMM, yyyy - HH:mm",
                                { locale: getLocale() },
                              )}
                          </span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2">
                            <MapPinIcon className="w-4 h-4 text-emerald-600" />
                            <span>{event.location}</span>
                          </div>
                        )}
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

function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  );
}
