import { HomeScreen } from "../screens/home/home";
import { AutorScreen } from "../screens/autor/autor";
import { GeneroScreen } from "../screens/genero/genero";
import { LibroScreen } from "../screens/libro/libro";
import { AutorFormScreen } from "../screens/autor/autor-form";
import { createStackNavigator } from "@react-navigation/stack";
import { Alert, TouchableOpacity, Text, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext"
import { useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const Stack = createStackNavigator();

export const AppStack = () => {
  const { signOut } = useContext(AuthContext);

  const handleSignOut = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro que deseas salir?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Salir",
          style: "destructive",
          onPress: signOut
        }
      ]
    );
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6366f1',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Biblioteca",
          headerRight: () => (
            <TouchableOpacity
              onPress={handleSignOut}
              style={styles.logoutButton}
              activeOpacity={0.7}
            >
              <Ionicons name="log-out-outline" size={22} color="#fff" />
              <Text style={styles.logoutText}>Salir</Text>
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen
        name="Autor"
        component={AutorScreen}
        options={{
          title: "Autores"
        }}
      />
      <Stack.Screen
        name="Genero"
        component={GeneroScreen}
        options={{
          title: "Generos"
        }}
      />
      <Stack.Screen
        name="Libro"
        component={LibroScreen}
        options={{
          title: "Libros"
        }}
      />
      <Stack.Screen
        name="AutorForm"
        component={AutorFormScreen}
        options={{ title: "Autor" }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 12,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
});