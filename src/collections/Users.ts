import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: {
      pt: "Usuário",
      it: "Utente",
      es: "Usuario",
    },
    plural: {
      pt: "Usuários",
      it: "Utenti",
      es: "Usuarios",
    },
  },
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "name",
      label: "Nome",
      type: "text",
      required: true,
      admin: {
        placeholder: "Digite o nome",
        description: "Nome do usuário",
      },
    },
    // Email added by default
    // Add more fields as needed
  ],
};
