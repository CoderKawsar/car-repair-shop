import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useServiceDetails from "../../hooks/useSeviceDetails";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../src/firebase.init";
import axios from "axios";
import { toast } from "react-toastify";

const CheckOut = () => {
  const { serviceId } = useParams();
  const [service] = useServiceDetails(serviceId);
  const [user] = useAuthState(auth);

  // const [user, setUser] = useState({
  //   name: "Akbar the great",
  //   address: "Tajmahal road",
  //   phone: "01711111111",
  //   email: "akbar@mom.taj",
  // });

  // const handleAdressChange = (e) => {
  //   const { address, ...rest } = user;
  //   const newAddress = e.target.value;
  //   const newUser = { newAddress, ...rest };
  //   setUser(newUser);
  // };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const order = {
      serviceId: serviceId,
      name: user.displayName,
      email: user.email,
      address: e.target.address.value,
      phone: e.target.phone.value,
    };
    axios
      .post("http://localhost:5000/order", order)
      .then(function (response) {
        if (response.data.insertedId) {
          toast("Order is Placed!");
        }
        e.target.address.value = "";
        e.target.phone.value = "";
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="w-50 mx-auto">
      <h2 className="text-center">Checkout</h2>
      <h4>Please order/checkout: {service.name}</h4>
      <form onSubmit={handleOrderSubmit}>
        <input
          className="w-100 mb-2"
          type="text"
          name="name"
          value={user?.displayName}
          placeholder="Your Name"
          readOnly
        />
        <br />
        <input
          className="w-100 mb-2"
          type="email"
          name="email"
          value={user?.email}
          placeholder="Your Email"
          readOnly
          disabled
        />
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          name="service"
          placeholder="Service"
          value={service?.name}
          readOnly
        />
        <br />
        <textarea
          className="w-100 mb-2"
          name="address"
          placeholder="Your Address"
          autoComplete="nope"
        />
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          name="phone"
          placeholder="Phone Number"
          autoComplete="nope"
        />
        <br />
        <input type="submit" className="btn btn-primary" value="Place Order" />
      </form>
    </div>
  );
};

export default CheckOut;
