'use client'

import { useState, useRef, useEffect } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { FunnelIcon, ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function FiltersAndSort({ filters, setFilters, sortOption, setSortOption, totalProducts }) {
    const [open, setOpen] = useState(false)

    const [sortOpen, setSortOpen] = useState(false)
    const sortingOptions = [
        { value: 'price-ascending', label: 'Par prix (Croissant)' },
        { value: 'price-descending', label: 'Par prix (Décroissant)' },
        { value: 'alphabetical-ascending', label: 'Alphabétique (Croissant)' },
        { value: 'alphabetical-descending', label: 'Alphabétique (Décroissant)' },
    ]

    const defaultFilters = {
        category: 'all',
        availability: 'all',
        price: 'all',
    }

    const clearFilters = () => {
        setFilters(defaultFilters)
    }

    function shallowEqual(obj1, obj2) {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length) return false;
        return keys1.every(k => obj1[k] === obj2[k]);
    }
    function areFiltersClear() {
        console.log(filters)
        console.log(defaultFilters)
        console.log(shallowEqual(defaultFilters, filters))
        return shallowEqual(defaultFilters, filters)
    }

    const dropdownRef = useRef(null)

    // Close when clicking outside of dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            console.log(event)
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setSortOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [dropdownRef])

    return (
        <div className="flex items-center gap-2 " ref={dropdownRef}>
            <div className="pl-2 min-w-fit">{totalProducts} produits</div>
            <div className="flex items-center gap-2 ml-auto">
                <button
                    onClick={clearFilters}
                    disabled={areFiltersClear()}
                    className={`hidden md:block rounded-md px-2 py-1 text-xs md:text-sm font-semibold mt-1 border 
                        ${areFiltersClear()
                            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-white border-gray-300 text-gray-900 hover:bg-primary/50 cursor-pointer"}`}
                >
                    <div className="flex flex-cols items-center gap-1">
                        <ArrowPathIcon className="w-2 h-2 lg:w-4 lg:h-4" />
                        Réinitialiser les filtres
                    </div>
                </button>

                <button
                    onClick={() => setOpen(true)}
                    className="rounded-md bg-white border border-gray-300 px-2 md:px-4 py-1 text-xs md:text-sm font-semibold text-gray-900 hover:bg-primary/50 mt-1"
                >
                    <div className="flex flex-cols items-center gap-1 cursor-pointer">
                        {/* <Icon name="heroicons:bars-4" /> */}
                        <FunnelIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                        Filtres
                    </div>
                </button>

                {/* Sort Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setSortOpen(!sortOpen)}
                        className="rounded-md bg-white border border-gray-300 px-2 md:px-4 py-1 text-xs md:text-sm font-semibold text-gray-900 hover:bg-primary/50 mt-1 flex items-center gap-1 min-w-48 justify-center cursor-pointer"
                    >
                        Trier: {sortingOptions.find(o => o.value === sortOption).label}
                    </button>

                    {sortOpen && (
                        <div className="absolute right-0 mt-1 min-w-60 w-full bg-white border border-gray-300 rounded shadow-lg z-50">
                            {sortingOptions.map(option => (
                                <div
                                    key={option.value}
                                    onClick={() => {
                                        if (!option.value.includes("price-")) {
                                            setSortOption(option.value)
                                            setSortOpen(false)
                                        }
                                    }}
                                    disabled={option.value.includes("price-")}
                                    className={`cursor-pointer px-4 py-2 w-full ${
                                        option.value.includes("price-")
                                            ? "opacity-50 pointer-events-none"
                                            : "hover:bg-primary/10"
                                    }`}
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>


                <Dialog open={open} onClose={setOpen} className="relative z-10">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
                    />

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                                <DialogPanel
                                    transition
                                    className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
                                >
                                    <div className="relative flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl pt-24">
                                        <div className="px-4 sm:px-6">
                                            <div className="flex justify-end mb-3">
                                                <button
                                                    onClick={() => setOpen(false)}
                                                    className="rounded-full p-2 pl-8 pb-0 cursor-pointer"
                                                >
                                                    <div className="flex flex-cols items-center gap-1 border border-gray-300 rounded-full p-2 bg-gray-50 hover:bg-primary/50">
                                                        <XMarkIcon className="w-5 h-5" />
                                                    </div>
                                                </button>
                                            </div>
                                            <div className="flex justify-between items-center mb-3">
                                                <DialogTitle className="text-base font-semibold text-black">
                                                    <div className="flex flex-cols items-center gap-1 pb-1 text-lg underline">
                                                        {/* <Icon name="heroicons:bars-4" /> */}
                                                        <FunnelIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                                                        Filtres
                                                    </div>
                                                </DialogTitle>

                                                <button
                                                    onClick={clearFilters}
                                                    disabled={areFiltersClear()}
                                                    className={`hidden md:block rounded-md px-2 py-1 text-xs md:text-sm font-semibold mt-1 border 
                                                        ${areFiltersClear()
                                                            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                                                            : "bg-white border-gray-300 text-gray-900 hover:bg-primary/50 cursor-pointer"}`}
                                                >
                                                    <div className="flex flex-cols items-center gap-1">
                                                        <ArrowPathIcon className="w-2 h-2 lg:w-4 lg:h-4" />
                                                        Réinitialiser les filtres
                                                    </div>
                                                </button>
                                            </div>
                
                                            <div className="basis-1/5 p-4 pt-2 bg-white border-1 border-gray-300 rounded-lg mb-3">
                                                <h3 className="font-sans text-lg mb-2 text-muted-800">
                                                    Disponibilité
                                                </h3>
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-3 cursor-pointer">
                                                        <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                                                            <input
                                                                type="radio"
                                                                name="availability"
                                                                value="all"
                                                                className="peer appearance-none ring-offset-white rounded-full absolute cursor-pointer w-full h-full"
                                                                checked={filters.availability === 'all'}
                                                                onChange={() =>
                                                                    setFilters((prev) => ({ ...prev, availability: 'all' }))
                                                                }
                                                            />
                                                            <div className="border-2 border-gray-700 rounded-full w-full h-full peer-checked:bg-primary peer-checked:border-none" />
                                                        </div>
                                                        <label htmlFor="radio-6" className="ml-2 text-sm leading-4">
                                                            Tous
                                                        </label>
                                                    </div>

                                                    <div className="flex items-center gap-3 cursor-pointer">
                                                        <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                                                            <input
                                                                type="radio"
                                                                name="availability"
                                                                value="in_stock"
                                                                className="peer appearance-none ring-offset-white rounded-full absolute cursor-pointer w-full h-full"
                                                                checked={filters.availability === 'in_stock'}
                                                                onChange={() =>
                                                                    setFilters((prev) => ({ ...prev, availability: 'in_stock' }))
                                                                }
                                                            />
                                                            <div className="border-2 border-gray-700 rounded-full w-full h-full peer-checked:bg-primary peer-checked:border-none" />
                                                        </div>
                                                        <label htmlFor="radio-6" className="ml-2 text-sm leading-4">
                                                            En stock immédiat
                                                        </label>
                                                    </div>

                                                    <div className="flex items-center gap-3 cursor-pointer">
                                                        <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                                                            <input
                                                                type="radio"
                                                                name="availability"
                                                                value="on_order"
                                                                className="peer appearance-none ring-offset-white rounded-full absolute cursor-pointer w-full h-full"
                                                                checked={filters.availability === 'on_order'}
                                                                onChange={() =>
                                                                    setFilters((prev) => ({ ...prev, availability: 'on_order' }))
                                                                }
                                                            />
                                                            <div className="border-2 border-gray-700 rounded-full w-full h-full peer-checked:bg-primary peer-checked:border-none" />
                                                        </div>
                                                        <label htmlFor="radio-7" className="ml-2 text-sm leading-4">
                                                            Sur commande
                                                        </label>
                                                    </div>

                                                    <div className="flex items-center gap-3 cursor-pointer">
                                                        <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                                                            <input
                                                                type="radio"
                                                                name="radio_availability"
                                                                value="out_of_stock"
                                                                className="peer appearance-none ring-offset-white rounded-full absolute cursor-pointer w-full h-full"
                                                                checked={filters.availability === 'out_of_stock'}
                                                                onChange={() =>
                                                                    setFilters((prev) => ({ ...prev, availability: 'out_of_stock' }))
                                                                }
                                                            />
                                                            <div className="border-2 border-gray-700 rounded-full w-full h-full peer-checked:bg-primary peer-checked:border-none" />
                                                        </div>
                                                        <label htmlFor="radio-8" className="ml-2 text-sm leading-4">
                                                            Rupture de Stock
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="basis-1/5 p-4 pt-2 bg-white border-1 border-gray-300 rounded-lg">
                                                <h3 className="font-sans text-lg mb-2 text-muted-800">
                                                    Prix
                                                </h3>
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-3 cursor-pointer">
                                                        <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                                                            <input
                                                                type="radio"
                                                                name="price"
                                                                className="peer appearance-none ring-offset-white rounded-full absolute cursor-pointer w-full h-full"
                                                                value="1"
                                                                checked={filters.price === "all"}
                                                                onChange={() =>
                                                                    setFilters((prev) => ({ ...prev, price: "all" }))
                                                                }
                                                            />
                                                            <div className="border-2 border-gray-700 rounded-full w-full h-full peer-checked:bg-primary peer-checked:border-none" />
                                                        </div>
                                                        <label htmlFor="radio-0" className="ml-2 text-sm leading-4">
                                                            Tous
                                                        </label>
                                                    </div>

                                                    <div className="flex items-center gap-3 cursor-pointer">
                                                        <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                                                            <input
                                                                type="radio"
                                                                name="price"
                                                                className="peer appearance-none ring-offset-white rounded-full absolute cursor-pointer w-full h-full"
                                                                value="1"
                                                                checked={filters.price === 1}
                                                                onChange={() =>
                                                                    setFilters((prev) => ({ ...prev, price: 1 }))
                                                                }
                                                            />
                                                            <div className="border-2 border-gray-700 rounded-full w-full h-full peer-checked:bg-primary peer-checked:border-none" />
                                                        </div>
                                                        <label htmlFor="radio-0" className="ml-2 text-sm leading-4">
                                                            $
                                                        </label>
                                                    </div>

                                                    <div className="flex items-center gap-3 cursor-pointer">
                                                        <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                                                            <input
                                                                type="radio"
                                                                name="price"
                                                                className="peer appearance-none ring-offset-white rounded-full absolute cursor-pointer w-full h-full"
                                                                value="2"
                                                                checked={filters.price === 2}
                                                                onChange={() =>
                                                                    setFilters((prev) => ({ ...prev, price: 2 }))
                                                                }
                                                            />
                                                            <div className="border-2 border-gray-700 rounded-full w-full h-full peer-checked:bg-primary peer-checked:border-none" />
                                                        </div>
                                                        <label htmlFor="radio-1" className="ml-2 text-sm leading-4">
                                                            $$
                                                        </label>
                                                    </div>

                                                    <div className="flex items-center gap-3 cursor-pointer">
                                                        <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                                                            <input
                                                                type="radio"
                                                                name="price"
                                                                className="peer appearance-none ring-offset-white rounded-full absolute cursor-pointer w-full h-full"
                                                                value="3"
                                                                checked={filters.price === 3}
                                                                onChange={() =>
                                                                    setFilters((prev) => ({ ...prev, price: 3 }))
                                                                }
                                                            />
                                                            <div className="border-2 border-gray-700 rounded-full w-full h-full peer-checked:bg-primary peer-checked:border-none" />
                                                        </div>
                                                        <label htmlFor="radio-2" className="ml-2 text-sm leading-4">
                                                            $$$+
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">{/* Your content */}</div>
                                    </div>
                                </DialogPanel>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>

        </div>
    )
}
