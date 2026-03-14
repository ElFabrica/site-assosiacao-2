"use client";

import { RichText } from "@/components/payload/components/rich-text";
import { Button } from "@/components/ui/button";
import { getYouTubeEmbedUrl } from "@/lib/video";
import { useQueryEvent } from "@/modules/events/hooks/use-event";
import { format } from "date-fns";
import { es, it, ptBR } from "date-fns/locale";
import { ArrowLeftIcon, CalendarIcon, MapPinIcon, TagIcon } from "lucide-react";
import { motion } from "motion/react";

import { useLocale } from "next-intl";
import Link from "next/link";
import { useQueryState } from "nuqs";

export function EventDetail({ slug }: { slug: string }) {
  const locale = useLocale();
  const { event, isLoading, error } = useQueryEvent(slug);
  const [_, setEventQuery] = useQueryState("event");

  const eventUrl = `${process.env.NEXT_PUBLIC_APP_URL}/events/${slug}`;

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

  const embedUrl = event?.videoLink
    ? getYouTubeEmbedUrl(event.videoLink)
    : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Header Image */}
      {event?.coverImage && (
        <div className="relative h-[50vh] overflow-hidden">
          {embedUrl ? (
            <iframe
              style={{ width: "100%", height: "100%" }}
              src={embedUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              loading="lazy"
              allowFullScreen
            ></iframe>
          ) : (
            <>
              <img
                src={event.coverImage.url || ""}
                alt={event.coverImage.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            </>
          )}
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Back Button */}
          <Link href="/culture">
            <Button variant="ghost" className="mb-8 cursor-pointer">
              <ArrowLeftIcon className="size-4" />
              Voltar
            </Button>
          </Link>

          {/* Category */}
          {event?.categories && (
            <div className="mb-6">
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-semibold bg-gray-100 text-gray-700`}
              >
                <TagIcon className="size-4 inline mr-1" />
                {event.categories.name}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            {event?.name}
          </h1>

          {/* Excerpt */}
          {event?.description && (
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {event?.description}
            </p>
          )}

          {/* Content */}
          <div>{event?.content && <RichText data={event.content} />}</div>

          {/* Event Info Cards */}
          <div className="grid md:grid-cols-2 gap-4 my-8">
            {/* Date & Time */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                  <CalendarIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Data e Horário
                  </h3>
                  <p className="text-gray-600">
                    {event?.eventDate &&
                      format(
                        new Date(event.eventDate),
                        "EEEE, d 'de' MMMM 'de' yyyy",
                        { locale: getLocale() },
                      )}
                  </p>
                  <p className="text-emerald-700 font-semibold">
                    {event?.eventEndDate &&
                      format(new Date(event.eventEndDate), "HH:mm", {
                        locale: getLocale(),
                      })}
                  </p>
                </div>
              </div>
            </div>

            {/* Location */}
            {event?.location && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                    <MapPinIcon className="size-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Local</h3>
                    <p className="text-gray-600">{event.location}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-linear-to-br from-emerald-50 to-blue-50 rounded-2xl border border-emerald-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Interessado em participar?
            </h3>
            <p className="text-gray-600 mb-6">
              Entre em contato conosco para mais informações sobre este evento e
              confirme sua presença.
            </p>
            <Link href={`/join?event=${event?.slug}&origin=event#form`}>
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
              >
                Entre em Contato
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
