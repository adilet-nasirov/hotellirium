import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { useContext } from "react";
import { DataContext } from "../../lib/DataContext";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import React, { useState } from "react";
// import Link from "next/link";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
} from "@mui/material";
// import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";
let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};

export default function login() {
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
  //sign in with login password
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Provide a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      console.log("submitting...");
      setTimeout(() => {
        console.log("submited!!");
        setAuth(true);
        navigate(from, { replace: true });
      }, 2000);
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <main className="flex justify-center items-center">
      <div className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg min-w-96">
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
        <div>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Box
                component={motion.div}
                animate={{
                  transition: {
                    staggerChildren: 0.55,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                  component={motion.div}
                  initial={{ opacity: 0, y: 40 }}
                  animate={animate}
                >
                  <TextField
                    fullWidth
                    autoComplete="username"
                    type="email"
                    label="Email Address"
                    {...getFieldProps("email")}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  <TextField
                    fullWidth
                    autoComplete="current-password"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    {...getFieldProps("password")}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={animate}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ my: 2 }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...getFieldProps("remember")}
                          checked={values.remember}
                        />
                      }
                      label="Remember me"
                    />

                    <Link variant="subtitle2" to="#" underline="hover">
                      Forgot password?
                    </Link>
                  </Stack>

                  {/* <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    {isSubmitting ? "loading..." : "Login"}
                  </LoadingButton> */}
                </Box>
              </Box>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </main>
  );
}
