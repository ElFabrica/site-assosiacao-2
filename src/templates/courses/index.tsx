"use client";

import { motion } from "motion/react";
import {
  AwardIcon,
  BookOpenIcon,
  ClockIcon,
  GlobeIcon,
  GraduationCapIcon,
  HistoryIcon,
  MicIcon,
  UsersIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useQueryClasses } from "@/modules/classes/hooks/use-classes";
import { constructNow, format } from "date-fns";
import { useQueryCouses } from "@/modules/courses/hooks/use-courses";

export function CoursesPage() {
  const t = useTranslations("coursesPage");
  const { classes, isLoading } = useQueryClasses();
  const { courses, isLoading: isLoadingCourses } = useQueryCouses();

  console.log(courses.map((p) => p.features));

  const courseTypes = [
    {
      icon: BookOpenIcon,
      title: t("courseTypes.items.italiano.title"),
      description: t("courseTypes.items.italiano.description"),
      levels: [
        t("courseTypes.items.italiano.levels.0"),
        t("courseTypes.items.italiano.levels.1"),
        t("courseTypes.items.italiano.levels.2"),
      ],
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: GlobeIcon,
      title: t("courseTypes.items.viagem.title"),
      description: t("courseTypes.items.viagem.description"),
      features: [
        t("courseTypes.items.viagem.features.0"),
        t("courseTypes.items.viagem.features.1"),
        t("courseTypes.items.viagem.features.2"),
      ],
      color: "bg-emerald-500",
      bgColor: "bg-emerald-50",
      duration: "4 meses",
      schedule: "Segunda a Sexta, 19h-21h",
    },
    {
      icon: AwardIcon,
      title: t("courseTypes.items.certificacao.title"),
      description: t("courseTypes.items.certificacao.description"),
      features: [
        t("courseTypes.items.certificacao.features.0"),
        t("courseTypes.items.certificacao.features.1"),
        t("courseTypes.items.certificacao.features.2"),
      ],
      color: "bg-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      icon: HistoryIcon,
      title: t("courseTypes.items.historia.title"),
      description: t("courseTypes.items.historia.description"),
      features: [
        t("courseTypes.items.historia.features.0"),
        t("courseTypes.items.historia.features.1"),
        t("courseTypes.items.historia.features.2"),
      ],
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: MicIcon,
      title: t("courseTypes.items.palestras.title"),
      description: t("courseTypes.items.palestras.description"),
      features: [
        t("courseTypes.items.palestras.features.0"),
        t("courseTypes.items.palestras.features.1"),
        t("courseTypes.items.palestras.features.2"),
      ],
      color: "bg-pink-500",
      bgColor: "bg-pink-50",
    },
  ];

  const levelColors = {
    basico: "bg-green-100 text-green-700",
    intermediario: "bg-yellow-100 text-yellow-700",
    avancado: "bg-red-100 text-red-700",
    preparatorio: "bg-purple-100 text-purple-700",
  };

  const days = {
    1: "Domingo",
    2: "Segunda",
    3: "Terça",
    4: "Quarta",
    5: "Quinta",
    6: "Sexta",
    7: "Sábado",
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-14 bg-linear-to-br from-blue-800 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
        {/* <div className="absolute top-0 left-0 w-2 h-full bg-linear-to-b from-green-500 via-white to-red-500 opacity-80" /> */}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GraduationCapIcon className="w-16 h-16 text-blue-300 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {t("hero.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Course Types */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("courseTypes.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("courseTypes.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseTypes.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${course.bgColor} rounded-2xl p-8 hover:shadow-xl transition-all duration-300`}
              >
                <div
                  className={`${course.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}
                >
                  <course.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                {course.levels && (
                  <div className="flex flex-wrap gap-2">
                    {course.levels.map((level) => (
                      <span
                        key={level}
                        className="px-3 py-1 bg-white/80 rounded-full text-sm font-medium text-gray-700"
                      >
                        {level}
                      </span>
                    ))}
                  </div>
                )}
                {course.features && (
                  <ul className="space-y-1">
                    {course.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-sm text-gray-600 flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Courses */}
      {!isLoading && classes.length > 0 && (
        <section className="py-14 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t("availableCourses.title")}
              </h2>
              <p className="text-lg text-gray-600">
                {t("availableCourses.subtitle")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((course, index) => {
                const schecule = course.weekDays.sort(
                  (a, b) => Number(a) - Number(b),
                );
                const initialDay = days[schecule[0]];
                const finalDay = days[schecule[schecule.length - 1]];

                const startTime = format(new Date(course.startTime), "HH:mm");
                const endTime = format(new Date(course.endTime), "HH:mm");

                return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                  >
                    {course.image && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={course.image.url || ""}
                          alt={course.image.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        {course.level && (
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${levelColors[course.level as keyof typeof levelColors] || "bg-gray-100 text-gray-700"}`}
                          >
                            {course.level}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {course.name}
                      </h3>
                      {course.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {course.description}
                        </p>
                      )}
                      <div className="space-y-2 text-sm text-gray-600">
                        {course.duration && (
                          <div className="flex items-center gap-2">
                            <ClockIcon className="w-4 h-4 text-blue-600" />
                            <span>{course.duration}</span>
                          </div>
                        )}
                        {initialDay && finalDay && (
                          <div className="flex items-center gap-2">
                            <UsersIcon className="w-4 h-4 text-blue-600" />
                            <span>
                              {initialDay} a {finalDay}, {startTime}-{endTime}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-14 bg-linear-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t("cta.title")}
            </h2>
            <p className="text-xl text-blue-100 mb-8">{t("cta.description")}</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
