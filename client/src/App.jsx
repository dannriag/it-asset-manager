import { useEffect, useState } from "react";

import Login from "./components/Login";
import AssetManager from "./components/AssetManager";

import { getSession } from "./services/api";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function checkSession() {
      const session = await getSession();
      if (session.authenticated) {
        setUser(session.user);
      }
      setLoading(false);
    }
    checkSession();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <p>Loading...</p>
      </div>
    );
  }

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
      setUser={setUser}
    />
  );
}

export default App;