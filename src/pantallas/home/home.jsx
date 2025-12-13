import { Text, Button, View, TouchableOpacity} from 'react-native';
import { styles } from './home.styles.jsx';
import { Container } from "../../components/container/container.jsx";

export const HomeScreen = ({ navigation }) => {
    return (
        // <Container>
        //     <Text style={styles.texto}>Bienvenido a la pantalla de Home</Text>
        //     <Button
        //         onPress={() => navigation.navigate('Autor')}
        //         title="Ir a Autor"
        //     />
        //     <Button
        //         onPress={() => navigation.navigate('Libro')}
        //         title="Ir a Libro"
        //     />
        // </Container>
        <Container>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titulo}> Biblioteca</Text>
                    <Text style={styles.subtitulo}>Gestiona tu colección de libros</Text>
                </View>

                <View style={styles.menuContainer}>
                    <TouchableOpacity
                        style={[styles.menuItem, styles.menuItemAutor]}
                        onPress={() => navigation.navigate('Autor')}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.menuTexto}>Autores</Text>
                    </TouchableOpacity>
                
                    <TouchableOpacity
                        style={[styles.menuItem, styles.menuItemGenero]}
                        onPress={() => navigation.navigate('Genero')}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.menuTexto}>Géneros</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.menuItem, styles.menuItemLibro]}
                        onPress={() => navigation.navigate('Libro')}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.menuTexto}>Libros</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Container>
    );
};