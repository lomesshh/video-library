import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authcontext";

const Login = () => {
  const { handleLogin } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      handleLogin(values);
    },
    validate: (values) => {
      let errors = {};

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
      ) {
        errors.email = "Invalid email format";
      }

      if (!values.password) {
        errors.password = "Required";
      }

      return errors;
    },
  });

  return (
    <div className="login__outer">
      <form className="login" onSubmit={formik.handleSubmit}>
        <h1 className="login__title">Log in</h1>
        <div className="login__fields">
          <p htmlFor="email">Email</p>
          <input
            type="email"
            placeholder="test : test@gmail.com"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          <br />
          {formik.touched.email && formik.errors.email ? (
            <span className="error__display">{formik.errors.email}</span>
          ) : null}
          <p htmlFor="password">Password</p>
          <input
            type="password"
            placeholder="test : test123"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          <br />
          {formik.touched.password && formik.errors.password ? (
            <span className="error__display">{formik.errors.password}</span>
          ) : null}
        </div>
        <button className="login__button" type="submit">
          Log in
        </button>
        <div className="login__remember">
          <input type="checkbox" />
          <span> Remember me</span>
        </div>
        <p>
          Don't have an account ?<Link to="/signup"> SignUp</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
