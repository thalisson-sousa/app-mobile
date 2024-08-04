import { Pressable, StyleSheet, Text, View } from 'react-native'

export interface OpcaoProps {
  indice: number;
  texto: string;
  onPress: () => void;
}

export default function Opcao(props: OpcaoProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.opcao,
          pressed && styles.opcaoPressed,
        ]}
        onPress={props.onPress}
      >
        <Text style={styles.texto}>{props.texto}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Centraliza horizontalmente
    justifyContent: 'center', // Centraliza verticalmente
  },
  opcao: {
    width: '80%', // Ocupa 80% da largura disponível
    backgroundColor: 'rgba(46, 157, 72, 0.9)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderColor: '#2E9D48',
  },
  opcaoPressed: {
    backgroundColor: 'rgba(46, 157, 72, 0.8)',
    transform: [{ scale: 0.98 }],
  },
  texto: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
