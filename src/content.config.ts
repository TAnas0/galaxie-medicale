import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const products = defineCollection({
    loader: file("src/data/products.json"),
    schema: ({ image }) => z.object({
        id: z.number(),
        name: z.string(),
        category: z.string(),
        sub_category: z.string().optional(),
        // category: z.enum(['A', 'B', 'C']),
        // image: z.string().optional(),
        image: image().optional(),
        images: z.array(z.string()).optional(),
        description: z.string().optional(),
        short_description: z.string().optional(),
        full_description: z.string().optional(),
        availability: z.string().optional(),
        brand: z.object({
            name: z.string().optional(),
            description: z.string().optional(),
        }).optional(),
        // tags: z.array(z.string()),
        technical_specs: z.record(z.union([z.string(), z.array(z.string())])).optional(),
    })
});
// const brands = defineCollection({ /* ... */ });

export const collections = { products };
