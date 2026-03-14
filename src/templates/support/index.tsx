"use client";
import {
  BriefcaseIcon,
  FileTextIcon,
  GlobeIcon,
  HeartHandshakeIcon,
  HomeIcon,
  MapPinIcon,
  UsersIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export function SupportPage() {
  const t = useTranslations("SupportPage");

  const services = [
    {
      icon: HomeIcon,
      title: t("services.newcomers.title"),
      description: t("services.newcomers.description"),
      items: [
        t("services.newcomers.items.0"),
        t("services.newcomers.items.1"),
        t("services.newcomers.items.2"),
      ],
      color: "bg-emerald-500",
    },
    {
      icon: FileTextIcon,
      title: t("services.consular.title"),
      description: t("services.consular.description"),
      items: [
        t("services.consular.items.0"),
        t("services.consular.items.1"),
        t("services.consular.items.2"),
        t("services.consular.items.3"),
      ],
      color: "bg-blue-500",
    },
    {
      icon: UsersIcon,
      title: t("services.integration.title"),
      description: t("services.integration.description"),
      items: [
        t("services.integration.items.0"),
        t("services.integration.items.1"),
        t("services.integration.items.2"),
      ],
      color: "bg-purple-500",
    },
    {
      icon: BriefcaseIcon,
      title: t("services.networking.title"),
      description: t("services.networking.description"),
      items: [
        t("services.networking.items.0"),
        t("services.networking.items.1"),
        t("services.networking.items.2"),
        t("services.networking.items.3"),
      ],
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-20 bg-linear-to-br from-emerald-800 to-emerald-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1920&q=80')`,
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
            <HeartHandshakeIcon className="w-16 h-16 text-emerald-300 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              {t("hero.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("contact.title")}
            </h2>
            <p className="text-lg text-gray-600">{t("contact.subtitle")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-sm"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-4">
                  {t("contact.headquarters")}
                </h3>
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-start gap-3">
                    <MapPinIcon className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      {t("contact.address")
                        .split("\n")
                        .map((line, i) => (
                          <span key={i}>
                            {line}
                            {i === 0 && <br />}
                          </span>
                        ))}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4">
                  {t("contact.social")}
                </h3>
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-center gap-3">
                    <GlobeIcon className="w-5 h-5 text-emerald-600" />
                    <span>@aicibanitaegiusepegaribaldi (Facebook)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <GlobeIcon className="w-5 h-5 text-emerald-600" />
                    <span>@associacaoanita (Instagram)</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
