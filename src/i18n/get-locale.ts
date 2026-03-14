"use server";

import { Locale } from "next-intl";
import { routing } from "./routing";
import { cookies } from "next/headers";

const COOKIE_NAME = "@locale-assosiacao";

export const getCurrentLocale = async () => {
  return (await cookies()).get(COOKIE_NAME)?.value || routing.defaultLocale;
};

export const setCurrentLocale = async (locale: Locale) => {
  (await cookies()).set(COOKIE_NAME, locale);
};
