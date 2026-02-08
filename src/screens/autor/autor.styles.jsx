import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    header: {
        marginBottom: 20,
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
    },
    subtitulo: {
        fontSize: 15,
        color: '#6B7280',
        marginBottom: 20,
    },
    botonCrear: {
        backgroundColor: '#6366F1',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    textoBotonCrear: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    listaVacia: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    textoVacio: {
        fontSize: 16,
        color: '#9CA3AF',
        textAlign: 'center',
    }
});