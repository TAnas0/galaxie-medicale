import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export default function ProductCarousel({ images }) {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/3]">
        <div className="absolute inset-0 flex items-center justify-center rounded-lg shadow-xl border border-gray-300 p-2">
          <img
            src={images[index].src}
            alt={images[index].alt || `Slide ${index + 1}`}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Arrows left and right */}
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-white/70 border border-gray-500 rounded-full flex items-center justify-center shadow-lg hover:bg-white/90 cursor-pointer transition">
          <button
            onClick={() => setIndex((index - 1 + images.length) % images.length)}
            className="text-xl md:text-2xl lg:text-3xl select-none cursor-pointer"
          >
            <ChevronLeftIcon className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" />
          </button>
        </div>

        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-white/70 border border-gray-500 rounded-full flex items-center justify-center shadow-lg hover:bg-white/90 cursor-pointer transition">
          <button
            onClick={() => setIndex((index + 1) % images.length)}
            className="text-xl md:text-2xl lg:text-3xl select-none cursor-pointer"
          >
            <ChevronRightIcon className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" />
          </button>
        </div>

      </div>
      <div className="flex gap-2 mt-2 justify-center">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img.src}
            alt={img.alt || `Thumb ${idx + 1}`}
            className={`w-16 h-16 object-cover cursor-pointer rounded-lg shadow-lg ${idx === index ? 'border-2 border-primary' : ''}`}
            onClick={() => setIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}
