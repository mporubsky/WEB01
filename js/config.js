/* =========================================================================
   M&H žalúzie — CENTRÁLNA KONFIGURÁCIA
   -------------------------------------------------------------------------
   Toto je JEDINÝ súbor, ktorý potrebujete upraviť pri bežných zmenách:
   telefón, e-mail, otváracie hodiny, doručovanie formulárov, mapa,
   analytika (Google), sociálne siete.

   Hodnoty sa automaticky prepíšu do celého webu (hlavička, pätička,
   hero, kontakt, wizard...) cez atribúty data-mh v HTML.

   TIP: Miesta, ktoré treba doplniť pred spustením, sú označené  „⚠ DOPLNIŤ".
   ========================================================================= */

window.MH_CONFIG = {

  /* ---- Firemné údaje ---------------------------------------------------- */
  business: {
    name:      "M&H žalúzie s. r. o.",
    shortName: "M&H žalúzie",
    domain:    "mh-zaluzie.sk",
    url:       "https://mh-zaluzie.sk",
    ico:       "52838323",
    // dic:    "",                       // (voliteľné) DIČ
    // icDph:  "",                       // (voliteľné) IČ DPH

    email:     "info@mh-zaluzie.sk",

    // ⚠ DOPLNIŤ reálne telefónne číslo (zobrazované + odkaz tel:)
    phone:     "+421 9XX XXX XXX",       // ako sa zobrazí návštevníkovi
    phoneHref: "+4219XXXXXXXX",          // formát pre odkaz tel: (bez medzier)

    address: {
      street: "Budatínska 3228/51",
      zip:    "851 06",
      city:   "Bratislava – Petržalka",
      full:   "Budatínska 3228/51, 851 06 Bratislava – mestská časť Petržalka"
    },

    hoursShort: "Po – Pi: 08:00 – 17:00",
    hours: [
      { d: "Pondelok – Piatok", h: "08:00 – 17:00" },
      { d: "Sobota – Nedeľa",   h: "Zatvorené (dopyty online 24/7)" }
    ],

    coverage: ["Bratislava", "Ružinov", "Petržalka", "Dúbravka", "Senec", "Pezinok", "Malacky"],
    coverageRadiusKm: 50,
    responseTime: "24 hodín"
  },

  /* ---- Doručovanie formulárov ------------------------------------------
     Formuláre (wizard + kontakt) fungujú aj bez nastavenia – v tom prípade
     otvoria e-mailového klienta (mailto). Pre plnohodnotné odosielanie
     priamo z webu odporúčame BEZPLATNÝ Web3Forms:
       1. Choďte na https://web3forms.com
       2. Zadajte e-mail info@mh-zaluzie.sk a získajte „Access Key"
       3. Vložte kľúč nižšie do web3formsKey
     ---------------------------------------------------------------------- */
  form: {
    web3formsKey: "",                    // ⚠ (voliteľné) napr. "a1b2c3d4-...."
    // Alternatívne vlastné API (necháte prázdne, ak používate Web3Forms/mailto):
    customEndpoint: ""
  },

  /* ---- Google mapa ------------------------------------------------------
     Vložte „embed" odkaz z Google Máp (Zdieľať → Vložiť mapu → skopírovať
     obsah atribútu src). Ak necháte prázdne, zobrazí sa elegantný zástupný
     blok s odkazom na mapu.
     ---------------------------------------------------------------------- */
  maps: {
    // Vložená mapa presnej polohy podľa Google profilu firmy (bez API kľúča):
    embedSrc: "https://maps.google.com/maps?q=48.1209708,17.0959215&z=16&hl=sk&output=embed",
    // Priamy odkaz na otvorenie v Google Mapách:
    directLink: "https://www.google.com/maps?cid=14620963035425995864"
  },

  /* ---- Analytika a meranie (spúšťa sa až po súhlase s cookies) ---------- */
  analytics: {
    ga4Id: "",                           // ⚠ (voliteľné) napr. "G-XXXXXXXXXX"
    gtmId: ""                            // ⚠ (voliteľné) napr. "GTM-XXXXXXX"
  },

  /* ---- Sociálne siete a profil (necháte prázdne = nezobrazí sa) --------- */
  social: {
    facebook:     "",                    // napr. "https://facebook.com/mhzaluzie"
    instagram:    "",
    googleReviews: "https://www.google.com/maps?cid=14620963035425995864"  // Google profil / recenzie
  },

  /* ---- Súhrnné hodnotenie (Social proof) -------------------------------- */
  reviews: {
    rating: "4,9",                       // reálne priemerné hodnotenie na Google
    count:  null                         // ⚠ (voliteľné) doplniť reálny počet recenzií
  }
};
