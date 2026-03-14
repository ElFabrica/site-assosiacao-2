"use client";

import { EyeIcon, HeartIcon, TargetIcon } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export function MissionSection() {
  const t = useTranslations("HomePage.mission");

  const items = [
    {
      icon: TargetIcon,
      title: t("items.mission.title"),
      description: t("items.mission.description"),
      color: "emerald",
    },
    {
      icon: EyeIcon,
      title: t("items.vision.title"),
      description: t("items.vision.description"),
      color: "blue",
    },
    {
      icon: HeartIcon,
      title: t("items.values.title"),
      description: t("items.values.description"),
      color: "red",
    },
  ];

  const colorClasses = {
    emerald: {
      bg: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      icon: "text-emerald-600",
      border: "border-emerald-100",
    },
    blue: {
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      icon: "text-blue-600",
      border: "border-blue-100",
    },
    red: {
      bg: "bg-red-50",
      iconBg: "bg-red-100",
      icon: "text-red-600",
      border: "border-red-100",
    },
  };

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, index) => {
            const colors =
              colorClasses[item.color as keyof typeof colorClasses];
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`${colors.bg} rounded-3xl p-8 border ${colors.border} hover:shadow-xl transition-shadow duration-300`}
              >
                <div
                  className={`${colors.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}
                >
                  <Icon className={`w-8 h-8 ${colors.icon}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
