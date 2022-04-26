import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import PageNotFound from "./Pages/NotFound/NotFound";
import "./App.css";
import Header from "./Pages/Shared/Header/Header";
import Footer from "./Pages/Shared/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import ServiceDetails from "./Pages/ServiceDetails/ServiceDetails";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Login/Register/Register";
import CheckOut from "./Pages/Checkout/CheckOut";
import RequireAuth from "./Pages/Login/RequireAuth/RequireAuth";
import AddService from "./Pages/AddService/AddService";
import ManageServices from "./Pages/ManageServices/ManageServices";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service/:serviceId" element={<ServiceDetails />} />
        <Route
          path="/checkout/:serviceId"
          element={
            <RequireAuth>
              <CheckOut />
            </RequireAuth>
          }
        />
        <Route
          path="/add-service"
          element={
            <RequireAuth>
              <AddService />
            </RequireAuth>
          }
        />
        <Route
          path="/manage-services"
          element={
            <RequireAuth>
              <ManageServices />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
