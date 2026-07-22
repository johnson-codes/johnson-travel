# Project Overview: Johnson’s Journey

**Status:** Living document — follow this file for all future product, design, and engineering work.  
**Repo:** https://github.com/johnson-codes/johnson-travel  
**Local path:** `~/Projects/johnson-travel`

When a request conflicts with this brief, call out the conflict and update this document in the same change set.

---

## 1. Project Summary

Johnson’s Journey is a public web application that showcases Johnson’s personal travel experiences around the world.

The website is designed mainly for friends and family. Visitors can explore Johnson’s journey through an interactive Google Map, click location markers, and view a small flashcard containing a photo, travel date, and personal story.

The application should be lightweight, easy to maintain, mobile-friendly, and suitable for deployment through GitHub Pages.

---

## 2. Main Goal

The main goal is to create a visual and personal record of Johnson’s travels.

The experience should feel like an interactive digital travel album rather than a traditional travel blog.

---

## 3. Target Audience

Primary audience:

- Friends and family
- People interested in Johnson’s personal journey
- Visitors accessing the website through desktop or mobile devices

The website will be publicly accessible and will not require login or authentication.

---

## 4. Core User Experience

When users visit the website, they will first see an introduction section explaining who Johnson is and what the project represents.

Below the introduction, users will see an interactive world map.

Users can:

- Explore the map by zooming and moving around
- Click a location marker
- View a small popup flashcard
- Filter journeys by country
- Filter journeys by year

Each map location will represent one journey story.

---

## 5. Journey Flashcard Content

Each popup flashcard should include:

- Location name
- Travel date
- One main photo
- Short personal story

Each location contains only one story.

The popup should remain simple and readable without covering too much of the map.

---

## 6. Technical Approach

The application will use:

- Vanilla HTML
- Vanilla CSS
- Vanilla JavaScript
- Google Maps JavaScript API
- GitHub Pages for hosting
- GitHub repository for image storage

No frontend framework, database, CMS, or user account system is required.

Journey content will be manually added and updated in the source code.

---

## 7. Suggested Project Structure

```text
johnsons-journey/
│
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── map.js
│   └── journeys.js
├── images/
│   └── journeys/
├── assets/
│   └── icons/
├── PROJECT_BRIEF.md
└── README.md
```

---

## 8. Journey Data Structure

Journey information should be stored in a JavaScript array or local JSON file.

Example:

```javascript
const journeys = [
  {
    id: 1,
    location: "Banff, Canada",
    country: "Canada",
    year: 2026,
    date: "July 18, 2026",
    latitude: 51.1784,
    longitude: -115.5708,
    image: "images/journeys/banff.jpg",
    story: "A memorable family trip through the Canadian Rockies."
  }
];
```

This structure should make it easy to add future locations without changing the main map logic.

---

## 9. Main Page Sections

### Introduction Section

The introduction should appear above the map and may include:

- Project title
- Short description
- Featured travel image
- Brief introduction to Johnson
- Simple travel statistics, such as countries visited or journeys recorded

### Filter Section

The filter area should allow users to select:

- Country
- Year

Filters should update the visible map markers without reloading the page.

### Interactive Map Section

The map should:

- Display all available journey markers
- Automatically fit visible markers when appropriate
- Show a popup when a marker is clicked
- Close the previous popup when another marker is selected
- Work properly on desktop, tablet, and mobile devices

---

## 10. Design Direction

The visual style should feel:

- Personal
- Warm
- Clean
- Modern
- Travel-inspired
- Easy to navigate

The map should remain the main visual focus.

The design should use generous spacing, readable typography, responsive images, and simple animations.

---

## 11. Responsive Requirements

The website must work on:

- Desktop
- Tablet
- Mobile phone

On smaller screens:

- The introduction should stack vertically
- Filters should remain easy to use
- Map controls should not overlap other content
- Popup cards should remain readable
- Images should resize automatically

---

## 12. Performance Requirements

Because the website will be hosted on GitHub Pages, the application should remain lightweight.

Images should be compressed and preferably use WebP format.

JavaScript should avoid unnecessary libraries and large dependencies.

The Google Maps API key should be restricted by domain through the Google Cloud Console.

---

## 13. Out of Scope

The first version will not include:

- User accounts
- Login or registration
- Admin dashboard
- CMS integration
- Comments
- Likes or reactions
- Database
- Online photo uploading
- Multiple stories for one location
- Complex backend services

---

## 14. Success Criteria

The project is successful when:

- Visitors can clearly understand the purpose of the website
- The map loads correctly on GitHub Pages
- Users can click markers and read journey stories
- Country and year filters work correctly
- New journeys can be added by editing one data file
- The website works well on both desktop and mobile devices

---

## 15. Working Agreements

Before making design, content, or code changes:

1. Read this file.
2. Align work with the goal, UX, structure, and constraints above.
3. Prefer adding journeys via `js/journeys.js` (or the agreed data file) without changing map logic.
4. Keep the stack vanilla (HTML/CSS/JS + Google Maps) unless this brief is updated.
5. After intentional product or design shifts, update this brief in the same change set.
