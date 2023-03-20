Created with React, TypeScript, React Router, TailwindCSS, Framer Motion, and Vite.

Site: [AnimeTime](https://anime-time-mu.vercel.app)

Uses the JIKAN API (MyAnimeList Scraper) and AnimeSchedule.net API for seasonal anime data (not added yet)

Features:
- Gets all seasonal anime for 4 seasons: TV (current and continuing anime), movie, OVA, ONA, specials.
  - Seasons and respective seasonal anime are all dynamically calculated and rendered.
- Options to sort anime by Score, Popularity, Title, Studio, Start Date

Known Bugs:
- Current episode number not displayed
- Potential issues with exact times the shows air (not sure if this is an issue with the API or not)
- Long running continuing anime (like One Piece) don't show up due to how the API works

This site might break if there are API changes.

Images: