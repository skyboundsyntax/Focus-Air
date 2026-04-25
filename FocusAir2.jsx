import { useState, useEffect, useRef } from "react";

// ── DATA ──────────────────────────────────────────────────────
const AIRPORTS = [
  {code:"DEL",city:"New Delhi",country:"India",lat:28.57,lon:77.10,tz:"Asia/Kolkata"},
  {code:"BOM",city:"Mumbai",country:"India",lat:19.09,lon:72.87,tz:"Asia/Kolkata"},
  {code:"BLR",city:"Bengaluru",country:"India",lat:13.20,lon:77.71,tz:"Asia/Kolkata"},
  {code:"MAA",city:"Chennai",country:"India",lat:12.99,lon:80.17,tz:"Asia/Kolkata"},
  {code:"HYD",city:"Hyderabad",country:"India",lat:17.24,lon:78.43,tz:"Asia/Kolkata"},
  {code:"CCU",city:"Kolkata",country:"India",lat:22.65,lon:88.45,tz:"Asia/Kolkata"},
  {code:"COK",city:"Kochi",country:"India",lat:10.15,lon:76.40,tz:"Asia/Kolkata"},
  {code:"PNQ",city:"Pune",country:"India",lat:18.58,lon:73.92,tz:"Asia/Kolkata"},
  {code:"AMD",city:"Ahmedabad",country:"India",lat:23.08,lon:72.63,tz:"Asia/Kolkata"},
  {code:"JAI",city:"Jaipur",country:"India",lat:26.82,lon:75.81,tz:"Asia/Kolkata"},
  {code:"LKO",city:"Lucknow",country:"India",lat:26.76,lon:80.89,tz:"Asia/Kolkata"},
  {code:"SXR",city:"Srinagar",country:"India",lat:33.99,lon:74.77,tz:"Asia/Kolkata"},
  {code:"TRV",city:"Thiruvananthapuram",country:"India",lat:8.48,lon:76.92,tz:"Asia/Kolkata"},
  {code:"IXC",city:"Chandigarh",country:"India",lat:30.67,lon:76.79,tz:"Asia/Kolkata"},
  {code:"GAU",city:"Guwahati",country:"India",lat:26.11,lon:91.59,tz:"Asia/Kolkata"},
  {code:"VNS",city:"Varanasi",country:"India",lat:25.45,lon:82.86,tz:"Asia/Kolkata"},
  {code:"UDR",city:"Udaipur",country:"India",lat:24.62,lon:73.90,tz:"Asia/Kolkata"},
  {code:"ATQ",city:"Amritsar",country:"India",lat:31.71,lon:74.80,tz:"Asia/Kolkata"},
  {code:"NAG",city:"Nagpur",country:"India",lat:21.09,lon:79.05,tz:"Asia/Kolkata"},
  {code:"IXZ",city:"Port Blair",country:"India",lat:11.64,lon:92.73,tz:"Asia/Kolkata"},
  {code:"LHR",city:"London",country:"UK",lat:51.47,lon:-0.45,tz:"Europe/London"},
  {code:"CDG",city:"Paris",country:"France",lat:49.01,lon:2.55,tz:"Europe/Paris"},
  {code:"FRA",city:"Frankfurt",country:"Germany",lat:50.04,lon:8.56,tz:"Europe/Berlin"},
  {code:"AMS",city:"Amsterdam",country:"Netherlands",lat:52.31,lon:4.77,tz:"Europe/Amsterdam"},
  {code:"MAD",city:"Madrid",country:"Spain",lat:40.50,lon:-3.57,tz:"Europe/Madrid"},
  {code:"FCO",city:"Rome",country:"Italy",lat:41.80,lon:12.24,tz:"Europe/Rome"},
  {code:"ZRH",city:"Zurich",country:"Switzerland",lat:47.46,lon:8.55,tz:"Europe/Zurich"},
  {code:"IST",city:"Istanbul",country:"Turkey",lat:41.28,lon:28.75,tz:"Europe/Istanbul"},
  {code:"JFK",city:"New York",country:"USA",lat:40.64,lon:-73.78,tz:"America/New_York"},
  {code:"LAX",city:"Los Angeles",country:"USA",lat:33.94,lon:-118.41,tz:"America/Los_Angeles"},
  {code:"ORD",city:"Chicago",country:"USA",lat:41.97,lon:-87.91,tz:"America/Chicago"},
  {code:"SFO",city:"San Francisco",country:"USA",lat:37.62,lon:-122.38,tz:"America/Los_Angeles"},
  {code:"MIA",city:"Miami",country:"USA",lat:25.80,lon:-80.29,tz:"America/New_York"},
  {code:"DXB",city:"Dubai",country:"UAE",lat:25.25,lon:55.37,tz:"Asia/Dubai"},
  {code:"DOH",city:"Doha",country:"Qatar",lat:25.27,lon:51.61,tz:"Asia/Qatar"},
  {code:"AUH",city:"Abu Dhabi",country:"UAE",lat:24.43,lon:54.65,tz:"Asia/Dubai"},
  {code:"RUH",city:"Riyadh",country:"Saudi Arabia",lat:24.96,lon:46.70,tz:"Asia/Riyadh"},
  {code:"SIN",city:"Singapore",country:"Singapore",lat:1.36,lon:103.99,tz:"Asia/Singapore"},
  {code:"HKG",city:"Hong Kong",country:"China",lat:22.31,lon:113.92,tz:"Asia/Hong_Kong"},
  {code:"NRT",city:"Tokyo",country:"Japan",lat:35.77,lon:140.39,tz:"Asia/Tokyo"},
  {code:"ICN",city:"Seoul",country:"South Korea",lat:37.46,lon:126.44,tz:"Asia/Seoul"},
  {code:"BKK",city:"Bangkok",country:"Thailand",lat:13.69,lon:100.75,tz:"Asia/Bangkok"},
  {code:"KUL",city:"Kuala Lumpur",country:"Malaysia",lat:2.75,lon:101.71,tz:"Asia/Kuala_Lumpur"},
  {code:"SYD",city:"Sydney",country:"Australia",lat:-33.94,lon:151.18,tz:"Australia/Sydney"},
  {code:"GRU",city:"São Paulo",country:"Brazil",lat:-23.44,lon:-46.47,tz:"America/Sao_Paulo"},
  {code:"YYZ",city:"Toronto",country:"Canada",lat:43.68,lon:-79.62,tz:"America/Toronto"},
  {code:"CAI",city:"Cairo",country:"Egypt",lat:30.12,lon:31.41,tz:"Africa/Cairo"},
  {code:"JNB",city:"Johannesburg",country:"South Africa",lat:-26.14,lon:28.25,tz:"Africa/Johannesburg"},
  {code:"NBO",city:"Nairobi",country:"Kenya",lat:-1.32,lon:36.93,tz:"Africa/Nairobi"},
  {code:"CMB",city:"Colombo",country:"Sri Lanka",lat:7.18,lon:79.88,tz:"Asia/Colombo"},
  {code:"KTM",city:"Kathmandu",country:"Nepal",lat:27.70,lon:85.36,tz:"Asia/Kathmandu"},
  {code:"DAC",city:"Dhaka",country:"Bangladesh",lat:23.84,lon:90.40,tz:"Asia/Dhaka"},
  {code:"PEK",city:"Beijing",country:"China",lat:40.08,lon:116.60,tz:"Asia/Shanghai"},
  {code:"PVG",city:"Shanghai",country:"China",lat:31.14,lon:121.81,tz:"Asia/Shanghai"},
];

