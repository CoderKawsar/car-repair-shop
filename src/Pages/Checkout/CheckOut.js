import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useServiceDetails from "../../hooks/useSeviceDetails";

const CheckOut = () => {
  const { serviceId } = useParams();
  const [service] = useServiceDetails(serviceId);
  const [user, setUser] = useState({
    name: "Akbar the great",
    address: "Tajmahal road",
    phone: "01711111111",
    email: "akbar@mom.taj",
  });

  const handleAdressChange = (e) => {
    const { address, ...rest } = user;
    const newAddress = e.target.value;
    const newUser = { newAddress, ...rest };
    setUser(newUser);
  };
  return (
    <div className="w-50 mx-auto">
      <h2 className="text-center">Checkout</h2>
      <h4>Please order/checkout: {service.name}</h4>
      <form>
        <input
          className="w-100 mb-2"
          type="text"
          name="name"
          value={user.name}
          placeholder="Your Name"
          id=""
        />
        <br />
        <input
          className="w-100 mb-2"
          type="email"
          name="email"
          value={user.email}
          placeholder="Your Email"
          id=""
        />
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          name="service"
          placeholder="Service"
          value={service.name}
          id=""
        />
        <br />
        <textarea
          className="w-100 mb-2"
          name="address"
          placeholder="Your Address"
          value={user.address}
          onChange={handleAdressChange}
          id=""
        />
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          name="phone"
          value={user.phone}
          placeholder="Phone Number"
          id=""
        />
        <br />
        <input type="submit" className="btn btn-primary" value="Place Order" />
      </form>
    </div>
  );
};

export default CheckOut;
