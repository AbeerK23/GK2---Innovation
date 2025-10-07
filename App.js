import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Dine eksisterende skærme
import HomeScreen from "./screens/HomeScreen";
import OffersScreen from "./screens/OffersScreen";
import InfoScreen from "./screens/InfoScreen";
import Authentication from "./screens/Authentication";
import ProfileScreen from "./screens/ProfileScreen";

// Firebase auth
import { auth } from "./database/database";
import { onAuthStateChanged } from "firebase/auth";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  // Lyt efter login/logud
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, []);

  return (
    <NavigationContainer>
      {user ? (
        // Appen når man ER logget ind
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "MadRedder" }} />
          <Stack.Screen name="Offers" component={OffersScreen} options={{ title: "Tilbud" }} />
          <Stack.Screen name="Info" component={InfoScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Min profil" }} />
        </Stack.Navigator>
      ) : (
        // Auth-flow når man IKKE er logget ind (Login/Signup)
        <Stack.Navigator>
          <Stack.Screen name="Auth" component={Authentication} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
