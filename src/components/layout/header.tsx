"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronDownIcon, GlobeIcon, MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { setCurrentLocale } from "@/i18n/get-locale";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";

// const LOGO_URL =
//   "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68e0322715c4b09646bb5f4e/59dc25d0e_LogomarcaAssociacaojpg.jpg";
const LOGO_URL = "/favicon.png";

const navItems = [
  { label: "Início", path: "/", flag: "home" },
  { label: "Sobre", path: "/about", flag: "about" },
  { label: "Cultura", path: "/culture", flag: "culture" },
  { label: "Cursos", path: "/courses", flag: "courses" },
  // { label: "Apoio", path: "/support", flag: "support" },
  { label: "Networking", path: "/networking", flag: "networking" },
  { label: "Parceiros", path: "/partners", flag: "partners" },
  { label: "Assistência", path: "/assistance", flag: "assistance" },
  { label: "Notícias", path: "/news", flag: "news" },
];

const languages = [
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

export function Header() {
  const local = useLocale();
  const t = useTranslations("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const currentLang = languages.find((lang) => lang.code === local);

  const handleLanguageChange = (locale: string) => {
    setCurrentLocale(locale);
    setMobileMenuOpen(false);
    setPopoverOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}

          <Link href="/" className="flex items-center gap-2">
            <img
              src={LOGO_URL}
              alt="Associação Anita e Giuseppe Garibaldi"
              className="size-10 rounded-full w-auto object-contain"
            />
            <span className="lg:hidden font-semibold text-[0.7rem]">
              AICIB Anita e Giuseppe Garibaldi-SP
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors rounded-lg hover:bg-gray-50"
              >
                {t(`HomePage.nav.${item.flag}`)}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <GlobeIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">{currentLang?.flag}</span>
                  <ChevronDownIcon className="w-3 h-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[140px] p-1">
                {languages.map((lang) => (
                  <button
                    title="Change language"
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={cn(
                      "flex gap-1 w-full cursor-pointer rounded-sm py-1.5  pl-2 text-sm ",
                      lang.code === local && "bg-accent text-accent-foreground",
                    )}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {t(`SelectLang.${lang.code}`)}
                  </button>
                ))}
              </PopoverContent>
            </Popover>

            {/* CTA Button */}
            <Link href={"/join#form"}>
              <Button className="hidden sm:flex bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold shadow-lg shadow-emerald-500/25 cursor-pointer">
                {t("HomePage.nav.button")}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-emerald-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {t(`HomePage.nav.${item.flag}`)}
                </Link>
              ))}
              <div className="pt-4 px-4">
                <Link
                  href={"/join#form"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button className="w-full bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold">
                    {t("HomePage.nav.button")}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
