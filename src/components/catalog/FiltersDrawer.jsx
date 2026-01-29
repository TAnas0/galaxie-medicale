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
        return shallowEqual(defaultFilters, filters)
    }

    const dropdownRef = useRef(null)

    // Close when clicking outside of dropdown
    useEffect(() => {
        function handleClickOutside(event) {
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
        <div className="flex flex-wrap items-center justify-between gap-4" ref={dropdownRef}>
            <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setSortOpen(!sortOpen)}
                        className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-primary/30 hover:bg-gray-50 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                        <span className="text-gray-400 group-hover:text-primary/70">Trier:</span>
                        <span className="text-gray-900 group-hover:text-primary">{sortingOptions.find(o => o.value === sortOption)?.label}</span>
                        <svg className={`h-4 w-4 text-gray-400 transition-transform duration-200 group-hover:text-primary/70 ${sortOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {sortOpen && (
                        <div className="absolute left-0 z-50 mt-2 w-64 origin-top-left rounded-xl bg-white p-1 shadow-xl ring-1 ring-black/5 focus:outline-none transform opacity-100 scale-100 transition-all">
                            {sortingOptions.map(option => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        if (!option.value.includes("price-")) {
                                            setSortOption(option.value)
                                            setSortOpen(false)
                                        }
                                    }}
                                    disabled={option.value.includes("price-")}
                                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${option.value.includes("price-")
                                            ? "cursor-not-allowed opacity-50 text-gray-400"
                                            : option.value === sortOption
                                                ? "bg-primary/5 text-primary font-medium"
                                                : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    {option.label}
                                    {option.value === sortOption && (
                                        <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-primary/30 hover:bg-gray-50 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                    <FunnelIcon className="h-4 w-4 text-gray-400 transition-colors group-hover:text-primary" />
                    <span>Filtres</span>
                    {!areFiltersClear() && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                            !
                        </span>
                    )}
                </button>

                <button
                    onClick={clearFilters}
                    disabled={areFiltersClear()}
                    className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${areFiltersClear()
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                        }`}
                >
                    <ArrowPathIcon className={`h-4 w-4 ${!areFiltersClear() && "group-hover:animate-spin"}`} />
                    <span class="hidden md:block">Réinitialiser</span>
                </button>

                <Dialog open={open} onClose={setOpen} className="relative z-50">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity duration-500 ease-in-out data-closed:opacity-0"
                    />

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                                <DialogPanel
                                    transition
                                    className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
                                >
                                    <div className="flex h-full flex-col overflow-y-auto bg-white shadow-2xl">
                                        {/* Header */}
                                        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-6">
                                            <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                    <FunnelIcon className="h-5 w-5" />
                                                </span>
                                                Filtres
                                            </DialogTitle>
                                            <button
                                                onClick={() => setOpen(false)}
                                                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors focus:outline-none"
                                            >
                                                <XMarkIcon className="h-6 w-6" />
                                            </button>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 px-6 py-6 space-y-8">
                                            {/* Availability Section */}
                                            <div>
                                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
                                                    Disponibilité
                                                </h3>
                                                <div className="space-y-3">
                                                    {[
                                                        { value: 'all', label: 'Tous' },
                                                        { value: 'in_stock', label: 'En stock immédiat' },
                                                        { value: 'on_order', label: 'Sur commande' },
                                                        { value: 'out_of_stock', label: 'Rupture de Stock' }
                                                    ].map((option) => (
                                                        <label
                                                            key={option.value}
                                                            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${filters.availability === option.value
                                                                    ? "border-primary bg-primary/5 shadow-sm"
                                                                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                                                }`}
                                                        >
                                                            <span className={`text-sm font-medium ${filters.availability === option.value ? "text-primary" : "text-gray-700"
                                                                }`}>
                                                                {option.label}
                                                            </span>
                                                            <div className="relative flex items-center">
                                                                <input
                                                                    type="radio"
                                                                    name="availability"
                                                                    value={option.value}
                                                                    checked={filters.availability === option.value}
                                                                    onChange={() => setFilters(prev => ({ ...prev, availability: option.value }))}
                                                                    className="peer sr-only"
                                                                />
                                                                <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-colors ${filters.availability === option.value
                                                                        ? "border-primary bg-primary"
                                                                        : "border-gray-300 bg-white"
                                                                    }`}>
                                                                    {filters.availability === option.value && (
                                                                        <div className="h-2 w-2 rounded-full bg-white" />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="h-px bg-gray-100" />

                                            {/* Price Section */}
                                            <div>
                                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
                                                    Prix
                                                </h3>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {[
                                                        { value: 'all', label: 'Tous' },
                                                        { value: 1, label: '$' },
                                                        { value: 2, label: '$$' },
                                                        { value: 3, label: '$$$+' }
                                                    ].map((option) => (
                                                        <label
                                                            key={option.value}
                                                            className={`flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${filters.price === option.value
                                                                    ? "border-primary bg-primary/5 shadow-sm"
                                                                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                                                }`}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="price"
                                                                value={option.value}
                                                                checked={filters.price === option.value}
                                                                onChange={() => setFilters(prev => ({ ...prev, price: option.value }))}
                                                                className="sr-only"
                                                            />
                                                            <span className={`text-sm font-medium ${filters.price === option.value ? "text-primary" : "text-gray-700"
                                                                }`}>
                                                                {option.label}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="border-t border-gray-100 px-6 py-6 bg-gray-50">
                                            <button
                                                onClick={clearFilters}
                                                disabled={areFiltersClear()}
                                                className={`w-full rounded-xl py-3 text-sm font-semibold transition-all ${areFiltersClear()
                                                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                        : "bg-white border border-gray-200 text-gray-900 shadow-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                                                    }`}
                                            >
                                                Réinitialiser tous les filtres
                                            </button>
                                        </div>
                                    </div>
                                </DialogPanel>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
            <div className="text-sm text-gray-500 font-medium">
                <span className="text-gray-900 font-bold">{totalProducts}</span> produits trouvés
            </div>
        </div>
    )
}
