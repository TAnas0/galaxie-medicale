import { FunnelIcon } from '@heroicons/react/24/outline';

export default function Filters({ filters, setFilters }) {

    return (
        <div className="mt-1 p-2 border-1 border-gray-500 rounded divide-gray-500 shadow-md shadow-primary/10 bg-white">
            <div className="flex flex-cols items-center gap-1 p-10">
                {/* <Icon name="heroicons:bars-4" /> */}
                <FunnelIcon className="w-2 h-2 lg:w-4 lg:h-4" />
                Filtres
            </div>
            <div className="sticky h-full self-start top-28 flex flex-cols gap-2">
                <div className="basis-1/5 p-4 pt-2 bg-white border-1 border-gray-300 rounded-lg">
                    <h3 className="font-sans text-lg mb-2 text-muted-800 dark:text-muted-100">
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

                <div className="basis-1/5 p-4 pt-2 bg-white border-1 border-gray-300 rounded-lg">
                    <h3 className="font-sans text-lg mb-2 text-muted-800 dark:text-muted-100">
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
        </div>
    );
}
