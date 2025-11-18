# 377-Final-Project

## Zen Library Website and API

### Browsers
- Chrome
- Firefox
- [Developer manual](###developer manual)

### Technology

#### Website
- HTML
- JavaScript
- CSS

#### Server
- Nodejs
- Expressjs
- Supabase

## Local Installation
1. Install Nodejs dependencies
`npm install`

2. Setup environment variables
- Rename ".env.copy" file to ".env"
- Replace "SUPABASE_API_KEY" with your own

3. Run Expressjs server
`npm run start`

### Testing
Run testing script before deployment
`npm run test`

### API Endpoints
| Endpoint | Method | Description | Authentication |
|---|---|---|---|
| `/quote` | `GET` | Retrieves a list of all users. | None |
| `/quote` | `POST` | Save new quote to database | None |
| `/{userId}/quotes` | `GET` | Get users saved quotes. | None |
| `/quote/{id}` | `POST` | Save quote to users saved quotes | None |
| `/quote/{id}` | `DELETE` | Delete quote from users saved quotes. | None |
