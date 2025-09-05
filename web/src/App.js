import React, { useState, useEffect } from "react";

function App() {
  const [vendors, setVendors] = useState([]);

  // fetch data from backend
  useEffect(() => {
    fetch("http://localhost:5000/vendors")
      .then((res) => res.json())
      .then((data) => setVendors(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>CitySphere – Welcome</h1>
      <h2>Available Vendors</h2>
      <ul>
        {vendors.map((vendor) => (
          <li key={vendor.id}>
            <strong>{vendor.name}</strong> – {vendor.category} ({vendor.address})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
