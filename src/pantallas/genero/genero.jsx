import { useState, useCallback } from 'react';
import { FlatList, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Container } from "../../components/container/container.jsx";
import { ENDPOINTS } from '../../config/api.js';
import { Card } from '../../components/card/card.jsx';
import { styles } from './genero.styles.jsx';

export const GeneroScreen = ({ navigation }) => {
    const [generos, setGeneros] = useState([]);

    const getGeneros = async () => {
        try {
            const response = await fetch(ENDPOINTS.GENERO);
            const json = await response.json();
            setGeneros(json);
        } catch (error) {
            console.log("Error fetching generos: ", error);
        }
    };
     
    useFocusEffect (
        useCallback(() => {
            getGeneros();
        }, [])
    );

    const eliminarGenero = async (id) => {
        try {
            const res = await fetch(`${ENDPOINTS.GENERO}/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Error al eliminar el género');
            Alert.alert(" Éxito ", " Género eliminado correctamente ");
            setGeneros(generos => generos.filter(genero => genero.id != id));
            // await res.json();
        } catch (error) {
            console.log(" Error al eliminar el género: ", error);
            Alert.alert(" Error ", " No se pudo eliminar el género ");
        }
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
            >
                <Text style={styles.textoBotonCrear}>+ Nuevo Género</Text>
            </TouchableOpacity>

            <FlatList
                data={generos}
                keyExtractor={(g) => g.id}
                renderItem={({ item }) => (
                    <Card
                        id={item.id}
                        nombre={item.nombre}
                        nacionalidad={item.descripcion}
                        onEdit={() => navigation.navigate("GeneroFormScreen", { ...item })}
                        onDelete={() => eliminarGenero(item.id)}
                    />
                )}
            />
        </Container>
    );
}