"use client";

import {
  EyeIcon,
  HeartIcon,
  LeafIcon,
  ScaleIcon,
  ShieldIcon,
  SparklesIcon,
  TargetIcon,
  UsersIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const LOGO_URL =
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68e0322715c4b09646bb5f4e/59dc25d0e_LogomarcaAssociacaojpg.jpg";

const PRESIDENT_IMAGE_URL = "/antonio_pedro_lovato.jpeg";

export function AboutPage() {
  const t = useTranslations("AboutPage");
  const values = [
    {
      icon: ShieldIcon,
      title: t("values.items.0.title"),
      description: t("values.items.0.description"),
    },
    {
      icon: HeartIcon,
      title: t("values.items.1.title"),
      description: t("values.items.1.description"),
    },
    {
      icon: UsersIcon,
      title: t("values.items.2.title"),
      description: t("values.items.2.description"),
    },
    {
      icon: SparklesIcon,
      title: t("values.items.3.title"),
      description: t("values.items.3.description"),
    },
    {
      icon: EyeIcon,
      title: t("values.items.4.title"),
      description: t("values.items.4.description"),
    },
    {
      icon: TargetIcon,
      title: t("values.items.5.title"),
      description: t("values.items.5.description"),
    },
    {
      icon: ScaleIcon,
      title: t("values.items.6.title"),
      description: t("values.items.6.description"),
    },
    {
      icon: LeafIcon,
      title: t("values.items.7.title"),
      description: t("values.items.7.description"),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 bg-linear-to-br from-emerald-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1529260830199-42c24126f198?w=1920&q=80')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
        {/* <div className="absolute top-0 left-0 w-2 h-full bg-linear-to-b from-green-500 via-white to-red-500 opacity-80" /> */}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              {t("hero.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Institutional Info */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={LOGO_URL}
                alt="Associação Anita e Giuseppe Garibaldi"
                className="w-full max-w-md mx-auto"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t("institution.title")}
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {t("institution.paragraphs.0")}{" "}
                  <strong>{t("institution.paragraphs.1")}</strong>{" "}
                  {t("institution.paragraphs.2")}
                </p>
                <p>{t("institution.paragraphs.3")}</p>
                <p>{t("institution.paragraphs.4")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* President Section */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t("president.title")}
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong>{t("president.paragraphs.0")}</strong>
                  {t("president.paragraphs.1")}
                </p>
                <p>{t("president.paragraphs.2")}</p>
                <p>{t("president.paragraphs.3")}</p>
                <p>{t("president.paragraphs.4")}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={PRESIDENT_IMAGE_URL}
                alt="Associação Anita e Giuseppe Garibaldi"
                className="w-full max-w-md mx-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-10 shadow-sm"
            >
              <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <TargetIcon className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t("mission.title")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("mission.text")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-10 shadow-sm"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <EyeIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t("vision.title")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("vision.text")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("values.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("values.subtitle")}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <value.icon className="w-8 h-8 text-emerald-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History of Garibaldi */}
      <section className="py-14 bg-linear-to-br from-gray-900 to-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("garibaldi.title")}
            </h2>
            <p className="text-emerald-300 text-lg">
              {t("garibaldi.subtitle")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-bold mb-4">
                  {t("garibaldi.giuseppe.title")}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t("garibaldi.giuseppe.text")}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-bold mb-4">
                  {t("garibaldi.anita.title")}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t("garibaldi.anita.text")}
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-lg text-emerald-200 italic max-w-3xl mx-auto">
              "{t("garibaldi.quote")}"
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
