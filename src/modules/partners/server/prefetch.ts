import { prefetch, trpc } from "@/trpc/server";
import { inferInput } from "@trpc/tanstack-react-query";

type Input = inferInput<typeof trpc.partners.getMany>;

export function prefetchPartners(input: Input) {
  return prefetch(trpc.partners.getMany.queryOptions(input));
}
