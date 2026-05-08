import { useState } from 'react';
import '../styles/FAQPage.css';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const FAQPage = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const faqs: FAQ[] = [
    // Booking & Reservation
    {
      id: 1,
      category: 'Booking & Reservation',
      question: 'How do I book a tour or vehicle rental?',
      answer: 'Booking is easy! Select your preferred tour or vehicle, click the "Book Now" button, and you will be redirected to a WhatsApp chat with our agent. Our team will confirm availability, check details, and finalize your reservation instantly. Alternatively, you can call us directly to make a reservation over the phone.'
    },
    {
      id: 2,
      category: 'Booking & Reservation',
      question: 'Can I book directly without WhatsApp?',
      answer: 'Yes! If you prefer not to use WhatsApp, you can contact us directly by phone to make your reservation. Our friendly team will assist you with all the details and help you secure your booking.'
    },
    {
      id: 3,
      category: 'Booking & Reservation',
      question: 'What information do I need to provide when booking?',
      answer: 'When booking, please provide: your name, email, phone number, dates of travel, number of passengers, preferred vehicle or tour, and any special requirements. This helps us confirm availability and process your reservation smoothly.'
    },
    {
      id: 4,
      category: 'Booking & Reservation',
      question: 'How long does it take to confirm a booking?',
      answer: 'Most bookings are confirmed instantly through our WhatsApp chat. Our agents are responsive and will typically confirm availability and finalize your reservation within minutes during business hours.'
    },

    // Vehicles
    {
      id: 5,
      category: 'Vehicles',
      question: 'What types of vehicles do you offer?',
      answer: 'We offer a range of well-maintained vehicles including scooters, motorcycles, cars, and vans suitable for different group sizes and travel needs. Each vehicle is regularly serviced and equipped with safety features.'
    },
    {
      id: 6,
      category: 'Vehicles',
      question: 'Do you require a valid driving license?',
      answer: 'Yes, renters must have a valid international driving permit or a valid motorcycle/car license depending on the vehicle type. Please bring the original document at pickup.'
    },
    {
      id: 7,
      category: 'Vehicles',
      question: 'Is vehicle insurance included?',
      answer: 'Yes, basic insurance is included in all vehicle rentals. However, we recommend additional travel insurance for complete coverage. Details will be discussed during your booking process.'
    },
    {
      id: 8,
      category: 'Vehicles',
      question: 'What is the minimum rental period?',
      answer: 'Most vehicles can be rented for a minimum of 1 day. However, special arrangements can be made for shorter or longer rental periods. Contact us directly to discuss your specific needs.'
    },
    {
      id: 9,
      category: 'Vehicles',
      question: 'Do you offer pick-up and drop-off services?',
      answer: 'Yes! We provide convenient pick-up and drop-off services at airports, hotels, and other locations. Pick-up and drop-off charges may apply based on location. Discuss this during booking.'
    },

    // Tours & Activities
    {
      id: 10,
      category: 'Tours & Activities',
      question: 'Can I customize a tour to fit my preferences?',
      answer: 'Absolutely! We offer custom tour packages tailored to your interests and schedule. Whether you want to focus on wildlife, beaches, culture, or adventure activities, we can arrange it. Contact us to discuss your preferences.'
    },
    {
      id: 11,
      category: 'Tours & Activities',
      question: 'What is included in the guided tours?',
      answer: 'Guided tours typically include a professional guide, vehicle transportation, entrance fees to attractions, and lunch at local restaurants. Specific inclusions vary by tour package. Check the tour details or contact us for specific information.'
    },
    {
      id: 12,
      category: 'Tours & Activities',
      question: 'What should I bring on a tour?',
      answer: 'We recommend bringing: sunscreen (SPF 50+), hat, sunglasses, lightweight clothing, swimming costume, water bottle, camera, and insect repellent. For adventure activities like hiking or water sports, wear appropriate clothing and footwear.'
    },
    {
      id: 13,
      category: 'Tours & Activities',
      question: 'Are tours suitable for families with children?',
      answer: 'Yes! We offer family-friendly tours designed for visitors of all ages. Some activities may have age restrictions for safety reasons. When booking, mention if you have children, and we will recommend suitable tours and provide necessary precautions.'
    },

    // Safety & Health
    {
      id: 14,
      category: 'Safety & Health',
      question: 'Is it safe to travel by scooter in Sri Lanka?',
      answer: 'Yes, when proper safety precautions are taken. Always wear a helmet, follow traffic rules, and adapt your speed to local conditions. Drive defensively, especially in villages and during nighttime. Our blog has detailed road safety tips for travelers.'
    },
    {
      id: 15,
      category: 'Safety & Health',
      question: 'Do I need vaccinations to visit Sri Lanka?',
      answer: 'It is recommended to consult with your doctor about vaccinations before traveling. Common recommendations include Hepatitis A, Typhoid, and Japanese Encephalitis vaccines depending on your travel plans. Travel insurance that covers medical emergencies is advisable.'
    },
    {
      id: 16,
      category: 'Safety & Health',
      question: 'What are the best seasons to visit Sri Lanka?',
      answer: 'The south coast is best visited from December to April during the dry season when weather is sunny and seas are calm. However, each season has its charm. Check our blog for a detailed guide on the best time to visit.'
    },
    {
      id: 17,
      category: 'Safety & Health',
      question: 'Is drinking water safe in Sri Lanka?',
      answer: 'Tap water in tourist areas is generally safe, but we recommend drinking bottled water to avoid stomach issues. Always stay hydrated, especially during hot days. Most accommodations provide complimentary bottled water.'
    },

    // Payment & Policies
    {
      id: 18,
      category: 'Payment & Policies',
      question: 'What payment methods do you accept?',
      answer: 'We accept bank transfers, online banking transfers, and cash payments. Payment details will be confirmed during your booking conversation via WhatsApp or phone. A deposit may be required to secure your reservation.'
    },
    {
      id: 19,
      category: 'Payment & Policies',
      question: 'Can I modify my booking after confirmation?',
      answer: 'Yes, bookings can be modified depending on availability and the date of change. Contact us as soon as possible through WhatsApp or phone to request modifications. Changes made closer to your travel date may incur additional fees.'
    },
    {
      id: 20,
      category: 'Payment & Policies',
      question: 'What if I need to cancel my booking?',
      answer: 'Cancellations are accepted with notice. The cancellation policy terms will be discussed during booking. Earlier cancellations typically receive better refund amounts. Contact us immediately if you need to cancel.'
    },
    {
      id: 21,
      category: 'Payment & Policies',
      question: 'Do you offer group discounts?',
      answer: 'Yes! We offer special rates for group bookings. The more people in your group, the better the discount. Contact us with your group size and requirements to receive a customized quote.'
    },

    // Travel Tips
    {
      id: 22,
      category: 'Travel Tips',
      question: 'What is the best way to explore the south coast?',
      answer: 'Renting a scooter or vehicle gives you the freedom to explore at your own pace. You can visit hidden beaches, local villages, and discover attractions not found in guidebooks. Our blog has detailed guides on the best routes and hidden gems.'
    },
    {
      id: 23,
      category: 'Travel Tips',
      question: 'What are some must-visit attractions on the south coast?',
      answer: 'Popular attractions include: Mirissa Beach, Unawatuna Beach, Galle Fort, Matara Temple, Yala National Park for wildlife, Hikkaduwa Lagoon for water activities, and various hidden beaches. Our blog and tours cover these and many more hidden gems.'
    },
    {
      id: 24,
      category: 'Travel Tips',
      question: 'How much time should I spend on the south coast?',
      answer: 'A minimum of 3-5 days is recommended to enjoy the highlights. For a comprehensive experience visiting wildlife, beaches, culture, and adventure activities, 7-10 days is ideal. You can customize your itinerary based on your interests.'
    },
    {
      id: 25,
      category: 'Travel Tips',
      question: 'What should I know about local culture and customs?',
      answer: 'Sri Lanka is a Buddhist-majority country. Respect temple etiquette, cover shoulders and knees when visiting religious sites, and remove shoes when entering. Be respectful of local customs, ask permission before photographing people, and support local businesses.'
    }
  ];

  const categories = ['All', ...new Set(faqs.map(faq => faq.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFaqs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="faq-page">
      <div className="faq-container">
        {/* Header Section */}
        <div className="faq-header">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about booking, vehicles, tours, safety, and travel tips for your South Road Trips adventure.</p>
        </div>

        {/* Category Filter */}
        <div className="faq-categories">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="faq-list">
          {filteredFaqs.map(faq => (
            <div key={faq.id} className="faq-item">
              <button
                className={`faq-question ${expandedId === faq.id ? 'expanded' : ''}`}
                onClick={() => toggleExpand(faq.id)}
              >
                <span>{faq.question}</span>
                <svg
                  className="faq-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {expandedId === faq.id && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="faq-cta">
          <h2>Still Have Questions?</h2>
          <p>Don't hesitate to reach out! Our friendly team is ready to help.</p>
          <div className="cta-buttons">
            <a href="https://wa.me/94764549169" className="cta-btn whatsapp-btn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2.05 22l6.03-1.68C10.07 21.59 11 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2m0 18c-.89 0-1.74-.2-2.5-.55l-.18-.1-1.86.52.54-1.75-.11-.18C4.26 16.55 4 14.35 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8m3.89-12.77c-.37-.18-.87-.09-1.64.12-.52.14-.82.36-1.39.82-.81.75-1.48 1.72-1.63 2.84-.1.69.18 1.46.96 2.24.27.27.73.75 1.66 1.59.93.84 1.64 1.01 2.05 1.09.89.17 1.65-.09 2.14-.48.23-.19.42-.43.57-.71.05-.1.09-.21.08-.32-.01-.1-.04-.2-.08-.3-.37-.9-1.04-1.86-1.9-2.73-.56-.56-1.19-.98-1.73-1.16z"/>
              </svg>
              Chat on WhatsApp
            </a>
            <a href="tel:+94764549169" className="cta-btn phone-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
