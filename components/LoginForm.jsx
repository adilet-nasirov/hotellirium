import React, { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
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

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const route = useRouter();
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
    onSubmit: (values) => {
      console.log("submitting...");
      setTimeout(() => {
        console.log("submited!!");
        const { email, password } = values;
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            console.log("Successfully signed in");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
      }, 1000);
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
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

                <Link
                  className="cursor-pointer"
                  variant="subtitle2"
                  to="#"
                  underline="hover"
                >
                  Forgot password?
                </Link>
              </Stack>

              {/* <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="outlined"
                loading={isSubmitting}
              >
                {isSubmitting ? "loading..." : "Login"}
              </LoadingButton> */}
            </Box>
            <button
              type="submit"
              className="w-full text-xl border-2 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Sign in
            </button>
          </Box>
        </Form>
      </FormikProvider>
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Don’t have an account?{" "}
        <Link
          className="cursor-pointer"
          variant="subtitle2"
          onClick={() => route.push("/auth/signup")}
        >
          Sign up
        </Link>
      </Typography>
    </div>
  );
};

export default LoginForm;
