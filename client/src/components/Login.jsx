import { useState } from "react";

function Login({ onLogin }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        return;
      }
      onLogin(data.user);
    }
    catch {
      setError("Unable to connect to server.");
    }

  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-3">
                IT Asset Manager
              </h2>
              <p className="text-center text-muted">
                Asset Inventory Management System
              </p>
              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">
                    Username
                  </label>
                  <input
                    className="form-control"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary w-100"
                >
                  Login
                </button>
              </form>
              <hr />

              <div className="alert alert-danger py-2 mb-3" role="alert">
                <strong>Note:</strong> The first use may take a moment while the free Azure SQL Serverless database starts up. Please wait about 1 minute and try again if the login does not respond immediately.
              </div>






              <small className="text-muted">
                Demo credentials
                <br />
                Username: <strong>admin</strong>
                <br />
                Password: <strong>admin123</strong>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;