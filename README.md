# Support Ticket Management System

A full-stack Support Ticket Management System built using Next.js, TypeScript, ASP.NET Core Web API, Entity Framework Core, and SQL Server.

The application allows users to create, view, edit, search, filter, sort, paginate, and delete support tickets.

---

## Project Overview

The application follows this architecture:

Next.js Frontend  
↓  
ASP.NET Core Web API  
↓  
Service Layer  
↓  
Entity Framework Core  
↓  
SQL Server Database

The frontend communicates with the backend through REST APIs.

Authentication/JWT is not required for this project.

---

## Technologies Used

### Frontend
- Next.js
- TypeScript
- React
- Tailwind CSS

### Backend
- C#
- ASP.NET Core Web API
- Entity Framework Core
- Swagger / OpenAPI

### Database
- SQL Server
- Entity Framework Core

---

## Features

### Ticket Management

- View all tickets
- Create a new ticket
- View ticket details
- Edit a ticket
- Change ticket status
- Delete a ticket
- Search tickets
- Filter tickets
- Sort tickets
- Pagination

### Ticket Fields

- ID
- Title
- Description
- Customer Name
- Customer Email
- Priority
- Status
- Assigned To
- Created Date
- Updated Date

### Priority

- Low
- Medium
- High
- Critical

### Status

- Open
- In Progress
- Resolved
- Closed

---

## Dashboard

The application includes a dashboard with statistics fetched from the backend API.

Dashboard statistics include:

- Total Tickets
- Open
- In Progress
- Resolved
- Closed
- Critical

---

## Project Structure

```text
SupportTicketProject/
│
├── frontend/
│
├── SupportTicketAPI/
│   ├── Controllers/
│   ├── Services/
│   ├── DTOs/
│   ├── Models/
│   ├── Data/
│   ├── Migrations/
│   └── Program.cs
│
├── README.md
└── .gitignore