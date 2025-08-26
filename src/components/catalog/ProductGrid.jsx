import Card from "../ui/Card.jsx";

export default function ProductGrid({ products, filters }) {
    const filteredProducts = products.filter((p) => {
        if (filters.category !== "all" && p.data.category !== filters.category) return false;
        if (filters.availability !== 'all' && p.data.availability !== filters.availability) return false;
        return true;
    });

    return (
        <div>
            <div className="text-base font-medium text-gray-700 mb-2">{filteredProducts.length} produits</div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-6 p-2">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="border-1 border-gray-300 rounded-lg shadow-lg overflow-hidden">
                        <a
                            href={`/galaxie-medicale/products/${product.id}`}
                            className="block group transition-all duration-300 hover:scale-[1.015]"
                        >
                            <Card className="group flex flex-col rounded-md border border-gray-300 shadow-xl overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.01]">
                                
                                {/* Product Image */}
                                <div className="relative w-full aspect-[4/3] bg-muted-100 dark:bg-muted-800">
                                    {/* Loading Indicator */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-muted-300 dark:bg-muted-700">
                                        <div className="w-12 h-12 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
                                    </div>

                                    <img
                                        src={product.data.image ? product.data.image.src : "https://placehold.co/400x400"}
                                        alt={product.data.name}
                                        className="absolute w-full h-full object-contain transition-opacity duration-1000 ease-in-out"
                                        loading="lazy"
                                    />

                                    {/* Out of Stock Badge */}
                                    {product.data.availability === "out_of_stock" && (
                                        <div className="absolute top-2 right-2 bg-red-600/60 text-white text-xs font-semibold px-2 py-1 rounded shadow">
                                            Rupture de stock
                                        </div>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="p-2 flex flex-col justify-between h-[150px] text-gray-50 bg-primary/90">
                                    <h4 className="text-lg font-semibold pb-2 line-clamp-2 underline">{product.data.name}</h4>
                                    <p className="text-sm text-muted-600 dark:text-muted-400 line-clamp-3">
                                        {product.data.short_description}
                                    </p>

                                    <div className="flex justify-between items-center mt-auto">
                                        <p className="text-xs text-muted-400 italic">{product.data.brand.name}</p>
                                        <div className="flex gap-1">
                                            <span className="inline-block text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-0.5 rounded-md">
                                                {product.data.category}
                                            </span>
                                            {product.data.sub_category && (
                                                <span className="inline-block text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-0.5 rounded-md">
                                                    {product.data.sub_category}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                            </Card>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
