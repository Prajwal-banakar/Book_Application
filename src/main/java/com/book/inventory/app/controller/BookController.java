//package com.book.inventory.app.controller;
//
//public class BookController {
//}

package com.book.inventory.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.book.inventory.app.domain.Book;
import com.book.inventory.app.repo.BookRepo;

/**
 * Controller class responsible for handling HTTP requests related to books.
 */
@Controller
public class BookController {

    @Autowired
    private BookRepo repo;

    /**
     * Displays the index page.
     */
    @GetMapping("/")
    public String showIndex(Model model) {
        model.addAttribute("book", new Book());
        return "index";
    }

    /**
     * Displays the page for adding a new book.
     */
    @GetMapping("/addBook")
    public String showaddBook(Model model) {
        model.addAttribute("book", new Book());
        return "addbook";
    }

    /**
     * Displays the page for updating a book.
     */
    @GetMapping("/updateBook")
    public String showupdateBook(Model model) {
        model.addAttribute("book", new Book());
        return "updatebook";
    }

    /**
     * Displays the page for deleting a book.
     */
    @GetMapping("/deleteBook")
    public String showdeleteBook(Model model) {
        model.addAttribute("book", new Book());
        return "deletebook";
    }

    /**
     * Displays the page for searching a book.
     */
    @GetMapping("/search")
    public String searchBook(Model model) {
        model.addAttribute("book", new Book());
        return "search";
    }

    /**
     * Displays information about the books.
     */
    @GetMapping("/info")
    public String getInfo(Model model) {
        long totalBooks = repo.count();
        double totalBooksPrice = repo.findAll().stream().mapToDouble(Book::getPrice).sum();
        long totalAuthors = repo.findAll().stream().map(Book::getAuthor).distinct().count();

        // Fetch all books from the repository
        List<Book> books = repo.findAll();

        model.addAttribute("totalBooks", totalBooks);
        model.addAttribute("totalBooksPrice", totalBooksPrice);
        model.addAttribute("totalAuthors", totalAuthors);
        model.addAttribute("books", books);

        return "info";
    }

    /**
     * Saves a new book to the database.
     */
    @PostMapping("/addBook")
    public String saveBook(@ModelAttribute Book book, Model model) {
        try {
            repo.save(book);
            model.addAttribute("message", "Book added successfully.");
        } catch (Exception e) {
            model.addAttribute("error", "Failed to add book: " + e.getMessage());
        }
        return "addBook";
    }

    /**
     * Searches for a book in the database.
     */
    @PostMapping("/search")
    public String searchBook(@ModelAttribute Book book, Model model) {
        Book foundBook = repo.findByBookid(book.getBookid());

        if (foundBook != null) {
            model.addAttribute("book", foundBook);
            model.addAttribute("errorMessage", null);
        } else {
            model.addAttribute("book", null);
            model.addAttribute("errorMessage", "Book not found!");
        }

        return "search";
    }

    /**
     * Deletes a book from the database.
     */
    @PostMapping("/deleteBook")
    public String deleteBook(@ModelAttribute Book book, Model model) {
        String bookId = book.getBookid();
        Book deleteBook = repo.findByBookid(bookId);

        if (deleteBook != null) {
            repo.delete(deleteBook);
            model.addAttribute("book", deleteBook);
            model.addAttribute("successMessage", "Book Deleted Successfully");
        } else {
            model.addAttribute("book", null);
            model.addAttribute("errorMessage", "Book not found!");
        }
        return "deletebook";
    }
}
