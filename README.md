# Music Streaming API Backend
A fully functional music streaming API  built with **Node.js**, **Express**, **Prisma**, and **PostgreSQL**, following the **MVC architecture**. Includes **JWT authentication**, **role-based access**, and structured endpoints for **users, artists, albums, songs, and playlists**.

## 📂 Project Structure

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

- User registration and login with **hashed passwords** (`bcryptjs`)  
- JWT-based authentication and **role-based access** (`USER`, `ADMIN`)  
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

### **Installation**
+ Create a .env file in the root
+Run migrations
+Run the server-npm run dev

