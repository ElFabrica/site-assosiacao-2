import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { pt } from "@payloadcms/translations/languages/pt";
import { it } from "@payloadcms/translations/languages/it";
import { es } from "@payloadcms/translations/languages/es";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import sharp from "sharp";

import { Users } from "./collections/Users.ts";
import { Media } from "./collections/Media.ts";
import { News } from "./collections/News/config.ts";
import { Categories } from "./collections/Categories/config.ts";
import { Events } from "./collections/Events/config.ts";
import { Classes } from "./collections/Classes/config.ts";
import { Partners } from "./collections/Partner/config.ts";
import { Register } from "./collections/Register/config.ts";
import { Course } from "./collections/Courses/config.ts";
import { Author } from "./collections/Author/config.ts";
import { Creator } from "./collections/Creator/config.ts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    News,
    Categories,
    Events,
    Course,
    Classes,
    Partners,
    Register,
    Author,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || "",
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  i18n: {
    supportedLanguages: { pt, it, es },
    fallbackLanguage: "pt",
  },
  localization: {
    locales: [
      {
        code: "pt",
        label: "Português",
      },
      {
        code: "it",
        label: "Italiano",
      },
      {
        code: "es",
        label: "Espanhol",
      },
    ],
    defaultLocale: "pt",
    // defaultLocalePublishOption: "all",
    // fallback: true,
  },
});
