import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const products = defineCollection({
    loader: file("src/data/products.json"),
    schema: z.object({
        id: z.string(),
        name: z.string(),
        category: z.string(),
        sub_category: z.string(),
        // category: z.enum(['A', 'B', 'C']),
        image: z.string(),
        description: z.string(),
        availability: z.string(),
        brand: z.string(),
        // tags: z.array(z.string()),
        technical_specs: z.string(),
    })
});
// const brands = defineCollection({ /* ... */ });

export const collections = { products };