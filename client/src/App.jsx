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
  const [message, setMessage] = useState("");

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



  if (

  !newAsset.AssetName.trim() ||

  !newAsset.Category.trim() ||

  !newAsset.SerialNumber.trim() ||

  !newAsset.Status.trim() ||

  !newAsset.Location.trim()

) {

  alert("Please complete all fields.");

  return;

}







  try {

if (editingAssetId) {

    await updateAsset(editingAssetId, newAsset);

    setMessage("Asset updated successfully.");

    setTimeout(() => {

    setMessage("");

},3000);

}
else {

    await createAsset(newAsset);

    setMessage("Asset created successfully.");

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
    setMessage("Asset deleted successfully.");

    

    await loadAssets();

  } catch (error) {

    console.error(error);

    alert("Unable to delete asset.");

  }

}




  return (

    <>
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand mb-0 h1">
          IT Asset Manager
        </span>
        <span className="text-white">
          ITMD 504 Final Project
        </span>
      </div>
    </nav>

    <main className="container py-5">
      

      <h1 className="display-5">
        IT Asset Manager
      </h1>

      <p className="lead">
        Asset Inventory Management System
      </p>
      <p className="text-muted">
        Final Project • ITMD 504 Programming and Application Foundations
      </p>
      <p className="text-secondary">
         React • Express • Azure SQL • Azure App Service
      </p>

      <p className="text-secondary">
         Danny Riano
      </p>






      {
  message && (

    <div className="alert alert-success">

      {message}

    </div>

  )
}



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
  onClick={() => {
    setEditingAssetId(null);

    setNewAsset({
      AssetName: "",
      Category: "",
      SerialNumber: "",
      Status: "",
      Location: "",
    });

    setShowForm(true);
  }}
>
  + Add Asset
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
placeholder="Dell Latitude 7440"
value={newAsset.AssetName}
onChange={handleChange}
/>

</div>

<div className="col-md-6">

<label className="form-label">Category</label>

<select
className="form-control"
name="Category"
placeholder="Laptop"
value={newAsset.Category}
onChange={handleChange}
>
<option value="">
Select Category
</option>
<option>
Laptop
</option>
<option>
Desktop
</option>
<option>
Switch
</option>
<option>
Router
</option>
<option>
Firewall
</option>
<option>
Wireless
</option>
<option>
Printer
</option>
<option>
Monitor
</option>
</select>


</div>

<div className="col-md-6">

<label className="form-label">Serial Number</label>

<input
className="form-control"
name="SerialNumber"
placeholder="DL7440-001"
value={newAsset.SerialNumber}
onChange={handleChange}
/>

</div>

<div className="col-md-6">

<label className="form-label">Status</label>

<select
className="form-control"
name="Status"
placeholder="Available"
value={newAsset.Status}
onChange={handleChange}

>

<option value="">
Select Status
</option>
<option>
Available
</option>
<option>
Assigned
</option>
<option>
In Use
</option>
<option>
Maintenance
</option>
<option>
Installed
</option>
<option>
Retired
</option>
</select>



</div>

<div className="col-md-6">

<label className="form-label">Location</label>

<input
className="form-control"
name="Location"
placeholder="New York"
value={newAsset.Location}
onChange={handleChange}
/>

</div>









</div>

<div className="mt-4">

<div className="mt-4 d-flex gap-2">

  <button
    className="btn btn-success"
    onClick={handleSave}
  >

    {editingAssetId
      ? "Update Asset"
      : "Save Asset"}

  </button>

  <button
    className="btn btn-secondary"
    onClick={() => {

      setShowForm(false);

      setEditingAssetId(null);

      setNewAsset({
        AssetName: "",
        Category: "",
        SerialNumber: "",
        Status: "",
        Location: "",
      });

    }}
  >
    Cancel
  </button>

</div>

</div>

</div>

</div>

)}


      <h2 className="mb-3">IT Assets</h2>


      <p className="text-muted">
  Total Assets: <strong>{assets.length}</strong>
</p>



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

<footer
className="text-center mt-5 text-muted"
>
<hr />
<p>
© 2026 Illinois Institute of Technology
</p>
<p>
ITMD 504 Programming and Application Foundations
</p>
<p>
Built with React, Express, Azure SQL and Bootstrap
</p>
</footer>

    </main>
    </>
  );
}

export default App;