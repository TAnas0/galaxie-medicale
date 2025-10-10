import { useState, useEffect } from 'react';

export default function ProductToolbar({ filters, setFilters }) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryFromUrl = params.get("category");
    if (categoryFromUrl) {
      setFilters((prev) => ({ ...prev, category: categoryFromUrl }));
    }
  }, []);

  const handleChange = (category) => {
    setFilters((prev) => ({ ...prev, category }));
    window.history.pushState({}, "", `/galaxie-medicale/catalog/${category}`);
  };

  const categories = [
    { value: "all", label: "Tous" },
    { value: "medical_furniture", label: "Mobilier Médical" },
    { value: "diagnostic", label: "Diagnostique" },
    { value: "emergency", label: "Urgences" },
    { value: "surgery", label: "Chirurgie" },
    { value: "sterilisation", label: "Stérilisation" },
    { value: "accessories_consumables", label: "Accessoires/Consommables" },
  ];

  return (
    <div className="w-full">
      {/* Desktop: button row */}
      <div className="hidden md:flex bg-white border border-gray-500 rounded divide-x divide-gray-500 shadow-md shadow-primary/10 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleChange(cat.value)}
            className={`flex-1 px-4 py-3 whitespace-nowrap transition-colors duration-300 cursor-pointer ${
              filters.category === cat.value
                ? "bg-primary/50 font-semibold"
                : "hover:bg-muted-50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Mobile: dropdown */}
      <div className="md:hidden flex items-center gap-4 border-b border-gray-200 pb-1 px-2">
        <div>
          Catégorie:
        </div>
        <select
          value={filters.category || "all"}
          onChange={(e) => handleChange(e.target.value)}
          className="w-fit border border-gray-500 rounded px-3 py-2 shadow-sm focus:ring-primary focus:border-primary"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
