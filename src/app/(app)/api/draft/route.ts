import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (secret !== "my-secret-token" || !slug) {
    return new Response("Invalid token", { status: 401 });
  }

  const payload = await getPayload({
    config: configPromise,
  });

  const article = await payload.find({
    collection: "news",
    where: {
      slug: {
        equals: slug,
      },
    },
    locale: "pt",
  });

  console.log(article);

  if (!article) {
    return new Response("Article not found", { status: 404 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(`/news/${article.docs[0].slug}`);
}

// curl "http://localhost:3000/api/draft?secret=my-secret-token&slug=/news/nova-noticia"
