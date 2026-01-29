import { useState, useEffect, useRef } from 'react';

export default function ProductToolbar({ filters, setFilters }) {
  const scrollRef = useRef(null);
  const [showRightFade, setShowRightFade] = useState(false);
  const [showLeftFade, setShowLeftFade] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftFade(scrollLeft > 10);
      setShowRightFade(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryFromUrl = params.get("category");
    if (categoryFromUrl) {
      setFilters((prev) => ({ ...prev, category: categoryFromUrl }));
    }

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
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
    <div className="w-full relative group overflow-hidden">
      {/* Left Fade */}
      <div 
        className={`absolute left-0 top-0 bottom-2 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${showLeftFade ? 'opacity-100' : 'opacity-0'}`}
      />
      
      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
      >
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

      {/* Right Fade */}
      <div 
        className={`absolute right-0 top-0 bottom-2 w-48 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${showRightFade ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
