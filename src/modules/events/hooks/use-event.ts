import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useQueryEvents = (limit: number) => {
  const trpc = useTRPC();
  const locale = useLocale();
  const { data, isLoading } = useQuery(
    trpc.events.getMany.queryOptions({ locale, limit }),
  );

  return {
    events: data?.docs || [],
    isLoading,
  };
};

export const useQueryEvent = (slug: string) => {
  const trpc = useTRPC();
  const locale = useLocale();
  const { data, isLoading, error } = useQuery(
    trpc.events.getOne.queryOptions({ slug, locale }),
  );

  return {
    event: data?.docs[0] || null,
    isLoading,
    error,
  };
};
