import { useEffect, useState } from "react";

function App() {
  const [serverStatus, setServerStatus] = useState("Checking...");
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Backend Health Check
    fetch("/api/health")
      .then((response) => response.json())
      .then((data) => {
        setServerStatus(data.status);
      })
      .catch(() => {
        setServerStatus("Unavailable");
      });

    // Load Assets
    fetch("/api/assets")
      .then((response) => response.json())
      .then((data) => {
        setAssets(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <main className="container py-5">

      <h1 className="mb-2">IT Asset Manager</h1>

      <p className="text-muted">
        Simple IT Asset Inventory Web Application
      </p>

      <div className="alert alert-success">
        Frontend application is running.
      </div>

      <div className="alert alert-info">
        Backend status: <strong>{serverStatus}</strong>
      </div>

      <hr />

      <h2 className="mb-3">IT Assets</h2>

      {loading ? (
        <p>Loading assets...</p>
      ) : (
        <table className="table table-striped table-bordered">

          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Asset Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Location</th>
            </tr>
          </thead>

          <tbody>

            {assets.map((asset) => (

              <tr key={asset.AssetId}>

                <td>{asset.AssetId}</td>

                <td>{asset.AssetName}</td>

                <td>{asset.Category}</td>

                <td>{asset.Status}</td>

                <td>{asset.Location}</td>

              </tr>

            ))}

          </tbody>

        </table>
      )}

    </main>
  );
}

export default App;