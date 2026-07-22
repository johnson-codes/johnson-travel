# Johnson’s Journey

Interactive travel album for friends and family: explore places on a Google Map, click pins, and read short personal flashcards.

## Quick start

1. Copy the config example and add your Google Maps API key:

```bash
cp js/config.example.js js/config.js
```

2. Edit `js/config.js` and set `GOOGLE_MAPS_API_KEY`.

3. Preview locally:

```bash
python3 -m http.server 8080
```

Open http://127.0.0.1:8080/

## Add a journey

Edit `js/journeys.js` and append an object:

```javascript
{
  id: 4,
  location: "Lisbon, Portugal",
  country: "Portugal",
  year: 2025,
  date: "May 2, 2025",
  latitude: 38.7223,
  longitude: -9.1393,
  image: "images/journeys/lisbon.webp",
  story: "Your short personal story here."
}
```

Put photos in `images/journeys/` (prefer compressed WebP).

## Deploy (GitHub Pages)

1. Push to `main`.
2. Enable Pages for this repo (branch: `main`, folder: `/`).
3. Restrict your Maps API key to `https://johnson-codes.github.io/johnson-travel/*`.
4. Ensure `js/config.js` exists on the deployed site with a valid key  
   (either commit a **domain-restricted** key, or inject it in your deploy process).

> Note: `js/config.js` is gitignored by default so keys are not pushed accidentally. For GitHub Pages you must either stop ignoring a restricted key or publish the file another way.

## Project structure

```text
index.html
css/styles.css
js/app.js
js/map.js
js/journeys.js
js/config.example.js
images/journeys/
assets/icons/
PROJECT_BRIEF.md
```

See `PROJECT_BRIEF.md` for product and design requirements.
