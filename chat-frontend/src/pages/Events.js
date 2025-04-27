import React, { useState, useEffect } from 'react';
import styles from "../styles/Events.module.css";

const Events = ({ currentUser }) => {
  const [events, setEvents] = useState([]);
  const [addEventOpen, setAddEventOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/api/events');
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const toggleAddEventForm = () => setAddEventOpen(!addEventOpen);

  const addCustomEvent = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.customEventName.value.trim(),
      date: e.target.customEventDate.value,
      time: e.target.customEventTime.value,
      place: e.target.customEventPlace.value.trim(),
      description: e.target.customEventDesc.value.trim()
    };
    try {
      const response = await fetch('http://localhost:8080/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Failed to create event');
      const newEvent = await response.json();
      setEvents(prev => [newEvent, ...prev]);
      e.target.reset();
      setAddEventOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignup = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/events/${eventId}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser._id })
      });
      if (!response.ok) throw new Error('Signup failed');
      const updatedEvent = await response.json();
      setEvents(prev => prev.map(event => event._id === updatedEvent._id ? updatedEvent : event));
    } catch (err) {
        
      setError(err.message);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/events/${eventId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete event');
      setEvents(prev => prev.filter(event => event._id !== eventId));
    } catch (err) {
      setError(err.message);
    }
  };

  // Filter events the current user is registered for
  const registeredEvents = events.filter(event =>
    event.participants && event.participants.includes(currentUser?._id)
  );

  return (
    <div className={styles.eventsPage}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Events</h1>
      </div>
      {error && <div className={styles.errorBanner}>{error}</div>}
      <div className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          {/* Main Events Section */}
          <div>
            <div className={styles.addEventSection}>
              <button
                className={`${styles.addEventButton} ${addEventOpen ? styles.open : ''}`}
                onClick={toggleAddEventForm}
              >
                {addEventOpen ? "Cancel" : "Add Event"}
              </button>
              {addEventOpen && (
                <form onSubmit={addCustomEvent} className={styles.eventForm}>
                  <input name="customEventName" placeholder="Event Name" required />
                  <input name="customEventDate" type="date" required />
                  <input name="customEventTime" type="time" required />
                  <input name="customEventPlace" placeholder="Place" required />
                  <textarea name="customEventDesc" placeholder="Description" />
                  <button type="submit" className={styles.submitButton}>Create Event</button>
                </form>
              )}
            </div>
            {loading ? (
              <div className={styles.loadingMessage}>Loading events...</div>
            ) : (
                <div className={styles.eventsList}>
                {events.length === 0 ? (
                  <div className={styles.noEvents}>No events found.</div>
                ) : (
                  events.map(event => (
                    <div key={event._id} className={styles.eventCard}>
                      <div className={styles.eventHeader}>
                        <h2 className={styles.eventName}>{event.name}</h2>
                        <button
                            className={styles.deleteButton}
                            onClick={() => handleDelete(event._id)}
                            title="Delete this event"
                        >
                            Delete
                        </button>
                    </div>

                      <div className={styles.eventMeta}>
                        <span className={styles.eventDate}>
                          {new Date(event.date).toLocaleDateString()} {event.time}
                        </span>
                        <span className={styles.eventLocation}>@ {event.place}</span>
                      </div>
                      <div className={styles.eventDescription}>{event.description}</div>
                      <div className={styles.participantsSection}>
                        <div className={styles.participantsHeader}>
                          Attendees ({event.participants?.length || 0})
                        </div>
                        <div className={styles.participantsGrid}>
                          {event.participants && event.participants.length > 0 ? (
                            event.participants.map((participant, idx) => (
                              <span key={idx} className={styles.participantBadge}>
                                {participant.username || participant.email || participant}
                              </span>
                            ))
                          ) : (
                            <span className={styles.noParticipants}>No attendees yet</span>
                          )}
                        </div>
                      </div>
                      <div className={styles.eventActions}>
                        {currentUser && event.participants?.includes(currentUser._id) ? (
                          <button className={styles.signedUpButton} disabled>
                            Registered
                          </button>
                        ) : (
                          <button
                            className={styles.signUpButton}
                            onClick={() => handleSignup(event._id)}
                          >
                            Sign Up
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          {/* Sidebar: Registered Events */}
          <aside className={styles.registeredEvents}>
            <div className={styles.sidebarTitle}>Your Registered Events</div>
            {registeredEvents.length === 0 ? (
              <div className={styles.noEvents}>You have not registered for any events.</div>
            ) : (
              <ul className={styles.registrationsList}>
                {registeredEvents.map(event => (
                  <li key={event._id} className={styles.registrationItem}>
                    <div className={styles.registrationTitle}>{event.name}</div>
                    <div className={styles.registrationDate}>
                      {new Date(event.date).toLocaleDateString()} {event.time} @ {event.place}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Events;