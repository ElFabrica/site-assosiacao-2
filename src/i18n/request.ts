import { getRequestConfig } from "next-intl/server";
import { getCurrentLocale } from "./get-locale";

export default getRequestConfig(async () => {
  const locale = await getCurrentLocale();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
