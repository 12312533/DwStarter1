/* ====================================================
   KONFIGURASI UNDANGAN: UBAH DATA DI FILE INI SAJA
   ==================================================== */

/* =====================================================
   KONFIGURASI — ubah semua data undangan di sini saja
   ===================================================== */
const CONFIG = {
  groom:{ nick:"Adrian", full:"Adrian Pratama, S.T.", parents:"Putra pertama Bapak Hendra Pratama & Ibu Sari Wulandari", ig:"adrian.pratama", photo:"Pria.jpg" },
  bride:{ nick:"Raisa",  full:"Raisa Putri Anindya, S.Ds.", parents:"Putri kedua Bapak Bambang Anindya & Ibu Lestari Dewi", ig:"raisa.anindya", photo:"wanita.jpg" },
  /* photo: isi path gambar, mis. "assets/images/adrian.jpg". Kosong = placeholder otomatis */
  weddingDate:"2027-03-20T08:00:00+07:00",
  quote:"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri, agar kamu merasa tenteram. (QS. Ar-Rum: 21)",
  music:{
    src:"Stephen Sanchez - Until I Found You (Lyrics).mp3",  /* taruh file mp3 di folder assets/music/ lalu samakan namanya di sini */
    autoplay:true,                 /* true = otomatis berputar saat tombol "Buka Undangan" ditekan */
    volume:0.6                     /* 0.0 (senyap) sampai 1.0 (penuh) */
  },
  events:[
    { title:"Akad Nikah", date:"Sabtu, 20 Maret 2027", time:"08.00 – 10.00 WIB", place:"Masjid Al-Ikhlas", address:"Jl. Merdeka No. 12, Bandung" },
    { title:"Resepsi",    date:"Sabtu, 20 Maret 2027", time:"11.00 – 14.00 WIB", place:"Gedung Graha Cendana", address:"Jl. Asia Afrika No. 88, Bandung" }
  ],
  map:{ query:"Gedung Sate Bandung", lat:-6.9025, lng:107.6186 },
  dresscode:{ title:"Earth & Gold Elegant", colors:["#fbf6ec","#e8cf8a","#c59a3e","#7a5238","#4a2f1e"],
    desc:"Kami mengundang Anda mengenakan busana formal bernuansa putih, krem, emas, atau coklat. Batik atau kebaya modern sangat disambut.",
    avoid:"Mohon tidak mengenakan warna hitam penuh dan putih polos total (khusus mempelai)." },
  story:[
    { when:"2019", title:"Pertama Bertemu", text:"Kami bertemu di sebuah acara kampus dan langsung betah mengobrol berjam-jam." },
    { when:"2021", title:"Resmi Berpacaran", text:"Setelah dua tahun berteman dekat, Adrian menyatakan perasaannya di tepi danau." },
    { when:"2026", title:"Lamaran", text:"Dua keluarga bertemu, dan kami saling berjanji untuk melangkah bersama." },
    { when:"2027", title:"Hari Bahagia", text:"Dengan restu keluarga, kami memutuskan untuk menikah." }
  ],
  gallery:[ "prewed1.jpg", "prewed2.jpg", "prewed3.jpg", "prewed4.jpg", "prewed5.jpg", "prewed6.jpg" ],   /* mis. "assets/images/pre1.jpg"; kosong = placeholder */
  video:"earthtoafnan_pindown.io_1791300731.mp4",                              /* isi ID YouTube, mis. "dQw4w9WgXcQ" */
  banks:[ { name:"Bank BCA", no:"1234567890", holder:"Adrian Pratama" }, { name:"DANA", no:"081234567890", holder:"Raisa Putri A." } ],
  address:"Jl. Kenanga No. 5, Cibeunying, Bandung 40122 (a.n. Raisa)"
};


/* ====================================================
   FUNGSI BANTU: SELECTOR, ESCAPE HTML, PENYIMPANAN, TOAST, PLACEHOLDER FOTO
   ==================================================== */

