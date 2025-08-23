import { useState } from 'react';
import ProductToolbar from './ProductToolbar.jsx';
import ProductGrid from './ProductGrid.jsx';
import ProductFilters from './ProductFilters.jsx';

export default function Catalog({ products }) {
    const [activeCategory, setActiveCategory] = useState('all');
    const [filters, setFilters] = useState({
        availability: 'all', // 'in_stock', 'on_order', 'out_of_stock'
        price: 'all',        // '$', '$$', '$$$+'
        category: 'all',     // optional, for your category toolbar
    });

    return (

        <div>
            <div id="catalog">
                <div id="categories-toolbar" className="mt-27 sticky top-27 md:top-27 w-full z-50 transition-transform duration-1000 ease-in-out translate-y-0">
                    <ProductToolbar
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />
                </div>

                <div className="py-6">
                    <div className="flex grid grid-cols-12 md:gap-12 pb-20">
                        <div id="filters" className="sticky self-start top-40 lg:block col-span-4 lg:col-span-3 transition-transform duration-1000 ease-in-out">
                            {/* <Filters /> */}
                            <ProductFilters filters={filters} setFilters={setFilters}/>
                        </div>
                        <div className="col-span-8 lg:col-span-9 flex flex-cols">
                            <ProductGrid
                                products={products}
                                activeCategory={activeCategory}
                                filters={filters}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
