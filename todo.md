# TO DO MVP

- [x] Set up basic launch
- [x] Find Movie DB and do basic imports
- [x] Launch on vercel
- [x] Set up zustand for state
- [x] Load TV show details
- [/] Load most recent shows
- [x] Set up basic auth

- [x] Set up DB

  - [x] seed with TVDB details
  - [x] Omit news shows
  - [x] Seed Genres
  - [x] Seed Content Ratings
  - [x] Finish the links to above
  - [x] Figure out cringe rating system
  - [x] Set default Cringe Rating depending on content rating
  - [] Set up regular content update (ISR)
  - [x] ERROR: shows stop at 2012 - get new data source

- [x] Fix carousel so it works under mobile

  - [x] Sort by newest release
  - [] Sort by most reviewed
  - [x] Sort safest/most dangerous shows

- [x] - Rig up routing for:
  - [x] homepage
  - [x] Top nav with search
  - [x] Profile page
  - [x] Individual series search
  - [x] search result pages

- [x] Auth set up
- [x] Auth0

- [x] HOMEPAGE COMPONENTS:
  - [x] search functions
    - [x] search bar ui
  - [x] List of latest tv shows
  - [x] Latest reviews (set up trpc route)

- [] SEARCH

  - [x] Search form
  - [x] Search results
  - [] debounce

- [ ] FILM SELECT PAGE

  - [x] Build UI
  - [x] Route by ID
  - [x] Review insert section
    - [x] Show current review left by user as editable form
  - [x] Show latest reviews
  - [x] Show general consensus review weighing
  - [x] Film synopsis
  - [x] classification ratings

- [ ] REVIEW FORM

  - [] Implement form validation
  - [x] Implement a form for adding a review
  - [] Make sure ranking score works
  - [x] Make sure inserts review properly
  - [ ] Update review
  - [] Delete review
  - [] Calculate consensus rating

- [] PROFILE PAGE
  - [x] Route by user id
  - [x] Name,
  - [x] Implement Bio
  - [x] Bio edit page
  - [x] Account age
  - [x] List of reviews
    - [] Paginate

- [] PUBLISH
  - [] Clean render bugs
  - [] Sort mobile responsiveness
  - [] clean up db/migrations
  - [] Merge w/ main
