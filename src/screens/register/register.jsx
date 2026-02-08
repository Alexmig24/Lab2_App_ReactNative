import { useState, useContext } from "react";
import {
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import { Container } from "../../components/container/container";
import AntDesign from "@expo/vector-icons/AntDesign";
import { styles } from "./register.styles";
import { registerRequest, loginRequest } from "../../services/auth";
import { AuthContext } from "../../context/AuthContext";

export const RegisterScreen = ({ navigation }) => {
    const { signIn } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const visiblePassword = () => {
        setVisible(!visible);
    };

    const onRegister = async () => {
        if (!username || !password) {
            Alert.alert("Error", "Por favor completa todos los campos");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres");
            return;
        }

        setLoading(true);
        try {
            await registerRequest({ username, password });
            Alert.alert(
                "Registro exitoso",
                "Tu cuenta ha sido creada correctamente",
                [
                    {
                        text: "OK",
                        onPress: async () => {
                            try {
                                const token = await loginRequest({ username, password });
                                await signIn(token);
                            } catch (error) {
                                console.log("Error al iniciar sesión:", error);
                                navigation.navigate("Login");
                            }
                        }
                    }
                ]
            );
        } catch (error) {
            console.log("Error al registrar:", error);
            Alert.alert("Error", error.message || "No se pudo crear la cuenta");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Crear Cuenta</Text>
                    <Text style={styles.subtitle}>
                        Completa los datos para registrarte
                    </Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nombre de usuario</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Username"
                                placeholderTextColor="#999"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                                editable={!loading}
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Contraseña</Text>
                        <View style={styles.passwordWrapper}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="Contraseña (mínimo 6 caracteres)"
                                placeholderTextColor="#999"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!visible}
                                autoCapitalize="none"
                                editable={!loading}
                            />
                            <TouchableOpacity
                                onPress={visiblePassword}
                                style={styles.eyeButton}
                                disabled={loading}
                            >
                                <AntDesign
                                    name={!visible ? "eye" : "eyeo"}
                                    size={18}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.registerButton, loading && styles.registerButtonDisabled]}
                        onPress={onRegister}
                        disabled={loading}
                        activeOpacity={0.8}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.registerButtonText}>Crear Cuenta</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={styles.loginLink}>Inicia sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Container>
    );
};