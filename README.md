# 377-Final-Project

## Zen Library

website + API for a “Zen Library” that displays inspirational quotes and lets users save (like) quotes.

### Browsers

- Chrome
- Firefox
- Edge

### Technology

#### Webite

- EJS (HTML templating language)
- JavaScript
- CSS (BEM naming convention)
- JS Libraries: [Matter.js](https://brm.io/matter-js/docs/), [Day.js](https://day.js.org/)

#### Server

- Nodejs
- Expressjs
- Supabase

## Developer Manuel

### Local Installation

1. Install Nodejs dependencies
   `npm install`

2. Setup environment variables

- Rename ".env.example" file to ".env"
- Replace "SUPABASE_URL" and "SUPABASE_PUBLIC_KEY" with your own

3. Run ExpressJS server
   `npm run start`

### Testing

Run testing script before deployment
`npm run test`

### API Endpoints

| Endpoint        | Method   | Description                | Authentication |
| --------------- | -------- | -------------------------- | -------------- |
| `/quotes`       | `GET`    | Get users saved quotes.    | None           |
| `/quote/like`   | `POST`   | Saves a quote by user      | None           |
| `/quote/unlike` | `DELETE` | Remove saved quote by user | None           |

### Roadmap

- [ ] Add animations to like/unlike buttons
- [ ] Add tests for client-side javascript validation
- [ ] Add error text elements for fetch requests on client-side
