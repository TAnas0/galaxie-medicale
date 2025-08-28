import { useState } from 'react';
import ProductToolbar from './ProductToolbar.jsx';
import ProductGrid from './ProductGrid.jsx';
import ProductFilters from './ProductFilters.jsx';
import FiltersDrawer from './FiltersDrawer.jsx';
import { useMemo } from 'react'

export default function Catalog({ products }) {
    const [filters, setFilters] = useState({
        category: "all",
        availability: 'all', // 'in_stock', 'on_order', 'out_of_stock'
        price: 'all',        // '$', '$$', '$$$+'
    });

    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            if (filters.category !== "all" && p.data.category !== filters.category) return false
            if (filters.availability !== 'all' && p.data.availability !== filters.availability) return false
            if (filters.price !== 'all' && p.data.price !== filters.price) return false
            return true
        })
    }, [products, filters])

    return (
        <div>
            <div id="catalog" class="bg-gray-50">
                <div id="categories-toolbar" className="mt-27 sticky top-27 w-full z-50 transition-transform duration-300 ease-in-out translate-y-0 bg-white border-1 border-gray-300 rounded-lg p-1">
                    <ProductToolbar
                        filters={filters}
                        setFilters={setFilters}
                    />
                    <div id="filters" className="sticky self-start top-40 lg:block col-span-4 lg:col-span-3 transition-transform duration-300 ease-in-out">
                        {/* <Filters /> */}
                        <FiltersDrawer
                            filters={filters}
                            setFilters={setFilters}
                            totalProducts={filteredProducts.length}
                        />
                    </div>
                </div>

                <div className="py-2">
                    <div className="grid grid-cols-12 md:gap-12 pb-20">
                        <div className="col-span-10 col-start-2 xl:col-span-12">
                            <ProductGrid
                                products={filteredProducts}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
