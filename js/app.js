/* ===== ویرایش آسان: این بخش را عوض کنید ===== */
const CONFIG = {
  parents: "مامان و بابا",
  parentsTitle: "مامان و بابای عزیزم",
  from: "مهرزاد",
  reasons: [
    ["🍲","غذای مامان","هیچ رستورانی طعم دست‌پخت شما رو نداره."],
    ["🛡️","پشتیبانی بابا","همیشه می‌دونم یکی پشتمه."],
    ["😊","لبخندتون","با یه لبخند شما، همه‌ی خستگی‌ها از بین می‌ره."],
    ["🌙","شب‌بیداری‌ها","برای من بیدار موندید که من آروم بخوابم."],
    ["📖","نصیحت‌ها","اون موقع غر می‌دیدم، الان می‌فهمم چقدر درست بود."],
    ["🏡","خانه‌ی گرم","خونه با شما معنی می‌گیره."]
  ],
  memories: [
    ["اولین خاطره‌ها","روزهای کودکی و دست‌های گرم شما."],
    ["سفرهای خانوادگی","جاده، خنده، و خوراکی‌های وسط راه."],
    ["شب‌های یلدا و نوروز","دور هم، با فال حافظ و شیرینی."],
    ["امروز","هنوز هم بزرگ‌ترین پناه من شما هستید."]
  ],
  wishes: [
    "سلامتی و آرامش برای شما، همیشه.",
    "ان‌شاءالله سایه‌تون بالای سر ما باقی بمونه.",
    "امیدوارم هر روزتون پر از شادی و خنده باشه.",
    "خدا عمر با عزت و دل آروم بهتون بده.",
    "هر چی دارم از شماست؛ خدا شما رو برامون نگه داره.",
    "دلتون همیشه شاد، سفره‌تون همیشه گرم."
  ]
};

const $ = s => document.querySelector(s);
const fa = n => String(n).replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);

/* names */
$("#title").textContent = CONFIG.parentsTitle;
document.querySelectorAll(".from").forEach(e => e.textContent = CONFIG.from);
document.querySelectorAll(".who").forEach(e => e.textContent = CONFIG.parents);
document.title = "برای " + CONFIG.parents;

/* greeting, date, clock */
function tick(){
  const d = new Date(), h = d.getHours();
  $("#greet").textContent = h < 5 ? "شب بخیر" : h < 12 ? "صبح بخیر" : h < 17 ? "ظهر بخیر" : h < 20 ? "عصر بخیر" : "شب بخیر";
  $("#clock").textContent = d.toLocaleTimeString("fa-IR", {hour:"2-digit", minute:"2-digit"});
  $("#date").textContent = d.toLocaleDateString("fa-IR-u-ca-persian", {weekday:"long", day:"numeric", month:"long", year:"numeric"});
}
tick(); setInterval(tick, 20000);

/* cards */
$("#grid").innerHTML = CONFIG.reasons.map(r =>
  `<div class="card" tabindex="0"><div class="inner">
    <div class="face front"><div>${r[0]}<small>${r[1]}</small></div></div>
    <div class="face back">${r[2]}</div></div></div>`).join("");
document.querySelectorAll(".card").forEach(c => c.addEventListener("click", () => c.classList.toggle("flip")));

/* timeline */
$("#tl").innerHTML = CONFIG.memories.map(m =>
  `<div class="ev rv"><b>${m[0]}</b><span>${m[1]}</span></div>`).join("");

/* wishes */
let wi = 0;
$("#wishBtn").addEventListener("click", () => {
  const el = $("#wishText"); el.style.opacity = 0;
  setTimeout(() => { wi = (wi + 1) % CONFIG.wishes.length; el.textContent = CONFIG.wishes[wi]; el.style.opacity = 1; }, 300);
  burst(4);
});

/* hearts */
let hc = 0;
try { hc = parseInt(localStorage.getItem("hearts") || "0", 10) || 0; } catch(e){}
$("#hearts").textContent = fa(hc);
function burst(n){
  for (let i = 0; i < n; i++){
    const s = document.createElement("span");
    s.className = "heart"; s.textContent = ["❤","💖","💕","🌸"][Math.floor(Math.random()*4)];
    s.style.left = (10 + Math.random()*80) + "vw";
    s.style.animationDelay = (i*0.12) + "s";
    document.body.appendChild(s); setTimeout(() => s.remove(), 2600);
  }
}
$("#love").addEventListener("click", () => {
  hc++; $("#hearts").textContent = fa(hc);
  try { localStorage.setItem("hearts", hc); } catch(e){}
  burst(6); if (navigator.vibrate) navigator.vibrate(30);
});

/* reveal on scroll */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }), {threshold:.15});
document.querySelectorAll(".rv").forEach(e => io.observe(e));

/* active nav */
const links = [...document.querySelectorAll("nav a")];
const so = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id));
}), {threshold:.5});
document.querySelectorAll("section[id]").forEach(s => so.observe(s));

/* theme toggle */
$("#theme").addEventListener("click", () => {
  const r = document.documentElement;
  const dark = r.dataset.theme ? r.dataset.theme === "dark" : matchMedia("(prefers-color-scheme:dark)").matches;
  r.dataset.theme = dark ? "light" : "dark";
});