const AIRLINES = [
  {code:"AI",name:"Air India",country:"India",color:"#E31837",accent:"#C8A951"},
  {code:"6E",name:"IndiGo",country:"India",color:"#0A0082",accent:"#00BFFF"},
  {code:"SG",name:"SpiceJet",country:"India",color:"#D2232A",accent:"#FF8C00"},
  {code:"UK",name:"Vistara",country:"India",color:"#6B2C91",accent:"#C8A951"},
  {code:"QP",name:"Akasa Air",country:"India",color:"#FF6B00",accent:"#1A1A2E"},
  {code:"EK",name:"Emirates",country:"UAE",color:"#CC0000",accent:"#C8A951"},
  {code:"QR",name:"Qatar Airways",country:"Qatar",color:"#5C0632",accent:"#C8A951"},
  {code:"EY",name:"Etihad Airways",country:"UAE",color:"#BD8B13",accent:"#FFFFFF"},
  {code:"SV",name:"Saudia",country:"Saudi Arabia",color:"#006341",accent:"#FFFFFF"},
  {code:"BA",name:"British Airways",country:"UK",color:"#075AAA",accent:"#EB2226"},
  {code:"LH",name:"Lufthansa",country:"Germany",color:"#05164D",accent:"#FFCC00"},
  {code:"AF",name:"Air France",country:"France",color:"#002157",accent:"#E30613"},
  {code:"KL",name:"KLM",country:"Netherlands",color:"#00A1DE",accent:"#00247D"},
  {code:"TK",name:"Turkish Airlines",country:"Turkey",color:"#C70A0A",accent:"#FFFFFF"},
  {code:"AA",name:"American Airlines",country:"USA",color:"#0078D2",accent:"#EE1C25"},
  {code:"UA",name:"United Airlines",country:"USA",color:"#002244",accent:"#CAAB54"},
  {code:"DL",name:"Delta Air Lines",country:"USA",color:"#003366",accent:"#E31837"},
  {code:"SQ",name:"Singapore Airlines",country:"Singapore",color:"#0B3D91",accent:"#F5A623"},
  {code:"CX",name:"Cathay Pacific",country:"Hong Kong",color:"#006564",accent:"#007B5E"},
  {code:"NH",name:"ANA",country:"Japan",color:"#0065B3",accent:"#72B8EB"},
  {code:"JL",name:"Japan Airlines",country:"Japan",color:"#D7003A",accent:"#FFFFFF"},
  {code:"KE",name:"Korean Air",country:"South Korea",color:"#00256C",accent:"#C8A951"},
  {code:"QF",name:"Qantas",country:"Australia",color:"#CC0000",accent:"#FFFFFF"},
  {code:"ET",name:"Ethiopian Airlines",country:"Ethiopia",color:"#007A3D",accent:"#F0C000"},
  {code:"AC",name:"Air Canada",country:"Canada",color:"#CC0000",accent:"#FFFFFF"},
];

const FOOD = [
  {id:"peanuts",name:"Salted Peanuts",xp:10,mins:2,emoji:"🥜"},
  {id:"beverage",name:"Soft Beverage",xp:20,mins:4,emoji:"🥤"},
  {id:"juice",name:"Fruit Juice",xp:30,mins:5,emoji:"🧃"},
  {id:"sandwich",name:"Club Sandwich",xp:50,mins:8,emoji:"🥪"},
  {id:"meal",name:"Full Meal Tray",xp:80,mins:15,emoji:"🍱"},
  {id:"wine",name:"Premium Wine",xp:120,mins:20,emoji:"🍷"},
];

const PHASES = ["Boarding","Takeoff","Cruise","Descent","Landing"];

// ── HELPERS ───────────────────────────────────────────────────
function haversine(lat1,lon1,lat2,lon2){
  const R=6371,d2r=Math.PI/180;
  const a=Math.sin((lat2-lat1)*d2r/2)**2+Math.cos(lat1*d2r)*Math.cos(lat2*d2r)*Math.sin((lon2-lon1)*d2r/2)**2;
  return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}
function duration(km){
  if(km<300) return Math.round(40+km*0.09);
  if(km<700) return Math.round(60+km*0.07);
  if(km<2000) return Math.round(80+km*0.065);
  if(km<6000) return Math.round(110+km*0.055);
  return Math.round(140+km*0.048);
}
function hms(s){const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sc=s%60;return`${pad(h)}:${pad(m)}:${pad(sc)}`;}
function pad(n){return String(n).padStart(2,"0");}
function fmt(m){const h=Math.floor(m/60);return h>0?`${h}h ${m%60}m`:`${m}m`;}
function cityTime(tz){
  try{return new Intl.DateTimeFormat("en",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false,timeZone:tz}).format(new Date());}
  catch{return "--:--:--";}
}
function getPhase(p){
  if(p<0.05) return 0;
  if(p<0.15) return 1;
  if(p<0.85) return 2;
  if(p<0.95) return 3;
  return 4;
}
function skyBg(p){
  if(p<0.05) return"linear-gradient(180deg,#1a3a5c 0%,#2d6a9f 40%,#87ceeb 80%,#90c06e 95%)";
  if(p<0.15) return"linear-gradient(180deg,#0f2745 0%,#1e5080 35%,#4a9fd4 65%,#87ceeb 85%)";
  if(p<0.40) return"linear-gradient(180deg,#0e3a6e 0%,#1a6eb5 20%,#5baad4 45%,#a8d4f0 65%,#ffffff 80%)";
  if(p<0.65) return"linear-gradient(180deg,#0a2a5a 0%,#1a5a9a 25%,#4a9ad4 50%,#87ceeb 70%,#e0f0ff 90%)";
  if(p<0.80) return"linear-gradient(180deg,#1a0a2e 0%,#8b1a4a 20%,#c0392b 35%,#e67e22 55%,#f39c12 70%,#ffd89b 85%)";
  if(p<0.93) return"linear-gradient(180deg,#050d1a 0%,#0a1a30 25%,#0f2d50 50%,#2d7ab5 80%)";
  return"linear-gradient(180deg,#000005 0%,#05051a 30%,#0a0a2e 60%,#1a2a50 85%)";
}

// A380 seat map — generated once at module level is fine (no random)
function makeSeats(){
  const s=[];
  for(let r=1;r<=7;r++) ["A","D","G","K"].forEach(l=>s.push({id:`${r}${l}`,row:r,col:l,cls:"first",win:l==="A"||l==="K"}));
  for(let r=8;r<=22;r++) ["A","B","D","E","G","K"].forEach(l=>s.push({id:`${r}${l}`,row:r,col:l,cls:"business",win:l==="A"||l==="K"}));
  for(let r=23;r<=50;r++) ["A","B","C","D","E","F","G","H","J","K"].forEach(l=>s.push({id:`${r}${l}`,row:r,col:l,cls:"economy",win:l==="A"||l==="K"}));
  return s;
}
const ALL_SEATS = makeSeats();

// Pre-compute occupied seats deterministically (no Math.random in render)
const OCCUPIED = new Set(ALL_SEATS.filter((_,i)=>i%3===1||i%7===4).map(s=>s.id));

// Stars pre-computed (no random in render)
const STARS = Array.from({length:60},(_,i)=>({
  top:(i*37+13)%70, left:(i*61+7)%100,
  size:i%5===0?2:1, delay:i%4
}));

// ── FLIGHT ATTENDANT ──────────────────────────────────────────
function getMsg(timerSecs,totalSecs,female,phaseIdx,consecSecs){
  const name=female?"Sofia":"Arjun";
  const hoursLeft=Math.max(0,(totalSecs-timerSecs)/3600);
  const hoursDone=consecSecs/3600;

  if(phaseIdx===0) return`Welcome! I'm ${name}. Fasten your seatbelt — your focus session begins shortly! ✨`;
  if(phaseIdx===1) return`We're taking off! All distractions off, focus mode on. You've got this! 🛫`;
  if(phaseIdx===4) return`We're landing! What an incredible focus session. You should be proud! 🛬`;

  const done=Math.floor(timerSecs/3600);
  if(timerSecs>0&&timerSecs%3600<2){
    if(hoursDone>=5) return`${done} hours straight! You're remarkable — but please consider a break! 💪`;
    return`${done} hour${done>1?"s":""} complete! ${Math.round(hoursLeft*10)/10} more to destination. Outstanding! ⭐`;
  }
  const msgs=[
    "You're focusing beautifully. The captain is impressed! ✈️",
    "Cruising at peak altitude — just like your concentration! 🌤",
    "No turbulence in sight. Your deep work is exceptional! 💫",
    "The skies are clear and so is your mind. Keep going! ☀️",
    "Your focus is stronger than our jet engines right now! 🔥",
    `${Math.round(hoursLeft*60)} minutes to landing. Maintain momentum! ⚡`,
    "Cabin pressure optimal, focus levels exceptional! 🌟",
  ];
  return msgs[Math.floor(timerSecs/45)%msgs.length];
}

