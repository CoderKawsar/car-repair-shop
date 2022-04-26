import React from "react";
import { Link, useParams } from "react-router-dom";
import useServiceDetails from "../../hooks/useSeviceDetails";

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const [service] = useServiceDetails(serviceId);

  return (
    <div className="text-center">
      <h2>You are about to book: {service.name}</h2>
      <Link to={`/checkout/${serviceId}`} className="btn btn-info">
        Checkout
      </Link>
    </div>
  );
};

export default ServiceDetails;
