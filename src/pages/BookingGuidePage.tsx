import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../styles/BookingGuidePage.css';
import { pageMetadata } from '../utils/seoHelpers';

const BookingGuidePage = () => {
  const navigate = useNavigate();

  const handleContactFormClick = () => {
    navigate('/');
    // Scroll to contact section after navigation
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  return (
    <>
      <Helmet>
        <title>{pageMetadata.bookingGuide.title}</title>
        <meta name="description" content={pageMetadata.bookingGuide.description} />
        <meta name="keywords" content={pageMetadata.bookingGuide.keywords} />
        <link rel="canonical" href={pageMetadata.bookingGuide.canonical} />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content={pageMetadata.bookingGuide.ogType} />
        <meta property="og:title" content={pageMetadata.bookingGuide.title} />
        <meta property="og:description" content={pageMetadata.bookingGuide.description} />
        <meta property="og:url" content={pageMetadata.bookingGuide.canonical} />
        <meta property="og:image" content={pageMetadata.bookingGuide.ogImage} />
        
        {/* Twitter Tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={pageMetadata.bookingGuide.title} />
        <meta property="twitter:description" content={pageMetadata.bookingGuide.description} />
        <meta property="twitter:image" content={pageMetadata.bookingGuide.ogImage} />
      </Helmet>
      
      <div className="booking-guide-page">
      <div className="booking-guide-container">
        {/* Header Section */}
        <div className="booking-guide-header">
          <h1>Booking Guide</h1>
          <p>Learn how to easily book your perfect South Road Trips adventure in just a few simple steps.</p>
        </div>

        {/* Main Booking Process */}
        <section className="booking-section">
          <h2>How to Book Your Tour or Vehicle</h2>
          <p className="section-intro">Booking with South Road Trips is quick, easy, and straightforward. Here's our simple 4-step process:</p>

          <div className="booking-steps">
            {/* Step 1 */}
            <div className="booking-step">
              <div className="step-number">1</div>
              <h3>Select Your Tour or Vehicle</h3>
              <p>Browse our collection of exciting tours and well-maintained vehicles. Each listing includes detailed information about what's included, duration, pricing, and availability.</p>
              <ul>
                <li>Read descriptions and view images</li>
                <li>Check pricing and what's included</li>
                <li>Review customer ratings and testimonials</li>
                <li>Confirm dates and availability</li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="booking-step">
              <div className="step-number">2</div>
              <h3>Click "Book Now"</h3>
              <p>Once you've selected your preferred tour or vehicle, click the "Book Now" button. You'll be given two options for contacting us:</p>
              <ul>
                <li><strong>WhatsApp Chat:</strong> You will be redirected to a WhatsApp conversation with our agent</li>
                <li><strong>Phone Call:</strong> Call us directly to discuss and finalize your booking</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="booking-step">
              <div className="step-number">3</div>
              <h3>Chat with Our Agent (WhatsApp) or Call</h3>
              <p>Our friendly agents are standing by to assist you. They will:</p>
              <ul>
                <li>Confirm your selected dates and availability</li>
                <li>Discuss any special requirements or preferences</li>
                <li>Answer all your questions</li>
                <li>Provide pricing details and payment information</li>
                <li>Arrange pick-up and drop-off if needed</li>
              </ul>
              <p className="highlight">✓ Most bookings are confirmed instantly through WhatsApp!</p>
            </div>

            {/* Step 4 */}
            <div className="booking-step">
              <div className="step-number">4</div>
              <h3>Complete Payment & Receive Confirmation</h3>
              <p>After finalizing the details, complete your payment using your preferred method:</p>
              <ul>
                <li>Online bank transfer</li>
                <li>Cash payment on arrival</li>
              </ul>
              <p>You'll receive a confirmation email with all booking details, including pickup time, location, what to bring, and our contact information.</p>
            </div>
          </div>
        </section>

        {/* Booking Information Required */}
        <section className="booking-section">
          <h2>Information We'll Need</h2>
          <p>When you contact us, have the following information ready to speed up the booking process:</p>

          <div className="info-grid">
            <div className="info-card">
              <h4>Personal Details</h4>
              <ul>
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Country of residence</li>
              </ul>
            </div>

            <div className="info-card">
              <h4>Booking Details</h4>
              <ul>
                <li>Arrival and departure dates</li>
                <li>Number of passengers</li>
                <li>Pick-up location</li>
                <li>Drop-off location</li>
              </ul>
            </div>

            <div className="info-card">
              <h4>Special Requests</h4>
              <ul>
                <li>Specific interests (wildlife, beaches, culture)</li>
                <li>Dietary requirements</li>
                <li>Accessibility needs</li>
                <li>Language preferences</li>
              </ul>
            </div>

            <div className="info-card">
              <h4>For Vehicle Rental</h4>
              <ul>
                <li>Valid international driving permit or license</li>
                <li>Type of vehicle preference</li>
                <li>Insurance preferences</li>
                <li>Fuel/delivery preferences</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="booking-section">
          <h2>Ways to Contact & Book</h2>

          <div className="contact-methods">
            {/* WhatsApp */}
            <div className="contact-method whatsapp">
              <div className="method-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2.05 22l6.03-1.68C10.07 21.59 11 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2m0 18c-.89 0-1.74-.2-2.5-.55l-.18-.1-1.86.52.54-1.75-.11-.18C4.26 16.55 4 14.35 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8m3.89-12.77c-.37-.18-.87-.09-1.64.12-.52.14-.82.36-1.39.82-.81.75-1.48 1.72-1.63 2.84-.1.69.18 1.46.96 2.24.27.27.73.75 1.66 1.59.93.84 1.64 1.01 2.05 1.09.89.17 1.65-.09 2.14-.48.23-.19.42-.43.57-.71.05-.1.09-.21.08-.32-.01-.1-.04-.2-.08-.3-.37-.9-1.04-1.86-1.9-2.73-.56-.56-1.19-.98-1.73-1.16z"/>
                </svg>
              </div>
              <h3>WhatsApp</h3>
              <p>Chat with our agents instantly for quick responses and instant booking confirmation.</p>
              <p className="benefit">✓ Fastest response time<br/>✓ Instant confirmation<br/>✓ Share photos & documents easily</p>
              <a href="https://wa.me/94764549169" className="cta-link">Start WhatsApp Chat</a>
            </div>

            {/* Phone */}
            <div className="contact-method phone">
              <div className="method-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <h3>Phone Call</h3>
              <p>Prefer to speak directly? Call our team and book over the phone with personalized assistance.</p>
              <p className="benefit">✓ Personal consultation<br/>✓ Immediate booking assistance<br/>✓ Direct conversation</p>
              <a href="tel:+94764549169" className="cta-link">Call Now</a>
            </div>
            
          </div>
        </section>

        {/* Payment Methods */}
        <section className="booking-section">
          <h2>Payment Methods</h2>
          <p>We accept the following payment methods:</p>

          <div className="payment-methods">
            <div className="payment-method">
              <h4>Online Bank Transfer</h4>
              <p>Direct transfer to our business account via online banking. Bank details will be provided during booking for secure and convenient payment.</p>
            </div>
            <div className="payment-method">
              <h4>Cash Payment</h4>
              <p>Pay in cash upon arrival at pickup. This option is available for flexible payment arrangements during your booking.</p>
            </div>
          </div>
        </section>

        {/* Modifications & Cancellations */}
        <section className="booking-section">
          <h2>Modifications & Cancellations</h2>

          <div className="modification-cards">
            <div className="mod-card">
              <h3>Change Your Booking</h3>
              <p>Need to modify your dates or details? Contact us as soon as possible:</p>
              <ul>
                <li>Changes depend on availability</li>
                <li>Earlier modifications are usually free</li>
                <li>Last-minute changes may incur fees</li>
                <li>Contact us via WhatsApp or phone</li>
              </ul>
            </div>

            <div className="mod-card">
              <h3>Cancel Your Booking</h3>
              <p>If you need to cancel, reach out immediately:</p>
              <ul>
                <li>Cancellation terms apply based on timing</li>
                <li>Earlier cancellations receive better refunds</li>
                <li>Processing takes 5-10 business days</li>
                <li>Contact us for cancellation details</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Group Bookings */}
        <section className="booking-section">
          <h2>Group Bookings</h2>
          <p>Planning a group adventure? We offer special rates and customized packages for groups!</p>

          <div className="group-benefits">
            <h4>Group Booking Benefits:</h4>
            <ul>
              <li>Special discounted rates based on group size</li>
              <li>Customized itineraries tailored to your group's interests</li>
              <li>Flexible payment terms</li>
              <li>Dedicated account manager for your group</li>
              <li>Priority availability and scheduling</li>
            </ul>
          </div>

          <p className="group-cta">
            <strong>Ready to book a group trip?</strong> Contact us via WhatsApp or phone and mention your group size to receive a customized quote!
          </p>
        </section>

        {/* Tips for Smooth Booking */}
        <section className="booking-section">
          <h2>Tips for a Smooth Booking Experience</h2>

          <div className="tips-grid">
            <div className="tip">
              <div className="tip-icon">📅</div>
              <h4>Book in Advance</h4>
              <p>Book at least 2-3 weeks ahead for better availability, especially during peak season (December-April).</p>
            </div>

            <div className="tip">
              <div className="tip-icon">📝</div>
              <h4>Have Details Ready</h4>
              <p>Keep your travel dates, passport info, and requirements ready to speed up the booking process.</p>
            </div>

            <div className="tip">
              <div className="tip-icon">❓</div>
              <h4>Ask Questions</h4>
              <p>Don't hesitate to ask about special arrangements, costs, or any concerns. Our team is here to help!</p>
            </div>

            <div className="tip">
              <div className="tip-icon">💬</div>
              <h4>Use WhatsApp</h4>
              <p>WhatsApp is the fastest way to get instant responses and confirm your booking immediately.</p>
            </div>

            <div className="tip">
              <div className="tip-icon">📸</div>
              <h4>Verify Details</h4>
              <p>Review your confirmation email carefully and contact us immediately if anything is incorrect.</p>
            </div>

            <div className="tip">
              <div className="tip-icon">🎒</div>
              <h4>Prepare Ahead</h4>
              <p>Check our blog for packing tips, safety guides, and travel advice before your journey.</p>
            </div>
          </div>
        </section>

        {/* Contact & FAQ Links */}
        <section className="booking-section faq-link-section">
          <h2>More Questions?</h2>
          <p>Check out our comprehensive <a href="/faqs">Frequently Asked Questions</a> page for answers to common queries about bookings, vehicles, tours, safety, and more.</p>
          <p style={{marginTop: '20px'}}>Or <button onClick={handleContactFormClick} style={{cursor: 'pointer', background: 'none', border: 'none', padding: 0, color: '#ff6b35', textDecoration: 'underline', fontSize: 'inherit', fontWeight: 'inherit'}}>contact us directly</button> using our contact form on the home page.</p>
        </section>

        {/* Final CTA */}
        <div className="booking-guide-cta">
          <h2>Ready to Start Your Adventure?</h2>
          <p>Book your perfect South Road Trips experience today!</p>
          <div className="cta-buttons">
            <a href="https://wa.me/94764549169" className="cta-btn primary">
              Chat on WhatsApp
            </a>
            <a href="tel:+94764549169" className="cta-btn secondary">
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default BookingGuidePage;
