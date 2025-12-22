# Book Inventory System

A comprehensive Spring Boot application for managing a book inventory. This system allows users to add, search, delete, and view book information, as well as request new books. It features a secure authentication system with user registration and login capabilities.

## Features

*   **User Authentication**: Secure login and registration system using Spring Security.
*   **Add Book**: Add new books to the inventory with details like title, author, publisher, year, price, quantity, and language.
*   **Search Book**: Find books by their unique Book ID.
*   **Delete Book**: Remove books from the inventory using their Book ID.
*   **Book Info**: View a dashboard with statistics (Total Books, Total Value, Total Authors) and a list of all available books.
*   **Request Book**: Users can request specific books by providing the title, author, and their email address.
*   **Responsive Design**: A modern, responsive user interface built with Bootstrap and Thymeleaf.

## Technologies Used

*   **Backend**: Java, Spring Boot (Web, Data MongoDB, Security)
*   **Frontend**: HTML, CSS, JavaScript, Thymeleaf, Bootstrap 5
*   **Database**: MongoDB
*   **Build Tool**: Maven

## Getting Started

### Prerequisites

*   Java Development Kit (JDK) 21 or later
*   Maven
*   MongoDB installed and running locally or accessible via a connection string.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Prajwal-banakar/Book_Application
    cd Book_Application
    ```

2.  **Configure MongoDB:**
    Ensure your MongoDB instance is running. By default, Spring Boot will attempt to connect to `mongodb://localhost:27017/test`. You can configure this in `src/main/resources/application.properties` if needed.

3.  **Build the application:**
    ```bash
    mvn clean install
    ```

4.  **Run the application:**
    ```bash
    mvn spring-boot:run
    ```

### Usage

1.  Open your web browser and navigate to `http://localhost:8080`.
2.  You will be redirected to the **Login** page.
3.  If you don't have an account, click on **"Don't have an account? Register"** to create one.
4.  Once logged in, you can access all the features from the navigation bar:
    *   **Home**: Welcome page with quick links.
    *   **Add Book**: Form to add a new book.
    *   **Search**: Search for a book by ID.
    *   **Delete**: Delete a book by ID.
    *   **Info**: View inventory statistics and the full list of books.
    *   **Contact**: Request a book or find contact information.
    *   **Logout**: Securely log out of the application.

## Project Structure

*   `src/main/java/com/book/inventory/app`:
    *   `controller`: Handles web requests (`BookController`, `AuthController`).
    *   `domain`: Data models (`Book`, `BookRequest`, `User`).
    *   `repo`: MongoDB repositories (`BookRepo`, `BookRequestRepo`, `UserRepo`).
    *   `service`: Business logic (`CustomUserDetailsService`).
    *   `config`: Security configuration (`SecurityConfig`).
*   `src/main/resources/templates`: Thymeleaf HTML templates.
*   `src/main/resources/static`: Static assets (CSS, JS, images).

## Security

The application uses Spring Security for authentication and authorization.
*   **BCrypt** is used for password hashing.
*   **CSRF** protection is enabled.
*   Access to all pages (except login/register) requires authentication.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
