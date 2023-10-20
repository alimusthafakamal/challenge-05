import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState({});
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      // Send data as JSON
      const response = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/register",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      // Check if registration was successful
      if (response.status === 201) {
        // Redirect to the login page
        navigate("/", { replace: true });
      }
    } catch (error) {
      // Handle validation errors
      if (error.response && error.response.data) {
        setValidation(error.response.data);
      }
    }
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
              <h4 className="fw-bold align-item-center">REGISTER</h4>
              <hr />
              <form onSubmit={registerHandler}>
                <div className="row">
                  <div className="col-md-9">
                    <div className="mb-3">
                      <label className="form-label text-primary">
                        NAMA LENGKAP
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Silahkan Masukkan Nama Lengkap"
                      />
                    </div>
                    {validation.name && (
                      <div className="alert alert-danger">
                        {validation.name[0]}
                      </div>
                    )}
                  </div>
                  <div className="col-md-9">
                    <div className="mb-3">
                      <label className="form-label text-primary">
                        ALAMAT EMAIL
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Silahkan Masukkan Alamat Email"
                      />
                    </div>
                    {validation.email && (
                      <div className="alert alert-danger">
                        {validation.email[0]}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-9">
                    <div className="mb-3">
                      <label className="form-label text-primary">
                        PASSWORD
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Silahkan Masukkan Password"
                      />
                    </div>
                    {validation.password && (
                      <div className="alert alert-danger">
                        {validation.password[0]}
                      </div>
                    )}
                  </div>
                </div>
                <button type="submit" className="btn btn-danger">
                  REGISTER
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={goBack}
                  style={{ marginLeft: "4px" }}
                >
                  BACK
                </button>
                <hr/>
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

export default Register;
