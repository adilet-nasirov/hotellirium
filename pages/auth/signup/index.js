import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { useContext } from "react";
import { DataContext } from "../../../lib/DataContext";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

import React, { useState } from "react";

import LoginForm from "../../../components/LoginForm";
import SignupForm from "../../../components/SignupForm";

export default function Signup() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [state, dispatch] = useContext(DataContext);
  //Sign in with google
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      dispatch({ type: "user_login", payload: result.user });
      route.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  // sign in with facebook
  const fbProvider = new FacebookAuthProvider();
  const FacebookProvider = async () => {
    try {
      const result = await signInWithPopup(auth, fbProvider);
      const credantial = await FacebookAuthProvider.credentialFromResult(
        result
      );
      const token = credantial.accessToken;
      let photoUrl = result.user.photoURL + "?height=500&access_token=" + token;
      await updateProfile(auth.currentUser, { photoURL: photoUrl });
      route.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user) {
      route.push("/");
    } else {
      console.log("login");
    }
  }, [user]);

  return (
    <main className="flex justify-center">
      <div className="shadow-[0px_6px_34px_5px_#9ae6b4] mt-10 p-10 text-gray-700 rounded-lg  md:w-1/3 w-96 ">
        <h2 className="text-3xl font-medium">Join today</h2>
        <div className="py-4">
          <h3 className="py-4">Sign in with one of the providers</h3>
          <div className="flex flex-col gap-4">
            <button
              onClick={GoogleLogin}
              className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2 "
            >
              <FcGoogle className="text-2xl" />
              Sign in with Google
            </button>
            <button
              className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2 "
              onClick={FacebookProvider}
            >
              <AiFillFacebook className="text-2xl text-blue-300" />
              Sign in with Facebook
            </button>
          </div>
          <p className="text-center pt-2">- OR -</p>
        </div>
        <SignupForm />
      </div>
    </main>
  );
}
