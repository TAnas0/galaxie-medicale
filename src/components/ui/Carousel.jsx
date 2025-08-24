import { useState } from 'react';

export default function ProductCarousel({ images }) {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/3]">
        <img
          src={images[index].src}
          alt={images[index].alt || `Slide ${index + 1}`}
          className="absolute top-0 left-0 w-full h-full rounded-lg"
        />
        <button onClick={() => setIndex((index - 1 + images.length) % images.length)}
                className="absolute left-2 top-1/2">‹</button>
        <button onClick={() => setIndex((index + 1) % images.length)}
                className="absolute right-2 top-1/2">›</button>
      </div>
      <div className="flex gap-2 mt-2">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img.src}
            alt={img.alt || `Thumb ${idx + 1}`}
            className={`w-16 h-16 object-cover cursor-pointer rounded-lg ${idx === index ? 'border-2 border-primary' : ''}`}
            onClick={() => setIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}
