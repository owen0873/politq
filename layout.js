import { getSession, clearSession, getDb, ref, set, onValue, onDisconnect, isAdmin, icon, SHARED_CSS, sanitize } from './shared.js';

export function buildPage(activeTab, mainHtml, extraCss) {
  const session = getSession();
  if(!session){ window.location.href='index.html'; return; }

  const style = document.createElement('style');
  style.textContent = SHARED_CSS + (extraCss||'') + `
    .mobile-toggle{display:none;position:fixed;top:10px;left:10px;z-index:200;width:36px;height:36px;border-radius:8px;border:1px solid var(--border);background:var(--bg2);color:var(--text);cursor:pointer;align-items:center;justify-content:center;font-size:18px}
    .sidenav-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:98}
    @media(max-width:768px){
      .mobile-toggle{display:flex}
      .sidenav{position:fixed;left:-220px;top:0;bottom:0;z-index:99;transition:left .2s;height:100vh}
      .sidenav.open{left:0}
      .sidenav-overlay.open{display:block}
      .main-wrap{width:100%}
    }
  `;
  document.head.appendChild(style);

  const tabs = [
    {id:'search',    label:'Search',      ic:'search',   href:'search.html'},
    {id:'feed',      label:'Feed',        ic:'feed',     href:'feed.html'},
    {id:'chat',      label:'Global Chat', ic:'chat',     href:'chat.html'},
    {id:'messages',  label:'Messages',    ic:'messages', href:'messages.html'},
    {id:'compass',   label:'Compass',     ic:'compass',  href:'compass.html'},
    {id:'profile',   label:'Profile',     ic:'profile',  href:'profile.html'},
    {id:'friends',   label:'Friends',     ic:'friends',  href:'friends.html'},
    {id:'settings',  label:'Settings',    ic:'settings', href:'settings.html'},
    {id:'support',   label:'Support',     ic:'message',  href:'support.html'},
    {id:'notifications',label:'Notifications',ic:'online',  href:'notifications.html'},
  ];

  const tabsHtml = tabs.map(function(t){
    const active = t.id === activeTab ? ' active' : '';
    return '<a class="sidenav-tab' + active + '" href="' + t.href + '" onclick="closeSidebar()">'
      + icon(t.ic, 16)
      + '<span class="tab-label">' + t.label + '</span>'
      + '<span class="nav-badge" id="badge-' + t.id + '" style="display:none">0</span>'
      + '</a>';
  }).join('');

  const adminCrown = isAdmin() ? icon('crown', 13) : '';
  const initStr = initials2(session);

  const discordBtn = '<a href="https://discord.gg/politq" target="_blank" style="display:flex;align-items:center;justify-content:center;gap:7px;padding:8px 10px;border-radius:6px;border:1px solid #2a2a5a;background:#1a1a3a;color:#7289da;text-decoration:none;font-size:12px;font-weight:600;margin-bottom:6px">'
    + '<svg width="15" height="15" viewBox="0 0 24 24" fill="#7289da"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>'
    + 'Join our Discord</a>';

  const betaBtn = '<div style="display:flex;align-items:center;justify-content:center;padding:8px 10px;border-radius:6px;border:1px solid #4a3a10;background:#2a1e04;color:#c0a060;font-size:12px;font-weight:700;letter-spacing:1px;margin-bottom:8px">&#9733; Beta</div>';
  const divider = '<div style="height:1px;background:var(--border);margin-bottom:8px"></div>';

  const app = document.getElementById('app');
  app.className = 'app';
  app.innerHTML =
    '<button class="mobile-toggle" onclick="openSidebar()">&#9776;</button>'
    + '<div class="sidenav-overlay" id="sidenavOverlay" onclick="closeSidebar()"></div>'
    + '<nav class="sidenav" id="sidenav">'
    + '<div class="sidenav-logo">Polit<span>Q</span></div>'
    + '<div class="sidenav-tabs">' + tabsHtml + '</div>'
    + '<div class="sidenav-bottom">'
    + discordBtn + betaBtn + divider
    + '<a class="user-pill" href="profile.html" id="userPill">'
    + '<div class="pill-av" id="pillAv">' + initStr + '</div>'
    + '<span class="pill-name">' + sanitize(session) + '</span>'
    + adminCrown
    + '</a>'
    + '<button class="logout-btn" onclick="doLogout()">' + icon('logout', 14) + ' Log out</button>'
    + '</div>'
    + '</nav>'
    + '<div class="main-wrap">' + mainHtml + '</div>';

  window.openSidebar  = function(){ document.getElementById('sidenav').classList.add('open'); document.getElementById('sidenavOverlay').classList.add('open'); };
  window.closeSidebar = function(){ document.getElementById('sidenav').classList.remove('open'); document.getElementById('sidenavOverlay').classList.remove('open'); };

  // Apply bubble sidebar if needed
  try {
    const saved = localStorage.getItem('pq_theme');
    if(saved){
      const d = JSON.parse(saved);
      if(d.themeLayout === 'bubble'){
        const s = document.createElement('style');
        s.textContent = '.sidenav{border-radius:0 20px 20px 0;margin:8px 0;height:calc(100vh - 16px)!important;border:1px solid var(--border)}.sidenav-tab{border-radius:12px!important}.user-pill{border-radius:12px!important}.card,.post-card,.friend-card,.ticket-card{border-radius:16px!important}.btn{border-radius:12px!important}.input{border-radius:12px!important}';
        document.head.appendChild(s);
      }
      if(d.themeLayout === 'tech'){
        const o = document.createElement('div');
        o.id = 'tech-overlay';
        o.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;background:repeating-linear-gradient(0deg,rgba(0,255,0,0.015) 0px,rgba(0,255,0,0.015) 1px,transparent 1px,transparent 4px)';
        document.body.appendChild(o);
      }
    }
  } catch(e){}

  const db = getDb();

  onValue(ref(db, 'users/' + session), function(snap){
    const u = snap.val() || {};
    const av = document.getElementById('pillAv');
    if(av){
      if(u.avatarB64) av.innerHTML = '<img src="' + u.avatarB64 + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%">';
      else av.textContent = initials2(session);
    }
    // Q+ star in sidebar
    if(u.qplus){
      const pill = document.getElementById('userPill');
      if(pill && !pill.querySelector('.prem-star')){
        const star = document.createElement('span');
        star.className = 'prem-star';
        star.textContent = '★';
        star.style.cssText = 'color:#c0a060;font-size:12px';
        pill.appendChild(star);
      }
    }
    // Sync theme to localStorage from Firebase (keeps devices in sync)
    if(u.themeMode || u.themeBg || u.themeLayout){
      const current = {
        themeMode: u.themeMode,
        themeBg: u.themeBg,
        themeBg2: u.themeBg2,
        themeBg3: u.themeBg3,
        themeCard: u.themeCard,
        themeLayout: u.themeLayout
      };
      const stored = localStorage.getItem('pq_theme');
      // Only update localStorage if Firebase data differs — avoids overwriting fresh changes
      if(JSON.stringify(current) !== stored){
        localStorage.setItem('pq_theme', JSON.stringify(current));
      }
    }
    if(u.banned){ set(ref(db,'online/'+session),null); clearSession(); window.location.href='index.html'; }
  }, {onlyOnce: true});

  onValue(ref(db, 'notifications/' + session), function(snap){
    const notifs = snap.val() || {};
    const unread = Object.values(notifs).filter(function(n){ return !n.read; }).length;
    updateBadge('notifications', unread);
  });

  onValue(ref(db, 'users/' + session + '/receivedRequests'), function(snap){
    updateBadge('friends', snap.val() ? Object.keys(snap.val()).length : 0);
  });

  onValue(ref(db, 'dms'), function(snap){
    const dms = snap.val() || {};
    let unread = 0;
    Object.keys(dms).forEach(function(k){
      if(!k.split('__').includes(session)) return;
      Object.values(dms[k]||{}).forEach(function(m){ if(m.from!==session&&!m.read) unread++; });
    });
    updateBadge('messages', unread);
  });

  // Heartbeat — keeps online status fresh, auto-removes on disconnect
  const onlineRef = ref(db, 'online/' + session);
  set(onlineRef, {t: Date.now()});
  onDisconnect(onlineRef).remove();
  setInterval(function(){ set(onlineRef, {t: Date.now()}); }, 25000);

  window.doLogout = function(){
    set(ref(db, 'online/' + session), null);
    clearSession();
    window.location.href = 'index.html';
  };
  window.addEventListener('beforeunload', function(){ set(ref(db,'online/'+session),null); });
}

function initials2(n){ return ((n||'?').replace(/[^a-zA-Z0-9]/g,'').slice(0,2)||'?').toUpperCase(); }
function updateBadge(tab, count){ const el=document.getElementById('badge-'+tab); if(el){el.textContent=count;el.style.display=count>0?'':'none';} }


