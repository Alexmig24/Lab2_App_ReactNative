import { useEffect, useState, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "./src/navigation/appStack.js";
import { AuthStack } from "./src/navigation/authStack";
import { getToken, saveToken, removeToken } from "./src/services/auth.js";
import { AuthContext } from "./src/context/AuthContext";

export default function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const t = await getToken();
        setToken(t);
      } catch (error) {
        console.log("Error getToken:", error);
        setToken(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const auth = useMemo(
    () => ({
      token,
      signIn: async (newToken) => {
        await saveToken(newToken);
        setToken(newToken);
      },
      signOut: async () => {
        await removeToken();
        setToken(null);
      },
    }),
    [token],
  );

  if (loading) return null;

  return (
    <AuthContext.Provider value={auth}>
      <NavigationContainer>
        {token ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}