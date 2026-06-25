// theme.js — runs inline in every page <head> before render
// Reads from localStorage and applies CSS vars instantly, zero flash

(function(){
  function shade(hex, amt){
    try {
      var h = (hex||'#0a0a0a').replace('#','');
      if(h.length===3) h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
      var n=parseInt(h,16);
      var r=Math.min(255,Math.max(0,(n>>16)+amt));
      var g=Math.min(255,Math.max(0,((n>>8)&0xff)+amt));
      var b=Math.min(255,Math.max(0,(n&0xff)+amt));
      return '#'+[r,g,b].map(function(v){return v.toString(16).padStart(2,'0');}).join('');
    } catch(e){ return '#111'; }
  }

  try {
    var raw = localStorage.getItem('pq_theme');
    if(!raw) return;
    var d = JSON.parse(raw);
    var s = document.documentElement.style;

    if(d.themeMode === 'light'){
      s.setProperty('--bg','#f0f0f0');
      s.setProperty('--bg2','#e4e4e4');
      s.setProperty('--bg3','#d8d8d8');
      s.setProperty('--card','#e8e8e8');
      s.setProperty('--border','#ccc');
      s.setProperty('--text','#111');
      s.setProperty('--text2','#555');
      s.setProperty('--text3','#999');
    } else {
      var bg = d.themeBg || '#0a0a0a';
      s.setProperty('--bg', bg);
      s.setProperty('--bg2', d.themeBg2 || shade(bg, 8));
      s.setProperty('--bg3', d.themeBg3 || shade(bg, 18));
      s.setProperty('--card', d.themeCard || shade(bg, 12));
      s.setProperty('--border', shade(bg, 32));
      s.setProperty('--text','#e8e8e8');
      s.setProperty('--text2','#888');
      s.setProperty('--text3','#444');
    }

    if(d.themeLayout === 'bubble'){
      s.setProperty('--radius','16px');
      document.documentElement.style.fontFamily = "system-ui,sans-serif";
    } else if(d.themeLayout === 'tech'){
      s.setProperty('--radius','2px');
      s.setProperty('--text','#00ff41');
      s.setProperty('--text2','#00aa2a');
      s.setProperty('--text3','#005515');
      s.setProperty('--bg','#000');
      s.setProperty('--bg2','#050505');
      s.setProperty('--bg3','#0a0a0a');
      s.setProperty('--card','#070707');
      s.setProperty('--border','#003a10');
      document.documentElement.style.fontFamily = "'Courier New',monospace";
    } else {
      s.setProperty('--radius','8px');
    }
  } catch(e){}
})();
