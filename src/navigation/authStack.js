import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/login/login";
import { RegisterScreen } from "../screens/register/register";

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login", headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Registro de usuario", headerShown: false }}
      />
    </Stack.Navigator>
  );
};
