import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./Events.module.css";

const Events = () => {
  const [signedUpEvents, setSignedUpEvents] = useState([]);
  const [customEvents, setCustomEvents] = useState([]);
  const [addEventOpen, setAddEventOpen] = useState(false);
  const [customEventCount, setCustomEventCount] = useState(0);
  const [openForms, setOpenForms] = useState({});

  const toggleAddEventForm = () => setAddEventOpen(!addEventOpen);

  const addCustomEvent = (e) => {
    e.preventDefault();
    const name = e.target.customEventName.value.trim();
    const date = e.target.customEventDate.value;
    const time = e.target.customEventTime.value;
    const place = e.target.customEventPlace.value.trim();
    const desc = e.target.customEventDesc.value.trim();

    if (!name || !date || !time || !place || !desc) return;

    const dateObj = new Date(`${date}T${time}`);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const dateStr = dateObj.toLocaleDateString(undefined, options) + ', ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newEvent = { id: `custEvent${customEventCount + 1}`, name, date: dateStr, place, desc };
    setCustomEvents([...customEvents, newEvent]);
    setCustomEventCount(customEventCount + 1);

    setSignedUpEvents(prev => [...prev, { id: newEvent.id, name: newEvent.name, date: newEvent.date }]);
    e.target.reset();
    setAddEventOpen(false);
  };

  const toggleForm = (id) => setOpenForms(prev => ({ ...prev, [id]: !prev[id] }));

  const submitForm = (e, eventId, eventName, eventDate) => {
    e.preventDefault();
    if (!signedUpEvents.some(e => e.id === eventId)) {
      setSignedUpEvents([...signedUpEvents, { id: eventId, name: eventName, date: eventDate }]);
    }
    setOpenForms(prev => ({ ...prev, [eventId]: false }));
  };

  return (
    <div className={styles.eventsPage}>


      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Dorm Events</h1>
        </header>

        <div className={styles.contentWrapper}>
          {/* Add Event Section */}
          <div className={styles.addEventSection}>
            <button 
              className={`${styles.addEventButton} ${addEventOpen ? styles.open : ''}`}
              onClick={toggleAddEventForm}
            >
              {addEventOpen ? 'Cancel' : 'Add New Event'}
            </button>
            
            {addEventOpen && (
              <form className={styles.eventForm} onSubmit={addCustomEvent}>
                <input type="text" name="customEventName" placeholder="Event Name" required />
                <input type="date" name="customEventDate" required />
                <input type="time" name="customEventTime" required />
                <input type="text" name="customEventPlace" placeholder="Location" required />
                <textarea name="customEventDesc" placeholder="Description" required />
                <button type="submit" className={styles.submitButton}>Create Event</button>
              </form>
            )}
          </div>

          {/* Events List */}
          <div className={styles.eventsList}>
            {customEvents.map(event => {
              const alreadySignedUp = signedUpEvents.some(e => e.id === event.id);
              return (
                <div className={styles.eventCard} key={event.id}>
                  <div className={styles.eventDetails}>
                    <h2 className={styles.eventName}>{event.name}</h2>
                    <div className={styles.eventMeta}>
                      <span className={styles.eventDate}>{event.date}</span>
                      <span className={styles.eventLocation}>{event.place}</span>
                    </div>
                    <p className={styles.eventDescription}>{event.desc}</p>
                  </div>
                  
                  <div className={styles.eventActions}>
                    {alreadySignedUp ? (
                      <button className={styles.signedUpButton} disabled>Registered</button>
                    ) : (
                      <button 
                        className={styles.signUpButton}
                        onClick={() => toggleForm(event.id)}
                      >
                        Sign Up
                      </button>
                    )}
                  </div>

                  {openForms[event.id] && !alreadySignedUp && (
                    <form 
                      className={styles.signUpForm}
                      onSubmit={(e) => submitForm(e, event.id, event.name, event.date)}
                    >
                      <input type="text" placeholder="Full Name" required />
                      <input type="email" placeholder="Email" required />
                      <button type="submit" className={styles.submitFormButton}>Confirm Registration</button>
                    </form>
                  )}
                </div>
              );
            })}
          </div>

          {/* Registered Events Sidebar */}
          <aside className={styles.registeredEvents}>
            <h2 className={styles.sidebarTitle}>My Registrations</h2>
            {signedUpEvents.length === 0 ? (
              <p className={styles.noEvents}>No upcoming registrations</p>
            ) : (
              <ul className={styles.registrationsList}>
                {signedUpEvents.map((event, index) => (
                  <li key={index} className={styles.registrationItem}>
                    <h3 className={styles.registrationTitle}>{event.name}</h3>
                    <p className={styles.registrationDate}>{event.date}</p>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Events;