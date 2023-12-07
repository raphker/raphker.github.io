import { z, defineCollection } from "astro:content";

const projectsCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      thumbnail: image(),
      altText: z.string().optional(),
      legend: z.string(),
      vimeo: z.string().optional(),
      gallery: z.array(image()).optional(),
    }),
});

export const collections = {
  projects: projectsCollection,
};
