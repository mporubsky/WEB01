/* =========================================================================
   M&H žalúzie — Filtre galérie realizácií (realizacie.html)
   Filtruje dlaždice podľa atribútu data-category.
   ========================================================================= */
(function () {
  "use strict";
  var filters = document.querySelector("[data-gallery-filters]");
  var gallery = document.querySelector("[data-gallery]");
  if (!filters || !gallery) return;

  var tiles = Array.prototype.slice.call(gallery.querySelectorAll("[data-category]"));

  filters.addEventListener("click", function (e) {
    var btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filters.querySelectorAll(".filter-btn").forEach(function (b) {
      b.classList.toggle("is-active", b === btn);
      b.setAttribute("aria-pressed", b === btn ? "true" : "false");
    });
    var cat = btn.getAttribute("data-filter");
    tiles.forEach(function (t) {
      var show = cat === "all" || t.getAttribute("data-category") === cat;
      t.classList.toggle("is-hidden", !show);
    });
  });
})();
