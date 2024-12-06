# Clone IMDb Web Development
## 📖 Project Overview
This project is a clone of the IMDb website, created for learning and showcasing web development skills. It includes features like user authentication, movie database browsing, and ratings.

## 🛠️ Tech Stack
Frontend: React.js
Backend: Node.js with Express.js
Database: Prisma (ORM) with PostgreSQL
Containerization: Docker

## 📂 Project Structure

#### ├── node_modules/         # Dependencies
#### ├── prisma/               # Database schema and migrations
#### ├── public/               # Public assets like images
#### ├── src/                  # Application source code
#### ├── tests/                # Unit and integration tests
#### ├── .env                  # Environment variables
#### ├── Dockerfile            # Docker configuration
#### ├── package.json          # Project metadata and scripts
#### └── README.md             # Project documentation

## ⚙️ Features
#### Authentication: Login and Register users using email.
#### Movie Browsing: View movie details and user reviews.
#### Responsive Design: Ensures usability across devices.
#### API Integration: Backend handles requests for movie data and user actions.

## 🚀 Getting Started
### Prerequisites
#### Node.js and npm
#### Docker (optional for containerized deployment)

## Setup
#### Clone the repository:
git clone https://github.com/your-username/clone-imdb-webdev.git
cd clone-imdb-webdev

#### Install dependencies:
npm install
#### Configure .env:
Add your database connection and other configurations.
#### Run Prisma migrations:
npx prisma migrate dev

#### Start the development server:
npm start
Open the app in your browser at http://localhost:3000.

#### Running with Docker
Build the Docker image:

docker build -t clone-imdb-webdev .
#### Run the container:
docker run -p 3000:3000 clone-imdb-webdev

## Screanshot
### Home Page
![Home Page](https://github.com/user-attachments/assets/84a49206-3cc7-41fb-ab03-f0aea9b94340)

### Login Page
![Login Page](https://github.com/user-attachments/assets/e10f7dbb-d446-4b19-99a9-5b3dd2ef3a01)

### Database
![Database](https://github.com/user-attachments/assets/a5ec894d-7d7a-47e2-a655-1182323bfe04)


