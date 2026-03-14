"use client";

import {
  BriefcaseIcon,
  Building2Icon,
  GlobeIcon,
  GraduationCapIcon,
  HandshakeIcon,
  PlaneIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export function NetworkingPage() {
  const t = useTranslations("NetworkingPage");

  const services = [
    {
      icon: UsersIcon,
      title: t("business.services.networking.title"),
      description: t("business.services.networking.description"),
      color: "bg-amber-500",
    },
    {
      icon: GlobeIcon,
      title: t("business.services.import.title"),
      description: t("business.services.import.description"),
      color: "bg-blue-500",
    },
    {
      icon: Building2Icon,
      title: t("business.services.corporate.title"),
      description: t("business.services.corporate.description"),
      color: "bg-emerald-500",
    },
    {
      icon: HandshakeIcon,
      title: t("business.services.partnerships.title"),
      description: t("business.services.partnerships.description"),
      color: "bg-purple-500",
    },
  ];

  const academicServices = [
    {
      icon: GraduationCapIcon,
      title: t("academic.services.study.title"),
      description: t("academic.services.study.description"),
      items: [
        t("academic.services.study.items.0"),
        t("academic.services.study.items.1"),
        t("academic.services.study.items.2"),
      ],
    },
    {
      icon: TrendingUpIcon,
      title: t("academic.services.diploma.title"),
      description: t("academic.services.diploma.description"),
      items: [
        t("academic.services.diploma.items.0"),
        t("academic.services.diploma.items.1"),
        t("academic.services.diploma.items.2"),
      ],
    },
    {
      icon: PlaneIcon,
      title: t("academic.services.partnerships.title"),
      description: t("academic.services.partnerships.description"),
      items: [
        t("academic.services.partnerships.items.0"),
        t("academic.services.partnerships.items.1"),
        t("academic.services.partnerships.items.2"),
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-20 bg-linear-to-br from-amber-700 to-amber-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1920&q=80')`,
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
            <BriefcaseIcon className="w-16 h-16 text-amber-300 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto">
              {t("hero.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Business Services */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("business.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("business.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`${service.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Partnerships */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("academic.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("academic.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {academicServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <service.icon className="w-12 h-12 text-amber-600 mb-6" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
