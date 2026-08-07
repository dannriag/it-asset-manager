import { useState } from "react";
import Login from "./components/Login";
import AssetManager from "./components/AssetManager";

function App() {
  const [user, setUser] = useState(null);
  if (!user) {
    return (
      <Login
        onLogin={setUser}
      />
    );
  }
  return (
    <AssetManager
      user={user}
    />
  );
}

export default App;