import { FlatList, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Container } from "../../components/container/container.jsx";
import { ENDPOINTS } from '../../config/api.js';
import { Card } from '../../components/card/card.jsx';
import { styles } from './libro.styles.jsx';

export const LibroScreen = ({ navigation }) => {
    const [libros, setLibros] = useState([]);

    const getLibros = async () => {
        try {
            const response = await fetch(ENDPOINTS.LIBRO);
            const json = await response.json();
            setLibros(json);
        } catch (error) {
            console.log("Error fetching libros: ", error);
            Alert.alert(" Error ", " No se pudo cargar la lista de libros ");
        }
    }

    useFocusEffect (
        useCallback(() => {
            getLibros();
        }, [])
    );

    const eliminarLibro = async (id) => {
        try {
            const response = await fetch(`${ENDPOINTS.LIBRO}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Error al eliminar el libro');

            Alert.alert(" Éxito ", " Libro eliminado correctamente ");
            setLibros(libros => libros.filter(libro => libro.id != id));
            // await response.json();
        } catch (error) {
            console.log(" Error al eliminar el libro: ", error);
            Alert.alert(" Error ", " No se pudo eliminar el libro ");
        }
    };

    return (
        <Container>
            <View style={styles.header}>
                <Text style={styles.titulo}>Libros</Text>
                <Text style={styles.subtitulo}>Gestiona tu colección</Text>
            </View>

            <TouchableOpacity
                style={styles.botonCrear}
                onPress={() => navigation.navigate("LibroForm")}
            >
                <Text style={styles.textoBotonCrear}>+ Nuevo Libro</Text>
            </TouchableOpacity>

            <FlatList
                data={libros}
                keyExtractor={(l) => l.id}
                renderItem={({ item: libro }) => (
                    <Card
                        id={libro.id}
                        nombre={libro.titulo}
                        nacionalidad={libro.editorial}
                        onEdit={() =>
                            navigation.navigate("LibroForm", { ...libro })
                        }
                        onDelete={() => eliminarLibro(libro.id)}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.listaVacia}>
                        <Text style={styles.textoVacio}>
                            No hay libros registrados.{'\n'}
                            ¡Crea tu primer libro!
                        </Text>
                    </View>
                }
            />
        </Container>
    );
}