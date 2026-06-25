import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, get, push, onValue, remove, update, query, orderByChild, limitToLast, onDisconnect } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

export const firebaseConfig = {
  apiKey: "AIzaSyBcUstKvYcHgNgixhvXGAoxPZCDXCqYKM4",
  authDomain: "politq-f5439.firebaseapp.com",
  databaseURL: "https://politq-f5439-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "politq-f5439",
  storageBucket: "politq-f5439.firebasestorage.app",
  messagingSenderId: "644177985330",
  appId: "1:644177985330:web:1f5f1bba73b4f0be94e12b"
};

export const ADMIN_USER = 'owen08';
export const ADMIN_PASS = '7865';
export const TOPICS = ['Economy','Climate','Healthcare','Immigration','Defense','Rights','Tax','Education'];

export const ALL_TAGS = ['Stalinism','Maoism','Leninism','Trotsky-ism','Orthodox Marxism','Collectivism','Posadism','Castroism','Agrarianism','Chavism','Titoism','Mugabeism','Juche','National Bolshevism','Strasser-ism','Left Wing Nationalism','Anti-Revisionism','Conservative Socialism','Social Gospel','Technocracy','Kleptocracy','Futurist','Social Nationalism','Unionism','Distributism','Left Populism','Labourism','Monarcho-Communism',"Ba'athism",'Dengism','Xi-ism','Socialist Transhumanism','Ho Chi Minh Thought','Hive Mind Collectivism','Fully Automated Luxury Space Gay Communism','Kuomintang','IngSocism','Fascism','Neo-Fascism','Eco-Fascism','Esoteric Fascism','Vichy Fascism','Corporate Autocracy','Authoritarian Capitalism','Aristocracy','Colonialism','Imperialism','Feudalism','Islamist Theocracy','Christian Theocracy','Hindu Theocracy','Buddhist Theocracy','Absolute Monarchism','Elective Monarchism','Paleo-Conservatism','Pinochetism','Traditionalist Conservatism','Nationalist Conservatism','Eco-Conservatism','Progressive Conservatism','Senatorialism','Constitutional Monarchism','Neo-Conservatism','Zionism','Liberal Conservatism','Fiscal Conservatism','Conservatism','National Liberalism','Third Way','Conquest-alism','Ghengis Khanism','Kratero-cracy','Fordism','Confederalism','Christian Democracy','Social Darwinism','Anarchism','Eco-Anarchism','Anarcho-Communism','Anarcha-Feminism','Queer Anarchism','Anarcho-Collectivism','Anarcho-Mutualism','Situationism','Minarcho-Socialism','Left Communism','Council Communism','Democratic Socialism','Democratic Confederalism','Market Socialism','Technological Primitivism','Environmentalism','Syndicalism','Luxemburgism','Social Democracy','Greenism','Accelerationism','Eco-Transhumanism','Progressivism','Welfarism','Liberal Democracy','Nordic Liberalism','Gandhism','Mandelaism','Liberal Socialism','Libertarian Socialism','Libertarian Market Socialism','Anti-Authoritarianism','Geo-Libertarianism','Religious Anarchism','Anarcho-Pacifism','Anarcho-Primitivism','Egoism','Anarcho-Frontierism','Soulism','Bookchin Communalism','Classical Marxism','Anarcho-Posadism','Georgism','Libertarianism','Classical Liberalism','Liberal Corporatism','Democratic Liberalism','Transhumanism','Social Libertarianism','Neo-Liberalism','General Capitalism','Capitalist Transhumanism','Conservative Libertarianism','Paleo-Libertarianism','National Libertarianism','Dark Enlightenment','Green Libertarianism','Right Georgism','Techno-Liberalism','Neoclassical Liberalism','Neo-Libertarianism','Objectivism','Minarchism','Pink Capitalism','Christian Libertarianism','Consequentialism','Anarcho-Capitalism','Voluntaryism','Individualist Anarchism','Anarcho-Monarchism','Hoppe-anism','Eco-Capitalism','Agorism','Liberal','Avaritionism'];

