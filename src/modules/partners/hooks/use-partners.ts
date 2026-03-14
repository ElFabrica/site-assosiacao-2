"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useSuspensePartners = () => {
  const trpc = useTRPC();
  const locale = useLocale();
  const { data, isPending } = useSuspenseQuery(
    trpc.partners.getMany.queryOptions({
      locale: locale as "pt" | "it" | "es",
    }),
  );

  return {
    partners: data.docs,
    isPending,
  };
};

export const useQueryPartners = () => {
  const trpc = useTRPC();
  const locale = useLocale();
  const { data, isLoading } = useQuery(
    trpc.partners.getMany.queryOptions({
      locale: locale as "pt" | "it" | "es",
    }),
  );

  return {
    partners: data?.docs || [],
    isLoading,
  };
};
