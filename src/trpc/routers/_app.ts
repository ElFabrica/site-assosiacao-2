import { createTRPCRouter } from "../init";
import { newsRouter } from "@/modules/news/server/procedures";
import { categoryRouter } from "@/modules/categories/server/procedures";
import { eventsRouter } from "@/modules/events/server/procedures";
import { classesRouter } from "@/modules/classes/server/procedure";
import { partnersRouter } from "@/modules/partners/server/procedures";
import { registerRouter } from "@/modules/registers/server/procedures";
import { getCourses } from "@/modules/courses/server/procedures";

export const appRouter = createTRPCRouter({
  news: newsRouter,
  category: categoryRouter,
  events: eventsRouter,
  classes: classesRouter,
  partners: partnersRouter,
  register: registerRouter,
  courses: getCourses,
});
// export type definition of API
export type AppRouter = typeof appRouter;
