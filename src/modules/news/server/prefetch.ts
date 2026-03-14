import { prefetch, trpc } from "@/trpc/server";
import { inferInput } from "@trpc/tanstack-react-query";

type Input = inferInput<typeof trpc.news.getOne>;

export function prefetchNew(input: Input) {
  return prefetch(trpc.news.getOne.queryOptions(input));
}
