import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    cad: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        marginBottom: 12,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#6366F1',
    },
    titulo: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6B7280',
        marginBottom: 8,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    texto: {
        fontSize: 16,
        color: '#1F2937',
        marginBottom: 6,
        fontWeight: '500',
    },
    botonesContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 12,
        gap: 8,
    },
    botonEliminar: {
        backgroundColor: '#EF4444',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    botonEditar: {
        backgroundColor: '#6366F1',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    textoBoton: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    }
});