import { useState, useEffect } from 'react';

export default function ProductToolbar({ filters, setFilters }) {
    // const [activeCategory, setActiveCategory] = useState("all");
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const categoryFromUrl = params.get('category');
        console.log(categoryFromUrl)
        if (categoryFromUrl) {
            setFilters(prev => ({ ...prev, category: categoryFromUrl }));
        }
    }, []);

    function handleChange(newCategory) {
        // Update URL without full reload
        window.history.pushState({}, "", `/galaxie-medicale/catalog/${newCategory}`);    
        // window.location.reload();
    }

    if (!filters) return null;
    return (
        <div>
            <div className="flex bg-white border border-gray-500 rounded divide-x divide-gray-500 shadow-md shadow-primary/10 overflow-x-auto">
                <button
                    className={`group flex-1 flex items-center justify-center px-5 py-3 whitespace-nowrap font-sans text-muted-800 dark:text-muted-100 hover:bg-muted-50 dark:hover:bg-muted-700 transition-colors duration-300 cursor-pointer ${filters.category === "all" ? "bg-primary/50 font-semibold" : ""
                        }`}
                    onClick={() => {
                        setFilters((prev) => ({ ...prev, category: 'all' }));
                        handleChange("all")
                    }}
                >
                    Tous
                </button>

                <button
                    className={`group flex-1 flex items-center justify-center px-5 py-3 whitespace-nowrap font-sans text-muted-800 dark:text-muted-100 hover:bg-muted-50 dark:hover:bg-muted-700 transition-colors duration-300 cursor-pointer ${filters.category === "medical_furniture" ? "bg-primary/50 font-semibold" : ""
                        }`}
                    onClick={() => {
                        setFilters((prev) => ({ ...prev, category: 'medical_furniture' }));
                        handleChange("medical_furniture")
                    }}
                >
                    Mobilier Médical
                </button>

                <button
                    className={`group flex-1 flex items-center justify-center px-5 py-3 whitespace-nowrap font-sans text-muted-800 dark:text-muted-100 hover:bg-muted-50 dark:hover:bg-muted-700 transition-colors duration-300 cursor-pointer ${filters.category === "diagnostic" ? "bg-primary/50 font-semibold" : ""
                        }`}
                    onClick={() => {
                        setFilters((prev) => ({ ...prev, category: 'diagnostic' }))
                        handleChange("diagnostic")
                    }}
                >
                    Diagnostique
                </button>

                <button
                    className={`group flex-1 flex items-center justify-center px-5 py-3 whitespace-nowrap font-sans text-muted-800 dark:text-muted-100 hover:bg-muted-50 dark:hover:bg-muted-700 transition-colors duration-300 cursor-pointer ${filters.category === "emergency" ? "bg-primary/50 font-semibold" : ""
                        }`}
                    onClick={() => {
                        setFilters((prev) => ({ ...prev, category: 'emergency' }))
                        handleChange("emergency")
                    }}
                >
                    Urgences
                </button>

                <button
                    className={`group flex-1 flex items-center justify-center px-5 py-3 whitespace-nowrap font-sans text-muted-800 dark:text-muted-100 hover:bg-muted-50 dark:hover:bg-muted-700 transition-colors duration-300 cursor-pointer ${filters.category === "surgery" ? "bg-primary/50 font-semibold" : ""
                        }`}
                    onClick={() => {
                        setFilters((prev) => ({ ...prev, category: 'surgery' }))
                        handleChange("surgery")
                    }}
                >
                    Chirurgie
                </button>

                <button
                    className={`group flex-1 flex items-center justify-center px-5 py-3 whitespace-nowrap font-sans text-muted-800 dark:text-muted-100 hover:bg-muted-50 dark:hover:bg-muted-700 transition-colors duration-300 cursor-pointer ${filters.category === "sterilisation" ? "bg-primary/50 font-semibold" : ""
                        }`}
                    onClick={() => {
                        setFilters((prev) => ({ ...prev, category: 'sterilisation' }))
                        handleChange("sterilisation")
                    }}
                >
                    Stérilisation
                </button>

                <button
                    className={`group flex-1 flex items-center justify-center px-5 py-3 whitespace-nowrap font-sans text-muted-800 dark:text-muted-100 hover:bg-muted-50 dark:hover:bg-muted-700 transition-colors duration-300 cursor-pointer ${filters.category === "accessories_consummables" ? "bg-primary/50 font-semibold" : ""
                        }`}
                    onClick={() => {
                        setFilters((prev) => ({ ...prev, category: 'accessories_consummables' }))
                        handleChange("accessories_consummables")
                    }}
                >
                    Accessoires/Consommables
                </button>
            </div>


        </div>
    );
}
