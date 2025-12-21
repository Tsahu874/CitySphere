import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [vendor, setVendor] = useState(null);
  const [vendorToken, setVendorToken] = useState(null);

  // 🔄 Restore login on refresh
  useEffect(() => {
    const token = localStorage.getItem("vendorToken");
    const vendorData = localStorage.getItem("vendorData");

    if (token && vendorData) {
      setVendorToken(token);
      setVendor(JSON.parse(vendorData));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        vendor,
        setVendor,
        vendorToken,
        setVendorToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
