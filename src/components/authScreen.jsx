import { auth, googleProvider } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

export const Auth = () => {
  const [rendercheck, setrendercheck] = useState(null);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };
  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setrendercheck("jkhsafv");
        navigate("/home");
      }
    });
  }, [auth, navigate]);
  return (
    <div>
      {rendercheck ? (
        <div></div>
      ) : (
        <div>
          <Container>
            <Form>
              <InputGroup className="mb-3">
                <Form.Control
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@domain"
                  type="email"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  type="password"
                />
              </InputGroup>
              <Button className="mx-1" onClick={signIn}>Sign In</Button>
              <Button className="mx-1" onClick={signUp}>Sign Up</Button>

              <Button className="mx-1 " onClick={signInWithGoogle}>
                Sign In with Google
              </Button>
            </Form>
          </Container>
        </div>
      )}
    </div>
  );
};
