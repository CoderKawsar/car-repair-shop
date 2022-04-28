import React from "react";
import googleIcon from "../../../images/social/google.png";
import facebookIcon from "../../../images/social/facebook.png";
import githubIcon from "../../../images/social/github.png";
import auth from "../../../firebase.init";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useSignInWithGithub } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import useToken from "../../../hooks/useToken";

const SocialLogin = () => {
  const [signInWithGoogle, user, , error1] = useSignInWithGoogle(auth);
  const [signInWithGithub, user1, , error2] = useSignInWithGithub(auth);
  const [token] = useToken(user || user1);
  const navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  let loginError;
  if (error1 || error2) {
    loginError = (
      <div className="text-danger text-center">
        <p>Error: {error1?.message || error2?.message}</p>
      </div>
    );
  }

  if (token) {
    navigate(from, { replace: true });
  }

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <div style={{ height: "1px" }} className="w-50 bg-dark"></div>
        <p className="my-0 mx-3">or</p>
        <div style={{ height: "1px" }} className="w-50 bg-dark"></div>
      </div>
      {loginError}
      <div className="button-container">
        <button
          onClick={() => signInWithGoogle()}
          className="btn btn-info my-2 w-50 d-block mx-auto"
        >
          <img width="30" height="30" src={googleIcon} alt="" />
          <span className="px-2">Sign in with Google</span>
        </button>
        <button className="btn btn-info my-2 w-50 d-block mx-auto">
          <img width="30" height="30" src={facebookIcon} alt="" />
          <span className="px-2">Sign in with Facebook</span>
        </button>
        <button
          onClick={() => signInWithGithub()}
          className="btn btn-info my-2 w-50 d-block mx-auto"
        >
          <img width="30" height="30" src={githubIcon} alt="" />
          <span className="px-2">Sign in with Github</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
