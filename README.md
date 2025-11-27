# Newyork Empire Academy Website

Laravel Backend + React Forntend + SQLite Database Project

## Project Structure

Backend/   → Laravel(PHP + SQLite)

Frontend/  → React


## Backend Installation 

**Terminal 1 – Backend**
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

cd frontend
npm install
npm run dev




