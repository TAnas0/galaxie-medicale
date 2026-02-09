import { getCollection } from "astro:content";

export async function GET() {
  const products = await getCollection("productsFull");

  const searchIndex = products.map((product) => ({
    id: product.id,
    name: product.data.name,
    category: product.data.category,
    brand: product.data.brand,
    short_description: product.data.short_description,
    attributes: product.data.attributes,
    images: product.data.images?.map((img) => img.src),
  }));

  return new Response(JSON.stringify(searchIndex), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