export function tagClass(tag){
  const t=tag.toLowerCase().trim();
  const al=['stalinism','maoism','leninism','trotsky','orthodox marxism','collectivism','posadism','castroism','agrarianism','chavism','titoism','mugabeism','juche','national bolshevism','strasser','left wing nationalism','anti-revisionism','conservative socialism','social gospel','technocracy','kleptocracy','futurist','social nationalism','unionism','distributism','left populism','labourism','monarcho-communism',"ba'athism",'dengism','xi-ism','socialist transhumanism','ho chi minh','hive mind','fully automated','kuomintang','ingsocism'];
  const ar=['fascism','neo-fascism','eco-fascism','esoteric fascism','vichy fascism','corporate autocracy','authoritarian capitalism','aristocracy','colonialism','imperialism','feudalism','theocracy','absolute monarchism','elective monarchism','paleo-conservatism','pinochetism','traditionalist conservatism','nationalist conservatism','eco-conservatism','progressive conservatism','senatorialism','constitutional monarchism','neo-conservatism','zionism','liberal conservatism','fiscal conservatism','national liberalism','third way','conquest','ghengis','kratero','fordism','confederalism','christian democracy','social darwinism','conservatism'];
  const ll=['anarchism','eco-anarchism','anarcho-communism','anarcha-feminism','queer anarchism','anarcho-collectivism','anarcho-mutualism','situationism','minarcho-socialism','left communism','council communism','democratic socialism','democratic confederalism','market socialism','technological primitivism','environmentalism','syndicalism','luxemburgism','social democracy','greenism','accelerationism','eco-transhumanism','progressivism','welfarism','liberal democracy','nordic liberalism','gandhism','mandelaism','liberal socialism','libertarian socialism','libertarian market socialism','anti-authoritarianism','geo-libertarianism','religious anarchism','anarcho-pacifism','anarcho-primitivism','egoism','anarcho-frontierism','soulism','bookchin','classical marxism','anarcho-posadism','georgism'];
  const lr=['libertarianism','classical liberalism','liberal corporatism','democratic liberalism','transhumanism','social libertarianism','neo-liberalism','general capitalism','capitalist transhumanism','conservative libertarianism','paleo-libertarianism','national libertarianism','dark enlightenment','green libertarianism','right georgism','techno-liberalism','neoclassical liberalism','neo-libertarianism','objectivism','minarchism','pink capitalism','christian libertarianism','consequentialism','anarcho-capitalism','voluntaryism','individualist anarchism','anarcho-monarchism','hoppe-anism','eco-capitalism','agorism','avaritionism'];
  for(const k of al) if(t.includes(k)) return 'authleft';
  for(const k of ar) if(t.includes(k)) return 'authright';
  for(const k of ll) if(t.includes(k)) return 'libleft';
  for(const k of lr) if(t.includes(k)) return 'libright';
  if(t==='liberal') return 'libright';
  return 'libright';
}

