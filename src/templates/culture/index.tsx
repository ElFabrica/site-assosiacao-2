"use client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CalendarIcon,
  ChefHatIcon,
  FilmIcon,
  HistoryIcon,
  MapPinIcon,
  MusicIcon,
  PartyPopperIcon,
  UsersIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useQueryEvents } from "@/modules/events/hooks/use-event";
import { it, es, ptBR } from "date-fns/locale";
import { format } from "date-fns";
import Link from "next/link";

export function CulturePage() {
  const language = useLocale();
  const t = useTranslations("culturePage");
  const { events, isLoading } = useQueryEvents(100);

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

  const categories = [
    {
      icon: PartyPopperIcon,
      title: t("activities.categories.festas.title"),
      description: t("activities.categories.festas.description"),
      color: "bg-purple-500",
    },
    {
      icon: FilmIcon,
      title: t("activities.categories.cinema.title"),
      description: t("activities.categories.cinema.description"),
      color: "bg-blue-500",
    },
    {
      icon: ChefHatIcon,
      title: t("activities.categories.gastronomia.title"),
      description: t("activities.categories.gastronomia.description"),
      color: "bg-orange-500",
    },
    {
      icon: MusicIcon,
      title: t("activities.categories.musica.title"),
      description: t("activities.categories.musica.description"),
      color: "bg-pink-500",
    },
    {
      icon: UsersIcon,
      title: t("activities.categories.tradicoes.title"),
      description: t("activities.categories.tradicoes.description"),
      color: "bg-emerald-500",
    },
    {
      icon: HistoryIcon,
      title: t("activities.categories.historia.title"),
      description: t("activities.categories.historia.description"),
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-20 bg-linear-to-br from-purple-800 to-purple-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=1920&q=80')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
        {/* <div className="absolute top-0 left-0 w-2 h-full bg-linear-to-b from-green-500 via-white to-red-500 opacity-80" /> */}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              {t("hero.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events */}
      <section className="py-14 bg-gray-50" id="events">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("events.title")}
            </h2>
            <p className="text-lg text-gray-600">{t("events.subtitle")}</p>
          </motion.div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-80 rounded-2xl" />
              ))}
            </div>
          ) : events.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                >
                  <Link href={`/events/${event.slug}`}>
                    {event.coverImage && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={event.coverImage.url || ""}
                          alt={event.coverImage.alt}
                          className="w-full h-full object-cover"
                        />
                        {event.categories && (
                          <span
                            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700`}
                          >
                            {event.categories.name}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
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
          ) : (
            <div className="text-center py-14 bg-white rounded-2xl">
              <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t("events.empty.title")}
              </h3>
              <p className="text-gray-600">{t("events.empty.description")}</p>
            </div>
          )}
        </div>
      </section>

      {/* Cultural Areas */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("activities.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("activities.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`${cat.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}
                >
                  <cat.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {cat.title}
                </h3>
                <p className="text-gray-600">{cat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
