package com.book.inventory.app.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.book.inventory.app.domain.Book;

@Repository
public interface BookRepo extends MongoRepository<Book, String> {
    Book findByBookid(String bookid);

    void deleteByBookid(String bookid);
}
