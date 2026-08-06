import { useEffect, useState } from "react";

function App() {
  const [serverStatus, setServerStatus] = useState("Checking...");

  useEffect(() => {
    fetch("/api/health")
      .then((response) => response.json())
      .then((data) => {
        setServerStatus(data.status);
      })
      .catch((error) => {
        console.error("Error connecting to server:", error);
        setServerStatus("Unavailable");
      });
  }, []);

  return (
    <main className="container py-5">
      <h1>IT Asset Manager</h1>
      <p>Simple IT Asset Inventory Web Application</p>

      <div className="alert alert-success">
        Frontend application is running.
      </div>

      <div className="alert alert-info">
        Backend status: {serverStatus}
      </div>
    </main>
  );
}

export default App;