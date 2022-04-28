import { useState, useEffect } from "react";

const useServiceDetails = (serviceId) => {
  const [service, setService] = useState({});

  useEffect(() => {
    fetch(`https://ancient-cove-74889.herokuapp.com/service/${serviceId}`)
      .then((res) => res.json())
      .then((data) => setService(data));
  }, [serviceId]);

  return [service, setService];
};

export default useServiceDetails;
