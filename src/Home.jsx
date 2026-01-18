import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const PAST_DEALS = [
  { destination: "Tokyo", price: 520, percentCheaper: 42, img: "/src/assets/images/tokyo.jpg", desc: "A vibrant blend of futuristic city life and ancient traditions." },
  { destination: "Paris", price: 610, percentCheaper: 31, img: "/src/assets/images/paris.jpg", desc: "Romantic streets, iconic landmarks, and world-class cuisine." },
  { destination: "Mexico City", price: 180, percentCheaper: 60, img: "/src/assets/images/mexico.jpg", desc: "Colorful culture, historic architecture, and unforgettable food." }
];

export default function Home() {
  const [origin, setOrigin] = useState("");
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => carouselRef.current.scrollBy({ left: -350, behavior: "smooth" });
  const scrollRight = () => carouselRef.current.scrollBy({ left: 350, behavior: "smooth" });

  const handleSubmit = () => {
    if (!origin) { alert("Please enter your departing city!"); return; }
    navigate(`/results/${origin.toUpperCase()}`);
  };

  return (
    <div className="App">
      {/* Topbar */}
      <header className="topbar">
        <div className="logo">FlightScanner</div>
        <div className="topbar-buttons">
          <button>Currency</button>
          <button>Language</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Explore. Book. Relax.</h1>
          <div className="hero-input">
            <input type="text" placeholder="Departing city" value={origin} onChange={e => setOrigin(e.target.value)} />
            <button onClick={handleSubmit}>Search</button>
          </div>
        </div>
      </section>

      {/* Why Book Section */}
      <section className="why-book">
        <h2>Why Book with FlightScanner</h2>
        <div className="features features-4">
          <div className="feature-card">
            <img src="/src/assets/images/plan.png" alt="Plan your way" />
            <h3>Plan Your Way</h3>
            <p>Customize your trips with flexible planning tools, suggested itineraries, and personal recommendations.</p>
          </div>
          <div className="feature-card">
            <img src="/src/assets/images/flexible.png" alt="Stay flexible" />
            <h3>Stay Flexible</h3>
            <p>Free cancellation and reserve now, pay later at no additional cost.</p>
          </div>
          <div className="feature-card">
            <img src="/src/assets/images/price.png" alt="Best Prices" />
            <h3>Best Prices</h3>
            <p>Get the most competitive flight deals, daily updates, and price alerts.</p>
          </div>
          <div className="feature-card">
            <img src="/src/assets/images/support.png" alt="Support" />
            <h3>24/7 Support</h3>
            <p>We’re here to help anytime with your bookings, changes, or questions.</p>
          </div>
        </div>
      </section>

      {/* Past Deals Section */}
      <section className="past-deals">
        <h2>Best Past Deals</h2>
        <div className="carousel-container">
          <button className="carousel-button" onClick={scrollLeft}>‹</button>
          <div className="deals-carousel" ref={carouselRef}>
            {PAST_DEALS.map(deal => (
              <div className="deal-card" key={deal.destination}>
                <div className="deal-image">
                  <img src={deal.img} alt={deal.destination} />
                  <div className="deal-image-overlay">
                    <h3>{deal.destination}</h3>
                    <p>{deal.desc}</p>
                  </div>
                </div>
                <div className="deal-footer">
                  <span className="deal-price">${deal.price}</span>
                  <span className="deal-cheap">{deal.percentCheaper}% cheaper than usual</span>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-button" onClick={scrollRight}>›</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <h3>FlightScanner</h3>
            <p>Find the best flight deals worldwide. Compare, book, and travel with confidence.</p>
          </div>
          <div className="footer-column">
            <h4>Help Center</h4>
            <ul>
              <li>Customer Support</li>
              <li>Cancellation Options</li>
              <li>Refund Policy</li>
              <li>Travel Alerts</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Explore</h4>
            <ul>
              <li>Cheap Flights</li>
              <li>Popular Destinations</li>
              <li>Last-Minute Deals</li>
              <li>Travel Guides</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Partnerships</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} FlightScanner. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