export function tagHtml(tag, clickable=false, selected=false){
  const cls = tagClass(tag);
  const safe = tag.replace(/'/g,'&apos;');
  const onclick = clickable ? `onclick="toggleTag('${safe}')"` : '';
  return `<span class="tag tag-${cls}${selected?' sel':''}${clickable?' clickable':''}" ${onclick}>${tag}</span>`;
}

export function sanitize(s){ return (s||'').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
export function initials(n){ return ((n||'?').replace(/[^a-zA-Z0-9]/g,'').slice(0,2)||'?').toUpperCase(); }
export function ts(){ return new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}); }
export function stripEmoji(s){ return s.replace(/[\u{1F600}-\u{1FFFF}]/gu,'').replace(/[\u2600-\u27BF]/g,'').trim(); }
export function isAdmin(){ return getSession() === ADMIN_USER; }
export function quadrant(e,s){ if(e<=0&&s>=0)return'Auth-Left'; if(e>0&&s>=0)return'Auth-Right'; if(e<=0&&s<0)return'Lib-Left'; return'Lib-Right'; }
export function quadColor(q){ return {'Auth-Left':'#f08080','Auth-Right':'#8888f8','Lib-Left':'#60c060','Lib-Right':'#c8a820'}[q]||'#aaa'; }
export function renderMentions(text){ return sanitize(text).replace(/@([a-zA-Z0-9_]+)/g,'<span class="mention-text">@$1</span>'); }
export function hasMention(text,user){ return new RegExp('@'+user.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i').test(text); }

export function getSession(){ return localStorage.getItem('pq_session'); }
export function setSession(u){ localStorage.setItem('pq_session',u); }
export function clearSession(){ localStorage.removeItem('pq_session'); }
export function requireAuth(){ if(!getSession()){ window.location.href='index.html'; return false; } return true; }

export function avHtml(username, users, size=38){
  const u = users[username]||{};
  const s = `width:${size}px;height:${size}px;font-size:${Math.floor(size*.32)}px;border-radius:50%;flex-shrink:0;overflow:hidden;background:var(--bg3);display:flex;align-items:center;justify-content:center;font-weight:700;`;
  if(u.avatarB64) return `<div style="${s}"><img src="${u.avatarB64}" style="width:100%;height:100%;object-fit:cover;border-radius:50%"></div>`;
  return `<div style="${s}">${initials(username)}</div>`;
}

export function friendStatus(session, users, target){
  if(!session||target===session) return 'self';
  const me = users[session]||{};
  if((me.friends||{})[target]) return 'friends';
  if((me.sentRequests||{})[target]) return 'sent';
  if((me.receivedRequests||{})[target]) return 'received';
  return 'none';
}

export function getDmKey(a,b){ return [a,b].sort().join('__'); }

export const SHARED_CSS = `
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0a0a0a;--bg2:#111;--bg3:#1a1a1a;--card:#141414;--border:#2a2a2a;--text:#e8e8e8;--text2:#888;--text3:#444;--green-hi:#4caf50;--green:#1a3a1a;--red-hi:#ef5350;--red:#3a1a1a;--admin:#c0a060;--mention-bg:rgba(200,170,50,0.07);--mention-border:rgba(200,170,50,0.3);--sidebar-w:200px;--radius:8px}
html,body{height:100%;background:var(--bg);color:var(--text);font-family:'Segoe UI',system-ui,sans-serif;font-size:14px}
::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:2px}
input[type=file]{display:none}
.tag{padding:2px 7px;border-radius:4px;font-size:11px;font-weight:600;border:1px solid transparent;display:inline-block;white-space:nowrap}
.tag.sel{outline:2px solid #fff;outline-offset:1px}.tag.clickable{cursor:pointer}
.tag-authleft{background:#3a1010;color:#f08080;border-color:#6a2020}
.tag-authright{background:#10103a;color:#9090f0;border-color:#20206a}
.tag-libleft{background:#0f2a10;color:#70c070;border-color:#205a20}
.tag-libright{background:#2a2000;color:#c8a820;border-color:#5a4800}
.mention-text{color:#d4aa30;font-weight:600}
.mention-highlight{background:var(--mention-bg);border-left:3px solid var(--mention-border);border-radius:0 6px 6px 0}
/* SIDENAV */
.app{display:flex;height:100vh;overflow:hidden}
.sidenav{width:var(--sidebar-w);background:var(--bg2);border-right:1px solid var(--border);display:flex;flex-direction:column;flex-shrink:0;height:100vh}
.sidenav-logo{padding:18px 14px 14px;border-bottom:1px solid var(--border);font-size:20px;font-weight:900;letter-spacing:-1px}
.sidenav-logo span{color:var(--text2)}
.sidenav-tabs{flex:1;padding:8px;overflow-y:auto}
.sidenav-tab{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:7px;border:none;background:transparent;color:var(--text2);cursor:pointer;font-size:13px;font-weight:500;width:100%;text-align:left;margin-bottom:2px;transition:.12s;text-decoration:none}
.sidenav-tab:hover{background:var(--bg3);color:var(--text)}
.sidenav-tab.active{background:var(--bg3);color:var(--text)}
.sidenav-tab .tab-label{flex:1}
.nav-badge{background:var(--red-hi);color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 5px;min-width:16px;text-align:center}
.sidenav-bottom{padding:10px 8px;border-top:1px solid var(--border)}
.user-pill{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:7px;cursor:pointer;text-decoration:none;color:var(--text)}
.user-pill:hover{background:var(--bg3)}
.pill-av{width:28px;height:28px;border-radius:50%;background:var(--border);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;overflow:hidden;flex-shrink:0}
.pill-av img{width:100%;height:100%;object-fit:cover;border-radius:50%}
.pill-name{font-size:13px;font-weight:600;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.logout-btn{display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:6px;border:none;background:transparent;color:var(--text2);cursor:pointer;font-size:12px;width:100%;margin-top:4px}
.logout-btn:hover{background:var(--bg3);color:var(--text)}
/* MAIN */
.main-wrap{flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0}
.page-content{flex:1;overflow-y:auto;padding:18px}
.page-flex{flex:1;display:flex;overflow:hidden}
/* CARDS */
.card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:14px;margin-bottom:10px}
.empty-state{color:var(--text2);font-size:13px;padding:24px;text-align:center}
/* BUTTONS */
.btn{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:6px;border:1px solid var(--border);background:transparent;color:var(--text);cursor:pointer;font-size:13px;transition:.12s;font-family:inherit}
.btn:hover{background:var(--bg3)}
.btn-primary{background:var(--text);border-color:var(--text);color:var(--bg);font-weight:700}
.btn-primary:hover{opacity:.85}
.btn-green{border-color:var(--green-hi);color:var(--green-hi)}
.btn-red{border-color:var(--red-hi);color:var(--red-hi)}
.btn-red:hover{background:rgba(239,83,80,.1)}
.btn-amber{border-color:#5a3a10;color:#cd853f}
.btn-blue{border-color:#1a3a5a;color:#7ab8f5}
/* INPUTS */
.input{width:100%;padding:9px 12px;background:var(--bg3);border:1px solid var(--border);border-radius:6px;color:var(--text);font-size:14px;outline:none;font-family:inherit}
.input:focus{border-color:#444}
textarea.input{resize:vertical;min-height:76px}
/* MODAL */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.75);display:none;align-items:center;justify-content:center;z-index:300}
.modal-overlay.open{display:flex}
.modal{background:var(--bg2);border:1px solid var(--border);border-radius:10px;width:400px;max-width:96vw;overflow:hidden;position:relative}
.modal-close{position:absolute;top:8px;right:8px;width:26px;height:26px;border-radius:50%;background:rgba(0,0,0,.6);border:none;color:#fff;cursor:pointer;font-size:16px;line-height:1;z-index:10}
.modal-inner{padding:20px}
.modal-inner h3{font-size:16px;font-weight:700;margin-bottom:14px}
/* ICONS */
.icon{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}
.icon svg{stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
/* SECTION TITLE */
.section-title{font-size:11px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.8px;margin-bottom:10px}
.sep{height:1px;background:var(--border);margin:14px 0}
`;

export const ICONS = {
  feed:`<svg viewBox="0 0 24 24"><path d="M3 5h18M3 10h18M3 15h12"/></svg>`,
  chat:`<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  messages:`<svg viewBox="0 0 24 24"><path d="M8 9h8M8 13h5M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/></svg>`,
  compass:`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  profile:`<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  friends:`<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  settings:`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  logout:`<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  send:`<svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  upvote:`<svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>`,
  downvote:`<svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>`,
  reply:`<svg viewBox="0 0 24 24"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>`,
  addfriend:`<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>`,
  delete:`<svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,
  ban:`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>`,
  camera:`<svg viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
  edit:`<svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  pin:`<svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  message:`<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 0 2 2z"/></svg>`,
  search:`<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  online:`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="currentColor"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07M4.93 4.93a10 10 0 0 0 0 14.14M8.46 8.46a5 5 0 0 0 0 7.07"/></svg>`,
  crown:`<svg viewBox="0 0 24 24"><path d="M2 20h20M5 20V9l7-5 7 5v11"/></svg>`,
  accept:`<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`,
  decline:`<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  announce:`<svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 1 0 8"/><path d="M14.73 4.08a10 10 0 0 1 0 15.84"/><path d="M10 9v6l-3-2H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4l3-2z"/></svg>`,
};

export function icon(name, size=16){
  const svg = ICONS[name]||ICONS.feed;
  return `<span class="icon" style="width:${size}px;height:${size}px">${svg}</span>`;
}

let _fbApp, _db;
export function getDb(){
  if(!_db){
    _fbApp = initializeApp(firebaseConfig);
    _db = getDatabase(_fbApp);
  }
  return _db;
}
export { ref, set, get, push, onValue, remove, update, query, orderByChild, limitToLast, onDisconnect };

// Password hashing — uses bcryptjs loaded via CDN in index.html
export async function hashPassword(plain) {
  if(typeof dcodeIO !== 'undefined' && dcodeIO.bcrypt) {
    return await new Promise((res,rej) => dcodeIO.bcrypt.hash(plain, 10, null, (err,hash) => err ? rej(err) : res(hash)));
  }
  // fallback: plain text (upgrade path)
  return plain;
}
export async function verifyPassword(plain, hash) {
  if(typeof dcodeIO !== 'undefined' && dcodeIO.bcrypt) {
    // if stored hash starts with $2 it's bcrypt, otherwise plain text legacy
    if(hash && hash.startsWith('$2')) {
      return await new Promise((res,rej) => dcodeIO.bcrypt.compare(plain, hash, null, (err,ok) => err ? rej(err) : res(ok)));
    }
  }
  // legacy plain text comparison
  return plain === hash;
}

export async function pushNotification(db, toUser, type, text, link){
  if(!toUser||!db) return;
  const {push: fbPush, ref: fbRef} = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js');
  await fbPush(fbRef(db,'notifications/'+toUser),{type,text,link:link||'feed.html',ts:Date.now(),timeStr:ts(),read:false});
}
