"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useQueryCategory = () => {
  const trpc = useTRPC();
  const locale = useLocale();
  const { data, isLoading } = useQuery(
    trpc.category.getMany.queryOptions({ locale }),
  );

  return {
    categories: data?.docs || [],
    isLoadingCategory: isLoading,
  };
};