function Attendant({female,accent,msg,onDismiss}){
  const hair=female?"#3D1C02":"#2C1A0E";
  const skin="#F4C08A";
  return(
    <div style={{position:"fixed",bottom:0,right:20,zIndex:200,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8}}>
      {msg&&(
        <div style={{background:"rgba(8,8,20,0.96)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"16px 16px 4px 16px",padding:"12px 16px",maxWidth:220,fontSize:12,lineHeight:1.6,color:"#e8e8e8",backdropFilter:"blur(20px)",boxShadow:"0 8px 32px rgba(0,0,0,0.7)",position:"relative"}}>
          <div style={{fontSize:9,color:accent,fontWeight:700,letterSpacing:1.5,marginBottom:5,textTransform:"uppercase"}}>{female?"Sofia":"Arjun"} · Cabin Crew</div>
          {msg}
          <button onClick={onDismiss} style={{position:"absolute",top:6,right:10,background:"none",border:"none",color:"#555",cursor:"pointer",fontSize:14,lineHeight:1}}>×</button>
        </div>
      )}
      <svg width="64" height="108" viewBox="0 0 64 108" style={{filter:`drop-shadow(0 4px 16px ${accent}55)`,cursor:"pointer"}} onClick={onDismiss}>
        <ellipse cx="24" cy="104" rx="7" ry="3" fill="#111"/>
        <ellipse cx="40" cy="104" rx="7" ry="3" fill="#111"/>
        <rect x="21" y="78" width="7" height="27" rx="3" fill="#2a1a0e"/>
        <rect x="36" y="78" width="7" height="27" rx="3" fill="#2a1a0e"/>
        {female?<path d="M17 72 Q32 84 47 72 L45 80 Q32 90 19 80Z" fill={accent}/>:<rect x="18" y="70" width="28" height="14" rx="4" fill={accent}/>}
        <rect x="16" y="42" width="32" height="30" rx="6" fill={accent}/>
        <path d="M27 42 L32 50 L37 42" fill="rgba(255,255,255,0.12)"/>
        <rect x="30" y="42" width="4" height="12" rx="2" fill={female?"rgba(255,255,255,0.8)":"rgba(0,0,0,0.4)"}/>
        <path d="M16 48 Q7 54 11 64" stroke={accent} strokeWidth="7" fill="none" strokeLinecap="round"/>
        <path d="M48 48 Q58 40 55 32" stroke={accent} strokeWidth="7" fill="none" strokeLinecap="round" style={{transformOrigin:"48px 48px",animation:"wave 2s ease-in-out infinite"}}/>
        <circle cx="11" cy="65" r="4" fill={skin}/>
        <circle cx="55" cy="31" r="4" fill={skin}/>
        <rect x="27" y="34" width="10" height="10" rx="5" fill={skin}/>
        <ellipse cx="32" cy="26" rx="13" ry="15" fill={skin}/>
        {female?(
          <>
            <ellipse cx="32" cy="13" rx="13" ry="7" fill={hair}/>
            <path d="M19 17 Q15 30 17 40" stroke={hair} strokeWidth="6" fill="none" strokeLinecap="round"/>
            <path d="M45 17 Q49 30 47 40" stroke={hair} strokeWidth="6" fill="none" strokeLinecap="round"/>
            <circle cx="32" cy="11" r="5" fill={hair}/>
          </>
        ):(
          <>
            <ellipse cx="32" cy="13" rx="13" ry="6" fill={hair}/>
            <path d="M19 15 Q17 22 19 28" stroke={hair} strokeWidth="4" fill="none"/>
            <path d="M45 15 Q47 22 45 28" stroke={hair} strokeWidth="4" fill="none"/>
          </>
        )}
        <ellipse cx="26" cy="27" rx="2.5" ry="3" fill="#2c1a0e"/>
        <ellipse cx="38" cy="27" rx="2.5" ry="3" fill="#2c1a0e"/>
        <circle cx="26.8" cy="26" r="0.8" fill="#fff"/>
        <circle cx="38.8" cy="26" r="0.8" fill="#fff"/>
        <path d="M26 33 Q32 39 38 33" stroke="#c07848" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <rect x="20" y="11" width="24" height="5" rx="2" fill={accent}/>
        <rect x="23" y="8" width="18" height="5" rx="2" fill={accent}/>
        <circle cx="32" cy="8" r="1.8" fill="rgba(255,255,255,0.7)"/>
      </svg>
    </div>
  );
}

// ── BOARDING PASS ─────────────────────────────────────────────
function BoardingPass({dep,arr,al,seat,fi,name,cls,onBoard}){
  const bars = Array.from({length:60},(_,i)=>i);
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(20px)"}}>
      <div style={{width:"min(460px,94vw)"}}>
        <div style={{background:"#0a0a14",borderRadius:20,overflow:"hidden",boxShadow:"0 40px 100px rgba(0,0,0,0.9),0 0 0 1px rgba(255,255,255,0.06)"}}>
          <div style={{background:`linear-gradient(135deg,${al.color},${al.accent})`,padding:"20px 24px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{fontSize:10,opacity:0.75,letterSpacing:3,textTransform:"uppercase"}}>Boarding Pass</div>
                <div style={{fontSize:20,fontWeight:800,marginTop:4}}>{al.name}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:26,fontWeight:900,letterSpacing:-1}}>{fi.flightNum}</div>
                <div style={{fontSize:10,opacity:0.7}}>FOCUS CLASS</div>
              </div>
            </div>
          </div>
          <div style={{padding:"18px 24px",borderBottom:"1px dashed rgba(255,255,255,0.07)"}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:32,fontWeight:900,color:"#fff"}}>{dep.code}</div>
                <div style={{fontSize:11,color:"#777"}}>{dep.city}</div>
                <div style={{fontSize:12,fontWeight:700,color:al.accent,marginTop:4}}>{fi.depTime}</div>
              </div>
              <div style={{flex:1,textAlign:"center"}}>
                <div style={{fontSize:20}}>✈</div>
                <div style={{height:1,background:`linear-gradient(90deg,transparent,${al.accent}66,transparent)`,margin:"6px 0"}}/>
                <div style={{fontSize:10,color:"#555"}}>{fmt(fi.durationMins)} · {fi.dist}km</div>
              </div>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:32,fontWeight:900,color:"#fff"}}>{arr.code}</div>
                <div style={{fontSize:11,color:"#777"}}>{arr.city}</div>
                <div style={{fontSize:12,fontWeight:700,color:al.accent,marginTop:4}}>{fi.arrTime}</div>
              </div>
            </div>
          </div>
          <div style={{padding:"14px 24px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:12,borderBottom:"1px dashed rgba(255,255,255,0.07)"}}>
            {[["PASSENGER",name.toUpperCase()],["SEAT",seat||"—"],["GATE",fi.gate],["CLASS",cls.toUpperCase()],["BOARDING",fi.depTime],["AIRCRAFT","A380"],["STATUS","READY"],["TYPE","FOCUS"]].map(([l,v])=>(
              <div key={l}>
                <div style={{fontSize:8,color:"#444",letterSpacing:1.5,textTransform:"uppercase",marginBottom:3}}>{l}</div>
                <div style={{fontSize:11,fontWeight:700,color:"#ccc"}}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{padding:"14px 24px",display:"flex",alignItems:"center",gap:16}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",gap:1,height:36,alignItems:"flex-end"}}>
                {bars.map(i=>(
                  <div key={i} style={{flex:1,height:`${50+(i*17+fi.dist)%45}%`,background:`${al.accent}${i%3===0?"ff":"66"}`}}/>
                ))}
              </div>
              <div style={{fontSize:8,color:"#333",marginTop:3,fontFamily:"monospace"}}>{fi.flightNum}{dep.code}{arr.code}{seat}</div>
            </div>
            <button onClick={onBoard} style={{background:`linear-gradient(135deg,${al.color},${al.accent})`,border:"none",borderRadius:12,padding:"13px 20px",color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer",whiteSpace:"nowrap"}}>
              Board →
            </button>
          </div>
        </div>
        <p style={{textAlign:"center",color:"#333",fontSize:11,marginTop:10}}>Please proceed to your focus session</p>
      </div>
    </div>
  );
}

// ── SEAT MAP ──────────────────────────────────────────────────
function SeatMap({selected,onSelect,cls}){
  const seats=ALL_SEATS.filter(s=>s.cls===cls);
  const rows=[...new Set(seats.map(s=>s.row))];
  const cols=cls==="first"?["A","","D","G","","K"]:cls==="business"?["A","B","","D","E","","G","K"]:["A","B","C","","D","E","F","","G","H","J","K"];
  return(
    <div style={{overflowY:"auto",maxHeight:280,padding:"4px 0"}}>
      <div style={{display:"flex",gap:2,marginBottom:6,paddingLeft:30}}>
        {cols.map((c,i)=><span key={i} style={{width:24,textAlign:"center",fontSize:9,color:"#555",fontFamily:"monospace"}}>{c}</span>)}
      </div>
      {rows.map(r=>{
        const rowSeats=seats.filter(s=>s.row===r);
        return(
          <div key={r} style={{display:"flex",alignItems:"center",gap:2,marginBottom:2}}>
            <span style={{width:26,fontSize:9,color:"#444",fontFamily:"monospace",textAlign:"right",paddingRight:4}}>{r}</span>
            {cols.map((c,ci)=>{
              if(c==="") return <div key={ci} style={{width:8}}/>;
              const s=rowSeats.find(x=>x.col===c);
              if(!s) return <div key={ci} style={{width:24}}/>;
              const taken=OCCUPIED.has(s.id);
              const isSel=selected===s.id;
              return(
                <button key={ci} onClick={()=>!taken&&onSelect(s.id)}
                  title={`${s.id} ${s.win?"Window":"Aisle/Middle"}`}
                  style={{width:24,height:18,borderRadius:3,border:`1px solid ${isSel?"#00D4FF":taken?"#1a1a1a":cls==="first"?"#C8A95133":cls==="business"?"#6B2C9133":"#1a3a5c55"}`,cursor:taken?"not-allowed":"pointer",background:isSel?"#00D4FF":taken?"#0d0d0d":cls==="first"?"#1a0e00":cls==="business"?"#110820":"#050f1a",color:isSel?"#000":"#4a7aaa",fontSize:7,fontWeight:isSel?"800":"400",boxShadow:isSel?"0 0 8px #00D4FF88":"none",transition:"all 0.12s"}}>
                  {s.win&&!taken?"W":""}
                </button>
              );
            })}
          </div>
        );
      })}
      <p style={{textAlign:"center",color:"#333",fontSize:10,marginTop:6}}>W = Window · Scroll for more rows</p>
    </div>
  );
}

// ── DROPDOWN ──────────────────────────────────────────────────
function Dropdown({label,placeholder,query,setQuery,selected,onSelect,items,renderLabel,renderRow,itemKey}){
  const [open,setOpen]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{
    const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};
    document.addEventListener("mousedown",h);
    return()=>document.removeEventListener("mousedown",h);
  },[]);
  return(
    <div ref={ref} style={{position:"relative"}}>
      <div style={{fontSize:10,color:"#555",letterSpacing:2,textTransform:"uppercase",marginBottom:7}}>{label}</div>
      <input value={query} onChange={e=>{setQuery(e.target.value);setOpen(true);onSelect(null);}} onFocus={()=>setOpen(true)} placeholder={placeholder}
        style={{width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:"11px 14px",color:"#e8e8e8",fontSize:13,outline:"none",boxSizing:"border-box"}}/>
      {selected&&<div style={{fontSize:10,color:"#00D4AA",marginTop:4}}>✓ {renderLabel(selected)}</div>}
      {open&&query.length>0&&(
        <div style={{position:"absolute",top:"calc(100% + 4px)",left:0,right:0,background:"#0d0d1e",border:"1px solid rgba(255,255,255,0.09)",borderRadius:10,zIndex:500,maxHeight:220,overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,0.9)"}}>
          {items.length===0
            ?<div style={{padding:"12px 14px",color:"#444",fontSize:12}}>No results</div>
            :items.map(item=>(
              <div key={item[itemKey]} onClick={()=>{onSelect(item);setQuery(renderLabel(item));setOpen(false);}}
                style={{padding:"10px 14px",cursor:"pointer",borderBottom:"1px solid rgba(255,255,255,0.04)"}}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.05)"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                {renderRow(item)}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

// ── CITY CLOCK ────────────────────────────────────────────────
function CityCard({ap,label}){
  const [t,setT]=useState(()=>cityTime(ap.tz));
  useEffect(()=>{const id=setInterval(()=>setT(cityTime(ap.tz)),1000);return()=>clearInterval(id);},[ap.tz]);
  const temps={India:32,UAE:38,UK:12,USA:18,Japan:15,Australia:20,France:14,Germany:10,Singapore:30};
  const temp=temps[ap.country]||20;
  return(
    <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,padding:"13px 16px"}}>
      <div style={{fontSize:9,color:"#444",letterSpacing:2,textTransform:"uppercase",marginBottom:5}}>{label}</div>
      <div style={{fontSize:20,fontWeight:900,letterSpacing:-0.5}}>{ap.code}</div>
      <div style={{fontSize:11,color:"#666",marginBottom:6}}>{ap.city}, {ap.country}</div>
      <div style={{fontFamily:"monospace",fontSize:15,color:"#00D4FF",marginBottom:4}}>{t}</div>
      <div style={{fontSize:11,color:"#888"}}>{temp}°C · Local Time</div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────
export default function App(){
  const [screen,setScreen]=useState("home");
  const [dep,setDep]=useState(null);
  const [arr,setArr]=useState(null);
  const [al,setAl]=useState(null);
  const [seat,setSeat]=useState(null);
  const [cls,setCls]=useState("economy");
  const [pName,setPName]=useState("");
  const [fi,setFi]=useState(null);
  const [showBP,setShowBP]=useState(false);
  const [timer,setTimer]=useState(0);
  const [running,setRunning]=useState(false);
  const [phase,setPhase]=useState(0);
  const [prog,setProg]=useState(0);
  const [xp,setXp]=useState(0);
  const [logs,setLogs]=useState([]);
  const [breakSecs,setBreakSecs]=useState(0);
  const [breaking,setBreaking]=useState(false);
  const [abortOpen,setAbortOpen]=useState(false);
  const [foodOpen,setFoodOpen]=useState(false);
  const [female,setFemale]=useState(true);
  const [attMsg,setAttMsg]=useState("");
  const [showAtt,setShowAtt]=useState(false);
  const [depQ,setDepQ]=useState("");const [depSel,setDepSel]=useState(null);
  const [arrQ,setArrQ]=useState("");const [arrSel,setArrSel]=useState(null);
  const [alQ,setAlQ]=useState("");const [alSel,setAlSel]=useState(null);

  // Refs to avoid stale closures
  const timerRef=useRef(null);
  const breakRef=useRef(null);
  const attRef=useRef(null);
  const ctx=useRef({});
  const lastHr=useRef(0);
  const consecRef=useRef(0);
  const consecState=useRef(0);

  // Keep ctx always fresh
  useEffect(()=>{ctx.current={dep,arr,al,fi,pName,cls,seat,xp};},[dep,arr,al,fi,pName,cls,seat,xp]);

  const totalSecs=fi?fi.durationMins*60:0;
  const ac=al?.color||"#0A0082";
  const aa=al?.accent||"#00BFFF";
  const isWin=seat&&ALL_SEATS.find(s=>s.id===seat)?.win;

  // ── complete flight (uses ref, no stale closure) ──
  function doComplete(){
    const c=ctx.current;
    if(!c.fi) return;
    const earned=Math.floor(c.fi.durationMins/60*100)+75;
    setXp(p=>p+earned);
    setLogs(p=>[{id:Date.now(),dep:c.dep.code,arr:c.arr.code,al:c.al.name,seat:c.seat,cls:c.cls,dur:c.fi.durationMins,xpE:earned,date:new Date().toLocaleDateString(),done:true,fn:c.fi.flightNum,pax:c.pName},...p]);
    setScreen("home");
  }

  // ── timer ──
  useEffect(()=>{
    if(running&&!breaking){
      timerRef.current=setInterval(()=>{
        setTimer(prev=>{
          const next=prev+1;
          const total=ctx.current.fi?ctx.current.fi.durationMins*60:0;
          const p=total>0?next/total:0;
          setProg(p);
          setPhase(getPhase(p));
          consecRef.current=consecState.current+1;
          consecState.current=consecRef.current;
          const hr=Math.floor(next/3600);
          if(hr>lastHr.current){
            lastHr.current=hr;
            setAttMsg(getMsg(next,total,female,getPhase(p),consecRef.current));
            setShowAtt(true);
          }
          if(total>0&&next>=total){
            clearInterval(timerRef.current);
            setRunning(false);
            doComplete();
          }
          return next;
        });
      },1000);
    }
    return()=>clearInterval(timerRef.current);
  },[running,breaking,female]);

  // ── break timer ──
  useEffect(()=>{
    if(breaking&&breakSecs>0){
      breakRef.current=setInterval(()=>{
        setBreakSecs(b=>{
          if(b<=1){clearInterval(breakRef.current);setBreaking(false);setRunning(true);consecState.current=0;consecRef.current=0;return 0;}
          return b-1;
        });
      },1000);
    }
    return()=>clearInterval(breakRef.current);
  },[breaking,breakSecs]);

  // ── periodic attendant ──
  useEffect(()=>{
    if(!running||breaking) return;
    attRef.current=setInterval(()=>{
      const total=ctx.current.fi?ctx.current.fi.durationMins*60:0;
      setAttMsg(getMsg(timer,total,female,phase,consecRef.current));
      setShowAtt(true);
    },120000);
    return()=>clearInterval(attRef.current);
  },[running,breaking,female,phase,timer]);

  function startFlight(){
    if(!dep||!arr||!al||!seat||!pName.trim()) return;
    const dist=Math.round(haversine(dep.lat,dep.lon,arr.lat,arr.lon));
    const dur=duration(dist);
    const fn=`${al.code}${Math.floor(Math.random()*9000+1000)}`;
    const gate=`${String.fromCharCode(65+Math.floor(Math.random()*8))}${Math.floor(Math.random()*30+1)}`;
    const now=new Date();
    const depTime=`${pad(now.getHours())}:${pad(now.getMinutes())}`;
    const arrD=new Date(now.getTime()+dur*60000);
    const arrTime=`${pad(arrD.getHours())}:${pad(arrD.getMinutes())}`;
    const info={dist,durationMins:dur,flightNum:fn,gate,depTime,arrTime};
    setFi(info);
    setTimer(0);setProg(0);setPhase(0);setRunning(false);setBreaking(false);setBreakSecs(0);
    setFemale(Math.random()>0.5);
    lastHr.current=0;consecRef.current=0;consecState.current=0;
    setShowBP(true);
    setScreen("flight");
  }

  function doAbort(){
    const earned=Math.floor((timer/3600)*100);
    setXp(p=>p+earned);
    setLogs(p=>[{id:Date.now(),dep:dep.code,arr:arr.code,al:al.name,seat,cls,dur:Math.floor(timer/60),xpE:earned,date:new Date().toLocaleDateString(),done:false,fn:fi?.flightNum,pax:pName},...p]);
    clearInterval(timerRef.current);setRunning(false);setAbortOpen(false);setScreen("home");
  }

  function buyFood(item){
    if(xp<item.xp) return;
    setXp(p=>p-item.xp);setBreakSecs(item.mins*60);setBreaking(true);setRunning(false);setFoodOpen(false);
  }

  const fDep=AIRPORTS.filter(a=>a.code.includes(depQ.toUpperCase())||a.city.toLowerCase().includes(depQ.toLowerCase())||a.country.toLowerCase().includes(depQ.toLowerCase())).slice(0,8);
  const fArr=AIRPORTS.filter(a=>a.code.includes(arrQ.toUpperCase())||a.city.toLowerCase().includes(arrQ.toLowerCase())||a.country.toLowerCase().includes(arrQ.toLowerCase())).slice(0,8);
  const fAl=AIRLINES.filter(a=>a.name.toLowerCase().includes(alQ.toLowerCase())||a.code.toLowerCase().includes(alQ.toLowerCase())||a.country.toLowerCase().includes(alQ.toLowerCase())).slice(0,10);

  const pct=Math.round(prog*100);
  const rem=Math.max(totalSecs-timer,0);
  const isNight=prog>0.8;
  const isSunset=prog>0.6&&prog<=0.8;

  // ═══ HOME ═══════════════════════════════════════════════════
  if(screen==="home") return(
    <div style={{minHeight:"100vh",background:"#06060f",color:"#e8e8e8",fontFamily:"system-ui,sans-serif"}}>
      <style>{`*{box-sizing:border-box}@keyframes wave{0%,100%{transform:rotate(-10deg)}50%{transform:rotate(15deg)}}@keyframes fly{0%{transform:translateX(-4px)}50%{transform:translateX(4px)}100%{transform:translateX(-4px)}}::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:4px}input::placeholder{color:#333}input:focus{border-color:rgba(255,255,255,.18)!important;outline:none}`}</style>
      <div style={{position:"fixed",inset:0,background:"radial-gradient(ellipse 80% 50% at 20% 60%,#0d1b4b18,transparent),radial-gradient(ellipse 60% 40% at 80% 20%,#1a0b3b15,transparent)",zIndex:0}}/>
      <div style={{position:"fixed",inset:0,backgroundImage:"radial-gradient(circle,rgba(255,255,255,.02) 1px,transparent 1px)",backgroundSize:"50px 50px",zIndex:0}}/>
      <div style={{position:"relative",zIndex:1,maxWidth:800,margin:"0 auto",padding:"48px 20px"}}>
        <div style={{textAlign:"center",marginBottom:44}}>
          <div style={{fontSize:11,letterSpacing:6,color:"#333",textTransform:"uppercase",marginBottom:14}}>Productivity Aviation</div>
          <div style={{fontSize:48,animation:"fly 4s ease-in-out infinite",marginBottom:10}}>✈</div>
          <h1 style={{fontSize:46,fontWeight:900,letterSpacing:-2,margin:0,background:"linear-gradient(135deg,#fff,#a0c4ff 60%,#7ec8e3)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>FocusAir 2.0</h1>
          <p style={{color:"#444",marginTop:10,fontSize:14}}>Your productivity, elevated to 35,000 feet</p>
          <div style={{display:"flex",justifyContent:"center",gap:10,marginTop:18,flexWrap:"wrap"}}>
            {[["✦",`${xp.toLocaleString()} XP`],["🛫",`${logs.filter(l=>l.done).length} Flights`],["⏱",`${Math.floor(logs.reduce((a,l)=>a+l.dur,0)/60)}h Flown`]].map(([ic,val])=>(
              <div key={val} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:20,padding:"6px 16px",fontSize:12,color:"#888"}}>{ic} {val}</div>
            ))}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:14,marginBottom:16}}>
          <button onClick={()=>setScreen("booking")} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:18,padding:26,cursor:"pointer",textAlign:"left",transition:"all 0.2s"}}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.06)";e.currentTarget.style.border="1px solid rgba(255,255,255,0.13)"}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.03)";e.currentTarget.style.border="1px solid rgba(255,255,255,0.07)"}}>
            <div style={{fontSize:32,marginBottom:10}}>🎫</div>
            <div style={{fontSize:20,fontWeight:800,color:"#e8e8e8",marginBottom:4}}>Book a Flight</div>
            <div style={{fontSize:12,color:"#555",lineHeight:1.6}}>Select route, airline, cabin class and A380 seat. Real distances → real focus duration.</div>
          </button>
          <button onClick={()=>setScreen("log")} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:18,padding:22,cursor:"pointer",textAlign:"left",transition:"all 0.2s"}}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.06)"}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.03)"}}>
            <div style={{fontSize:28,marginBottom:8}}>📋</div>
            <div style={{fontSize:16,fontWeight:700,color:"#e8e8e8",marginBottom:3}}>Flight Log</div>
            <div style={{fontSize:11,color:"#555"}}>{logs.length} entries</div>
          </button>
        </div>
        <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:18,padding:22}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div style={{fontWeight:700,fontSize:15}}>🍽 In-Flight Shop</div>
            <div style={{color:"#C8A951",fontSize:12,fontWeight:600}}>{xp} XP</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
            {FOOD.map(f=>(
              <div key={f.id} style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:10,padding:"11px 12px",opacity:xp>=f.xp?1:0.3}}>
                <div style={{fontSize:22,marginBottom:5}}>{f.emoji}</div>
                <div style={{fontSize:11,fontWeight:600,marginBottom:2}}>{f.name}</div>
                <div style={{fontSize:10,color:"#555"}}>{f.xp} XP · {f.mins}min</div>
              </div>
            ))}
          </div>
        </div>
        {logs.slice(0,3).length>0&&(
          <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:18,padding:22,marginTop:14}}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:14}}>Recent Flights</div>
            {logs.slice(0,3).map(l=>(
              <div key={l.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <span>{l.done?"🛬":"⚡"}</span>
                  <div>
                    <div style={{fontWeight:600,fontSize:13}}>{l.dep} → {l.arr}</div>
                    <div style={{fontSize:10,color:"#555"}}>{l.al} · {l.date}</div>
                  </div>
                </div>
                <div style={{color:"#C8A951",fontWeight:700,fontSize:13}}>+{l.xpE} XP</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // ═══ BOOKING ════════════════════════════════════════════════
  if(screen==="booking") return(
    <div style={{minHeight:"100vh",background:"#06060f",color:"#e8e8e8",fontFamily:"system-ui,sans-serif"}}>
      <style>{`*{box-sizing:border-box}@keyframes wave{0%,100%{transform:rotate(-10deg)}50%{transform:rotate(15deg)}}::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:4px}input::placeholder{color:#333}input:focus{border-color:rgba(255,255,255,.18)!important;outline:none}`}</style>
      <div style={{maxWidth:700,margin:"0 auto",padding:"36px 20px 80px"}}>
        <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",color:"#444",cursor:"pointer",fontSize:12,letterSpacing:1.5,textTransform:"uppercase",marginBottom:28}} onMouseEnter={e=>e.currentTarget.style.color="#aaa"} onMouseLeave={e=>e.currentTarget.style.color="#444"}>← Back</button>
        <h2 style={{fontSize:30,fontWeight:900,letterSpacing:-1,marginBottom:4}}>Book Your Flight</h2>
        <p style={{color:"#444",fontSize:13,marginBottom:28}}>Real distances · Real durations · Airbus A380</p>

        <div style={{marginBottom:18}}>
          <div style={{fontSize:10,color:"#555",letterSpacing:2,textTransform:"uppercase",marginBottom:7}}>Passenger Name</div>
          <input value={pName} onChange={e=>setPName(e.target.value)} placeholder="Your full name…"
            style={{width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:"12px 14px",color:"#e8e8e8",fontSize:13,outline:"none"}}/>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
          <Dropdown label="Departure" placeholder="City or code…" query={depQ} setQuery={setDepQ} selected={depSel} onSelect={v=>{setDepSel(v);setDep(v);}} items={fDep} itemKey="code"
            renderLabel={a=>`${a.code} – ${a.city}`}
            renderRow={a=><div><div style={{fontWeight:600,fontSize:12}}><span style={{color:"#00D4FF",marginRight:6}}>{a.code}</span>{a.city}</div><div style={{fontSize:10,color:"#444",marginTop:1}}>{a.country}</div></div>}/>
          <Dropdown label="Arrival" placeholder="City or code…" query={arrQ} setQuery={setArrQ} selected={arrSel} onSelect={v=>{setArrSel(v);setArr(v);}} items={fArr} itemKey="code"
            renderLabel={a=>`${a.code} – ${a.city}`}
            renderRow={a=><div><div style={{fontWeight:600,fontSize:12}}><span style={{color:"#00D4FF",marginRight:6}}>{a.code}</span>{a.city}</div><div style={{fontSize:10,color:"#444",marginTop:1}}>{a.country}</div></div>}/>
        </div>

        {dep&&arr&&dep.code!==arr.code&&(
          <div style={{background:"rgba(0,212,255,0.03)",border:"1px solid rgba(0,212,255,0.1)",borderRadius:14,padding:18,marginBottom:14}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
              <div style={{textAlign:"center"}}><div style={{fontSize:26,fontWeight:900}}>{dep.code}</div><div style={{fontSize:10,color:"#666"}}>{dep.city}</div></div>
              <div style={{flex:1,textAlign:"center"}}>
                <div style={{height:1,background:"rgba(0,212,255,0.2)",margin:"0 12px",position:"relative"}}><span style={{position:"absolute",top:-8,left:"50%",transform:"translateX(-50%)",fontSize:14}}>✈</span></div>
                <div style={{fontSize:11,color:"#00D4FF",fontWeight:600,marginTop:10}}>{fmt(duration(Math.round(haversine(dep.lat,dep.lon,arr.lat,arr.lon))))}</div>
                <div style={{fontSize:10,color:"#444"}}>{Math.round(haversine(dep.lat,dep.lon,arr.lat,arr.lon))}km</div>
              </div>
              <div style={{textAlign:"center"}}><div style={{fontSize:26,fontWeight:900}}>{arr.code}</div><div style={{fontSize:10,color:"#666"}}>{arr.city}</div></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <CityCard ap={dep} label="Departure"/>
              <CityCard ap={arr} label="Arrival"/>
            </div>
          </div>
        )}

        <div style={{marginBottom:14}}>
          <Dropdown label="Airline" placeholder="Airline name or country…" query={alQ} setQuery={setAlQ} selected={alSel} onSelect={v=>{setAlSel(v);setAl(v);}} items={fAl} itemKey="code"
            renderLabel={a=>a.name}
            renderRow={a=><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:8,height:8,borderRadius:2,background:a.color,flexShrink:0}}/><div><div style={{fontWeight:600,fontSize:12}}>{a.name} <span style={{color:"#444",fontWeight:400}}>({a.code})</span></div><div style={{fontSize:10,color:"#444"}}>{a.country}</div></div><div style={{marginLeft:"auto",display:"flex",gap:3}}><div style={{width:14,height:3,borderRadius:1,background:a.color}}/><div style={{width:14,height:3,borderRadius:1,background:a.accent}}/></div></div>}/>
        </div>

        <div style={{marginBottom:16}}>
          <div style={{fontSize:10,color:"#555",letterSpacing:2,textTransform:"uppercase",marginBottom:9}}>Cabin Class</div>
          <div style={{display:"flex",gap:8}}>
            {["first","business","economy"].map(c=>(
              <button key={c} onClick={()=>{setCls(c);setSeat(null);}} style={{flex:1,padding:"12px 0",borderRadius:10,border:`1px solid ${cls===c?"rgba(255,255,255,0.14)":"rgba(255,255,255,0.05)"}`,cursor:"pointer",fontWeight:600,fontSize:12,background:cls===c?"rgba(255,255,255,0.07)":"rgba(255,255,255,0.02)",color:cls===c?"#fff":"#555",transition:"all 0.15s"}}>
                {c==="first"?"✦ First":c==="business"?"◈ Business":"◻ Economy"}
              </button>
            ))}
          </div>
        </div>

        <div style={{marginBottom:22}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontSize:10,color:"#555",letterSpacing:2,textTransform:"uppercase"}}>Select Seat — A380</div>
            {seat&&<span style={{fontSize:11,color:"#00D4AA"}}>✓ {seat} · {ALL_SEATS.find(s=>s.id===seat)?.win?"Window":"Interior"}</span>}
          </div>
          <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:14,padding:14}}>
            <div style={{display:"flex",gap:14,marginBottom:10,fontSize:10,color:"#444",flexWrap:"wrap"}}>
              <span>■ Available &nbsp; ■ Taken &nbsp; <span style={{color:"#00D4FF"}}>■</span> Selected &nbsp; W=Window</span>
            </div>
            <SeatMap selected={seat} onSelect={setSeat} cls={cls}/>
          </div>
        </div>

        <button disabled={!dep||!arr||!al||!seat||!pName.trim()||(dep&&arr&&dep.code===arr.code)} onClick={startFlight}
          style={{width:"100%",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,padding:"15px 0",color:(!dep||!arr||!al||!seat||!pName.trim())?"#444":"#fff",fontWeight:700,fontSize:15,cursor:(!dep||!arr||!al||!seat||!pName.trim())?"not-allowed":"pointer",opacity:(!dep||!arr||!al||!seat||!pName.trim())?0.4:1,transition:"all 0.2s"}}>
          {dep&&arr&&dep.code===arr.code?"Same airport selected":"View Boarding Pass →"}
        </button>
      </div>
    </div>
  );

  // ═══ FLIGHT ═════════════════════════════════════════════════
  if(screen==="flight"&&fi){
    const bg=skyBg(prog);
    return(
      <div style={{minHeight:"100vh",color:"#e8e8e8",fontFamily:"system-ui,sans-serif",position:"relative",overflow:"hidden"}}>
        <style>{`*{box-sizing:border-box}@keyframes wave{0%,100%{transform:rotate(-10deg)}50%{transform:rotate(15deg)}}@keyframes fly{0%{transform:translateX(-3px)}50%{transform:translateX(3px)}100%{transform:translateX(-3px)}}@keyframes blink{0%,100%{opacity:0.3}50%{opacity:1}}`}</style>

        {/* Sky background */}
        <div style={{position:"fixed",inset:0,background:bg,zIndex:0,transition:"background 4s ease"}}/>

        {/* Stars (night) — static, no random in render */}
        {isNight&&STARS.map((st,i)=>(
          <div key={i} style={{position:"fixed",width:st.size,height:st.size,background:"#fff",borderRadius:"50%",top:`${st.top}%`,left:`${st.left}%`,animation:`blink ${2+st.delay}s ease-in-out infinite`,opacity:0.6,zIndex:1,pointerEvents:"none"}}/>
        ))}

        {/* Sunset glow */}
        {isSunset&&<div style={{position:"fixed",bottom:0,left:0,right:0,height:"25%",background:"linear-gradient(0deg,rgba(255,100,0,0.12),transparent)",zIndex:1,pointerEvents:"none"}}/>}

        {/* Window oval if window seat */}
        {isWin&&(
          <div style={{position:"fixed",inset:0,zIndex:2,pointerEvents:"none"}}>
            <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-52%)",width:"min(42vw,300px)",height:"min(52vh,360px)",borderRadius:"50%/45%",border:"5px solid rgba(255,255,255,0.05)",boxShadow:"inset 0 0 50px rgba(0,0,0,0.45),0 0 0 20px rgba(0,0,0,0.75)"}}/>
            <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse min(44vw,320px) min(55vh,380px) at 50% 48%,transparent 58%,rgba(0,0,0,0.88) 78%)`}}/>
          </div>
        )}
        {!isWin&&<div style={{position:"fixed",inset:0,background:"radial-gradient(ellipse 85% 75% at 50% 50%,transparent 45%,rgba(0,0,0,0.65) 100%)",zIndex:2,pointerEvents:"none"}}/>}

        {/* Airline bar */}
        <div style={{position:"fixed",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${ac},${aa},${ac})`,zIndex:20}}/>

        {/* Content */}
        <div style={{position:"relative",zIndex:10,minHeight:"100vh",display:"flex",flexDirection:"column"}}>
          {/* Top bar */}
          <div style={{background:"rgba(0,0,0,0.72)",backdropFilter:"blur(24px)",borderBottom:"1px solid rgba(255,255,255,0.05)",padding:"13px 22px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontSize:10,color:"#555",letterSpacing:2.5,textTransform:"uppercase"}}>{al.name} · {fi.flightNum}</div>
              <div style={{fontSize:18,fontWeight:800,letterSpacing:-0.5,marginTop:1}}>{dep.code} <span style={{color:aa,fontWeight:300}}>—</span> {arr.code}</div>
            </div>
            <div style={{display:"flex",gap:9,alignItems:"center"}}>
              <div style={{fontSize:11,color:"#C8A951",fontWeight:600}}>{xp} XP</div>
              <button onClick={()=>setFoodOpen(true)} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:8,padding:"7px 13px",color:"#e8e8e8",cursor:"pointer",fontSize:11,fontWeight:600}}>🍽 Menu</button>
              <button onClick={()=>setAbortOpen(true)} style={{background:"rgba(180,40,40,0.1)",border:"1px solid rgba(180,40,40,0.18)",borderRadius:8,padding:"7px 13px",color:"#ff9090",cursor:"pointer",fontSize:11,fontWeight:600}}>⚡ Abort</button>
            </div>
          </div>

          {/* Main */}
          <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px 20px 130px"}}>
            <div style={{width:"min(540px,100%)",textAlign:"center"}}>
              {/* Phase pills */}
              <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:20}}>
                {PHASES.map((p,i)=>(
                  <div key={p} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                    <div style={{width:42,height:2,borderRadius:1,background:phase===i?aa:prog>=(i*0.2)?"rgba(255,255,255,0.18)":"rgba(255,255,255,0.06)",transition:"all 1s"}}/>
                    <span style={{fontSize:8,color:phase===i?aa:"rgba(255,255,255,0.18)",letterSpacing:1,textTransform:"uppercase"}}>{p}</span>
                  </div>
                ))}
              </div>

              {/* Timer */}
                <div style={{ background: "rgba(10,10,10,0.65)",backdropFilter: "blur(28px)",border: "1px solid rgba(255,255,255,0.06)",borderRadius: 22,padding: "32px 40px",marginBottom: 16,boxShadow: "0 20px 60px rgba(0,0,0,0.7)"
}}>
  
  <div style={{
    fontSize: 11,
    fontFamily: "Inter, sans-serif",
    color: "rgba(232,230,227,0.4)",
    letterSpacing: 2.5,
    textTransform: "uppercase",
    marginBottom: 12
  }}>
    {breaking ? "Break Interval" : "Remaining Time"}
  </div>

  <div style={{
    fontSize: 60,
    fontFamily: "Playfair Display, serif",
    fontWeight: 400,
    letterSpacing: 3,
    color: "#E8E6E3",
    lineHeight: 1.05
  }}>
    {hms(breaking ? breakSecs : rem)}
  </div>

  <div style={{
    fontSize: 13,
    fontFamily: "Inter, sans-serif",
    color: "rgba(232,230,227,0.55)",
    marginTop: 10
  }}>
    {breaking
      ? "Relax — your session resumes automatically"
      : "Time remaining for this journey"}
  </div>
