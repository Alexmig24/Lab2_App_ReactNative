import { useState, useCallback } from 'react';
import { FlatList, View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Container } from "../../components/container/container.jsx";
import { ENDPOINTS } from '../../config/api.js';
import { apiFetch } from '../../services/api.js';
import { Card } from '../../components/card/card.jsx';
import { styles } from './genero.styles.jsx';

export const GeneroScreen = ({ navigation }) => {
    const [generos, setGeneros] = useState([]);
    const [loading, setLoading] = useState(false);

    const getGeneros = async () => {
        setLoading(true);
        try {
            const response = await apiFetch(ENDPOINTS.GENERO);
            const json = await response.json();
            setGeneros(json);
        } catch (error) {
            console.log("Error fetching generos: ", error);
            Alert.alert("Error", error.message || "No se pudieron cargar los géneros");
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            getGeneros();
        }, [])
    );

    const eliminarGenero = async (id) => {
        Alert.alert(
            "Confirmar eliminación",
            "¿Estás seguro de eliminar este género?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const res = await apiFetch(`${ENDPOINTS.GENERO}/${id}`, {
                                method: 'DELETE',
                            });

                            if (!res.ok) throw new Error('Error al eliminar el género');
                            Alert.alert("Éxito", "Género eliminado correctamente");
                            setGeneros(generos => generos.filter(genero => genero.id != id));
                        } catch (error) {
                            console.log("Error al eliminar el género: ", error);
                            Alert.alert("Error", error.message || "No se pudo eliminar el género");
                        }
                    }
                }
            ]
        );
    }

    if (loading) {
        return (
            <Container>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#6366f1" />
                </View>
            </Container>
        );
    }

    return (
        <Container>
            <View style={styles.header}>
                <Text style={styles.titulo}>Géneros</Text>
                <Text style={styles.subtitulo}>Clasificaciones literarias</Text>
            </View>

            <TouchableOpacity
                style={styles.botonCrear}
                onPress={() => navigation.navigate("GeneroFormScreen")}
                activeOpacity={0.8}
            >
                <Text style={styles.textoBotonCrear}>+ Nuevo Género</Text>
            </TouchableOpacity>

            <FlatList
                data={generos}
                keyExtractor={(g) => g.id.toString()}
                renderItem={({ item }) => (
                    <Card
                        id={item.id}
                        nombre={item.nombre}
                        nacionalidad={item.descripcion}
                        onEdit={() => navigation.navigate("GeneroFormScreen", { ...item })}
                        onDelete={() => eliminarGenero(item.id)}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.listaVacia}>
                        <Text style={styles.textoVacio}>
                            No hay géneros registrados.{'\n'}
                            ¡Crea tu primer género!
                        </Text>
                    </View>
                }
                showsVerticalScrollIndicator={false}
            />
        </Container>
    );
}