

# Job Portal Frontend

This is the frontend of the Job Portal application, designed to provide an intuitive interface for both job seekers and recruiters. The portal allows users to search for jobs, apply filters, and view job details, while also enabling employers to post job listings.

## Features

- **Job Search**: Search for jobs based on title, location, salary range, and job type.
- **Filters**: Apply various filters, including salary range, job type, location, and date posted.
- **Job Details**: View detailed information about a job posting, including salary, responsibilities, and required skills.
- **User Authentication**: Sign up, log in, and manage user authentication states.
- **Job Application**: Users can apply for jobs and track the application process.
- **Redux State Management**: Centralized state management with Redux, ensuring a smooth and responsive experience.
- **Axios Interceptor**: Used for handling API requests with automatic token management and error handling.

## Tech Stack

- **Next.js**: A React framework for building server-side rendered (SSR) React applications.
- **Redux**: A state management tool for JavaScript apps, enabling predictable state changes.
- **Axios**: A promise-based HTTP client for making requests to the backend API.
- **ShadCN**: A component library for building UI elements.
- **Tailwind CSS**: A utility-first CSS framework for designing fast and customizable user interfaces.
- **TypeScript**: A typed superset of JavaScript that enhances code quality and readability.

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **Yarn** or **npm**

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

3. Install the dependencies:

   If using npm:

   ```bash
   npm install
   ```

   Or if using yarn:

   ```bash
   yarn install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   Or with yarn:

   ```bash
   yarn dev
   ```

   The app will be available at `http://localhost:3000`.

### Redux with Axios Interceptor

- The frontend uses **Redux** for managing global state, and **Axios Interceptor** is integrated to handle API requests and responses, including token management for authentication.
- The interceptor automatically attaches the JWT token to API requests and manages any necessary retries for failed requests.
  
### Authentication Flow

- **Login**: Users can log in with their credentials, and the authentication token is saved in **localStorage**.
- **Registration**: Users can sign up by providing basic information like email, password, etc.
- **Authenticated Routes**: Certain pages require users to be logged in, and the JWT token is used to verify authentication.

### Components

- **Job Listings**: Displays a list of jobs fetched from the backend.
- **Job Filters**: Users can filter job listings based on different criteria such as salary range, job type, and location.
- **Job Card**: Displays individual job details.
- **Navigation Bar**: A responsive navbar with links to various sections of the job portal (Home, Find Jobs, Find Talent, etc.).
- **User Profile**: Displays the logged-in user’s profile and other user-specific information.

## API Integration

The frontend communicates with the backend API using Axios. The **Axios Interceptor** ensures that each request includes the user's JWT token for authentication, and handles errors by redirecting the user to the login page if the token is invalid or expired.



### Folder Structure

The project follows a modular folder structure to promote scalability and maintainability.



## Conclusion

This job portal frontend leverages modern technologies such as **Next.js**, **Redux**, and **Tailwind CSS** to provide a responsive and dynamic user experience. With **Axios Interceptors**, the app ensures secure API calls and smooth token management. The modular design and clear separation of concerns make the application easy to maintain and extend in the future.
