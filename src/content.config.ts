import { defineCollection, reference, z } from 'astro:content';
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
  loader: glob({ pattern: "**/*.json", base: "./src/content/products" }),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      name: z.object({
        en: z.string().optional(),
        fr: z.string().optional(),
      }),
      brand: reference('brands'),
      category: z.object({
        canonical: z.string(),
        display: z.object({
          en: z.string(),
          fr: z.string().optional(),
        }),
      }),
      short_description: z.object({
        en: z.string().optional(),
        fr: z.string().optional(),
      }),
      full_description: z.object({
        en: z.string().optional(),
        fr: z.string().optional(),
      }),
      availability: z.string().optional(),
      images: z.array(image()).optional(),
      attributes: z.array(
        z.object({
          canonical_name: z.string(),
          display_label: z.object({
            fr: z.string().optional(),
            en: z.string().optional()
          }),
          category: z.string(),
          type: z.string(), // simplified from enum
          value: z.any(),   // catch-all
          highlighted: z.boolean().optional(),
          priority: z.number().optional(), // NEW: allows per-product priority override
          note: z.string().optional(),
        })
      ).optional(),
      compliance: z.object({
        certifications: z.array(reference('certifications')).optional(),
        standards: z.array(z.string()).optional(),
      }).optional(),
      links: z.object({
        official_page: z.union([z.string(), z.array(z.string())]).optional(),
        specs: z.union([z.string(), z.array(z.string())]).optional(),
        manual: z.union([z.string(), z.array(z.string())]).optional(),
        installation_guide: z.union([z.string(), z.array(z.string())]).optional(),
        others: z.array(z.string().optional()).optional(),
      }).optional(),
    }),
});


const brands = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/brands" }),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      name: z.string(),
      legal_name: z.string().optional(),
      website: z.string().url().optional(),
      logo: image().optional(),
      status: z.enum(['active', 'inactive', 'legacy']).default('active'),
      description: z.object({
        short: z.string().max(160).optional(),
        full: z.string().optional(),
      }).optional(),
      social_links: z.object({
        linkedin: z.string().url().optional(),
        facebook: z.string().url().optional(),
        twitter: z.string().url().optional(),
      }).optional(),
      country_of_origin: z.string().length(2).optional(),
    }),
});

const certifications = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/certifications" }),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      name: z.string(),
      code: z.string().optional(),
      type: z.enum(['regulatory', 'quality', 'environmental', 'safety', 'other']),
      issuer: z.string().optional(),
      link: z.string().url().optional(),
      badge: image().optional(),
      short_description: z.string().optional(),
      full_description: z.string().optional(),
      version: z.string().optional(),
    }),
});


export const collections = { productsFull, brands, certifications };
