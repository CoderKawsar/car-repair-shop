import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import axiosPrivate from "../../api/axiosPrivate";
import auth from "../../firebase.init";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const userEmail = user.email;

  useEffect(() => {
    const url = `https://ancient-cove-74889.herokuapp.com/order?email=${userEmail}`;
    const getOrders = async () => {
      try {
        const { data } = await axiosPrivate.get(url);
        setOrders(data);
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          signOut(auth);
          navigate("/login");
        }
      }
    };
    getOrders();
  }, [userEmail, navigate]);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Orders{orders.length}</h2>
    </div>
  );
};

export default Orders;
