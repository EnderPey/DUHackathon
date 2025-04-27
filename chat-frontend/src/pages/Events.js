import React, { useState, useEffect } from 'react';
// import './App.css'; // Use your preferred styling
// import styles from "../styles/Events.module.css"; // Or your module CSS

const USER_PROFILE_PHOTO = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuQhfKIRIuVhyM9jbdn7eXHRqQ0OebteruLK26ijbwDskbZJzqD9wi0pHc5oRlMbbrwNE&usqp=CAU";

const DEFAULT_EVENTS = [
  {
    id: 'event1',
    name: 'Spring Festival',
    date: 'April 30, 2025',
    time: '2:00 PM',
    place: 'Campus Green',
    description: 'Join us for a day of fun, food, and music to celebrate the arrival of spring!',
    profilePhoto: 'https://randomuser.me/api/portraits/men/32.jpg',
    participants: []
  },
  {
    id: 'event2',
    name: 'Charity Run',
    date: 'May 15, 2025',
    time: '9:00 AM',
    place: 'Main Street',
    description: 'Participate in our annual charity run to support local community projects.',
    profilePhoto: 'https://randomuser.me/api/portraits/women/44.jpg',
    participants: []
  },
  {
    id: 'event3',
    name: 'Art Exhibition',
    date: 'June 10, 2025',
    time: '6:00 PM',
    place: 'Downtown Gallery',
    description: 'Explore the latest works from local artists at the downtown gallery.',
    profilePhoto: 'https://randomuser.me/api/portraits/men/65.jpg',
    participants: []
  }
];

const CombinedEvents = ({ currentUser }) => {
  const [localEvents, setLocalEvents] = useState([]);
  const [apiEvents, setApiEvents] = useState([]);
  const [addEventOpen, setAddEventOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [customEventCount, setCustomEventCount] = useState(0);

  // Fetch API events if logged in
  useEffect(() => {
    if (!currentUser) return;
    setLoading(true);
    fetch('http://localhost:8080/api/events')
      .then(res => res.json())
      .then(data => setApiEvents(data))
      .catch(() => setError('Failed to load events'))
      .finally(() => setLoading(false));
  }, [currentUser]);

  // Add custom event (API if logged in, local if not)
  const addCustomEvent = async (e) => {
    e.preventDefault();
    const name = e.target.customEventName.value.trim();
    const date = e.target.customEventDate.value;
    const time = e.target.customEventTime.value;
    const place = e.target.customEventPlace.value.trim();
    const description = e.target.customEventDesc.value.trim();
    const profilePhoto = USER_PROFILE_PHOTO;

    if (!name || !date || !time || !place || !description) return;

    if (currentUser) {
      // Authenticated: POST to API
      const formData = {
        name, date, time, place, description, profilePhoto,
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
      } catch {
        setError('Failed to create event');
      }
    } else {
      // Not logged in: Local only
      const newEvent = {
        id: `custEvent${customEventCount + 1}`,
        name, date, time, place, description, profilePhoto,
        participants: []
      };
      setLocalEvents(prev => [newEvent, ...prev]);
      setCustomEventCount(count => count + 1);
    }
    e.target.reset();
    setAddEventOpen(false);
  };

  // Sign up for an event (API if logged in, local if not)
  const handleSignup = async (event) => {
    setError('');
    if (!currentUser) {
      // Local: add a dummy participant
      setLocalEvents(prev => prev.map(ev =>
        ev.id === event.id
          ? { ...ev, participants: [...(ev.participants || []), { _id: 'local', username: 'You', email: '' }] }
          : ev
      ));
      return;
    }
    // Already signed up?
    if (event.participants?.some(p => p._id === currentUser._id)) {
      setError('You are already registered for this event');
      return;
    }
    if (event._id) {
      // API event
      try {
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
      } catch (err) {
        setError('Signup failed');
      }
    } else {
      // Local event
      setLocalEvents(prev => prev.map(ev =>
        ev.id === event.id
          ? { ...ev, participants: [...(ev.participants || []), {
              _id: currentUser._id,
              username: currentUser.username,
              email: currentUser.email
            }] }
          : ev
      ));
    }
  };

  // Merge all events: default, local, API
  const allEvents = [
    ...DEFAULT_EVENTS,
    ...localEvents,
    ...apiEvents
  ];

  // Registered events for sidebar
  const registeredEvents = allEvents.filter(event =>
    event.participants?.some(p => p._id === (currentUser?._id || 'local'))
  );

  return (
    <div>
      <header>
        <h1>Dorm Events</h1>
        <div>
          {currentUser ? (
            <span>Welcome, {currentUser.username}</span>
          ) : (
            <span>Not logged in</span>
          )}
          <img src={USER_PROFILE_PHOTO} alt="Profile" style={{ width: 48, borderRadius: '50%' }} />
        </div>
      </header>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={() => setAddEventOpen(open => !open)}>
        {addEventOpen ? "Cancel" : "Add Your Own Event"}
      </button>
      {addEventOpen && (
        <form onSubmit={addCustomEvent}>
          <input type="text" name="customEventName" placeholder="Event Name" required />
          <input type="date" name="customEventDate" required />
          <input type="time" name="customEventTime" required />
          <input type="text" name="customEventPlace" placeholder="Event Place" required />
          <input type="text" name="customEventDesc" placeholder="Event Description" required />
          <button type="submit">Add Event</button>
        </form>
      )}
      <div>
        {loading ? (
          <div>Loading events...</div>
        ) : (
          allEvents.map(event => (
            <div key={event._id || event.id} style={{ border: '1px solid #ccc', margin: 8, padding: 8 }}>
              <img src={event.profilePhoto || USER_PROFILE_PHOTO} alt="" style={{ width: 60, borderRadius: '50%' }} />
              <h2>{event.name}</h2>
              <div>{event.date} {event.time} | {event.place}</div>
              <p>{event.description}</p>
              <div>
                Attendees: {event.participants?.length || 0}
                <div>
                  {event.participants?.map((p, idx) => (
                    <span key={idx} style={{ marginRight: 4 }}>{p.username || p.email || p._id}</span>
                  ))}
                </div>
              </div>
              {event.participants?.some(p => p._id === (currentUser?._id || 'local')) ? (
                <button disabled>Signed Up</button>
              ) : (
                <button onClick={() => handleSignup(event)}>Sign Up</button>
              )}
            </div>
          ))
        )}
      </div>
      <aside>
        <h3>Your Registered Events</h3>
        {registeredEvents.length === 0 ? (
          <div>No events yet.</div>
        ) : (
          <ul>
            {registeredEvents.map(event => (
              <li key={event._id || event.id}>
                <strong>{event.name}</strong><br />
                <span>{event.date} {event.time} @ {event.place}</span>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
};

export default CombinedEvents;

