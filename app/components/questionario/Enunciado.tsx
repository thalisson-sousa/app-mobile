import { StyleSheet, Text, View } from 'react-native';

export interface EnunciadoProps {
    enunciado: string;
}

export default function Enunciado(props: EnunciadoProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.texto}>{props.enunciado}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 128, 0, 0.9)', // Verde com 90% de opacidade
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1, // Define a largura da borda
        borderColor: 'green', // Cor da borda
    },
    texto: {
        color: '#D3F9D8', // Verde pérola em hexadecimal
        fontSize: 23,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
