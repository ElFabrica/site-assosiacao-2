"use client";

import {
  BookOpenIcon,
  GlobeIcon,
  HeartIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { FormSection } from "./sections/form-section";
import { useTranslations } from "next-intl";

export function JoinPage() {
  const t = useTranslations("JoinPage");

  const benefits = [
    {
      icon: UsersIcon,
      title: t("benefits.community.title"),
      description: t("benefits.community.description"),
    },
    {
      icon: BookOpenIcon,
      title: t("benefits.education.title"),
      description: t("benefits.education.description"),
    },
    {
      icon: HeartIcon,
      title: t("benefits.support.title"),
      description: t("benefits.support.description"),
    },
    {
      icon: GlobeIcon,
      title: t("benefits.networking.title"),
      description: t("benefits.networking.description"),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-20 bg-linear-to-br from-red-700 via-red-800 to-emerald-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1920&q=80')`,
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
            <UserPlusIcon className="w-16 h-16 text-white/80 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              {t("hero.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <benefit.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <FormSection />
    </div>
  );
}
