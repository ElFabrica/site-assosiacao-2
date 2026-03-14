import { getCurrentLocale } from "@/i18n/get-locale";
import { prefetchPartners } from "@/modules/partners/server/prefetch";
import PartnersPage from "@/templates/partners";

export default async function page() {
  const locale = await getCurrentLocale();
  prefetchPartners({
    locale: locale as "pt" | "it" | "es",
  });
  return <PartnersPage />;
}
