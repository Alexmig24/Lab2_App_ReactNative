import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./src/pantallas/home/home";
import { AutorScreen } from "./src/pantallas/autor/autor";
import { LibroScreen } from "./src/pantallas/libro/libro";
import { GeneroScreen } from "./src/pantallas/genero/genero";
import { AutorFormScreen } from "./src/pantallas/autor/autor-form";
import { LibroFormScreen } from "./src/pantallas/libro/libro-form";
import { GeneroFormScreen } from "./src/pantallas/genero/genero-form";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{title:"Inicio"}} />
        <Stack.Screen name="Autor" component={AutorScreen} />
        <Stack.Screen name="Libro" component={LibroScreen} />
        <Stack.Screen name="Genero" component={GeneroScreen} />
        <Stack.Screen name="AutorForm" component={AutorFormScreen} options={{title:"Crear Autor"}}/>
        <Stack.Screen name="LibroForm" component={LibroFormScreen} options={{title:"Crear Libro"}}/>
        <Stack.Screen name="GeneroFormScreen" component={GeneroFormScreen} options={{title:"Crear Género"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}