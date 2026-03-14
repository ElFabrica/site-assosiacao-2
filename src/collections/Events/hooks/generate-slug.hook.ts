import { FieldHook } from "payload";

/**
 * Gera slug automaticamente baseado no título em português
 * O slug é ÚNICO e NÃO localizado (compartilhado entre idiomas)
 */
export const generateSlugHook: FieldHook = ({ data, operation, value }) => {
  // Se já tem slug e é operação de update, manter o slug existente
  if (operation === "update" && value) {
    return value;
  }

  // Se não tem slug, gerar do título em PT
  if (!value && data?.name) {
    // Pegar título em português (idioma padrão)
    const titlePt = typeof data.name === "object" ? data.name : data.name;

    if (titlePt) {
      return titlePt
        .toLowerCase()
        .normalize("NFD") // Remove acentos
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s-]/g, "") // Remove caracteres especiais
        .replace(/\s+/g, "-") // Substitui espaços por hífens
        .replace(/-+/g, "-") // Remove hífens duplicados
        .trim();
    }
  }

  return value;
};

/**
 * Gera slug automaticamente baseado no título no idioma ATUAL do usuário
 * O slug é ÚNICO e NÃO localizado (compartilhado entre idiomas)
 */
// export const generateSlugHook: FieldHook = ({
//   data,
//   operation,
//   value,
//   req,
// }) => {
//   // Pegar o idioma atual do usuário (locale da requisição)
//   const currentLocale = req.locale || "pt";

//   // Determinar qual campo usar (title para News, name para Events, etc)
//   const sourceField = data?.title || data?.name;

//   // Pegar o valor no idioma atual
//   let sourceText = sourceField;
//   if (typeof sourceField === "object") {
//     // Se é localizado, pegar o valor do idioma atual
//     sourceText =
//       sourceField[currentLocale] ||
//       sourceField.pt ||
//       Object.values(sourceField)[0];
//   }

//   // Se está criando (incluindo duplicação) E já tem um value (slug vindo da duplicação)
//   if (operation === "create" && value) {
//     // É uma duplicação, adicionar sufixo
//     return `${value}-copy`;
//   }

//   // Se é update e já tem slug e não está mudando o título, manter
//   if (operation === "update" && value && !sourceText) {
//     return value;
//   }

//   // Se tem texto fonte, gerar/regenerar slug
//   if (sourceText) {
//     const baseSlug = sourceText
//       .toLowerCase()
//       .normalize("NFD") // Remove acentos
//       .replace(/[\u0300-\u036f]/g, "")
//       .replace(/[^\w\s-]/g, "") // Remove caracteres especiais
//       .replace(/\s+/g, "-") // Substitui espaços por hífens
//       .replace(/-+/g, "-") // Remove hífens duplicados
//       .trim();

//     return baseSlug;
//   }

//   return value;
// };
