# Todo App

This is a Todo application built with React, TypeScript, Vite, and NestJS. The application allows users to register, login, create, edit, and manage tasks. Users can also view statistics about their completed tasks.

## Features

- User authentication (register, login, logout)
- Create, edit, and delete tasks
- Drag and drop tasks to change their status
- View statistics about completed tasks

## Technologies Used

- Frontend:

  - React
  - TypeScript
  - Vite
  - React Query
  - React Router
  - React Beautiful DnD
  - Tailwind CSS

- Backend:
  - NestJS
  - TypeORM
  - PostgreSQL

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

2. Install dependencies for the frontend:

```bash
cd todoapp
npm install
```

3. Install dependencies for the backend:

```bash
cd ../backend
npm install
```

### Configuration

1. Create a `.env` file in the `backend` directory and add the following environment variables:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/todoapp
JWT_SECRET=your_jwt_secret
```

2. Update the `ormconfig.json` file in the `backend` directory with your PostgreSQL configuration.

### Running the Application

1. Start the PostgreSQL server.

2. Run the backend:

```bash
cd backend
npm run start:dev
```

3. Run the frontend:

```bash
cd ../todoapp
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```
todo-app/
├── backend/                # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── tasks/          # Tasks module
│   │   ├── statistics/     # Statistics module
│   │   ├── main.ts         # Entry point
│   ├── .env                # Environment variables
│   ├── ormconfig.json      # TypeORM configuration
│   ├── package.json        # Backend dependencies
├── todoapp/                # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # Context providers
│   │   ├── hooks/          # Custom hooks
│   │   ├── routes/         # React Router routes
│   │   ├── types/          # TypeScript types
│   │   ├── App.tsx         # Main App component
│   ├── .env                # Environment variables
│   ├── package.json        # Frontend dependencies
```

## Usage

### Register

1. Navigate to the `/register` page.
2. Enter a username and password.
3. Click the "Register" button.

### Login

1. Navigate to the `/login` page.
2. Enter your username and password.
3. Click the "Login" button.

### Create a Task

1. Navigate to the `/task/create` page.
2. Enter the task details (title, description, status, deadline).
3. Click the "Create Task" button.

### Edit a Task

1. Navigate to the `/task/:id` page.
2. Update the task details.
3. Click the "Update Task" button.

### View Statistics

1. Navigate to the `/statistic` page.
2. View the number of completed tasks and the percentage of completed tasks.

## License

This project is licensed under the MIT License.
