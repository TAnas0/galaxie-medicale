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
      {/* Unified Pill Navigation (Scrollable on mobile, flex-wrap or scroll on desktop depending on preference, here scrollable for consistency) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleChange(cat.value)}
            className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out whitespace-nowrap ${filters.category === cat.value
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
