"use client";

import { ScaleIcon } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { LegalSection } from "./sections";

export function LegalPage() {
  const t = useTranslations("LegalPage");

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

      {/* <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <WrenchIcon />
          </EmptyMedia>
          <EmptyTitle>Esta página está em desenvolvimento</EmptyTitle>
          <EmptyDescription>
            Desfrute de mais informações navegando em outra páginas
          </EmptyDescription>
        </EmptyHeader>
      </Empty> */}

      <LegalSection />
    </div>
  );
}
