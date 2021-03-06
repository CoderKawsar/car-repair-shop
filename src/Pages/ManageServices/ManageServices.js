import React from "react";
import useServices from "../../hooks/useServices";

const ManageServices = () => {
  const [services, setServices] = useServices();
  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure to delete?");
    if (proceed) {
      const url = `https://ancient-cove-74889.herokuapp.com/service/${id}`;
      fetch(url, {
        method: "Delete",
      })
        .then((res) => res.json())
        .then((data) => {
          const remaining = services.filter((service) => service._id !== id);
          setServices(remaining);
          console.log(data);
        });
    }
  };
  return (
    <div className="w-50 mx-auto mt-2 mb-4">
      <h2 className="text-center">Manage Services</h2>
      {services.map((service) => (
        <div key={service._id}>
          <h5>
            {service.name}
            <button onClick={() => handleDelete(service._id)}>×</button>
          </h5>
        </div>
      ))}
    </div>
  );
};

export default ManageServices;
