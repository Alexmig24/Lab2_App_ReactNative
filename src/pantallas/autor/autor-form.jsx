import { useState, useEffect } from "react";
import { Text, View, TextInput, Alert, TouchableOpacity, ScrollView } from "react-native";
import { Container } from "../../components/container/container";
import { ENDPOINTS } from '../../config/api.js';
import { styles } from './autor-form.styles.jsx';

export const AutorFormScreen = ({navigation, route}) => {
    const [nombre, setNombre] = useState('');
    const [nacionalidad, setNacionalidad] = useState('');
    const [id, setId] = useState(null);
    const [nombreFocused, setNombreFocused] = useState(false);
    const [nacionalidadFocused, setNacionalidadFocused] = useState(false);

    useEffect(() => {
        if (route?.params) {
            setId(route.params.id);
            setNombre(route.params.nombre);
            setNacionalidad(route.params.nacionalidad);
        }
    }, []);

    const guardarAutor = async () => {
        if (!nombre.trim() || !nacionalidad.trim()) {
            Alert.alert("Error", "Por favor completa todos los campos");
            return;
        }

        try {
            let metodo = "POST";
            let url = ENDPOINTS.AUTOR;

            if (id) {
                metodo = "PUT";
                url = `${ENDPOINTS.AUTOR}/${id}`;
            }

            const response = await fetch(url, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: nombre,
                    nacionalidad: nacionalidad,
                }),
            });

            const json = await response.json();

            Alert.alert(
                "Éxito",
                id ? "Autor actualizado correctamente" : "Autor creado correctamente",
                [
                    {
                        text: "Listo",
                        onPress: () => navigation.goBack(),
                    }
                ]
            );
        } catch (error) {
            console.error("Error al consumir servicio guardar Autor" + error);
            Alert.alert("Error", "Error al guardar el Autor");
        }
    };
        
    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.titulo}>
                        {id ? 'Editar Autor' : 'Nuevo Autor'}
                    </Text>
                    <Text style={styles.subtitulo}>
                        {id ? 'Actualiza la información del autor' : 'Ingresa los datos del nuevo autor'}
                    </Text>
                </View>

                <View style={styles.formulario}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nombre</Text>
                        <TextInput 
                            style={[styles.input, nombreFocused && styles.inputFocused]}
                            placeholder="Ej. Gabriel García Márquez" 
                            value={nombre} 
                            onChangeText={setNombre}
                            onFocus={() => setNombreFocused(true)}
                            onBlur={() => setNombreFocused(false)}
                            placeholderTextColor="#9CA3AF"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nacionalidad</Text>
                        <TextInput 
                            style={[styles.input, nacionalidadFocused && styles.inputFocused]}
                            placeholder="Ej. Ecuatoriano" 
                            value={nacionalidad} 
                            onChangeText={setNacionalidad}
                            onFocus={() => setNacionalidadFocused(true)}
                            onBlur={() => setNacionalidadFocused(false)}
                            placeholderTextColor="#9CA3AF"
                        />
                    </View>

                    <TouchableOpacity 
                        style={styles.botonGuardar}
                        onPress={guardarAutor}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.textoBoton}>
                            {id ? "Actualizar Autor" : "Guardar Autor"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Container>
    );
}