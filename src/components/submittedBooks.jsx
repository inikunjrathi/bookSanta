import { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const SubmittedBooks = () => {
  const [bookList, setBookList] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookAuthor, setNewBookAuthor] = useState("");
  const [newBookYearPublished, setNewBookYearPublished] = useState(0);
  const [newBookLanguage, setNewBookLanguage] = useState("");
  const [newBookPublisher, setNewBookPublisher] = useState("");
  const booksCollectionRef = collection(db, "books");

  const getBooksList = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const q = query(booksCollectionRef, where("userId", "==", user.uid));
        const data = await getDocs(q);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setBookList(filteredData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmitBook = async () => {
    try {
      await addDoc(booksCollectionRef, {
        title: newBookTitle,
        author: newBookAuthor,
        yearPublished: newBookYearPublished,
        language: newBookLanguage,
        publisher: newBookPublisher,
        userId: auth?.currentUser?.uid,
        userEmail: auth?.currentUser?.email,
      });
      getBooksList();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBooksList();
  });
  const deleteBook = async (id) => {
    try {
      const bookDoc = doc(db, "books", id);
      await deleteDoc(bookDoc);
      getBooksList();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Container>
        <Button
          onClick={() => {
            navigate("/submit");
          }}
        >
          Go Back
        </Button>
        <h1 className="text-center mt-4">Submitted Books</h1>
        <Form>
          <InputGroup className="my-3">
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search available books"
            />
          </InputGroup>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Language</th>
              <th>Publisher</th>
              <th>Year Published</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookList
              .filter((books) => {
                return search.toLowerCase() === "" &&
                  books.userId === auth?.currentUser?.uid
                  ? books
                  : books.title.toLowerCase().includes(search);
              })
              .map((books) => (
                <tr key={books}>
                  <td>{books.title}</td>
                  <td>{books.author}</td>
                  <td>{books.language}</td>
                  <td>{books.publisher}</td>
                  <td>{books.yearPublished}</td>
                  <td>
                    <Button onClick={() => deleteBook(books.id)}>
                      Delete Book
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
      {/* <div>
        {bookList.map((books) => (
          <div>
            <div>
              <h2>{books.title}</h2>
              <p>{books.author}</p>
              <p>{books.language}</p>
              <p>{books.yearPublished}</p>
              <p>{books.publisher}</p>

              <button onClick={() => deleteBook(books.id)}>Delete Book</button>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};
