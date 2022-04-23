import React from "react";
import "./Service.css";
import { useNavigate } from "react-router-dom";

const Service = ({ service }) => {
  const { _id, name, img, description, price } = service;
  const navigate = useNavigate();
  const navigateToServiceDetail = (_id) => {
    navigate("/service/" + _id);
  };
  return (
    <div className="service">
      <img src={img} alt="" />
      <h3>{name}</h3>
      <p>Price: {price}</p>
      <p>{description}</p>
      <button onClick={() => navigateToServiceDetail(_id)}>
        Book this: {name}
      </button>
    </div>
  );
};

export default Service;
