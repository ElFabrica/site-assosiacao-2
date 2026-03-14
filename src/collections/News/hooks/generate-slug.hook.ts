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
  if (!value && data?.title) {
    // Pegar título em português (idioma padrão)
    const titlePt = typeof data.title === "object" ? data.title : data.title;

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
