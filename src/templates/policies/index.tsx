"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import {
  ShieldCheckIcon,
  CookieIcon,
  FileTextIcon,
  InfoIcon,
} from "lucide-react";

export function PoliciesPage() {
  const t = useTranslations("PoliciesPage");

  const privacySections = [0, 1, 2, 3, 4, 5];
  const cookieItems = [0, 1, 2, 3];
  const termSections = [0, 1, 2];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-linear-to-br from-emerald-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="space-y-12">
          {/* Privacy Policy */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="privacy"
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-emerald-100 p-3 rounded-2xl">
                <ShieldCheckIcon className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {t("privacy.title")}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {t("privacy.lastUpdate")}
                </p>
              </div>
            </div>

            <div className="prose prose-emerald max-w-none">
              <p className="text-gray-600 leading-relaxed mb-10 text-lg italic">
                {t("privacy.introduction")}
              </p>

              <div className="grid">
                {privacySections.map((index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {t(`privacy.sections.${index}.title`)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t(`privacy.sections.${index}.content`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Cookie Policy */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-100 p-3 rounded-2xl">
                <CookieIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                {t("cookies.title")}
              </h2>
            </div>

            <div className="space-y-8">
              <p className="text-gray-600 text-lg leading-relaxed">
                {t("cookies.whatAre")}
              </p>

              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <InfoIcon className="w-5 h-5 text-gray-400" />
                  {t("cookies.types.title")}
                </h3>
                <ul className="grid md:grid-cols-2 gap-4">
                  {cookieItems.map((index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                      <span>{t(`cookies.types.items.${index}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-gray-500 text-sm">{t("cookies.management")}</p>
            </div>
          </motion.section>

          {/* Terms of Use */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="terms"
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-amber-100 p-3 rounded-2xl">
                <FileTextIcon className="w-8 h-8 text-amber-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                {t("terms.title")}
              </h2>
            </div>

            <div className="grid gap-10">
              {termSections.map((index) => (
                <div key={index} className="flex gap-6">
                  <span className="text-4xl font-black text-amber-100 shrink-0 select-none">
                    0{index + 1}
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {t(`terms.sections.${index}.title`)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t(`terms.sections.${index}.content`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
