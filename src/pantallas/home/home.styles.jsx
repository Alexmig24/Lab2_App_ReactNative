import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    titulo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitulo: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
    },
    menuContainer: {
        width: '100%',
        gap: 12,
    },
    menuItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        borderLeftWidth: 4,
    },
    menuItemAutor: {
        borderLeftColor: '#6366F1',
    },
    menuItemLibro: {
        borderLeftColor: '#10B981',
    },
    menuItemGenero: {
        borderLeftColor: '#F59E0B',
    },
    menuTexto: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    }
});