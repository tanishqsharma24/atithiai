
const {useState, useEffect, useRef} = React;

/* ---------------- icons (thin-line, currentColor) ---------------- */
const Icon = ({ path, size=17, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {path}
  </svg>
);
const I = {
  home: p => <Icon {...p} path={<path d="M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/>} />,
  bed: p => <Icon {...p} path={<><path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6"/><path d="M3 18h18M3 12V6M7 10h4a2 2 0 0 0 2-2 2 2 0 0 0-2-2H7v4Z"/></>} />,
  calendar: p => <Icon {...p} path={<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></>} />,
  bolt: p => <Icon {...p} path={<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/>} />,
  mappin: p => <Icon {...p} path={<><path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.2"/></>} />,
  wrench: p => <Icon {...p} path={<path d="M14.7 6.3a4 4 0 0 0-5.5 5.1L4 16.6V20h3.4l5.2-5.2a4 4 0 0 0 5.1-5.5l-3 3-2-2 3-3Z"/>} />,
  chat: p => <Icon {...p} path={<path d="M4 4h16v13H8l-4 4V4Z"/>} />,
  sparkles: p => <Icon {...p} path={<><path d="M12 3v5M12 16v5M3 12h5M16 12h5M5.5 5.5l3 3M15.5 15.5l3 3M18.5 5.5l-3 3M8.5 15.5l-3 3"/></>} />,
  bell: p => <Icon {...p} path={<><path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6.5H4c.5-1 2-2.5 2-6.5Z"/><path d="M10 19a2 2 0 0 0 4 0"/></>} />,
  settings: p => <Icon {...p} path={<><circle cx="12" cy="12" r="3"/><path d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1h-.2a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.4 8a1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.6v-.2a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9V9c.2.6.7 1 1.4 1.1h.2a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1Z"/></>} />,
  search: p => <Icon {...p} path={<><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></>} />,
  x: p => <Icon {...p} path={<path d="M6 6l12 12M18 6 6 18"/>} />,
  chevronRight: p => <Icon {...p} path={<path d="m9 6 6 6-6 6"/>} />,
  card: p => <Icon {...p} path={<><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19"/></>} />,
  star: p => <Icon {...p} path={<path d="M12 3.5 14.7 9l6 .9-4.4 4.3 1 6-5.3-2.8-5.3 2.8 1-6-4.4-4.3 6-.9 2.7-5.5Z"/>} />,
  brush: p => <Icon {...p} path={<path d="M4 20c1-3 3-5 5-6l8-8 3 3-8 8c-1 2-3 4-6 5-1-1-2-1-2-2Z"/>} />,
  alert: p => <Icon {...p} path={<><path d="M12 3 2 20h20L12 3Z"/><path d="M12 10v4M12 17h.01"/></>} />,
  fork: p => <Icon {...p} path={<><path d="M8 2v8a2 2 0 0 1-2 2 2 2 0 0 1-2-2V2M6 12v10M18 2c-2 0-3 2-3 5s1 5 3 5v10"/></>} />,
  desk: p => <Icon {...p} path={<><path d="M3 20h18M4 20V9l8-5 8 5v11M9 20v-6h6v6"/></>} />,
  clipboard: p => <Icon {...p} path={<><rect x="6" y="4" width="12" height="17" rx="2"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h6"/></>} />,
  send: p => <Icon {...p} path={<path d="m3 20 18-8L3 4l0 6 12 2-12 2z"/>} />,
  sun: p => <Icon {...p} path={<><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.6M12 18.9v2.6M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12h2.6M18.9 12h2.6M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/></>} />,
  moon: p => <Icon {...p} path={<path d="M20.8 13.8A8.8 8.8 0 1 1 10.2 3.2a7 7 0 0 0 10.6 10.6Z"/>} />,
};

/* ---------------- mock data ---------------- */
const DATA = {
  guest: { name: "Dev", email: "customer@example.com" },
  property: { name: "Amargarh Heritage Stay", location: "Udaipur, Rajasthan" },
  stay: {
    room: "204", roomType: "Deluxe Heritage Room", guests: "2 Adults", bed: "King Bed",
    dates: "Sep 5 – Sep 8, 2026", checkIn: "2:00 PM", checkOut: "11:00 AM", status: "Checked In",
  },
  aiBrief: "Good evening, Dev. Your dinner reservation is available until 9:30 PM, and the property restaurant is 2 minutes from your room.",
  suggestions: ["What can I do here?", "Order room service", "What's nearby?", "What's my checkout time?", "Request housekeeping", "Report an issue"],
  facilities: ["Wi-Fi", "Air Conditioning", "TV", "Hot Water", "Room Service", "Housekeeping", "Bathroom Amenities"],
  roomService: [
    { name:"Rajasthani Thali", price:450 },
    { name:"Paneer Tikka", price:280 },
    { name:"Masala Chai", price:90 },
  ],
  request: { title:"Housekeeping Request", detail:"Fresh towels", status:"IN PROGRESS", time:"6:20 PM", assigned:"Housekeeping" },
  nearby: [
    { name:"City Palace", dist:"2.4 km", sub:"Historic landmark" },
    { name:"Lake Pichola", dist:"3.1 km", sub:"Scenic destination" },
    { name:"Local Restaurant", dist:"1.2 km", sub:"Rajasthani cuisine" },
  ],
  booking: { id:"ATI-2026-20482", room:"Deluxe Heritage Room", guests:"2 Adults", checkIn:"Sep 5, 2:00 PM", checkOut:"Sep 8, 11:00 AM", total:12600, status:"CONFIRMED" },
  payments: { room:10800, services:1200, taxes:600, total:12600, status:"Paid" },
  notifications: [
    { type:"warning", title:"Check-in Reminder", sub:"Your check-in starts at 2:00 PM." },
    { type:"success", title:"Service Update", sub:"Your housekeeping request is now completed." },
    { type:"success", title:"Booking Update", sub:"Your reservation has been confirmed." },
    { type:"info", title:"AtithiAI Recommendation", sub:"A nearby cultural experience may interest you." },
  ],
};

const AI_ANSWERS = {
  "What can I do here?": "You can order room service, request housekeeping, explore nearby attractions, or ask me anything about your stay — I'm here to help with all of it.",
  "Order room service": "Here's tonight's menu: Rajasthani Thali (₹450), Paneer Tikka (₹280), Masala Chai (₹90). Want me to add anything to your order?",
  "What's nearby?": "City Palace is 2.4 km away, Lake Pichola is 3.1 km, and there's a great local restaurant just 1.2 km from here serving Rajasthani cuisine.",
  "What's my checkout time?": "Your checkout is at 11:00 AM on Sep 8. Let me know if you'd like to request a late checkout.",
  "Request housekeeping": "I've noted your housekeeping request — fresh towels are already on the way and should arrive shortly.",
  "Report an issue": "I'm sorry to hear that. Could you tell me a bit more about the issue so I can get the right team to help?",
};

/* ---------------- small building blocks ---------------- */
const Card = ({ children, className="", style }) => (
  <div className={`card ${className}`} style={style}>{children}</div>
);

/* ---------------- Sidebar ---------------- */
const NAV = [
  { icon:"home", label:"Home", id:"dashboard" },
  { icon:"bed", label:"My Stay" },
  { icon:"calendar", label:"Bookings" },
  { icon:"bolt", label:"Rooms & Services" },
  { icon:"mappin", label:"Explore" },
  { icon:"wrench", label:"Requests" },
  { icon:"chat", label:"Messages" },
  { icon:"sparkles", label:"Ask AtithiAI", id:"ask" },
  { icon:"bell", label:"Notifications" },
  { icon:"settings", label:"Profile" },
];

function Sidebar({ active, setActive, onAsk }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-name">AtithiAI</div>
        <div className="brand-sub">Your stay, made simpler.</div>
      </div>
      <div className="nav-group">
        {NAV.map((it, i) => {
          const Icon = I[it.icon];
          const isActive = it.id === active;
          return (
            <button key={i} className={`nav-item ${isActive ? 'active':''}`}
              onClick={() => { if(it.id==='ask'){ onAsk(); } else if (it.id) { setActive(it.id); } }}>
              <Icon size={16} />
              <span>{it.label}</span>
            </button>
          );
        })}
      </div>
      <div className="sidebar-foot">
        <div className="row"><span className="label">Support</span><span className="value">24/7</span></div>
      </div>
    </aside>
  );
}

/* ---------------- Header ---------------- */
function Header({ onAsk, onSearch, onBell, theme, onToggleTheme }) {
  return (
    <div className="header">
      <button className="search-bar" onClick={onSearch}>
        <I.search size={15} style={{color:'var(--text-40)'}}/>
        <span>Search your stay, services or places...</span>
      </button>
      <div className="header-right">
        <button className="ask-ai-btn" onClick={onAsk}><I.sparkles size={14}/> Ask AtithiAI</button>
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label="Toggle appearance theme"
        >
          {theme === 'dark' ? <I.sun size={16}/> : <I.moon size={16}/>}
        </button>
        <button className="icon-btn" onClick={onBell}><I.bell size={16}/><span className="dot-badge"></span></button>
        <button className="profile-btn">
          <div className="avatar">D</div>
          <div className="profile-meta">
            <div className="name">{DATA.guest.name}</div>
            <div className="role">Guest</div>
          </div>
        </button>
      </div>
    </div>
  );
}

/* ---------------- AI Concierge Modal ---------------- */
function AskAtithiAI({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bodyRef = useRef(null);
  useEffect(()=>{ if(bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [messages]);
  const ask = (q) => {
    if(!q.trim()) return;
    const answer = AI_ANSWERS[q] || "I've made a note of that. Is there anything else I can take care of during your stay?";
    setMessages(m => [...m, {role:"user", text:q}, {role:"ai", text:answer}]);
    setInput("");
  };
  return (
    <div className="overlay-bg" onClick={onClose}>
      <div className="ai-modal" onClick={e=>e.stopPropagation()}>
        <div className="ai-modal-head">
          <div>
            <div className="ai-modal-title">✦ AtithiAI Concierge</div>
            <div className="ai-modal-sub">What can I take care of for you?</div>
          </div>
          <button className="icon-btn" onClick={onClose}><I.x size={15}/></button>
        </div>
        <div className="ai-modal-body" ref={bodyRef}>
          {messages.length === 0 && (
            <div className="ai-suggest">
              {DATA.suggestions.map((q,i)=>(
                <button key={i} onClick={()=>ask(q)}>{q}</button>
              ))}
            </div>
          )}
          {messages.map((m,i)=>(
            <div key={i} className={`chat-bubble ${m.role}`}>{m.text}</div>
          ))}
        </div>
        <div className="ai-modal-input">
          <input placeholder="Ask AtithiAI anything..." value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{ if(e.key==='Enter'){ ask(input); } }} />
          <button className="icon-btn" onClick={()=>ask(input)}><I.send size={15}/></button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Sections ---------------- */
function Hero({ onAsk }) {
  return (
    <div className="hero">
      <div className="hero-inner">
        <div className="hero-label">✦ WELCOME TO ATITHIAI</div>
        <h1 className="serif">Welcome, {DATA.guest.name}.</h1>
        <p>Everything you need for a comfortable stay, right at your fingertips.</p>
        <div className="hero-stay">
          <span><strong>{DATA.property.name}</strong></span>
          <span>Room {DATA.stay.room}</span>
          <span>{DATA.stay.dates}</span>
        </div>
        <div className="hero-actions">
          <button className="btn primary">Explore Your Stay →</button>
          <button className="btn" onClick={onAsk}>Ask AtithiAI</button>
        </div>
      </div>
    </div>
  );
}

function CurrentStayCard() {
  return (
    <Card>
      <div className="card-head">
        <span className="card-title">Your Stay</span>
        <span className="status-pill active"><span className="dot"></span>{DATA.stay.status}</span>
      </div>
      <div style={{fontSize:20, fontWeight:500, marginBottom:2}} className="serif">{DATA.property.name}</div>
      <div style={{color:'var(--text-60)', fontSize:13, marginBottom:14}}>Room {DATA.stay.room} · {DATA.stay.dates}</div>
      <div className="row"><span className="label">Check-in</span><span className="value">{DATA.stay.checkIn}</span></div>
      <div className="row"><span className="label">Check-out</span><span className="value">{DATA.stay.checkOut}</span></div>
      <button className="btn" style={{width:'100%', marginTop:16}}>View Stay Details →</button>
    </Card>
  );
}

function StayProgressCard() {
  const steps = [
    {label:"Booked", state:"done"},
    {label:"Confirmed", state:"done"},
    {label:"Checked In", state:"done"},
    {label:"Current Stay", state:"current"},
    {label:"Check-out", state:""},
  ];
  return (
    <Card>
      <div className="card-title">Stay Progress</div>
      <div className="progress-steps">
        {steps.map((s,i)=>(
          <div key={i} className={`progress-step ${s.state}`}>
            {i < steps.length-1 && <div className={`progress-line ${s.state==='done'?'done':''}`}></div>}
            <div className="node">{s.state==='done' ? '✓' : (s.state==='current' ? '●' : '')}</div>
            <div className="label">{s.label}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AIConciergeCard({ onAsk }) {
  return (
    <Card className="ai-card section-gap">
      <div className="ai-head"><I.sparkles size={15}/> ATITHIAI CONCIERGE</div>
      <div className="serif" style={{fontSize:24, marginTop:6}}>Your stay, understood.</div>
      <div className="ai-text">{DATA.aiBrief}</div>
      <div className="suggest-grid">
        {DATA.suggestions.map((s,i)=>(
          <button key={i} className="suggest-chip" onClick={onAsk}>{s}</button>
        ))}
      </div>
    </Card>
  );
}

const QUICK_ACTIONS = [
  { icon:"fork", label:"Dining", sub:"Restaurant & food" },
  { icon:"bolt", label:"Request Service", sub:"Hotel assistance" },
  { icon:"brush", label:"Housekeeping", sub:"Request cleaning" },
  { icon:"alert", label:"Report Issue", sub:"Room or property" },
  { icon:"mappin", label:"Explore", sub:"Nearby places" },
  { icon:"desk", label:"Front Desk", sub:"Talk to staff" },
];
function QuickActions({ onAsk }) {
  return (
    <Card className="section-gap">
      <div className="card-title" style={{marginBottom:16}}>Quick Actions</div>
      <div className="qa-grid">
        {QUICK_ACTIONS.map((a,i)=>{
          const Icon = I[a.icon];
          return (
            <button key={i} className="qa-tile" onClick={onAsk}>
              <div className="ic"><Icon size={16}/></div>
              <div className="qa-label">{a.label}</div>
              <div className="qa-sub">{a.sub}</div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function MyRoomCard() {
  return (
    <Card>
      <div className="card-head">
        <span className="card-title">Your Room</span>
        <button className="card-link">View Details <I.chevronRight size={13}/></button>
      </div>
      <div className="serif" style={{fontSize:20}}>Room {DATA.stay.room}</div>
      <div style={{color:'var(--text-60)', fontSize:13, marginTop:2}}>{DATA.stay.roomType}</div>
      <div className="row"><span className="label">Guests</span><span className="value">{DATA.stay.guests}</span></div>
      <div className="row"><span className="label">Bed</span><span className="value">{DATA.stay.bed}</span></div>
      <div className="chip-row">
        {DATA.facilities.map((f,i)=>(<span key={i} className="facility-chip">{f}</span>))}
      </div>
    </Card>
  );
}

function RoomServiceCard({ onOrder }) {
  return (
    <Card>
      <div className="card-head">
        <span className="card-title">Room Service</span>
      </div>
      {DATA.roomService.map((item,i)=>(
        <div key={i} className="menu-item">
          <div>
            <div className="m-name">{item.name}</div>
            <div className="m-price">₹{item.price}</div>
          </div>
          <button className="add-btn" onClick={onOrder}>Add →</button>
        </div>
      ))}
    </Card>
  );
}

function RequestTrackingCard() {
  const r = DATA.request;
  return (
    <Card>
      <div className="card-head">
        <span className="card-title">Need Something?</span>
      </div>
      <div style={{fontSize:14.5, fontWeight:500}}>{r.title}</div>
      <div style={{color:'var(--text-60)', fontSize:13, marginTop:2}}>{r.detail}</div>
      <div className="row"><span className="label">Requested</span><span className="value">{r.time}</span></div>
      <div className="row"><span className="label">Assigned to</span><span className="value">{r.assigned}</span></div>
      <div className="flow">
        <span className="flow-step">Requested</span><span className="flow-arrow">→</span>
        <span className="flow-step">Accepted</span><span className="flow-arrow">→</span>
        <span className="flow-step active">In Progress</span><span className="flow-arrow">→</span>
        <span className="flow-step">Completed</span>
      </div>
    </Card>
  );
}

function ExploreCard() {
  return (
    <Card>
      <div className="card-head">
        <span className="card-title">Explore Your Destination</span>
        <button className="card-link">Show More <I.chevronRight size={13}/></button>
      </div>
      {DATA.nearby.map((p,i)=>(
        <div key={i} className="place-item">
          <div>
            <div className="p-name">{p.name}</div>
            <div className="p-sub">{p.sub}</div>
          </div>
          <span className="place-dist">{p.dist}</span>
        </div>
      ))}
    </Card>
  );
}

function BookingCard() {
  const b = DATA.booking;
  return (
    <Card>
      <div className="card-head">
        <span className="card-title">Your Bookings</span>
        <span className="badge confirmed">{b.status}</span>
      </div>
      <div className="serif" style={{fontSize:18}}>{DATA.property.name}</div>
      <div style={{color:'var(--text-60)', fontSize:13, marginTop:2}}>Room {DATA.stay.room} · {DATA.stay.dates}</div>
      <div className="row"><span className="label">Booking ID</span><span className="value">{b.id}</span></div>
      <div className="row"><span className="label">Total</span><span className="value">₹{b.total.toLocaleString()}</span></div>
      <button className="btn" style={{width:'100%', marginTop:14}}>View Booking →</button>
    </Card>
  );
}

function PaymentsCard() {
  const p = DATA.payments;
  return (
    <Card>
      <div className="card-head">
        <span className="card-title">Your Stay & Payments</span>
        <span className="badge paid">✓ {p.status}</span>
      </div>
      <div className="row"><span className="label">Room</span><span className="value">₹{p.room.toLocaleString()}</span></div>
      <div className="row"><span className="label">Food &amp; Services</span><span className="value">₹{p.services.toLocaleString()}</span></div>
      <div className="row"><span className="label">Taxes</span><span className="value">₹{p.taxes.toLocaleString()}</span></div>
      <div className="row"><span className="label" style={{fontWeight:500, color:'#fff'}}>Total</span><span className="value serif" style={{fontSize:18}}>₹{p.total.toLocaleString()}</span></div>
    </Card>
  );
}

const NOTIF_COLOR = { warning:'var(--warning)', success:'var(--success)', info:'var(--accent)' };
function NotificationsCard() {
  return (
    <Card>
      <div className="card-title" style={{marginBottom:14}}>Stay in the Loop</div>
      {DATA.notifications.map((n,i)=>(
        <div key={i} className="notif-item">
          <div className="notif-dot" style={{background:NOTIF_COLOR[n.type]}}></div>
          <div>
            <div className="notif-title">{n.title}</div>
            <div className="notif-sub">{n.sub}</div>
          </div>
        </div>
      ))}
    </Card>
  );
}

function FeedbackCard({ onSubmit }) {
  const [rating, setRating] = useState(0);
  return (
    <Card>
      <div className="card-title">How Was Your Stay?</div>
      <div className="serif" style={{fontSize:20, marginTop:8}}>Your feedback helps us make every stay better.</div>
      <div className="stars">
        {[1,2,3,4,5].map(n=>(
          <button key={n} className={`star-btn ${n<=rating?'filled':''}`} onClick={()=>setRating(n)}>★</button>
        ))}
      </div>
      <button className="btn primary" style={{marginTop:16}} onClick={onSubmit}>Submit Feedback →</button>
    </Card>
  );
}

/* ---------------- App ---------------- */
function App() {
  const [active, setActive] = useState("dashboard");
  const [askOpen, setAskOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="app">
      <Sidebar active={active} setActive={setActive} onAsk={()=>setAskOpen(true)} />

      <div className="main">
        <Header onAsk={()=>setAskOpen(true)} onSearch={()=>setToast("Search coming right up.")} onBell={()=>scrollTo('notifications-section')} theme={theme} onToggleTheme={toggleTheme} />

        <div className="content">
          <Hero onAsk={()=>setAskOpen(true)} />

          <div className="grid grid-2 section-gap">
            <CurrentStayCard />
            <StayProgressCard />
          </div>

          <AIConciergeCard onAsk={()=>setAskOpen(true)} />

          <QuickActions onAsk={()=>setAskOpen(true)} />

          <div className="grid grid-2 section-gap" id="room-section">
            <MyRoomCard />
            <RoomServiceCard onOrder={()=>setToast("Added to your order — it's on its way.")} />
          </div>

          <div className="grid grid-2 section-gap" id="requests-section">
            <RequestTrackingCard />
            <ExploreCard />
          </div>

          <div className="grid grid-2 section-gap" id="bookings-section">
            <BookingCard />
            <PaymentsCard />
          </div>

          <div className="grid grid-2 section-gap" id="notifications-section">
            <NotificationsCard />
            <FeedbackCard onSubmit={()=>setToast("Thank you for your feedback!")} />
          </div>
        </div>
      </div>

      {askOpen && <AskAtithiAI onClose={()=>setAskOpen(false)} />}
      {toast && <div className="toast">{toast}</div>}

      <div className="bottom-nav">
        <div className={`bn-item ${active==='dashboard'?'active':''}`}><I.home size={17}/><span>Home</span></div>
        <div className="bn-item"><I.bed size={17}/><span>Stay</span></div>
        <div className="bn-item ai" onClick={()=>setAskOpen(true)}><div className="ic-wrap"><I.sparkles size={16}/></div><span>AI</span></div>
        <div className="bn-item"><I.bell size={17}/><span>Alerts</span></div>
        <div className="bn-item"><I.settings size={17}/><span>More</span></div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
