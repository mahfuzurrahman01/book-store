# 📚 Book Store Website

Welcome to the **Book Store** project! This is a fully responsive web application built using **HTML**, **CSS**, and **Vanilla JavaScript**. The website provides a seamless user experience with interactive UI components and smooth transitions. 

## ✨ Features

- **Dynamic Book Listings**: Browse books with real-time filtering by title or genre.
- **Wishlist Management**: Users can add/remove books to/from their wishlist, with changes stored locally.
- **LocalStorage Integration**: All states and data (such as the book list and wishlist) are stored using **LocalStorage**, ensuring persistence even after refreshing the browser.
- **Search & Filter**: Users can search books by title and filter by genre, which dynamically updates the book list.

## 🚀 Technologies Used

- **HTML5**: For structuring the content.
- **CSS3**: Custom styling and animations, including responsive design for different screen sizes.
- **JavaScript (Vanilla)**: For dynamic functionality and local data management using LocalStorage.
- **LocalStorage**: Used to store and manage state locally (wishlist, current page, etc.) without the need for external databases or APIs.

## 🛠️ How It Works

- **LocalStorage as State Manager**: Every interaction on the website (such as adding books to the wishlist, pagination, etc.) is saved locally in the browser's LocalStorage. This ensures that user preferences and data remain persistent even after reloading the page.
- **Pagination**: Smooth pagination to browse through the book listings.

## 🎨 UI Design

The UI focuses on simplicity and accessibility. Buttons, dropdown menus, and search inputs are designed for a clean user experience, with hover animations for enhanced interaction.

## 📝 How to Use

1. **Clone this repository**:
    ```bash
    git clone https://github.com/mahfuzurrahman01/book-store-website.git
    ```

2. **Open the `index.html` file in your browser** to explore the full functionality of the Book Store.

## 📂 Project Structure

- **index.html**: The main entry point of the website.
- **SCRIPT Folder**
     - **custom.js**: All the functionality for managing the book list, wishlist, and other interactive elements.
     - **details.js**: All the functionality for each book details in this js file.
     - **wishlist.js**: All the functionality for wishlist in this js file.
- **details.html**: This will shown the book details for each book.
- **wishlist.html**: This will shown the book wishlisted books.
- **CSS folder**
     - **style.css**: Custom styles and responsive layout for home page and wishlist (As both is almost same).
     - **details.css**: Custom styles and responsive layout for details screen.
- **assets/**: Contains images and other assets used in the project.

## 👨‍💻 Author

**Mafuzur Rahman**  
Frontend Developer | GitHub: [@mahfuzurrahman01](https://github.com/mahfuzurrahman01)
