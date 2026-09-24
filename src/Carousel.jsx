import { useEffect, useState } from 'react';

function Carousel({ images, alt, placeholderLabel }) {
  const [index, setIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);

  const imageKey = images ? images.join('|') : '';

  useEffect(() => {
    setIndex(0);
    setImageFailed(false);
  }, [imageKey]);

  if (!images || images.length === 0) {
    return (
      <div className="image-placeholder small">
        <span>{placeholderLabel}</span>
      </div>
    );
  }

  const goTo = (nextIndex, event) => {
    event.preventDefault();
    event.stopPropagation();
    setIndex((nextIndex + images.length) % images.length);
    setImageFailed(false);
  };

  return (
    <div className="carousel" role="region" aria-label={`Galeria: ${alt}`}>
      {imageFailed ? (
        <div className="image-placeholder small">
          <span>Não foi possível carregar esta foto</span>
        </div>
      ) : (
        <img
          key={images[index]}
          src={images[index]}
          alt={`${alt}, foto ${index + 1} de ${images.length}`}
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
        />
      )}
      {images.length > 1 && !imageFailed && (
        <>
          <button type="button" className="carousel-arrow carousel-prev" aria-label="Foto anterior" onClick={(event) => goTo(index - 1, event)}>‹</button>
          <button type="button" className="carousel-arrow carousel-next" aria-label="Próxima foto" onClick={(event) => goTo(index + 1, event)}>›</button>
          <div className="carousel-dots">
            {images.map((image, dotIndex) => (
              <button
                type="button"
                key={image}
                className={dotIndex === index ? 'carousel-dot is-active' : 'carousel-dot'}
                aria-label={`Ver foto ${dotIndex + 1} de ${images.length}`}
                aria-current={dotIndex === index ? 'true' : undefined}
                onClick={(event) => goTo(dotIndex, event)}
              />
            ))}
          </div>
          <span className="sr-only" aria-live="polite">Foto {index + 1} de {images.length}</span>
        </>
      )}
    </div>
  );
}

export default Carousel;
