# lottery-game

A full-stack lottery game application that is built using MERN stack for the assignment, very cool and fun stuck do check it out.

## Project Structure

- **backend/**
  - **index.js** – Entry point for the backend server.
  - **controller/gameController.js** – Contains the game logic and controller functions.
  - **db/connect.js** – Handles database connections.
  - **models/userModel.js** – Defines the user data model.
  - **routes/gameRouter.js** – API endpoints for game-related operations.
  - **utils/logger.js** – Logging utilities.
  - **.env / .env.example** – Environment variables configuration.

- **frontend/**
  - Built with Next.js.
  - **app/page.tsx** – Main page component.
  - **app/layout.tsx** – Root layout for server and client components.
  - Other folders include components, hooks, and styles.
  - Config files: [next.config.ts](frontend/next.config.ts), [tsconfig.json](frontend/tsconfig.json), etc.

## Getting Started

### Prerequisites

- Node.js v14 or higher
- Package manager (npm, yarn, or pnpm)

### Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/mohit-nagaraj/lottery-game
   cd lottery-game
   ```

2. **Install Dependencies**
    - backend
        ```sh
        cd backend
        npm install
        ```
    - frontend
        ```sh
        cd ../frontend
        npm install
        ```

### Configuration
- Backend:
  Create a .env file in the backend directory with the necessary environment variables (refer to backend/.env.example).

- Frontend:
  Adjust any Next.js configuration in next.config.ts if needed.

### Running the Application
- Backend:
    ```sh
    cd backend
    npm start
    ```
    The backend server will start at http://localhost:5000.

- Frontend:
    ```sh
    cd frontend
    npm run dev
    ```
    Open http://localhost:3000 to view the frontend.

### Contributing
Contributions are welcome! Please open issues or submit pull requests to improve the project.

### License
This project is licensed under the MIT License.