import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useQueryClasses = () => {
  const trpc = useTRPC();
  const locale = useLocale();
  const { data, isLoading } = useQuery(
    trpc.classes.getMany.queryOptions({
      locale,
    }),
  );

  return {
    classes: data?.docs || [],
    isLoading,
  };
};
