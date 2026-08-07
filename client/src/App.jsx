import { useEffect, useState } from "react";
import {
  getAssets,
  createAsset,
  updateAsset,
  deleteAsset,
} from "./services/api";

import AssetManager from "./components/AssetManager";

function App() {
  return <AssetManager />;
}

export default App;