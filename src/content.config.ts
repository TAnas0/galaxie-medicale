import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// const products = defineCollection({
//     loader: file("src/data/products.json"),
//     schema: ({ image }) => z.object({
//         id: z.number(),
//         name: z.string(),
//         category: z.string(),
//         subcategory: z.string().optional(),
//         // category: z.enum(['A', 'B', 'C']),
//         // image: z.string().optional(),
//         image: image().optional(),
//         images: z.array(image()).optional(),
//         description: z.string().optional(),
//         short_description: z.string().optional(),
//         full_description: z.string().optional(),
//         availability: z.string().optional(),
//         brand: z.object({
//             name: z.string().optional(),
//             description: z.string().optional(),
//         }).optional(),
//         // tags: z.array(z.string()),
//         technical_specs: z.record(z.union([z.string(), z.array(z.string())])).optional(),
//     })
// });
// const brands = defineCollection({ /* ... */ });

const productsFull = defineCollection({
  loader: file("src/data/products-full.json"),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      name: z.object({
        en: z.string(),
        fr: z.string().optional(),
      }),
      brand: z.object({
        name: z.string(),
        description: z.string().optional(),
      }),
      category: z.object({
        canonical: z.string(),
        display: z.object({
          en: z.string(),
          fr: z.string().optional(),
        }),
      }),
      short_description: z.object({
        en: z.string(),
        fr: z.string().optional(),
      }),
      full_description: z.object({
        en: z.string(),
        fr: z.string().optional(),
      }),
      availability: z.string().optional(),
      images: z.array(image()).optional(),
      attributes: z.array(
        z.object({
          canonical_name: z.string(),
          display_label: z.object({
            fr: z.string(),
            en: z.string()
          }),
          category: z.string(),
          type: z.string(), // simplified from enum
          value: z.any(),   // catch-all
          raw: z.any().optional(),
          highlighted: z.boolean().optional()
        })
      ).optional(),
      compliance: z.object({
        certifications: z.array(z.string()).optional(),
        standards: z.array(z.string()).optional(),
      }).optional(),
    }),
});


export const collections = { productsFull };
