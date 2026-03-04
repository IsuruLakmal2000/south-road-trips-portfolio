import './Contact.css';

const Contact = () => {
  const whatsappNumber = '94764549169';

  const quickMessages = [
    {
      title: 'Vehicle Rental Inquiry',
      message: 'Hi South Road Trips! I\'d like to inquire about vehicle rentals. Can you provide more information?',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      title: 'Tour Booking',
      message: 'Hi! I\'m interested in booking a tour. Can you share the available tour packages and details?',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      title: 'Airport Shuttle',
      message: 'Hello! I need airport transfer service. Can you help me with the booking?',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: 'Custom Package',
      message: 'Hi! I\'m looking for a custom tour package. Can we discuss my requirements?',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  const openWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">Get In Touch</h2>
          <p className="contact-subtitle">
            Reach us instantly via WhatsApp for quick responses and bookings
          </p>
        </div>

        <div className="contact-content">
          {/* WhatsApp Contact Options */}
          <div className="whatsapp-contact-wrapper">
            <div className="whatsapp-hero">
              <div className="whatsapp-hero-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <h3>Chat with Us on WhatsApp</h3>
              <p>Get instant responses to your inquiries</p>
              <a 
                href={`https://wa.me/${whatsappNumber}?text=Hi%20South%20Road%20Trips!%20I%20have%20a%20question.`}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-main-btn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Start WhatsApp Chat
              </a>
            </div>

            <div className="quick-messages">
              <h4>Quick Contact Options</h4>
              <p className="quick-messages-subtitle">Choose a topic to start chatting</p>
              <div className="quick-messages-grid">
                {quickMessages.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => openWhatsApp(item.message)}
                    className="quick-message-btn"
                  >
                    <div className="quick-message-icon">{item.icon}</div>
                    <span>{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Visit Us</h3>
              <p>South Road Trips<br/>Visuddarama Road<br/>Ahangama, Sri Lanka</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92V19.92C22 20.4696 21.5523 20.9186 21.0034 20.9285C20.0384 20.9482 19.0826 20.7946 18.18 20.48C14.93 19.36 12.07 17.22 10 14.47C7.53 11.36 5.84 7.73 5.09 3.89C4.97 3.24 5.39 2.61 6.04 2.48C6.46 2.39 6.89 2.34 7.32 2.34C7.87 2.34 8.32 2.79 8.32 3.34V6.09C8.32 6.59 7.96 7 7.47 7.09C6.89 7.19 6.37 7.54 6.08 8.06L4.82 10.35C6.24 13.57 8.43 16.35 11.35 18.32L13.81 17.21C14.37 16.95 15.03 17.02 15.52 17.39C15.87 17.66 16.29 17.83 16.75 17.83H19.68C20.23 17.83 20.68 18.28 20.68 18.83C20.68 19.53 20.61 20.23 20.48 20.92C20.39 21.47 19.94 21.92 19.39 21.92H22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Call Us</h3>
              <p>+94764549169<br/>Available 24/7</p>
            </div>

            

            <div className="info-card">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Email Us</h3>
              <p>info@southroadtrips.com<br/>support@southroadtrips.com</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Business Hours</h3>
              <p>Mon - Fri: 8:00 AM - 8:00 PM<br/>Sat - Sun: 9:00 AM - 6:00 PM</p>
            </div>

            <div className="social-links">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="https://web.facebook.com/profile.php?id=61573455397293" className="social-icon" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                <a href="https://www.instagram.com/southroad_trips/" className="social-icon" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps Location */}
        <div className="map-section">
          <div className="map-header">
            <h3>Find Us on Map</h3>
            <p>Visit our office for personalized service and assistance</p>
          </div>
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31745.449573286278!2d80.33675193786618!3d5.9697658511560725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae115b2a5f448c7%3A0x8b2d238c24002d11!2sSouth%20Road%20Trips!5e0!3m2!1sen!2slk!4v1772615428392!5m2!1sen!2slk" 
              width="600" 
              height="450" 
              style={{border: "0"}}
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="map-link">
            <a
              href="https://maps.app.goo.gl/B3Y31b99zMrxPwZK9"
              target="_blank"
              rel="noopener noreferrer"
              className="open-map-btn"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
