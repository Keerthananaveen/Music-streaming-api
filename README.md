# Music Streaming API Backend
A fully functional music streaming API  built with **Node.js**, **Express**, **Prisma**, and **PostgreSQL**, following the **MVC architecture**. Includes **JWT authentication**, **role-based access**, and structured endpoints for **users, artists, albums, songs, and playlists**.

## **Table of Contents**

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Seeding Admin User](#seeding-admin-user)
- [Running the App](#running-the-app)
- [API Endpoints](#api-endpoints)
- [Testing in Postman](#testing-in-postman)

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

