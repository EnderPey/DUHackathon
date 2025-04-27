import React, { useState, useEffect } from 'react';
import styles from "../styles/Events.module.css";

const USER_PROFILE_PHOTO = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuQhfKIRIuVhyM9jbdn7eXHRqQ0OebteruLK26ijbwDskbZJzqD9wi0pHc5oRlMbbrwNE&usqp=CAU";

const CombinedEvents = ({ currentUser }) => {
  // Local custom events (not yet pushed to backend)
  const [localEvents, setLocalEvents] = useState([]);
  // Events from backend
  const [apiEvents, setApiEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [addEventOpen, setAddEventOpen] = useState(false);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:8080/api/events');
        const data = await res.json();
        setApiEvents(data);
      } catch (err) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Add event (tries to add to backend, falls back to local if fails)
  const addCustomEvent = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.customEventName.value.trim(),
      date: e.target.customEventDate.value,
      time: e.target.customEventTime.value,
      place: e.target.customEventPlace.value.trim(),
      description: e.target.customEventDesc.value.trim(),
      profilePhoto: USER_PROFILE_PHOTO,
    };
    try {
      const response = await fetch('http://localhost:8080/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to create event');
      const newEvent = await response.json();
      setApiEvents(prev => [newEvent, ...prev]);
    } catch (err) {
      // If backend fails, store locally
      setLocalEvents(prev => [
        {
          ...formData,
          id: `local-${Date.now()}`,
          participants: [],
        },
        ...prev,
      ]);
    }
    e.target.reset();
    setAddEventOpen(false);
  };

  // Unified event list
  const allEvents = [...localEvents, ...apiEvents];

  // Sign up for event (API or local)
  const handleSignup = async (event) => {
    if (event._id) {
      // API event
      try {
        const response = await fetch(`http://localhost:8080/api/events/${event._id}/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: currentUser._id }),
        });
        if (!response.ok) throw new Error('Signup failed');
        const updatedEvent = await response.json();
        setApiEvents(prev => prev.map(ev => ev._id === updatedEvent._id ? updatedEvent : ev));
      } catch (err) {
        setError(err.message);
      }
    } else {
      // Local event
      setLocalEvents(prev =>
        prev.map(ev =>
          ev.id === event.id
            ? { ...ev, participants: [...(ev.participants || []), currentUser._id] }
            : ev
        )
      );
    }
  };

  // Filter registered events
  const registeredEvents = allEvents.filter(event =>
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
          <div>
            <div className={styles.addEventSection}>
              <button
                className={`${styles.addEventButton} ${addEventOpen ? styles.open : ''}`}
                onClick={() => setAddEventOpen(!addEventOpen)}
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
                {allEvents.length === 0 ? (
                  <div className={styles.noEvents}>No events found.</div>
                ) : (
                  allEvents.map(event => (
                    <div key={event._id || event.id} className={styles.eventCard}>
                      <div className={styles.eventHeader}>
                        <h2 className={styles.eventName}>{event.name}</h2>
                        {/* Optionally add delete/edit controls here */}
                      </div>
                      <div className={styles.eventMeta}>
                        <span className={styles.eventDate}>
                          {event.date} {event.time}
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
                            onClick={() => handleSignup(event)}
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
                  <li key={event._id || event.id} className={styles.registrationItem}>
                    <div className={styles.registrationTitle}>{event.name}</div>
                    <div className={styles.registrationDate}>
                      {event.date} {event.time} @ {event.place}
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

export default CombinedEvents;
