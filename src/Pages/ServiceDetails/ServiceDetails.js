import React from "react";
import { Link, useParams } from "react-router-dom";

const ServiceDetails = () => {
  const { serviceId } = useParams();
  return (
    <div className="text-center">
      <h2>Service Details {serviceId}</h2>
      <Link to="/checkout" className="btn btn-info">
        Checkout
      </Link>
    </div>
  );
};

export default ServiceDetails;
