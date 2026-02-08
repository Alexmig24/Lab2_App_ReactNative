import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Container } from "../../components/container/container.jsx";
import { ENDPOINTS } from "../../config/api";
import { styles } from "./genero-form.styles";

export const GeneroFormScreen = ({ navigation, route }) => {
    const params = route.params;

    const [nombre, setNombre] = useState(params?.nombre || "");
    const [descripcion, setDescripcion] = useState(params?.descripcion || "");
    const [id, setId] = useState(params?.id || null);

    const guardar = async () => {
        if (!nombre.trim() || !descripcion.trim()) {
            Alert.alert("Error", "Todos los campos son obligatorios");
            return;
        }

        const body = { nombre, descripcion };

        try {
            const metodo = id ? "PUT" : "POST";
            const url = id ? `${ENDPOINTS.GENERO}/${id}` : ENDPOINTS.GENERO;

            const res = await fetch(url, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!res.ok) throw new Error("Error al guardar");

            Alert.alert("Éxito", `Género ${id ? "actualizado" : "registrado"} correctamente`);
            navigation.goBack();

        } catch (error) {
            Alert.alert("Error", "No se pudo guardar el género");
        }
    };

    return (
        <Container>
            <View style={styles.header}>
                <Text style={styles.titulo}>
                    {id ? "Editar Género" : "Nuevo Género"}
                </Text>
            </View>

            <Text style={styles.label}>Nombre</Text>
            <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
            />

            <Text style={styles.label}>Descripción</Text>
            <TextInput
                style={styles.input}
                value={descripcion}
                onChangeText={setDescripcion}
            />

            <TouchableOpacity style={styles.botonGuardar} onPress={guardar}>
                <Text style={styles.textoBoton}>Guardar</Text>
            </TouchableOpacity>
        </Container>
    );
};
