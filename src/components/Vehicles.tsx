import { useEffect } from 'react';
import './Vehicles.css';
import scooter from '../assets/vehicles/scooter.png'
import motorbike from '../assets/vehicles/motorbike.jpg'
import tuktuk from '../assets/vehicles/tuktuk.png'
import car from '../assets/vehicles/car.png'
import { injectStructuredData, removeStructuredData } from '../utils/structuredData';
import { CANONICAL_DOMAIN } from '../utils/seoHelpers';

const Vehicles = () => {
  // Inject structured data for vehicles on component mount
  useEffect(() => {
    // Scooter Rental Service Product Data
    const scooterData = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: 'Scooter Rental Service',
      description: 'Fuel efficient automatic scooter rentals perfect for solo travelers and city exploration',
      image: scooter,
      url: `${CANONICAL_DOMAIN}/#vehicles`,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'LKR',
        price: 'Contact for pricing',
        availability: 'https://schema.org/InStock',
        url: 'https://wa.me/94764549169?text=Hi!%20I\'m%20interested%20in%20booking%20a%20Scooter%20rental.%20Can%20you%20provide%20pricing%20details%3F',
      },
    };

    // Car Rental Service Product Data
    const carData = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: 'Car Rental Service',
      description: 'Comfortable automatic cars with air conditioning, perfect for families and groups of up to 5 passengers',
      image: car,
      url: `${CANONICAL_DOMAIN}/#vehicles`,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'LKR',
        price: 'Contact for pricing',
        availability: 'https://schema.org/InStock',
        url: 'https://wa.me/94764549169?text=Hi!%20I\'m%20interested%20in%20booking%20a%20Car%20rental.%20Can%20you%20provide%20pricing%20details%3F',
      },
    };

    // Inject both product data
    injectStructuredData(scooterData, 'scooter-product-schema');
    injectStructuredData(carData, 'car-product-schema');

    // Cleanup on unmount
    return () => {
      removeStructuredData('scooter-product-schema');
      removeStructuredData('car-product-schema');
    };
  }, []);
  const vehicles = [
    {
      name: 'Scooter',
      category: 'Solo Travel',
      passengers: 1,
      luggage: 1,
      transmission: 'Automatic',
      features: ['Fuel Efficient', 'Easy Parking', 'Perfect for City', 'Helmet Included'],
      image: scooter
    },
    {
      name: 'Motorbike',
      category: 'Adventure',
      passengers: 2,
      luggage: 1,
      transmission: 'Manual',
      features: ['Powerful Engine', 'Long Distance', 'Comfortable Ride', 'Safety Gear'],
      image: motorbike
    },
    {
      name: 'Tuk Tuk',
      category: 'Local Experience',
      passengers: 3,
      luggage: 2,
      transmission: 'Manual',
      features: ['Authentic Experience', 'Great for Tours', 'Economical', 'Easy Maneuver'],
      image: tuktuk
    },
    {
      name: 'Car',
      category: 'Comfort',
      passengers: 5,
      luggage: 3,
      transmission: 'Automatic',
      features: ['Air Conditioning', 'Comfortable Seats', 'Music System', 'GPS Navigation'],
      image: car    }
  ];

  return (
    <section className="vehicles-section" id="vehicles">
      <div className="vehicles-container">
        <div className="vehicles-header">
          <h2 className="vehicles-title">Our Premium Fleet</h2>
          <p className="vehicles-subtitle">
            Choose from our diverse range of well-maintained vehicles to suit your needs
          </p>
        </div>
        <div className="vehicles-grid">
          {vehicles.map((vehicle, index) => (
            <div key={index} className="vehicle-card">
              <div className="vehicle-image-wrapper">
                <img src={vehicle.image} alt={vehicle.name} className="vehicle-image" />
                <span className="vehicle-category">{vehicle.category}</span>
              </div>
              <div className="vehicle-content">
                <h3 className="vehicle-name">{vehicle.name}</h3>
                <div className="vehicle-specs">
                  <div className="spec">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2"/>
                      <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>{vehicle.passengers}</span>
                  </div>
                  <div className="spec">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V6Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>{vehicle.luggage}</span>
                  </div>
                  <div className="spec">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span>{vehicle.transmission}</span>
                  </div>
                </div>
                <div className="vehicle-features">
                  {vehicle.features.map((feature, idx) => (
                    <span key={idx} className="feature-tag">{feature}</span>
                  ))}
                </div>
                <div className="vehicle-footer">
                  <a 
                    href={`https://wa.me/94764549169?text=Hi!%20I'm%20interested%20in%20booking%20a%20${encodeURIComponent(vehicle.name)}%20(${vehicle.category}).%20Can%20you%20provide%20more%20details%3F`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="book-vehicle-btn"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Vehicles;
