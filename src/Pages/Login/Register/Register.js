import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import auth from "../../../firebase.init";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();
  const [createUserWithEmailAndPassword, user, , error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  let errorElement;
  if (error) {
    errorElement = (
      <div className="text-danger text-center">
        <p>Error: {error?.message || error?.message}</p>
      </div>
    );
  }

  const handleRegister = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    // const agree = event.target.terms.value;
    // if(agree){
    //   createUserWithEmailAndPassword(email, password);
    // }
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
    navigate("/home");
  };
  return (
    <div>
      <h2 className="mt-5 text-center">Register</h2>
      <form onSubmit={handleRegister} className="register-form">
        <input type="text" placeholder="Your Name" name="name" id="name" />
        <br />
        <input type="email" placeholder="Your Email" name="email" id="email" />
        <br />
        <input
          type="password"
          placeholder="Your Password"
          name="password"
          id="password"
        />
        <br />
        <input
          onClick={() => setAgree(!agree)}
          type="checkbox"
          name="terms"
          id="terms"
        />
        {/* <label
          className={agree ? "ps-2 text-primary" : "ps-2 text-danger"}
          htmlFor="terms"
        > */}
        <label
          className={`ps-2 ${agree ? "text-primary" : "text-danger"}`}
          htmlFor="terms"
        >
          Accept terms and conditions
        </label>
        <br />
        {/* <input
          type="submit"
          className={`btn btn-primary mt-2 ${!agree && "disabled"}`}
          value="Register"
        /> */}
        <input
          disabled={!agree}
          type="submit"
          className="btn btn-primary mt-2"
          value="Register"
        />
        <br />
      </form>
      <p className="text-center">
        Already have an account?
        <Link to="/login" className="btn btn-info ms-2">
          Login
        </Link>
      </p>
      {errorElement}
      <SocialLogin />
    </div>
  );
};

export default Register;
