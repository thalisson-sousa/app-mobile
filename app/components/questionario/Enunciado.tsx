// components/Enunciado.tsx
import { StyleSheet, Text, View } from 'react-native';


export default function Enunciado(pergunta:any) {
    return (
        <View style={styles.container}>
            <Text style={styles.texto}>{pergunta.enunciado.statement}</Text>
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
        borderWidth: 1,
        borderColor: 'green',
        // Adiciona a largura e altura mínimas para garantir que o componente tenha um tamanho visível
        minWidth: 200,
        minHeight: 100,
    },
    texto: {
        color: 'white',
        fontSize: 23,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
