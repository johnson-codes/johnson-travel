/**
 * App bootstrap: intro stats, filters, map wiring.
 */
(function () {
  const journeys = Array.isArray(window.JOURNEYS) ? window.JOURNEYS : [];

  const countrySelect = document.getElementById("filter-country");
  const yearSelect = document.getElementById("filter-year");
  const statusSelect = document.getElementById("filter-status");
  const resetBtn = document.getElementById("filter-reset");

  const STATUS_LABELS = { visited: "Visited", "to-visit": "To visit" };
  const resultCount = document.getElementById("result-count");
  const countriesVisited = document.getElementById("stat-countries");
  const journeysRecorded = document.getElementById("stat-journeys");
  const yearsActive = document.getElementById("stat-years");
  const fallback = document.getElementById("map-fallback");
  const mapEl = document.getElementById("map");

  function uniqueSorted(values) {
    return [...new Set(values)].sort((a, b) => {
      if (typeof a === "number" && typeof b === "number") return b - a;
      return String(a).localeCompare(String(b));
    });
  }

  function fillSelect(select, values, allLabel) {
    select.innerHTML = "";
    const all = document.createElement("option");
    all.value = "all";
    all.textContent = allLabel;
    select.appendChild(all);

    values.forEach((value) => {
      const option = document.createElement("option");
      option.value = String(value);
      option.textContent = String(value);
      select.appendChild(option);
    });
  }

  function filteredJourneys() {
    const country = countrySelect.value;
    const year = yearSelect.value;
    const status = statusSelect.value;

    return journeys.filter((journey) => {
      const countryOk = country === "all" || journey.country === country;
      const yearOk = year === "all" || String(journey.year) === year;
      const statusOk = status === "all" || journey.status === status;
      return countryOk && yearOk && statusOk;
    });
  }

  function updateStats() {
    const countries = uniqueSorted(journeys.map((j) => j.country));
    const years = uniqueSorted(journeys.map((j) => j.year));

    countriesVisited.textContent = String(countries.length);
    journeysRecorded.textContent = String(journeys.length);
    yearsActive.textContent = String(years.length);
  }

  function updateCount(list) {
    const n = list.length;
    resultCount.textContent = n === 1 ? "1 journey shown" : `${n} journeys shown`;
  }

  function applyFilters() {
    const list = filteredJourneys();
    updateCount(list);
    if (window.JourneyMap && typeof google !== "undefined") {
      window.JourneyMap.renderMarkers(list);
    }
  }

  function showFallback(message) {
    if (mapEl) mapEl.style.display = "none";
    if (!fallback) return;
    fallback.classList.add("is-visible");
    if (message) {
      const p = fallback.querySelector("[data-fallback-message]");
      if (p) p.textContent = message;
    }
  }

  function fillStatusSelect() {
    statusSelect.innerHTML = "";
    const all = document.createElement("option");
    all.value = "all";
    all.textContent = "All places";
    statusSelect.appendChild(all);

    Object.entries(STATUS_LABELS).forEach(([value, label]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      statusSelect.appendChild(option);
    });
  }

  function initFilters() {
    fillSelect(countrySelect, uniqueSorted(journeys.map((j) => j.country)), "All countries");
    fillSelect(yearSelect, uniqueSorted(journeys.map((j) => j.year)), "All years");
    fillStatusSelect();

    countrySelect.addEventListener("change", applyFilters);
    yearSelect.addEventListener("change", applyFilters);
    statusSelect.addEventListener("change", applyFilters);
    resetBtn.addEventListener("click", () => {
      countrySelect.value = "all";
      yearSelect.value = "all";
      statusSelect.value = "all";
      applyFilters();
    });
  }

  window.initJourneyMap = function initJourneyMap() {
    updateStats();
    initFilters();
    updateCount(journeys);

    const ok = window.JourneyMap.init(journeys);
    if (!ok) {
      showFallback("The map could not start. Check the Google Maps API key and console errors.");
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    updateStats();
    initFilters();
    updateCount(journeys);

    const key = window.GOOGLE_MAPS_API_KEY;
    if (!key || key === "YOUR_GOOGLE_MAPS_API_KEY") {
      showFallback();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&callback=initJourneyMap`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      showFallback("Google Maps failed to load. Check your network connection and API key.");
    };
    document.head.appendChild(script);
  });
})();
