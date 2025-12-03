import React, { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import productsData from '../../data/products-full.json';

const SEARCH_OPTIONS = {
    keys: [
        { name: 'name.fr', weight: 2 },
        { name: 'name.en', weight: 2 },
        { name: 'short_description.fr', weight: 1 },
        { name: 'short_description.en', weight: 1 },
        { name: 'attributes.value', weight: 0.5 },
        { name: 'category.display.fr', weight: 0.8 },
        { name: 'brand.name', weight: 0.8 }
    ],
    threshold: 0.3,
    includeScore: true,
    ignoreLocation: true,
    minMatchCharLength: 2,
};

export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [fuse, setFuse] = useState(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        // Initialize Fuse lazily
        const fuseInstance = new Fuse(productsData, SEARCH_OPTIONS);
        setFuse(fuseInstance);
    }, []);

    useEffect(() => {
        if (!query || !fuse) {
            setResults([]);
            return;
        }

        const searchResults = fuse.search(query).slice(0, 10); // Limit to top 10
        setResults(searchResults);
        setIsOpen(true);
    }, [query, fuse]);

    useEffect(() => {
        // Close dropdown when clicking outside
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const handleSelect = (product) => {
        window.location.href = `/galaxie-medicale/products/${product.id}`;
        setIsOpen(false);
        setQuery('');
    };

    return (
        <div ref={wrapperRef} className="relative w-full max-w-xs lg:max-w-md mx-4">
            <div className="relative">
                <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-gray-700 placeholder-gray-400 bg-gray-50/50"
                    placeholder="Rechercher..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length > 0 && setIsOpen(true)}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            {isOpen && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 max-h-[80vh] overflow-y-auto">
                    <div className="py-2">
                        {results.map(({ item }) => (
                            <button
                                key={item.id}
                                onClick={() => handleSelect(item)}
                                className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-start gap-3 border-b border-gray-50 last:border-0"
                            >
                                <div className="w-12 h-12 flex-shrink-0 bg-white rounded-lg border border-gray-100 p-1">
                                    <img
                                        src={item.images?.[0]?.src || "https://placehold.co/100x100"}
                                        alt={item.name.fr || item.name.en}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">
                                        {item.name.fr || item.name.en}
                                    </h4>
                                    <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                                        {item.category?.display?.fr || item.category?.display?.en}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {isOpen && query.length > 2 && results.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-4 text-center z-50">
                    <p className="text-sm text-gray-500">Aucun résultat trouvé pour "{query}"</p>
                </div>
            )}
        </div>
    );
}
