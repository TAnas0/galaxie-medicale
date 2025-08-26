export default function ProductToolbar({ filters, setFilters }) {
    // const [activeCategory, setActiveCategory] = useState("all");

    return (
        <div className="flex bg-white dark:bg-muted-800 border border-gray-500 dark:border-muted-700 rounded divide-x divide-gray-500 dark:divide-muted-700 shadow-md shadow-primary/10 overflow-x-auto">
            <button
                className={`group flex-1 flex items-center justify-center px-5 py-3 whitespace-nowrap font-sans text-muted-800 dark:text-muted-100 hover:bg-muted-50 dark:hover:bg-muted-700 transition-colors duration-300 cursor-pointer ${filters.category === "all" ? "bg-primary/50 font-semibold" : ""
                    }`}
                onClick={() => {
                    setFilters((prev) => ({ ...prev, category: 'all' }))
                }}
            >
                Tous
            </button>

            <button
                className={`group flex-1 flex items-center justify-center px-5 py-3 whitespace-nowrap font-sans text-muted-800 dark:text-muted-100 hover:bg-muted-50 dark:hover:bg-muted-700 transition-colors duration-300 cursor-pointer ${filters.category === "medical_furniture" ? "bg-primary/50 font-semibold" : ""
                    }`}
                onClick={() => {
                    setFilters((prev) => ({ ...prev, category: 'medical_furniture' }))
                }}
            >
                Mobilier Médical
            </button>

            <button
                className={`group flex-1 flex items-center justify-center px-5 py-3 whitespace-nowrap font-sans text-muted-800 dark:text-muted-100 hover:bg-muted-50 dark:hover:bg-muted-700 transition-colors duration-300 cursor-pointer ${filters.category === "diagnostic_equipment" ? "bg-primary/50 font-semibold" : ""
                    }`}
                onClick={() => {
                    setFilters((prev) => ({ ...prev, category: 'diagnostic_equipment' }))
                }}
            >
                Diagnostique
            </button>

            <button
                className={`group flex-1 flex items-center justify-center px-5 py-3 whitespace-nowrap font-sans text-muted-800 dark:text-muted-100 hover:bg-muted-50 dark:hover:bg-muted-700 transition-colors duration-300 cursor-pointer ${filters.category === "emergency" ? "bg-primary/50 font-semibold" : ""
                    }`}
                onClick={() => {
                    setFilters((prev) => ({ ...prev, category: 'emergency' }))
                }}
            >
                Urgences
            </button>

            <button
                className={`group flex-1 flex items-center justify-center px-5 py-3 whitespace-nowrap font-sans text-muted-800 dark:text-muted-100 hover:bg-muted-50 dark:hover:bg-muted-700 transition-colors duration-300 cursor-pointer ${filters.category === "surgery" ? "bg-primary/50 font-semibold" : ""
                    }`}
                onClick={() => {
                    setFilters((prev) => ({ ...prev, category: 'surgery' }))
                }}
            >
                Chirurgie
            </button>

            <button
                className={`group flex-1 flex items-center justify-center px-5 py-3 whitespace-nowrap font-sans text-muted-800 dark:text-muted-100 hover:bg-muted-50 dark:hover:bg-muted-700 transition-colors duration-300 cursor-pointer ${filters.category === "sterilization" ? "bg-primary/50 font-semibold" : ""
                    }`}
                onClick={() => {
                    setFilters((prev) => ({ ...prev, category: 'sterilization' }))
                }}
            >
                Stérilisation
            </button>

            <button
                className={`group flex-1 flex items-center justify-center px-5 py-3 whitespace-nowrap font-sans text-muted-800 dark:text-muted-100 hover:bg-muted-50 dark:hover:bg-muted-700 transition-colors duration-300 cursor-pointer ${filters.category === "accessories_consummables" ? "bg-primary/50 font-semibold" : ""
                    }`}
                onClick={() => {
                    setFilters((prev) => ({ ...prev, category: 'accessories_consummables' }))
                }}
            >
                Accessoires/Consommables
            </button>

        </div>
    );
}
