import React from 'react';

export default function ProductGrid({ products }) {
    return (
        <div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 p-2">
                {products.map((product) => (
                    <a
                        key={product.id}
                        href={`/galaxie-medicale/products/${product.id}`}
                        className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1"
                    >
                        {/* Image Container */}
                        <div className="relative w-full aspect-[4/3] bg-white overflow-hidden border-b border-gray-50">
                            {/* Loading Placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                <svg className="w-8 h-8 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>

                            <img
                                src={product.data.images?.length ? product.data.images[0].src : "https://placehold.co/400x400"}
                                alt={product.data.name.fr || product.data.name.en}
                                className="absolute w-full h-full object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
                                loading="lazy"
                            />

                            {/* Out of Stock Badge */}
                            {product.data.availability === "out_of_stock" && (
                                <div className="absolute top-3 right-3 bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded-full border border-red-100">
                                    Rupture
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <h4 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                {product.data.name.fr || product.data.name.en}
                            </h4>

                            <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">
                                {product.data.short_description?.fr || product.data.short_description?.en}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                    {product.data.brand?.name}
                                </p>
                                <span className="inline-block px-2 py-1 rounded-full bg-blue-50 text-primary text-[10px] font-bold uppercase tracking-wider">
                                    {product.data.category?.display.fr || product.data.category?.display.en}
                                </span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
