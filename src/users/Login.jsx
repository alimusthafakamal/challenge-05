// import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import GoogleLogin from "./GoogleLogin";
import { Row, Col } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/"); // Redirect to the dashboard if a token is found
    }
  });

  const loginHandler = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append('email', email);
    // formData.append('password', password);

    try {
      const response = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      // Check if the login was successful
      if (response.status === 200) {
        // You may need to adjust this status code
        localStorage.setItem("token", response.data.token);
        navigate("/", { replace: true }); // Corrected route to 'dashboard'
      }

      const { token } = response.data.data;

      localStorage.setItem("token", token);
    } catch (error) {
      // Handle validation errors
      if (error.response && error.response.data) {
        setValidation(error.response.data);
      }
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <div
      className="container"
      style={{ marginTop: "120px", marginBottom: "48px" }}
    >
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              <h4 className="fw-bold">LOGIN</h4>
              <hr />
              {validation.message && (
                <div className="alert alert-danger">{validation.message}</div>
              )}
              <form onSubmit={loginHandler}>
                <div className="mb-3">
                  <label className="form-label">ALAMAT EMAIL</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan Alamat Email"
                  />
                </div>
                {validation.email && (
                  <div className="alert alert-danger">
                    {validation.email[0]}
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label">PASSWORD</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan Password"
                  />
                </div>
                {validation.password && (
                  <div className="alert alert-danger">
                    {validation.password[0]}
                  </div>
                )}

                <button type="submit" className="btn btn-danger">
                  LOGIN
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ marginLeft: "4px" }}
                  onClick={goToRegister}
                >
                  REGISTER
                </button>
                <hr />
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ marginLeft: "4px" }}
                  onClick={goBack}
                >
                  BACK
                </button>
                <button className="col-md-12">
                  <GoogleLogin buttonText="Login With GOOGLE"></GoogleLogin>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
