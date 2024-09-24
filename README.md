# DumpNotes

Welcome to **DumpNotes**! This project is my take on a simplified version of Google Keep, built using Spring Boot and React. The goal of this application is to allow users to create, manage, and organize their notes in a straightforward and user-friendly way.

## Features

- **User Registration and Authentication**: Users can create an account, log in, and manage their session securely.
- **Create, Read, Update, Delete (CRUD) Notes**: Once logged in, users can add new notes, edit existing ones, delete notes they no longer need, and view all their notes in one place.
- **Responsive Design**: The application is designed to be responsive, so it works well on both desktop and mobile devices.

## Technology Stack

### Backend:
- **Spring Boot**: Handles the server-side logic, including user authentication and note management. It also connects to the database to store user and note information.
- **Spring Security**: Secures the application by managing user authentication and protecting certain endpoints.
- **JPA/Hibernate**: Used for mapping Java objects to the MySQL database and simplifying database operations.

### Frontend:
- **React**: Provides the user interface for the application. Users can interact with the app to register, log in, and manage their notes.
- **Axios**: Used for making HTTP requests from the React frontend to the Spring Boot backend.

### Database:
- **MySQL**: Stores user information, notes, and any other data the application needs.

## Project Structure

Here's a quick overview of the project structure:

### Backend (Spring Boot):
- `src/main/java/com/dumpnotes/backend/`: Main package containing all the backend code.
  - `model/`: Contains the `User` and `Note` entity classes.
  - `repository/`: Contains interfaces like `UserRepository` and `NoteRepository` for database interactions.
  - `service/`: Contains the business logic for handling user registration, authentication, and note management.
  - `controller/`: Contains REST controllers that expose the API endpoints.
  - `security/`: Contains the Spring Security configuration.

### Frontend (React):
- `src/`: Contains all the React application code.
  - `components/`: Contains reusable React components.
    - `auth/`: Contains components related to authentication, like login and registration forms.
    - `notes/`: Contains components related to note management, such as note creation and display.
  - `services/`: Contains code for making API calls to the backend, e.g., `authService.js` for authentication-related requests.
  - `App.js`: The root component that ties together the various parts of the application.
  - `App.css`: Contains global styles for the application.
  - `Login.js`: The main component for handling user login, likely part of the authentication process.

### Database:
- **MySQL Database**: Contains two main tables:
  - `users`: Stores user credentials and roles.
  - `notes`: Stores notes linked to users.

## Setup Instructions

### Prerequisites
- **Java 11** or higher
- **Node.js** and **npm** (for the frontend)
- **MySQL** database set up

### How to Run

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/hemanta12/dumpnotes.git
   cd dumpnotes
2. **Backend Setup**:

*Navigate to the backend directory:*
```bash
cd backend
```
*Update application.properties with your MySQL database credentials.*
*Build and run the Spring Boot application:*
```bash
./mvnw spring-boot:run
```
3. ***Frontend Setup***:

*Navigate to the frontend directory:*
```bash
cd frontend
```
*Install dependencies and start the React app:*
```bash
npm install
npm start
```
4. **Access the Application**:

*The React app will be running at http://localhost:3000.*

*The Spring Boot backend will be running at http://localhost:8080.*

**Future Enhancements**

*Tagging and Labeling: Add the ability to tag and categorize notes.*

*Search Functionality: Implement search to quickly find specific notes.*

*User Profile: Create a user profile page for managing account details.*

**Contributing**

If you'd like to contribute to DumpNotes, feel free to fork the repository and submit a pull request. Any help to improve the project is welcome!

**License**
This project is open-source and available under the MIT License. Feel free to use it as you like!
