import { useState, useEffect } from 'react';
import './HeaderSlideshow.css';

// Import images
import image1 from '../assets/header-images/header-img1.jpg';
import image2 from '../assets/header-images/header-img2.jpg';
import image3 from '../assets/header-images/header-img3.jpg';

const HeaderSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: image1,
      title: 'Adventure Awaits',
      subtitle: 'Explore the beauty of South Road with our premium vehicles'
    },
    {
      image: image2,
      title: 'Unforgettable Journeys',
      subtitle: 'Create memories that last a lifetime'
    },
    {
      image: image3,
      title: 'Your Journey Begins',
      subtitle: 'Comfortable rides, scenic routes, amazing experiences'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="slideshow-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
        >
          <img src={slide.image} alt={slide.title} />
          <div className="slide-overlay"></div>
          <div className="slide-content">
            <h1 className="slide-title">{slide.title}</h1>
            <p className="slide-subtitle">{slide.subtitle}</p>
            <a 
              href="https://wa.me/94764549169?text=Hi%20South%20Road%20Trips!%20I'm%20interested%20in%20booking%20a%20tour%20or%20vehicle.%20Can%20you%20help%20me%3F" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="slide-cta"
            >
              Explore Now
            </a>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button className="slide-arrow prev" onClick={prevSlide}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button className="slide-arrow next" onClick={nextSlide}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="slide-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlideshow;
