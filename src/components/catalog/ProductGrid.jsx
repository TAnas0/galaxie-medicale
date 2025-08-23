import Card from "../ui/Card.jsx";

export default function ProductGrid({ products, activeCategory, filters }) {
    const filteredProducts = products.filter((p) => {
        // Availability filter
        if (filters.availability !== 'all' && p.data.availability !== filters.availability) return false;
        
        // Price filter
        // if (filters.price !== 'all' && p.data.price !== filters.price) return false;
        
        // Category filter
        // if (filters.category !== 'all' && p.data.category !== filters.category) return false;
        
        return true;
    });

    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 md:grid-cols-1 gap-x-4 ptablet:gap-x-4 gap-y-6 pt-1 mr-2 ml-2 md:ml-0 md:mr-0">
            {filteredProducts.map((product) => {
                // Filtering
                const show = activeCategory === "all" || activeCategory === product.data.category;

                return show ? (
                    <div key={product.id}>
                        <a href={`/galaxie-medicale/products/${product.id}`} className="block group transition-all duration-300 hover:scale-[1.015] h-full">
                            <Card class="group flex flex-col rounded-md border border-gray-300 shadow-xl hover:shadow-3xl transition-all duration-300 ease-in-out overflow-hidden hover:scale-[1.01]">
                                {/* Product Image */}
                                <div class="relative w-full aspect-[4/3] bg-muted-100 dark:bg-muted-800 h-full flex-3">
                                    {/* Loading indicator */}
                                    <div
                                        class="absolute inset-0 flex items-center justify-center animate-pulse bg-muted-300 dark:bg-muted-700"
                                    >
                                        <div class="loader absolute top-0 left-0"></div>
                                    </div>
                                    <img
                                        src={product.data.image ? product.data.image.src : "https://placehold.co/400x400"}
                                        alt={product.data.name}
                                        className="object-fit w-full h-full transition-opacity duration-700 ease-in-out"
                                        loading="lazy"
                                    />
                                    {/* <Image
                                        src={product.data.image || "https://placehold.co/400x400"}
                                        inferSize={true}
                                        alt={product.data.name}
                                        loading="lazy"
                                        class="object-fit w-full h-full transition-opacity duration-700 ease-in-out"
                                    /> */}
                                </div>

                                {/* Product Info */}
                                <div class="h-full flex-2">
                                    {(product.data.availability == "out_of_stock") && (
                                        <div class="absolute top-2 right-2 bg-red-600/60 text-white text-xs font-semibold px-2 py-1 rounded shadow">
                                            Rupture de stock
                                        </div>
                                    )}

                                    {/* Overlay Info */}
                                    <div class="bottom-0 w-full bg-primary/80 backdrop-blur-sm text-white p-2 transition-opacity duration-300 group-hover:bg-primary h-full flex flex-col">
                                        <h4 class="text-lg font-semibold pb-2">{product.data.name}</h4>
                                        <p class="text-sm text-muted-600 dark:text-muted-400 line-clamp-3">
                                            {product.data.short_description}
                                        </p>
                                        <div class="flex justify-between items-center mt-auto">
                                            <p class="text-xs text-muted-400 italic">{product.data.brand.name}</p>
                                            <div>
                                                <span class="inline-block text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-0.5 rounded-md">
                                                    {product.data.category}
                                                </span>
                                                {product.data.sub_category ?
                                                    <span class="inline-block text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-0.5 rounded-md">
                                                        {product.data.sub_category}
                                                    </span> : ""
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </a>
                    </div>
                ) : null;
            })}
        </div>
    );
}
