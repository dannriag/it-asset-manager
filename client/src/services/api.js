const API_URL = "/api/assets";

// Obtener todos los assets
export async function getAssets() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Unable to retrieve assets.");
  }

  return await response.json();
}

// Crear un nuevo asset
export async function createAsset(asset) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(asset),
  });

  if (!response.ok) {
    throw new Error("Unable to create asset.");
  }

  return await response.json();
}