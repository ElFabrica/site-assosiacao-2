"use client";
import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useQueryNews = () => {
  const trpc = useTRPC();
  const locale = useLocale();
  const { data, isLoading } = useQuery(
    trpc.news.getMany.queryOptions({
      locale: locale as "pt" | "it" | "es",
    }),
  );

  return {
    news: data?.docs || [],
    isLoading,
  };
};

export const useQueryNew = (slug: string) => {
  const trpc = useTRPC();
  const locale = useLocale();
  const { data, isLoading, error } = useQuery(
    trpc.news.getOne.queryOptions({
      slug,
      locale: locale as "pt" | "it" | "es",
    }),
  );

  return {
    news: data?.docs[0] || null,
    isLoading,
    error,
  };
};
