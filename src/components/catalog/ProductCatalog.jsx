import { useState, useEffect, useMemo } from 'react';
import ProductToolbar from './ProductToolbar.jsx';
import ProductGrid from './ProductGrid.jsx';
import FiltersDrawer from './FiltersDrawer.jsx';

export default function Catalog({ products, initialCategory }) {
    // Use a sensible default ("all") so the page renders immediately
    const [filters, setFilters] = useState({
        category: initialCategory || 'all',
        availability: 'all',
        price: 'all',
    });

    // Update category from URL on client, if present
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const categoryFromUrl = params.get('category');

        if (categoryFromUrl && categoryFromUrl !== filters.category) {
            setFilters(prev => ({ ...prev, category: categoryFromUrl }));
        }
    }, []); // run once on mount // render nothing until filters are ready

    // Read URL parameter on mount
    // useEffect(() => {
    //     const params = new URLSearchParams(window.location.search);
    //     const categoryFromUrl = params.get('category');
    //     if (categoryFromUrl) {
    //         setFilters(prev => ({ ...prev, category: categoryFromUrl }));
    //     }
    // }, []);

    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            if (filters.category !== "all" && p.data.category.canonical !== filters.category) return false
            if (filters.availability !== 'all' && p.data.availability !== filters.availability) return false
            if (filters.price !== 'all' && p.data.price !== filters.price) return false
            return true
        })
    }, [products, filters])

    // Sorting products
    const [sortOption, setSortOption] = useState('price-ascending')
    const sortedProducts = useMemo(() => {
        const handleSort = (data, sortOption) => {
            switch (sortOption) {
                case "price-ascending":
                    return [...data].sort((a, b) => a.price - b.price)
                case "price-descending":
                    return [...data].sort((a, b) => b.price - a.price)
                case "alphabetical-ascending":
                    return [...data].sort((a, b) => a.data.name.fr.localeCompare(b.data.name.fr))
                case "alphabetical-descending":
                    return [...data].sort((a, b) => b.data.name.fr.localeCompare(a.data.name.fr))
                default:
                    return data
            }
        }
        return handleSort(filteredProducts, sortOption)
    }, [filteredProducts, sortOption])

    return (
        <div id="catalog" className="bg-gray-50/50 min-h-[95vh]">
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
                        sortOption={sortOption}
                        setSortOption={setSortOption}
                        totalProducts={filteredProducts.length}
                    />
                </div>
            </div>

            <div className="py-2">
                <div className="grid grid-cols-12 md:gap-12 pb-20">
                    <div className="col-span-10 col-start-2 xl:col-span-12">
                        <ProductGrid
                            products={sortedProducts}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
