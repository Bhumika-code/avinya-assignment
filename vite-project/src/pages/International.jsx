import React, { useState } from "react";
import "../styles/Header.css";

const International = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tripType, setTripType] = useState("round-trip");
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [fromAirport, setFromAirport] = useState("");
  const [toAirport, setToAirport] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
      const [showAirportPopup, setShowAirportPopup] = useState(false)




  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

 

  const handleDateClick = (date) => {
    setSelectedDate(date.toDateString());
    setShowDatePicker(false);
  };
 const generateCalendar = () => {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => {
      const dayDate = new Date(today.getFullYear(), today.getMonth(), i + 1);
      return (
        <div
          key={i}
          className="calendar-day"
          onClick={() => handleDateClick(dayDate)}
        >
          {i + 1}
        </div>
      );
    });
  };
  const generateMonth = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let dates = [];

    for (let i = 0; i < firstDay; i++) dates.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      dates.push(new Date(year, month, d));
    }
    return dates;
  };

  const renderMonth = (year, month, monthName) => {
    const dates = generateMonth(year, month);

    return (
      <div className="calendar-month">
        <div className="calendar-month-title">{monthName} {year}</div>
        <div className="calendar-grid">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
            <div key={i} className="calendar-day-header">{day}</div>
          ))}
          {dates.map((date, i) => (
            <div
              key={i}
              className={`calendar-date 
                ${date && date.getDay() === 0 ? "holiday" : ""}
                ${date && date.getDay() === 6 ? "weekend" : ""}
                ${date && selectedDate === date.toDateString() ? "selected" : ""}`}
              onClick={() => date && handleDateClick(date)}
            >
              {date ? date.getDate() : ""}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDatePopup = () => {
    return (
      <div className="calendar-popup">
        <div className="calendar-header-row">
          <span className="reset-link" onClick={() => setSelectedDate(null)}>Reset</span>
          <span className="calendar-title">Boarding Date</span>
      <button
  className="close-btn"
  onClick={() => {
    setShowDatePicker(false);
    setShowAirportPopup(false);
  }}
>
  ✖
</button>

        </div>
        <div className="holiday-note">
          _ National Holiday / Substitute Holiday
        </div>
        <div className="calendar-months">
          {renderMonth(2025, 7, "August")} {/* 7 = August */}
          {renderMonth(2025, 8, "September")} {/* 8 = September */}
        </div>
        <div className="calendar-footer">
          <button className="next-btn" onClick={() => setShowDatePicker(false)}>NEXT</button>
        </div>
      </div>
    );
  };
  const adjustPassenger = (type, operation) => {
    setPassengers(prev => ({
      ...prev,
      [type]: operation === 'add' ? prev[type] + 1 : Math.max(0, prev[type] - 1)
    }));
  };
 const renderAirportPopup = () => (
    <div className="airport-popup-overlay">
      <div className="airport-popup">
        <div className="popup-header">
          <h3>From</h3>
          <button className="close-popup" onClick={() => setShowAirportPopup(false)}>✖</button>
        </div>

        <div className="airport-list">
          <div className="airport-category">Major Cities</div>
          <div className="airport-item"><span>Tokyo (All airports)</span><span className="code">TYO</span></div>
          <div className="airport-item"><span>Tokyo (Haneda) - Tokyo International Airport</span><span className="code">HND</span></div>
          <div className="airport-item"><span>Tokyo (Narita) - Narita International Airport</span><span className="code">NRT</span></div>
          <div className="airport-item"><span>Osaka (All airports)</span><span className="code">OSA</span></div>
          <div className="airport-item"><span>Osaka (Itami) - Osaka International Airport</span><span className="code">ITM</span></div>
          <div className="airport-item"><span>Osaka (Kansai) - Kansai International Airport</span><span className="code">KIX</span></div>
          <div className="airport-item"><span>Sapporo (New Chitose) - New Chitose Airport</span><span className="code">CTS</span></div>
          <div className="airport-item"><span>Nagoya (All airports)</span><span className="code">NGO</span></div>
          {/* You can add more exactly as in your screenshot */}
        </div>
      </div>
    </div>
  );
  return (
    <div className="flight-booking-container">
      {/* Hero Section */}
      <div className="hero-section International-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-title">
        
            <h1 className="header3">International Flights</h1>
          </div>
        </div>
      </div>

      {/* Expandable Search Box */}
      <div className="search-container">
        <div className={`popup1 ${isExpanded ? 'expanded' : ''}`}>
          {!isExpanded ? (
            /* Initial State - Simple search boxes */
            <div className="initial-content">
               <div className="modal-title">
                  <span className="plane-icon">✈</span>
                  <h2>International</h2>
                </div>
              <div className="tab-navigation">
                <button className="tab-active">Flights</button>
                <button className="tab-inactive">Award Tickets</button>
              </div>

              <div className="airport-selection-row">
                <div className="airport-box International-box" onClick={() => setIsExpanded(true)}>
                  <div className="airport-content">
                    <span className="plane-icon">✈</span>
                    <span className="airport-text">Select an airport/city in Japan</span>
                    <div className="airport-actions" >
                      <span className="swap-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-justify-icon lucide-align-justify"><path d="M3 12h18"/><path d="M3 18h18"/><path d="M3 6h18"/></svg></span>
                    </div>
                    <div className="airport-info " onClick={() => setShowAirportPopup(true)}>
                      <div className="all-airports">All airports</div>
                    </div>
                  </div>
                </div>

                <div className="airport-box International-box" onClick={() => setIsExpanded(true)}>
                  <div className="airport-content">
                    <span className="plane-icon">✈</span>
                    <span className="airport-text">Select an airport/city in Japan</span>
                    <div className="airport-actions" onClick={() => setShowAirportPopup(true)}>
                      <span className="dropdown-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-justify-icon lucide-align-justify"><path d="M3 12h18"/><path d="M3 18h18"/><path d="M3 6h18"/></svg></span>
                    </div>
                    <div className="airport-info">
                      <div className="all-airports">All airports</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Expanded State - Full form */
            <div className="expanded-content">
              {/* Header */}
              <div className="modal-header">
                <div className="modal-title">
                  <span className="plane-icon">✈</span>
                  <h2>International</h2>
                </div>
                <button className="close-button" onClick={() => setIsExpanded(false)}>
                  ✖
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="modal-tab-navigation">
                <button className="modal-tab-active">Flights</button>
                <button className="modal-tab-inactive">Award Tickets</button>
              </div>

              {/* Trip Type */}
              <div className="trip-type-section">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="tripType"
                    value="round-trip"
                    checked={tripType === "round-trip"}
                    onChange={(e) => setTripType(e.target.value)}
                  />
                  Round-trip
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="tripType"
                    value="one-way"
                    checked={tripType === "one-way"}
                    onChange={(e) => setTripType(e.target.value)}
                  />
                  One-way
                </label>
              </div>

              {/* From/To Section */}
              <div className="form-section">
                <div className="form-column">
                  <label className="form-label">From</label>
                  <div className="form-input-wrapper">
                    <div className="form-input-box">
                      <span className="plane-icon">✈</span>
                      <input
                        type="text"
                        value={fromAirport}
                        onChange={(e) => setFromAirport(e.target.value)}
                        className="form-input"
                      />
                     
                      <div className="input-info" onClick={() => setShowAirportPopup(true)}>
                        <div className="airport-actions">
                      <span className="dropdown-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-justify-icon lucide-align-justify"><path d="M3 12h18"/><path d="M3 18h18"/><path d="M3 6h18"/></svg></span>
                    </div>
                        <div className="all-airports">All airports</div>
                      </div>
                    </div>
                    <div className="dropdown-link">Choose from all airports ▼</div>
                  </div>
                </div>

                <div className="form-column">
                  <label className="form-label">To</label>
                  <div className="form-input-wrapper">
                    <div className="form-input-box">
                      <span className="plane-icon">✈</span>
                      <input
                        type="text"
                        placeholder="Select an airport/city"
                        value={toAirport}
                        onChange={(e) => setToAirport(e.target.value)}
                        className="form-input"
                      />
                      
                      <div className="input-info" onClick={() => setShowAirportPopup(true)}>
                       <div className="airport-actions">
                      <span className="dropdown-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-justify-icon lucide-align-justify"><path d="M3 12h18"/><path d="M3 18h18"/><path d="M3 6h18"/></svg></span>
                    </div>
                        <div className="all-airports">All airports</div>
                      </div>
                    </div>
                    <div className="multi-city-link">Open-jaw and multi-city ▸</div>
                  </div>
                </div>
                   {showAirportPopup && renderAirportPopup()}
              </div>

              {/* Date and Passenger Section */}
            
                <div className="date-options">
                  <label className="form-label">Date</label>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input type="checkbox" />
                      One-way
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" />
                      View fares +/- 7 days
                    </label>
                  </div>
                </div>
  <div className="date-passenger-section">
                <div className="date-inputs">
                  <div className="date-input-box"   value={selectedDate}  onClick={() => setShowDatePicker(true)}>
                  <input
          type="text"
          placeholder="Please select date"
          value={selectedDate}
          onClick={() => setShowCalendar(true)}
          // readOnly
        />
                  </div>
                  <div className="date-input-box"  value={selectedDate}   onClick={() => setShowDatePicker(true)}>
                   <input
          type="text"
          placeholder="Please select date"
          value={selectedDate}
          onClick={() => setShowCalendar(true)}
          readOnly
        />
        
                  </div>
                   {showDatePicker && renderDatePopup()}
                </div>
{showCalendar && (
        <div className="calendar-popup">
          <div className="calendar-header">
            <button onClick={() => setShowCalendar(false)}>×</button>
            <span>
              {new Date().toLocaleString("default", { month: "long" })}{" "}
              {new Date().getFullYear()}
            </span>
          </div>
          <div className="calendar-grid">{generateCalendar()}</div>
        </div>
      )}
    
                <div className="passenger-section">
                  <label className="form-label">Passenger</label>
                  <div className="passenger-selector">
                    <div 
                      className="passenger-input-box"
                      onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                    >
                      <div className="passenger-display">
                        <span className="passenger-item">
                          <span className="user-icon">👤</span>
                          <span>{passengers.adults}</span>
                        </span>
                        <span className="passenger-item">
                          <span className="child-icon">♀</span>
                          <span>{passengers.children}</span>
                        </span>
                        <span className="passenger-item">
                          <span className="infant-icon">👶</span>
                          <span>{passengers.infants}</span>
                        </span>
                      </div>
                    </div>

                    {showPassengerDropdown && (
                      <div className="passenger-dropdown">
                        <div className="passenger-row">
                          <span>Adults</span>
                          <div className="counter-controls">
                            <button
                              onClick={() => adjustPassenger('adults', 'subtract')}
                              disabled={passengers.adults <= 1}
                              className="counter-button"
                            >
                              -
                            </button>
                            <span className="counter-value">{passengers.adults}</span>
                            <button
                              onClick={() => adjustPassenger('adults', 'add')}
                              className="counter-button"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="passenger-row">
                          <span>Children</span>
                          <div className="counter-controls">
                            <button
                              onClick={() => adjustPassenger('children', 'subtract')}
                              className="counter-button"
                            >
                              -
                            </button>
                            <span className="counter-value">{passengers.children}</span>
                            <button
                              onClick={() => adjustPassenger('children', 'add')}
                              className="counter-button"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="passenger-row">
                          <span>Infants</span>
                          <div className="counter-controls">
                            <button
                              onClick={() => adjustPassenger('infants', 'subtract')}
                              className="counter-button"
                            >
                              -
                            </button>
                            <span className="counter-value">{passengers.infants}</span>
                            <button
                              onClick={() => adjustPassenger('infants', 'add')}
                              className="counter-button"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Class Selection */}
              <div className="class-section">
                <label className="form-label">Class</label>
                <div className="class-input-box">
                  <select className="class-select">
                    <option>Economy</option>
                    <option>Premium Economy</option>
                    <option>Business</option>
                    <option>First Class</option>
                  </select>
                </div>
              </div>

              {/* More Button */}
              <div className="more-section">
                <button className="more-button">
                  <span>+ search flights</span>
                </button>
                
              </div>

              {/* Footer */}
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default International;