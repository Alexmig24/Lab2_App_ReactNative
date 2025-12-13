import { View, Text, Button, TouchableOpacity } from "react-native";
import { styles } from "./card.styles.jsx";

export const Card = ( props ) => {
    return (
        // <View style={styles.cad}>
        //     <Text style={styles.titulo}>ID: {props.id} </Text>
        //     <Text style={styles.texto}>Nombre {props.nombre} </Text>
        //     <Text style={styles.texto}>Nacionalidad: {props.nacionalidad} </Text>
        //     <View style={styles.botonesContainer}>
        //         <Button color="red" title="Eliminar" onPress={props.onDelete}/>
        //         <Button title="Actualizar" onPress={props.onEdit}/>
        //     </View>
        // </View>
        <View style={styles.cad}>
            <Text style={styles.titulo}>#{props.id}</Text>
            <Text style={styles.texto}>{props.nombre}</Text>
            <Text style={[styles.texto, { color: '#6B7280', fontSize: 14 }]}>
                {props.nacionalidad}
            </Text>
            <View style={styles.botonesContainer}>
                <TouchableOpacity 
                    style={styles.botonEliminar} 
                    onPress={props.onDelete}
                    activeOpacity={0.7}
                >
                    <Text style={styles.textoBoton}>Eliminar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.botonEditar} 
                    onPress={props.onEdit}
                    activeOpacity={0.7}
                >
                    <Text style={styles.textoBoton}>Editar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};