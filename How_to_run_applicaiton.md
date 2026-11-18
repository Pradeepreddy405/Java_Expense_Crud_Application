# Expense Tracker Application

A full-stack CRUD application built using Java Spring Boot,
MySQL, HTML, CSS, JavaScript, Maven and Nginx.

## Technologies

- Frontend: HTML, CSS, JavaScript
- Backend: Java 21, Spring Boot
- Build Tool: Maven
- Database: MySQL
- Web Server: Nginx
- Deployment: AWS EC2

## Features

- Add expenses
- View expenses
- Update expenses
- Delete expenses
- Calculate total expenses
- Display transaction count

## REST API Endpoints

| Method | Endpoint | Operation |
|--------|----------|-----------|
| POST | /api/expenses | Create expense |
| GET | /api/expenses | Get all expenses |
| GET | /api/expenses/{id} | Get expense by ID |
| PUT | /api/expenses/{id} | Update expense |
| DELETE | /api/expenses/{id} | Delete expense |

## Database

Database name: expense_tracker

The application creates the expenses table automatically
when connected to MySQL using Hibernate.

## Backend Build

cd backend

mvn clean package

## Run Backend

mvn spring-boot:run

## Frontend

The frontend is served using Nginx.

Configure Nginx to serve the frontend directory and
proxy /api/ requests to http://127.0.0.1:8080.