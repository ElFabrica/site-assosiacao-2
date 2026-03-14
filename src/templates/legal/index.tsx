"use client";

import {
  AlertCircleIcon,
  BookOpenIcon,
  CheckCircleIcon,
  FileCheckIcon,
  PlaneIcon,
  ScaleIcon,
  UsersIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { LegalSection } from "./sections";

export function LegalPage() {
  const t = useTranslations("LegalPage");

  const topics = [
    {
      icon: FileCheckIcon,
      title: t("topics.categories.citizenship.title"),
      description: t("topics.categories.citizenship.description"),
      items: [
        t("topics.categories.citizenship.items.0"),
        t("topics.categories.citizenship.items.1"),
        t("topics.categories.citizenship.items.2"),
        t("topics.categories.citizenship.items.3"),
        t("topics.categories.citizenship.items.4"),
      ],
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: PlaneIcon,
      title: t("topics.categories.immigration.title"),
      description: t("topics.categories.immigration.description"),
      items: [
        t("topics.categories.immigration.items.0"),
        t("topics.categories.immigration.items.1"),
        t("topics.categories.immigration.items.2"),
        t("topics.categories.immigration.items.3"),
      ],
      color: "bg-emerald-500",
      bgColor: "bg-emerald-50",
    },
    {
      icon: ScaleIcon,
      title: t("topics.categories.law.title"),
      description: t("topics.categories.law.description"),
      items: [
        t("topics.categories.law.items.0"),
        t("topics.categories.law.items.1"),
        t("topics.categories.law.items.2"),
        t("topics.categories.law.items.3"),
      ],
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: UsersIcon,
      title: t("topics.categories.family.title"),
      description: t("topics.categories.family.description"),
      items: [
        t("topics.categories.family.items.0"),
        t("topics.categories.family.items.1"),
        t("topics.categories.family.items.2"),
        t("topics.categories.family.items.3"),
      ],
      color: "bg-pink-500",
      bgColor: "bg-pink-50",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-20 bg-linear-to-br from-red-800 to-red-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80')`,
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
            <ScaleIcon className="w-16 h-16 text-red-300 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              {t("hero.description")}
            </p>
          </motion.div>
        </div>
      </section>

      <LegalSection />
    </div>
  );
}
