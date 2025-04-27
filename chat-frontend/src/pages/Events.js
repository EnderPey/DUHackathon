import React, { useState, useEffect } from 'react';
import styles from "../styles/Events.module.css";

const USER_PROFILE_PHOTO = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuQhfKIRIuVhyM9jbdn7eXHRqQ0OebteruLK26ijbwDskbZJzqD9wi0pHc5oRlMbbrwNE&usqp=CAU";

const CombinedEvents = ({ currentUser }) => {
  const [localEvents, setLocalEvents] = useState([]);
  const [apiEvents, setApiEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [addEventOpen, setAddEventOpen] = useState(false);

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

  const addCustomEvent = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setError('Please log in to create events');
      return;
    }

    const formData = {
      name: e.target.customEventName.value.trim(),
      date: e.target.customEventDate.value,
      time: e.target.customEventTime.value,
      place: e.target.customEventPlace.value.trim(),
      description: e.target.customEventDesc.value.trim(),
      profilePhoto: USER_PROFILE_PHOTO,
      participants: [{
        _id: currentUser._id,
        username: currentUser.username,
        email: currentUser.email
      }]
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
      setLocalEvents(prev => [
        {
          ...formData,
          id: `local-${Date.now()}`,
          participants: [{
            _id: currentUser._id,
            username: currentUser.username,
            email: currentUser.email
          }]
        },
        ...prev
      ]);
    }
    e.target.reset();
    setAddEventOpen(false);
  };

  const handleSignup = async (event) => {
    setError('');
    if (!currentUser) {
      setError('Please log in to sign up for events');
      return;
    }

    try {
      if (event.participants.some(p => p._id === currentUser._id)) {
        setError('You are already registered for this event');
        return;
      }

      if (event._id) {
        const response = await fetch(`http://localhost:8080/api/events/${event._id}/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            userId: currentUser._id,
            username: currentUser.username,
            email: currentUser.email
          })
        });
        
        if (!response.ok) throw new Error('Signup failed');
        const updatedEvent = await response.json();
        setApiEvents(prev => prev.map(ev => ev._id === updatedEvent._id ? updatedEvent : ev));
      } else {
        setLocalEvents(prev => prev.map(ev => 
          ev.id === event.id ? {
            ...ev,
            participants: [...ev.participants, {
              _id: currentUser._id,
              username: currentUser.username,
              email: currentUser.email
            }]
          } : ev
        ));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const allEvents = [...localEvents, ...apiEvents];
  const registeredEvents = allEvents.filter(event =>
    event.participants?.some(p => p._id === currentUser?._id)
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
                          {event.participants?.length > 0 ? (
                            event.participants.map((participant, idx) => (
                              <span key={idx} className={styles.participantBadge}>
                                {participant.username || participant.email || participant._id}
                              </span>
                            ))
                          ) : (
                            <span className={styles.noParticipants}>No attendees yet</span>
                          )}
                        </div>
                      </div>
                      <div className={styles.eventActions}>
                        {currentUser && event.participants?.some(p => p._id === currentUser._id) ? (
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
