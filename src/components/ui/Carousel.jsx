import { useState, useEffect, useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function ProductCarousel({ images }) {
  const [index, setIndex] = useState(0);

  const prev = useCallback(
    () => setIndex((prev) => (prev - 1 + images.length) % images.length),
    [images.length]
  );

  const next = useCallback(
    () => setIndex((prev) => (prev + 1) % images.length),
    [images.length]
  );

  // --- Keyboard navigation (← →)
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next]);

  const arrowBtnClasses =
    "absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 border border-gray-400 rounded-full flex items-center justify-center shadow-md hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div
      className="relative select-none"
      role="region"
      aria-roledescription="carousel"
      aria-label="Product image carousel"
      tabIndex={0}
    >
      {/* Main image */}
      <div className="aspect-[4/3] flex items-center justify-center bg-white/80 rounded-lg overflow-hidden border border-gray-200">
        <img
          src={images[index].src}
          alt={images[index].alt || `Image ${index + 1}`}
          className="object-contain max-w-full max-h-full"
          loading="lazy"
        />
      </div>

      {/* Navigation arrows */}
      <button aria-label="Previous image" className={`${arrowBtnClasses} left-2`} onClick={prev}>
        <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
      </button>

      <button aria-label="Next image" className={`${arrowBtnClasses} right-2`} onClick={next}>
        <ChevronRightIcon className="w-6 h-6 text-gray-700" />
      </button>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-2 justify-center">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setIndex(idx)}
            className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
              idx === index ? "border-primary" : "border-transparent"
            } focus:outline-none focus:ring-2 focus:ring-primary`}
            aria-label={`Go to image ${idx + 1}`}
            aria-current={idx === index ? "true" : "false"}
          >
            <img
              src={img.src}
              alt={img.alt || `Thumbnail ${idx + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
