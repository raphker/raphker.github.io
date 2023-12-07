import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "/src/content/assets",
      publicFolder: "",
    },
  },
  schema: {
    collections: [
      {
        name: "projects",
        label: "Projets",
        path: "src/content/projects",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titre",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "image",
            name: "thumbnail",
            label: "Image principale",
            required: true,
          },
          {
            type: "string",
            name: "altText",
            label: "description alternative",
            required: false,
          },
          {
            type: "string",
            name: "legend",
            label: "Légende",
            required: true,
          },
          {
            type: "string",
            name: "vimeo",
            label: "Lien vimeo",
            required: false,
          },
          {
            type: "image",
            list: true,
            name: "gallery",
            label: "Galerie",
            required: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
