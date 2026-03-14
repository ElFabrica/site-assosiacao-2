"use client";

import {
  ArrowRightIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  UsersIcon,
  PaletteIcon,
  ScaleIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function ServiceSection() {
  const t = useTranslations("HomePage.services");
  const services = [
    {
      icon: PaletteIcon,
      title: t("items.culture.title"),
      description: t("items.culture.description"),
      path: "/culture",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
    },
    {
      icon: GraduationCapIcon,
      title: t("items.education.title"),
      description: t("items.education.description"),
      path: "/courses",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      icon: UsersIcon,
      title: t("items.support.title"),
      description: t("items.support.description"),
      path: "/support",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
    },
    {
      icon: BriefcaseIcon,
      title: t("items.networking.title"),
      description: t("items.networking.description"),
      path: "/networking",
      gradient: "from-orange-500 to-amber-500",
      bgGradient: "from-orange-50 to-amber-50",
    },
    {
      icon: ScaleIcon,
      title: t("items.legal.title"),
      description: t("items.legal.description"),
      path: "/legal",
      gradient: "from-red-500 to-rose-500",
      bgGradient: "from-red-50 to-rose-50",
    },
  ];

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            {t("badge")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={service.path}>
                <div
                  className={`group bg-linear-to-br ${service.bgGradient} rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 border border-gray-100`}
                >
                  <div
                    className={`bg-linear-to-r ${service.gradient} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex items-center text-emerald-600 font-medium group-hover:text-emerald-700">
                    {t("readMore")}
                    <ArrowRightIcon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
