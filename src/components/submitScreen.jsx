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
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const Submit = () => {
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
            navigate("/home");
          }}
        >
          Go Back
        </Button>
        <Button
          onClick={() => {
            navigate("/submittedbooks");
          }}
        >
          Submitted Books
        </Button>
        <Form>
          <InputGroup>
            <Form.Control
              onChange={(e) => setNewBookTitle(e.target.value)}
              placeholder="Title"
            />
          </InputGroup>
          <InputGroup>
            <Form.Control
              onChange={(e) => setNewBookAuthor(e.target.value)}
              placeholder="Author"
            />
          </InputGroup>
          <InputGroup>
            <Form.Control
              onChange={(e) => setNewBookLanguage(e.target.value)}
              placeholder="Language"
            />
          </InputGroup>
          <InputGroup>
            <Form.Control
              onChange={(e) => setNewBookPublisher(e.target.value)}
              placeholder="Publisher"
            />
          </InputGroup>
          <InputGroup>
            <Form.Control
              onChange={(e) => setNewBookYearPublished(e.target.value)}
              placeholder="Year Published"
            />
          </InputGroup>{" "}
          <Button onClick={onSubmitBook}>Submit Book</Button>
        </Form>
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
