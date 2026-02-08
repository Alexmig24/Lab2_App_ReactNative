import { useState, useCallback } from "react";
import { FlatList, Alert, TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Container } from "../../components/container/container.jsx";
import { Card } from '../../components/card/card.jsx';
import { ENDPOINTS } from '../../config/api.js';
import { apiFetch } from '../../services/api.js';
import { styles } from './autor.styles.jsx';

export const AutorScreen = ({ navigation }) => {
    const [autores, setAutores] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAutores = async () => {
        setLoading(true);
        try {
            const response = await apiFetch(ENDPOINTS.AUTOR);
            const json = await response.json();
            setAutores(json);
        } catch (error) {
            console.log("Error fetching autores: ", error);
            Alert.alert("Error", "No se pudieron cargar los autores");
        } finally {
            setLoading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getAutores();
        }, [])
    );

    const eliminarAutor = async (id) => {
        Alert.alert(
            "Confirmar eliminación",
            "¿Estás seguro de eliminar este autor?",
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
                            const response = await apiFetch(`${ENDPOINTS.AUTOR}/${id}`, {
                                method: 'DELETE',
                            });

                            if (!response.ok) {
                                throw new Error('Error al eliminar el autor');
                            }
                            Alert.alert("Éxito", "Autor eliminado correctamente");
                            setAutores(autores => autores.filter(autor => autor.id != id));
                        } catch (error) {
                            console.log("Error al eliminar el autor: ", error);
                            Alert.alert("Error", error.message || "No se pudo eliminar el autor");
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
                <Text style={styles.titulo}>Autores</Text>
                <Text style={styles.subtitulo}>Gestiona los autores de tu biblioteca</Text>
            </View>

            <TouchableOpacity
                style={styles.botonCrear}
                onPress={() => navigation.navigate('AutorForm')}
                activeOpacity={0.8}
            >
                <Text style={styles.textoBotonCrear}>+ Crear Nuevo Autor</Text>
            </TouchableOpacity>

            <FlatList
                data={autores}
                renderItem={({ item: autor }) => (
                    <Card
                        id={autor.id}
                        nombre={autor.nombre}
                        nacionalidad={autor.nacionalidad}
                        onDelete={() => eliminarAutor(autor.id)}
                        onEdit={() => navigation.navigate("AutorForm", {
                            id: autor.id,
                            nombre: autor.nombre,
                            nacionalidad: autor.nacionalidad,
                        })}
                    />
                )}
                keyExtractor={(autor) => autor.id.toString()}
                ListEmptyComponent={
                    <View style={styles.listaVacia}>
                        <Text style={styles.textoVacio}>
                            No hay autores registrados.{'\n'}
                            ¡Crea tu primer autor!
                        </Text>
                    </View>
                }
                showsVerticalScrollIndicator={false}
            />
        </Container>
    );
}