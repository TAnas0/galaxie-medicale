import Card from "../ui/Card.jsx";

export default function ProductGrid({ products }) {
    return (
        <div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-6 p-2">
                {products.map((product) => (
                    <div key={product.id} className="border-1 border-gray-300 rounded-lg shadow-lg overflow-hidden">
                        <a
                            href={`/galaxie-medicale/products/${product.id}`}
                            className="block group transition-all duration-300 hover:scale-[1.015]"
                        >
                            <Card className="group flex flex-col rounded-md border border-gray-300 shadow-xl overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.01]">
                                
                                {/* Product Image */}
                                <div className="relative w-full aspect-[4/3]">
                                    {/* Loading Indicator */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-12 h-12 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
                                    </div>

                                    <img
                                        src={product.data.images.length ? product.data.images[0].src : "https://placehold.co/400x400"}
                                        alt={product.data.name.fr}
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
                                    <h4 className="text-lg font-semibold pb-2 line-clamp-2 underline">{product.data.name.fr}</h4>
                                    <p className="text-sm text-muted-600 dark:text-muted-400 line-clamp-3">
                                        {product.data.short_description.fr}
                                    </p>

                                    <div className="flex justify-between items-center mt-auto">
                                        <p className="text-xs text-muted-400 italic">{product.data.brand.name}</p>
                                        <div className="flex gap-1">
                                            <span className="inline-block text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-0.5 rounded-md">
                                                {product.data.category.display.fr}
                                            </span>
                                            {/* {product.data.sub_category && (
                                                <span className="inline-block text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-0.5 rounded-md">
                                                    {product.data.sub_category}
                                                </span>
                                            )} */}
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
