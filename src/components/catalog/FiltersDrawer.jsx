'use client'

import { useState, useRef, useEffect } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { FunnelIcon } from '@heroicons/react/24/outline'

export default function FiltersAndSort({ filters, setFilters, totalProducts }) {
    const [open, setOpen] = useState(false)

    const [sortOption, setSortOption] = useState('price-ascending')
    const [sortOpen, setSortOpen] = useState(false)
    const sortingOptions = [
        { value: 'price-ascending', label: 'Par prix (Croissant)' },
        { value: 'price-descending', label: 'Par prix (Décroissant)' },
        { value: 'alphabetical-ascending', label: 'Alphabétique (Croissant)' },
        { value: 'alphabetical-descending', label: 'Alphabétique (Décroissant)' },
    ]

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
            <div className="pl-2">{totalProducts} produits</div>
            <div className="flex items-center-gap-2 ml-auto">

                <button
                    onClick={() => setOpen(true)}
                    className="rounded-md bg-white border border-gray-300 px-6 py-1 text-sm font-semibold text-gray-900 hover:bg-primary/50 text-black mt-1"
                >
                    <div className="flex flex-cols items-center gap-1">
                        {/* <Icon name="heroicons:bars-4" /> */}
                        <FunnelIcon className="w-2 h-2 lg:w-4 lg:h-4" />
                        Filtres
                    </div>
                </button>

                {/* Sort Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setSortOpen(!sortOpen)}
                        className="rounded-md bg-white border border-gray-300 px-6 py-1 text-sm font-semibold text-gray-900 hover:bg-primary/50 text-black mt-1 flex items-center gap-1 min-w-62 justify-center"
                    >
                        Trier: {sortingOptions.find(o => o.value === sortOption).label}
                    </button>

                    {sortOpen && (
                        <div className="absolute right-0 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-50">
                            {sortingOptions.map(option => (
                                <div
                                    key={option.value}
                                    onClick={() => {
                                        setSortOption(option.value)
                                        setSortOpen(false)
                                    }}
                                    className="cursor-pointer px-4 py-2 hover:bg-primary/10 w-full"
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
                                    <div className="relative flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl pt-32">
                                        <div className="px-4 sm:px-6">
                                            <DialogTitle className="text-base font-semibold text-black">
                                                <div className="flex flex-cols items-center gap-1 pb-1 text-lg underline mb-3">
                                                    {/* <Icon name="heroicons:bars-4" /> */}
                                                    <FunnelIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                                                    Filtres
                                                </div>
                                            </DialogTitle>
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
                                                                className="peer appearance-none ring-offset-white border rounded-full absolute cursor-pointer w-full h-full checked:border-none"
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
                                                        <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                                                            <input
                                                                type="radio"
                                                                name="availability"
                                                                value="in_stock"
                                                                className="peer appearance-none ring-offset-white border rounded-full absolute cursor-pointer w-full h-full checked:border-none"
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
                                                        <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                                                            <input
                                                                type="radio"
                                                                name="availability"
                                                                value="on_order"
                                                                className="peer appearance-none ring-offset-white border rounded-full absolute cursor-pointer w-full h-full checked:border-none"
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
                                                        <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                                                            <input
                                                                type="radio"
                                                                name="radio_availability"
                                                                value="out_of_stock"
                                                                className="peer appearance-none ring-offset-white border rounded-full absolute cursor-pointer w-full h-full checked:border-none"
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
                                                <h3 className="font-sans text-lg mb-2 text-muted-800">
                                                    Prix
                                                </h3>
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-3 cursor-pointer">
                                                        <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                                                            <input
                                                                type="radio"
                                                                name="price"
                                                                className="peer appearance-none ring-offset-white border rounded-full absolute cursor-pointer w-full h-full checked:border-none"
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
                                                        <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                                                            <input
                                                                type="radio"
                                                                name="price"
                                                                className="peer appearance-none ring-offset-white border rounded-full absolute cursor-pointer w-full h-full checked:border-none"
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
                                                        <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                                                            <input
                                                                type="radio"
                                                                name="price"
                                                                className="peer appearance-none ring-offset-white border rounded-full absolute cursor-pointer w-full h-full checked:border-none"
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
                                                        <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                                                            <input
                                                                type="radio"
                                                                name="price"
                                                                className="peer appearance-none ring-offset-white border rounded-full absolute cursor-pointer w-full h-full checked:border-none"
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
