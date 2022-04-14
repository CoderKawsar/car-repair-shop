import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import SocialLogin from "./SocialLogin/SocialLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [signInWithEmailAndPassword, user, , error] =
    useSignInWithEmailAndPassword(auth);

  const [sendPasswordResetEmail, sending, errorSending] =
    useSendPasswordResetEmail(auth);

  let errorElement;
  if (error) {
    errorElement = (
      <div className="text-danger text-center">
        <p>Error: {error?.message || error?.message}</p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    signInWithEmailAndPassword(email, password);
    if (user) navigate(from, { replace: true });
  };

  const navigateToRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const resetPassword = async () => {
    const email = emailRef.current.value;
    if (email) {
      await sendPasswordResetEmail(email);
      toast("Password Reseting!");
    } else {
      toast("Please enter password");
    }
  };

  return (
    <div className="w-50 mx-auto mt-5">
      <h2 className="text-primary text-center">Please Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            ref={emailRef}
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            ref={passwordRef}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <p>
        New to Genius Car?
        <span className="ms-2 btn btn-info" onClick={navigateToRegister}>
          Register Now
        </span>
      </p>
      <p>
        Forgot Password?
        <span className="ms-2 btn btn-danger" onClick={resetPassword}>
          Reset Password
        </span>
      </p>
      {errorElement}
      <SocialLogin />
      <ToastContainer />
    </div>
  );
};

export default Login;
