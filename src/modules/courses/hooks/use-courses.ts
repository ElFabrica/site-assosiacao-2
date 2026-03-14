import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useQueryCouses = () => {
  const trpc = useTRPC();
  const locale = useLocale();
  const { data, isLoading } = useQuery(
    trpc.courses.getMany.queryOptions({
      locale,
    }),
  );

  return {
    courses: data?.docs || [],
    isLoading,
  };
};
