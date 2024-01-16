Created with:  
  - React, TypeScript, React Router, TailwindCSS, Framer Motion (Front End) 
  - Python, Django with REST Framework, PostgreSQL (Back End) 

Site: [AnimeTime](https://anime-time-mu.vercel.app)

Uses the JIKAN API (MyAnimeList Scraper) and AnimeSchedule.net API for seasonal anime data (not added yet)

Features:
- Gets all seasonal anime for 4 seasons: TV (current and continuing anime), movie, OVA, ONA, specials.
  - Seasons and respective seasonal anime are all dynamically calculated and rendered.
- Options to sort anime by Score, Popularity, Title, Studio, Start Date

Known Bugs:
- Current episode number not displayed
- Potential issues with exact times the shows air (not sure if this is an issue with the API or not)
- Long running continuing anime (like One Piece) don't show up due to how the Jikan API works

Warning: This site might break if there are API changes.

Images:
![anitime-img-1](https://user-images.githubusercontent.com/31109249/226437621-427b862b-e1a7-4124-bc0c-627c0efbcb3a.png)
![anitime-img-3](https://user-images.githubusercontent.com/31109249/226437623-7a809fce-3855-493c-b7b9-d809e0dd2ffc.png)
![anitime-img-2](https://user-images.githubusercontent.com/31109249/226437625-7dde047c-afa1-4f13-b76e-dfa2988ce858.png)
