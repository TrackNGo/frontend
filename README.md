# Smart Public Transportation App - Frontend

A  Web App frontend for the Smart Public Transportation App, designed to enhance user experiences with real-time tracking, route information, and an intuitive UI for notifications, lost item reporting, and fare estimation.

## 📑 Table of Contents
- [Features](#features)
- [🚀 Tech Stack](#-tech-stack)
- [🏗️ Project Structure](#️-project-structure)
- [📦 Package Management](#-package-management)
- [🚦 Getting Started](#-getting-started)
- [🤝 Contributing](#-contributing)
- [Conclusion](#conclusion)

---

## Features

### User Features
- **Real-Time Tracking**: View live bus locations on a map.
- **Route Information**: Receive route suggestions by selecting origin and destination points.
- **Schedule & Estimated Times**: Access accurate bus schedules and estimated arrival times.
- **Fare Estimation**: Calculate fares for different routes.
- **Notifications**: Receive updates on delays, route changes, and announcements.
- **Lost and Found Reporting**: Report and view lost or found items with bus-specific details.
- **Feedback & Ratings**: Provide feedback and rate transport services.

### Conductor Features
- **Location Updates**: Update live location data to facilitate accurate tracking.
- **Lost and Found Management**: Monitor lost and found reports specific to assigned routes.
- **Passenger Notifications**: Send and receive notifications regarding changes or alerts on routes.

### Admin Features
- **Route Management**: Add, update, or delete routes.
- **Schedule Management**: Manage and update bus schedules.
- **Fare Management**: Adjust fare rates based on route and distance.
- **User & Conductor Activity Reports**: Monitor user activity, lost item claims, and feedback metrics.

## 🚀 Tech Stack

### Frontend
- **React**: UI framework.
- **Redux Query**: State management.
- **Material-UI**: Design components.
- **Axios**: API requests.
- **React Router**: Page navigation.
- **Leaflet**: Interactive maps for real-time tracking.

## 🏗️ Project Structure

```plaintext
src/
├── components/     
├── pages/         
├── redux/         
├── utils/         
└── App.js

```
---
## 📦 Package Management

### Adding Dependencies
To add a new package:
```sh
npm install [package-name]
```
### Updating Dependencies
To update all dependencies:
```sh
npm update

```
---

### 🚦 Getting Started
## Prerequisites
- Node.js: [Download here](#https://nodejs.org/).

---

### Setup Steps
1. Clone the repository:

    ```sh
    git clone https://github.com/TrackNGo/frontend.git
    ```

2. Navigate to the frontend directory and install packages:

    ```sh
    cd frontend
    npm install --force
    ```

<!-- 3. Create a `.env` file in the frontend directory similar to `.env.sample` and enter the required variables:

    ```env
    REACT_APP_BACKEND_URL=http://localhost:port
    ```

    **Note:** Replace `port` with the backend server port number. !-->
  

3. Start the client:

    ```sh
    npm run start
    ```

This command will start the server, and you can access the application at `http://localhost:3000`.


---
### 🤝 Contributing

Contribution Steps
- Fork the repository.
- Create a feature branch.
- Commit changes following the commit message convention.
- Push changes and create a Pull Request.

  
### Commit Message Convention
This project follows Conventional Commits.  
The Conventional Commits specification provides a way to create a consistent commit history, making it easier to automate release notes and versioning.  

A commit message must have the structure  
```sh 
<type>(<scope>): <description>.
```

- type: Describes the nature of the change (e.g., feat, fix, docs, style, refactor, test, chore).
- scope: An optional section specifying the part of the codebase affected (e.g., parser, button, api). This is usually in parentheses.
- description: A short, imperative mood description of what was done (e.g., "add new login validation").

### Types:
- feat: New feature  
- fix: Bug fix  
- docs: Documentation changes only  
- style: Changes that don’t affect meaning (e.g., white-space, formatting)  
- refactor: Code changes that neither add a feature nor fix a bug   
- test: Adding or modifying tests   
- chore: Updates to build process or auxiliary tools  

### Rules:
- Use lowercase for types and scopes.
- Keep descriptions short (under 50 characters if possible).
- Begin the description with a lowercase letter.
- Don’t end the description with a period.

### Breaking Changes:
Indicate breaking changes with a BREAKING CHANGE section in the footer or within the commit message if the change introduces incompatibility with the previous version.
- For more details, refer to the [Conventional Commits Specification](https://www.conventionalcommits.org).

### Conclusion
The frontend of the Smart Public Transportation App enhances public transport user experience with a focus on real-time updates, route planning, and ease of use.
  
