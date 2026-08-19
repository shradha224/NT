# Navya Agricultural Intelligence Platform

## System Requirements
- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)
- *That's it! No MongoDB or other database installation is required.*

---

## Quickstart (Newbie Manual)

This project is built to be 100% plug-and-play. Just run these two commands and the entire platform (both frontend and backend) will start up:

1. **Install everything:**
   ```bash
   npm install
   ```
   *(This automatically installs dependencies for both the frontend and backend folders.)*

2. **Start the app:**
   ```bash
   npm start
   ```
   *(This launches the backend API, the frontend React app, and the embedded offline database all at once!)*

You can now view the app at: **http://localhost:5173**

---

## Important Notes: How It Works

### The Database (Zero-Install Offline MongoDB)
You do not need to install MongoDB on your machine. When you run `npm start`, the backend uses a portable, embedded version of MongoDB (`mongodb-memory-server`). 
- On its first run, it automatically downloads the correct MongoDB binary for your operating system (Windows, Mac, or Linux) in the background.
- It is configured to save data persistently to the `backend/.mongo_data` directory. This means your data is fully preserved even after you restart the server.
- This ensures the application works fully offline in edge environments (like a local server at an aggregator center) without any manual database setup.

### Sync Manager
Because this platform acts as a "Local Edge Server", it is designed to work completely offline. 
- We built a `SyncManager` service (`backend/src/services/syncManager.js`) that runs in the background. 
- When an internet connection is available, it silently syncs the local database with the central cloud MongoDB (if configured), ensuring that data is never lost during offline periods.

### Mock IoT Data
The frontend currently uses decoupled mock data to simulate real-world IoT sensor readings (Temperature, Humidity, Ethylene/VOC, Light).
- All hardcoded UI data was extracted into a single file: `frontend/src/services/mockData.js`.
- This allows developers to easily swap out the mock data for actual hardware API calls later by simply updating the imports, without needing to rewrite any React UI components.

---

## Detailed Technical Overview

### Architecture
This repository contains a full-stack JavaScript application separated into two main workspaces:
- **`frontend/`**: A React application built with Vite. It contains dashboards for Aggregators and Farmers, as well as the public Quality Passport view.
- **`backend/`**: A Node.js/Express REST API that handles business logic, authentication, and database interactions using Mongoose.

### Start Script Details
The root `package.json` uses the `concurrently` package to manage multiple processes. When you run `npm start`:
1. It runs `npm run start:backend`, which navigates to the backend and starts the Express server.
2. It runs `npm run start:frontend`, which navigates to the frontend and starts the Vite development server.
3. Inside the backend, before listening on port 5000, `mongoWaker.js` creates an isolated MongoDB instance natively using the downloaded binaries.

### Folder Structure
- **`backend/src/models/`**: Mongoose schemas (e.g., User, Batch, QualityAssessment).
- **`backend/src/routes/`**: Express route handlers for the API endpoints.
- **`backend/src/utils/mongoWaker.js`**: The script responsible for booting the zero-install embedded MongoDB instance.
- **`frontend/src/pages/`**: React components organized by user roles (aggregator, farmer, public, common).
- **`frontend/src/services/mockData.js`**: Centralized JSON objects representing simulated IoT payloads.

### Environment Variables (.env)
If you need to configure Cloud Sync or JWT secrets, create a `.env` file inside the `backend/` directory. (Note: The `.env` file is safely ignored by git).
```env
PORT=5000
JWT_SECRET=your_jwt_secret_here
# Optional: Set this to sync local data to the cloud when online
CLOUD_MONGO_URI=mongodb+srv://... 
```
