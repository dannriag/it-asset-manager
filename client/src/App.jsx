import { useEffect, useState } from "react";
import {
  getAssets,
  createAsset,
  updateAsset,
  deleteAsset,
} from "./services/api";

function App() {
  const [serverStatus, setServerStatus] = useState("Checking...");
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAssetId, setEditingAssetId] = useState(null);

  const [newAsset, setNewAsset] = useState({
    AssetName: "",
    Category: "",
    SerialNumber: "",
    Status: "",
    Location: "",
  });

  async function loadAssets() {
  try {
    const data = await getAssets();
    setAssets(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

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
    getAssets()
      .then((data) => {
        setAssets(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
    });
  }, []);
  
  function handleChange(event) {
  setNewAsset({
    ...newAsset,
    [event.target.name]: event.target.value,
  });
}

async function handleSave() {

  try {

    if (editingAssetId) {

      await updateAsset(
        editingAssetId,
        newAsset
      );

    } else {

      await createAsset(newAsset);

    }

    await loadAssets();

    setNewAsset({

      AssetName: "",

      Category: "",

      SerialNumber: "",

      Status: "",

      Location: "",

    });

    setEditingAssetId(null);

    setShowForm(false);

  } catch (error) {

    console.error(error);

    alert("Unable to save asset.");

  }

}

function handleEdit(asset) {

  setEditingAssetId(asset.AssetId);

  setNewAsset({

    AssetName: asset.AssetName,

    Category: asset.Category,

    SerialNumber: asset.SerialNumber,

    Status: asset.Status,

    Location: asset.Location,

  });

  setShowForm(true);

}




async function handleDelete(id) {

  const confirmed = window.confirm(
    "Are you sure you want to delete this asset?"
  );

  if (!confirmed) return;

  try {

    await deleteAsset(id);

    await loadAssets();

  } catch (error) {

    console.error(error);

    alert("Unable to delete asset.");

  }

}




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

      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Add Asset"}
        </button>
      </div>


      {showForm && (

<div className="card mb-4">

<div className="card-header">

<h4>

{editingAssetId
  ? "Edit Asset"
  : "Add New Asset"}

</h4>

</div>

<div className="card-body">

<div className="row g-3">

<div className="col-md-6">

<label className="form-label">Asset Name</label>

<input
className="form-control"
name="AssetName"
value={newAsset.AssetName}
onChange={handleChange}
/>

</div>

<div className="col-md-6">

<label className="form-label">Category</label>

<input
className="form-control"
name="Category"
value={newAsset.Category}
onChange={handleChange}
/>

</div>

<div className="col-md-6">

<label className="form-label">Serial Number</label>

<input
className="form-control"
name="SerialNumber"
value={newAsset.SerialNumber}
onChange={handleChange}
/>

</div>

<div className="col-md-6">

<label className="form-label">Status</label>

<input
className="form-control"
name="Status"
value={newAsset.Status}
onChange={handleChange}
/>

</div>

<div className="col-md-6">

<label className="form-label">Location</label>

<input
className="form-control"
name="Location"
value={newAsset.Location}
onChange={handleChange}
/>

</div>

</div>

<div className="mt-4">

<button className="btn btn-success" onClick={handleSave}>
{editingAssetId
  ? "Update Asset"
  : "Save Asset"}
</button>

</div>

</div>

</div>

)}


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
              <th>Actions</th>
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
                <td>

  <button
    className="btn btn-warning btn-sm me-2"
    onClick={() => handleEdit(asset)}
  >
    Edit
  </button>

  <button
    className="btn btn-danger btn-sm"
    onClick={() => handleDelete(asset.AssetId)}
  >
    Delete
  </button>

</td>

              </tr>

            ))}

          </tbody>

        </table>
      )}

    </main>
  );
}

export default App;