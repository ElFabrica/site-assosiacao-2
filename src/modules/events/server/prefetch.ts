import { prefetch, trpc } from "@/trpc/server";
import { inferInput } from "@trpc/tanstack-react-query";

type Input = inferInput<typeof trpc.events.getOne>;

export function prefetchEvent(input: Input) {
  return prefetch(trpc.events.getOne.queryOptions(input));
}
