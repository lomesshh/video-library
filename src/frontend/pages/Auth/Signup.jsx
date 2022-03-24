import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authcontext";

const initialValues = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
};

const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length < 3) {
    errors.name = "Atleast 3 Character";
  }

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

  if (!values.cpassword) {
    errors.cpassword = "Required";
  } else if (values.cpassword !== values.password) {
    errors.cpassword = "Password not matched";
  }

  return errors;
};

const Signup = () => {
  const { handleSingup } = useAuth();

  const onSubmit = (values) => {
    handleSingup(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div className="login__outer signup__outer">
      <form className="login signup" onSubmit={formik.handleSubmit}>
        <h1 className="login__title">Sign Up</h1>
        <div className="login__fields">
          <p htmlFor="name">Name</p>
          <input
            type="text"
            placeholder="Enter name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          <br />
          {formik.touched.name && formik.errors.name ? (
            <span className="error__display">{formik.errors.name}</span>
          ) : null}

          <p htmlFor="email">Email</p>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <br />
          {formik.touched.email && formik.errors.email ? (
            <span className="error__display">{formik.errors.email}</span>
          ) : null}

          <p htmlFor="password">Password</p>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <br />
          {formik.touched.password && formik.errors.password ? (
            <span className="error__display">{formik.errors.password}</span>
          ) : null}

          <p htmlFor="cpassword">Confirm Password</p>
          <input
            type="password"
            placeholder="Re-enter password"
            name="cpassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cpassword}
          />
          <br />
          {formik.touched.cpassword && formik.errors.cpassword ? (
            <span className="error__display">{formik.errors.cpassword}</span>
          ) : null}
        </div>
        <button className="login__button" type="submit">
          Sign Up
        </button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