</div>


{/* Progress */}
<div style={{
  background: "rgba(10,10,10,0.55)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,0.05)",
  borderRadius: 14,
  padding: "16px 20px",
  marginBottom: 14
}}>
  
                <div style={{
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
    fontSize: 12,
    fontFamily: "Inter, sans-serif",
    color: "rgba(232,230,227,0.75)"
  }}>
    <span>{dep.code} · {fi.depTime}</span>

    <span style={{
      color: "#D4AF37",
      fontWeight: 500,
      letterSpacing: 1
    }}>
      {pct}%
    </span>

    <span>{arr.code} · {fi.arrTime}</span>
  </div>

  <div style={{
    height: 3,
    background: "rgba(255,255,255,0.06)",
    borderRadius: 2,
    overflow: "hidden"
  }}>
    <div style={{
      height: "100%",
      width: `${pct}%`,
      background: "#D4AF37",
      borderRadius: 2,
      transition: "width 1s ease"
    }}/>
                   </div>
                </div>
                {/* Mini flight path SVG */}
                <svg width="100%" viewBox="0 0 500 80" style={{background:"rgba(0,0,0,0.15)",borderRadius:6,display:"block"}}>
                  <path d={`M 40 50 Q 250 10 460 50`} fill="none" stroke={`${aa}22`} strokeWidth={1.5} strokeDasharray="5 4"/>
                  <path d={`M 40 50 Q 250 10 ${40+420*prog} ${50-Math.sin(prog*Math.PI)*40}`} fill="none" stroke={aa} strokeWidth={1.5} opacity="0.7"/>
                  <circle cx={40} cy={50} r={4} fill={ac}/>
                  <circle cx={460} cy={50} r={4} fill="#333"/>
                  <text x={40+420*prog} y={50-Math.sin(prog*Math.PI)*40} textAnchor="middle" dominantBaseline="middle" fontSize={14} fill="#fff">✈</text>
                  <text x={40} y={66} textAnchor="middle" fill="#555" fontSize={8}>{dep.code}</text>
                  <text x={460} y={66} textAnchor="middle" fill="#444" fontSize={8}>{arr.code}</text>
                </svg>

              {/* Stats */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:18}}>
                {[["Distance",`${fi.dist}km`],["Duration",fmt(fi.durationMins)],["Gate",fi.gate],["Seat",seat||"—"]].map(([l,v])=>(
                  <div key={l} style={{background:"rgba(0,0,0,0.5)",backdropFilter:"blur(10px)",borderRadius:9,padding:"9px 0",textAlign:"center",border:"1px solid rgba(255,255,255,0.05)"}}>
                    <div style={{fontSize:8,color:"#444",textTransform:"uppercase",letterSpacing:1,marginBottom:3}}>{l}</div>
                    <div style={{fontWeight:700,fontSize:12,color:"#bbb"}}>{v}</div>
                  </div>
                ))}
              </div>

              <button disabled={breaking} onClick={()=>{setRunning(r=>!r);if(!running){setAttMsg(getMsg(timer,totalSecs,female,phase,consecRef.current));setShowAtt(true);}}}
                style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,padding:"15px 44px",color:"#fff",fontWeight:700,fontSize:14,cursor:breaking?"not-allowed":"pointer",opacity:breaking?0.4:1,transition:"all 0.2s",letterSpacing:0.5}}>
                {breaking?`☕ Break — ${hms(breakSecs)}`:running?"⏸  Pause":"▶  "+(phase===0?"Start Focus Session":"Resume")}
              </button>
            </div>
          </div>
        </div>

        {/* Boarding pass */}
        {showBP&&<BoardingPass dep={dep} arr={arr} al={al} seat={seat} fi={fi} name={pName} cls={cls} onBoard={()=>{setShowBP(false);setAttMsg(getMsg(0,totalSecs,female,0,0));setShowAtt(true);}}/>}

        {/* Attendant */}
        {showAtt&&!showBP&&<Attendant female={female} accent={aa} msg={attMsg} onDismiss={()=>setShowAtt(false)}/>}

        {/* Abort modal */}
        {abortOpen&&(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:400,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(12px)"}}>
            <div style={{background:"#0c0c1c",border:"1px solid rgba(255,255,255,0.07)",borderRadius:22,padding:34,maxWidth:360,width:"90%"}}>
              <div style={{fontSize:30,marginBottom:14}}>⚡</div>
              <div style={{fontWeight:800,fontSize:20,marginBottom:8}}>Abort Flight?</div>
              <div style={{color:"#666",fontSize:13,lineHeight:1.7,marginBottom:12}}>You've focused for <strong style={{color:"#fff"}}>{fmt(Math.floor(timer/60))}</strong> so far.</div>
              <div style={{background:"rgba(200,169,81,0.08)",border:"1px solid rgba(200,169,81,0.12)",borderRadius:10,padding:"11px 14px",marginBottom:22}}>
                <div style={{fontSize:11,color:"#C8A951",marginBottom:2}}>XP you'll earn</div>
                <div style={{fontSize:26,fontWeight:800,color:"#C8A951"}}>+{Math.floor((timer/3600)*100)} XP</div>
              </div>
              <div style={{display:"flex",gap:9}}>
                <button onClick={()=>setAbortOpen(false)} style={{flex:1,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:10,padding:"12px 0",color:"#888",cursor:"pointer",fontWeight:600,fontSize:12}}>Stay Aboard</button>
                <button onClick={doAbort} style={{flex:1,background:"rgba(180,40,40,0.1)",border:"1px solid rgba(180,40,40,0.18)",borderRadius:10,padding:"12px 0",color:"#ff8888",cursor:"pointer",fontWeight:700,fontSize:12}}>Exit & Claim XP</button>
              </div>
            </div>
          </div>
        )}

        {/* Food modal */}
        {foodOpen&&(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:400,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(12px)"}}>
            <div style={{background:"#0c0c1c",border:"1px solid rgba(255,255,255,0.07)",borderRadius:22,padding:26,maxWidth:400,width:"90%"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                <div style={{fontWeight:800,fontSize:18}}>🍽 In-Flight Menu</div>
                <div style={{color:"#C8A951",fontWeight:700,fontSize:13}}>{xp} XP</div>
              </div>
              <p style={{color:"#444",fontSize:11,marginBottom:16,lineHeight:1.6}}>Buy food for a timed break. Timer pauses while you eat.</p>
              <div style={{display:"grid",gap:7}}>
                {FOOD.map(f=>(
                  <div key={f.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",background:"rgba(255,255,255,0.02)",borderRadius:10,border:"1px solid rgba(255,255,255,0.04)",opacity:xp>=f.xp?1:0.3}}>
                    <span style={{fontSize:22}}>{f.emoji}</span>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:600,fontSize:12}}>{f.name}</div>
                      <div style={{fontSize:10,color:"#555",marginTop:1}}>{f.mins}min break</div>
                    </div>
                    <button disabled={xp<f.xp} onClick={()=>buyFood(f)} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:7,padding:"6px 12px",color:xp>=f.xp?"#fff":"#444",cursor:xp>=f.xp?"pointer":"not-allowed",fontWeight:600,fontSize:11}}>{f.xp} XP</button>
                  </div>
                ))}
              </div>
              <button onClick={()=>setFoodOpen(false)} style={{width:"100%",marginTop:14,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:10,padding:"12px 0",color:"#666",cursor:"pointer",fontWeight:600,fontSize:12}}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ═══ LOG ════════════════════════════════════════════════════
  if(screen==="log") return(
    <div style={{minHeight:"100vh",background:"#06060f",color:"#e8e8e8",fontFamily:"system-ui,sans-serif"}}>
      <style>{`*{box-sizing:border-box}::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:4px}`}</style>
      <div style={{maxWidth:700,margin:"0 auto",padding:"36px 20px"}}>
        <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",color:"#444",cursor:"pointer",fontSize:12,letterSpacing:1.5,textTransform:"uppercase",marginBottom:26}} onMouseEnter={e=>e.currentTarget.style.color="#aaa"} onMouseLeave={e=>e.currentTarget.style.color="#444"}>← Back</button>
        <h2 style={{fontSize:30,fontWeight:900,letterSpacing:-1,marginBottom:4}}>Flight Log</h2>
        <p style={{color:"#444",fontSize:12,marginBottom:24}}>{logs.length} entries · {Math.floor(logs.reduce((a,l)=>a+l.dur,0)/60)}h total · {logs.filter(l=>l.done).length} complete</p>
        {logs.length===0&&<div style={{textAlign:"center",padding:60,color:"#333"}}><div style={{fontSize:40,marginBottom:12}}>✈</div>No flights yet</div>}
        <div style={{display:"grid",gap:9}}>
          {logs.map(l=>(
            <div key={l.id} style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:14,padding:"16px 18px",display:"flex",alignItems:"center",gap:14}}>
              <div style={{fontSize:22}}>{l.done?"🛬":"⚡"}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:15}}>{l.dep} → {l.arr}</div>
                <div style={{fontSize:11,color:"#555",marginTop:2}}>{l.al} · {l.fn} · Seat {l.seat} · {l.cls}</div>
                <div style={{fontSize:10,color:"#333",marginTop:1}}>{l.pax} · {l.date} · {fmt(l.dur)}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{color:"#C8A951",fontWeight:700,fontSize:15}}>+{l.xpE} XP</div>
                <div style={{fontSize:10,color:l.done?"#00D4AA":"#FF6B35",marginTop:3}}>{l.done?"✓ Complete":"⚡ Aborted"}</div>
                <button onClick={()=>setLogs(p=>p.filter(x=>x.id!==l.id))} style={{background:"none",border:"none",color:"#333",cursor:"pointer",fontSize:10,marginTop:4,padding:0}} onMouseEnter={e=>e.currentTarget.style.color="#FF6B35"} onMouseLeave={e=>e.currentTarget.style.color="#333"}>🗑 Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return null;
}
