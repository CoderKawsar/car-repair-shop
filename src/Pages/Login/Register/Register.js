import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const handleRegister = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(name, email, password);
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
          Placeholder="Your Password"
          name="password"
          id="password"
        />
        <br />
        <input type="submit" value="Register" />
        <br />
      </form>
      <p className="text-center">
        Already have an account?
        <Link to="/login" className="btn btn-info ms-2">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
