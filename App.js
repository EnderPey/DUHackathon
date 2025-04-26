import React, { useState } from 'react';
import './App.css';

const USER_PROFILE_PHOTO = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuQhfKIRIuVhyM9jbdn7eXHRqQ0OebteruLK26ijbwDskbZJzqD9wi0pHc5oRlMbbrwNE&usqp=CAU";

function App() {
  const [signedUpEvents, setSignedUpEvents] = useState([]);
  const [customEvents, setCustomEvents] = useState([]);
  const [addEventOpen, setAddEventOpen] = useState(false);
  const [customEventCount, setCustomEventCount] = useState(0);
  const [currentTab, setCurrentTab] = useState('Events');
  const [openForms, setOpenForms] = useState({});

  const toggleAddEventForm = () => setAddEventOpen(!addEventOpen);

  const addCustomEvent = (e) => {
    e.preventDefault();
    const name = e.target.customEventName.value.trim();
    const date = e.target.customEventDate.value;
    const time = e.target.customEventTime.value;
    const place = e.target.customEventPlace.value.trim();
    const desc = e.target.customEventDesc.value.trim();
    const profilePhoto = USER_PROFILE_PHOTO;

    if (!name || !date || !time || !place || !desc) return;

    const dateObj = new Date(`${date}T${time}`);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const dateStr = dateObj.toLocaleDateString(undefined, options) + ', ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newEvent = { id: `custEvent${customEventCount + 1}`, name, date: dateStr, place, desc, profilePhoto };
    setCustomEvents([...customEvents, newEvent]);
    setCustomEventCount(customEventCount + 1);

    setSignedUpEvents(prev => [
      ...prev,
      { id: newEvent.id, name: newEvent.name, date: newEvent.date }
    ]);

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

  const defaultEvents = [
    {
      id: 'event1',
      name: 'Spring Festival',
      date: 'April 30, 2025, 2:00 PM',
      place: 'Campus Green',
      desc: 'Join us for a day of fun, food, and music to celebrate the arrival of spring!',
      profilePhoto: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 'event2',
      name: 'Charity Run',
      date: 'May 15, 2025, 9:00 AM',
      place: 'Main Street',
      desc: 'Participate in our annual charity run to support local community projects.',
      profilePhoto: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 'event3',
      name: 'Art Exhibition',
      date: 'June 10, 2025, 6:00 PM',
      place: 'Downtown Gallery',
      desc: 'Explore the latest works from local artists at the downtown gallery.',
      profilePhoto: 'https://randomuser.me/api/portraits/men/65.jpg'
    }
  ];

  const allEvents = [...defaultEvents, ...customEvents];

  const backgroundStyle = {
    minHeight: '100vh',
    backgroundImage: `url("https://static01.nyt.com/images/2020/03/14/upshot/14up-colleges-remote/14up-colleges-remote-videoSixteenByNineJumbo1600.jpg")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <div className="App" style={backgroundStyle}>
      {/* Left Sidebar */}
      <nav className="left-sidebar">
        {/* Canva Embed Logo, no box, no attribution */}
        <div
          style={{
            position: "relaxed",
            width: "100%",
            height: 0,
            paddingTop: "50%",
            boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
            marginTop: "-3em",
            marginBottom: "0.9em",
            overflow: "hidden",
            borderRadius: "8px",
            willChange: "transform",
            background: "transparent"
          }}
        >
          <iframe
            loading="lazy"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              border: "none",
              padding: 0,
              margin: 0,
              background: "transparent"
            }}
            src="https://www.canva.com/design/DAGlxUUKDvs/q7cjEnTms69rsT01MdyAAw/view?embed"
            title="ResRelate Logo"
          ></iframe>
        </div>
        <div className="nav-links">
          {['Chat', 'Events', 'Requests', 'Settings'].map(tab => (
            <a
              key={tab}
              href="#"
              className={currentTab === tab ? 'active' : ''}
              onClick={() => setCurrentTab(tab)}
            >
              {tab}
            </a>
          ))}
        </div>
      </nav>

      {/* Header */}
      <header>
  <div></div>
  <div style={{ flex: 1, textAlign: 'center' }}>
    <h1
      style={{
        margin: 0,
        fontSize: "3rem",      // Bigger title
        fontWeight: 800,       // Bolder
        letterSpacing: "1px"
      }}
    >
      Dorm Events
    </h1>
  </div>
  <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
    <a
      className="profile-link"
      href="#"
      style={{
        fontSize: "1.6em",    // Bigger profile text
        fontWeight: 700
      }}
    >
      Profile
    </a>
    <img
      src={USER_PROFILE_PHOTO}
      alt="Profile"
      style={{
        width: '64px',        // Bigger profile photo
        height: '64px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '2px solid #fff',
        boxShadow: '0 0 3px rgba(0,0,0,0.1)'
      }}
    />
  </div>
</header>


      {/* Main Content and Right Sidebar */}
      <div className="main-flex">
        <div className="container">
          {/* Main Content */}
          <div className="event-list">
            {/* Add Event Dropdown */}
            <div className="add-event-dropdown">
              <button
                className={`add-event-toggle ${addEventOpen ? 'open' : ''}`}
                aria-expanded={addEventOpen}
                aria-controls="addEventForm"
                onClick={toggleAddEventForm}
              >
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="#43a047" />
                  <rect x="11" y="6" width="2" height="12" fill="#fff" />
                  <rect x="6" y="11" width="12" height="2" fill="#fff" />
                </svg>
                Add Your Own Event
              </button>
              {addEventOpen && (
                <div style={{
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.07)",
                  padding: "20px",
                  marginTop: "10px",
                  marginBottom: "20px",
                  maxWidth: "400px"
                }}>
                  <form className="add-event-form" id="addEventForm" onSubmit={addCustomEvent}>
                    <div style={{display: "flex", alignItems: "center", marginBottom: "15px"}}>
                      <img
                        src={USER_PROFILE_PHOTO}
                        alt="Your profile"
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          marginRight: "15px",
                          border: "2px solid #a00000"
                        }}
                      />
                      <span style={{fontWeight: "bold", color: "#a00000"}}>Your event photo</span>
                    </div>
                    <input type="text" name="customEventName" placeholder="Event Name" required />
                    <input type="date" name="customEventDate" required />
                    <input type="time" name="customEventTime" required />
                    <input type="text" name="customEventPlace" placeholder="Event Place" required />
                    <input type="text" name="customEventDesc" placeholder="Event Description" required />
                    <button type="submit">Add Event</button>
                    <div className="add-event-success" id="addEventSuccess"></div>
                  </form>
                </div>
              )}
            </div>

            {/* Events List */}
            {allEvents.map(event => {
              const alreadySignedUp = signedUpEvents.some(e => e.id === event.id);
              return (
                <div className="event" key={event.id} id={event.id}>
                  <div className="event-profile">
                    <img src={event.profilePhoto || "https://via.placeholder.com/60"} alt={`${event.name} profile`} />
                  </div>
                  <div className="event-details">
                    <h2 className="event-name">{event.name}</h2>
                    <div className="event-time-place">{event.date} | {event.place || "Location TBD"}</div>
                    <p className="event-desc">{event.desc}</p>
                  </div>
                  <div className="event-signup">
                    {alreadySignedUp ? (
                      <button style={{ background: '#aaa', cursor: 'not-allowed' }} disabled>Signed Up</button>
                    ) : (
                      <button onClick={() => toggleForm(event.id)}>Sign Up</button>
                    )}
                  </div>
                  {openForms[event.id] && !alreadySignedUp && (
                    <form
                      className="signup-form open"
                      id={event.id}
                      onSubmit={(e) => submitForm(e, event.id, event.name, event.date)}
                    >
                      <input type="text" name="name" placeholder="Your Name" required />
                      <input type="email" name="email" placeholder="Your Email" required />
                      <button type="submit">Submit</button>
                    </form>
                  )}
                  <div className="success-message" id={`success${event.id}`}></div>
                </div>
              );
            })}
          </div>

          {/* Right Sidebar */}
          <aside className="sidebar">
            <h3>My Signed Up Events:</h3>
            <ul className="signed-up-list" id="signedUpList">
              {signedUpEvents.length === 0 ? (
                <li style={{ color: '#888' }}>No events yet.</li>
              ) : (
                signedUpEvents.map((event, index) => (
                  <li key={index}>
                    <strong>{event.name}</strong><br />
                    <span style={{ color: '#888' }}>{event.date}</span>
                  </li>
                ))
              )}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;
