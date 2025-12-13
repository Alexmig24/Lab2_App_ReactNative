import { useState, useCallback } from "react";
import { Button, FlatList, Alert, TouchableOpacity, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Container } from "../../components/container/container.jsx";
import { Card } from '../../components/card/card.jsx';
import { ENDPOINTS } from '../../config/api.js';
import { styles } from './autor.styles.jsx';

export const AutorScreen = ({navigation}) => {
    const [autores, setAutores] = useState([]);

    const getAutores = async () => {
        try {
            const response = await fetch(ENDPOINTS.AUTOR);
            const json = await response.json();
            setAutores(json);
        } catch (error) {
            console.log("Error fetching autores: ", error);
        }
    }

    useFocusEffect (
        useCallback(() => {
            getAutores();
        }, [])
    );

    const eliminarAutor = async (id) => {
        try {
            const response = await fetch(`${ENDPOINTS.AUTOR}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el autor');
            }
            Alert.alert(" Éxito ", " Autor eliminado correctamente ");
            setAutores(autores => autores.filter(autor => autor.id != id));
            // await response.json();
        } catch (error) {
            console.log(" Error al eliminar el autor: ", error);
            Alert.alert(" Error ", " No se pudo eliminar el autor ");
        }
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

            {/* <Button 
                onPress={() => navigation.navigate('AutorForm')}
                title='Crear Nuevo Autor'
            /> */}
            <FlatList 
                data={autores}
                renderItem={({ item:autor }) => (
                    <Card 
                        id={autor.id}
                        nombre={autor.nombre}
                        nacionalidad={autor.nacionalidad}
                        onDelete = {() => eliminarAutor(autor.id)}
                        onEdit={() => navigation.navigate("AutorForm", {
                            id: autor.id,
                            nombre: autor.nombre,
                            nacionalidad: autor.nacionalidad,
                        })}
                    />
                )}
                keyExtractor={(autor) => autor.id}
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
            {/* <FlatList 
                data={autores}
                renderItem={({ item:autor }) => 
                    <>
                        <Text key={autor.id} style={styles.texto}>ID: {autor.id} </Text>
                        <Text style={styles.texto}>Nombre {autor.nombre} </Text>
                        <Text style={styles.texto}>Nacionalidad: {autor.nacionalidad} </Text>
                    </>
                }
                keyExtractor={(autor) => autor.id}
            /> */}
            {/* {autores.map((autor) => (
                <View>
                    <Text key={autor.id} style={styles.texto}>ID: {autor.id} </Text>
                    <Text style={styles.texto}>Nombre {autor.nombre} </Text>
                    <Text style={styles.texto}>Nacionalidad: {autor.nacionalidad} </Text>
                </View>
            ))} */}
        </Container>
    );
}