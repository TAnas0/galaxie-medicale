import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const products = defineCollection({
    loader: file("src/data/products.json"),
    schema: z.object({
        id: z.number(),
        name: z.string(),
        category: z.string(),
        sub_category: z.string().optional(),
        // category: z.enum(['A', 'B', 'C']),
        image: z.string(),
        description: z.string(),
        availability: z.string(),
        brand: z.string().optional(),
        // tags: z.array(z.string()),
        technical_specs: z.string().optional(),
    })
});
// const brands = defineCollection({ /* ... */ });

export const collections = { products };
