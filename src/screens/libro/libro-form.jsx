import { useState, useEffect, use } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Container } from "../../components/container/container";
import { ENDPOINTS } from '../../config/api.js';
import { styles } from './libro-form.styles.jsx';

export const LibroFormScreen = ({navigation, route}) => {
    const params = route.params;

    const [titulo, setTitulo] = useState(params?.titulo || "");
    const [editorial, setEditorial] = useState(params?.editorial || "");
    const [idAutor, setIdAutor] = useState(params?.id_autor || "");
    const [idGenero, setIdGenero] = useState(params?.id_genero || "");

    const [autores, setAutores] = useState([]);
    const [generos, setGeneros] = useState([]);

    const [id, setId] = useState(params?.id || null);

    useEffect(() => {
        getAutores();
        getGeneros();
    }, []);

    const getAutores = async () => {
        try {
            const res = await fetch(ENDPOINTS.AUTOR);
            setAutores(await res.json());
        } catch {}
    };

    const getGeneros = async () => {
        try {
            const res = await fetch(ENDPOINTS.GENERO);
            setGeneros(await res.json());
        } catch {}
    };

    const guardarLibro = async () => {
       if (!titulo.trim() || !editorial.trim() || !idAutor || !idGenero) {
            Alert.alert("Error", "Todos los campos son obligatorios");
            return;
        }

        const body = {
            titulo,
            editorial,
            id_autor: idAutor,
            id_genero: idGenero
        };

        try {
            const metodo = id ? "PUT" : "POST";
            const url = id ? `${ENDPOINTS.LIBRO}/${id}` : ENDPOINTS.LIBRO;

            const res = await fetch(url, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!res.ok) throw new Error("Error al guardar");

            Alert.alert("Éxito", `Libro ${id ? "actualizado" : "registrado"} correctamente`);
            navigation.goBack();

        } catch {
            Alert.alert("Error", "No se pudo guardar el libro");
        }
    };

    return (
        <Container>
            <View style={styles.header}>
                <Text style={styles.titulo}>
                    {id ? "Editar Libro" : "Nuevo Libro"}
                </Text>
            </View>

            <Text style={styles.label}>Título</Text>
            <TextInput
                style={styles.input}
                value={titulo}
                onChangeText={setTitulo}
            />

            <Text style={styles.label}>Editorial</Text>
            <TextInput
                style={styles.input}
                value={editorial}
                onChangeText={setEditorial}
            />

            <Text style={styles.label}>Autor</Text>
            <View style={styles.selector}>
                <Picker selectedValue={idAutor} onValueChange={setIdAutor}>
                    <Picker.Item label="Seleccione un autor" value="" />
                    {autores.map((a) => (
                        <Picker.Item
                            key={a.id}
                            label={a.nombre}
                            value={a.id}
                        />
                    ))}
                </Picker>
            </View>

            <Text style={styles.label}>Género</Text>
            <View style={styles.selector}>
                <Picker selectedValue={idGenero} onValueChange={setIdGenero}>
                    <Picker.Item label="Seleccione un género" value="" />
                    {generos.map((g) => (
                        <Picker.Item
                            key={g.id}
                            label={g.nombre}
                            value={g.id}
                        />
                    ))}
                </Picker>
            </View>

            <TouchableOpacity style={styles.botonGuardar} onPress={guardarLibro}>
                <Text style={styles.textoBoton}>Guardar</Text>
            </TouchableOpacity>
        </Container>
    );
};