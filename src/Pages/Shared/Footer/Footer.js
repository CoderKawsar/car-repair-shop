import React from "react";

const Footer = () => {
  const date = new Date();
  return (
    <footer className="text-center mt-5">
      <p>
        <small>Copyright &copy;{date.toDateString()}</small>
      </p>
    </footer>
  );
};

export default Footer;
