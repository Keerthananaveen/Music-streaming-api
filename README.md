# Music Streaming API Backend
A fully functional music streaming API  built with **Node.js**, **Express**, **Prisma**, and **PostgreSQL**, following the **MVC architecture**. Includes **JWT authentication**, **role-based access**, and structured endpoints for **users, artists, albums, songs, and playlists**.

## Project Structure
```markdown
music-streaming-api/
│
├── prisma/ 
│ ├── schema.prisma 
│
├── src/ 
│ ├── controllers/ 
│ │ ├── auth.controller.js
│ │ ├── artist.controller.js
│ │ ├── album.controller.js
│ │ ├── song.controller.js
│ │ └── playlist.controller.js
│ │
│ ├── middlewares/
│ │ ├── auth.middleware.js 
│ │ └── role.middleware.js 
│ │
│ ├── routes/ 
│ │ ├── auth.routes.js
│ │ ├── artist.routes.js
│ │ ├── album.routes.js
│ │ ├── song.routes.js
│ │ └── playlist.routes.js
│ │
│ ├── services/ 
│ │ └── prisma.
│ │
│ ├── utils/ # Utility functions
│ │ └── logger.js
│ │
│ ├── app.js
│ └── server.js 
│
├── .env 
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

## **Features**

- User registration and login with **hashed passwords**  
- JWT-based authentication and **role-based access**
- CRUD endpoints for:
  - Artists
  - Albums
  - Songs
  - Playlists
- Prisma ORM for **PostgreSQL** database  

## **Tech Stack**

- **Node.js** (v20.x)  
- **Express.js**  
- **PostgreSQL**  
- **Prisma ORM**  
- **bcryptjs** for password hashing  
- **jsonwebtoken** for JWT authentication  
- **dotenv** for environment variables  

## **Getting Started**

### **Prerequisites**

- Node.js v20.x installed  
- PostgreSQL database  
- Git  

### **Installation**

```bash
# Clone the repo
git clone <your-repo-url>
cd music-streaming-api

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate
```

### Environment Variables
- PORT=add your port number
- DATABASE_URL=your_database_connection_string
- JWT_SECRET=your_jwt_secret

### Database Setup
- npx prisma migrate dev

### API Endpoints
#### Auth
- POST /api/auth/register – Register a new user
- POST /api/auth/login – Login a user

#### Artists
- GET /api/artists – List all artists
- POST /api/artists – Add a new artist
- PUT /api/artists/:id – Update artist
- DELETE /api/artists/:id – Delete artist

#### Albums

- GET /api/albums – List all albums
- POST /api/albums – Add a new album
- PUT /api/albums/:id – Update album
- DELETE /api/albums/:id – Delete album

#### Songs

- GET /api/songs – List all songs

- POST /api/songs – Add a new song

- PUT /api/songs/:id – Update song

- DELETE /api/songs/:id – Delete song

#### Playlists

- GET /api/playlists – List all playlists

- POST /api/playlists – Create a playlist

- PUT /api/playlists/:id – Update playlist

- DELETE /api/playlists/:id – Delete playlist

