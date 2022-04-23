import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ServiceDetails = () => {
  const [service, setService] = useState({});
  const { serviceId } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/service/${serviceId}`)
      .then((res) => res.json())
      .then((data) => setService(data));
  }, [serviceId]);
  return (
    <div className="text-center">
      <h2>You are about to book: {service.name}</h2>
      <Link to="/checkout" className="btn btn-info">
        Checkout
      </Link>
    </div>
  );
};

export default ServiceDetails;
