import { useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig";
import {
  getDocs,
  collection,
  doc
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css"
import { Button } from "react-bootstrap";

export const Home = () => {
  const [bookList, setBookList] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const booksCollectionRef = collection(db, "books");

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const getBooksList = async () => {
    try {
      const data = await getDocs(booksCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBookList(filteredData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBooksList();
  }, []);

  // const onSubmitBook = async () => {
  //   try {
  //     await addDoc(booksCollectionRef, {
  //       title: newBookTitle,
  //       author: newBookAuthor,
  //       yearPublished: newBookYearPublished,
  //       language: newBookLanguage,
  //       publisher: newBookPublisher,
  //       userId: auth?.currentUser?.uid,
  //     });
  //     getBooksList();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div>
      
      {/* <div>
        <input
          placeholder="Title"
          onChange={(e) => setNewBookTitle(e.target.value)}
        />
        <input
          placeholder="Author"
          onChange={(e) => setNewBookAuthor(e.target.value)}
        />
        <input
          placeholder="Year Published"
          type="number"
          onChange={(e) => setNewBookYearPublished(Number(e.target.value))}
        />
        <input
          placeholder="Language"
          onChange={(e) => setNewBookLanguage(e.target.value)}
        />
        <input
          placeholder="Publisher"
          onChange={(e) => setNewBookPublisher(e.target.value)}
        />
        <button onClick={onSubmitBook}>Submit Book</button>
      </div> */}
      <Container>
        <h1 className="text-center mt-4">Available Books</h1>
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
                return search.toLowerCase() === ""
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
                  <td><Button onClick={() =>{window.open('mailto:'+ books.userEmail, '_blank', 'noopener')
                  }}>Contact</Button></td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
      <Button
        onClick={() => {
          navigate("/submit");
        }}
      >
        Submit Book
      </Button>
      <Button onClick={logout}> Logout </Button>
      
    </div>
  );
};
