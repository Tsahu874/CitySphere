import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 🏪 Vendor
  const [vendor, setVendor] = useState(null);
  const [vendorToken, setVendorToken] = useState(null);

  // 👤 User
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔁 Restore vendor session
    const savedVendor = localStorage.getItem("vendor");
    const savedVendorToken = localStorage.getItem("vendorToken");

    if (savedVendor && savedVendorToken) {
      setVendor(JSON.parse(savedVendor));
      setVendorToken(savedVendorToken);
    }

    // 🔁 Restore user session
    const savedUser = localStorage.getItem("user");
    const savedUserToken = localStorage.getItem("userToken");

    if (savedUser && savedUserToken) {
      setUser(JSON.parse(savedUser));
      setUserToken(savedUserToken);
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        // vendor
        vendor,
        setVendor,
        vendorToken,
        setVendorToken,

        // user
        user,
        setUser,
        userToken,
        setUserToken,

        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
