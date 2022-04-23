import React from "react";
import {
  useAuthState,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";

function RequireAuth({ children }) {
  const [user, loading] = useAuthState(auth);
  const [sendEmailVerification, sending, error] =
    useSendEmailVerification(auth);
  let location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (
    !user?.emailVerified &&
    user?.providerData[0]?.providerId === "password"
  ) {
    return (
      <div className="text-center">
        <p className="text-danger">Your email address is not verified</p>
        <p className="text-danger">Please verify your email first</p>
        <button
          className="btn btn-danger"
          onClick={async () => {
            await sendEmailVerification();
          }}
        >
          Verify Email
        </button>
      </div>
    );
  }

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
