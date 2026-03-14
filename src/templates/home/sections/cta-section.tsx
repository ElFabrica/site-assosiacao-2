"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  GlobeIcon,
  HeartHandshakeIcon,
  HeartIcon,
  NewspaperIcon,
  UsersIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function CTASection() {
  const t = useTranslations("HomePage.cta");
  return (
    <section className="py-20 bg-linear-to-br from-emerald-700 via-emerald-800 to-gray-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-400/10 rounded-full blur-3xl" />

      {/* Italian flag accent */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-green-500 via-white to-red-500" /> */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {t("title")}
            </h2>
            <p className="text-lg text-emerald-100 mb-8 leading-relaxed">
              {t("description")}
              de apoio comunitário.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={"/"}>
                <Button
                  size="lg"
                  className="bg-white text-emerald-700 hover:bg-gray-100 font-semibold text-lg px-8 py-6 shadow-xl group"
                >
                  {t("primaryAction")}
                  <ArrowRightIcon className="size-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href={"/"}>
                <Button
                  size="lg"
                  variant="outline"
                  className="hover:bg-white/10 font-semibold text-lg px-8 py-6"
                >
                  {t("secondaryAction")}
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <Link
              href={"/networking"}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <GlobeIcon className="w-10 h-10 text-emerald-300 mb-4" />

              <h3 className="text-xl font-bold text-white mb-2">
                {t("cards.community.title")}
              </h3>
              <p className="text-emerald-100 text-sm">
                {t("cards.community.description")}
              </p>
            </Link>
            <Link
              href={"/partners"}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mt-8"
            >
              <HeartHandshakeIcon className="w-10 h-10 text-red-300 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                {t("cards.support.title")}
              </h3>
              <p className="text-emerald-100 text-sm">
                {t("cards.support.description")}
              </p>
            </Link>

            <Link
              href={"/"}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <UsersIcon className="w-10 h-10 text-emerald-300 mb-4" />

              <h3 className="text-xl font-bold text-white mb-2">
                {t("cards.connections.title")}
              </h3>
              <p className="text-emerald-100 text-sm">
                {t("cards.connections.description")}
              </p>
            </Link>
            <Link
              href={"/join?origin=newsletter#form"}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <NewspaperIcon className="w-10 h-10 text-red-300 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                {t("cards.newsletter.title")}
              </h3>
              <p className="text-emerald-100 text-sm">
                {t("cards.newsletter.description")}
              </p>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
