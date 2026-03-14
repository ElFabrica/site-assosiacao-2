// ============================================
// src/collections/hooks/featured.hook.ts
// ============================================
import { CollectionBeforeChangeHook } from "payload";

/**
 * Hook que garante que apenas uma notícia esteja em destaque por vez
 * Quando uma notícia é marcada como featured=true,
 * todas as outras são desmarcadas automaticamente
 */
export const ensureSingleFeatured: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
  originalDoc,
}) => {
  // Se featured está sendo marcado como true
  if (data.featured === true) {
    // Buscar todas as notícias que estão em destaque
    const featuredNews = await req.payload.find({
      collection: "news",
      where: {
        featured: {
          equals: true,
        },
        // Excluir o documento atual (se for update)
        id: {
          not_equals: originalDoc?.id,
        },
      },
      limit: 100, // Ajuste conforme necessário
    });

    // Desmarcar todas as notícias que estavam em destaque
    if (featuredNews.docs.length > 0) {
      await Promise.all(
        featuredNews.docs.map((doc) =>
          req.payload.update({
            collection: "news",
            id: doc.id,
            data: {
              featured: false,
            },
          }),
        ),
      );
    }
  }

  return data;
};

// ============================================
// ALTERNATIVA: Hook com locale (multilíngue)
// ============================================
/**
 * Se você quiser um destaque POR IDIOMA:
 * - 1 destaque em PT
 * - 1 destaque em EN
 * - 1 destaque em ES
 */
// export const ensureSingleFeaturedPerLocale: CollectionBeforeChangeHook =
//   async ({ data, req, operation, originalDoc }) => {
//     if (data.featured === true) {
//       const currentLocale = req.locale || "pt"; // Locale atual

//       const featuredNews = await req.payload.find({
//         collection: "news",
//         where: {
//           featured: {
//             equals: true,
//           },
//           id: {
//             not_equals: originalDoc?.id,
//           },
//         },
//         locale: currentLocale, // Filtra por locale
//         limit: 100,
//       });

//       if (featuredNews.docs.length > 0) {
//         await Promise.all(
//           featuredNews.docs.map((doc) =>
//             req.payload.update({
//               collection: "news",
//               id: doc.id,
//               data: {
//                 featured: false,
//               },
//               locale: currentLocale,
//             }),
//           ),
//         );
//       }
//     }

//     return data;
//   };
