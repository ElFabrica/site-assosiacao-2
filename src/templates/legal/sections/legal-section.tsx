"use client";

import {
  AlertCircleIcon,
  BookOpenIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  FileCheckIcon,
  PlaneIcon,
  ScaleIcon,
  UsersIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export function LegalSection() {
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
      icon: BriefcaseIcon,
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
    <>
      {/* Disclaimer */}
      <section className="py-8 bg-amber-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <AlertCircleIcon className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800 mb-1">
                {t("disclaimer.title")}
              </h3>
              <p className="text-amber-700 text-sm">{t("disclaimer.text")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("topics.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("topics.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {topics.map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${topic.bgColor} rounded-3xl p-8`}
              >
                <div
                  className={`${topic.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}
                >
                  <topic.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {topic.title}
                </h3>
                <p className="text-gray-600 mb-6">{topic.description}</p>
                <ul className="space-y-3">
                  {topic.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <CheckCircleIcon className="w-5 h-5 text-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lectures */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <BookOpenIcon className="w-16 h-16 text-red-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("lectures.title")}
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {t("lectures.description")}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