/* ================= UTIL ================= */
const $=s=>document.querySelector(s), esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const store={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)};
const ph=(i,label)=>{const h=30+i*8;return 'data:image/svg+xml;utf8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3e9d6"/><stop offset="1" stop-color="hsl(${h},38%,62%)"/></linearGradient></defs><rect width="300" height="400" fill="url(#g)"/><circle cx="150" cy="160" r="46" fill="#fffaf0aa"/><path d="M70 330q80-120 160 0z" fill="#fffaf0aa"/><text x="150" y="375" text-anchor="middle" font-family="Georgia" font-size="20" fill="#4a2f1e">${label}</text></svg>`)};
const img=(src,i,l,alt)=>`<img src="${src||ph(i,l)}" alt="${alt}" loading="lazy">`;


/* ====================================================
   MENGISI HALAMAN DENGAN DATA DARI CONFIG + ORNAMEN BUNGA PADA PINTU
   ==================================================== */

/* ================= ISI DATA ================= */
const {groom:G,bride:B}=CONFIG, names=`${B.nick} & ${G.nick}`, d=new Date(CONFIG.weddingDate);
const fmt=d.toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Jakarta'});
document.title=`Undangan Pernikahan ${names}`;
$('#cvNames').textContent=names; $('#hNames').innerHTML=`${B.nick} <i>&</i> ${G.nick}`; $('#fNames').textContent=names;
$('#mono').textContent=B.nick[0]+G.nick[0];
$('#cvDate').textContent=fmt; $('#hDate').textContent=fmt; $('#quote').textContent=CONFIG.quote;
const to=new URLSearchParams(location.search).get('to'); if(to) $('#guest').textContent=to;   /* ?to=Budi */

$('#coupleBox').innerHTML=[B,G].map((p,i)=>`<div class="person">${img(p.photo,i*2,p.nick,p.full)}<h3>${esc(p.full)}</h3><p>${esc(p.parents)}</p><a href="https://instagram.com/${p.ig}" target="_blank" rel="noopener">@${esc(p.ig)}</a></div>`).join('');
$('#events').innerHTML=CONFIG.events.map(e=>`<div class="ev tilt"><h3>${esc(e.title)}</h3><p class="d">${esc(e.date)}</p><p class="sub" style="margin:6px 0 10px">${esc(e.time)}</p><p><b>${esc(e.place)}</b></p><p>${esc(e.address)}</p></div>`).join('');
const M=CONFIG.map, q=encodeURIComponent(M.query);
$('#mapFrame').src=`https://maps.google.com/maps?q=${M.lat},${M.lng}&z=15&output=embed`;
$('#gmaps').href=`https://www.google.com/maps/search/?api=1&query=${q}`; $('#waze').href=`https://waze.com/ul?ll=${M.lat},${M.lng}&navigate=yes`;
const dc=CONFIG.dresscode; $('#dcTitle').textContent=dc.title; $('#dcDesc').textContent=dc.desc; $('#dcAvoid').textContent=dc.avoid;
$('#dcSw').innerHTML=dc.colors.map(c=>`<i style="background:${c}" title="${c}"></i>`).join('');
$('#tl').innerHTML=CONFIG.story.map(s=>`<div class="rv"><b>${esc(s.when)}</b><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>`).join('');
$('#cards').innerHTML=CONFIG.banks.map((b,i)=>`<div class="card tilt"><p class="sub" style="color:var(--gold2)">${esc(b.name)}</p><strong>${esc(b.no)}</strong><p>a.n. ${esc(b.holder)}</p><button class="btn sm ghost" style="color:var(--gold2);margin-top:12px" data-copy="${esc(b.no)}">Salin Nomor</button></div>`).join('');
$('#addr').textContent=CONFIG.address;
document.addEventListener('click',e=>{const c=e.target.closest('[data-copy],[data-copy-addr]');if(!c)return;const v=c.dataset.copy??CONFIG.address;
  (navigator.clipboard?navigator.clipboard.writeText(v):Promise.reject()).then(()=>toast('Berhasil disalin'),()=>{const t=document.createElement('textarea');t.value=v;document.body.append(t);t.select();try{document.execCommand('copy');toast('Berhasil disalin')}catch{toast('Salin manual: '+v)}t.remove()})});
/* QR placeholder (pola acak tetap) */
(()=>{let s='',r=7;for(let y=0;y<21;y++)for(let x=0;x<21;x++){r=(r*9301+49297)%233280;const f=(x<7&&y<7)||(x>13&&y<7)||(x<7&&y>13);const on=f?!((x%14>0&&x%14<6&&y%14>0&&y%14<6)&&!(x%14>1&&x%14<5&&y%14>1&&y%14<5)&&0)&&(Math.max(Math.abs(x%14-3),Math.abs(y%14-3))!==2):r/233280>.5;if(on)s+=`<rect x="${x}" y="${y}" width="1" height="1" fill="#2a1a10"/>`}$('#qr').innerHTML=s})();
/* Video */
$('#video').innerHTML=CONFIG.video?`<iframe src="earthtoafnan_pindown.io_1791300731.mp4" title="Video prewedding" allow="encrypted-media;picture-in-picture" allowfullscreen loading="lazy"></iframe>`:'<p class="sub" style="color:var(--gold2)">Video pre-wedding (isi CONFIG.video)</p>';

/* ================= PINTU: ornamen timbul ================= */
function flowers(side){const s=side==='l'?1:-1,ox=side==='l'?0:200;let o='';
  const petal=(x,y,r,rot)=>`<g transform="translate(${ox+s*x} ${y}) rotate(${rot})">${[0,72,144,216,288].map(a=>`<ellipse rx="${r*.38}" ry="${r}" cy="${-r*.8}" transform="rotate(${a})" fill="#fffaf0" stroke="#c59a3e" stroke-width=".7" opacity=".95"/>`).join('')}<circle r="${r*.28}" fill="#e8cf8a" stroke="#b98a2c" stroke-width=".6"/></g>`;
  o+=`<path d="M${ox+s*22} 400C${ox+s*40} 300 ${ox+s*10} 220 ${ox+s*34} 120S${ox+s*28} 40 ${ox+s*50} 14" fill="none" stroke="#c59a3e" stroke-width="1.4"/>`;
  [[30,330,15,10],[44,250,18,50],[22,175,13,-20],[42,110,17,30],[56,40,12,0],[70,300,10,0],[64,195,9,0]].forEach(a=>o+=petal(...a));
  for(let i=0;i<9;i++)o+=`<ellipse cx="${ox+s*(16+(i%3)*26)}" cy="${60+i*38}" rx="4" ry="11" transform="rotate(${s*(35+i*9)} ${ox+s*(16+(i%3)*26)} ${60+i*38})" fill="#e8d9b3" stroke="#c59a3e" stroke-width=".6"/>`;
  return o}
$('#fl').innerHTML=flowers('l'); $('#fr').innerHTML=flowers('r');


/* ====================================================
   HITUNG MUNDUR MENUJU HARI-H
   ==================================================== */

/* ================= COUNTDOWN ================= */
const cd=$('#cd'); cd.innerHTML=['Hari','Jam','Menit','Detik'].map(l=>`<div><b>00</b><span>${l}</span></div>`).join('');
const bs=[...cd.querySelectorAll('b')], last=[];
function tick(){let t=Math.max(0,d-Date.now());const v=[Math.floor(t/864e5),Math.floor(t/36e5)%24,Math.floor(t/6e4)%60,Math.floor(t/1e3)%60];
  v.forEach((n,i)=>{const s=String(n).padStart(2,'0');if(last[i]!==s){bs[i].textContent=s;last[i]=s;if(i===3){bs[i].classList.remove('flip');void bs[i].offsetWidth;bs[i].classList.add('flip')}}})}
tick(); setInterval(tick,1000);


/* ====================================================
   GALERI FOTO KARUSEL 3D
   ==================================================== */

const stage=$('#stage');

/* ================= GALERI 3D (carousel) ================= */
const gal=CONFIG.gallery, n=gal.length; let cur=0;
$('#ring').innerHTML=gal.map((s,i)=>`<figure>${img(s,i,'Foto '+(i+1),'Foto prewedding '+(i+1))}</figure>`).join('');
function ring(){const R=Math.max(170,Math.min(innerWidth*.38,300)),fs=[...$('#ring').children];
  fs.forEach((f,i)=>f.style.transform=`rotateY(${i*360/n}deg) translateZ(${R}px)`);
  $('#ring').style.transform=`translateZ(${-R}px) rotateY(${-cur*360/n}deg)`}
ring(); addEventListener('resize',ring);
$('#next').onclick=()=>{cur++;ring()}; $('#prev').onclick=()=>{cur--;ring()};
setInterval(()=>{if(!document.hidden&&!stage.matches(':hover')){cur++;ring()}},3800);


/* ====================================================
   RSVP DAN BUKU TAMU (TERSIMPAN DI BROWSER; SAMBUNGKAN KE BACKEND UNTUK DATA BERSAMA)
   ==================================================== */

/* ================= RSVP & BUKU TAMU ================= */
$('#rsvpForm').onsubmit=e=>{e.preventDefault();const all=store.get('rsvp',[]);
  all.push({n:$('#rn').value.trim(),s:document.querySelector('[name=st]:checked').value,c:+$('#rc').value,t:Date.now()});store.set('rsvp',all);
  $('#rMsg').textContent=`Terima kasih, ${$('#rn').value.trim()}. Konfirmasi Anda (${document.querySelector('[name=st]:checked').value}) sudah tercatat.`;e.target.reset();burst(innerWidth/2,innerHeight*.6,40)};
const wl=()=>{$('#wList').innerHTML=store.get('wishes',[]).slice().reverse().map(w=>`<div class="wish"><small>${new Date(w.t).toLocaleDateString('id-ID',{day:'numeric',month:'short'})}</small><b>${esc(w.n)}</b><p>${esc(w.m)}</p></div>`).join('')||'<p class="msg">Jadilah yang pertama mengirim ucapan.</p>'};
wl();
$('#wishForm').onsubmit=e=>{e.preventDefault();const a=store.get('wishes',[]);a.push({n:$('#wn').value.trim(),m:$('#wm').value.trim(),t:Date.now()});store.set('wishes',a);wl();e.target.reset();toast('Ucapan terkirim')};


/* ====================================================
   ANIMASI SAAT SCROLL, EFEK MIRING 3D, DAN PARTIKEL EMAS
   ==================================================== */

/* ================= SCROLL REVEAL & TILT 3D ================= */
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));
document.querySelectorAll('.tilt').forEach(el=>{
  el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(700px) rotateY(${x*14}deg) rotateX(${-y*14}deg) translateZ(8px)`});
  el.addEventListener('pointerleave',()=>el.style.transform='')});

/* ================= PARTIKEL EMAS ================= */
const cv=$('#fx'),cx=cv.getContext('2d');let P=[];
const fit=()=>{const r=devicePixelRatio||1;cv.width=innerWidth*r;cv.height=innerHeight*r;cx.setTransform(r,0,0,r,0,0)};fit();addEventListener('resize',fit);
const mk=(x,y,burst)=>({x,y,r:Math.random()*2.4+.6,vx:burst?(Math.random()-.5)*9:(Math.random()-.5)*.3,vy:burst?(Math.random()-.8)*8:Math.random()*.5+.15,a:1,ph:Math.random()*6,burst});
function burst(x,y,k){for(let i=0;i<k;i++)P.push(mk(x,y,true))}
for(let i=0;i<(innerWidth<600?26:50);i++)P.push(mk(Math.random()*innerWidth,Math.random()*innerHeight));
(function loop(){cx.clearRect(0,0,innerWidth,innerHeight);
  P=P.filter(p=>{p.ph+=.03;p.x+=p.vx+Math.sin(p.ph)*.25;p.y+=p.vy;if(p.burst){p.vy+=.14;p.vx*=.985;p.a-=.012}
    if(!p.burst&&p.y>innerHeight+10){p.y=-10;p.x=Math.random()*innerWidth}
    if(p.a<=0)return false;cx.globalAlpha=p.a*(p.burst?1:.5+.4*Math.sin(p.ph));
    const g=cx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*3);g.addColorStop(0,'#fff3c4');g.addColorStop(.4,'#e8cf8a');g.addColorStop(1,'#c59a3e00');
    cx.fillStyle=g;cx.beginPath();cx.arc(p.x,p.y,p.r*3,0,7);cx.fill();return true});
  requestAnimationFrame(loop)})();


/* ====================================================
   MUSIK LATAR: PUTAR/JEDA, FADE, AMAN UNTUK IOS/ANDROID/DESKTOP
   ==================================================== */

const Music = (() => {
  const audio = $('#bgm'), btn = $('#mus'), cfg = CONFIG.music;
  if (!cfg.src) return { start() {} };            // tidak ada musik: tombol tidak ditampilkan

  let wantPlay = false;                           // apakah pengunjung ingin musik menyala
  let fadeTimer = null, failed = false;

  audio.src = cfg.src;
  audio.volume = 0;
  btn.classList.add('show');

  /* tampilan tombol */
  const paint = on => {
    btn.textContent = '♫';
    btn.classList.toggle('on', on);
    btn.classList.toggle('off', !on);
    btn.setAttribute('aria-pressed', String(on));
    btn.setAttribute('aria-label', on ? 'Jeda musik' : 'Putar musik');
  };
  paint(false);

  /* naik/turun volume perlahan (iOS mengabaikan volume, tetap aman) */
  const fadeTo = (target, ms = 1500, done) => {
    clearInterval(fadeTimer);
    const from = audio.volume, steps = 20; let i = 0;
    fadeTimer = setInterval(() => {
      i++;
      audio.volume = Math.min(1, Math.max(0, from + (target - from) * i / steps));
      if (i >= steps) { clearInterval(fadeTimer); if (done) done(); }
    }, ms / steps);
  };

  const fail = () => {
    if (failed) return; failed = true;
    paint(false);
    toast('Musik tidak ditemukan: ' + cfg.src);
  };

  /* jika browser memblokir autoplay, musik menyala pada sentuhan berikutnya */
  const unlockOnNextTap = () => addEventListener('pointerdown', () => { if (wantPlay) play(); }, { once: true });

  async function play() {
    wantPlay = true;
    try {
      await audio.play();
      paint(true);
      fadeTo(cfg.volume ?? 0.6);
    } catch (err) {
      if (err.name === 'NotAllowedError') { paint(false); unlockOnNextTap(); }
      else fail();
    }
  }

  function pause() {
    wantPlay = false;
    paint(false);
    fadeTo(0, 500, () => audio.pause());
  }

  audio.addEventListener('error', fail);
  btn.addEventListener('click', () => (audio.paused || !wantPlay) ? play() : pause());

  /* jeda saat tab disembunyikan, lanjut saat kembali */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) audio.pause();
    else if (wantPlay) audio.play().catch(() => {});
  });

  return { start() { if (cfg.autoplay) play(); } };
})();


/* ====================================================
   COVER: ANIMASI BUKA PINTU
   ==================================================== */

$('#openBtn').addEventListener('click', () => {
  $('#cover').classList.add('open');
  document.body.classList.remove('locked');
  scrollTo(0, 0);

  /* harus dipanggil langsung di dalam klik agar musik diizinkan browser */
  Music.start();

  burst(innerWidth / 2, innerHeight / 2, 70);
  setTimeout(() => document.querySelectorAll('#hero .rv').forEach(e => e.classList.add('in')), 900);
});