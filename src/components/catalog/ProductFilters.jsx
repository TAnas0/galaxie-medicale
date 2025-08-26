export default function Filters({ filters, setFilters }) {

    return (
        <div className="px-2 sticky h-full self-start top-28">
            <div className="pt-2 pb-4">
                <h3 className="font-sans font-light text-lg mb-2 text-muted-800 dark:text-muted-100">
                    Disponibilité
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 cursor-pointer">
                        <div className="bg-white dark:bg-muted-900 rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                            <input
                                type="radio"
                                name="availability"
                                value="all"
                                className="peer appearance-none ring-offset-white dark:ring-offset-muted-900 border rounded-full absolute cursor-pointer w-full h-full checked:border-none"
                                checked={filters.availability === 'all'}
                                onChange={() =>
                                    setFilters((prev) => ({ ...prev, availability: 'all' }))
                                }
                            />
                            <div className="border-2 rounded-full w-full h-full peer-checked:bg-primary peer-checked:border-none" />
                        </div>
                        <label htmlFor="radio-6" className="ml-2 text-sm leading-4">
                            Tous
                        </label>
                    </div>

                    <div className="flex items-center gap-3 cursor-pointer">
                        <div className="bg-white dark:bg-muted-900 rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                            <input
                                type="radio"
                                name="availability"
                                value="in_stock"
                                className="peer appearance-none ring-offset-white dark:ring-offset-muted-900 border rounded-full absolute cursor-pointer w-full h-full checked:border-none"
                                checked={filters.availability === 'in_stock'}
                                onChange={() =>
                                    setFilters((prev) => ({ ...prev, availability: 'in_stock' }))
                                }
                            />
                            <div className="border-2 rounded-full w-full h-full peer-checked:bg-primary peer-checked:border-none" />
                        </div>
                        <label htmlFor="radio-6" className="ml-2 text-sm leading-4">
                            En stock immédiat
                        </label>
                    </div>

                    <div className="flex items-center gap-3 cursor-pointer">
                        <div className="bg-white dark:bg-muted-900 rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                            <input
                                type="radio"
                                name="availability"
                                value="on_order"
                                className="peer appearance-none ring-offset-white dark:ring-offset-muted-900 border rounded-full absolute cursor-pointer w-full h-full checked:border-none"
                                checked={filters.availability === 'on_order'}
                                onChange={() =>
                                    setFilters((prev) => ({ ...prev, availability: 'on_order' }))
                                }
                            />
                            <div className="border-2 rounded-full w-full h-full peer-checked:bg-primary peer-checked:border-none" />
                        </div>
                        <label htmlFor="radio-7" className="ml-2 text-sm leading-4">
                            Sur commande
                        </label>
                    </div>

                    <div className="flex items-center gap-3 cursor-pointer">
                        <div className="bg-white dark:bg-muted-900 rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                            <input
                                type="radio"
                                name="radio_availability"
                                value="out_of_stock"
                                className="peer appearance-none ring-offset-white dark:ring-offset-muted-900 border rounded-full absolute cursor-pointer w-full h-full checked:border-none"
                                checked={filters.availability === 'out_of_stock'}
                                onChange={() =>
                                    setFilters((prev) => ({ ...prev, availability: 'out_of_stock' }))
                                }
                            />
                            <div className="border-2 rounded-full w-full h-full peer-checked:bg-primary peer-checked:border-none" />
                        </div>
                        <label htmlFor="radio-8" className="ml-2 text-sm leading-4">
                            Rupture de Stock
                        </label>
                    </div>
                </div>
            </div>

            <div className="pt-2 pb-4">
                <h3 className="font-sans font-light text-lg mb-2 text-muted-800 dark:text-muted-100">
                    Prix
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 cursor-pointer">
                        <div className="bg-white dark:bg-muted-900 rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                            <input
                                type="radio"
                                name="price"
                                className="peer appearance-none ring-offset-white dark:ring-offset-muted-900 border rounded-full absolute cursor-pointer w-full h-full checked:border-none"
                                value="1"
                                checked={filters.price === "all"}
                                onChange={() =>
                                    setFilters((prev) => ({ ...prev, price: "all" }))
                                }
                            />
                            <div className="border-2 rounded-full w-full h-full peer-checked:bg-primary peer-checked:border-none" />
                        </div>
                        <label htmlFor="radio-0" className="ml-2 text-sm leading-4">
                            Tous
                        </label>
                    </div>

                    <div className="flex items-center gap-3 cursor-pointer">
                        <div className="bg-white dark:bg-muted-900 rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                            <input
                                type="radio"
                                name="price"
                                className="peer appearance-none ring-offset-white dark:ring-offset-muted-900 border rounded-full absolute cursor-pointer w-full h-full checked:border-none"
                                value="1"
                                checked={filters.price === 1}
                                onChange={() =>
                                    setFilters((prev) => ({ ...prev, price: 1 }))
                                }
                            />
                            <div className="border-2 rounded-full w-full h-full peer-checked:bg-primary peer-checked:border-none" />
                        </div>
                        <label htmlFor="radio-0" className="ml-2 text-sm leading-4">
                            $
                        </label>
                    </div>

                    <div className="flex items-center gap-3 cursor-pointer">
                        <div className="bg-white dark:bg-muted-900 rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                            <input
                                type="radio"
                                name="price"
                                className="peer appearance-none ring-offset-white dark:ring-offset-muted-900 border rounded-full absolute cursor-pointer w-full h-full checked:border-none"
                                value="2"
                                checked={filters.price === 2}
                                onChange={() =>
                                    setFilters((prev) => ({ ...prev, price: 2 }))
                                }
                            />
                            <div className="border-2 rounded-full w-full h-full peer-checked:bg-primary peer-checked:border-none" />
                        </div>
                        <label htmlFor="radio-1" className="ml-2 text-sm leading-4">
                            $$
                        </label>
                    </div>

                    <div className="flex items-center gap-3 cursor-pointer">
                        <div className="bg-white dark:bg-muted-900 rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                            <input
                                type="radio"
                                name="price"
                                className="peer appearance-none ring-offset-white dark:ring-offset-muted-900 border rounded-full absolute cursor-pointer w-full h-full checked:border-none"
                                value="3"
                                checked={filters.price === 3}
                                onChange={() =>
                                    setFilters((prev) => ({ ...prev, price: 3 }))
                                }
                            />
                            <div className="border-2 rounded-full w-full h-full peer-checked:bg-primary peer-checked:border-none" />
                        </div>
                        <label htmlFor="radio-2" className="ml-2 text-sm leading-4">
                            $$$+
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
