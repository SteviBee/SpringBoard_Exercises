process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
const db = require("../db");
const Book = require("../models/book");
const ExpressError = require("../expressError");
const jsonschema = require("jsonschema");

// isbn of sample book outside of tests so we can use it
let book_isbn;

// Add test data:
beforeEach(async function () {
  
    let testBook = await Book.create({
        isbn: "0691161518",
        amazon_url: "http://a.co/eobPtX2",
        author: "Matthew Lane",
        language: "english",
        pages: 264,
        publisher: "Princeton University Press",
        title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
        year: 2017
    });

    book_isbn = testBook.isbn
  });


describe("GET /books/", function () {
    test("gets all books", async function () {
        let resp = await request(app).get("/books")

        const books = resp.body.books
        expect(books).toHaveLength(1);
        expect(books[0]).toHaveProperty("isbn");
        expect(books[0]).toHaveProperty("amazon_url");        

    })
})
describe("GET /books/:id", function () {
    test("gets one books", async function () {
        let resp = await request(app).get(`/books/${book_isbn}`)

        const book = resp.body.book
        console.log('asdfa', book)
        expect(resp.body.book).toHaveProperty("isbn");
        expect(book.isbn).toBe(book_isbn)   
    })
        
    test("resp with 404 if no book found", async function () {
        const resp = await request(app).get(`/books/2398428398549385938573945`)
        expect(resp.statusCode).toBe(404)
    })

})
describe("/** POST /   bookData => {book: newBook}  */", function () {
    test("add new book", async function () {
        let resp = await request(app)
        .post("/books")
        .send({
            isbn: '32794782',
            amazon_url: "https://taco.com",
            author: "mctest",
            language: "english",
            pages: 1000,
            publisher: "yeah right",
            title: "amazing times",
            year: 2000
          });
        expect(resp.statusCode).toBe(201)
        expect(resp.body.book).toHaveProperty("isbn");     
    })

    test("Prevents creating book without required title", async function () {
        const response = await request(app)
            .post(`/books`)
            .send({year: 2000});
        expect(response.statusCode).toBe(400);
      });    
})

// 4/20/22 - test not working. Need to debug
describe("PUT /books/:id", function () {
    test("Updates a single book", async function () {
      const response = await request(app)
          .put(`/books/${book_isbn}`)
          .send({
            isbn: "32794782",
            amazon_url: "https://taco.com",
            author: "mctest",
            language: "english",
            pages: 1000,
            publisher: "yeah right",
            title: "UPDATED BOOK",
            year: 2000
          });
      expect(response.body.book).toHaveProperty("isbn");
      expect(response.body.book.title).toBe("UPDATED BOOK");
    });
  
    test("Prevents a bad book update", async function () {
      const response = await request(app)
          .put(`/books/${book_isbn}`)
          .send({
            isbn: "32794782",
            badField: "DO NOT ADD ME!",
            amazon_url: "https://taco.com",
            author: "mctest",
            language: "english",
            pages: 1000,
            publisher: "yeah right",
            title: "UPDATED BOOK",
            year: 2000
          });
      expect(response.statusCode).toBe(400);
    });
  
    test("Responds 404 if can't find book in question", async function () {
      // delete book first
      await request(app)
          .delete(`/books/${book_isbn}`)
      const response = await request(app).delete(`/books/${book_isbn}`);
      expect(response.statusCode).toBe(404);
    });
  });
  describe("DELETE /books/:id", function () {
    test("Deletes a single a book", async function () {
      const response = await request(app)
          .delete(`/books/${book_isbn}`)
      expect(response.body).toEqual({message: "Book deleted"});
    });
  });

afterEach(async function () {
    await db.query("DELETE FROM BOOKS");
  });
  
  
afterAll(async function () {
await db.end()
});
  