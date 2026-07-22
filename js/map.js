/**
 * Google Maps integration: markers, InfoWindow flashcards, fit bounds.
 */
window.JourneyMap = (function () {
  let map = null;
  let infoWindow = null;
  let markers = [];
  let markerById = new Map();

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function flashcardHtml(journey) {
    const badge =
      journey.status === "to-visit"
        ? '<span class="flashcard-badge">To visit</span>'
        : "";
    return `
      <article class="flashcard">
        <img src="${escapeHtml(journey.image)}" alt="${escapeHtml(journey.location)}" />
        <div class="flashcard-body">
          <h3>${escapeHtml(journey.location)}${badge}</h3>
          <time datetime="${escapeHtml(String(journey.year))}">${escapeHtml(journey.date)}</time>
          <p>${escapeHtml(journey.story)}</p>
        </div>
      </article>
    `;
  }

  function clearMarkers() {
    markers.forEach((marker) => marker.setMap(null));
    markers = [];
    markerById.clear();
  }

  function fitToMarkers(list) {
    if (!map || !list.length) return;
    if (list.length === 1) {
      map.setCenter({ lat: list[0].latitude, lng: list[0].longitude });
      map.setZoom(6);
      return;
    }
    const bounds = new google.maps.LatLngBounds();
    list.forEach((j) => bounds.extend({ lat: j.latitude, lng: j.longitude }));
    map.fitBounds(bounds, 64);
  }

  function renderMarkers(journeys) {
    if (!map) return;

    clearMarkers();
    infoWindow.close();

    journeys.forEach((journey) => {
      const marker = new google.maps.Marker({
        map,
        position: { lat: journey.latitude, lng: journey.longitude },
        title: journey.location,
        icon: {
          url: journey.status === "to-visit" ? "assets/icons/pin-planned.svg" : "assets/icons/pin.svg",
          scaledSize: new google.maps.Size(28, 36),
          anchor: new google.maps.Point(14, 36)
        }
      });

      marker.addListener("click", () => {
        infoWindow.setContent(flashcardHtml(journey));
        infoWindow.open({ map, anchor: marker });
      });

      markers.push(marker);
      markerById.set(journey.id, marker);
    });

    fitToMarkers(journeys);
  }

  function init(journeys) {
    const el = document.getElementById("map");
    if (!el || typeof google === "undefined" || !google.maps) {
      return false;
    }

    map = new google.maps.Map(el, {
      center: { lat: 20, lng: 0 },
      zoom: 2,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
      gestureHandling: "greedy",
      styles: [
        { elementType: "geometry", stylers: [{ color: "#ebe6db" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#5a6560" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#f6f3ec" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#b7d0c8" }] },
        { featureType: "poi", stylers: [{ visibility: "off" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#ddd6c8" }] }
      ]
    });

    infoWindow = new google.maps.InfoWindow({ maxWidth: 300 });
    map.addListener("click", () => infoWindow.close());

    renderMarkers(journeys);
    return true;
  }

  return {
    init,
    renderMarkers
  };
})();
